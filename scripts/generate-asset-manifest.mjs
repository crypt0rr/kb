import { createHash } from "node:crypto";
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { isPrivateContentPath } from "../src/lib/content-paths.mjs";

const root = process.cwd();
const contentDir = path.join(root, "content");
const distDir = path.join(root, "dist");
const entries = [];

await walk(contentDir);

entries.sort((a, b) => a.path.localeCompare(b.path));
await writeFile(
  path.join(distDir, "asset-manifest.json"),
  `${JSON.stringify({ assets: entries }, null, 2)}\n`
);

async function walk(dir) {
  const items = await readdir(dir, { withFileTypes: true });

  for (const item of items) {
    const absolute = path.join(dir, item.name);
    const relative = slash(path.relative(contentDir, absolute));

    // Dot-segment paths are private and must not appear in the public manifest.
    if (isPrivateContentPath(relative)) {
      continue;
    }

    if (item.isDirectory()) {
      await walk(absolute);
      continue;
    }

    if (item.name.endsWith(".md")) continue;

    const bytes = await readFile(absolute);
    entries.push({
      path: relative,
      bytes: bytes.length,
      sha256: createHash("sha256").update(bytes).digest("hex")
    });
  }
}

function slash(value) {
  return value.replace(/\\/g, "/");
}
