import assert from "node:assert/strict";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { createMarkdown } from "../src/lib/links.mjs";
import {
  checkUrl,
  checkUrls,
  classifyResult,
  collectUrls,
  collectUrlsFromHtml,
  createExternalLinkReport,
  createHostState,
  createLimiter,
  describeError,
  MAX_HOST_INTERVAL_MS,
  parseArguments,
  parseRetryAfter,
  renderMarkdown,
  renderSummary,
  retryDelay,
  run,
  skipReason,
  topHosts,
  USER_AGENT
} from "../scripts/check-external-links.mjs";

const md = createMarkdown();

function fakeClock() {
  const clock = {
    time: 0,
    sleeps: [],
    now: () => clock.time,
    sleep: async (ms) => {
      clock.sleeps.push(ms);
      clock.time += ms;
    }
  };
  return clock;
}

function response(status, headers = {}) {
  const lower = Object.fromEntries(
    Object.entries(headers).map(([name, value]) => [name.toLowerCase(), value])
  );
  return {
    status,
    headers: { get: (name) => lower[name.toLowerCase()] ?? null },
    body: { cancel() {} }
  };
}

function systemError(code) {
  const cause = Object.assign(new Error(`getaddrinfo ${code} host.test`), { code });
  return Object.assign(new TypeError("fetch failed"), { cause });
}

test("collects rendered link targets and ignores code", () => {
  const html = md.render(
    [
      "[Docs](https://docs.kb-fixture.dev/guide#install) and https://bare.kb-fixture.dev/page.",
      "",
      "Inline `curl https://inline.kb-fixture.dev/` stays code.",
      "",
      "```bash",
      "curl http://fenced.kb-fixture.dev/ https://fenced2.kb-fixture.dev/",
      "```",
      "",
      "    https://indented.kb-fixture.dev/",
      "",
      '<img src="https://img.kb-fixture.dev/a.png" data-src="https://data.kb-fixture.dev/b.png">',
      "",
      "[Query](https://q.kb-fixture.dev/?a=1&b=2) [Mail](mailto:me@kb-fixture.dev) [Local](/tools/)"
    ].join("\n")
  );

  const found = collectUrlsFromHtml(html, "content/a/index.md");
  assert.deepEqual(
    [...found.keys()].sort(),
    [
      "https://bare.kb-fixture.dev/page",
      "https://docs.kb-fixture.dev/guide",
      "https://img.kb-fixture.dev/a.png",
      "https://q.kb-fixture.dev/?a=1&b=2"
    ]
  );
  assert.deepEqual([...found.get("https://docs.kb-fixture.dev/guide")], ["content/a/index.md"]);
});

test("collectUrlsFromHtml merges sources for the same URL", () => {
  const found = collectUrlsFromHtml('<a href="https://kb-fixture.dev/x">x</a>', "content/a.md");
  collectUrlsFromHtml("<a href='https://kb-fixture.dev/x#frag'>x</a>", "content/b.md", found);
  assert.deepEqual([...found.get("https://kb-fixture.dev/x")], ["content/a.md", "content/b.md"]);
});

test("collectUrls renders pages and README, records sources, and skips private hosts", () => {
  const root = "/repo";
  const pages = [
    {
      file: "/repo/content/tools/b/index.md",
      body: "See https://shared.kb-fixture.dev/ and [admin](http://10.10.10.10/administrator/)."
    },
    {
      file: "/repo/content/tools/a/index.md",
      body: "[Shared](https://shared.kb-fixture.dev/)\n\n```\nhttp://code-only.kb-fixture.dev/\n```\n[x](http://localhost:8000/)"
    }
  ];
  const { urls, skipped } = collectUrls({
    root,
    pages,
    render: (page) => md.render(page.body),
    readme: "Live on [kb](https://kb.offsec.nl).\n\n```\ngit clone https://github.com/crypt0rr/kb\n```\n"
  });

  assert.deepEqual(urls, [
    { url: "https://kb.offsec.nl", sources: ["README.md"] },
    {
      url: "https://shared.kb-fixture.dev/",
      sources: ["content/tools/a/index.md", "content/tools/b/index.md"]
    }
  ]);
  assert.deepEqual(
    skipped.map(({ url, reason, sources }) => [url, reason, sources]),
    [
      ["http://10.10.10.10/administrator/", "private or reserved address", ["content/tools/b/index.md"]],
      ["http://localhost:8000/", "local host", ["content/tools/a/index.md"]]
    ]
  );
});

