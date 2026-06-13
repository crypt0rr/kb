import { createWriteStream } from "node:fs";
import { mkdir, readdir, rm, stat, rename } from "node:fs/promises";
import https from "node:https";
import path from "node:path";

const root = process.cwd();
const sysinternalsDir = path.join(root, "content", "tools", "windows", "sysinternals", "files");
const liveBase = "https://live.sysinternals.com";
const maxBytes = 25 * 1024 * 1024;
const ignoredFiles = new Set([".gitkeep"]);
const skippedLiveFiles = new Set(["healthmonitoring.html"]);
const duplicateDirectories = ["files", "tools"];
const mode = parseMode();
const errors = [];
const changes = [];

const sources = [
  { directory: "", url: `${liveBase}/` },
  { directory: "ARM64", url: `${liveBase}/ARM64/` }
];

const expected = new Map();
const skipped = [];

for (const source of sources) {
  const listing = await fetchText(source.url);
  for (const entry of parseListing(listing)) {
    if (skippedLiveFiles.has(entry.name) || entry.size > maxBytes) {
      skipped.push({ ...entry, directory: source.directory });
      continue;
    }

    const relative = source.directory ? `${source.directory}/${entry.name}` : entry.name;
    expected.set(relative, {
      ...entry,
      relative,
      directory: source.directory,
      target: path.join(sysinternalsDir, relative),
      url: `${liveBase}${entry.href}`
    });
  }
}

const local = await readLocalFiles();
const missing = [...expected.values()].filter((entry) => !local.has(entry.relative));
const changed = [...expected.values()].filter((entry) => {
  const localEntry = local.get(entry.relative);
  return localEntry && localEntry.size !== entry.size;
});
const stale = [...local.values()].filter((entry) => !expected.has(entry.relative));
const oversizedLocal = [...local.values()].filter((entry) => entry.size > maxBytes);
const duplicateDirs = [];

for (const directory of duplicateDirectories) {
  const absolute = path.join(sysinternalsDir, directory);
  if (await exists(absolute)) duplicateDirs.push({ directory, absolute });
}

if (mode === "write") {
  for (const entry of [...missing, ...changed]) {
    await download(entry);
    changes.push(`updated ${entry.relative}`);
  }

  for (const entry of stale) {
    await rm(entry.absolute);
    changes.push(`removed stale ${entry.relative}`);
  }

  for (const entry of duplicateDirs) {
    await rm(entry.absolute, { recursive: true, force: true });
    changes.push(`removed duplicate directory ${entry.directory}/`);
  }
} else {
  if (missing.length) errors.push(`missing Sysinternals file(s):\n- ${missing.map((item) => item.relative).join("\n- ")}`);
  if (changed.length) errors.push(`outdated Sysinternals file(s):\n- ${changed.map((item) => `${item.relative} (${local.get(item.relative).size} != ${item.size})`).join("\n- ")}`);
  if (stale.length) errors.push(`stale Sysinternals file(s):\n- ${stale.map((item) => item.relative).join("\n- ")}`);
  if (oversizedLocal.length) errors.push(`Sysinternals file(s) over ${formatBytes(maxBytes)}:\n- ${oversizedLocal.map((item) => `${item.relative} (${formatBytes(item.size)})`).join("\n- ")}`);
  if (duplicateDirs.length) errors.push(`duplicate Sysinternals directories:\n- ${duplicateDirs.map((item) => `${item.directory}/`).join("\n- ")}`);
}

const current = mode === "write" ? await readLocalFiles() : local;
const publishableCount = [...current.values()].filter((entry) => expected.has(entry.relative)).length;

console.log(`Sysinternals expected publishable file(s): ${expected.size}`);
console.log(`Sysinternals local publishable file(s): ${publishableCount}`);
console.log(`Sysinternals skipped live file(s): ${skipped.length}`);

if (mode === "write") {
  if (changes.length) {
    for (const change of changes) console.log(change);
  } else {
    console.log("Sysinternals files are already current.");
  }
}

if (errors.length) {
  for (const error of errors) console.error(`error: ${error}`);
  process.exitCode = 1;
}

function parseMode() {
  const args = process.argv.slice(2);
  if (args.length !== 1 || !["--check", "--write"].includes(args[0])) {
    console.error("usage: node scripts/sync-sysinternals.mjs --check|--write");
    process.exit(2);
  }

  return args[0] === "--write" ? "write" : "check";
}

function parseListing(html) {
  const entries = [];
  const matcher = /(?:&lt;dir&gt;|(\d+))\s+<A HREF="([^"]+)">([^<]+)<\/A>/gi;
  let match;
  while ((match = matcher.exec(html))) {
    if (!match[1]) continue;
    entries.push({
      href: match[2],
      name: match[3],
      size: Number(match[1])
    });
  }
  return entries;
}

async function readLocalFiles() {
  const files = new Map();
  for (const source of sources) {
    const directory = path.join(sysinternalsDir, source.directory);
    const entries = await readdir(directory, { withFileTypes: true });
    for (const entry of entries) {
      if (!entry.isFile() || ignoredFiles.has(entry.name)) continue;

      const relative = source.directory ? `${source.directory}/${entry.name}` : entry.name;
      const absolute = path.join(directory, entry.name);
      const fileStat = await stat(absolute);
      files.set(relative, {
        relative,
        absolute,
        size: fileStat.size
      });
    }
  }
  return files;
}

async function download(entry) {
  await mkdir(path.dirname(entry.target), { recursive: true });
  const temporary = `${entry.target}.download`;
  await downloadToFile(entry.url, temporary);
  const fileStat = await stat(temporary);
  if (fileStat.size !== entry.size) {
    await rm(temporary, { force: true });
    throw new Error(`${entry.relative}: expected ${entry.size} byte(s), got ${fileStat.size}`);
  }
  await rename(temporary, entry.target);
}

async function fetchText(url) {
  const buffer = await fetchBuffer(url);
  return buffer.toString("utf8");
}

function fetchBuffer(url, redirects = 0) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (response) => {
        if (
          response.statusCode >= 300 &&
          response.statusCode < 400 &&
          response.headers.location &&
          redirects < 5
        ) {
          response.resume();
          resolve(fetchBuffer(new URL(response.headers.location, url).href, redirects + 1));
          return;
        }

        if (response.statusCode !== 200) {
          response.resume();
          reject(new Error(`${url}: HTTP ${response.statusCode}`));
          return;
        }

        const chunks = [];
        response.on("data", (chunk) => chunks.push(chunk));
        response.on("end", () => resolve(Buffer.concat(chunks)));
      })
      .on("error", reject);
  });
}

function downloadToFile(url, target, redirects = 0) {
  return new Promise((resolve, reject) => {
    const request = https.get(url, (response) => {
      if (
        response.statusCode >= 300 &&
        response.statusCode < 400 &&
        response.headers.location &&
        redirects < 5
      ) {
        response.resume();
        resolve(downloadToFile(new URL(response.headers.location, url).href, target, redirects + 1));
        return;
      }

      if (response.statusCode !== 200) {
        response.resume();
        reject(new Error(`${url}: HTTP ${response.statusCode}`));
        return;
      }

      const file = createWriteStream(target);
      response.pipe(file);
      file.on("finish", () => file.close(resolve));
      file.on("error", reject);
    });
    request.on("error", reject);
  });
}

async function exists(absolute) {
  try {
    await stat(absolute);
    return true;
  } catch {
    return false;
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
