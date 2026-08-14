import { appendFile, mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

export const DEFAULT_OUTPUT = ".reports/external-links.md";
export const DEFAULT_JSON_OUTPUT = ".reports/external-links.json";
export const DEFAULT_TIMEOUT_MS = 10_000;
export const DEFAULT_CONCURRENCY = 8;
export const MAX_SUMMARY_FAILURES = 5;

const collator = new Intl.Collator("en", { sensitivity: "base", numeric: true });

export async function collectUrls(root = process.cwd()) {
  const urls = new Set();
  await collectMarkdown(path.join(root, "content"), urls);
  await collectFile(path.join(root, "README.md"), urls);
  return [...urls].sort(compareUrls);
}

export async function checkUrls(
  urls,
  {
    timeoutMs = DEFAULT_TIMEOUT_MS,
    concurrency = DEFAULT_CONCURRENCY,
    fetchImpl = globalThis.fetch
  } = {}
) {
  if (!Number.isInteger(timeoutMs) || timeoutMs < 1) {
    throw new Error("timeout must be a positive integer");
  }
  if (!Number.isInteger(concurrency) || concurrency < 1) {
    throw new Error("concurrency must be a positive integer");
  }

  const uniqueUrls = [...new Set(urls)].sort(compareUrls);
  const results = [];
  let cursor = 0;

  async function worker() {
    while (cursor < uniqueUrls.length) {
      const index = cursor++;
      results[index] = await checkUrl(uniqueUrls[index], { timeoutMs, fetchImpl });
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(concurrency, uniqueUrls.length) }, worker)
  );
  return results.sort(compareResults);
}

export async function checkUrl(
  url,
  { timeoutMs = DEFAULT_TIMEOUT_MS, fetchImpl = globalThis.fetch } = {}
) {
  try {
    const head = await request(url, "HEAD", { timeoutMs, fetchImpl });
    if (head.status !== 405 && head.status !== 403) return { url, status: head.status };
    const get = await request(url, "GET", { timeoutMs, fetchImpl });
    return { url, status: get.status };
  } catch (error) {
    return { url, error: error.message };
  }
}

export function createExternalLinkReport(results, options = {}) {
  const orderedResults = results.map(normalizeResult).sort(compareResults);
  const failures = orderedResults.filter(isFailure);

  return {
    version: 1,
    generatedAt: options.generatedAt ?? new Date().toISOString(),
    timeoutMs: options.timeoutMs ?? DEFAULT_TIMEOUT_MS,
    concurrency: options.concurrency ?? DEFAULT_CONCURRENCY,
    summary: {
      checked: orderedResults.length,
      passed: orderedResults.length - failures.length,
      failed: failures.length
    },
    results: orderedResults
  };
}

export function renderMarkdown(report) {
  const failures = report.results.filter(isFailure);
  const lines = [
    "# External link health",
    "",
    `Checked: ${report.summary.checked}`,
    `Generated: ${report.generatedAt}`,
    `Passed: ${report.summary.passed}`,
    `Failures: ${report.summary.failed}`,
    ""
  ];

  if (!failures.length) {
    lines.push("All checked external links responded successfully.", "");
    return `${lines.join("\n")}\n`;
  }

  lines.push(
    "## Failures",
    "",
    "| URL | Result | Detail |",
    "| --- | --- | --- |"
  );
  for (const result of failures) {
    const detail = result.error ?? `HTTP ${result.status}`;
    lines.push(
      `| ${escapeTable(result.url)} | failed | ${escapeTable(detail)} |`
    );
  }

  return `${lines.join("\n")}\n`;
}

export function renderSummary(report) {
  const failures = report.results.filter(isFailure);
  const lines = [
    "### External link health",
    `- Checked: ${report.summary.checked}`,
    `- Passed: ${report.summary.passed}`,
    `- Failed: ${report.summary.failed}`
  ];

  if (failures.length) {
    lines.push(`- First failures (of ${failures.length}):`);
    for (const result of failures.slice(0, MAX_SUMMARY_FAILURES)) {
      const detail = result.error ?? `HTTP ${result.status}`;
      lines.push(`  - \`${escapeInline(result.url)}\`: ${escapeInline(detail)}`);
    }
    if (failures.length > MAX_SUMMARY_FAILURES) {
      lines.push(`  - ${failures.length - MAX_SUMMARY_FAILURES} more in the uploaded report.`);
    }
  } else {
    lines.push("- All checked URLs responded successfully.");
  }

  return lines.join("\n");
}

