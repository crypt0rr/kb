import assert from "node:assert/strict";
import test from "node:test";
import { tagKey } from "../src/lib/metadata.mjs";
import {
  collectAnchors,
  createMarkdown,
  createRefIndex,
  resolveRef,
  slugify
} from "../src/lib/links.mjs";

function refPage(slug, title) {
  return {
    slug,
    url: `/${slug}/`,
    relativeFile: `${slug}/index.md`,
    sourceDir: slug,
    title
  };
}

test("slugifies headings, refs and tags with one rule", () => {
  assert.equal(slugify(" Don't `Panic` \"Now\" "), "dont-panic-now");
  assert.equal(slugify("Hash   Cracking!"), "hash-cracking");
  assert.equal(tagKey("Active Directory's \"Tools\""), slugify("Active Directory's \"Tools\""));
  assert.equal(tagKey(undefined), "");
});

test("collects the heading ids the renderer emits", () => {
  const source = [
    "## Usage",
    "## Usage",
    "## [Link](https://x.y) title",
    '<div id="Raw_Block"></div>',
    "",
    'Inline <span id="inline-id">x</span>'
  ].join("\n");
  const anchors = collectAnchors(source);
  const html = createMarkdown().render(source);

  assert.ok(anchors.has("usage"));
  assert.ok(anchors.has("usage-1"));
  assert.match(html, /<h2 id="usage-1"/);
  assert.ok(anchors.has("link-title"));
  assert.match(html, /<h2 id="link-title"/);
  assert.ok(!anchors.has("link-https-x-y-title"));
  assert.ok(anchors.has("raw-block"));
  assert.ok(anchors.has("inline-id"));
});

test("resolves refs by exact URL before basename", () => {
  const exact = refPage("tools/alpha", "Alpha");
  const other = refPage("commands/alpha", "Alpha command");
  const index = createRefIndex([exact, other]);

  assert.deepEqual(resolveRef("tools/alpha", null, index), {
    page: exact,
    ambiguous: false,
    candidates: []
  });
  assert.equal(resolveRef("../alpha", refPage("tools/beta", "Beta"), index).page, exact);
  assert.equal(resolveRef("missing", null, index).page, null);
});

test("prefers the nearest basename match and flags unresolvable ties", () => {
  const toolsAlpha = refPage("tools/alpha", "Tools alpha");
  const commandsAlpha = refPage("commands/alpha", "Commands alpha");
  const index = createRefIndex([toolsAlpha, commandsAlpha]);

  const near = resolveRef("alpha", refPage("tools/beta", "Beta"), index);
  assert.equal(near.page, toolsAlpha);
  assert.equal(near.ambiguous, false);

  const tie = resolveRef("alpha#usage", refPage("other/beta", "Beta"), index);
  assert.equal(tie.page, commandsAlpha);
  assert.equal(tie.ambiguous, true);
  assert.deepEqual(tie.candidates, [commandsAlpha, toolsAlpha]);
});
