import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import MarkdownIt from "markdown-it";
import anchor from "markdown-it-anchor";

const root = process.cwd();
const contentRoot = path.join(root, "content");

export type KbPage = {
  file: string;
  relativeFile: string;
  sourceDir: string;
  slug: string;
  url: string;
  title: string;
  description: string;
  body: string;
  frontmatter: Record<string, any>;
  weight: number;
  date?: string;
  tags: string[];
  parentUrl: string | null;
  section: string;
  children: KbPage[];
  breadcrumbs: KbPage[];
};

let cache: KbPage[] | null = null;
let urlMap: Map<string, KbPage> | null = null;
let refMap: Map<string, KbPage[]> | null = null;

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: false
}).use(anchor, {
  slugify,
  permalink: anchor.permalink.headerLink()
});

const defaultLinkOpen =
  md.renderer.rules.link_open ??
  ((tokens, idx, options, _env, self) => self.renderToken(tokens, idx, options));

md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
  const href = tokens[idx].attrGet("href") ?? "";
  if (/^https?:\/\//i.test(href)) {
    tokens[idx].attrSet("target", "_blank");
    tokens[idx].attrSet("rel", "noopener noreferrer");
  }
  return defaultLinkOpen(tokens, idx, options, env, self);
};

export function getPages() {
  if (cache) return cache;

  const files = listMarkdown(contentRoot);
  const pages = files.map(parsePage).filter((page) => page.frontmatter.draft !== true);
  const byUrl = new Map(pages.map((page) => [page.url, page]));

  for (const page of pages) {
    page.parentUrl = findParentUrl(page.url, byUrl);
    if (page.parentUrl) {
      byUrl.get(page.parentUrl)?.children.push(page);
    }
  }

  for (const page of pages) {
    page.children.sort(sortPages);
    page.breadcrumbs = buildBreadcrumbs(page, byUrl);
  }

  pages.sort(sortPages);
  cache = pages;
  urlMap = byUrl;
  refMap = buildRefMap(pages);
  return pages;
}

export function getPageByUrl(url: string) {
  getPages();
  return urlMap?.get(withSlashes(url)) ?? null;
}

export function getRootSections() {
  return getPages().filter((page) => page.parentUrl === "/");
}

export function getDescendantLeafCount(page: KbPage) {
  return visibleChildren(page).reduce((count, child) => count + countLeafPage(child), 0);
}

export function getAllTags() {
  const tags = new Map<string, { tag: string; count: number }>();
  for (const page of getPages()) {
    for (const tag of page.tags) {
      const key = tagSlug(tag);
      const current = tags.get(key) ?? { tag, count: 0 };
      current.count += 1;
      tags.set(key, current);
    }
  }
  return [...tags.values()].sort((a, b) => a.tag.localeCompare(b.tag));
}

export function getPagesByTag(tag: string) {
  const requested = tagSlug(tag);
  return getPages()
    .filter((page) => page.tags.some((item) => tagSlug(item) === requested))
    .sort(sortPages);
}

export function renderPage(page: KbPage) {
  const prepared = preprocessShortcodes(page.body, page);
  return md.render(prepared);
}

export function renderInlineMarkdown(source: string) {
  return md.renderInline(source);
}

export function tagSlug(tag: string) {
  return slugify(tag);
}

export function sortPages(a: KbPage, b: KbPage) {
  if (a.weight !== b.weight) return a.weight - b.weight;
  return a.title.localeCompare(b.title);
}

function parsePage(file: string): KbPage {
  const relativeFile = slash(path.relative(contentRoot, file));
  const raw = fs.readFileSync(file, "utf8");
  const parsed = matter(raw);
  const slug = slugFromFile(relativeFile);
  const url = slug ? `/${slug}/` : "/";
  const title = normalizeTitle(parsed.data.title) || titleFromSlug(slug || "Knowledge Base");
  const tags = normalizeStringList(parsed.data.tags);

  return {
    file,
    relativeFile,
    sourceDir: slash(path.dirname(relativeFile)),
    slug,
    url,
    title,
    description: String(parsed.data.description ?? ""),
    body: parsed.content.trim(),
    frontmatter: parsed.data,
    weight: Number(parsed.data.weight ?? Number.MAX_SAFE_INTEGER),
    date: parsed.data.date ? String(parsed.data.date) : undefined,
    tags,
    parentUrl: null,
    section: slug.split("/")[0] ?? "",
    children: [],
    breadcrumbs: []
  };
}

