import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const root = process.cwd();
const contentDir = path.join(root, "content");
const policyFile = path.join(root, "scripts", "content-policy.json");
const maxBytes = 25 * 1024 * 1024;
const maxWarnings = Number(process.env.CHECK_CONTENT_MAX_WARNINGS ?? 30);
const ignoredFiles = new Set([".DS_Store", ".gitkeep"]);
const ignoredDirectories = new Set([".rumdl_cache"]);
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
const percentShortcodes = new Set(["children", "notice", "resources", "attachments"]);
const angleShortcodes = new Set(["ref", "youtube", "gist"]);

const markdownFiles = [];
const contentFiles = [];
const pages = [];
const errors = [];
const allowedWarnings = [];
const flagged = new Map();
const resourcePatterns = new Map();
const policy = await readPolicy();
const allowedAssetWarningMatchers = (policy.allowedAssetWarnings ?? []).map(globToRegExp);

await walk(contentDir);
await parsePages();
validatePages();
validateRefsAndShortcodes();
validateAssets();
await printAssetSummary();

if (allowedWarnings.length) {
  console.warn(`${allowedWarnings.length} allowed asset warning(s)`);
  if (maxWarnings === 0) {
    for (const warning of allowedWarnings) {
      console.warn(`allowed warning: ${warning}`);
    }
  }
}

if (errors.length) {
  for (const error of errors) {
    console.error(`error: ${error}`);
  }
  process.exitCode = 1;
}

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const absolute = path.join(dir, entry.name);
    if (ignoredDirectories.has(entry.name)) {
      continue;
    }

    if (entry.isDirectory()) {
      await walk(absolute);
      continue;
    }

    if (ignoredFiles.has(entry.name)) {
      continue;
    }

    if (entry.name.endsWith(".md")) {
      markdownFiles.push(absolute);
    } else {
      contentFiles.push(absolute);
    }
  }
}

async function parsePages() {
  for (const file of markdownFiles) {
    const raw = await readFile(file, "utf8");
    const parsed = matter(raw);
    const relativeFile = slash(path.relative(contentDir, file));
    const slug = slugFromFile(relativeFile);

    pages.push({
      file,
      relativeFile,
      sourceDir: slash(path.dirname(relativeFile)),
      slug,
      url: slug ? `/${slug}/` : "/",
      title: String(parsed.data.title ?? "").trim(),
      frontmatter: parsed.data,
      body: parsed.content
    });
  }
}

function validatePages() {
  const urls = new Map();

  for (const page of pages) {
    const matches = urls.get(page.url) ?? [];
    matches.push(page.relativeFile);
    urls.set(page.url, matches);

    if (page.url !== "/" && !page.title) {
      errors.push(`${page.relativeFile}: missing frontmatter title`);
    }

    if (page.frontmatter.tags !== undefined) {
      const tags = page.frontmatter.tags;
      const valid =
        typeof tags === "string" ||
        (Array.isArray(tags) && tags.every((tag) => typeof tag === "string"));
      if (!valid) errors.push(`${page.relativeFile}: tags must be a string or string array`);
    }

    if (page.frontmatter.weight !== undefined && !Number.isFinite(Number(page.frontmatter.weight))) {
      errors.push(`${page.relativeFile}: weight must be numeric`);
    }
  }

  for (const [url, files] of urls) {
    if (files.length > 1) {
      errors.push(`duplicate URL ${url}: ${files.join(", ")}`);
    }
  }
}

