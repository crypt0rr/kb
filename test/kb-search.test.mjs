import assert from "node:assert/strict";
import test from "node:test";
import {
  MAX_RESULTS,
  buildSearchRequest,
  escapeAttr,
  escapeHtml,
  formatResultCount,
  renderSearchResults,
  resolveTagOption,
  sanitizePagefindExcerpt
} from "../static/js/kb-search.js";

test("builds no search request without a query or filter", () => {
  assert.equal(buildSearchRequest(), null);
  assert.equal(buildSearchRequest({ query: "", section: "", tag: "" }), null);
  assert.equal(buildSearchRequest({ query: "   " }), null);
  assert.equal(buildSearchRequest({ query: undefined, section: undefined, tag: undefined }), null);
});

test("normalizes the query and leaves filters out when none are set", () => {
  assert.deepEqual(buildSearchRequest({ query: "  Kerberoast " }), {
    term: "kerberoast",
    options: undefined
  });
});

test("combines a query with section and tag filters", () => {
  assert.deepEqual(buildSearchRequest({ query: "awk", section: "commands", tag: "Linux" }), {
    term: "awk",
    options: { filters: { section: "commands", tag: "Linux" } }
  });
});

test("turns an empty query with a filter into a filter-only search", () => {
  assert.deepEqual(buildSearchRequest({ query: " ", section: "tools" }), {
    term: null,
    options: { filters: { section: "tools" } }
  });
  // Filter values are passed through untouched: Pagefind matches them exactly.
  assert.deepEqual(buildSearchRequest({ tag: "Brute Force" }), {
    term: null,
    options: { filters: { tag: "Brute Force" } }
  });
});

test("resolves a URL tag by label, then slug, then case-insensitive label", () => {
  const options = [
    { value: "", slug: undefined },
    { value: "Active Directory", slug: "active-directory" },
    { value: "Docker", slug: "docker" }
  ];

  assert.equal(resolveTagOption(options, "Docker"), "Docker");
  assert.equal(resolveTagOption(options, "docker"), "Docker");
  assert.equal(resolveTagOption(options, "active-directory"), "Active Directory");
  assert.equal(resolveTagOption(options, " active directory "), "Active Directory");
  assert.equal(resolveTagOption(options, "kubernetes"), "");
  assert.equal(resolveTagOption(options, ""), "");
  assert.equal(resolveTagOption(options, null), "");
});

test("formats the result count honestly when results are truncated", () => {
  assert.equal(formatResultCount(1, 1), "1 result");
  assert.equal(formatResultCount(5, 5), "5 results");
  assert.equal(formatResultCount(MAX_RESULTS, 87), `showing ${MAX_RESULTS} of 87 results`);
});

test("renders a no-results status for an empty result list", () => {
  assert.equal(renderSearchResults([], 0), '<p class="search-status" role="status">no results</p>');
});

test("renders result links with the total count and escaped fields", () => {
  const html = renderSearchResults(
    [
      {
        url: "/tools/x/?a='b'&c=\"d\"",
        meta: { title: "<b>Tool</b>", section: "tools & more" },
        excerpt: "use <mark>tool</mark> <img src=x onerror=alert(1)>"
      },
      { url: "/plain/", meta: {}, excerpt: "" }
    ],
    40
  );

  assert.match(html, /^<p class="search-status" role="status">showing 2 of 40 results<\/p>/);
  assert.match(html, /href="\/tools\/x\/\?a=&#39;b&#39;&amp;c=&quot;d&quot;"/);
  assert.match(html, /<strong>&lt;b&gt;Tool&lt;\/b&gt;<\/strong>/);
  assert.match(html, /<small>tools &amp; more<\/small>/);
  assert.match(html, /use <mark>tool<\/mark> &lt;img src=x onerror=alert\(1\)&gt;/);
  // A result without a title, section or excerpt falls back to its URL.
  assert.match(html, /<strong>\/plain\/<\/strong>\s*<p>\/plain\/<\/p>/);
  assert.equal(html.match(/<a /g).length, 2);
});

test("defaults the total to the number of rendered results", () => {
  const html = renderSearchResults([{ url: "/a/", meta: { title: "A" }, excerpt: "a" }]);
  assert.match(html, /role="status">1 result<\/p>/);
});

test("escapes HTML and attribute values and keeps only Pagefind marks", () => {
  assert.equal(escapeHtml(`<a href="x">&</a>`), "&lt;a href=&quot;x&quot;&gt;&amp;&lt;/a&gt;");
  assert.equal(escapeHtml(42), "42");
  assert.equal(escapeAttr("it's"), "it&#39;s");
  assert.equal(
    sanitizePagefindExcerpt("<mark>hit</mark><script>x</script>"),
    "<mark>hit</mark>&lt;script&gt;x&lt;/script&gt;"
  );
});