test("skips private, reserved, example, and placeholder hosts", () => {
  const skippedUrls = [
    "http://10.1.2.3/",
    "http://172.16.0.1/",
    "http://172.31.255.255/",
    "http://192.168.1.1/",
    "http://127.0.0.1:8080/",
    "http://169.254.169.254/latest/meta-data/",
    "http://0.0.0.0:8000/",
    "http://[::1]/",
    "http://[fd12:3456::1]/",
    "http://[fe80::1]/",
    "http://localhost/",
    "http://printer.local/",
    "https://example.com/",
    "https://www.example.org/path",
    "https://api.example.net/",
    "http://{address}/system.ini",
    "http://%7Baddress%7D/system.ini",
    "http://<target>/",
    "http://$IP/shell",
    "http://target/",
    "http://host.test/"
  ];
  for (const url of skippedUrls) assert.ok(skipReason(url), `${url} should be skipped`);

  for (const url of [
    "https://github.com/crypt0rr/kb",
    "http://172.32.0.1/",
    "https://8.8.8.8/",
    "https://notexample.com/",
    "https://[2606:4700::1111]/"
  ]) {
    assert.equal(skipReason(url), null, `${url} should be checked`);
  }
});

test("parses Retry-After as seconds or an HTTP date", () => {
  const now = Date.parse("2026-10-07T12:00:00Z");
  assert.equal(parseRetryAfter("120", now), 120_000);
  assert.equal(parseRetryAfter(" 0 ", now), 0);
  assert.equal(parseRetryAfter("Wed, 07 Oct 2026 12:00:30 GMT", now), 30_000);
  assert.equal(parseRetryAfter("Wed, 07 Oct 2026 11:00:00 GMT", now), 0);
  assert.equal(parseRetryAfter("soon", now), null);
  assert.equal(parseRetryAfter(null, now), null);
  assert.equal(parseRetryAfter("", now), null);
});

test("caps Retry-After and exponential backoff", () => {
  const options = { baseMs: 1000, maxDelayMs: 60_000 };
  assert.equal(retryDelay(1, null, options), 1000);
  assert.equal(retryDelay(2, null, options), 2000);
  assert.equal(retryDelay(3, null, options), 4000);
  assert.equal(retryDelay(10, null, options), 60_000);
  assert.equal(retryDelay(1, 5000, options), 5000);
  assert.equal(retryDelay(1, 3_600_000, options), 60_000);
});

test("retries 429 with Retry-After on a fake clock and pauses the host", async () => {
  const clock = fakeClock();
  const statuses = [429, 429, 200];
  const hostState = createHostState();
  const result = await checkUrl("https://die.kb-fixture.dev/man/1/ls", {
    fetchImpl: async () => response(statuses.shift(), { "retry-after": "7" }),
    sleep: clock.sleep,
    now: clock.now,
    hostState
  });

  assert.deepEqual(result, {
    url: "https://die.kb-fixture.dev/man/1/ls",
    status: 200,
    code: null,
    error: null,
    attempts: 3
  });
  assert.deepEqual(clock.sleeps, [7000, 7000]);
  assert.equal(hostState.notBefore, 14_000);
  assert.equal(hostState.intervalMs, 2000);
});

test("spaces later requests to a host that answered 429", async () => {
  const clock = fakeClock();
  const hostState = createHostState();
  const starts = [];
  const statuses = [429, 200, 200, 200, 429, 200];
  const check = (url) =>
    checkUrl(url, {
      fetchImpl: async () => {
        starts.push(clock.time);
        return response(statuses.shift());
      },
      sleep: clock.sleep,
      now: clock.now,
      retryBaseMs: 100,
      hostState
    });

  for (const page of ["a", "b", "c", "d"]) {
    await check(`https://die.kb-fixture.dev/${page}`);
  }

  // The 429 at 0 opens a 1 s gap between requests; the next 429 doubles it.
  assert.deepEqual(starts, [0, 1000, 2000, 3000, 4000, 6000]);
  assert.equal(hostState.intervalMs, 2000);
  for (let i = 0; i < 100; i += 1) {
    hostState.intervalMs = Math.min(hostState.intervalMs * 2, MAX_HOST_INTERVAL_MS);
  }
  assert.equal(hostState.intervalMs, MAX_HOST_INTERVAL_MS);
});

