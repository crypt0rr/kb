import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { buildContentIndex } from "../src/lib/content-index.mjs";
import { isValidDateValue } from "../src/lib/date.mjs";
import { parseCascade } from "../src/lib/metadata.mjs";

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
const pageStatuses = new Set(["active", "deprecated", "archived"]);
const percentShortcodes = new Set(["children", "notice", "resources", "attachments"]);
const angleShortcodes = new Set(["ref", "youtube", "gist"]);

const contentFiles = [];
const pages = [];
const errors = [];
const allowedWarnings = [];
const reportedMetadataErrors = new Set();
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

    if (!entry.name.endsWith(".md")) contentFiles.push(absolute);
  }
}

function parsePages() {
  const index = buildContentIndex({
    contentRoot: contentDir,
    includeDrafts: true,
    strict: false
  });

  for (const record of index.allPages) {
    pages.push({
      file: record.file,
      relativeFile: record.relativeFile,
      sourceDir: record.sourceDir,
      slug: record.slug,
      url: record.url,
      title: record.title,
      frontmatter: record.frontmatter,
      effectiveFrontmatter: record.effectiveFrontmatter,
      metadataProvenance: record.metadataProvenance,
      metadataErrors: record.metadataErrors,
      body: record.body
    });
  }
}

function validatePages() {
  const urls = new Map();

  for (const page of pages) {
    const matches = urls.get(page.url) ?? [];
    matches.push(page.relativeFile);
    urls.set(page.url, matches);

    for (const metadataError of page.metadataErrors) {
      if (!reportedMetadataErrors.has(metadataError)) {
        reportedMetadataErrors.add(metadataError);
        errors.push(metadataError);
      }
    }

    if (page.url !== "/" && !String(page.frontmatter.title ?? "").trim()) {
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

    for (const field of ["date", "lastReviewed"]) {
      if (
        page.frontmatter[field] !== undefined &&
        !isValidDateValue(page.frontmatter[field])
      ) {
        errors.push(`${page.relativeFile}: ${field} must start with a valid YYYY-MM-DD date`);
      }
    }

    if (
      page.frontmatter.status !== undefined &&
      !pageStatuses.has(String(page.frontmatter.status).trim().toLowerCase())
    ) {
      errors.push(`${page.relativeFile}: status must be active, deprecated, or archived`);
    }

    if (page.frontmatter.platforms !== undefined) {
      const platforms = page.frontmatter.platforms;
      const valid =
        typeof platforms === "string" ||
        (Array.isArray(platforms) && platforms.every((platform) => typeof platform === "string"));
      if (!valid) errors.push(`${page.relativeFile}: platforms must be a string or string array`);
    }

    if (
      page.frontmatter.cascade !== undefined &&
      !page.metadataErrors.some((error) => error.startsWith(`${page.relativeFile}:`))
    ) {
      try {
        const cascade = parseCascade(page.frontmatter.cascade, page.relativeFile);
        validateCascadeFields(cascade, page.relativeFile);
      } catch (error) {
        errors.push(error.message);
      }
    }

    validateEffectiveMetadata(page);
  }

  for (const [url, files] of urls) {
    if (files.length > 1) {
      errors.push(`duplicate URL ${url}: ${files.join(", ")}`);
    }
  }
}

function validateEffectiveMetadata(page) {
  const metadata = page.effectiveFrontmatter;

  if (metadata.tags !== undefined) {
    const tags = metadata.tags;
    const valid =
      typeof tags === "string" ||
      (Array.isArray(tags) && tags.every((tag) => typeof tag === "string"));
    if (!valid) errors.push(`${page.relativeFile}: effective tags must be a string or string array`);
  }

  if (metadata.weight !== undefined && !Number.isFinite(Number(metadata.weight))) {
    errors.push(`${page.relativeFile}: effective weight must be numeric`);
  }

  for (const field of ["date", "lastReviewed"]) {
    if (metadata[field] !== undefined && !isValidDateValue(metadata[field])) {
      errors.push(`${page.relativeFile}: effective ${field} must start with a valid YYYY-MM-DD date`);
    }
  }

  if (
    metadata.status !== undefined &&
    !pageStatuses.has(String(metadata.status).trim().toLowerCase())
  ) {
    errors.push(`${page.relativeFile}: effective status must be active, deprecated, or archived`);
  }

  if (metadata.platforms !== undefined) {
    const platforms = metadata.platforms;
    const valid =
      typeof platforms === "string" ||
      (Array.isArray(platforms) && platforms.every((platform) => typeof platform === "string"));
    if (!valid) {
      errors.push(`${page.relativeFile}: effective platforms must be a string or string array`);
    }
  }
}

function validateCascadeFields(cascade, file) {
  if (cascade.tags !== undefined) {
    const valid =
      typeof cascade.tags === "string" ||
      (Array.isArray(cascade.tags) && cascade.tags.every((tag) => typeof tag === "string"));
    if (!valid) errors.push(`${file}: cascade.tags must be a string or string array`);
  }

  if (cascade.platforms !== undefined) {
    const valid =
      typeof cascade.platforms === "string" ||
      (Array.isArray(cascade.platforms) &&
        cascade.platforms.every((platform) => typeof platform === "string"));
    if (!valid) errors.push(`${file}: cascade.platforms must be a string or string array`);
  }

  for (const field of ["date", "lastReviewed"]) {
    if (cascade[field] !== undefined && !isValidDateValue(cascade[field])) {
      errors.push(`${file}: cascade.${field} must start with a valid YYYY-MM-DD date`);
    }
  }

  if (
    cascade.status !== undefined &&
    !pageStatuses.has(String(cascade.status).trim().toLowerCase())
  ) {
    errors.push(`${file}: cascade.status must be active, deprecated, or archived`);
  }
}

function validateRefsAndShortcodes() {
  const byUrl = new Map(pages.map((page) => [page.url, page]));
  const byKey = buildRefMap(pages);

  for (const page of pages) {
    const shortcodes = page.body.matchAll(/\{\{([<%])\s*([a-zA-Z0-9_-]+)([\s\S]*?)([>%])\}\}/g);
    const resourceRegexes = new Map();

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
        const directory = normalizeResourceDirectory(attrs.directory);
        const resources = resourceRegexes.get(directory) ?? [];
        resources.push({
          pattern: attrs.pattern ? safeRegex(attrs.pattern, page.relativeFile) : null
        });
        resourceRegexes.set(directory, resources);
      }
    }

    if ((page.body.match(/\{\{%\s*notice\b/g) ?? []).length !== (page.body.match(/\{\{%\s*\/notice\s*%\}\}/g) ?? []).length) {
      errors.push(`${page.relativeFile}: unbalanced notice shortcode`);
    }

    if (/\{\{[<%][\s\S]*?[>%]\}\}\}/.test(page.body)) {
      errors.push(`${page.relativeFile}: shortcode has an extra closing brace`);
    }

    if (resourceRegexes.size) {
      for (const [directory, patterns] of resourceRegexes) {
        resourcePatterns.set(
          resourceKey(page.sourceDir, directory),
          patterns.filter((item) => item.pattern !== false)
        );
      }
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
    const resourceLocation = resourceLocationForAsset(asset.file);
    if (!resourceLocation) continue;

    const patterns = resourcePatterns.get(
      resourceKey(resourceLocation.pageDir, resourceLocation.directory)
    );
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

function resourceLocationForAsset(file) {
  const parts = path.relative(contentDir, file).split(path.sep);
  const filesIndex = parts.lastIndexOf("files");
  if (filesIndex <= 0 || filesIndex === parts.length - 1) return null;

  return {
    pageDir: slash(parts.slice(0, filesIndex).join(path.sep)),
    directory: slash(parts.slice(filesIndex + 1, -1).join(path.sep))
  };
}

function resourceKey(pageDir, directory) {
  return `${pageDir}\0${directory}`;
}

function normalizeResourceDirectory(value) {
  if (!value) return "";
  return slash(value)
    .split("/")
    .filter((part) => part && part !== "." && part !== "..")
    .join("/");
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
