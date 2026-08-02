import test from "node:test";
import assert from "node:assert/strict";
import { parseFrontmatter } from "../src/lib/frontmatter.mjs";

test("parses YAML frontmatter and preserves Markdown content", () => {
  const result = parseFrontmatter(
    "---\ntitle: Example\ntags: [one, two]\n---\n\n# Heading\n"
  );

  assert.deepEqual(result.data, { title: "Example", tags: ["one", "two"] });
  assert.equal(result.content, "# Heading\n");
});

test("accepts a UTF-8 BOM before frontmatter", () => {
  const result = parseFrontmatter("\uFEFF---\ntitle: BOM-safe\n---\nBody");

  assert.equal(result.data.title, "BOM-safe");
  assert.equal(result.content, "Body");
});

test("returns content unchanged when frontmatter is absent", () => {
  const result = parseFrontmatter("# Plain Markdown\n");

  assert.deepEqual(result.data, {});
  assert.equal(result.content, "# Plain Markdown\n");
});

test("rejects malformed or non-object frontmatter", () => {
  assert.throws(
    () => parseFrontmatter("---\ntitle: Missing closing\n"),
    /missing closing frontmatter delimiter/
  );
  assert.throws(
    () => parseFrontmatter("---\n- list\n---\nBody"),
    /frontmatter must be a YAML object/
  );
});
