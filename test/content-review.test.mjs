import assert from "node:assert/strict";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import {
  collectContentPages,
  createReviewReport,
  classifyReviewPage,
  renderMarkdown,
  run
} from "../scripts/content-review.mjs";
import {
  differenceInDays,
  isValidDateValue,
  normalizeDate,
  subtractMonths
} from "../src/lib/date.mjs";

const asOf = "2026-08-02";
const staleBefore = "2025-08-02";

test("normalizes timestamp dates and rejects impossible calendar dates", () => {
  assert.equal(normalizeDate("2021-02-08T09:52:22+01:00"), "2021-02-08");
  assert.equal(normalizeDate("2024-02-29"), "2024-02-29");
  assert.equal(normalizeDate("2024-02-30"), undefined);
  assert.equal(normalizeDate("2023-02-29"), undefined);
  assert.equal(isValidDateValue("2024-04-31T00:00:00Z"), false);
  assert.equal(isValidDateValue("2024-04-30T00:00:00Z"), true);
});

test("subtracts calendar months with leap-day clamping", () => {
  assert.equal(subtractMonths(asOf, 12), staleBefore);
  assert.equal(subtractMonths("2024-02-29", 12), "2023-02-28");
});

test("keeps the 12-month boundary current and marks older dates stale", () => {
  const boundary = classifyReviewPage(
    { title: "Boundary", url: "/boundary/", section: "test", date: null, lastReviewed: staleBefore },
    { asOf, staleBefore }
  );
  const older = classifyReviewPage(
    { title: "Older", url: "/older/", section: "test", date: null, lastReviewed: "2025-08-01" },
    { asOf, staleBefore }
  );

  assert.equal(boundary.stale, false);
  assert.equal(boundary.needsReview, false);
  assert.equal(older.stale, true);
  assert.equal(older.needsReview, true);
  assert.equal(differenceInDays(asOf, "2025-08-01"), 366);
});

test("reports missing reviews, future dates, and effective-date age", () => {
  const missing = classifyReviewPage(
    { title: "Missing", url: "/missing/", section: "test", date: "2020-01-01", lastReviewed: null },
    { asOf, staleBefore }
  );
  const future = classifyReviewPage(
    { title: "Future", url: "/future/", section: "test", date: null, lastReviewed: "2026-08-03" },
    { asOf, staleBefore }
  );

  assert.deepEqual(missing.reasons, ["missing-lastReviewed", "stale"]);
  assert.equal(missing.needsReview, true);
  assert.equal(missing.ageDays, 2405);
  assert.deepEqual(future.reasons, ["future-date"]);
  assert.equal(future.futureDate, true);
  assert.equal(future.stale, false);
  assert.equal(future.needsReview, false);
});

test("sorts same-date entries deterministically and limits Markdown output", () => {
  const report = createReviewReport(
    [
      { title: "Zulu", url: "/zulu/", section: "test", date: "2025-08-02", lastReviewed: null },
      { title: "Alpha", url: "/alpha/", section: "test", date: "2025-08-02", lastReviewed: null }
    ],
    { asOf, limit: 1 }
  );

  assert.deepEqual(report.pages.map((page) => page.title), ["Alpha", "Zulu"]);
  const markdown = renderMarkdown(report);
  assert.match(markdown, /Showing the oldest 1 queue entries/);
  assert.match(markdown, /\[Alpha\]\(\/alpha\/\)/);
  assert.doesNotMatch(markdown, /\[Zulu\]\(\/zulu\/\)/);
});

test("indexes the full publishable content corpus", async () => {
  const pages = await collectContentPages();
  const report = createReviewReport(pages, { asOf });

  assert.equal(pages.length, 751);
  assert.equal(report.pages.length, pages.length);
  assert.equal(
    report.summary.needsReview,
    report.pages.filter((page) => page.needsReview).length
  );
  assert.equal(
    report.summary.missingLastReviewed,
    report.pages.filter((page) => page.missingReview).length
  );
  assert.equal(report.summary.totalPages, report.pages.length);
  assert.equal(new Set(report.pages.map((page) => page.url)).size, 751);
  assert.equal(pages.filter((page) => page.metadataProvenance.tags?.kind === "cascade").length, 521);
  assert.equal(report.summary.priorityTiers.high > 0, true);
});

test("ranks higher-risk sections ahead of equally old pages", () => {
  const report = createReviewReport(
    [
      { title: "Tool", url: "/tools/tool/", section: "tools", date: "2020-01-01", lastReviewed: null },
      { title: "CVE", url: "/cve/cve-2020/", section: "cve", date: "2020-01-01", lastReviewed: null }
    ],
    { asOf }
  );

  assert.equal(report.pages[0].title, "CVE");
  assert.ok(report.pages[0].priorityScore > report.pages[1].priorityScore);
});

test("writes a complete JSON corpus report", async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), "kb-content-review-"));

  try {
    const jsonFile = path.join(directory, "review.json");
    await run([
      "--as-of",
      asOf,
      "--output",
      path.join(directory, "review.md"),
      "--json",
      jsonFile
    ]);

    const report = JSON.parse(await readFile(jsonFile, "utf8"));
    assert.equal(report.pages.length, 751);
    assert.equal(new Set(report.pages.map((page) => page.url)).size, 751);
    assert.equal(report.summary.totalPages, 751);
    assert.equal(report.summary.needsReview, 751);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
