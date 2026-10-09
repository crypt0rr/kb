import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { isPrivateContentPath } from "../src/lib/content-paths.mjs";

const root = process.cwd();
const distDir = path.join(root, "dist");
const contentDir = path.join(root, "content");
const requiredFiles = [
  "index.html",
  "tags/index.html",
  "search.json",
  "sitemap-index.xml",
  "pagefind/pagefind-entry.json",
  "asset-manifest.json",
  "js/kb-app.js",
  "js/kb-search.js",
  "tools/techniques/kerberoasting/index.html"
];
// The content trust ledger is a maintainer-only report; its derived state must
// never be rendered into public pages or the public search index.
const maintainerOnlyMarkup = ["health-meta", "<dt>Trust</dt>", 'data-pagefind-filter="health"'];
// The production CSP (style-src 'self') blocks inline style attributes, so a
// generated page must not depend on one. Escaped code text never matches.
const inlineStyleAttribute = /<[a-z][a-z0-9-]*\b[^>]*\sstyle\s*=/i;
const errors = [];

for (const file of requiredFiles) {
  const absolute = path.join(distDir, file);
  try {
    const fileStat = await stat(absolute);
    if (!fileStat.isFile() || fileStat.size === 0) {
      errors.push(`${file}: missing or empty`);
    }
  } catch {
    errors.push(`${file}: missing`);
  }
}

await expectIncludes("index.html", [
  'data-pagefind-body',
  'data-search-dialog',
  '/js/kb-app.js'
]);
for (const file of await listGeneratedHtml()) {
  await expectExcludes(file, maintainerOnlyMarkup);
  await expectNoInlineStyles(file);
}
await expectSearchIndex();
await expectJson("pagefind/pagefind-entry.json");
await expectAssetManifest();
await expectIncludes("sitemap-index.xml", ["<sitemapindex"]);

if (errors.length) {
  for (const error of errors) {
    console.error(`error: ${error}`);
  }
  process.exitCode = 1;
}

async function expectIncludes(file, needles) {
  let body = "";
  try {
    body = await readFile(path.join(distDir, file), "utf8");
  } catch {
    return;
  }

  for (const needle of needles) {
    if (!body.includes(needle)) {
      errors.push(`${file}: expected ${needle}`);
    }
  }
}

// HTML files copied verbatim from content/ (for example saved tool reports) are
// published assets, not rendered pages, so only generated pages are scanned.
async function listGeneratedHtml() {
  let entries = [];
  try {
    entries = await readdir(distDir, { recursive: true });
  } catch {
    return [];
  }

  const files = [];
  for (const entry of entries.filter((name) => name.endsWith(".html")).sort()) {
    const copiedFromContent = await stat(path.join(contentDir, entry)).then(
      () => true,
      () => false
    );
    if (!copiedFromContent) files.push(entry.split(path.sep).join("/"));
  }
  return files;
}

async function expectExcludes(file, needles) {
  let body = "";
  try {
    body = await readFile(path.join(distDir, file), "utf8");
  } catch {
    return;
  }

  for (const needle of needles) {
    if (body.includes(needle)) {
      errors.push(`${file}: unexpected maintainer-only markup ${needle}`);
    }
  }
}

async function expectNoInlineStyles(file) {
  let body = "";
  try {
    body = await readFile(path.join(distDir, file), "utf8");
  } catch {
    return;
  }

  const match = body.match(inlineStyleAttribute);
  if (match) {
    errors.push(`${file}: inline style attribute blocked by style-src 'self' (${match[0].slice(0, 80)})`);
  }
}

async function expectSearchIndex() {
  let entries;
  try {
    entries = JSON.parse(await readFile(path.join(distDir, "search.json"), "utf8"));
  } catch (error) {
    errors.push(`search.json: invalid JSON (${error.message})`);
    return;
  }

  if (!Array.isArray(entries) || entries.length === 0) {
    errors.push("search.json: expected a non-empty array of pages");
    return;
  }

  const withHealth = entries.filter((entry) => Object.hasOwn(entry ?? {}, "health"));
  if (withHealth.length) {
    errors.push(
      `search.json: ${withHealth.length} entries expose maintainer-only health (first: ${withHealth[0].url})`
    );
  }
}

async function expectJson(file) {
  try {
    JSON.parse(await readFile(path.join(distDir, file), "utf8"));
  } catch (error) {
    errors.push(`${file}: invalid JSON (${error.message})`);
  }
}

async function expectAssetManifest() {
  let manifest;
  try {
    manifest = JSON.parse(await readFile(path.join(distDir, "asset-manifest.json"), "utf8"));
  } catch (error) {
    errors.push(`asset-manifest.json: invalid JSON (${error.message})`);
    return;
  }

  if (!Array.isArray(manifest.assets)) {
    errors.push("asset-manifest.json: expected assets array");
    return;
  }

  if (Object.hasOwn(manifest, "generatedAt")) {
    errors.push("asset-manifest.json: generatedAt must not make builds non-deterministic");
  }

  for (const asset of manifest.assets.filter((item) => isPrivateContentPath(item.path))) {
    errors.push(`asset-manifest.json: private dot-segment asset included (${asset.path})`);
  }
}