test("honours a dated Retry-After and caps a long one", async () => {
  const clock = fakeClock();
  clock.time = Date.parse("2026-10-07T12:00:00Z");
  const headers = ["Wed, 07 Oct 2026 12:00:20 GMT", "86400"];
  const result = await checkUrl("https://slow.kb-fixture.dev/", {
    fetchImpl: async () => response(503, { "retry-after": headers.shift() ?? "1" }),
    sleep: clock.sleep,
    now: clock.now,
    retries: 2
  });

  assert.deepEqual(clock.sleeps, [20_000, 60_000]);
  assert.equal(result.attempts, 3);
  assert.equal(classifyResult(result), "unreachable");
});

test("backs off exponentially without Retry-After and stops after the retry budget", async () => {
  const clock = fakeClock();
  let calls = 0;
  const result = await checkUrl("https://flaky.kb-fixture.dev/", {
    fetchImpl: async () => {
      calls += 1;
      throw Object.assign(new DOMException("timed out", "TimeoutError"));
    },
    sleep: clock.sleep,
    now: clock.now,
    retries: 2,
    retryBaseMs: 500
  });

  assert.equal(calls, 3);
  assert.deepEqual(clock.sleeps, [500, 1000]);
  assert.deepEqual(
    { code: result.code, error: result.error, attempts: result.attempts },
    { code: "TIMEOUT", error: "request timed out", attempts: 3 }
  );
});

test("does not retry definite answers", async () => {
  const clock = fakeClock();
  for (const status of [404, 410, 403, 401, 200]) {
    let calls = 0;
    const result = await checkUrl("https://once.kb-fixture.dev/", {
      fetchImpl: async () => {
        calls += 1;
        return response(status);
      },
      sleep: clock.sleep,
      now: clock.now
    });
    assert.equal(result.attempts, 1, `HTTP ${status}`);
    assert.ok(calls <= 2, `HTTP ${status} is checked with at most HEAD and GET`);
  }
  assert.deepEqual(clock.sleeps, []);

  const certificate = await checkUrl("https://expired.kb-fixture.dev/", {
    fetchImpl: async () => {
      throw systemError("CERT_HAS_EXPIRED");
    },
    sleep: clock.sleep,
    now: clock.now
  });
  assert.equal(certificate.attempts, 1);
  assert.equal(classifyResult(certificate), "broken");
});

test("retries DNS failures before calling them broken", async () => {
  const clock = fakeClock();
  let calls = 0;
  const result = await checkUrl("https://gone.kb-fixture.dev/", {
    fetchImpl: async () => {
      calls += 1;
      throw systemError("ENOTFOUND");
    },
    sleep: clock.sleep,
    now: clock.now,
    retries: 1
  });
  assert.equal(calls, 2);
  assert.equal(result.attempts, 2);
  assert.equal(result.error, "DNS lookup failed (ENOTFOUND)");
  assert.equal(classifyResult(result), "broken");
});

test("falls back from HEAD to GET when HEAD is mishandled", async () => {
  for (const headStatus of [400, 401, 403, 404, 405, 501]) {
    const methods = [];
    const result = await checkUrl("https://head.kb-fixture.dev/", {
      fetchImpl: async (_url, options) => {
        methods.push(options.method);
        assert.equal(options.headers["user-agent"], USER_AGENT);
        return response(options.method === "HEAD" ? headStatus : 200);
      }
    });
    assert.deepEqual(methods, ["HEAD", "GET"], `HEAD ${headStatus}`);
    assert.equal(result.status, 200);
  }
});

test("keeps using GET on retries once HEAD was mishandled", async () => {
  const clock = fakeClock();
  const methods = [];
  const result = await checkUrl("https://head.kb-fixture.dev/", {
    fetchImpl: async (_url, options) => {
      methods.push(options.method);
      if (options.method === "HEAD") return response(405);
      return response(methods.length < 4 ? 502 : 200);
    },
    sleep: clock.sleep,
    now: clock.now
  });
  assert.deepEqual(methods, ["HEAD", "GET", "GET", "GET"]);
  assert.equal(result.status, 200);
  assert.equal(result.attempts, 3);
});

