import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { access, mkdtemp, readdir, readFile, rm } from "node:fs/promises";
import http from "node:http";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import {
  createSysinternalsClient,
  parseListing,
  parseValidatedListing,
  validateListingEntry
} from "../scripts/sysinternals-fetch.mjs";

const base = "https://live.sysinternals.com";
const body = Buffer.from("sysinternals tool bytes");
const sha256 = createHash("sha256").update(body).digest("hex");

function listing(...rows) {
  return `<pre>${rows.map(([size, href, name]) => ` Monday, April 6, 2020  4:25 AM ${size} <A HREF="${href}">${name}</A><br>`).join("")}</pre>`;
}

test("parses file rows and skips directories and the parent link", () => {
  const html = `<A HREF="/">[To Parent Directory]</A>${listing(
    ["&lt;dir&gt;", "/ARM64/", "ARM64"],
    ["341072", "/Autologon.exe", "Autologon.exe"],
    ["810416", "/ARM64/accesschk64a.exe", "accesschk64a.exe"]
  )}`;

  assert.deepEqual(parseValidatedListing(html, base), [
    { href: "/Autologon.exe", name: "Autologon.exe", size: 341072 },
    { href: "/ARM64/accesschk64a.exe", name: "accesschk64a.exe", size: 810416 }
  ]);
});

test("rejects a listing entry whose name traverses directories", () => {
  const html = listing(["12", "/x", "../x"]);

  assert.equal(parseListing(html)[0].name, "../x");
  assert.throws(
    () => parseValidatedListing(html, base),
    /Sysinternals listing entry has an unsafe name "\.\.\/x"/
  );
});

test("rejects unsafe listing names", () => {
  for (const name of ["..", "a..b", ".hidden", "-flag", "dir/tool.exe", "tool exe", "tool\\exe", ""]) {
    assert.throws(
      () => validateListingEntry({ href: "/tool.exe", name, size: 1 }, base),
      /unsafe name/,
      name
    );
  }
});

test("rejects hrefs that are not same-origin absolute paths", () => {
  for (const href of [
    "tool.exe",
    "https://example.com/tool.exe",
    "//example.com/tool.exe",
    "/ARM64/../tool.exe",
    "/%2e%2e/tool.exe",
    "/ARM64\\tool.exe",
    "javascript:alert(1)"
  ]) {
    assert.throws(
      () => validateListingEntry({ href, name: "tool.exe", size: 1 }, base),
      /unsafe href .*expected a same-origin absolute path on https:\/\/live\.sysinternals\.com/,
      href
    );
  }
});

test("the default client only allows HTTPS URLs", async () => {
  const client = createSysinternalsClient();
  await assert.rejects(client.fetchText("http://127.0.0.1:9/"), /only https: URLs are allowed/);
});

test("rejects within the configured timeout when the server never responds", async (t) => {
  const server = await listen(() => {});
  t.after(() => closeServer(server));
  const client = createSysinternalsClient({ transport: http, protocol: "http:", timeoutMs: 150 });

  const started = Date.now();
  await assert.rejects(client.fetchText(urlFor(server, "/")), /request timed out after 150 ms/);
  assert.ok(Date.now() - started < 2_000, "fetch should settle shortly after the timeout");
});

test("rejects within the timeout when a download body stalls and removes the temporary file", async (t) => {
  const server = await listen((request, response) => {
    response.writeHead(200, { "Content-Length": body.length });
    response.write(body.subarray(0, 4));
  });
  t.after(() => closeServer(server));
  const directory = await tempDirectory(t);
  const client = createSysinternalsClient({ transport: http, protocol: "http:", timeoutMs: 150 });
  const target = path.join(directory, "tool.exe");

  await assert.rejects(
    client.downloadVerified({ url: urlFor(server, "/tool.exe"), target, size: body.length, sha256 }),
    /request timed out after 150 ms/
  );
  assert.deepEqual(await readdir(directory), []);
});

