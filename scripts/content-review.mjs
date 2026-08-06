import { appendFile, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { buildContentIndex } from "../src/lib/content-index.mjs";
import {
  normalizeDate,
  subtractMonths
} from "../src/lib/date.mjs";
import { classifyReviewSignal } from "../src/lib/content-health.mjs";

export const DEFAULT_OUTPUT = ".reports/content-review.md";
export const DEFAULT_JSON_OUTPUT = ".reports/content-review.json";
export const DEFAULT_STALE_MONTHS = 12;
export const DEFAULT_LIMIT = 100;
export const DEFAULT_SECTION_WEIGHTS = Object.freeze({
  cve: 4,
  tools: 3,
  commands: 2,
  stuff: 1,
  index: 0
});
export const REVIEW_PRIORITY = Object.freeze({
  sectionMultiplier: 100,
  missingReview: 2_000,
  futureDate: 5_000,
  metadataError: 10_000,
  maxStaleAgeDays: 5_000,
  highThreshold: 2_000,
  criticalThreshold: 10_000
});

const contentRoot = path.join(process.cwd(), "content");
const collator = new Intl.Collator("en", { sensitivity: "base", numeric: true });

export async function collectContentPages(directory = contentRoot) {
  const index = buildContentIndex({
    contentRoot: directory,
    strict: false
  });

  return index.pages.map((page) => {
    const metadata = page.effectiveFrontmatter;
    return {
      relativeFile: page.relativeFile,
      url: page.url,
      title: page.title,
      section: page.section || "index",
      date: normalizeDate(metadata.date),
      lastReviewed: normalizeDate(metadata.lastReviewed),
      tags: Array.isArray(metadata.tags) ? metadata.tags : [],
      platforms: Array.isArray(metadata.platforms) ? metadata.platforms : [],
      status: metadata.status ?? null,
      metadataProvenance: page.metadataProvenance,
      metadataErrors: page.metadataErrors
    };
  });
}

export function classifyReviewPage(
  page,
  { asOf, staleBefore, sectionWeights = DEFAULT_SECTION_WEIGHTS }
) {
  const review = classifyReviewSignal(page, { asOf, staleBefore });
  const metadataErrors = Array.isArray(page.metadataErrors) ? page.metadataErrors : [];
  const reasons = [...review.reasons];

  const priority = calculateReviewPriority(
    {
      ...page,
      missingReview: review.missingReview,
      stale: review.stale,
      futureDate: review.futureDate,
      metadataErrors,
      ageDays: review.ageDays
    },
    sectionWeights
  );

  if (metadataErrors.length) reasons.push("metadata-error");

  return {
    ...page,
    date: page.date ?? null,
    lastReviewed: page.lastReviewed ?? null,
    asOf: review.asOf,
    staleBefore: review.staleBefore,
    effectiveDate: review.effectiveDate,
    ageDays: review.ageDays,
    missingReview: review.missingReview,
    stale: review.stale,
    futureDate: review.futureDate,
    metadataErrors,
    needsReview: review.needsReview || metadataErrors.length > 0,
    reasons,
    ...priority
  };
}

export function calculateReviewPriority(page, sectionWeights = DEFAULT_SECTION_WEIGHTS) {
  const hasIssue = page.missingReview || page.stale || page.futureDate || page.metadataErrors?.length;
  if (!hasIssue) {
    return { priorityScore: 0, priorityTier: "current", priorityReasons: [] };
  }

  const reasons = [];
  let score = 0;
  const sectionWeight = Number(sectionWeights[page.section] ?? 0);

  if (sectionWeight > 0) {
    score += sectionWeight * REVIEW_PRIORITY.sectionMultiplier;
    reasons.push(`section-${page.section}`);
  }
  if (page.metadataErrors?.length) {
    score += REVIEW_PRIORITY.metadataError;
    reasons.push("metadata-error");
  }
  if (page.futureDate) {
    score += REVIEW_PRIORITY.futureDate;
    reasons.push("future-date");
  }
  if (page.missingReview) {
    score += REVIEW_PRIORITY.missingReview;
    reasons.push("missing-lastReviewed");
  }
  if (page.stale) {
    score += Math.min(
      Math.max(page.ageDays ?? 0, 0),
      REVIEW_PRIORITY.maxStaleAgeDays
    );
    reasons.push("stale-age");
  }

  return {
    priorityScore: score,
    priorityTier:
      score >= REVIEW_PRIORITY.criticalThreshold
        ? "critical"
        : score >= REVIEW_PRIORITY.highThreshold
          ? "high"
          : "normal",
    priorityReasons: reasons
  };
}

export function createReviewReport(pages, options = {}) {
  const asOf = normalizeDate(options.asOf ?? currentUtcDate());
  const staleMonths = options.staleMonths ?? DEFAULT_STALE_MONTHS;
  const limit = options.limit ?? DEFAULT_LIMIT;

  if (!asOf) throw new Error("--as-of must use a valid YYYY-MM-DD date");
  if (!Number.isInteger(staleMonths) || staleMonths < 1) {
    throw new Error("stale months must be a positive integer");
  }
  if (!Number.isInteger(limit) || limit < 1) {
    throw new Error("report limit must be a positive integer");
  }

  const staleBefore = subtractMonths(asOf, staleMonths);
  const reviewedPages = pages.map((page) =>
    classifyReviewPage(page, {
      asOf,
      staleBefore,
      sectionWeights: options.sectionWeights ?? DEFAULT_SECTION_WEIGHTS
    })
  );
  reviewedPages.sort(compareReviewPages);

  const needsReview = reviewedPages.filter((page) => page.needsReview);
  const futureDates = reviewedPages.filter((page) => page.futureDate);
  const current = reviewedPages.filter((page) => !page.needsReview && !page.futureDate);

  return {
    asOf,
    staleAfterMonths: staleMonths,
    staleBefore,
    limit,
    summary: {
      totalPages: reviewedPages.length,
      needsReview: needsReview.length,
      missingLastReviewed: reviewedPages.filter((page) => page.missingReview).length,
      stale: reviewedPages.filter((page) => page.stale).length,
      futureDates: futureDates.length,
      metadataErrors: reviewedPages.filter((page) => page.metadataErrors.length).length,
      reviewed: reviewedPages.filter((page) => page.lastReviewed).length,
      current: current.length,
      priorityTiers: Object.fromEntries(
        ["critical", "high", "normal", "current"].map((tier) => [
          tier,
          reviewedPages.filter((page) => page.priorityTier === tier).length
        ])
      )
    },
    pages: reviewedPages
  };
}

export function compareReviewPages(a, b) {
  const priority = (page) => {
    if (page.futureDate) return 0;
    if (page.stale) return 1;
    if (page.missingReview) return 2;
    return 3;
  };

  return (
    (b.priorityScore ?? 0) - (a.priorityScore ?? 0) ||
    priority(a) - priority(b) ||
    (a.effectiveDate ?? "9999-12-31").localeCompare(b.effectiveDate ?? "9999-12-31") ||
    collator.compare(a.title, b.title) ||
    collator.compare(a.url, b.url)
  );
}

export function compareReviewAge(a, b) {
  return (
    (a.effectiveDate ?? "9999-12-31").localeCompare(b.effectiveDate ?? "9999-12-31") ||
    collator.compare(a.title, b.title) ||
    collator.compare(a.url, b.url)
  );
}

export function renderMarkdown(report) {
  const queue = report.pages.filter((page) => page.needsReview);
  const visible = [...queue].sort(compareReviewAge).slice(0, report.limit);
  const lines = [
    "# Content review queue",
    "",
    `As of **${report.asOf}**. A page is stale when its effective review date is before **${report.staleBefore}** (${report.staleAfterMonths} months).`,
    "",
    `- Pages scanned: ${report.summary.totalPages}`,
    `- Pages requiring review: ${report.summary.needsReview}`,
    "- Missing `lastReviewed`: " + report.summary.missingLastReviewed,
    `- Stale: ${report.summary.stale}`,
    `- Future dates: ${report.summary.futureDates}`,
    `- Metadata errors: ${report.summary.metadataErrors}`,
    `- Reviewed pages: ${report.summary.reviewed}`,
    `- Priority tiers: ${report.summary.priorityTiers.critical} critical, ${report.summary.priorityTiers.high} high, ${report.summary.priorityTiers.normal} normal, ${report.summary.priorityTiers.current} current`,
    ""
  ];

  if (!visible.length) {
    lines.push("No pages currently require review.", "");
    if (report.summary.futureDates) {
      lines.push(
        `The JSON report contains ${report.summary.futureDates} future-date data issue(s).`,
        ""
      );
    }
    return `${lines.join("\n")}\n`;
  }

  lines.push(
    `Showing the oldest ${visible.length} queue entries. The JSON report contains all ${queue.length} queue entries, priority scores, and any future-date data issues.`,
    "",
    "| # | Priority | Page | Section | Effective date | Last reviewed | Age (days) | Reason |",
    "| ---: | --- | --- | --- | --- | --- | ---: | --- |"
  );

  visible.forEach((page, index) => {
    lines.push(
      `| ${index + 1} | ${page.priorityTier} (${page.priorityScore}) | [${escapeTable(page.title)}](${page.url}) | ${escapeTable(
        page.section
      )} | ${page.effectiveDate ?? "—"} | ${page.lastReviewed ?? "—"} | ${
        page.ageDays ?? "—"
      } | ${escapeTable(page.reasons.join(", "))} |`
    );
  });

  return `${lines.join("\n")}\n`;
}

export function renderSummary(report) {
  return [
    "## Content review queue",
    `- As of: ${report.asOf}`,
    `- Pages scanned: ${report.summary.totalPages}`,
    `- Pages requiring review: ${report.summary.needsReview}`,
    `- Missing lastReviewed: ${report.summary.missingLastReviewed}`,
    `- Stale: ${report.summary.stale}`,
    `- Future dates: ${report.summary.futureDates}`,
    `- Metadata errors: ${report.summary.metadataErrors}`,
    `- Critical/high priority: ${report.summary.priorityTiers.critical}/${report.summary.priorityTiers.high}`
  ].join("\n");
}

export async function run(argv = process.argv.slice(2)) {
  const options = parseArguments(argv);
  const pages = await collectContentPages();
  const report = createReviewReport(pages, options);
  const markdown = renderMarkdown(report);
  const json = `${JSON.stringify(report, null, 2)}\n`;

  await writeOutput(options.output, markdown);
  await writeOutput(options.json, json);
  if (options.summaryFile) {
    await appendFile(options.summaryFile, `${renderSummary(report)}\n`);
  }

  console.log(
    `Content review: ${report.summary.totalPages} pages scanned; ${report.summary.needsReview} requiring review; ${report.summary.futureDates} future-date issue(s)`
  );
  return report;
}

export function parseArguments(argv = []) {
  const options = {
    output: path.resolve(process.cwd(), DEFAULT_OUTPUT),
    json: path.resolve(process.cwd(), DEFAULT_JSON_OUTPUT),
    summaryFile: undefined,
    asOf: currentUtcDate(),
    staleMonths: DEFAULT_STALE_MONTHS,
    limit: DEFAULT_LIMIT
  };

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    const [flag, inlineValue] = argument.split("=", 2);
    const value = inlineValue ?? argv[++index];

    switch (flag) {
      case "--output":
        options.output = path.resolve(process.cwd(), requireValue(flag, value));
        break;
      case "--json":
        options.json = path.resolve(process.cwd(), requireValue(flag, value));
        break;
      case "--summary-file":
        options.summaryFile = path.resolve(process.cwd(), requireValue(flag, value));
        break;
      case "--as-of":
        options.asOf = requireValue(flag, value);
        break;
      case "--stale-months":
        options.staleMonths = parsePositiveInteger(flag, value);
        break;
      case "--limit":
        options.limit = parsePositiveInteger(flag, value);
        break;
      default:
        throw new Error(`Unknown option ${flag}`);
    }
  }

  return options;
}

async function writeOutput(file, content) {
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, content);
}

function requireValue(flag, value) {
  if (!value || value.startsWith("--")) throw new Error(`${flag} requires a value`);
  return value;
}

function parsePositiveInteger(flag, value) {
  const parsed = Number(requireValue(flag, value));
  if (!Number.isInteger(parsed) || parsed < 1) {
    throw new Error(`${flag} must be a positive integer`);
  }
  return parsed;
}

function currentUtcDate() {
  return new Date().toISOString().slice(0, 10);
}

function escapeTable(value) {
  return String(value).replaceAll("|", "\\|").replaceAll("\n", " ");
}

const isMain =
  process.argv[1] &&
  pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url;

if (isMain) {
  try {
    await run();
  } catch (error) {
    console.error(`error: ${error.message}`);
    process.exitCode = 1;
  }
}
