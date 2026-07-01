import { readdir, stat } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const maxBytes = Number(process.env.CHECK_ASSETS_MAX_BYTES ?? 25 * 1024 * 1024);
const scanDirs = ["content", "static", "dist"];
const ignoredDirectories = new Set([".git", "node_modules", ".rumdl_cache", "pagefind"]);
const errors = [];
let checkedFiles = 0;

for (const dir of scanDirs) {
  await walkIfExists(path.join(root, dir));
}

if (errors.length) {
  for (const error of errors) {
    console.error(`error: ${error}`);
  }
  process.exitCode = 1;
} else {
  console.log(
    `${checkedFiles} deployable asset file(s) checked; limit ${formatBytes(maxBytes)}`
  );
}

async function walkIfExists(dir) {
  try {
    const entry = await stat(dir);
    if (!entry.isDirectory()) return;
  } catch (error) {
    if (error.code === "ENOENT") return;
    throw error;
  }

  await walk(dir);
}

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const absolute = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (!ignoredDirectories.has(entry.name)) {
        await walk(absolute);
      }
      continue;
    }

    if (!entry.isFile()) continue;
    checkedFiles += 1;

    const size = (await stat(absolute)).size;
    if (size > maxBytes) {
      errors.push(`${slash(path.relative(root, absolute))} is ${formatBytes(size)}`);
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
