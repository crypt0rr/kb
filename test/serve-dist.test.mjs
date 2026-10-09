import assert from "node:assert/strict";
import { chmod, mkdir, mkdtemp, readFile, realpath, rm, symlink, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import {
  compileHeaderPattern,
  contentTypeFor,
  createDistServer,
  headersForPath,
  parseArgs,
  parseHeadersFile,
  resolveRequestPath
} from "../scripts/serve-dist.mjs";

test("parses Cloudflare Pages _headers rules, comments and detach lines", () => {
  const rules = parseHeadersFile(
    [
      "# global policy",
      "/*",
      "  X-Frame-Options: DENY",
      "  Content-Security-Policy: default-src 'self'; img-src 'self' data:",
      "",
      "/downloads/*",
      "  ! X-Frame-Options",
      "  Content-Disposition: attachment"
    ].join("\n")
  );

  assert.deepEqual(rules, [
    {
      pattern: "/*",
      set: [
        ["X-Frame-Options", "DENY"],
        ["Content-Security-Policy", "default-src 'self'; img-src 'self' data:"]
      ],
      detach: []
    },
    {
      pattern: "/downloads/*",
      set: [["Content-Disposition", "attachment"]],
      detach: ["x-frame-options"]
    }
  ]);
});

test("rejects header lines without a URL pattern or separator", () => {
  assert.throws(() => parseHeadersFile("  X-Frame-Options: DENY"), /without a URL pattern/);
  assert.throws(() => parseHeadersFile("/*\n  X-Frame-Options DENY"), /expected "Name: value"/);
});

test("matches splats, placeholders and host-qualified patterns", () => {
  assert.equal(compileHeaderPattern("/*").test("/"), true);
  assert.equal(compileHeaderPattern("/*").test("/tools/other/hexyl/"), true);
  assert.equal(compileHeaderPattern("/tools/*").test("/tools/a/b.png"), true);
  assert.equal(compileHeaderPattern("/tools/*").test("/commands/"), false);
  assert.equal(compileHeaderPattern("/:section/index.html").test("/tools/index.html"), true);
  assert.equal(compileHeaderPattern("/:section/index.html").test("/a/b/index.html"), false);
  assert.equal(compileHeaderPattern("https://kb.example/*.json").test("/search.json"), true);
  assert.equal(compileHeaderPattern("/search.json").test("/searchxjson"), false);
});

test("merges headers from every matching rule like Cloudflare Pages", () => {
  const rules = parseHeadersFile(
    [
      "/*",
      "  X-Frame-Options: DENY",
      "  Cache-Control: public",
      "/pagefind/*",
      "  cache-control: max-age=60",
      "  ! X-Frame-Options"
    ].join("\n")
  );

  assert.deepEqual(headersForPath(rules, "/"), {
    "X-Frame-Options": "DENY",
    "Cache-Control": "public"
  });
  assert.deepEqual(headersForPath(rules, "/pagefind/pagefind.js"), {
    "Cache-Control": "public, max-age=60"
  });
});

test("applies the committed /* policy to every path", async () => {
  const source = await readFile(new URL("../public/_headers", import.meta.url), "utf8");
  const headers = headersForPath(parseHeadersFile(source), "/tools/other/hexyl/");

  assert.match(headers["Content-Security-Policy"], /img-src 'self' data:/);
  assert.equal(headers["X-Content-Type-Options"], "nosniff");
});

test("serves the content types the site and Pagefind depend on", () => {
  assert.equal(contentTypeFor("index.html"), "text/html; charset=utf-8");
  assert.equal(contentTypeFor("js/kb-app.js"), "text/javascript; charset=utf-8");
  assert.equal(contentTypeFor("_astro/site.css"), "text/css; charset=utf-8");
  assert.equal(contentTypeFor("search.json"), "application/json; charset=utf-8");
  assert.equal(contentTypeFor("pagefind/wasm.unknown.wasm"), "application/wasm");
  assert.equal(contentTypeFor("a.PNG"), "image/png");
  assert.equal(contentTypeFor("a.gif"), "image/gif");
  assert.equal(contentTypeFor("a.svg"), "image/svg+xml");
  assert.equal(contentTypeFor("a.webp"), "image/webp");
  assert.equal(contentTypeFor("a.mp4"), "video/mp4");
  assert.equal(contentTypeFor("pagefind/pagefind.en_1.pf_meta"), "application/octet-stream");
  assert.equal(contentTypeFor("pagefind/fragment/en_1.pf_fragment"), "application/octet-stream");
  assert.equal(contentTypeFor("pagefind/wasm.en.pagefind"), "application/octet-stream");
});

test("resolves directory indexes and refuses traversal outside the root", async () => {
  const base = await mkdtemp(path.join(os.tmpdir(), "kb-serve-dist-"));
  const root = path.join(base, "dist");

  try {
    await mkdir(path.join(root, "tools", "awk"), { recursive: true });
    await writeFile(path.join(root, "index.html"), "home");
    await writeFile(path.join(root, "tools", "awk", "index.html"), "awk");
    await writeFile(path.join(root, "_headers"), "/*\n  X-Test: yes\n");
    await writeFile(path.join(base, "secret.txt"), "secret");
    await symlink(path.join(base, "secret.txt"), path.join(root, "escape.txt"));

    assert.deepEqual(await resolveRequestPath(root, "/"), {
      file: path.join(await realpath(root), "index.html")
    });
    assert.deepEqual(await resolveRequestPath(root, "/tools/awk/"), {
      file: path.join(await realpath(root), "tools", "awk", "index.html")
    });
    assert.deepEqual(await resolveRequestPath(root, "/tools/awk"), { redirect: "/tools/awk/" });
    assert.equal(await resolveRequestPath(root, "/tools/"), null);
    assert.equal(await resolveRequestPath(root, "/missing.png"), null);
    assert.equal(await resolveRequestPath(root, "/index.html/"), null);
    assert.equal(await resolveRequestPath(root, "/_headers"), null);
    assert.equal(await resolveRequestPath(root, "/tools/..%2F_headers"), null);
    assert.equal(await resolveRequestPath(root, "/tools/%2e%2e/_headers"), null);
    assert.equal(await resolveRequestPath(root, "/../secret.txt"), null);
    assert.equal(await resolveRequestPath(root, "/%2e%2e/secret.txt"), null);
    assert.equal(await resolveRequestPath(root, "/tools/%2e%2e%2f%2e%2e%2fsecret.txt"), null);
    assert.equal(await resolveRequestPath(root, "/..%5csecret.txt"), null);
    assert.equal(await resolveRequestPath(root, "/index.html%00.png"), null);
    assert.equal(await resolveRequestPath(root, "/%E0%A4%A"), null);
    assert.equal(await resolveRequestPath(root, "/escape.txt"), null);
  } finally {
    await rm(base, { recursive: true, force: true });
  }
});

test("serves files with _headers applied and 404s for missing paths", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "kb-serve-dist-http-"));
  await writeFile(path.join(root, "index.html"), "<h1>home</h1>");
  await writeFile(path.join(root, "_headers"), "/*\n  X-Test: applied\n");
  const server = createDistServer({ dir: root });

  try {
    await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
    const origin = `http://127.0.0.1:${server.address().port}`;

    const home = await fetch(`${origin}/`);
    assert.equal(home.status, 200);
    assert.equal(home.headers.get("x-test"), "applied");
    assert.equal(home.headers.get("content-type"), "text/html; charset=utf-8");
    assert.equal(await home.text(), "<h1>home</h1>");

    const missing = await fetch(`${origin}/missing/`);
    assert.equal(missing.status, 404);
    assert.equal(missing.headers.get("x-test"), "applied");
    await missing.arrayBuffer();

    const post = await fetch(`${origin}/`, { method: "POST" });
    assert.equal(post.status, 405);
    await post.arrayBuffer();
  } finally {
    await new Promise((resolve) => server.close(resolve));
    await rm(root, { recursive: true, force: true });
  }
});

