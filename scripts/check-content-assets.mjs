import { readdir, stat } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const contentDir = path.join(root, "content");
const maxBytes = 25 * 1024 * 1024;
const reportedExtensions = new Set([
  ".bat",
  ".bin",
  ".bz2",
  ".cmd",
  ".dll",
  ".dmg",
  ".exe",
  ".jar",
  ".msi",
  ".ps1",
  ".py",
  ".sh",
  ".tar",
  ".tgz",
  ".zip"
]);

const oversized = [];
const flagged = new Map();

await walk(contentDir);

for (const [extension, files] of [...flagged.entries()].sort(([a], [b]) => a.localeCompare(b))) {
  console.log(`${extension}: ${files.length} content asset(s)`);
}

if (oversized.length) {
  console.error(`\nContent assets over ${formatBytes(maxBytes)}:`);
  for (const file of oversized) {
    console.error(`- ${file.relative} (${formatBytes(file.size)})`);
  }
  process.exitCode = 1;
}

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const absolute = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(absolute);
      continue;
    }

    const relative = slash(path.relative(root, absolute));
    const extension = path.extname(entry.name).toLowerCase();
    const file = await stat(absolute);

    if (file.size > maxBytes) {
      oversized.push({ relative, size: file.size });
    }

    if (reportedExtensions.has(extension)) {
      const files = flagged.get(extension) ?? [];
      files.push(relative);
      flagged.set(extension, files);
    }
  }
}

function formatBytes(bytes) {
  const units = ["B", "KB", "MB", "GB"];
  let value = bytes;
  let unit = 0;

  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit += 1;
  }

  return `${value.toFixed(value >= 10 || unit === 0 ? 0 : 1)} ${units[unit]}`;
}

function slash(value) {
  return value.replace(/\\/g, "/");
}
