import assert from "node:assert/strict";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { buildContentGraph, collectMarkdownTargets } from "../src/lib/content-graph.mjs";
import { createGraphReport, renderMarkdown } from "../scripts/content-graph.mjs";

test("builds deterministic references and reverse edges without treating assets as pages", async () => {
  const contentRoot = await mkdtemp(path.join(os.tmpdir(), "kb-content-graph-"));

  try {
    await mkdir(path.join(contentRoot, "tools", "alpha", "files"), { recursive: true });
    await mkdir(path.join(contentRoot, "tools", "beta"), { recursive: true });
    await mkdir(path.join(contentRoot, "tools", "gamma"), { recursive: true });
    await writeFile(path.join(contentRoot, "_index.md"), "---\ntitle: Root\n---\n");
    await writeFile(
      path.join(contentRoot, "tools", "_index.md"),
      "---\ntitle: Tools\n---\n"
    );
    await writeFile(
      path.join(contentRoot, "tools", "alpha", "index.md"),
      `---\ntitle: Alpha\n---\n[Beta](../beta/#overview)\n{{< ref "gamma" >}}\n![asset](files/sample.txt)\n`
    );
    await writeFile(
      path.join(contentRoot, "tools", "beta", "index.md"),
      "---\ntitle: Beta\n---\n## Overview\n"
    );
    await writeFile(
      path.join(contentRoot, "tools", "gamma", "index.md"),
      "---\ntitle: Gamma\n---\n"
    );
    await writeFile(path.join(contentRoot, "tools", "alpha", "files", "sample.txt"), "asset");

    const targets = collectMarkdownTargets(
      "[Beta](../beta/#overview)\n{{< ref \"gamma\" >}}\n![asset](files/sample.txt)"
    );
    assert.deepEqual(
      targets.map(({ kind, value, shortcode }) => ({ kind, value, shortcode })),
      [
        { kind: "link", value: "../beta/#overview", shortcode: false },
        { kind: "asset", value: "files/sample.txt", shortcode: undefined },
        { kind: "link", value: "gamma", shortcode: true }
      ]
    );

    const graph = buildContentGraph({ contentRoot });
    assert.equal(graph.summary.pages, 5);
    assert.equal(graph.summary.referenceCount, 2);
    assert.equal(graph.summary.uniqueReferenceCount, 2);
    assert.equal(graph.unresolved.length, 0);
    assert.deepEqual(
      graph.edges.map(({ fromUrl, toUrl, fragment }) => ({ fromUrl, toUrl, fragment })),
      [
        { fromUrl: "/tools/alpha/", toUrl: "/tools/beta/", fragment: "overview" },
        { fromUrl: "/tools/alpha/", toUrl: "/tools/gamma/", fragment: "" }
      ]
    );
    assert.equal(graph.incoming.get("/tools/beta/").length, 1);
    assert.deepEqual(graph.isolatedPages, ["/", "/tools/"]);

    const report = createGraphReport(graph, { limit: 1 });
    assert.equal(report.pages.length, 5);
    assert.equal(report.edges.length, 2);
    assert.equal(report.unresolvedReferences.length, 0);
    assert.deepEqual(report.isolatedPreview, ["/"]);
    assert.match(renderMarkdown(report), /Pages without explicit references/);
  } finally {
    await rm(contentRoot, { recursive: true, force: true });
  }
});

test("represents the full publishable corpus and resolves every page reference", () => {
  const graph = buildContentGraph();
  const urls = new Set(graph.pages.map((page) => page.url));

  assert.equal(graph.summary.pages, 751);
  assert.equal(graph.unresolved.length, 0);
  assert.ok(graph.summary.referenceCount > 0);
  assert.ok(graph.edges.every((edge) => urls.has(edge.fromUrl) && urls.has(edge.toUrl)));
  assert.equal(new Set(graph.pages.map((page) => page.url)).size, 751);
});
