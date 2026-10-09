import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { collectExternalMediaSources, isExternalSource } from "../src/lib/external-media.mjs";

const run = promisify(execFile);
const checkContentScript = fileURLToPath(new URL("../scripts/check-content.mjs", import.meta.url));

test("detects absolute and protocol-relative sources only", () => {
  assert.equal(isExternalSource("https://example.com/a.png"), true);
  assert.equal(isExternalSource("HTTP://example.com/a.png"), true);
  assert.equal(isExternalSource("//cdn.example.com/a.png"), true);
  assert.equal(isExternalSource(" https://example.com/a.png "), true);
  assert.equal(isExternalSource("images/a.png"), false);
  assert.equal(isExternalSource("/images/a.png"), false);
  assert.equal(isExternalSource("data:image/png;base64,AAAA"), false);
});

test("collects external Markdown images and raw HTML media attributes", () => {
  const sources = collectExternalMediaSources(
    [
      "![remote](https://example.com/a.png)",
      "![local](images/a.png)",
      "",
      "[![badge](//badges.example/b.svg)](https://example.com/)",
      "",
      "| Colour | Swatch |",
      "| ------ | ------ |",
      "| Cyan   | ![#06989a](https://placehold.example/06989a.png) |",
      "",
      '<img alt="x" src="https://example.com/c.png" width=10>',
      "<img src=https://example.com/unquoted.png>",
      "",
      '<img srcset="images/d.png 1x, https://example.com/d@2x.png 2x" src="images/d.png">',
      "",
      '<video poster="https://example.com/poster.jpg" controls><source src="images/e.mp4"></video>',
      "",
      '<a href="https://example.com/page">links are not media</a>',
      "",
      "```html",
      '<img src="https://example.com/in-code.png">',
      "![code](https://example.com/in-code.png)",
      "```",
      "",
      "    ![indented code](https://example.com/indented.png)"
    ].join("\n")
  );

  assert.deepEqual(sources, [
    { value: "https://example.com/a.png", line: 1, attribute: "image" },
    { value: "//badges.example/b.svg", line: 4, attribute: "image" },
    { value: "https://placehold.example/06989a.png", line: 8, attribute: "image" },
    // An HTML block reports the line it starts on.
    { value: "https://example.com/c.png", line: 10, attribute: "src" },
    { value: "https://example.com/unquoted.png", line: 10, attribute: "src" },
    { value: "https://example.com/d@2x.png", line: 13, attribute: "srcset" },
    { value: "https://example.com/poster.jpg", line: 15, attribute: "poster" }
  ]);
});

test("check:content fails on external images and passes on local images", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "kb-external-media-"));

  try {
    await mkdir(path.join(root, "scripts"), { recursive: true });
    await mkdir(path.join(root, "content", "tools", "remote"), { recursive: true });
    await mkdir(path.join(root, "content", "tools", "local", "images"), { recursive: true });
    await writeFile(
      path.join(root, "scripts", "content-policy.json"),
      JSON.stringify({ allowedAssetWarnings: [] })
    );
    await writeFile(path.join(root, "content", "_index.md"), "---\ntitle: Root\n---\n");
    await writeFile(path.join(root, "content", "tools", "_index.md"), "---\ntitle: Tools\n---\n");
    await writeFile(
      path.join(root, "content", "tools", "local", "index.md"),
      "---\ntitle: Local\n---\n\n![x](images/a.png)\n"
    );
    await writeFile(path.join(root, "content", "tools", "local", "images", "a.png"), "png");

    const passing = await run(process.execPath, [checkContentScript], { cwd: root });
    assert.doesNotMatch(passing.stderr, /error:/);

    await writeFile(
      path.join(root, "content", "tools", "remote", "index.md"),
      "---\ntitle: Remote\n---\n\nIntro.\n\n![x](https://example.com/a.png)\n"
    );

    await assert.rejects(run(process.execPath, [checkContentScript], { cwd: root }), (error) => {
      assert.equal(error.code, 1);
      assert.match(
        error.stderr,
        /error: tools\/remote\/index\.md:7: external media source https:\/\/example\.com\/a\.png; .*img-src\/media-src 'self'.*images\/ directory/
      );
      assert.doesNotMatch(error.stderr, /tools\/local\//);
      return true;
    });
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
