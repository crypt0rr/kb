import { readFile, stat } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const distDir = path.join(root, "dist");
const requiredFiles = [
  "index.html",
  "tags/index.html",
  "search.json",
  "sitemap-index.xml",
  "pagefind/pagefind-entry.json",
  "asset-manifest.json",
  "tools/techniques/kerberoasting/index.html"
];
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
await expectJson("search.json");
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

  const privateAsset = manifest.assets.find((asset) => asset.path.startsWith("."));
  if (privateAsset) {
    errors.push(`asset-manifest.json: private asset included (${privateAsset.path})`);
  }
}
