import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { access, mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { createContentResolver } from "../src/lib/content-graph.mjs";
import { buildContentIndex } from "../src/lib/content-index.mjs";
import {
  isIgnoredContentPath,
  isPrivateContentPath
} from "../src/lib/content-paths.mjs";

const execFileAsync = promisify(execFile);
const scriptsDir = fileURLToPath(new URL("../scripts/", import.meta.url));
const contentModule = new URL("../src/lib/content.ts", import.meta.url).href;

test("treats any dot-prefixed path segment as private", () => {
  assert.equal(isPrivateContentPath(".env"), true);
  assert.equal(isPrivateContentPath("tools/x/files/.secret"), true);
  assert.equal(isPrivateContentPath("tools/.git-credentials/token"), true);
  assert.equal(isPrivateContentPath("tools\\x\\files\\.npmrc"), true);
  assert.equal(isPrivateContentPath("tools/x/files/tool.v1.2.zip"), false);
  assert.equal(isPrivateContentPath("tools/x/files/archive.tar.gz"), false);
  assert.equal(isPrivateContentPath(""), false);
});

test("ignores only housekeeping files and cache directories", () => {
  assert.equal(isIgnoredContentPath("tools/x/files/.gitkeep"), true);
  assert.equal(isIgnoredContentPath("tools/.DS_Store"), true);
  assert.equal(isIgnoredContentPath(".rumdl_cache", { directory: true }), true);
  assert.equal(isIgnoredContentPath(".rumdl_cache/v1/cache.json"), true);
  assert.equal(isIgnoredContentPath("tools/x/files/.secret"), false);
  assert.equal(isIgnoredContentPath("tools/x/files/tool.zip"), false);
});

test("applies housekeeping names to files only", () => {
  assert.equal(isIgnoredContentPath("tools/.gitkeep", { directory: true }), false);
  assert.equal(isIgnoredContentPath("tools/x/files/.DS_Store", { directory: true }), false);
  assert.equal(isIgnoredContentPath("tools/.rumdl_cache", { directory: true }), true);
  assert.equal(isIgnoredContentPath("tools/.rumdl_cache"), false);
});

test("never indexes pages or link targets under a dot-segment path", async () => {
  const contentRoot = await mkdtemp(path.join(os.tmpdir(), "kb-private-pages-"));

  try {
    await mkdir(path.join(contentRoot, ".drafts"), { recursive: true });
    await mkdir(path.join(contentRoot, "tools", "x", ".notes"), { recursive: true });
    await mkdir(path.join(contentRoot, "tools", "x", "files"), { recursive: true });
    await writeFile(path.join(contentRoot, "_index.md"), "---\ntitle: Home\n---\n");
    await writeFile(path.join(contentRoot, "tools", "x", "index.md"), "---\ntitle: X\n---\n");
    await writeFile(path.join(contentRoot, ".drafts", "page.md"), "---\ntitle: Draft\n---\n");
    await writeFile(path.join(contentRoot, "tools", "x", ".hidden.md"), "---\ntitle: Hidden\n---\n");
    await writeFile(path.join(contentRoot, "tools", "x", ".notes", "n.md"), "---\ntitle: N\n---\n");
    await writeFile(path.join(contentRoot, "tools", "x", "files", "tool.txt"), "tool\n");
    await writeFile(path.join(contentRoot, "tools", "x", "files", ".env"), "token\n");

    const index = buildContentIndex({ contentRoot, includeDrafts: true, strict: false });
    assert.deepEqual(
      index.allPages.map((page) => page.url),
      ["/", "/tools/x/"]
    );

    const resolver = createContentResolver({ contentRoot, pages: index.allPages });
    assert.deepEqual([...resolver.contentAssets], ["/tools/x/files/tool.txt"]);
  } finally {
    await rm(contentRoot, { recursive: true, force: true });
  }
});

test("resources shortcode never lists dot-segment files", async () => {
  const fixture = await mkdtemp(path.join(os.tmpdir(), "kb-private-resources-"));

  try {
    const filesDir = path.join(fixture, "content", "tools", "x", "files");
    await mkdir(filesDir, { recursive: true });
    await writeFile(path.join(fixture, "content", "_index.md"), "---\ntitle: Home\n---\n");
    await writeFile(path.join(fixture, "content", "tools", "x", "index.md"), "---\ntitle: X\n---\n");
    await writeFile(path.join(filesDir, "tool.txt"), "tool\n");
    await writeFile(path.join(filesDir, ".env"), "token\n");
    await writeFile(path.join(filesDir, ".gitkeep"), "");

    const script = `const { renderPage } = await import(${JSON.stringify(contentModule)});
process.stdout.write(renderPage({ body: "{{% resources %}}", sourceDir: "tools/x", url: "/tools/x/" }));`;
    const { stdout } = await execFileAsync(
      process.execPath,
      ["--input-type=module", "--eval", script],
      { cwd: fixture }
    );

    assert.match(stdout, /href="\/tools\/x\/files\/tool\.txt"/);
    assert.doesNotMatch(stdout, /\.env|\.gitkeep/);
  } finally {
    await rm(fixture, { recursive: true, force: true });
  }
});

test("smoke-build fails on a dot-segment path in the asset manifest", async () => {
  const fixture = await mkdtemp(path.join(os.tmpdir(), "kb-private-smoke-"));

  try {
    await mkdir(path.join(fixture, "dist"), { recursive: true });
    await writeFile(
      path.join(fixture, "dist", "asset-manifest.json"),
      JSON.stringify({
        assets: [
          { path: "tools/x/files/tool.txt", bytes: 5, sha256: "0".repeat(64) },
          { path: "tools/x/files/.env", bytes: 6, sha256: "1".repeat(64) }
        ]
      })
    );

    const result = await execFileAsync(
      process.execPath,
      [path.join(scriptsDir, "smoke-build.mjs")],
      { cwd: fixture }
    ).then(
      () => ({ code: 0, stderr: "" }),
      (error) => ({ code: error.code, stderr: error.stderr })
    );

    assert.equal(result.code, 1);
    assert.match(
      result.stderr,
      /asset-manifest\.json: private dot-segment asset included \(tools\/x\/files\/\.env\)/
    );
    assert.doesNotMatch(result.stderr, /included \(tools\/x\/files\/tool\.txt\)/);
  } finally {
    await rm(fixture, { recursive: true, force: true });
  }
});

test("check:content fails on a nested dotfile that the build never publishes", async () => {
  const fixture = await mkdtemp(path.join(os.tmpdir(), "kb-private-content-"));

  try {
    await mkdir(path.join(fixture, "scripts"), { recursive: true });
    await writeFile(
      path.join(fixture, "scripts", "content-policy.json"),
      JSON.stringify({ allowedAssetWarnings: [] })
    );
    await mkdir(path.join(fixture, "content", "tools", "x", "files"), { recursive: true });
    await writeFile(path.join(fixture, "content", "_index.md"), "---\ntitle: Home\n---\n\nHome\n");
    await writeFile(
      path.join(fixture, "content", "tools", "x", "index.md"),
      "---\ntitle: X\n---\n\n{{% resources %}}\n"
    );
    await writeFile(path.join(fixture, "content", "tools", "x", "files", "tool.txt"), "tool\n");
    await writeFile(path.join(fixture, "content", "tools", "x", "files", ".gitkeep"), "");
    await writeFile(path.join(fixture, "content", "tools", "x", "files", ".secret"), "token\n");

    const check = await runCheckContent(fixture);
    assert.equal(check.code, 1);
    assert.deepEqual(
      check.stderr.split("\n").filter((line) => line.startsWith("error:")),
      [
        "error: content/tools/x/files/.secret: private dot-segment path under content/; the build never publishes it, so remove it from content/ (only .DS_Store and .gitkeep files and the .rumdl_cache cache are allowed)"
      ]
    );

    await execFileAsync(process.execPath, [path.join(scriptsDir, "copy-content-assets.mjs")], {
      cwd: fixture
    });
    await execFileAsync(process.execPath, [path.join(scriptsDir, "generate-asset-manifest.mjs")], {
      cwd: fixture
    });

    const filesDir = path.join(fixture, "dist", "tools", "x", "files");
    await access(path.join(filesDir, "tool.txt"));
    await assert.rejects(access(path.join(filesDir, ".secret")), { code: "ENOENT" });
    await assert.rejects(access(path.join(filesDir, ".gitkeep")), { code: "ENOENT" });

    const manifest = JSON.parse(await readFile(path.join(fixture, "dist", "asset-manifest.json"), "utf8"));
    assert.deepEqual(
      manifest.assets.map((asset) => asset.path),
      ["tools/x/files/tool.txt"]
    );

    await rm(path.join(fixture, "content", "tools", "x", "files", ".secret"));
    assert.equal((await runCheckContent(fixture)).code, 0);
  } finally {
    await rm(fixture, { recursive: true, force: true });
  }
});

function runCheckContent(cwd) {
  return execFileAsync(process.execPath, [path.join(scriptsDir, "check-content.mjs")], {
    cwd
  }).then(
    () => ({ code: 0, stderr: "" }),
    (error) => ({ code: error.code, stderr: error.stderr })
  );
}
