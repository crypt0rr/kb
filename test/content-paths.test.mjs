import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { access, mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import {
  isIgnoredContentPath,
  isPrivateContentPath
} from "../src/lib/content-paths.mjs";

const execFileAsync = promisify(execFile);
const scriptsDir = fileURLToPath(new URL("../scripts/", import.meta.url));

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
  assert.equal(isIgnoredContentPath(".rumdl_cache"), true);
  assert.equal(isIgnoredContentPath(".rumdl_cache/v1/cache.json"), true);
  assert.equal(isIgnoredContentPath("tools/x/files/.secret"), false);
  assert.equal(isIgnoredContentPath("tools/x/files/tool.zip"), false);
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
        "error: content/tools/x/files/.secret: private dot-segment path under content/; the build never publishes it, so remove it from content/ (only .DS_Store and .gitkeep are allowed)"
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
