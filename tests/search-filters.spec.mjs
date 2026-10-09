import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

// Filter-only browsing: the search dialog lists pages for a section or tag
// without a query, and the tag filter offers every tag in the Pagefind index.

const maxResults = 12;

function expectedStatus(total) {
  if (total > maxResults) return `showing ${maxResults} of ${total} results`;
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
  await expect(dialog.locator(".search-results a")).toHaveCount(Math.min(total, maxResults));
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
  await page.locator("[data-search-open]").click();
  const results = page.locator("[data-search-dialog] .search-results");

  await page.locator("[data-search-section]").selectOption("commands");
  await expect(results.locator("a").first()).toBeVisible();

  await page.locator("[data-search-input]").fill("awk");
  await expect(results.locator("a").first()).toBeVisible();
  await page.locator("[data-search-input]").fill("");
  // The section filter alone still lists pages.
  await expect(results.locator("a").first()).toBeVisible();

  await page.locator("[data-search-section]").selectOption("");
  await expect(results).toBeEmpty();
  await expect(results).toHaveAttribute("aria-busy", "false");
  expect(new URL(page.url()).search).toBe("");
});

test("a non-popular tag can be selected and returns its pages", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const tag = await findNonPopularTag(page);

  await page.locator("[data-search-open]").click();
  await page.locator("[data-search-tag]").selectOption(tag.value);

  const dialog = page.locator("[data-search-dialog]");
  await expect(dialog.locator(".search-status")).toHaveText(expectedStatus(tag.count));
  await expect(dialog.locator(".search-results a")).toHaveCount(Math.min(tag.count, maxResults));
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
  await expect(dialog.locator(".search-results a")).toHaveCount(Math.min(tag.count, maxResults));

  const dialogResults = await new AxeBuilder({ page }).include("[data-search-dialog]").analyze();
  expect(dialogResults.violations).toEqual([]);

  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
});

test("opening a section URL shows the section's pages in search", async ({ page }) => {
  await page.goto("/?section=cve", { waitUntil: "networkidle" });
  const dialog = page.locator("[data-search-dialog]");
  await expect(dialog).toBeVisible();
  await expect(page.locator("[data-search-section]")).toHaveValue("cve");
  await expect(dialog.locator(".search-results a").first()).toBeVisible();
  await expect(dialog.locator(".search-results a small").first()).toHaveText("cve");
});
