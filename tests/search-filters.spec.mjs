import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { MAX_RESULTS } from "../static/js/kb-search.js";

// Filter-only browsing: the search dialog lists pages for a section or tag
// without a query, and the tag filter offers every tag in the Pagefind index.

function expectedStatus(total) {
  if (total > MAX_RESULTS) return `showing ${MAX_RESULTS} of ${total} results`;
  return `${total} result${total === 1 ? "" : "s"}`;
}

// Picks a tag that the filter offers but the sidebar's popular tags list does not.
async function findNonPopularTag(page) {
  const popular = await page.locator(".sidebar-tags a").allTextContents();
  const options = await page.locator("[data-search-tag] option").evaluateAll((items) =>
    items
      .filter((item) => item.value)
      .map((item) => ({ value: item.value, count: Number(item.textContent.match(/\((\d+)\)\s*$/)?.[1]) }))
  );
  const candidate = options.find((option) => !popular.map((tag) => tag.trim()).includes(option.value));
  expect(candidate, "the tag filter should offer at least one non-popular tag").toBeTruthy();
  return candidate;
}

async function pagefindFilters(page) {
  return page.evaluate(async () => {
    const pagefind = await import("/pagefind/pagefind.js");
    return pagefind.filters();
  });
}

test("the filters offer every Pagefind section and tag with matching counts", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  const indexFilters = await pagefindFilters(page);
  const tagOptions = await page.locator("[data-search-tag] option").evaluateAll((items) =>
    items
      .filter((item) => item.value)
      .map((item) => [item.value, Number(item.textContent.match(/\((\d+)\)\s*$/)?.[1])])
  );
  const sectionValues = await page
    .locator("[data-search-section] option")
    .evaluateAll((items) => items.map((item) => item.value).filter(Boolean));
  const popularCount = await page.locator(".sidebar-tags a").count();

  expect(tagOptions.length).toBeGreaterThan(popularCount);
  expect(Object.fromEntries(tagOptions)).toEqual(indexFilters.tag);
  const sortedTags = tagOptions.map(([tag]) => tag);
  expect(sortedTags).toEqual([...sortedTags].sort((a, b) => a.localeCompare(b)));
  for (const section of sectionValues) {
    expect(indexFilters.section[section], `section "${section}" should have indexed pages`).toBeGreaterThan(0);
  }
});

test("selecting a section with an empty query lists its pages", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const indexFilters = await pagefindFilters(page);

  await page.locator("[data-search-open]").click();
  const dialog = page.locator("[data-search-dialog]");
  const searchInput = page.locator("[data-search-input]");
  await expect(searchInput).toHaveValue("");

  await page.locator("[data-search-section]").selectOption("commands");
  const total = indexFilters.section.commands;
  await expect(dialog.locator(".search-status")).toHaveText(expectedStatus(total));
  await expect(dialog.locator(".search-results a")).toHaveCount(Math.min(total, MAX_RESULTS));
  await expect(dialog.locator(".search-results a small").first()).toHaveText("commands");
  expect(new URL(page.url()).searchParams.get("section")).toBe("commands");

  // Arrow keys and Enter still drive the filter-only results.
  await searchInput.focus();
  await page.keyboard.press("ArrowDown");
  const firstResult = dialog.locator(".search-results a").first();
  await expect(firstResult).toHaveClass(/is-active/);

  const dialogResults = await new AxeBuilder({ page }).include("[data-search-dialog]").analyze();
  expect(dialogResults.violations).toEqual([]);

  const href = await firstResult.getAttribute("href");
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(new RegExp(`${href.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`));
});

test("clearing the query and every filter clears the results", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const indexFilters = await pagefindFilters(page);
  await page.locator("[data-search-open]").click();
  const results = page.locator("[data-search-dialog] .search-results");
  const status = results.locator(".search-status");
  const sectionStatus = expectedStatus(indexFilters.section.commands);

  await page.locator("[data-search-section]").selectOption("commands");
  await expect(status).toHaveText(sectionStatus);

  await page.locator("[data-search-input]").fill("awk");
  await expect(status).not.toHaveText(sectionStatus);
  await expect(results.locator("a").first()).toBeVisible();
  await page.locator("[data-search-input]").fill("");
  // The section filter alone runs a new filter-only search.
  await expect(status).toHaveText(sectionStatus);
  await expect(results.locator("a")).toHaveCount(Math.min(indexFilters.section.commands, MAX_RESULTS));

  await page.locator("[data-search-section]").selectOption("");
  await expect(results).toBeEmpty();
  await expect(results).toHaveAttribute("aria-busy", "false");
  expect(new URL(page.url()).search).toBe("");
});

