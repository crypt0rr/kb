import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const representativeRoutes = [
  { path: "/", name: "home" },
  { path: "/commands/", name: "section overview" },
  { path: "/commands/unix/awk/", name: "content page" },
  { path: "/tools/techniques/kerberoasting/", name: "tool technique page" },
  { path: "/tags/", name: "tag index" }
];

for (const route of representativeRoutes) {
  test(`${route.name} has no automated accessibility violations`, async ({ page }) => {
    const response = await page.goto(route.path, { waitUntil: "networkidle" });

    expect(response?.ok(), `${route.path} should return a successful response`).toBeTruthy();
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.locator("main#main-content")).toBeVisible();
    await expect(page.locator("main h1")).toHaveCount(1);

    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
    expect(results.violations).toEqual([]);
  });
}

test("keyboard users can skip to content and operate search", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  await page.keyboard.press("Tab");
  await expect(page.locator(".skip-link")).toBeFocused();
  await expect(page.locator(".skip-link")).toBeVisible();

  await page.locator("[data-search-open]").focus();
  await page.keyboard.press("/");
  const dialog = page.locator("[data-search-dialog]");
  await expect(dialog).toBeVisible();
  const searchInput = page.locator("[data-search-input]");
  await expect(searchInput).toBeFocused();
  await expect(searchInput).toHaveCSS("outline-style", "solid");

  const dialogResults = await new AxeBuilder({ page }).include("[data-search-dialog]").analyze();
  expect(dialogResults.violations).toEqual([]);

  await searchInput.fill("awk");
  await expect(dialog.locator(".search-results a").first()).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(page.locator("[data-search-open]")).toBeFocused();

  await page.locator("[data-search-open]").click();
  await page.locator('[data-search-dialog] button[aria-label="Close search"]').click();
  await expect(dialog).not.toBeVisible();
  await expect(page.locator("[data-search-open]")).toBeFocused();
});

test("mobile navigation exposes its expanded state", async ({ page }) => {
  await page.setViewportSize({ width: 640, height: 800 });
  await page.goto("/", { waitUntil: "networkidle" });

  const toggle = page.locator("[data-sidebar-toggle]");
  const sidebar = page.locator("#site-sidebar");
  await expect(toggle).toBeVisible();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(sidebar).toHaveAttribute("aria-hidden", "true");
  await expect(sidebar).toHaveAttribute("inert", "");

  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await expect(sidebar).toHaveAttribute("aria-hidden", "false");
  await expect(sidebar).not.toHaveAttribute("inert");

  await page.mouse.click(620, 700);
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(sidebar).toHaveAttribute("aria-hidden", "true");
  await expect(sidebar).toHaveAttribute("inert", "");
});
