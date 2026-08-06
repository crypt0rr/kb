import assert from "node:assert/strict";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import {
  assessPageHealth,
  classifyReviewSignal,
  compareHealthPages,
  createHealthSummary
} from "../src/lib/content-health.mjs";
import { buildContentGraph } from "../src/lib/content-graph.mjs";
import {
  createContentHealthReport,
  renderMarkdown
} from "../scripts/content-health.mjs";

const asOf = "2026-08-06";

test("classifies verified, review-due, context-light, and repair-needed pages", () => {
  const base = {
    title: "Example",
    url: "/example/",
    date: "2026-01-01",
    lastReviewed: "2026-01-01",
    metadataErrors: []
  };

  assert.equal(
    assessPageHealth(base, {
      review: classifyReviewSignal(base, { asOf }),
      graph: { incoming: 1, outgoing: 1 }
    }).state,
    "verified"
  );

  const missing = { ...base, lastReviewed: undefined };
  assert.equal(
    assessPageHealth(missing, {
      review: classifyReviewSignal(missing, { asOf }),
      graph: { incoming: 1, outgoing: 0 }
    }).state,
    "review-due"
  );

  const contextLight = { ...base, lastReviewed: asOf };
  assert.equal(
    assessPageHealth(contextLight, {
      review: classifyReviewSignal(contextLight, { asOf }),
      graph: { incoming: 0, outgoing: 0 }
    }).state,
    "context-light"
  );

  const repair = { ...base, metadataErrors: ["invalid cascade"] };
  const repairHealth = assessPageHealth(repair, {
    review: classifyReviewSignal(repair, { asOf }),
    graph: { incoming: 1, outgoing: 1 },
    linkFindings: { missingAnchors: 1, brokenAssets: 1 }
  });
  assert.equal(repairHealth.state, "repair-needed");
  assert.deepEqual(repairHealth.reasons, [
    "metadata-error",
    "missing-anchor",
    "missing-asset-target"
  ]);
});

test("future dates are repair findings and the 12-month boundary is current", () => {
  const boundary = { date: null, lastReviewed: "2025-08-06" };
  const boundaryReview = classifyReviewSignal(boundary, { asOf });
  assert.equal(boundaryReview.stale, false);
  assert.equal(boundaryReview.ageDays, 365);

  const future = { date: null, lastReviewed: "2026-08-07" };
  const futureHealth = assessPageHealth(future, {
    review: classifyReviewSignal(future, { asOf }),
    graph: { incoming: 1, outgoing: 1 }
  });
  assert.equal(futureHealth.state, "repair-needed");
  assert.deepEqual(futureHealth.reasons, ["future-date"]);
});

test("graph findings distinguish missing anchors, assets, external, and protocol targets", async () => {
  const contentRoot = await mkdtemp(path.join(os.tmpdir(), "kb-content-health-graph-"));

  try {
    await mkdir(path.join(contentRoot, "tools", "source"), { recursive: true });
    await mkdir(path.join(contentRoot, "tools", "target"), { recursive: true });
    await writeFile(path.join(contentRoot, "_index.md"), "---\ntitle: Root\n---\n");
    await writeFile(
      path.join(contentRoot, "tools", "source", "index.md"),
      "---\ntitle: Source\n---\n[Target](../target/#missing)\n![Missing](files/nope.txt)\n[External](https://example.test)\n[Mail](mailto:test@example.test)\n"
    );
    await writeFile(
      path.join(contentRoot, "tools", "target", "index.md"),
      "---\ntitle: Target\n---\n## Present\n"
    );

    const graph = buildContentGraph({ contentRoot });
    const findings = graph.pageFindings.get("/tools/source/");
    assert.deepEqual(findings, {
      brokenLinks: 0,
      missingAnchors: 1,
      brokenAssets: 1,
      externalLinks: 1,
      protocolLinks: 1
    });
    assert.equal(graph.summary.missingAnchors, 1);
    assert.equal(graph.summary.brokenAssets, 1);
    assert.equal(graph.edges.length, 1);
  } finally {
    await rm(contentRoot, { recursive: true, force: true });
  }
});

test("health summary and ordering are deterministic", () => {
  const pages = [
    {
      title: "Beta",
      url: "/beta/",
      state: "review-due",
      priorityScore: 100,
      review: { effectiveDate: "2025-01-01", futureDate: false, missingReview: true, stale: true, lastReviewed: null },
      links: { brokenLinks: 0, missingAnchors: 0, brokenAssets: 0, externalLinks: 0, protocolLinks: 0 },
      metadataErrors: []
    },
    {
      title: "Alpha",
      url: "/alpha/",
      state: "review-due",
      priorityScore: 100,
      review: { effectiveDate: "2025-01-01", futureDate: false, missingReview: true, stale: true, lastReviewed: null },
      links: { brokenLinks: 0, missingAnchors: 0, brokenAssets: 0, externalLinks: 0, protocolLinks: 0 },
      metadataErrors: []
    }
  ];
  assert.deepEqual([...pages].sort(compareHealthPages).map((page) => page.title), ["Alpha", "Beta"]);
  const summary = createHealthSummary(pages);
  assert.equal(summary.totalPages, 2);
  assert.equal(summary.reviewDue, 2);
  assert.equal(summary.missingLastReviewed, 2);
  assert.equal(summary.stale, 2);
});

test("full corpus ledger contains every publishable page and accurate integrity counts", () => {
  const report = createContentHealthReport({ asOf });
  const second = createContentHealthReport({ asOf });

  assert.equal(report.pages.length, 751);
  assert.equal(new Set(report.pages.map((page) => page.url)).size, 751);
  assert.equal(report.summary.totalPages, 751);
  assert.equal(report.summary.reviewDue, 751);
  assert.equal(report.summary.missingLastReviewed, 751);
  assert.equal(report.summary.repairNeeded, 0);
  assert.equal(report.summary.brokenLinks, 0);
  assert.equal(report.summary.missingAnchors, 0);
  assert.equal(report.summary.brokenAssets, 0);
  assert.deepEqual(
    report.pages.map((page) => page.url),
    second.pages.map((page) => page.url)
  );
  assert.match(renderMarkdown(report), /Content trust ledger/);
  assert.match(renderMarkdown(report), /Highest-priority 100 pages/);
});
