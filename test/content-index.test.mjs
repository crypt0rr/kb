import assert from "node:assert/strict";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { buildContentIndex, normalizeWeight } from "../src/lib/content-index.mjs";

test("builds the full effective metadata index with provenance", () => {
  const index = buildContentIndex();

  assert.equal(index.pages.length, 751);
  assert.equal(index.pages.filter((page) => page.effectiveFrontmatter.tags?.length).length, 750);

  const inherited = index.pages.find(
    (page) => page.metadataProvenance.tags?.kind === "cascade"
  );
  assert.ok(inherited);
  assert.ok(inherited.effectiveFrontmatter.tags.length > 0);
  assert.equal(inherited.metadataErrors.length, 0);
  assert.equal(inherited.metadataProvenance.tags.source.endsWith("_index.md"), true);
});

test("keeps absent weights unordered and rejects duplicate URLs in strict mode", async () => {
  assert.equal(normalizeWeight(null), Number.MAX_SAFE_INTEGER);
  assert.equal(normalizeWeight(""), Number.MAX_SAFE_INTEGER);
  assert.equal(normalizeWeight("12"), 12);

  const directory = await mkdtemp(path.join(os.tmpdir(), "kb-content-duplicates-"));
  try {
    await mkdir(path.join(directory, "tools", "example"), { recursive: true });
    await writeFile(path.join(directory, "tools", "example.md"), "---\ntitle: Flat\n---\n");
    await writeFile(
      path.join(directory, "tools", "example", "index.md"),
      "---\ntitle: Nested\n---\n"
    );

    assert.throws(() => buildContentIndex({ contentRoot: directory }), /duplicate URL/);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test("preserves explicit overrides and reports non-strict metadata errors", async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), "kb-content-index-"));

  try {
    await mkdir(path.join(directory, "tools", "example"), { recursive: true });
    await writeFile(
      path.join(directory, "_index.md"),
      "---\ncascade:\n  tags: [Tools]\n  platforms: [Linux]\n---\n"
    );
    await writeFile(
      path.join(directory, "tools", "_index.md"),
      "---\ncascade:\n  tags: [Framework]\n  status: deprecated\n---\n"
    );
    await writeFile(
      path.join(directory, "tools", "example", "index.md"),
      "---\ntitle: Example\ntags: []\n---\nBody\n"
    );

    const index = buildContentIndex({ contentRoot: directory });
    const example = index.pages.find((page) => page.url === "/tools/example/");
    assert.deepEqual(example.effectiveFrontmatter.tags, []);
    assert.deepEqual(example.effectiveFrontmatter.platforms, ["Linux"]);
    assert.equal(example.effectiveFrontmatter.status, "deprecated");
    assert.equal(example.metadataProvenance.tags.source, "tools/example/index.md");
    assert.equal(example.metadataProvenance.status.source, "tools/_index.md");

    await writeFile(
      path.join(directory, "tools", "_index.md"),
      "---\ncascade: invalid cascade\n---\n"
    );
    const nonStrict = buildContentIndex({ contentRoot: directory, strict: false });
    assert.ok(
      nonStrict.pages.some(
        (page) => page.url === "/tools/" && page.metadataErrors.some((error) => /cascade/.test(error))
      )
    );
    assert.throws(() => buildContentIndex({ contentRoot: directory }), /cascade/);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
