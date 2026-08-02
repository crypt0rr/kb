import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const args = process.argv.slice(2);
const output = valueAfter("--output") ?? "external-links-report.md";
const timeoutMs = Number(valueAfter("--timeout") ?? 10000);
const concurrency = Math.max(1, Number(valueAfter("--concurrency") ?? 8));
const urls = new Set();

await collectMarkdown(path.join(root, "content"));
await collectFile(path.join(root, "README.md"));

const uniqueUrls = [...urls].sort();
const results = [];
let cursor = 0;

async function worker() {
  while (cursor < uniqueUrls.length) {
    const index = cursor++;
    results[index] = await checkUrl(uniqueUrls[index]);
  }
}

await Promise.all(Array.from({ length: Math.min(concurrency, uniqueUrls.length) }, worker));
results.sort((a, b) => a.url.localeCompare(b.url));

const failures = results.filter((result) => result.error || result.status >= 400);
const lines = [
  "# External link health",
  "",
  `Checked: ${results.length}`,
  `Generated: ${new Date().toISOString()}`,
  `Failures: ${failures.length}`,
  ""
];

if (failures.length) {
  lines.push("| URL | Result | Detail |", "| --- | --- | --- |");
  for (const result of failures) {
    const detail = result.error ?? `HTTP ${result.status}`;
    lines.push(`| ${result.url} | failed | ${detail.replaceAll("|", "\\|")} |`);
  }
} else {
  lines.push("All checked external links responded successfully.");
}

await mkdir(path.dirname(path.resolve(root, output)), { recursive: true });
await writeFile(path.resolve(root, output), `${lines.join("\n")}\n`);

console.log(`Checked ${results.length} external link(s); ${failures.length} failure(s)`);

async function collectMarkdown(directory) {
  let entries;
  try {
    entries = await readdir(directory, { withFileTypes: true });
  } catch {
    return;
  }

  for (const entry of entries) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) await collectMarkdown(absolute);
    else if (entry.name.endsWith(".md")) await collectFile(absolute);
  }
}

async function collectFile(file) {
  const source = await readFile(file, "utf8");
  const matches = source.matchAll(/https?:\/\/[^\s<>"')\]]+/gi);
  for (const match of matches) {
    const clean = match[0].replace(/[.,;:!?]+$/, "");
    if (clean) urls.add(clean);
  }
}

async function checkUrl(url) {
  try {
    const head = await request(url, "HEAD");
    if (head.status !== 405 && head.status !== 403) return { url, status: head.status };
    const get = await request(url, "GET");
    return { url, status: get.status };
  } catch (error) {
    return { url, error: error.message };
  }
}

async function request(url, method) {
  const response = await fetch(url, {
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

function valueAfter(name) {
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : undefined;
}
