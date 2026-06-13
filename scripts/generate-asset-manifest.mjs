import { createHash } from "node:crypto";
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const contentDir = path.join(root, "content");
const distDir = path.join(root, "dist");
const ignoredFiles = new Set([".DS_Store", ".gitkeep"]);
const ignoredDirectories = new Set([".rumdl_cache"]);
const entries = [];

await walk(contentDir);

entries.sort((a, b) => a.path.localeCompare(b.path));
await writeFile(
  path.join(distDir, "asset-manifest.json"),
  `${JSON.stringify({ generatedAt: new Date().toISOString(), assets: entries }, null, 2)}\n`
);

async function walk(dir) {
  const items = await readdir(dir, { withFileTypes: true });

  for (const item of items) {
    const absolute = path.join(dir, item.name);
    if (ignoredDirectories.has(item.name)) {
      continue;
    }

    if (item.isDirectory()) {
      await walk(absolute);
      continue;
    }

    if (item.name.endsWith(".md") || ignoredFiles.has(item.name)) continue;

    const bytes = await readFile(absolute);
    entries.push({
      path: slash(path.relative(contentDir, absolute)),
      bytes: bytes.length,
      sha256: createHash("sha256").update(bytes).digest("hex")
    });
  }
}

function slash(value) {
  return value.replace(/\\/g, "/");
}
