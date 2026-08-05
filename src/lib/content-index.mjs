import fs from "node:fs";
import path from "node:path";
import { parseFrontmatter } from "./frontmatter.mjs";
import { resolveInheritedMetadata } from "./metadata.mjs";

const collator = new Intl.Collator("en", { sensitivity: "base", numeric: true });

export function buildContentIndex(options = {}) {
  const contentRoot = path.resolve(options.contentRoot ?? path.join(process.cwd(), "content"));
  const strict = options.strict ?? true;
  const allPages = listMarkdown(contentRoot)
    .sort((a, b) => collator.compare(a, b))
    .map((file) => parseRecord(file, contentRoot));
  const duplicateUrls = findDuplicateUrls(allPages);
  if (strict && duplicateUrls.length) {
    throw new Error(
      duplicateUrls.map(({ url, files }) => `duplicate URL ${url}: ${files.join(", ")}`).join("\n")
    );
  }
  const allByUrl = new Map(allPages.map((page) => [page.url, page]));

  for (const page of allPages) {
    page.parentUrl = findParentUrl(page.url, allByUrl);
  }

  for (const page of allPages) {
    const resolved = resolveInheritedMetadata(page, allByUrl, { strict });
    page.effectiveFrontmatter = resolved.frontmatter;
    page.metadataProvenance = resolved.provenance;
    page.metadataErrors = resolved.errors;
    page.title = normalizeTitle(page.effectiveFrontmatter.title) || titleFromSlug(page.slug || "Knowledge Base");
    page.description = String(page.effectiveFrontmatter.description ?? "");
  }

  const pages = allPages.filter((page) => page.effectiveFrontmatter.draft !== true);
  const byUrl = new Map(pages.map((page) => [page.url, page]));

  for (const page of pages) {
    page.children = [];
    page.parentUrl = findParentUrl(page.url, byUrl);
    if (page.parentUrl) byUrl.get(page.parentUrl)?.children.push(page);
  }

  for (const page of pages) page.children.sort(compareContentPages);
  pages.sort(compareContentPages);

  return {
    contentRoot,
    allPages,
    pages: options.includeDrafts ? allPages : pages,
    byUrl
  };
}

function parseRecord(file, contentRoot) {
  const relativeFile = slash(path.relative(contentRoot, file));
  const parsed = parseFrontmatter(fs.readFileSync(file, "utf8"), relativeFile);
  const slug = slugFromFile(relativeFile);

  return {
    file,
    relativeFile,
    sourceDir: slash(path.dirname(relativeFile)),
    slug,
    url: slug ? `/${slug}/` : "/",
    section: slug.split("/")[0] ?? "",
    body: parsed.content.trim(),
    frontmatter: parsed.data,
    effectiveFrontmatter: parsed.data,
    metadataProvenance: {},
    metadataErrors: [],
    title: "",
    description: "",
    parentUrl: null,
    children: []
  };
}

export function compareContentPages(a, b) {
  const weightA = normalizeWeight(a.effectiveFrontmatter?.weight);
  const weightB = normalizeWeight(b.effectiveFrontmatter?.weight);
  return weightA - weightB || collator.compare(a.title, b.title) || collator.compare(a.url, b.url);
}

export function normalizeWeight(value) {
  if (value === null || value === undefined || value === "") {
    return Number.MAX_SAFE_INTEGER;
  }
  const weight = Number(value);
  return Number.isFinite(weight) ? weight : Number.MAX_SAFE_INTEGER;
}

function findDuplicateUrls(pages) {
  const filesByUrl = new Map();
  for (const page of pages) {
    const files = filesByUrl.get(page.url) ?? [];
    files.push(page.relativeFile);
    filesByUrl.set(page.url, files);
  }
  return [...filesByUrl.entries()]
    .filter(([, files]) => files.length > 1)
    .map(([url, files]) => ({ url, files }));
}

function listMarkdown(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) return listMarkdown(absolute);
    return entry.name.endsWith(".md") ? [absolute] : [];
  });
}

function findParentUrl(url, byUrl) {
  if (url === "/") return null;
  const parts = url.replace(/^\/|\/$/g, "").split("/");
  while (parts.length > 0) {
    parts.pop();
    const candidate = parts.length ? `/${parts.join("/")}/` : "/";
    if (byUrl.has(candidate)) return candidate;
  }
  return "/";
}

function slugFromFile(relativeFile) {
  if (relativeFile === "_index.md") return "";
  return relativeFile
    .replace(/\/index\.md$/i, "")
    .replace(/\/_index\.md$/i, "")
    .replace(/\.md$/i, "")
    .replace(/^_index$/i, "");
}

function titleFromSlug(slug) {
  return (
    slug
      .split("/")
      .filter(Boolean)
      .pop()
      ?.replace(/[-_]+/g, " ")
      .replace(/\b\w/g, (character) => character.toUpperCase()) ?? "Knowledge Base"
  );
}

function normalizeTitle(value) {
  return String(value ?? "").trim();
}

function slash(value) {
  return value.replace(/\\/g, "/");
}