test("keeps the query on directory redirects", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "kb-serve-dist-redirect-"));
  await mkdir(path.join(root, "tools", "awk"), { recursive: true });
  await writeFile(path.join(root, "tools", "awk", "index.html"), "awk");
  await writeFile(path.join(root, "_headers"), "/*\n  X-Test: applied\n");
  const server = createDistServer({ dir: root });

  try {
    await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
    const origin = `http://127.0.0.1:${server.address().port}`;

    const redirect = await fetch(`${origin}/tools/awk?q=1`, { redirect: "manual" });
    assert.equal(redirect.status, 308);
    assert.equal(redirect.headers.get("location"), "/tools/awk/?q=1");
    await redirect.arrayBuffer();
  } finally {
    await new Promise((resolve) => server.close(resolve));
    await rm(root, { recursive: true, force: true });
  }
});

test(
  "answers 500 for an unreadable file and keeps serving",
  { skip: process.getuid?.() === 0 && "root can read mode 000 files" },
  async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "kb-serve-dist-unreadable-"));
    await writeFile(path.join(root, "index.html"), "<h1>home</h1>");
    await writeFile(path.join(root, "locked.txt"), "locked");
    await chmod(path.join(root, "locked.txt"), 0o000);
    await writeFile(path.join(root, "_headers"), "/*\n  X-Test: applied\n");
    const server = createDistServer({ dir: root });

    try {
      await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
      const origin = `http://127.0.0.1:${server.address().port}`;

      const locked = await fetch(`${origin}/locked.txt`);
      assert.equal(locked.status, 500);
      assert.match(await locked.text(), /Internal error: EACCES/);

      const home = await fetch(`${origin}/`);
      assert.equal(home.status, 200);
      assert.equal(await home.text(), "<h1>home</h1>");
    } finally {
      await new Promise((resolve) => server.close(resolve));
      await rm(root, { recursive: true, force: true });
    }
  }
);

test("parses CLI options", () => {
  assert.deepEqual(parseArgs([]), { host: "127.0.0.1", port: 4321, dir: "dist" });
  assert.deepEqual(parseArgs(["--host", "0.0.0.0", "--port=4441", "--dir", "out"]), {
    host: "0.0.0.0",
    port: 4441,
    dir: "out"
  });
  assert.throws(() => parseArgs(["--port", "http"]), /invalid --port/);
  assert.throws(() => parseArgs(["--port"]), /requires a value/);
  assert.throws(() => parseArgs(["--verbose"]), /unknown argument/);
});