export async function run(
  argv = process.argv.slice(2),
  { root = process.cwd(), fetchImpl = globalThis.fetch, generatedAt } = {}
) {
  const options = parseArguments(argv);
  const urls = await collectUrls(root);
  const results = await checkUrls(urls, {
    timeoutMs: options.timeoutMs,
    concurrency: options.concurrency,
    fetchImpl
  });
  const report = createExternalLinkReport(results, {
    generatedAt,
    timeoutMs: options.timeoutMs,
    concurrency: options.concurrency
  });

  await Promise.all([
    writeReport(path.resolve(root, options.output), renderMarkdown(report)),
    writeReport(
      path.resolve(root, options.json),
      `${JSON.stringify(report, null, 2)}\n`
    )
  ]);

  if (options.summaryFile) {
    const summaryFile = path.resolve(root, options.summaryFile);
    await mkdir(path.dirname(summaryFile), { recursive: true });
    await appendFile(summaryFile, `${renderSummary(report)}\n`);
  }

  console.log(
    `External links: ${report.summary.checked} checked; ${report.summary.failed} failure(s)`
  );
  return report;
}

export function parseArguments(argv = []) {
  const options = {
    output: DEFAULT_OUTPUT,
    json: DEFAULT_JSON_OUTPUT,
    summaryFile: undefined,
    timeoutMs: DEFAULT_TIMEOUT_MS,
    concurrency: DEFAULT_CONCURRENCY
  };

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    const [flag, inlineValue] = argument.split("=", 2);
    const value = inlineValue ?? argv[++index];

    switch (flag) {
      case "--output":
        options.output = requireValue(flag, value);
        break;
      case "--json":
        options.json = requireValue(flag, value);
        break;
      case "--summary-file":
        options.summaryFile = requireValue(flag, value);
        break;
      case "--timeout":
        options.timeoutMs = parsePositiveInteger(flag, value);
        break;
      case "--concurrency":
        options.concurrency = parsePositiveInteger(flag, value);
        break;
      default:
        throw new Error(`Unknown option ${flag}`);
    }
  }

  return options;
}

async function collectMarkdown(directory, urls) {
  let entries;
  try {
    entries = await readdir(directory, { withFileTypes: true });
  } catch {
    return;
  }

  for (const entry of entries) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) await collectMarkdown(absolute, urls);
    else if (entry.name.endsWith(".md")) await collectFile(absolute, urls);
  }
}

async function collectFile(file, urls) {
  let source;
  try {
    source = await readFile(file, "utf8");
  } catch {
    return;
  }

  const matches = source.matchAll(/https?:\/\/[^\s<>"')\]]+/gi);
  for (const match of matches) {
    const clean = match[0].replace(/[.,;:!?]+$/, "");
    if (clean) urls.add(clean);
  }
}

async function request(url, method, { timeoutMs, fetchImpl }) {
  if (typeof fetchImpl !== "function") throw new Error("fetch is unavailable");

  const response = await fetchImpl(url, {
    method,
    redirect: "follow",
    signal: AbortSignal.timeout(timeoutMs),
    headers: {
      "user-agent": "kb-external-link-check/1.0",
      ...(method === "GET" ? { range: "bytes=0-0" } : {})
    }
  });
  response.body?.cancel();
  return response;
}

function normalizeResult(result) {
  return {
    url: String(result.url),
    status: Number.isInteger(result.status) ? result.status : null,
    error: result.error ? String(result.error) : null
  };
}

function isFailure(result) {
  return Boolean(result.error) || !Number.isInteger(result.status) || result.status >= 400;
}

function compareResults(a, b) {
  return collator.compare(a.url, b.url);
}

function compareUrls(a, b) {
  return collator.compare(a, b);
}

async function writeReport(file, contents) {
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

function escapeInline(value) {
  return String(value).replaceAll("`", "\\`").replaceAll("\n", " ");
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