test("clearing the filters drops a search that is still running", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await page.locator("[data-search-open]").click();
  const results = page.locator("[data-search-dialog] .search-results");
  const section = page.locator("[data-search-section]");

  // Each change starts a filter-only search; clearing straight after must not
  // let any of them repaint the cleared results.
  for (let attempt = 0; attempt < 5; attempt += 1) {
    await section.evaluate((select) => {
      select.value = "commands";
      select.dispatchEvent(new Event("change"));
      select.value = "";
      select.dispatchEvent(new Event("change"));
    });
  }
  await page.waitForTimeout(500);
  await expect(results).toBeEmpty();
  await expect(results).toHaveAttribute("aria-busy", "false");
});

test("a non-popular tag can be selected and returns its pages", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const tag = await findNonPopularTag(page);

  await page.locator("[data-search-open]").click();
  await page.locator("[data-search-tag]").selectOption(tag.value);

  const dialog = page.locator("[data-search-dialog]");
  await expect(dialog.locator(".search-status")).toHaveText(expectedStatus(tag.count));
  await expect(dialog.locator(".search-results a")).toHaveCount(Math.min(tag.count, MAX_RESULTS));
  expect(new URL(page.url()).searchParams.get("tag")).toBe(tag.value);
});

test("opening a tag URL shows the tag's pages in search", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const tag = await findNonPopularTag(page);

  await page.goto(`/?tag=${encodeURIComponent(tag.value)}`, { waitUntil: "networkidle" });
  const dialog = page.locator("[data-search-dialog]");
  await expect(dialog).toBeVisible();
  await expect(page.locator("[data-search-tag]")).toHaveValue(tag.value);
  await expect(dialog.locator(".search-status")).toHaveText(expectedStatus(tag.count));
  await expect(dialog.locator(".search-results a")).toHaveCount(Math.min(tag.count, MAX_RESULTS));

  const dialogResults = await new AxeBuilder({ page }).include("[data-search-dialog]").analyze();
  expect(dialogResults.violations).toEqual([]);

  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
});

test("a tag URL that uses the tag slug selects the tag", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  // A tag whose /tags/<slug>/ slug differs from its label, such as "Active Directory".
  const tag = await page.locator("[data-search-tag] option").evaluateAll((items) =>
    items
      .filter((item) => item.value && item.dataset.slug !== item.value)
      .map((item) => ({
        value: item.value,
        slug: item.dataset.slug,
        count: Number(item.textContent.match(/\((\d+)\)\s*$/)?.[1])
      }))[0]
  );
  expect(tag, "the tag filter should offer a tag whose slug differs from its label").toBeTruthy();

  await page.goto(`/?tag=${encodeURIComponent(tag.slug)}`, { waitUntil: "networkidle" });
  await expect(page.locator("[data-search-tag]")).toHaveValue(tag.value);
  await expect(page.locator("[data-search-dialog] .search-status")).toHaveText(expectedStatus(tag.count));
  expect(new URL(page.url()).searchParams.get("tag")).toBe(tag.value);
});

test("an unknown tag URL is dropped from the address", async ({ page }) => {
  await page.goto("/?tag=no-such-tag&section=cve", { waitUntil: "networkidle" });
  await expect(page.locator("[data-search-dialog]")).toBeVisible();
  await expect(page.locator("[data-search-tag]")).toHaveValue("");
  await expect(page.locator("[data-search-dialog] .search-results a").first()).toBeVisible();
  const params = new URL(page.url()).searchParams;
  expect(params.has("tag")).toBe(false);
  expect(params.get("section")).toBe("cve");
});

test("opening a section URL shows the section's pages in search", async ({ page }) => {
  await page.goto("/?section=cve", { waitUntil: "networkidle" });
  const dialog = page.locator("[data-search-dialog]");
  await expect(dialog).toBeVisible();
  await expect(page.locator("[data-search-section]")).toHaveValue("cve");
  await expect(dialog.locator(".search-results a").first()).toBeVisible();
  await expect(dialog.locator(".search-results a small").first()).toHaveText("cve");
});
