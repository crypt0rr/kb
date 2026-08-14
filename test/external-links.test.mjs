import assert from "node:assert/strict";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import {
  checkUrl,
  createExternalLinkReport,
  parseArguments,
  renderMarkdown,
  renderSummary,
  run
} from "../scripts/check-external-links.mjs";

test("creates a complete, deterministically ordered external-link report", () => {
  const report = createExternalLinkReport(
    [
      { url: "https://z.example", status: 503 },
      { url: "https://a.example", status: 200 },
      { url: "https://m.example", error: "request timed out" }
    ],
    {
      generatedAt: "2026-08-14T00:00:00.000Z",
      timeoutMs: 5000,
      concurrency: 2
    }
  );

  assert.deepEqual(report.summary, { checked: 3, passed: 1, failed: 2 });
  assert.deepEqual(
    report.results.map(({ url }) => url),
    ["https://a.example", "https://m.example", "https://z.example"]
  );
  assert.equal(report.results[1].status, null);
  assert.equal(report.generatedAt, "2026-08-14T00:00:00.000Z");
  assert.match(renderMarkdown(report), /Failures: 2/);
  assert.match(renderMarkdown(report), /https:\/\/z\.example/);
  assert.match(renderSummary(report), /First failures \(of 2\)/);
});

test("renders a concise success summary without failure rows", () => {
  const report = createExternalLinkReport(
    [{ url: "https://example.test", status: 204 }],
    { generatedAt: "2026-08-14T00:00:00.000Z" }
  );

  assert.match(renderMarkdown(report), /All checked external links responded successfully/);
  assert.doesNotMatch(renderMarkdown(report), /## Failures/);
  assert.match(renderSummary(report), /All checked URLs responded successfully/);
});

test("falls back from HEAD to GET for servers that reject HEAD", async () => {
  const methods = [];
  const result = await checkUrl("https://example.test", {
    timeoutMs: 1000,
    fetchImpl: async (_url, options) => {
      methods.push(options.method);
      return {
        status: options.method === "HEAD" ? 405 : 200,
        body: { cancel() {} }
      };
    }
  });

  assert.deepEqual(methods, ["HEAD", "GET"]);
  assert.deepEqual(result, { url: "https://example.test", status: 200 });
});

test("parses report, summary, timeout, and concurrency options", () => {
  assert.deepEqual(
    parseArguments([
      "--output",
      "reports/links.md",
      "--json=reports/links.json",
      "--summary-file",
      "summary.md",
      "--timeout",
      "5000",
      "--concurrency=3"
    ]),
    {
      output: "reports/links.md",
      json: "reports/links.json",
      summaryFile: "summary.md",
      timeoutMs: 5000,
      concurrency: 3
    }
  );
});

test("run writes Markdown, complete JSON, and the requested summary", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "kb-external-links-"));

  try {
    await mkdir(path.join(root, "content", "tools", "example"), { recursive: true });
    await writeFile(
      path.join(root, "content", "tools", "example", "index.md"),
      "---\ntitle: Example\n---\n[Good](https://good.example)\n[Bad](https://bad.example)\n"
    );
    await writeFile(path.join(root, "README.md"), "[Good](https://good.example)\n");

    const report = await run(
      [
        "--output",
        ".reports/links.md",
        "--json",
        ".reports/links.json",
        "--summary-file",
        ".reports/summary.md"
      ],
      {
        root,
        generatedAt: "2026-08-14T00:00:00.000Z",
        fetchImpl: async (url, options) => ({
          status: url.includes("bad") ? 404 : 200,
          body: { cancel() {} },
          headers: options
        })
      }
    );

    const json = JSON.parse(await readFile(path.join(root, ".reports/links.json"), "utf8"));
    const markdown = await readFile(path.join(root, ".reports/links.md"), "utf8");
    const summary = await readFile(path.join(root, ".reports/summary.md"), "utf8");

    assert.equal(report.summary.checked, 2);
    assert.deepEqual(json.summary, { checked: 2, passed: 1, failed: 1 });
    assert.equal(json.results.length, 2);
    assert.match(markdown, /Failures: 1/);
    assert.match(summary, /External link health/);
    assert.match(summary, /https:\/\/bad\.example/);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