function preprocessShortcodes(source: string, page: KbPage) {
  let output = source;

  output = output.replace(
    /\{\{%\s*notice\s+([a-zA-Z0-9_-]+)\s*%\}\}([\s\S]*?)\{\{%\s*\/notice\s*%\}\}/g,
    (_match, kind, body) => {
      const rendered = md.render(String(body).trim());
      return `<aside class="notice notice-${escapeAttr(kind)}">${rendered}</aside>`;
    }
  );

  output = output.replace(
    /\{\{%\s*children\s*([^%}]*)%\}\}/g,
    (_match, rawAttrs) => renderChildren(page, parseAttrs(rawAttrs))
  );

  output = output.replace(
    /\{\{%\s*(resources|attachments)\s*([^%}]*)\/?\s*%\}\}/g,
    (_match, _name, rawAttrs) => renderResources(page, parseAttrs(rawAttrs))
  );

  output = output.replace(
    /\{\{<\s*youtube\s+([^>\s]+)\s*>\}\}/g,
    (_match, videoId) =>
      `<div class="video-embed"><iframe src="https://www.youtube-nocookie.com/embed/${escapeAttr(
        videoId
      )}" title="YouTube video" loading="lazy" allowfullscreen></iframe></div>`
  );

  output = output.replace(
    /\{\{[<%]\s*ref\s*"?([^"%>}]+)"?\s*[>%]\}\}/g,
    (_match, target) => resolveRef(String(target).trim(), page)
  );

  output = output.replace(/\{\{[%<][\s\S]*?[>%]\}\}/g, "");

  return output;
}

function renderChildren(page: KbPage, attrs: Record<string, string>) {
  const depth = Number(attrs.depth ?? 1);
  const withDescription = attrs.description === "true";
  const children = visibleChildren(page);

  if (!children.length) return "";

  const renderLevel = (items: KbPage[], level: number): string => {
    const entries = items
      .map((child) => {
        const nested =
          level < depth && child.children.length
              ? renderLevel(
                visibleChildren(child),
                level + 1
              )
            : "";
        const description =
          withDescription && child.description
            ? `<p>${escapeHtml(child.description)}</p>`
            : "";
        return `<li><a href="${child.url}"><span>${escapeHtml(
          child.title
        )}</span>${description}</a>${nested}</li>`;
      })
      .join("");

    return `<ul class="children-list">${entries}</ul>`;
  };

  return renderLevel(children, 1);
}

function countLeafPage(page: KbPage): number {
  const children = visibleChildren(page);
  if (!children.length) return 1;
  return children.reduce((count, child) => count + countLeafPage(child), 0);
}

function visibleChildren(page: KbPage) {
  return page.children.filter((child) => child.frontmatter.hidden !== true);
}

function renderResources(page: KbPage, attrs: Record<string, string>) {
  const pageDir = path.join(contentRoot, page.sourceDir);
  const filesDir = path.join(pageDir, "files");
  if (!fs.existsSync(filesDir)) return "";

  const pattern = attrs.pattern ? new RegExp(attrs.pattern) : null;
  const files = fs
    .readdirSync(filesDir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name !== ".gitkeep")
    .filter((entry) => !pattern || pattern.test(entry.name))
    .sort((a, b) => a.name.localeCompare(b.name));

  if (!files.length) return "";

  const title = attrs.title ?? "Resources";
  const items = files
    .map((entry) => {
      const absolute = path.join(filesDir, entry.name);
      const size = Math.ceil(fs.statSync(absolute).size / 1024);
      const href = `${page.url}files/${encodeURIComponent(entry.name)}`;
      return `<li><a href="${href}">${escapeHtml(entry.name)}</a><span>${size} KB</span></li>`;
    })
    .join("");

  return `<section class="resources"><h2>${escapeHtml(title)}</h2><ul>${items}</ul></section>`;
}

