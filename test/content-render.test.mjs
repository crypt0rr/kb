import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
import { renderPage } from "../src/lib/content.ts";
import { isValidYoutubeId, parseGistReference } from "../src/lib/shortcodes.mjs";

function page(body) {
  return { body };
}

test("renders GitHub Gist shortcodes as CSP-safe links", () => {
  const html = renderPage(page("{{< gist crypt0rr 29ed56a74c73f95f2ba0b99f1b675c1c >}}"));

  assert.match(html, /class="gist-embed"/);
  assert.match(html, /https:\/\/gist\.github\.com\/crypt0rr\/29ed56a74c73f95f2ba0b99f1b675c1c/);
  assert.match(html, />View GitHub Gist<\/a>/);
  assert.doesNotMatch(html, /\{\{/);
});

test("renders YouTube shortcodes with the privacy-preserving host", () => {
  const html = renderPage(page("{{< youtube QWZ_LjzT39k >}}"));

  assert.match(html, /https:\/\/www\.youtube-nocookie\.com\/embed\/QWZ_LjzT39k/);
  assert.match(html, /referrerpolicy="strict-origin-when-cross-origin"/);
  assert.doesNotMatch(html, /\{\{/);
});

test("allows the rendered YouTube origin in the deployment policy", async () => {
  const headers = await readFile(new URL("../public/_headers", import.meta.url), "utf8");

  assert.match(headers, /frame-src[^\n]*https:\/\/www\.youtube-nocookie\.com/);
});

test("shares shortcode argument validation between checks and rendering", () => {
  assert.equal(isValidYoutubeId("QWZ_LjzT39k"), true);
  assert.equal(isValidYoutubeId("javascript:alert(1)"), false);
  assert.deepEqual(parseGistReference("crypt0rr 29ed56a74c73f95f2ba0b99f1b675c1c"), {
    owner: "crypt0rr",
    gistId: "29ed56a74c73f95f2ba0b99f1b675c1c"
  });
  assert.equal(parseGistReference("crypt0rr"), null);
  assert.equal(parseGistReference("crypt0rr \" onerror=alert(1)"), null);
});
