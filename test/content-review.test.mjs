import assert from "node:assert/strict";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import {
  collectContentPages,
  createReviewReport,
  classifyReviewPage,
  parseArguments,
  renderMarkdown,
  renderSummary,
  run
} from "../scripts/content-review.mjs";
import {
  differenceInDays,
  isValidDateValue,
  normalizeDate,
  subtractDays,
  subtractMonths
} from "../src/lib/date.mjs";
import { corpusAsOf, describeCorpus } from "./helpers/corpus.mjs";

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
  const corpus = describeCorpus();
  const pages = await collectContentPages();
  const report = createReviewReport(pages, { asOf: corpusAsOf(asOf) });

  assert.ok(pages.length > 0);
  assert.deepEqual(pages.map((page) => page.url).sort(), corpus.publishedUrls);
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
  assert.equal(report.summary.missingLastReviewed, corpus.missingLastReviewed);
  assert.ok(report.summary.needsReview >= report.summary.missingLastReviewed);
  assert.ok(report.summary.needsReview <= report.summary.totalPages);
  assert.equal(new Set(report.pages.map((page) => page.url)).size, report.pages.length);
  assert.equal(
    pages.filter((page) => page.metadataProvenance.tags?.kind === "cascade").length,
    corpus.published.filter((page) => page.metadataProvenance.tags?.kind === "cascade").length
  );
  assert.ok(pages.some((page) => page.metadataProvenance.tags?.kind === "cascade"));
  assert.ok(
    report.pages
      .filter((page) => page.missingReview)
      .every((page) => ["critical", "high"].includes(page.priorityTier))
  );
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

test("subtracts calendar days across month and leap-year boundaries", () => {
  assert.equal(subtractDays(asOf, 90), "2026-05-04");
  assert.equal(subtractDays("2024-03-01", 1), "2024-02-29");
  assert.equal(subtractDays("2026-01-01", 1), "2025-12-31");
  assert.equal(subtractDays("2026-02-30", 1), undefined);
});

test("counts pages reviewed within the recent window without changing priorities", () => {
  const pages = [
    { title: "Today", url: "/today/", section: "cve", date: null, lastReviewed: asOf },
    { title: "Boundary", url: "/boundary/", section: "tools", date: null, lastReviewed: "2026-05-04" },
    { title: "Older", url: "/older/", section: "tools", date: null, lastReviewed: "2026-05-03" },
    { title: "Future", url: "/future/", section: "cve", date: null, lastReviewed: "2026-08-03" },
    { title: "Missing", url: "/missing/", section: "cve", date: "2020-01-01", lastReviewed: null }
  ];
  const report = createReviewReport(pages, { asOf });

  assert.equal(report.recentReviewDays, 90);
  assert.equal(report.recentReviewSince, "2026-05-04");
  assert.equal(report.summary.reviewed, 4);
  assert.equal(report.summary.missingLastReviewed, 1);
  assert.equal(report.summary.reviewedRecently, 2);

  const narrow = createReviewReport(pages, { asOf, recentDays: 30 });
  assert.equal(narrow.recentReviewSince, "2026-07-03");
  assert.equal(narrow.summary.reviewedRecently, 1);
  assert.deepEqual(
    narrow.pages.map((page) => [page.url, page.priorityScore, page.priorityTier]),
    report.pages.map((page) => [page.url, page.priorityScore, page.priorityTier])
  );
  assert.throws(() => createReviewReport(pages, { asOf, recentDays: 0 }), /recent review days/);

  assert.match(
    renderMarkdown(report),
    /^- Reviewed pages: 4\n- Reviewed in the last 90 days \(since 2026-05-04\): 2$/m
  );
  assert.match(renderSummary(report), /^- Reviewed: 4 \(2 in the last 90 days\)$/m);
  assert.match(renderSummary(narrow), /^- Reviewed: 4 \(1 in the last 30 days\)$/m);
});

test("parses --recent-days as a positive integer", () => {
  assert.equal(parseArguments([]).recentDays, 90);
  assert.equal(parseArguments(["--recent-days", "30"]).recentDays, 30);
  assert.equal(parseArguments(["--recent-days=7"]).recentDays, 7);
  assert.throws(
    () => parseArguments(["--recent-days", "0"]),
    /--recent-days must be a positive integer/
  );
});

test("writes a complete JSON corpus report", async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), "kb-content-review-"));

  try {
    const corpus = describeCorpus();
    const jsonFile = path.join(directory, "review.json");
    await run([
      "--as-of",
      corpusAsOf(asOf),
      "--output",
      path.join(directory, "review.md"),
      "--json",
      jsonFile
    ]);

    const report = JSON.parse(await readFile(jsonFile, "utf8"));
    assert.deepEqual(report.pages.map((page) => page.url).sort(), corpus.publishedUrls);
    assert.equal(report.summary.totalPages, corpus.published.length);
    assert.equal(report.summary.missingLastReviewed, corpus.missingLastReviewed);
    assert.ok(report.summary.needsReview >= corpus.missingLastReviewed);
    assert.ok(report.summary.needsReview <= corpus.published.length);
    assert.ok(report.summary.reviewedRecently <= report.summary.reviewed);
    assert.equal(report.recentReviewDays, 90);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
