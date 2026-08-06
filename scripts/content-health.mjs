import { appendFile, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { buildContentGraph } from "../src/lib/content-graph.mjs";
import { buildContentIndex } from "../src/lib/content-index.mjs";
import { normalizeDate } from "../src/lib/date.mjs";
import {
  assessPageHealth,
  compareHealthPages,
  createHealthSummary,
  DEFAULT_STALE_MONTHS
} from "../src/lib/content-health.mjs";
import {
  createReviewReport,
  DEFAULT_LIMIT,
  DEFAULT_SECTION_WEIGHTS
} from "./content-review.mjs";

export const DEFAULT_OUTPUT = ".reports/content-health.md";
export const DEFAULT_JSON_OUTPUT = ".reports/content-health.json";

export function createContentHealthReport(options = {}) {
  const contentRoot = path.resolve(
    options.contentRoot ?? path.join(process.cwd(), "content")
  );
  const index =
    options.index ??
    buildContentIndex({
      contentRoot,
      strict: false
    });
  const graph =
    options.graph ??
    buildContentGraph({
      contentRoot,
      root: options.root ?? path.dirname(contentRoot),
      index,
      strict: false
    });
  const reviewPages = index.pages.map(toReviewPage);
  const reviewReport = createReviewReport(reviewPages, {
    ...options,
    sectionWeights: options.sectionWeights ?? DEFAULT_SECTION_WEIGHTS
  });
  const reviewsByUrl = new Map(reviewReport.pages.map((page) => [page.url, page]));

  const pages = graph.pages.map((page) => {
    const review = reviewsByUrl.get(page.url);
    if (!review) throw new Error(`Missing review record for ${page.url}`);

    const health = assessPageHealth(
      {
        ...page,
        metadataErrors: page.metadataErrors,
        priorityScore: review.priorityScore,
        priorityTier: review.priorityTier
      },
      {
        review,
        graph: {
          incoming: graph.incoming.get(page.url)?.length ?? 0,
          outgoing: graph.outgoing.get(page.url)?.length ?? 0
        },
        linkFindings: graph.pageFindings?.get(page.url)
      }
    );

    return {
      url: page.url,
      title: page.title,
      section: page.section || "index",
      relativeFile: page.relativeFile,
      date: review.date,
      lastReviewed: review.lastReviewed,
      effectiveDate: review.effectiveDate,
      ageDays: review.ageDays,
      metadataProvenance: page.metadataProvenance,
      metadataErrors: health.metadataErrors,
      state: health.state,
      label: health.label,
      description: health.description,
      reasons: health.reasons,
      review: health.review,
      graph: health.graph,
      links: health.links,
      priorityScore: health.priorityScore,
      priorityTier: health.priorityTier
    };
  });

  pages.sort(compareHealthPages);

  return {
    version: 1,
    asOf: reviewReport.asOf,
    staleAfterMonths: reviewReport.staleAfterMonths,
    staleBefore: reviewReport.staleBefore,
    limit: reviewReport.limit,
    summary: createHealthSummary(pages),
    reviewSummary: reviewReport.summary,
    pages
  };
}

export function renderMarkdown(report) {
  const { summary } = report;
  const visible = report.pages.slice(0, report.limit);
  const lines = [
    "# Content trust ledger",
    "",
    `As of **${report.asOf}**. Review dates older than **${report.staleBefore}** are outside the ${report.staleAfterMonths}-month policy window.`,
    "",
    "This derived, maintainer-only report combines freshness, metadata, link/anchor/asset integrity, and explicit graph context. It is report-only: review due does not fail content changes and no frontmatter is modified.",
    "",
    `- Pages scanned: ${summary.totalPages}`,
    `- Verified: ${summary.verified}`,
    `- Review due: ${summary.reviewDue}`,
    `- Repair needed: ${summary.repairNeeded}`,
    `- Context light: ${summary.contextLight}`,
    `- Missing lastReviewed: ${summary.missingLastReviewed}`,
    `- Stale: ${summary.stale}`,
    `- Future dates: ${summary.futureDates}`,
    `- Metadata errors: ${summary.metadataErrors}`,
    `- Broken links: ${summary.brokenLinks}`,
    `- Missing anchors: ${summary.missingAnchors}`,
    `- Broken assets: ${summary.brokenAssets}`,
    `- External links inventoried: ${summary.externalLinks}`,
    `- Protocol links inventoried: ${summary.protocolLinks}`,
    ""
  ];

  if (!visible.length) {
    lines.push("No pages were indexed.", "");
    return `${lines.join("\n")}\n`;
  }

  lines.push(
    `## Highest-priority ${visible.length} pages`,
    "",
    "The JSON report contains the complete corpus. Context-light pages have no explicit inbound or outbound references, but hierarchy and shared tags remain valid navigation.",
    "",
    "| # | Trust | Priority | Page | Section | Effective date | Age (days) | Graph | Integrity | Reason |",
    "| ---: | --- | --- | --- | --- | --- | ---: | --- | --- | --- |"
  );

  visible.forEach((page, index) => {
    const graph = `${page.graph.incoming} in / ${page.graph.outgoing} out`;
    const integrity = [
      page.links.brokenLinks ? `${page.links.brokenLinks} link` : null,
      page.links.missingAnchors ? `${page.links.missingAnchors} anchor` : null,
      page.links.brokenAssets ? `${page.links.brokenAssets} asset` : null,
      page.metadataErrors.length ? `${page.metadataErrors.length} metadata` : null
    ].filter(Boolean).join(", ") || "clean";
    lines.push(
      `| ${index + 1} | ${escapeTable(page.label)} | ${escapeTable(
        `${page.priorityTier} (${page.priorityScore})`
      )} | [${escapeTable(page.title)}](${page.url}) | ${escapeTable(
        page.section
      )} | ${page.effectiveDate ?? "—"} | ${page.ageDays ?? "—"} | ${graph} | ${escapeTable(
        integrity
      )} | ${escapeTable(page.reasons.join(", "))} |`
    );
  });

  return `${lines.join("\n")}\n`;
}

export function renderSummary(report) {
  const { summary } = report;
  return [
    "## Content trust ledger",
    `- As of: ${report.asOf}`,
    `- Pages scanned: ${summary.totalPages}`,
    `- Verified / review due / repair needed / context light: ${summary.verified} / ${summary.reviewDue} / ${summary.repairNeeded} / ${summary.contextLight}`,
    `- Missing lastReviewed: ${summary.missingLastReviewed}; stale: ${summary.stale}; integrity findings: ${summary.brokenLinks + summary.missingAnchors + summary.brokenAssets}`,
    "- Report-only; no content build is failed because a page needs review."
  ].join("\n");
}

export async function run(argv = process.argv.slice(2)) {
  const options = parseArguments(argv);
  const report = createContentHealthReport(options);
  const markdown = renderMarkdown(report);
  const json = `${JSON.stringify(report, null, 2)}\n`;

  await Promise.all([
    writeOutput(options.output, markdown),
    writeOutput(options.json, json)
  ]);
  if (options.summaryFile) {
    await appendFile(options.summaryFile, `${renderSummary(report)}\n`);
  }

  console.log(
    `Content health: ${report.summary.totalPages} pages scanned; ${report.summary.repairNeeded} repair-needed; ${report.summary.reviewDue} review-due`
  );
  return report;
}

export function parseArguments(argv = []) {
  const options = {
    output: path.resolve(process.cwd(), DEFAULT_OUTPUT),
    json: path.resolve(process.cwd(), DEFAULT_JSON_OUTPUT),
    summaryFile: undefined,
    asOf: undefined,
    staleMonths: DEFAULT_STALE_MONTHS,
    limit: DEFAULT_LIMIT,
    sectionWeights: DEFAULT_SECTION_WEIGHTS
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

function toReviewPage(page) {
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
}

async function writeOutput(file, contents) {
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, contents, "utf8");
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

function escapeTable(value) {
  return String(value).replaceAll("|", "\\|").replaceAll("\n", " ");
}

if (
  process.argv[1] &&
  pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url
) {
  try {
    await run();
  } catch (error) {
    console.error(`error: ${error.message}`);
    process.exitCode = 1;
  }
}
