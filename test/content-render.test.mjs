import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { renderPage } from "../src/lib/content.ts";
import { buildContentIndex } from "../src/lib/content-index.mjs";
import { parseFrontmatter } from "../src/lib/frontmatter.mjs";
import { MAX_HIGHLIGHT_LENGTH, highlightCode, highlightLanguage } from "../src/lib/highlight.mjs";
import { collectAnchors, createMarkdown, createRefIndex } from "../src/lib/links.mjs";
import { isValidYoutubeId, parseGistReference } from "../src/lib/shortcodes.mjs";
import { contentRoot, walkMarkdownFiles } from "./helpers/corpus.mjs";

function page(body) {
  return { body };
}

function fence(language, code) {
  return ["```" + language, code, "```"].join("\n");
}

function stripSpans(html) {
  return html.replace(/<\/?span[^>]*>/g, "");
}

// What a browser's innerText yields for highlighted code: tags dropped and the
// entities markdown-it/highlight.js emit decoded.
function codeText(html) {
  return stripSpans(html)
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&amp;/g, "&");
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

test("does not enforce a cross-origin embedder policy that blocks the YouTube embed", async () => {
  const headers = await readFile(new URL("../public/_headers", import.meta.url), "utf8");

  // youtube-nocookie.com only sends a report-only COEP, so any enforced COEP on
  // the embedding page makes Chromium refuse the iframe (ERR_BLOCKED_BY_RESPONSE).
  // tests/security-headers.spec.mjs proves this in a browser.
  assert.doesNotMatch(headers, /^\s*Cross-Origin-Embedder-Policy\s*:/im);
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

test("throws on unresolved refs instead of emitting an empty link", () => {
  assert.throws(
    () =>
      renderPage({
        ...page('[Missing]({{< ref "no-such-page-anywhere" >}})'),
        relativeFile: "fixtures/missing-ref.md"
      }),
    /fixtures\/missing-ref\.md: unresolved ref "no-such-page-anywhere"/
  );
});

test("parses notice bodies in the main pass so code blocks keep blank lines", () => {
  const html = renderPage(
    page(
      [
        "{{% notice info %}}",
        "```bash",
        "echo one",
        "",
        "# comment",
        "echo two",
        "```",
        "{{% /notice %}}"
      ].join("\n")
    )
  );

  assert.equal(html.match(/<pre>/g)?.length, 1);
  assert.match(html, /^<aside class="notice notice-info">/);
  assert.match(stripSpans(html), /# comment\necho two\n<\/code><\/pre>\n<\/aside>/);
  assert.doesNotMatch(html, /<h1/);
});

test("resolves shortcodes nested inside notices", () => {
  const html = renderPage(
    page('{{% notice warning %}}\nSee [awk]({{< ref "awk" >}}).\n{{% /notice %}}')
  );

  assert.match(html, /<aside class="notice notice-warning">/);
  assert.match(html, /<a href="\/commands\/unix\/awk\/">awk<\/a>/);
  assert.doesNotMatch(html, /\{\{|&lt;/);
});

test("never nests anchors in headings that contain a link", () => {
  const html = renderPage(page("## [Link](https://x.y) title\n\n## Plain"));

  assert.doesNotMatch(html, /<a [^>]*>(?:(?!<\/a>).)*<a /s);
  assert.match(
    html,
    /<h2 id="link-title" tabindex="-1"><a href="https:\/\/x\.y" target="_blank" rel="noopener noreferrer">Link<\/a> title <a class="heading-permalink" href="#link-title" aria-label="Permalink to Link title">#<\/a><\/h2>/
  );
  assert.match(
    html,
    /<h2 id="plain" tabindex="-1"><a class="header-anchor" href="#plain">Plain<\/a><\/h2>/
  );
});

test("labels permalinks of headings that link an image", () => {
  const html = renderPage(page("## [![logo](x.png)](https://e.x) Tool\n\n## [![img](a.png)](b)"));

  assert.match(html, /<h2 id="tool"[^>]*>.*aria-label="Permalink to logo Tool">#<\/a><\/h2>/);
  assert.doesNotMatch(html, /href="#"/);
  assert.doesNotMatch(html, /aria-label="Permalink to "/);
});

test("collects the same heading ids the renderer emits for headings with refs", () => {
  const body = '## Using [awk]({{< ref "awk" >}})\n\n## Pair with {{< ref "awk" >}}';
  const html = renderPage(page(body));
  const rendered = [...html.matchAll(/<h2 id="([^"]*)"/g)].map((match) => match[1]);
  const refIndex = createRefIndex(buildContentIndex({ strict: false }).pages);

  assert.deepEqual(rendered, ["using-awk", "pair-with-commands-unix-awk"]);
  assert.deepEqual([...collectAnchors(body, { page: {}, refIndex })], rendered);
});

test("highlights labelled bash fences with class-based tokens", () => {
  const html = renderPage(page(fence("bash", 'echo "$HOME" # where am I')));

  assert.match(html, /^<pre><code class="language-bash">/);
  assert.match(html, /<span class="hljs-built_in">echo<\/span>/);
  assert.match(html, /<span class="hljs-variable">\$HOME<\/span>/);
  assert.match(html, /<span class="hljs-comment"># where am I<\/span>/);
});

test("resolves fence languages case-insensitively and through aliases", () => {
  const powershell = renderPage(page(fence("PowerShell", "Get-Process | Where-Object { $_.CPU -gt 1 }")));
  const cmd = renderPage(page(fence("cmd", "echo %PATH%\nREM note")));

  assert.match(powershell, /<code class="language-PowerShell">/);
  assert.match(powershell, /<span class="hljs-built_in">Get-Process<\/span>/);
  assert.match(cmd, /<code class="language-cmd">/);
  assert.match(cmd, /<span class="hljs-variable">%PATH%<\/span>/);
  assert.match(cmd, /<span class="hljs-comment">REM note<\/span>/);

  assert.equal(highlightLanguage("POWERSHELL"), "powershell");
  assert.equal(highlightLanguage("Cmd"), "cmd");
  assert.equal(highlightLanguage("HTML"), "html");
});

test("leaves plain, unlabelled and unknown fences exactly as before", () => {
  const plainMarkdown = createMarkdown();
  const code = 'sudo cat /etc/shadow | grep "<root>" && echo $HOME';

  for (const label of ["plain", "", "sudo", "no-such-language"]) {
    const source = fence(label, code);
    const html = renderPage(page(source));

    assert.equal(html, plainMarkdown.render(source), `fence "${label}"`);
    assert.doesNotMatch(html, /<span/, `fence "${label}"`);
  }
  assert.equal(highlightLanguage("plain"), null);
  assert.equal(highlightCode(code, "plain"), "");
});

test("leaves oversized and long-word-run fences plain so the build stays fast", () => {
  const plainMarkdown = createMarkdown();
  const cases = [
    ["shellcode", `echo ${"4142".repeat(50000)}`],
    ["oversized", "echo ok\n".repeat(MAX_HIGHLIGHT_LENGTH / 8 + 1)]
  ];

  for (const [name, code] of cases) {
    const source = fence("bash", code);
    const started = performance.now();
    const html = renderPage(page(source));

    assert.ok(performance.now() - started < 1000, name);
    assert.equal(highlightCode(code, "bash"), "", name);
    assert.equal(html, plainMarkdown.render(source), name);
  }
  assert.match(highlightCode(`echo ${"41".repeat(400)}`, "bash"), /hljs-built_in/);
});

test("escapes markup inside highlighted code", () => {
  const cases = [
    ["bash", 'echo "<script>alert(1)</script>"'],
    ["html", '<img src=x onerror="alert(1)"></code></pre><script>x</script>']
  ];

  for (const [language, code] of cases) {
    const html = renderPage(page(fence(language, code)));
    const inner = html.match(/^<pre><code class="language-\w+">([\s\S]*)<\/code><\/pre>\n$/)?.[1];

    assert.ok(inner, language);
    assert.match(inner, /<span class="hljs-/, language);
    assert.doesNotMatch(inner, /<(?!\/?span[\s>])/, language);
    assert.equal(codeText(inner), `${code}\n`, language);
  }
});

test("emits no inline style attributes for any highlighted language", () => {
  const languages = [
    "bash", "PowerShell", "cmd", "yaml", "html", "c", "cpp",
    "json", "python", "javascript", "ini", "sql", "diff"
  ];
  const code = 'x = "a" # 1 <b style="color:red">';
  const html = renderPage(page(languages.map((language) => fence(language, code)).join("\n\n")));

  assert.equal(html.match(/<pre>/g)?.length, languages.length);
  assert.equal(html.match(/<span class="hljs-/g)?.length > languages.length, true);
  assert.doesNotMatch(html, /<[^>]*\sstyle\s*=/i);
});

test("keeps the text of every labelled fence in the corpus intact", () => {
  const markdown = createMarkdown();
  let highlighted = 0;

  for (const file of walkMarkdownFiles()) {
    const source = readFileSync(path.join(contentRoot, file), "utf8");
    for (const token of markdown.parse(parseFrontmatter(source, file).content, {})) {
      if (token.type !== "fence") continue;
      const html = highlightCode(token.content, token.info.trim().split(/\s+/)[0]);
      if (!html) continue;
      highlighted += 1;
      assert.doesNotMatch(html, /<[^>]*\sstyle\s*=/i, file);
      assert.equal(codeText(html), token.content, `${file}: ${token.info}`);
    }
  }
  assert.ok(highlighted > 0);
});