function validateRefsAndShortcodes() {
  const byUrl = new Map(pages.map((page) => [page.url, page]));
  const byKey = buildRefMap(pages);

  for (const page of pages) {
    const shortcodes = page.body.matchAll(/\{\{([<%])\s*([a-zA-Z0-9_-]+)([\s\S]*?)([>%])\}\}/g);
    const resourceRegexes = [];

    for (const match of shortcodes) {
      const opener = match[1];
      const name = match[2];
      const rawAttrs = match[3] ?? "";
      const closer = match[4];

      if (opener === "%" && closer !== "%") {
        errors.push(`${page.relativeFile}: shortcode ${name} closes with the wrong delimiter`);
      }
      if (opener === "<" && closer !== ">") {
        errors.push(`${page.relativeFile}: shortcode ${name} closes with the wrong delimiter`);
      }

      if (opener === "%" && !percentShortcodes.has(name)) {
        errors.push(`${page.relativeFile}: unsupported shortcode ${name}`);
      }
      if (opener === "<" && !angleShortcodes.has(name)) {
        errors.push(`${page.relativeFile}: unsupported shortcode ${name}`);
      }

      if (name === "ref") {
        const target = rawAttrs.trim().replace(/^"|"$/g, "");
        if (!resolveRef(target, page, byUrl, byKey)) {
          errors.push(`${page.relativeFile}: unresolved ref ${target}`);
        }
      }

      if (name === "resources" || name === "attachments") {
        const attrs = parseAttrs(rawAttrs);
        resourceRegexes.push({
          pattern: attrs.pattern ? safeRegex(attrs.pattern, page.relativeFile) : null
        });
      }
    }

    if ((page.body.match(/\{\{%\s*notice\b/g) ?? []).length !== (page.body.match(/\{\{%\s*\/notice\s*%\}\}/g) ?? []).length) {
      errors.push(`${page.relativeFile}: unbalanced notice shortcode`);
    }

    if (/\{\{[<%][\s\S]*?[>%]\}\}\}/.test(page.body)) {
      errors.push(`${page.relativeFile}: shortcode has an extra closing brace`);
    }

    if (resourceRegexes.length) {
      resourcePatterns.set(page.sourceDir, resourceRegexes.filter((item) => item.pattern !== false));
    }
  }
}

function validateAssets() {
  for (const file of contentFiles) {
    const relative = slash(path.relative(root, file));
    const entryName = path.basename(file);
    const extension = path.extname(entryName).toLowerCase();

    if (reportedExtensions.has(extension)) {
      const files = flagged.get(extension) ?? [];
      files.push(relative);
      flagged.set(extension, files);
    }
  }
}

async function printAssetSummary() {
  const oversized = [];
  const filesDirAssets = [];

  for (const file of contentFiles) {
    const relative = slash(path.relative(root, file));
    const entryName = path.basename(file);
    const size = (await stat(file)).size;

    if (size > maxBytes) {
      oversized.push(`${relative} (${formatBytes(size)})`);
    }

    if (relative.includes("/files/")) {
      filesDirAssets.push({ file, relative, entryName });
    }
  }

  for (const [extension, files] of [...flagged.entries()].sort(([a], [b]) => a.localeCompare(b))) {
    console.log(`${extension}: ${files.length} content asset(s)`);
  }

  for (const asset of filesDirAssets) {
    const pageDir = slash(path.relative(contentDir, path.dirname(path.dirname(asset.file))));
    const patterns = resourcePatterns.get(pageDir);
    if (!patterns?.length) {
      reportAssetFinding(asset.relative, "file is not referenced by a resources shortcode");
      continue;
    }

    const matched = patterns.some(({ pattern }) => !pattern || pattern.test(asset.entryName));
    if (!matched) {
      reportAssetFinding(asset.relative, "file does not match any resources shortcode pattern");
    }
  }

  if (oversized.length) {
    errors.push(`content assets over ${formatBytes(maxBytes)}:\n- ${oversized.join("\n- ")}`);
  }
}

function reportAssetFinding(relative, reason) {
  const message = `${relative}: ${reason}`;
  if (allowedAssetWarningMatchers.some((regex) => regex.test(relative))) {
    allowedWarnings.push(message);
    return;
  }

  errors.push(
    `${message}; reference it with a resources/attachments shortcode or add an allowedAssetWarnings entry`
  );
}

async function readPolicy() {
  let raw;
  try {
    raw = await readFile(policyFile, "utf8");
  } catch (error) {
    errors.push(`unable to read ${slash(path.relative(root, policyFile))}: ${error.message}`);
    return {};
  }

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed.allowedAssetWarnings)) {
      errors.push("scripts/content-policy.json: allowedAssetWarnings must be an array");
      return {};
    }
    if (
      !parsed.allowedAssetWarnings.every((item) => typeof item === "string" && item.trim())
    ) {
      errors.push(
        "scripts/content-policy.json: allowedAssetWarnings entries must be non-empty strings"
      );
      return {};
    }
    return parsed;
  } catch (error) {
    errors.push(`scripts/content-policy.json: invalid JSON (${error.message})`);
    return {};
  }
}

function globToRegExp(pattern) {
  let source = "^";
  for (let index = 0; index < pattern.length; index += 1) {
    const char = pattern[index];
    const next = pattern[index + 1];

    if (char === "*" && next === "*") {
      source += ".*";
      index += 1;
      continue;
    }

    if (char === "*") {
      source += "[^/]*";
      continue;
    }

    source += escapeRegExp(char);
  }
  return new RegExp(`${source}$`);
}

function escapeRegExp(value) {
  return value.replace(/[\\^$+?.()|[\]{}]/g, "\\$&");
}

function resolveRef(target, page, byUrl, byKey) {
  const [rawPath] = target.split("#");
  const clean = rawPath
    .replace(/\\/g, "/")
    .replace(/(^"|"$)/g, "")
    .replace(/\.md$/i, "")
    .replace(/\/index$/i, "")
    .replace(/\/_index$/i, "")
    .replace(/^\/+|\/+$/g, "");

  if (!clean) return true;

  const candidates = [
    `/${clean}/`,
    `/${slash(path.posix.normalize(path.posix.join(page.sourceDir, clean)))}/`,
    `/${slash(path.posix.normalize(clean))}/`
  ].map(withSlashes);

  if (candidates.some((candidate) => byUrl.has(candidate))) return true;

  const basename = clean.split("/").filter(Boolean).pop()?.toLowerCase();
  if (!basename) return false;
  return (byKey.get(basename) ?? []).length > 0;
}

function buildRefMap(items) {
  const map = new Map();
  for (const page of items) {
    const keys = new Set([
      page.slug.split("/").filter(Boolean).pop()?.toLowerCase(),
      page.relativeFile.replace(/\/_?index\.md$/i, "").split("/").pop()?.toLowerCase(),
      slugify(page.title)
    ]);

    for (const key of keys) {
      if (!key) continue;
      const matches = map.get(key) ?? [];
      matches.push(page);
      map.set(key, matches);
    }
  }
  return map;
}

function parseAttrs(rawAttrs) {
  const attrs = {};
  const matcher = /([a-zA-Z0-9_-]+)\s*=\s*"([^"]*)"/g;
  let match;
  while ((match = matcher.exec(rawAttrs))) {
    attrs[match[1]] = match[2];
  }
  return attrs;
}

function safeRegex(pattern, source) {
  try {
    return new RegExp(pattern);
  } catch (error) {
    errors.push(`${source}: invalid resources pattern ${pattern}: ${error.message}`);
    return false;
  }
}

function slugFromFile(relativeFile) {
  if (relativeFile === "_index.md") return "";
  return relativeFile
    .replace(/\/index\.md$/i, "")
    .replace(/\/_index\.md$/i, "")
    .replace(/\.md$/i, "")
    .replace(/^_index$/i, "");
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/['"`]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function withSlashes(value) {
  if (value === "/") return "/";
  return `/${value.replace(/^\/+|\/+$/g, "")}/`;
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
