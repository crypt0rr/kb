import { appendFile, mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { parseFrontmatter } from "../src/lib/frontmatter.mjs";
import {
  differenceInDays,
  normalizeDate,
  subtractMonths
} from "../src/lib/date.mjs";

export const DEFAULT_OUTPUT = ".reports/content-review.md";
export const DEFAULT_JSON_OUTPUT = ".reports/content-review.json";
export const DEFAULT_STALE_MONTHS = 12;
export const DEFAULT_LIMIT = 100;

const contentRoot = path.join(process.cwd(), "content");
const collator = new Intl.Collator("en", { sensitivity: "base", numeric: true });

export async function collectContentPages(directory = contentRoot) {
  const files = [];
  await walkMarkdown(directory, files);

  const pages = [];
  for (const file of files.sort((a, b) => collator.compare(a, b))) {
    const raw = await readFile(file, "utf8");
    const relativeFile = slash(path.relative(directory, file));
    const parsed = parseFrontmatter(raw, relativeFile);
    if (parsed.data.draft === true) continue;

    const slug = slugFromFile(relativeFile);
    pages.push({
      relativeFile,
      url: slug ? `/${slug}/` : "/",
      title: String(parsed.data.title ?? "").trim() || titleFromSlug(slug || "Knowledge Base"),
      section: slug.split("/")[0] || "index",
      date: normalizeDate(parsed.data.date),
      lastReviewed: normalizeDate(parsed.data.lastReviewed)
    });
  }

  return pages;
}

export function classifyReviewPage(page, { asOf, staleBefore }) {
  const normalizedAsOf = normalizeDate(asOf);
  const normalizedStaleBefore = normalizeDate(staleBefore);
  if (!normalizedAsOf || !normalizedStaleBefore) {
    throw new Error("Review dates must use valid YYYY-MM-DD values");
  }

  const effectiveDate = page.lastReviewed ?? page.date ?? null;
  const missingReview = !page.lastReviewed;
  const stale = Boolean(effectiveDate && effectiveDate < normalizedStaleBefore);
  const futureDate = Boolean(effectiveDate && effectiveDate > normalizedAsOf);
  const reasons = [];

  if (missingReview) reasons.push("missing-lastReviewed");
  if (stale) reasons.push("stale");
  if (futureDate) reasons.push("future-date");

  return {
    ...page,
    date: page.date ?? null,
    lastReviewed: page.lastReviewed ?? null,
    effectiveDate,
    ageDays: effectiveDate ? differenceInDays(normalizedAsOf, effectiveDate) : null,
    missingReview,
    stale,
    futureDate,
    needsReview: missingReview || stale,
    reasons
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
    classifyReviewPage(page, { asOf, staleBefore })
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
      reviewed: reviewedPages.filter((page) => page.lastReviewed).length,
      current: current.length
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
    priority(a) - priority(b) ||
    (a.effectiveDate ?? "9999-12-31").localeCompare(b.effectiveDate ?? "9999-12-31") ||
    collator.compare(a.title, b.title) ||
    collator.compare(a.url, b.url)
  );
}

export function renderMarkdown(report) {
  const queue = report.pages.filter((page) => page.needsReview);
  const visible = queue.slice(0, report.limit);
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
    `- Reviewed pages: ${report.summary.reviewed}`,
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
    `Showing the oldest ${visible.length} queue entries. The JSON report contains all ${queue.length} queue entries and any future-date data issues.`,
    "",
    "| # | Page | Section | Effective date | Last reviewed | Age (days) | Reason |",
    "| ---: | --- | --- | --- | --- | ---: | --- |"
  );

  visible.forEach((page, index) => {
    lines.push(
      `| ${index + 1} | [${escapeTable(page.title)}](${page.url}) | ${escapeTable(
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
    `- Future dates: ${report.summary.futureDates}`
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

async function walkMarkdown(directory, files) {
  const entries = await readdir(directory, { withFileTypes: true });
  for (const entry of entries) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) await walkMarkdown(absolute, files);
    else if (entry.name.endsWith(".md")) files.push(absolute);
  }
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

function slugFromFile(relativeFile) {
  if (relativeFile === "_index.md") return "";
  return relativeFile
    .replace(/\/index\.md$/i, "")
    .replace(/\/_index\.md$/i, "")
    .replace(/\.md$/i, "")
    .replace(/^_index$/i, "");
}

function titleFromSlug(slug) {
  return slug
    .split("/")
    .filter(Boolean)
    .pop()
    ?.replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase()) ?? "Knowledge Base";
}

function slash(value) {
  return value.replace(/\\/g, "/");
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
