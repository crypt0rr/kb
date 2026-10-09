import { readFile } from "node:fs/promises";
import { expect, test } from "@playwright/test";

// These tests run against scripts/serve-dist.mjs, which applies public/_headers
// to every response like Cloudflare Pages does. They fail when the production
// CSP or cross-origin policies break content, embeds, or search.

const policyRoutes = [
  // The representative routes from accessibility-smoke.spec.mjs.
  "/",
  "/commands/",
  "/commands/unix/awk/",
  "/tools/techniques/kerberoasting/",
  "/tags/",
  "/tools/framework/wef/",
  "/tools/other/hexyl/",
  "/tools/other/sosumi/",
  // Pages whose images were mirrored locally to satisfy img-src 'self'.
  "/tools/framework/scoutsuite/",
  "/tools/framework/projectdiscovery/katana/",
  "/tools/apple-macos/ice/",
  "/tools/other/ccat/",
  "/cve/cve-2021-40449/",
  // Aligned Markdown table columns, which must not rely on inline style attributes.
  "/stuff/cheatsheets/netmasks/"
];
// Policy headers that must match public/_headers exactly, including being absent.
const policyHeaders = [
  "content-security-policy",
  "content-security-policy-report-only",
  "cross-origin-embedder-policy",
  "cross-origin-embedder-policy-report-only",
  "cross-origin-opener-policy",
  "cross-origin-resource-policy",
  "permissions-policy",
  "referrer-policy",
  "x-content-type-options",
  "x-frame-options",
  "x-permitted-cross-domain-policies"
];
const youtubeOrigin = "https://www.youtube-nocookie.com";
const youtubeStubMarker = "kb-youtube-embed-stub";

test.beforeEach(async ({ context, page }) => {
  // Keep the suite offline and deterministic: the YouTube embed gets a stub that
  // mirrors the cross-origin headers YouTube actually sends, everything else
  // outside the local server is refused and recorded.
  await context.route(`${youtubeOrigin}/**`, (route) =>
    route.fulfill({
      status: 200,
      contentType: "text/html; charset=utf-8",
      headers: {
        "cross-origin-resource-policy": "cross-origin",
        "cross-origin-embedder-policy-report-only": "require-corp"
      },
      body: `<!doctype html><title>YouTube stub</title><p id="${youtubeStubMarker}">${youtubeStubMarker}</p>`
    })
  );
  await context.route(
    (url) => !isLocal(url) && url.origin !== youtubeOrigin,
    (route) => route.abort("blockedbyclient")
  );

  await page.addInitScript(() => {
    window.__cspViolations = [];
    document.addEventListener("securitypolicyviolation", (event) => {
      window.__cspViolations.push(
        `${event.effectiveDirective} blocked ${event.blockedURI || "inline"} (${event.sourceFile || "document"})`
      );
    });
  });
});

test("responses carry the production headers from public/_headers", async ({ page }) => {
  const expected = await readGlobalHeaders();
  const response = await page.goto("/");

  expect(response?.ok()).toBeTruthy();
  expect(Object.keys(expected)).toContain("content-security-policy");

  const actual = response.headers();
  for (const [name, value] of Object.entries(expected)) {
    expect(actual[name], `${name} should be served from public/_headers`).toBe(value);
  }
  // A stale dist/_headers can carry a policy that public/_headers dropped.
  for (const name of policyHeaders.filter((header) => !(header in expected))) {
    expect(actual[name], `${name} is not in public/_headers`).toBeUndefined();
  }
});

