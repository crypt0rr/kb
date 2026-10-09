import { appendFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { isIP } from "node:net";
import path from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import { pathToFileURL } from "node:url";
import { createMarkdown } from "../src/lib/links.mjs";

export const DEFAULT_OUTPUT = ".reports/external-links.md";
export const DEFAULT_JSON_OUTPUT = ".reports/external-links.json";
export const DEFAULT_TIMEOUT_MS = 10_000;
export const DEFAULT_CONCURRENCY = 8;
export const DEFAULT_HOST_CONCURRENCY = 2;
export const DEFAULT_RETRIES = 2;
export const DEFAULT_RETRY_BASE_MS = 1_000;
export const MAX_RETRY_DELAY_MS = 60_000;
export const HOST_INTERVAL_STEP_MS = 1_000;
export const MAX_HOST_INTERVAL_MS = 8_000;
export const REPORT_VERSION = 2;
export const USER_AGENT = "kb-external-link-check/2.0 (+https://github.com/crypt0rr/kb)";
export const LINK_CLASSES = Object.freeze(["ok", "broken", "unreachable", "blocked"]);
export const MARKDOWN_GROUP_LIMIT = 50;
export const SUMMARY_BROKEN_LIMIT = 50;
export const SUMMARY_GROUP_LIMIT = 10;
export const TOP_HOST_LIMIT = 10;
export const SUMMARY_TOP_HOST_LIMIT = 5;

// HEAD responses that many servers send even though GET works.
const HEAD_FALLBACK_STATUSES = new Set([400, 401, 403, 404, 405, 501]);
const BROKEN_STATUSES = new Set([404, 410]);
const BLOCKED_STATUSES = new Set([401, 402, 403, 429, 451]);
const BROKEN_ERROR_CODES = new Set(["ENOTFOUND", "EAI_AGAIN", "ECONNREFUSED", "INVALID_URL"]);
const TLS_CERTIFICATE_CODES = new Set([
  "CERT_HAS_EXPIRED",
  "CERT_NOT_YET_VALID",
  "CERT_REVOKED",
  "CERT_UNTRUSTED",
  "DEPTH_ZERO_SELF_SIGNED_CERT",
  "ERR_TLS_CERT_ALTNAME_INVALID",
  "SELF_SIGNED_CERT_IN_CHAIN",
  "UNABLE_TO_GET_ISSUER_CERT",
  "UNABLE_TO_GET_ISSUER_CERT_LOCALLY",
  "UNABLE_TO_VERIFY_LEAF_SIGNATURE"
]);
const TIMEOUT_CODES = new Set([
  "TIMEOUT",
  "ETIMEDOUT",
  "UND_ERR_CONNECT_TIMEOUT",
  "UND_ERR_HEADERS_TIMEOUT",
  "UND_ERR_BODY_TIMEOUT"
]);
const RESERVED_DOMAINS = ["example.com", "example.org", "example.net"];
const RESERVED_SUFFIXES = ["local", "localhost", "test", "invalid", "example", "internal"];
const PLACEHOLDER_HOST = /[{}<>$%*`"'|\\^\s[\]]/;

const collator = new Intl.Collator("en", { sensitivity: "base", numeric: true });

/**
 * Return every http(s) link target a reader can follow in rendered HTML: the
 * `href` and `src` attributes of tags outside `<pre>` and `<code>`. Fragments
 * are dropped because they do not change the request. Targets are added to
 * `into` (URL -> Set of source files) so several documents can be merged.
 */
export function collectUrlsFromHtml(html, source, into = new Map()) {
  const visible = String(html)
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<pre[\s>][\s\S]*?<\/pre>/gi, "")
    .replace(/<code[\s>][\s\S]*?<\/code>/gi, "");

  for (const [tag] of visible.matchAll(/<[a-z][a-z0-9-]*\b[^>]*>/gi)) {
    for (const match of tag.matchAll(/\s(?:href|src)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+))/gi)) {
      const target = decodeEntities((match[1] ?? match[2] ?? match[3]).trim());
      if (!/^https?:\/\//i.test(target)) continue;
      const url = target.replace(/#.*$/s, "");
      if (!into.has(url)) into.set(url, new Set());
      into.get(url).add(source);
    }
  }
  return into;
}

/**
 * Collect the external URLs of the rendered site: every page rendered with
 * `render(page)` plus README.md rendered with the shared markdown-it setup.
 * Returns the URLs to check and the skipped ones, each with its source files.
 */
export function collectUrls({
  pages = [],
  render,
  readme = null,
  renderReadme = (source) => createMarkdown().render(source),
  root = process.cwd()
} = {}) {
  const found = new Map();
  for (const page of pages) {
    const source = path.relative(root, page.file).replaceAll("\\", "/");
    collectUrlsFromHtml(render(page), source, found);
  }
  if (readme !== null && readme !== undefined) {
    collectUrlsFromHtml(renderReadme(readme), "README.md", found);
  }

  const urls = [];
  const skipped = [];
  for (const [url, sourceSet] of found) {
    const sources = [...sourceSet].sort(compareStrings);
    const reason = skipReason(url);
    if (reason) skipped.push({ url, reason, sources });
    else urls.push({ url, sources });
  }
  return { urls: urls.sort(compareResults), skipped: skipped.sort(compareResults) };
}

/**
 * Explain why a URL is not worth requesting (private, reserved, or placeholder
 * hosts), or return null when it should be checked.
 */
export function skipReason(url) {
  const authority = String(url).match(/^https?:\/\/([^/?#]*)/i)?.[1] ?? "";
  const rawHost = safeDecode(authority.replace(/^[^@]*@/, "").replace(/:\d*$/, ""));
  if (!rawHost) return "missing host";
  if (PLACEHOLDER_HOST.test(rawHost) && !/^\[[0-9a-f:.]+\]$/i.test(rawHost)) {
    return "placeholder host";
  }

  let hostname;
  try {
    hostname = new URL(url).hostname.toLowerCase();
  } catch {
    return null;
  }
  const bare = hostname.replace(/^\[|\]$/g, "").replace(/\.$/, "");

  if (isIP(bare) === 4) return isReservedIpv4(bare) ? "private or reserved address" : null;
  if (isIP(bare) === 6) return isReservedIpv6(bare) ? "private or reserved address" : null;
  if (bare === "localhost") return "local host";
  if (RESERVED_DOMAINS.some((domain) => bare === domain || bare.endsWith(`.${domain}`))) {
    return "example domain";
  }
  const tld = bare.split(".").at(-1);
  if (RESERVED_SUFFIXES.includes(tld)) return "reserved domain";
  if (!bare.includes(".")) return "single-label host";
  return null;
}

/**
 * Parse a Retry-After header (delay in seconds or an HTTP date) into
 * milliseconds from `nowMs`, or null when it is missing or malformed.
 */
export function parseRetryAfter(value, nowMs = Date.now()) {
  if (value === null || value === undefined) return null;
  const text = String(value).trim();
  if (!text) return null;
  if (/^\d+$/.test(text)) return Number(text) * 1000;
  const date = Date.parse(text);
  if (Number.isNaN(date)) return null;
  return Math.max(0, date - nowMs);
}

/**
 * Delay before retry number `attempt` (1-based): the server's Retry-After when
 * given, otherwise exponential backoff; always capped at `maxDelayMs`.
 */
export function retryDelay(
  attempt,
  retryAfterMs = null,
  { baseMs = DEFAULT_RETRY_BASE_MS, maxDelayMs = MAX_RETRY_DELAY_MS } = {}
) {
  const wanted = retryAfterMs ?? baseMs * 2 ** Math.max(0, attempt - 1);
  return Math.min(Math.max(0, wanted), maxDelayMs);
}

/**
 * Classify a finished check: ok, broken (definitely dead), unreachable
 * (probably temporary), or blocked (the site refuses automated requests).
 */
export function classifyResult({ status = null, code = null } = {}) {
  if (Number.isInteger(status)) {
    if (status >= 200 && status < 400) return "ok";
    if (BROKEN_STATUSES.has(status)) return "broken";
    if (BLOCKED_STATUSES.has(status) || status >= 600) return "blocked";
    return "unreachable";
  }
  if (code && (BROKEN_ERROR_CODES.has(code) || TLS_CERTIFICATE_CODES.has(code))) return "broken";
  // Timeouts, 5xx after retries, and other network errors may be temporary.
  return "unreachable";
}

/**
 * Create a FIFO limiter that allows `limit` holders at a time. `acquire()`
 * resolves to a release function.
 */
export function createLimiter(limit) {
  let active = 0;
  const waiting = [];

  function release() {
    const next = waiting.shift();
    if (next) next();
    else active -= 1;
  }

  return {
    get active() {
      return active;
    },
    async acquire() {
      if (active < limit) active += 1;
      else await new Promise((resolve) => waiting.push(resolve));
      let released = false;
      return () => {
        if (released) return;
        released = true;
        release();
      };
    }
  };
}

/**
 * Check URLs with a global concurrency limit and a per-host limit. Each entry
 * is a URL string or `{ url, sources }`; results keep the sources.
 */
export async function checkUrls(entries, options = {}) {
  const {
    concurrency = DEFAULT_CONCURRENCY,
    hostConcurrency = DEFAULT_HOST_CONCURRENCY,
    timeoutMs = DEFAULT_TIMEOUT_MS,
    retries = DEFAULT_RETRIES
  } = options;
  assertPositiveInteger("timeout", timeoutMs);
  assertPositiveInteger("concurrency", concurrency);
  assertPositiveInteger("host concurrency", hostConcurrency);
  if (!Number.isInteger(retries) || retries < 0) {
    throw new Error("retries must be a non-negative integer");
  }

  const byUrl = new Map();
  for (const entry of entries) {
    const { url, sources = [] } = typeof entry === "string" ? { url: entry } : entry;
    if (!byUrl.has(url)) byUrl.set(url, new Set());
    for (const source of sources) byUrl.get(url).add(source);
  }

  const global = createLimiter(concurrency);
  const hosts = new Map();
  const hostFor = (url) => {
    const key = hostKey(url);
    if (!hosts.has(key)) hosts.set(key, { limiter: createLimiter(hostConcurrency), ...createHostState() });
    return hosts.get(key);
  };

  const results = await Promise.all(
    [...byUrl].map(async ([url, sources]) => {
      const host = hostFor(url);
      const releaseHost = await host.limiter.acquire();
      try {
        const result = await checkUrl(url, {
          ...options,
          acquireSlot: () => global.acquire(),
          hostState: host
        });
        return { ...result, sources: [...sources].sort(compareStrings) };
      } finally {
        releaseHost();
      }
    })
  );
  return results.sort(compareResults);
}

/**
 * Check one URL: HEAD first, GET when HEAD is refused or mishandled, and
 * bounded retries with backoff for 429, 5xx, timeouts, and network errors.
 * A 429/503 pauses the whole host (`hostState.notBefore`), and every 429
 * also widens the minimum gap between requests to that host
 * (`hostState.intervalMs`), so a throttling site is crawled more slowly.
 */
export async function checkUrl(url, options = {}) {
  const {
    timeoutMs = DEFAULT_TIMEOUT_MS,
    fetchImpl = globalThis.fetch,
    retries = DEFAULT_RETRIES,
    retryBaseMs = DEFAULT_RETRY_BASE_MS,
    maxRetryDelayMs = MAX_RETRY_DELAY_MS,
    sleep = delay,
    now = Date.now,
    acquireSlot = async () => () => {},
    hostState = createHostState()
  } = options;

  try {
    new URL(url);
  } catch {
    return { url, status: null, code: "INVALID_URL", error: "invalid URL", attempts: 0 };
  }

  let useGet = false;
  let attempts = 0;
  let outcome;
  for (;;) {
    await waitForHost(hostState, { sleep, now });

    attempts += 1;
    const release = await acquireSlot();
    try {
      outcome = await attempt(url, { useGet, timeoutMs, fetchImpl });
    } finally {
      release();
    }
    useGet ||= outcome.method === "GET";

    const retryAfterMs = parseRetryAfter(outcome.retryAfter, now());
    const wait = retryDelay(attempts, retryAfterMs, { baseMs: retryBaseMs, maxDelayMs: maxRetryDelayMs });
    // Slow the whole host down even when this URL has no retries left.
    if (outcome.status === 429 || outcome.status === 503) {
      hostState.notBefore = Math.max(hostState.notBefore ?? 0, now() + wait);
    }
    if (outcome.status === 429) {
      hostState.intervalMs = Math.min(
        Math.max((hostState.intervalMs ?? 0) * 2, HOST_INTERVAL_STEP_MS),
        MAX_HOST_INTERVAL_MS
      );
      hostState.nextStart = Math.max(hostState.nextStart ?? 0, now() + hostState.intervalMs);
    }
    if (attempts > retries || !isRetryable(outcome)) break;
    await sleep(wait);
  }

  return {
    url,
    status: outcome.status ?? null,
    code: outcome.code ?? null,
    error: outcome.error ?? null,
    attempts
  };
}

/**
 * Per-host politeness state shared by all checks of one host: a pause
 * (`notBefore`) and a minimum gap between request starts (`intervalMs`).
 */
export function createHostState() {
  return { notBefore: 0, nextStart: 0, intervalMs: 0 };
}

async function waitForHost(hostState, { sleep, now }) {
  for (;;) {
    const ready = Math.max(hostState.notBefore ?? 0, hostState.nextStart ?? 0);
    const current = now();
    if (current >= ready) break;
    await sleep(ready - current);
  }
  hostState.nextStart = now() + (hostState.intervalMs ?? 0);
}

export function createExternalLinkReport(results, options = {}) {
  const orderedResults = results.map(normalizeResult).sort(compareResults);
  const summary = { checked: orderedResults.length };
  for (const name of LINK_CLASSES) {
    summary[name] = orderedResults.filter((result) => result.class === name).length;
  }
  const skipped = (options.skipped ?? []).map(normalizeSkipped).sort(compareResults);
  summary.skipped = skipped.length;

  return {
    version: REPORT_VERSION,
    generatedAt: options.generatedAt ?? new Date().toISOString(),
    timeoutMs: options.timeoutMs ?? DEFAULT_TIMEOUT_MS,
    concurrency: options.concurrency ?? DEFAULT_CONCURRENCY,
    hostConcurrency: options.hostConcurrency ?? DEFAULT_HOST_CONCURRENCY,
    retries: options.retries ?? DEFAULT_RETRIES,
    summary,
    results: orderedResults,
    skipped
  };
}

/**
 * Count results of one class per host, most frequent first.
 */
export function topHosts(results, linkClass, limit = TOP_HOST_LIMIT) {
  const counts = new Map();
  for (const result of results) {
    if (result.class !== linkClass) continue;
    const host = hostKey(result.url);
    counts.set(host, (counts.get(host) ?? 0) + 1);
  }
  return [...counts]
    .map(([host, count]) => ({ host, count }))
    .sort((a, b) => b.count - a.count || compareStrings(a.host, b.host))
    .slice(0, limit);
}

export function renderMarkdown(report, { limit = MARKDOWN_GROUP_LIMIT } = {}) {
  const { summary } = report;
  const lines = [
    "# External link health",
    "",
    `Generated: ${report.generatedAt}`,
    "",
    "Only links readers can follow on the rendered pages and in README.md are",
    "checked. Only **broken** links are definite failures; **unreachable** and",
    "**blocked** links need a manual look.",
    "",
    "| Class | Links |",
    "| --- | ---: |",
    `| ok | ${summary.ok} |`,
    `| broken | ${summary.broken} |`,
    `| unreachable | ${summary.unreachable} |`,
    `| blocked | ${summary.blocked} |`,
    `| checked | ${summary.checked} |`,
    `| skipped (private, example, or placeholder hosts) | ${summary.skipped} |`,
    ""
  ];

  if (!summary.broken && !summary.unreachable && !summary.blocked) {
    lines.push("All checked external links responded successfully.", "");
    return `${lines.join("\n")}\n`;
  }

  lines.push("## Top hosts", "", ...renderTopHosts(report), "");

  lines.push(...renderGroup(report, "broken", Infinity, "Broken"));
  lines.push(...renderGroup(report, "unreachable", limit, "Unreachable"));
  lines.push(...renderGroup(report, "blocked", limit, "Blocked"));
  return `${lines.join("\n")}\n`;
}

export function renderSummary(
  report,
  { brokenLimit = SUMMARY_BROKEN_LIMIT, limit = SUMMARY_GROUP_LIMIT } = {}
) {
  const { summary } = report;
  const lines = [
    "### External link health",
    "",
    `Checked ${summary.checked} links: ${summary.ok} ok, **${summary.broken} broken**, ` +
      `${summary.unreachable} unreachable, ${summary.blocked} blocked ` +
      `(${summary.skipped} private, example, or placeholder URLs skipped).`,
    ""
  ];

  if (!summary.broken && !summary.unreachable && !summary.blocked) {
    lines.push("All checked URLs responded successfully.");
    return `${lines.join("\n")}\n`;
  }

  lines.push("Top hosts:", "", ...renderTopHosts(report, SUMMARY_TOP_HOST_LIMIT), "");
  lines.push(...renderGroup(report, "broken", brokenLimit, "Broken", "####"));
  lines.push(...renderGroup(report, "unreachable", limit, "Unreachable", "####"));
  lines.push(...renderGroup(report, "blocked", limit, "Blocked", "####"));
  lines.push("The uploaded report lists every result with its source files.");
  return `${lines.join("\n")}\n`;
}

export async function run(argv = process.argv.slice(2), dependencies = {}) {
  const {
    root = process.cwd(),
    fetchImpl = globalThis.fetch,
    generatedAt,
    loadContent = loadSiteContent,
    sleep,
    now,
    log = console.log
  } = dependencies;
  const options = parseArguments(argv);
  const content = await loadContent(root);
  const { urls, skipped } = collectUrls({ ...content, root });
  const results = await checkUrls(urls, {
    timeoutMs: options.timeoutMs,
    concurrency: options.concurrency,
    hostConcurrency: options.hostConcurrency,
    retries: options.retries,
    fetchImpl,
    ...(sleep ? { sleep } : {}),
    ...(now ? { now } : {})
  });
  const report = createExternalLinkReport(results, {
    generatedAt,
    timeoutMs: options.timeoutMs,
    concurrency: options.concurrency,
    hostConcurrency: options.hostConcurrency,
    retries: options.retries,
    skipped
  });

  await Promise.all([
    writeReport(path.resolve(root, options.output), renderMarkdown(report)),
    writeReport(path.resolve(root, options.json), `${JSON.stringify(report, null, 2)}\n`)
  ]);

  if (options.summaryFile) {
    const summaryFile = path.resolve(root, options.summaryFile);
    await mkdir(path.dirname(summaryFile), { recursive: true });
    await appendFile(summaryFile, renderSummary(report));
  }

  const { summary } = report;
  log(
    `External links: ${summary.checked} checked; ${summary.ok} ok, ${summary.broken} broken, ` +
      `${summary.unreachable} unreachable, ${summary.blocked} blocked; ${summary.skipped} skipped`
  );
  return report;
}

/**
 * Load the published pages and README.md from the repository at `root`.
 * The site's content module reads `content/` relative to the working
 * directory, so `root` must be the current directory.
 */
export async function loadSiteContent(root = process.cwd()) {
  if (path.resolve(root) !== process.cwd()) {
    throw new Error("run the external link check from the repository root");
  }
  const { getPages, renderPage } = await import(
    new URL("../src/lib/content.ts", import.meta.url).href
  );
  let readme = null;
  try {
    readme = await readFile(path.join(root, "README.md"), "utf8");
  } catch {
    readme = null;
  }
  return { pages: getPages(), render: renderPage, readme };
}

export function parseArguments(argv = []) {
  const options = {
    output: DEFAULT_OUTPUT,
    json: DEFAULT_JSON_OUTPUT,
    summaryFile: undefined,
    timeoutMs: DEFAULT_TIMEOUT_MS,
    concurrency: DEFAULT_CONCURRENCY,
    hostConcurrency: DEFAULT_HOST_CONCURRENCY,
    retries: DEFAULT_RETRIES
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
      case "--host-concurrency":
        options.hostConcurrency = parsePositiveInteger(flag, value);
        break;
      case "--retries":
        options.retries = parseNonNegativeInteger(flag, value);
        break;
      default:
        throw new Error(`Unknown option ${flag}`);
    }
  }

  return options;
}

async function attempt(url, { useGet, timeoutMs, fetchImpl }) {
  if (!useGet) {
    const head = await request(url, "HEAD", { timeoutMs, fetchImpl });
    if (!needsGetFallback(head)) return { ...head, method: "HEAD" };
  }
  return { ...(await request(url, "GET", { timeoutMs, fetchImpl })), method: "GET" };
}

function needsGetFallback(outcome) {
  if (Number.isInteger(outcome.status)) return HEAD_FALLBACK_STATUSES.has(outcome.status);
  // Some servers reset or drop HEAD requests; definite failures are not retried as GET.
  return !(
    BROKEN_ERROR_CODES.has(outcome.code) ||
    TLS_CERTIFICATE_CODES.has(outcome.code) ||
    TIMEOUT_CODES.has(outcome.code)
  );
}

async function request(url, method, { timeoutMs, fetchImpl }) {
  if (typeof fetchImpl !== "function") throw new Error("fetch is unavailable");

  try {
    const response = await fetchImpl(url, {
      method,
      redirect: "follow",
      signal: AbortSignal.timeout(timeoutMs),
      headers: {
        "user-agent": USER_AGENT,
        accept: "text/html,application/xhtml+xml;q=0.9,*/*;q=0.8"
      }
    });
    try {
      Promise.resolve(response.body?.cancel?.()).catch(() => {});
    } catch {
      // The body is not needed; a failed cancel does not change the status.
    }
    return {
      status: response.status,
      retryAfter: response.headers?.get?.("retry-after") ?? null
    };
  } catch (error) {
    return describeError(error);
  }
}

/**
 * Turn a fetch rejection into a stable `{ code, error }` pair. Node's fetch
 * wraps the system error (ENOTFOUND, ECONNREFUSED, certificate errors) in
 * `error.cause`.
 */
export function describeError(error) {
  if (error?.name === "TimeoutError" || error?.name === "AbortError") {
    return { code: "TIMEOUT", error: "request timed out" };
  }
  let code = null;
  let message = error?.message ? String(error.message) : String(error);
  for (let current = error; current && !code; current = current.cause) {
    if (typeof current.code === "string") {
      code = current.code;
      message = current.message ? String(current.message) : message;
    }
  }
  if (code && TIMEOUT_CODES.has(code)) return { code: "TIMEOUT", error: "request timed out" };
  if (code === "ENOTFOUND" || code === "EAI_AGAIN") return { code, error: `DNS lookup failed (${code})` };
  if (code === "ECONNREFUSED") return { code, error: "connection refused" };
  if (code && TLS_CERTIFICATE_CODES.has(code)) {
    return { code, error: `invalid TLS certificate (${code})` };
  }
  return { code: code ?? "NETWORK_ERROR", error: message || "network error" };
}

function isRetryable(outcome) {
  if (Number.isInteger(outcome.status)) {
    return outcome.status === 408 || outcome.status === 429 || (outcome.status >= 500 && outcome.status < 600);
  }
  return !TLS_CERTIFICATE_CODES.has(outcome.code) && outcome.code !== "INVALID_URL";
}

function renderTopHosts(report, limit = TOP_HOST_LIMIT) {
  const lines = [];
  for (const name of ["broken", "unreachable", "blocked"]) {
    const hosts = topHosts(report.results, name, limit);
    if (hosts.length) {
      lines.push(`- ${name}: ${hosts.map(({ host, count }) => `${escapeTable(host)} (${count})`).join(", ")}`);
    }
  }
  return lines;
}

function renderGroup(report, linkClass, limit, heading, level = "##") {
  const rows = report.results.filter((result) => result.class === linkClass);
  if (!rows.length) return [];
  const shown = rows.slice(0, limit);
  const title = shown.length < rows.length
    ? `${level} ${heading} (first ${shown.length} of ${rows.length})`
    : `${level} ${heading} (${rows.length})`;
  const lines = [title, "", "| URL | Result | Attempts | Sources |", "| --- | --- | ---: | --- |"];
  for (const result of shown) {
    lines.push(
      `| ${escapeTable(result.url)} | ${escapeTable(describeResult(result))} | ${result.attempts} | ${formatSources(result.sources)} |`
    );
  }
  lines.push("");
  return lines;
}

function describeResult(result) {
  return Number.isInteger(result.status) ? `HTTP ${result.status}` : (result.error ?? "no response");
}

function formatSources(sources, limit = 3) {
  if (!sources.length) return "";
  const shown = sources.slice(0, limit).map((source) => escapeTable(source));
  if (sources.length > limit) shown.push(`and ${sources.length - limit} more`);
  return shown.join("<br>");
}

function normalizeResult(result) {
  const status = Number.isInteger(result.status) ? result.status : null;
  const code = result.code ? String(result.code) : null;
  const error = result.error ? String(result.error) : null;
  return {
    url: String(result.url),
    class: LINK_CLASSES.includes(result.class) ? result.class : classifyResult({ status, code }),
    status,
    code,
    error,
    attempts: Number.isInteger(result.attempts) ? result.attempts : 1,
    sources: [...new Set(result.sources ?? [])].map(String).sort(compareStrings)
  };
}

function normalizeSkipped(entry) {
  return {
    url: String(entry.url),
    reason: String(entry.reason ?? skipReason(entry.url) ?? "skipped"),
    sources: [...new Set(entry.sources ?? [])].map(String).sort(compareStrings)
  };
}

function hostKey(url) {
  try {
    return new URL(url).hostname.toLowerCase();
  } catch {
    return "";
  }
}

function isReservedIpv4(address) {
  const [a, b, c] = address.split(".").map(Number);
  return (
    a === 0 ||
    a === 10 ||
    a === 127 ||
    (a === 100 && b >= 64 && b <= 127) ||
    (a === 169 && b === 254) ||
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 0 && (c === 0 || c === 2)) ||
    (a === 192 && b === 168) ||
    (a === 198 && (b === 18 || b === 19)) ||
    (a === 198 && b === 51 && c === 100) ||
    (a === 203 && b === 0 && c === 113) ||
    a >= 224
  );
}

function isReservedIpv6(address) {
  const value = address.toLowerCase();
  if (value === "::" || value === "::1") return true;
  const mapped = value.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/)?.[1];
  if (mapped) return isReservedIpv4(mapped);
  if (/^::ffff:[0-9a-f]{1,4}:[0-9a-f]{1,4}$/.test(value)) return true;
  const first = parseInt(value.split(":")[0] || "0", 16);
  return (
    (first & 0xfe00) === 0xfc00 || // fc00::/7 unique local
    (first & 0xffc0) === 0xfe80 || // fe80::/10 link-local
    (first & 0xff00) === 0xff00 || // ff00::/8 multicast
    value.startsWith("2001:db8:") || // documentation
    value.startsWith("2001:0db8:")
  );
}

function decodeEntities(value) {
  return value.replace(/&(#x[0-9a-f]+|#\d+|amp|lt|gt|quot|apos|#39);/gi, (match, entity) => {
    const name = entity.toLowerCase();
    if (name === "amp") return "&";
    if (name === "lt") return "<";
    if (name === "gt") return ">";
    if (name === "quot") return '"';
    if (name === "apos" || name === "#39") return "'";
    const codePoint = name.startsWith("#x") ? parseInt(name.slice(2), 16) : parseInt(name.slice(1), 10);
    try {
      return String.fromCodePoint(codePoint);
    } catch {
      return match;
    }
  });
}

function safeDecode(value) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function compareResults(a, b) {
  return collator.compare(a.url, b.url) || (a.url < b.url ? -1 : a.url > b.url ? 1 : 0);
}

function compareStrings(a, b) {
  return collator.compare(a, b) || (a < b ? -1 : a > b ? 1 : 0);
}

async function writeReport(file, contents) {
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, contents, "utf8");
}

function assertPositiveInteger(name, value) {
  if (!Number.isInteger(value) || value < 1) {
    throw new Error(`${name} must be a positive integer`);
  }
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

function parseNonNegativeInteger(flag, value) {
  const parsed = Number(requireValue(flag, value));
  if (!Number.isInteger(parsed) || parsed < 0) {
    throw new Error(`${flag} must be a non-negative integer`);
  }
  return parsed;
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
