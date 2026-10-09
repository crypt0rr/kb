import { readFile } from "node:fs/promises";
import { expect, test } from "@playwright/test";
import { parseFrontmatter } from "../src/lib/frontmatter.mjs";
import { highlightLanguage } from "../src/lib/highlight.mjs";
import { createMarkdown } from "../src/lib/links.mjs";

// A page whose labelled PowerShell fences contain quotes, pipes and <angle>
// placeholders next to plain fences, so both rendering paths are exercised.
const route = "/tools/techniques/kerberoasting/";
const source = new URL("../content/tools/techniques/kerberoasting/index.md", import.meta.url);

async function sourceFences() {
  const markdown = await readFile(source, "utf8");
  return createMarkdown()
    .parse(parseFrontmatter(markdown).content, {})
    .filter((token) => token.type === "fence")
    .map((token) => ({
      text: token.content,
      highlighted: Boolean(highlightLanguage(token.info.trim().split(/\s+/)[0]))
    }));
}

test("highlighted code is styled by the stylesheet and copies its original text", async ({
  context,
  page
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  const fences = await sourceFences();
  expect(fences.some((fence) => fence.highlighted)).toBeTruthy();
  expect(fences.some((fence) => !fence.highlighted)).toBeTruthy();

  const response = await page.goto(route, { waitUntil: "networkidle" });
  expect(response?.ok()).toBeTruthy();

  const blocks = page.locator(".prose pre");
  await expect(blocks).toHaveCount(fences.length);
  await expect(page.locator(".prose pre [style]")).toHaveCount(0);

  // The theme comes from the self-hosted stylesheet, so a token's colour must
  // differ from the surrounding code colour under the production CSP.
  const firstToken = page.locator(".prose pre code span[class^='hljs-']").first();
  const tokenColor = await firstToken.evaluate((element) => getComputedStyle(element).color);
  const codeColor = await firstToken.evaluate(
    (element) => getComputedStyle(element.closest("code")).color
  );
  expect(tokenColor).not.toBe(codeColor);

  for (const [index, fence] of fences.entries()) {
    const block = blocks.nth(index);
    const tokens = await block.locator("code span[class^='hljs-']").count();
    if (fence.highlighted) expect(tokens).toBeGreaterThan(0);
    else expect(tokens).toBe(0);

    await block.locator(".copy-code").click();
    await expect(block.locator(".copy-code")).toHaveText("copied");
    const copied = await page.evaluate(() => navigator.clipboard.readText());
    expect(copied).toBe(fence.text);
  }
});