for (const route of policyRoutes) {
  test(`${route} renders without CSP or cross-origin policy violations`, async ({ page }) => {
    const problems = trackPolicyProblems(page);
    const response = await page.goto(route, { waitUntil: "networkidle" });
    expect(response?.ok(), `${route} should return a successful response`).toBeTruthy();

    // Lazy images and iframes below the fold would otherwise never be requested.
    await page.evaluate(() => {
      for (const element of document.querySelectorAll("[loading='lazy']")) {
        element.loading = "eager";
      }
    });
    await page.waitForLoadState("networkidle");
    await expect
      .poll(() => page.evaluate(() => [...document.images].every((image) => image.complete)))
      .toBe(true);

    expect(await collectViolations(page, problems)).toEqual({
      cspViolations: [],
      consoleMessages: [],
      blockedResponses: [],
      externalRequests: [],
      brokenImages: []
    });
  });
}

test("search loads the Pagefind WASM index under the CSP", async ({ page }) => {
  const problems = trackPolicyProblems(page);
  await page.goto("/", { waitUntil: "networkidle" });

  const wasm = page.waitForResponse((response) => /\/pagefind\/wasm\.[^/]+\.pagefind$/.test(response.url()));
  await page.locator("body").press("/");
  const dialog = page.locator("[data-search-dialog]");
  await expect(dialog).toBeVisible();
  await page.locator("[data-search-input]").fill("awk");

  expect((await wasm).status()).toBe(200);
  await expect(dialog.locator(".search-results a").first()).toBeVisible();
  await expect(dialog.locator(".search-results")).not.toContainText("search unavailable");
  expect(await collectViolations(page, problems)).toEqual({
    cspViolations: [],
    consoleMessages: [],
    blockedResponses: [],
    externalRequests: [],
    brokenImages: []
  });
});

test("the YouTube embed loads under the cross-origin policies", async ({ page }) => {
  const problems = trackPolicyProblems(page);
  await page.goto("/tools/other/sosumi/", { waitUntil: "networkidle" });

  const iframe = page.locator(`.video-embed iframe[src^="${youtubeOrigin}/embed/"]`);
  await expect(iframe).toHaveCount(1);
  await iframe.scrollIntoViewIfNeeded();

  await expect(
    page.frameLocator(".video-embed iframe").locator(`#${youtubeStubMarker}`)
  ).toBeVisible();
  expect(await collectViolations(page, problems)).toEqual({
    cspViolations: [],
    consoleMessages: [],
    blockedResponses: [],
    externalRequests: [],
    brokenImages: []
  });
});

function trackPolicyProblems(page) {
  const problems = { consoleMessages: [], blockedResponses: [], externalRequests: [] };

  page.on("console", (message) => {
    const text = message.text();
    if (/Content Security Policy|Refused to/i.test(text)) problems.consoleMessages.push(text);
  });
  page.on("requestfailed", (request) => {
    const errorText = request.failure()?.errorText ?? "";
    if (errorText.includes("ERR_BLOCKED_BY_RESPONSE")) {
      problems.blockedResponses.push(`${errorText} ${request.url()}`);
    } else if (errorText.includes("ERR_BLOCKED_BY_CLIENT") && !isLocal(new URL(request.url()))) {
      problems.externalRequests.push(request.url());
    }
  });

  return problems;
}

async function collectViolations(page, problems) {
  const cspViolations = [];
  for (const frame of page.frames()) {
    cspViolations.push(...(await frame.evaluate(() => window.__cspViolations ?? []).catch(() => [])));
  }
  const brokenImages = await page.evaluate(() =>
    [...document.images]
      .filter((image) => image.complete && image.naturalWidth === 0)
      .map((image) => image.getAttribute("src"))
  );

  return { cspViolations, ...problems, brokenImages };
}

async function readGlobalHeaders() {
  const source = await readFile(new URL("../public/_headers", import.meta.url), "utf8");
  const block = source.split(/^\/\*\s*$/m)[1]?.split(/^\S/m)[0] ?? "";
  return Object.fromEntries(
    block
      .split("\n")
      .map((line) => /^\s+([^:\s]+):\s*(.*?)\s*$/.exec(line))
      .filter(Boolean)
      .map((match) => [match[1].toLowerCase(), match[2]])
  );
}

function isLocal(url) {
  return url.hostname === "127.0.0.1" || url.hostname === "localhost";
}