test("the user agent is honest and does not impersonate a browser", () => {
  assert.match(USER_AGENT, /^kb-external-link-check\//);
  assert.doesNotMatch(USER_AGENT, /Mozilla|Chrome|Safari/);
});

test("limits requests in flight per host and globally", async () => {
  const active = new Map();
  const peak = new Map();
  let activeTotal = 0;
  let peakTotal = 0;
  const gates = [];

  const urls = [
    ...Array.from({ length: 6 }, (_, i) => `https://die.kb-fixture.dev/man/${i}`),
    ...Array.from({ length: 3 }, (_, i) => `https://other.kb-fixture.dev/${i}`)
  ];
  const resultsPromise = checkUrls(urls, {
    concurrency: 4,
    hostConcurrency: 2,
    fetchImpl: async (url) => {
      const host = new URL(url).hostname;
      active.set(host, (active.get(host) ?? 0) + 1);
      peak.set(host, Math.max(peak.get(host) ?? 0, active.get(host)));
      activeTotal += 1;
      peakTotal = Math.max(peakTotal, activeTotal);
      await new Promise((resolve) => gates.push(resolve));
      active.set(host, active.get(host) - 1);
      activeTotal -= 1;
      return response(200);
    }
  });

  while (true) {
    await new Promise((resolve) => setImmediate(resolve));
    const gate = gates.shift();
    if (gate) gate();
    else if (activeTotal === 0) break;
  }
  const results = await resultsPromise;

  assert.equal(results.length, 9);
  assert.equal(peak.get("die.kb-fixture.dev"), 2);
  assert.equal(peak.get("other.kb-fixture.dev"), 2);
  assert.ok(peakTotal <= 4);
  assert.ok(results.every((result) => result.status === 200));
});

test("createLimiter hands slots over in order", async () => {
  const limiter = createLimiter(1);
  const order = [];
  const first = await limiter.acquire();
  const second = limiter.acquire().then((release) => {
    order.push("second");
    return release;
  });
  const third = limiter.acquire().then((release) => {
    order.push("third");
    return release;
  });
  assert.equal(limiter.active, 1);
  first();
  first();
  (await second)();
  (await third)();
  assert.deepEqual(order, ["second", "third"]);
  assert.equal(limiter.active, 0);
});

test("checkUrls merges duplicate entries and keeps their sources", async () => {
  const results = await checkUrls(
    [
      { url: "https://kb-fixture.dev/x", sources: ["content/b.md"] },
      { url: "https://kb-fixture.dev/x", sources: ["content/a.md"] },
      "https://kb-fixture.dev/y"
    ],
    { fetchImpl: async () => response(200) }
  );
  assert.deepEqual(
    results.map(({ url, sources }) => [url, sources]),
    [
      ["https://kb-fixture.dev/x", ["content/a.md", "content/b.md"]],
      ["https://kb-fixture.dev/y", []]
    ]
  );
});

test("classifies statuses and errors", () => {
  const cases = [
    [{ status: 200 }, "ok"],
    [{ status: 204 }, "ok"],
    [{ status: 301 }, "ok"],
    [{ status: 404 }, "broken"],
    [{ status: 410 }, "broken"],
    [{ status: 401 }, "blocked"],
    [{ status: 402 }, "blocked"],
    [{ status: 403 }, "blocked"],
    [{ status: 429 }, "blocked"],
    [{ status: 451 }, "blocked"],
    [{ status: 999 }, "blocked"],
    [{ status: 500 }, "unreachable"],
    [{ status: 503 }, "unreachable"],
    [{ status: 400 }, "unreachable"],
    [{ code: "ENOTFOUND" }, "broken"],
    [{ code: "EAI_AGAIN" }, "broken"],
    [{ code: "ECONNREFUSED" }, "broken"],
    [{ code: "CERT_HAS_EXPIRED" }, "broken"],
    [{ code: "ERR_TLS_CERT_ALTNAME_INVALID" }, "broken"],
    [{ code: "INVALID_URL" }, "broken"],
    [{ code: "TIMEOUT" }, "unreachable"],
    [{ code: "ECONNRESET" }, "unreachable"],
    [{ code: "NETWORK_ERROR" }, "unreachable"]
  ];
  for (const [input, expected] of cases) {
    assert.equal(classifyResult(input), expected, JSON.stringify(input));
  }
});

test("describes fetch errors by their system error code", () => {
  assert.deepEqual(describeError(systemError("ENOTFOUND")), {
    code: "ENOTFOUND",
    error: "DNS lookup failed (ENOTFOUND)"
  });
  assert.deepEqual(describeError(systemError("ECONNREFUSED")), {
    code: "ECONNREFUSED",
    error: "connection refused"
  });
  assert.deepEqual(describeError(systemError("UND_ERR_CONNECT_TIMEOUT")), {
    code: "TIMEOUT",
    error: "request timed out"
  });
  assert.deepEqual(describeError(new DOMException("aborted", "TimeoutError")), {
    code: "TIMEOUT",
    error: "request timed out"
  });
  assert.equal(describeError(systemError("SELF_SIGNED_CERT_IN_CHAIN")).error,
    "invalid TLS certificate (SELF_SIGNED_CERT_IN_CHAIN)");
  assert.deepEqual(describeError(new TypeError("fetch failed")), {
    code: "NETWORK_ERROR",
    error: "fetch failed"
  });
});

test("creates a grouped, deterministically ordered report", () => {
  const report = createExternalLinkReport(
    [
      { url: "https://z.kb-fixture.dev", status: 503, attempts: 3, sources: ["content/z.md"] },
      { url: "https://a.kb-fixture.dev", status: 200, attempts: 1, sources: ["content/a.md"] },
      { url: "https://m.kb-fixture.dev", code: "TIMEOUT", error: "request timed out", attempts: 3 },
      { url: "https://b.kb-fixture.dev/gone", status: 404, attempts: 1, sources: ["content/b.md", "README.md"] },
      { url: "https://die.kb-fixture.dev/1", status: 429, attempts: 3, sources: ["content/c.md"] }
    ],
    {
      generatedAt: "2026-08-14T00:00:00.000Z",
      timeoutMs: 5000,
      concurrency: 2,
      hostConcurrency: 1,
      retries: 1,
      skipped: [{ url: "http://10.0.0.1/", reason: "private or reserved address", sources: ["content/x.md"] }]
    }
  );

  assert.equal(report.version, 2);
  assert.deepEqual(report.summary, {
    checked: 5,
    ok: 1,
    broken: 1,
    unreachable: 2,
    blocked: 1,
    skipped: 1
  });
  assert.deepEqual(
    report.results.map(({ url, class: linkClass }) => [url, linkClass]),
    [
      ["https://a.kb-fixture.dev", "ok"],
      ["https://b.kb-fixture.dev/gone", "broken"],
      ["https://die.kb-fixture.dev/1", "blocked"],
      ["https://m.kb-fixture.dev", "unreachable"],
      ["https://z.kb-fixture.dev", "unreachable"]
    ]
  );
  assert.deepEqual(report.results[1], {
    url: "https://b.kb-fixture.dev/gone",
    class: "broken",
    status: 404,
    code: null,
    error: null,
    attempts: 1,
    sources: ["content/b.md", "README.md"]
  });
  assert.deepEqual(
    { hostConcurrency: report.hostConcurrency, retries: report.retries },
    { hostConcurrency: 1, retries: 1 }
  );
  assert.deepEqual(topHosts(report.results, "unreachable"), [
    { host: "m.kb-fixture.dev", count: 1 },
    { host: "z.kb-fixture.dev", count: 1 }
  ]);

  const markdown = renderMarkdown(report);
  assert.match(markdown, /\| broken \| 1 \|/);
  assert.match(markdown, /\| unreachable \| 2 \|/);
  assert.match(markdown, /## Broken \(1\)/);
  assert.match(markdown, /\| https:\/\/b\.kb-fixture\.dev\/gone \| HTTP 404 \| 1 \| content\/b\.md<br>README\.md \|/);
  assert.match(markdown, /## Unreachable \(2\)/);
  assert.match(markdown, /request timed out/);
  assert.match(markdown, /## Blocked \(1\)/);
  assert.match(markdown, /- blocked: die\.kb-fixture\.dev \(1\)/);
  assert.doesNotMatch(markdown, /https:\/\/a\.kb-fixture\.dev \|/);

  const summary = renderSummary(report);
  assert.match(summary, /Checked 5 links: 1 ok, \*\*1 broken\*\*, 2 unreachable, 1 blocked \(1 private/);
  assert.match(summary, /#### Broken \(1\)/);
  assert.match(summary, /content\/b\.md/);
});

test("limits unreachable and blocked rows but lists every broken link", () => {
  const results = [
    ...Array.from({ length: 4 }, (_, i) => ({ url: `https://gone.kb-fixture.dev/${i}`, status: 404 })),
    ...Array.from({ length: 4 }, (_, i) => ({ url: `https://slow.kb-fixture.dev/${i}`, status: 500 })),
    ...Array.from({ length: 12 }, (_, i) => ({
      url: `https://die.kb-fixture.dev/${i}`,
      status: 429,
      sources: ["content/a.md", "content/b.md", "content/c.md", "content/d.md"]
    }))
  ];
  const report = createExternalLinkReport(results, { generatedAt: "2026-08-14T00:00:00.000Z" });

  const markdown = renderMarkdown(report, { limit: 2 });
  assert.match(markdown, /## Broken \(4\)/);
  assert.match(markdown, /## Unreachable \(first 2 of 4\)/);
  assert.match(markdown, /## Blocked \(first 2 of 12\)/);
  assert.match(markdown, /content\/c\.md<br>and 1 more/);

  const summary = renderSummary(report, { brokenLimit: 3, limit: 1 });
  assert.match(summary, /#### Broken \(first 3 of 4\)/);
  assert.match(summary, /#### Blocked \(first 1 of 12\)/);
});

test("renders a concise success report", () => {
  const report = createExternalLinkReport([{ url: "https://kb-fixture.dev", status: 204 }], {
    generatedAt: "2026-08-14T00:00:00.000Z"
  });

  assert.match(renderMarkdown(report), /All checked external links responded successfully/);
  assert.doesNotMatch(renderMarkdown(report), /## Broken/);
  assert.match(renderSummary(report), /All checked URLs responded successfully/);
});

test("parses report, summary, timeout, concurrency, and retry options", () => {
  assert.deepEqual(
    parseArguments([
      "--output",
      "reports/links.md",
      "--json=reports/links.json",
      "--summary-file",
      "summary.md",
      "--timeout",
      "5000",
      "--concurrency=3",
      "--host-concurrency",
      "1",
      "--retries=0"
    ]),
    {
      output: "reports/links.md",
      json: "reports/links.json",
      summaryFile: "summary.md",
      timeoutMs: 5000,
      concurrency: 3,
      hostConcurrency: 1,
      retries: 0
    }
  );
  assert.equal(parseArguments([]).hostConcurrency, 2);
  assert.equal(parseArguments([]).retries, 2);
  assert.throws(() => parseArguments(["--host-concurrency", "0"]), /positive integer/);
  assert.throws(() => parseArguments(["--retries", "-1"]), /requires a value|non-negative/);
  assert.throws(() => parseArguments(["--retries", "1.5"]), /non-negative integer/);
});

test("run writes Markdown, complete JSON, and the requested summary", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "kb-external-links-"));
  const clock = fakeClock();
  const logs = [];

  try {
    const pages = [
      {
        file: path.join(root, "content", "tools", "example", "index.md"),
        body: "[Good](https://good.kb-fixture.dev)\n[Bad](https://bad.kb-fixture.dev)\n\n```\nhttp://10.10.10.10/\n```\n"
      }
    ];
    const report = await run(
      [
        "--output",
        ".reports/links.md",
        "--json",
        ".reports/links.json",
        "--summary-file",
        ".reports/summary.md"
      ],
      {
        root,
        generatedAt: "2026-08-14T00:00:00.000Z",
        loadContent: async () => ({
          pages,
          render: (page) => md.render(page.body),
          readme: "[Good](https://good.kb-fixture.dev) and http://localhost:4321/"
        }),
        fetchImpl: async (url) => response(url.includes("bad") ? 404 : 200),
        sleep: clock.sleep,
        now: clock.now,
        log: (line) => logs.push(line)
      }
    );

    const json = JSON.parse(await readFile(path.join(root, ".reports/links.json"), "utf8"));
    const markdown = await readFile(path.join(root, ".reports/links.md"), "utf8");
    const summary = await readFile(path.join(root, ".reports/summary.md"), "utf8");

    assert.equal(report.summary.checked, 2);
    assert.deepEqual(json.summary, {
      checked: 2,
      ok: 1,
      broken: 1,
      unreachable: 0,
      blocked: 0,
      skipped: 1
    });
    assert.deepEqual(json.results[1].sources, ["content/tools/example/index.md", "README.md"]);
    assert.deepEqual(json.skipped, [
      { url: "http://localhost:4321/", reason: "local host", sources: ["README.md"] }
    ]);
    assert.match(markdown, /## Broken \(1\)/);
    assert.match(markdown, /content\/tools\/example\/index\.md/);
    assert.match(summary, /External link health/);
    assert.match(summary, /https:\/\/bad\.kb-fixture\.dev/);
    assert.deepEqual(logs, [
      "External links: 2 checked; 1 ok, 1 broken, 0 unreachable, 0 blocked; 1 skipped"
    ]);
    assert.deepEqual(clock.sleeps, []);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
