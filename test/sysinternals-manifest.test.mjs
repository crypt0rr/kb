import assert from "node:assert/strict";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import {
  createManifest,
  hashFile,
  validateManifest
} from "../scripts/sysinternals-manifest.mjs";

test("creates a deterministic, schema-valid Sysinternals manifest", () => {
  const manifest = createManifest([
    { relative: "ARM64/tool.exe", size: 2, sha256: "b".repeat(64) },
    { relative: "tool.exe", size: 1, sha256: "a".repeat(64) }
  ]);

  assert.deepEqual(Object.keys(manifest.files), ["ARM64/tool.exe", "tool.exe"]);
  assert.equal(validateManifest(manifest), manifest);
});

test("rejects malformed manifest entries", () => {
  assert.throws(
    () =>
      validateManifest({
        schemaVersion: 1,
        source: "https://live.sysinternals.com",
        files: { "tool.exe": { size: 1, sha256: "not-a-hash" } }
      }),
    /SHA-256 is invalid/
  );
});

test("hashes a file without loading it into the manifest API", async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), "kb-sysinternals-hash-"));
  const file = path.join(directory, "tool.exe");

  try {
    await writeFile(file, "sysinternals");
    assert.equal(
      await hashFile(file),
      "38089e6b77141e2788fd3703b2d9c28af38c32060079af582f86b31278f3abca"
    );
    assert.equal((await readFile(file, "utf8")), "sysinternals");
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
