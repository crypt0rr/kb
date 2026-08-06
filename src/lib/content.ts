import fs from "node:fs";
import path from "node:path";
import MarkdownIt from "markdown-it";
import anchor from "markdown-it-anchor";
import { buildContentIndex, normalizeWeight } from "./content-index.mjs";
import { buildContentGraph } from "./content-graph.mjs";
import { normalizeDate } from "./date.mjs";
import {
  canonicalTag,
  tagKey,
  uniqueStrings
} from "./metadata.mjs";

const contentRoot = path.join(process.cwd(), "content");
const pageCollator = new Intl.Collator("en", { sensitivity: "base", numeric: true });

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
  lastReviewed?: string;
  status?: "active" | "deprecated" | "archived";
  platforms: string[];
  tags: string[];
  metadataProvenance: Record<string, { source: string; kind: "cascade" | "explicit" }>;
  parentUrl: string | null;
  section: string;
  children: KbPage[];
  breadcrumbs: KbPage[];
};

export type PageConnection = {
  page: KbPage;
  kind: "reference" | "referenced-by" | "parent" | "child" | "related";
  reason: string;
  score: number;
};

let cache: KbPage[] | null = null;
let urlMap: Map<string, KbPage> | null = null;
let refMap: Map<string, KbPage[]> | null = null;
let contentGraph: ContentGraph | null = null;

type ContentRecord = {
  file: string;
  relativeFile: string;
  sourceDir: string;
  slug: string;
  url: string;
  section: string;
  body: string;
  effectiveFrontmatter: Record<string, any>;
  metadataProvenance: Record<string, { source: string; kind: "cascade" | "explicit" }>;
  parentUrl: string | null;
  children: ContentRecord[];
};

type ContentIndex = {
  pages: ContentRecord[];
};

type ContentGraphEdge = {
  fromUrl: string;
  toUrl: string;
  kind: "reference";
  line: number;
  rawTarget: string;
  fragment: string;
};

type ContentGraph = {
  outgoing: Map<string, ContentGraphEdge[]>;
  incoming: Map<string, ContentGraphEdge[]>;
  summary: {
    pages: number;
    referenceCount: number;
    uniqueReferenceCount: number;
    pagesWithOutgoing: number;
    pagesWithIncoming: number;
    isolatedPages: number;
  };
};

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
  const href = tokens[idx].attrGet("href");
  if (typeof href === "string" && /^https?:\/\//i.test(href)) {
    tokens[idx].attrSet("target", "_blank");
    tokens[idx].attrSet("rel", "noopener noreferrer");
  }
  return defaultLinkOpen(tokens, idx, options, env, self);
};

export function getPages() {
  if (cache) return cache;

  const index = buildContentIndex({ contentRoot }) as ContentIndex;
  const graph = buildContentGraph({ contentRoot, index }) as ContentGraph;
  const pageMap = new Map(index.pages.map((record) => [record.url, toKbPage(record)]));
  const pages = [...pageMap.values()];
  const byUrl = new Map(pages.map((page) => [page.url, page]));

  for (const record of index.pages) {
    const page = pageMap.get(record.url);
    if (!page) continue;
    page.parentUrl = record.parentUrl;
    page.children = record.children
      .map((child) => pageMap.get(child.url))
      .filter((child): child is KbPage => Boolean(child));
    page.children.sort(sortPages);
    page.breadcrumbs = buildBreadcrumbs(page, byUrl);
  }

  pages.sort(sortPages);
  cache = pages;
  urlMap = byUrl;
  refMap = buildRefMap(pages);
  contentGraph = graph;
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
      const key = tagKey(tag);
      const current = tags.get(key) ?? { tag: canonicalTag(tag), count: 0 };
      current.count += 1;
      tags.set(key, current);
    }
  }
  return [...tags.values()].sort((a, b) => a.tag.localeCompare(b.tag));
}

export function getPopularTags(limit = 18) {
  return getAllTags()
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag))
    .slice(0, limit);
}

export function getPagesByTag(tag: string) {
  const requested = tagSlug(canonicalTag(tag));
  return getPages()
    .filter((page) => page.tags.some((item) => tagSlug(item) === requested))
    .sort(sortPages);
}

