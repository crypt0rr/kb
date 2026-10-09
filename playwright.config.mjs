import { defineConfig } from "@playwright/test";

// Browser tests run against dist/ served with the production _headers applied,
// so CSP and cross-origin policy regressions surface here instead of in production.
const port = Number(process.env.PLAYWRIGHT_PORT ?? 4321);
const origin = `http://127.0.0.1:${port}`;

export default defineConfig({
  testDir: "./tests",
  testMatch: "**/*.spec.mjs",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI
    ? [["github"], ["html", { outputFolder: "playwright-report", open: "never" }]]
    : "list",
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? origin,
    colorScheme: "dark",
    trace: "retain-on-failure",
    screenshot: "only-on-failure"
  },
  webServer: {
    command: `node scripts/serve-dist.mjs --host 127.0.0.1 --port ${port}`,
    url: `${origin}/`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000
  }
});
