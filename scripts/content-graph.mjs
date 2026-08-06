import { appendFile, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { buildContentGraph } from "../src/lib/content-graph.mjs";

export const DEFAULT_OUTPUT = ".reports/content-graph.md";
export const DEFAULT_JSON_OUTPUT = ".reports/content-graph.json";
export const DEFAULT_LIMIT = 100;

export function createGraphReport(graph, options = {}) {
  const limit = options.limit ?? DEFAULT_LIMIT;
  if (!Number.isInteger(limit) || limit < 1) {
    throw new Error("report limit must be a positive integer");
  }

  const pages = [...graph.pages]
    .sort(comparePages)
    .map((page) => ({
      url: page.url,
      title: page.title,
      section: page.section || "index",
      relativeFile: page.relativeFile
    }));
  const edges = [...graph.edges]
    .sort(compareEdges)
    .map((edge) => ({
      fromUrl: edge.fromUrl,
      toUrl: edge.toUrl,
      kind: edge.kind,
      line: edge.line,
      rawTarget: edge.rawTarget,
      fragment: edge.fragment
    }));

  return {
    version: 1,
    summary: graph.summary,
    pages,
    edges,
    unresolvedReferences: [...graph.unresolved].sort(compareUnresolved),
    isolatedPages: [...graph.isolatedPages].sort(),
    isolatedPreview: [...graph.isolatedPages].sort().slice(0, limit)
  };
}

export function renderMarkdown(report) {
  const { summary } = report;
  const preview = report.isolatedPreview
    .map((url) => {
      const page = report.pages.find((item) => item.url === url);
      return `- [${page?.title ?? url}](${url})`;
    })
    .join("\n");
  const omitted = report.isolatedPages.length - report.isolatedPreview.length;

  return [
    "# Content relationship graph",
    "",
    `- Pages: ${summary.pages}`,
    `- Explicit reference occurrences: ${summary.referenceCount}`,
    `- Unique page-to-page references: ${summary.uniqueReferenceCount}`,
    `- Unresolved explicit page references: ${report.unresolvedReferences.length}`,
    `- Pages with outgoing references: ${summary.pagesWithOutgoing}`,
    `- Pages with incoming references: ${summary.pagesWithIncoming}`,
    `- Pages without explicit references: ${summary.isolatedPages}`,
    "",
    `## Pages without explicit references (showing ${report.isolatedPreview.length})`,
    "",
    preview || "- None",
    omitted > 0 ? `\n_${omitted} additional page(s) are listed in the JSON report._` : "",
    "",
    "The graph is report-only. Hierarchy and shared tags remain valid navigation edges even when a page has no explicit Markdown reference.",
    ""
  ].join("\n");
}

export async function run(argv = process.argv.slice(2)) {
  const options = parseArgs(argv);
  const graph = buildContentGraph({
    contentRoot: path.join(process.cwd(), "content"),
    strict: false
  });
  const report = createGraphReport(graph, options);
  const markdown = renderMarkdown(report);
  const json = `${JSON.stringify(report, null, 2)}\n`;

  await Promise.all([
    writeReport(options.output, markdown),
    writeReport(options.json, json)
  ]);

  if (options.summaryFile) {
    await appendFile(options.summaryFile, renderSummary(report));
  }

  console.log(
    `Content graph: ${report.summary.pages} pages, ${report.summary.uniqueReferenceCount} unique reference(s), ${report.summary.isolatedPages} page(s) without explicit references`
  );
  return report;
}

function parseArgs(argv) {
  const options = {
    output: DEFAULT_OUTPUT,
    json: DEFAULT_JSON_OUTPUT,
    limit: DEFAULT_LIMIT,
    summaryFile: ""
  };

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--output") options.output = argv[++index];
    else if (argument === "--json") options.json = argv[++index];
    else if (argument === "--limit") options.limit = Number(argv[++index]);
    else if (argument === "--summary-file") options.summaryFile = argv[++index];
    else throw new Error(`unknown option ${argument}`);
  }

  return options;
}

async function writeReport(file, contents) {
  await mkdir(path.dirname(path.resolve(file)), { recursive: true });
  await writeFile(file, contents, "utf8");
}

function renderSummary(report) {
  return [
    "### Content relationship graph",
    `- ${report.summary.pages} pages indexed; ${report.summary.uniqueReferenceCount} unique explicit page reference(s).`,
    `- ${report.unresolvedReferences.length} unresolved explicit page reference(s).`,
    `- ${report.summary.isolatedPages} page(s) have no explicit inbound or outbound reference; hierarchy and tags remain available navigation edges.`,
    ""
  ].join("\n");
}

function comparePages(a, b) {
  return a.title.localeCompare(b.title, "en", { sensitivity: "base", numeric: true }) ||
    a.url.localeCompare(b.url);
}

function compareEdges(a, b) {
  return a.fromUrl.localeCompare(b.fromUrl) ||
    a.toUrl.localeCompare(b.toUrl) ||
    a.line - b.line ||
    a.rawTarget.localeCompare(b.rawTarget);
}

function compareUnresolved(a, b) {
  return a.source.localeCompare(b.source) ||
    a.line - b.line ||
    a.target.localeCompare(b.target);
}

if (pathToFileURL(path.resolve(process.argv[1] ?? "")).href === import.meta.url) {
  run().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