export function getRelatedPages(page: KbPage, limit = 4) {
  const pageTags = new Set(page.tags.map(tagSlug));

  return getPages()
    .filter((candidate) => candidate.url !== page.url && candidate.frontmatter.hidden !== true)
    .map((candidate) => {
      const sharedTags = candidate.tags.filter((tag) => pageTags.has(tagSlug(tag))).length;
      const sameSection = candidate.section === page.section ? 2 : 0;
      return { candidate, score: sharedTags * 4 + sameSection };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || sortPages(a.candidate, b.candidate))
    .slice(0, limit)
    .map(({ candidate }) => candidate);
}

export function getPageConnections(page: KbPage, limit = 8): PageConnection[] {
  getPages();
  const candidates = new Map<string, PageConnection>();
  const kindOrder = new Map<PageConnection["kind"], number>([
    ["reference", 0],
    ["referenced-by", 1],
    ["child", 2],
    ["parent", 3],
    ["related", 4]
  ]);

  const add = (
    candidate: KbPage | undefined,
    kind: PageConnection["kind"],
    reason: string,
    score: number
  ) => {
    if (!candidate || candidate.url === page.url || candidate.frontmatter.hidden === true) return;
    const existing = candidates.get(candidate.url);
    if (!existing || score > existing.score) {
      candidates.set(candidate.url, { page: candidate, kind, reason, score });
    }
  };

  for (const edge of contentGraph?.outgoing.get(page.url) ?? []) {
    add(urlMap?.get(edge.toUrl), "reference", "Explicit reference", 100);
  }
  for (const edge of contentGraph?.incoming.get(page.url) ?? []) {
    add(urlMap?.get(edge.fromUrl), "referenced-by", "References this note", 90);
  }

  if (page.parentUrl && page.parentUrl !== "/") {
    add(urlMap?.get(page.parentUrl), "parent", "Parent section", 70);
  }
  for (const child of page.children) {
    add(child, "child", "Child note", 65);
  }

  for (const related of getRelatedPages(page, Math.max(limit * 2, 12))) {
    const sharedTags = related.tags.filter((tag) =>
      page.tags.some((pageTag) => tagSlug(pageTag) === tagSlug(tag))
    ).length;
    add(related, "related", "Shared tags", 20 + sharedTags);
  }

  return [...candidates.values()]
    .sort(
      (a, b) =>
        b.score - a.score ||
        (kindOrder.get(a.kind) ?? 99) - (kindOrder.get(b.kind) ?? 99) ||
        sortPages(a.page, b.page)
    )
    .slice(0, Math.max(1, limit));
}

export function getContentGraphSummary() {
  getPages();
  return contentGraph?.summary ?? {
    pages: 0,
    referenceCount: 0,
    uniqueReferenceCount: 0,
    pagesWithOutgoing: 0,
    pagesWithIncoming: 0,
    isolatedPages: 0
  };
}

export function getPageNeighbors(page: KbPage) {
  getPages();
  const siblings = (page.parentUrl ? urlMap?.get(page.parentUrl)?.children : getRootSections()) ?? [];
  const visible = siblings.filter((item) => item.frontmatter.hidden !== true).sort(sortPages);
  const index = visible.findIndex((item) => item.url === page.url);

  return {
    previous: index > 0 ? visible[index - 1] : undefined,
    next: index >= 0 && index < visible.length - 1 ? visible[index + 1] : undefined
  };
}

export function renderPage(page: KbPage) {
  const prepared = preprocessShortcodes(page.body, page);
  return md.render(prepared);
}

export function renderInlineMarkdown(source: string) {
  return md.renderInline(source);
}

export function tagSlug(tag: string) {
  return tagKey(canonicalTag(tag));
}

export function sortPages(a: KbPage, b: KbPage) {
  if (a.weight !== b.weight) return a.weight - b.weight;
  return pageCollator.compare(a.title, b.title) || pageCollator.compare(a.url, b.url);
}

function toKbPage(record: ContentRecord): KbPage {
  const frontmatter = record.effectiveFrontmatter;
  const title = normalizeTitle(frontmatter.title) || titleFromSlug(record.slug || "Knowledge Base");
  return {
    file: record.file,
    relativeFile: record.relativeFile,
    sourceDir: record.sourceDir,
    slug: record.slug,
    url: record.url,
    title,
    description: String(frontmatter.description ?? ""),
    body: record.body,
    frontmatter,
    weight: normalizeWeight(frontmatter.weight),
    date: normalizeDate(frontmatter.date),
    lastReviewed: normalizeDate(frontmatter.lastReviewed),
    status: normalizeStatus(frontmatter.status),
    platforms: uniqueStrings(frontmatter.platforms),
    tags: [...new Set(uniqueStrings(frontmatter.tags).map(canonicalTag))],
    metadataProvenance: record.metadataProvenance,
    parentUrl: record.parentUrl,
    section: record.section,
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
  const directory = normalizeResourceDirectory(attrs.directory);
  const filesDir = path.join(pageDir, "files", directory);
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
      const hrefParts = [
        page.url,
        "files/",
        directory ? `${directory}/` : "",
        encodeURIComponent(entry.name)
      ];
      const href = hrefParts.join("");
      return `<li><a href="${href}">${escapeHtml(entry.name)}</a><span>${size} KB</span></li>`;
    })
    .join("");

  return `<section class="resources"><h2>${escapeHtml(title)}</h2><ul>${items}</ul></section>`;
}

function normalizeResourceDirectory(value?: string) {
  if (!value) return "";
  const clean = slash(value)
    .split("/")
    .filter((part) => part && part !== "." && part !== "..")
    .join("/");

  return clean;
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

function normalizeStatus(value: unknown): KbPage["status"] {
  const status = String(value ?? "").trim().toLowerCase();
  return status === "active" || status === "deprecated" || status === "archived"
    ? status
    : undefined;
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