test("a truncated download rejects and leaves no .download file", async (t) => {
  const server = await listen((request, response) => {
    response.writeHead(200, { "Content-Length": body.length });
    response.write(body.subarray(0, 4), () => response.socket.destroy());
  });
  t.after(() => closeServer(server));
  const directory = await tempDirectory(t);
  const client = createSysinternalsClient({ transport: http, protocol: "http:", timeoutMs: 5_000 });
  const target = path.join(directory, "tool.exe");

  await assert.rejects(
    client.downloadVerified({ url: urlFor(server, "/tool.exe"), target, size: body.length, sha256 }),
    /tool\.exe: (?:response aborted|connection closed|aborted)/
  );
  assert.deepEqual(await readdir(directory), []);
});

test("a size or hash mismatch leaves no .download file", async (t) => {
  const server = await listen((request, response) => {
    response.end(request.url === "/short.exe" ? body.subarray(1) : body);
  });
  t.after(() => closeServer(server));
  const directory = await tempDirectory(t);
  const client = createSysinternalsClient({ transport: http, protocol: "http:", timeoutMs: 5_000 });

  await assert.rejects(
    client.downloadVerified({
      url: urlFor(server, "/short.exe"),
      target: path.join(directory, "short.exe"),
      size: body.length,
      sha256,
      label: "short.exe"
    }),
    /short\.exe: expected 23 byte\(s\), got 22/
  );
  await assert.rejects(
    client.downloadVerified({
      url: urlFor(server, "/tool.exe"),
      target: path.join(directory, "tool.exe"),
      size: body.length,
      sha256: "0".repeat(64),
      label: "tool.exe"
    }),
    /tool\.exe: downloaded SHA-256 does not match the reviewed manifest/
  );
  assert.deepEqual(await readdir(directory), []);
});

test("follows redirects and atomically installs a verified download", async (t) => {
  const server = await listen((request, response) => {
    if (request.url === "/old.exe") {
      response.writeHead(302, { Location: "/tool.exe" });
      response.end();
      return;
    }
    response.end(body);
  });
  t.after(() => closeServer(server));
  const directory = await tempDirectory(t);
  const client = createSysinternalsClient({ transport: http, protocol: "http:", timeoutMs: 5_000 });
  const target = path.join(directory, "tool.exe");

  await client.downloadVerified({ url: urlFor(server, "/old.exe"), target, size: body.length, sha256 });

  assert.deepEqual(await readFile(target), body);
  await assert.rejects(access(`${target}.download`), { code: "ENOENT" });
  assert.equal(await client.fetchText(urlFor(server, "/tool.exe")), body.toString("utf8"));
});

test("rejects non-200 responses with the URL and status", async (t) => {
  const server = await listen((request, response) => {
    response.writeHead(404);
    response.end();
  });
  t.after(() => closeServer(server));
  const client = createSysinternalsClient({ transport: http, protocol: "http:", timeoutMs: 5_000 });
  const url = urlFor(server, "/missing.exe");

  await assert.rejects(client.fetchBuffer(url), new RegExp(`${escapeRegExp(url)}: HTTP 404`));
});

function listen(handler) {
  return new Promise((resolve) => {
    const server = http.createServer(handler);
    server.listen(0, "127.0.0.1", () => resolve(server));
  });
}

function closeServer(server) {
  server.closeAllConnections();
  return new Promise((resolve) => server.close(() => resolve()));
}

function urlFor(server, pathname) {
  return `http://127.0.0.1:${server.address().port}${pathname}`;
}

async function tempDirectory(t) {
  const directory = await mkdtemp(path.join(os.tmpdir(), "kb-sysinternals-fetch-"));
  t.after(() => rm(directory, { recursive: true, force: true }));
  return directory;
}

function escapeRegExp(value) {
  return value.replace(/[\\^$.*+?()[\]{}|/]/g, "\\$&");
}