function resolveRef(target: string, page: KbPage) {
  const [rawPath, anchorPart] = target.split("#");
  const clean = rawPath
    .replace(/\\/g, "/")
    .replace(/(^"|"$)/g, "")
    .replace(/\.md$/i, "")
    .replace(/\/index$/i, "")
    .replace(/\/_index$/i, "")
    .replace(/^\/+|\/+$/g, "");
  const hash = anchorPart ? `#${slugify(anchorPart)}` : "";

  getPages();
  const candidates = [
    `/${clean}/`,
    `/${slash(path.posix.normalize(path.posix.join(page.sourceDir, clean)))}/`,
    `/${slash(path.posix.normalize(clean))}/`
  ].map(withSlashes);

  for (const candidate of candidates) {
    const found = urlMap?.get(candidate);
    if (found) return `${found.url}${hash}`;
  }

  const basename = clean.split("/").filter(Boolean).pop()?.toLowerCase();
  if (basename) {
    const matches = refMap?.get(basename) ?? [];
    if (matches.length === 1) return `${matches[0].url}${hash}`;

    const nearest = matches
      .map((match) => ({
        match,
        score: commonPrefix(page.slug.split("/"), match.slug.split("/"))
      }))
      .sort((a, b) => b.score - a.score)[0]?.match;

    if (nearest) return `${nearest.url}${hash}`;
  }

  return hash || "#";
}

function parseAttrs(rawAttrs: string) {
  const attrs: Record<string, string> = {};
  const matcher = /([a-zA-Z0-9_-]+)\s*=\s*"([^"]*)"/g;
  let match: RegExpExecArray | null;
  while ((match = matcher.exec(rawAttrs))) {
    attrs[match[1]] = match[2];
  }
  return attrs;
}

function buildBreadcrumbs(page: KbPage, byUrl: Map<string, KbPage>) {
  const items: KbPage[] = [];
  let current = page.parentUrl ? byUrl.get(page.parentUrl) : null;
  while (current) {
    items.unshift(current);
    current = current.parentUrl ? byUrl.get(current.parentUrl) : null;
  }
  return items;
}

function buildRefMap(pages: KbPage[]) {
  const map = new Map<string, KbPage[]>();
  for (const page of pages) {
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

function listMarkdown(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const absolute = path.join(dir, entry.name);
    if (entry.isDirectory()) return listMarkdown(absolute);
    return entry.name.endsWith(".md") ? [absolute] : [];
  });
}

function slugFromFile(relativeFile: string) {
  if (relativeFile === "_index.md") return "";
  return relativeFile
    .replace(/\/index\.md$/i, "")
    .replace(/\/_index\.md$/i, "")
    .replace(/\.md$/i, "")
    .replace(/^_index$/i, "");
}

function findParentUrl(url: string, byUrl: Map<string, KbPage>) {
  if (url === "/") return null;
  const parts = url.replace(/^\/|\/$/g, "").split("/");
  while (parts.length > 0) {
    parts.pop();
    const candidate = parts.length ? `/${parts.join("/")}/` : "/";
    if (byUrl.has(candidate)) return candidate;
  }
  return "/";
}

function titleFromSlug(slug: string) {
  return slug
    .split("/")
    .filter(Boolean)
    .pop()
    ?.replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase()) ?? "Knowledge Base";
}

function normalizeTitle(value: unknown) {
  return String(value ?? "").trim();
}

function normalizeStringList(value: unknown) {
  if (!value) return [];
  if (Array.isArray(value)) return value.map(String).filter(Boolean);
  return [String(value)].filter(Boolean);
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/['"`]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function withSlashes(value: string) {
  if (value === "/") return "/";
  return `/${value.replace(/^\/+|\/+$/g, "")}/`;
}

function slash(value: string) {
  return value.replace(/\\/g, "/");
}

function commonPrefix(a: string[], b: string[]) {
  let count = 0;
  while (a[count] && b[count] && a[count] === b[count]) count += 1;
  return count;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeAttr(value: string) {
  return escapeHtml(value).replace(/'/g, "&#39;");
}
