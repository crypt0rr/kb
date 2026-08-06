import fs from "node:fs";
import path from "node:path";
import MarkdownIt from "markdown-it";
import { buildContentIndex } from "./content-index.mjs";

const markdown = new MarkdownIt({ html: true, linkify: false });
const collator = new Intl.Collator("en", { sensitivity: "base", numeric: true });

/**
 * Build the visible content relationship graph from the canonical content index.
 *
 * The graph deliberately records only explicit page-to-page references. Hierarchy
 * and tag relationships are derived by the runtime so every edge has one clear
 * meaning and link validation can share the exact same resolver.
 */
export function buildContentGraph(options = {}) {
  const contentRoot = path.resolve(
    options.contentRoot ?? path.join(process.cwd(), "content")
  );
  const root = path.resolve(options.root ?? path.dirname(contentRoot));
  const index =
    options.index ??
    buildContentIndex({
      contentRoot,
      strict: options.strict ?? true
    });
  const pages = options.pages ?? index.pages;
  const resolver = createContentResolver({
    root,
    contentRoot,
    pages,
    assets: options.assets
  });
  const edges = [];
  const unresolved = [];

  for (const page of pages) {
    const baseDir = path.join(contentRoot, page.sourceDir || "");
    for (const target of collectMarkdownTargets(page.body)) {
      if (target.kind !== "link" || !isInternalTarget(target.value)) continue;

      const parsed = splitTarget(target.value);
      const resolved = target.shortcode
        ? resolver.resolveRef(parsed.path, page)
        : resolver.resolve(parsed.path, baseDir, page);
      if (resolved?.file) continue;
      if (!resolved?.page) {
        unresolved.push({
          source: page.relativeFile,
          line: target.line,
          target: target.value
        });
        continue;
      }

      edges.push({
        fromUrl: page.url,
        toUrl: resolved.page.url,
        kind: "reference",
        line: target.line,
        rawTarget: target.value,
        fragment: parsed.fragment
      });
    }
  }

  const outgoing = new Map();
  const incoming = new Map();
  for (const page of pages) {
    outgoing.set(page.url, []);
    incoming.set(page.url, []);
  }

  for (const edge of edges) {
    outgoing.get(edge.fromUrl)?.push(edge);
    incoming.get(edge.toUrl)?.push(edge);
  }

  for (const list of [...outgoing.values(), ...incoming.values()]) {
    list.sort((a, b) =>
      a.toUrl.localeCompare(b.toUrl) ||
      a.fromUrl.localeCompare(b.fromUrl) ||
      a.line - b.line ||
      a.rawTarget.localeCompare(b.rawTarget)
    );
  }

  const pagesWithOutgoing = [...outgoing.values()].filter((list) => list.length > 0).length;
  const pagesWithIncoming = [...incoming.values()].filter((list) => list.length > 0).length;
  const isolatedPages = pages
    .filter((page) => !outgoing.get(page.url)?.length && !incoming.get(page.url)?.length)
    .sort(comparePages)
    .map((page) => page.url);
  const uniqueEdges = new Set(edges.map((edge) => `${edge.fromUrl}\u0000${edge.toUrl}`));

  return {
    contentRoot,
    root,
    pages,
    resolver,
    edges,
    outgoing,
    incoming,
    unresolved,
    summary: {
      pages: pages.length,
      referenceCount: edges.length,
      uniqueReferenceCount: uniqueEdges.size,
      pagesWithOutgoing,
      pagesWithIncoming,
      isolatedPages: isolatedPages.length
    },
    isolatedPages
  };
}

/**
 * Create the shared filesystem/site resolver used by graph building and checks.
 */
export function createContentResolver({
  root = process.cwd(),
  contentRoot = path.join(root, "content"),
  pages = [],
  assets
} = {}) {
  const resolvedRoot = path.resolve(root);
  const resolvedContentRoot = path.resolve(contentRoot);
  const pagesByUrl = new Map(pages.map((page) => [page.url, page]));
  const pagesByFile = new Map();
  const refsByKey = buildRefMap(pages);

  for (const page of pages) {
    pagesByFile.set(path.resolve(resolvedContentRoot, page.relativeFile), page);
    if (page.file) pagesByFile.set(path.resolve(page.file), page);
  }

  const contentAssets = assets ?? collectContentAssets(resolvedContentRoot);

  return {
    pagesByUrl,
    pagesByFile,
    contentAssets,
    resolve(targetPath, baseDir, page) {
      return resolveInternalTarget(targetPath, {
        root: resolvedRoot,
        contentRoot: resolvedContentRoot,
        pagesByUrl,
        pagesByFile,
        contentAssets,
        baseDir,
        page
      });
    },
    resolveRef(target, page) {
      return resolveRefTarget(target, page, pagesByUrl, refsByKey);
    }
  };
}

/**
 * Extract Markdown and inline HTML links while retaining body-relative line data.
 */
export function collectMarkdownTargets(source) {
  const targets = [];
  const tokens = markdown.parse(String(source), {});

  for (const token of tokens) collectTokenTargets(token, targets);
  collectShortcodeTargets(String(source), targets);
  return targets;
}

export function collectAnchors(source) {
  const anchors = new Set();
  const tokens = markdown.parse(String(source), {});

  for (let index = 0; index < tokens.length; index += 1) {
    const token = tokens[index];
    if (token.type === "heading_open") {
      const id = token.attrGet("id");
      if (id) anchors.add(slugify(id));

      const inline = tokens[index + 1];
      if (inline?.type === "inline") anchors.add(slugify(inline.content));
    }

    if (token.type === "html_block" || token.type === "html_inline") {
      for (const id of htmlIds(token.content)) anchors.add(slugify(id));
    }
  }

  return anchors;
}

export function resolveInternalTarget(targetPath, context) {
  const {
    root,
    contentRoot,
    pagesByUrl,
    pagesByFile,
    contentAssets,
    baseDir,
    page
  } = context;

  if (!targetPath) return page ? { page } : { file: baseDir };

  if (targetPath.startsWith("/")) {
    return resolveAbsoluteSiteTarget(targetPath, pagesByUrl, contentAssets, contentRoot);
  }

  const absolute = path.resolve(baseDir, targetPath);
  const contentRelative = slash(path.relative(contentRoot, absolute));
  if (contentRelative !== ".." && !contentRelative.startsWith("../")) {
    const contentTarget = resolveContentRelative(
      contentRelative,
      contentRoot,
      pagesByFile,
      pagesByUrl
    );
    if (contentTarget) return contentTarget;
  }

  const repoRelative = slash(path.relative(root, absolute));
  if (repoRelative !== ".." && !repoRelative.startsWith("../") && isFile(absolute)) {
    return { file: absolute };
  }

  return null;
}

export function splitTarget(value) {
  const target = String(value).trim();
  const hashIndex = target.indexOf("#");
  const pathPart = hashIndex === -1 ? target : target.slice(0, hashIndex);
  const fragment = hashIndex === -1 ? "" : target.slice(hashIndex + 1).trim();
  const queryIndex = pathPart.indexOf("?");
  const cleanPath = queryIndex === -1 ? pathPart : pathPart.slice(0, queryIndex);

  return {
    path: decodeUriPath(cleanPath),
    fragment,
    target
  };
}

export function isInternalTarget(value) {
  const target = String(value ?? "").trim();
  return Boolean(target) &&
    !target.startsWith("javascript:") &&
    !/^https?:\/\//i.test(target) &&
    !/^[a-z][a-z0-9+.-]*:/i.test(target);
}

export function slugify(value) {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[\'"`]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function withSlashes(value) {
  if (value === "/") return "/";
  return `/${value.replace(/^\/+|\/+$/g, "")}/`;
}

export function slash(value) {
  return String(value).replace(/\\/g, "/");
}

function collectTokenTargets(token, targets) {
  const line = token.map ? token.map[0] + 1 : 1;

  if (token.type === "inline" && token.children) {
    for (const child of token.children) collectTokenTargets({ ...child, map: token.map }, targets);
    return;
  }

  if (token.type === "link_open") {
    targets.push({ kind: "link", value: getAttr(token, "href"), line, shortcode: false });
    return;
  }

  if (token.type === "image") {
    targets.push({ kind: "asset", value: getAttr(token, "src"), line });
    return;
  }

  if (token.type === "html_inline" || token.type === "html_block") {
    for (const target of htmlTargets(token.content)) targets.push({ ...target, line });
  }
}

function collectShortcodeTargets(source, targets) {
  const matcher = /\{\{[<%]\s*ref\s+"?([^"%>}]+)"?\s*[>%]\}\}/g;
  let match;
  while ((match = matcher.exec(source))) {
    targets.push({
      kind: "link",
      value: match[1].trim(),
      line: source.slice(0, match.index).split("\n").length,
      shortcode: true
    });
  }
}

function resolveAbsoluteSiteTarget(targetPath, pagesByUrl, contentAssets, contentRoot) {
  const normalized = withSlashes(targetPath.replace(/\/index\.html?$/i, ""));
  if (pagesByUrl.has(normalized)) return { page: pagesByUrl.get(normalized) };

  const assetPath = `/${targetPath.replace(/^\/+/, "")}`;
  if (contentAssets.has(assetPath)) {
    return { file: path.join(contentRoot, assetPath.slice(1)) };
  }

  return null;
}

function resolveContentRelative(relative, contentRoot, pagesByFile, pagesByUrl) {
  const normalized = slash(path.posix.normalize(relative));
  const absolute = path.join(contentRoot, normalized);

  if (normalized.endsWith(".md")) {
    const page = pagesByFile.get(path.resolve(absolute));
    if (page) return { page };
  }

  if (isFile(absolute)) return { file: absolute };

  const indexFile = path.join(absolute, "index.md");
  const indexPage = pagesByFile.get(path.resolve(indexFile));
  if (indexPage) return { page: indexPage };

  const sectionFile = path.join(absolute, "_index.md");
  const sectionPage = pagesByFile.get(path.resolve(sectionFile));
  if (sectionPage) return { page: sectionPage };

  const url = withSlashes(normalized.replace(/\.html?$/i, ""));
  if (pagesByUrl.has(url)) return { page: pagesByUrl.get(url) };

  return null;
}

function collectContentAssets(directory) {
  if (!fs.existsSync(directory)) return new Set();
  return new Set(
    listFiles(directory)
      .filter((file) => !file.endsWith(".md"))
      .map((file) => `/${slash(path.relative(directory, file))}`)
  );
}

function listFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) return listFiles(absolute);
    return [absolute];
  });
}

function htmlTargets(value) {
  const targets = [];
  const matcher = /\b(href|src)\s*=\s*(['"])(.*?)\2/gi;
  let match;
  while ((match = matcher.exec(value))) {
    targets.push({
      kind: match[1].toLowerCase() === "src" ? "asset" : "link",
      value: match[3],
      shortcode: false
    });
  }
  return targets;
}

function resolveRefTarget(target, page, pagesByUrl, refsByKey) {
  const clean = String(target)
    .replace(/\\/g, "/")
    .replace(/(^"|"$)/g, "")
    .replace(/\.md$/i, "")
    .replace(/\/index$/i, "")
    .replace(/\/_index$/i, "")
    .replace(/^\/+|\/+$/g, "");

  if (!clean) return page ? { page } : null;

  const candidates = [
    `/${clean}/`,
    `/${slash(path.posix.normalize(path.posix.join(page?.sourceDir ?? "", clean)))}/`,
    `/${slash(path.posix.normalize(clean))}/`
  ].map(withSlashes);

  for (const candidate of candidates) {
    const resolved = pagesByUrl.get(candidate);
    if (resolved) return { page: resolved };
  }

  const basename = clean.split("/").filter(Boolean).pop()?.toLowerCase();
  if (!basename) return null;
  const matches = refsByKey.get(basename) ?? [];
  if (matches.length === 1) return { page: matches[0] };

  const nearest = matches
    .map((match) => ({ match, score: commonPrefix(page?.slug, match.slug) }))
    .sort((a, b) => b.score - a.score || comparePages(a.match, b.match))[0]?.match;
  return nearest ? { page: nearest } : null;
}

function buildRefMap(pages) {
  const map = new Map();
  for (const page of pages) {
    const keys = new Set([
      page.slug?.split("/").filter(Boolean).pop()?.toLowerCase(),
      page.relativeFile?.replace(/\/_?index\.md$/i, "").split("/").pop()?.toLowerCase(),
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

function commonPrefix(a, b) {
  const left = String(a ?? "").split("/").filter(Boolean);
  const right = String(b ?? "").split("/").filter(Boolean);
  let count = 0;
  while (left[count] && right[count] && left[count] === right[count]) count += 1;
  return count;
}

function htmlIds(value) {
  const ids = [];
  const matcher = /\bid\s*=\s*(['"])(.*?)\1/gi;
  let match;
  while ((match = matcher.exec(value))) ids.push(match[2]);
  return ids;
}

function getAttr(token, name) {
  if (typeof token.attrGet === "function") return token.attrGet(name) ?? "";
  return token.attrs?.find(([key]) => key === name)?.[1] ?? "";
}

function decodeUriPath(value) {
  try {
    return decodeURI(value);
  } catch {
    return value;
  }
}

function isFile(value) {
  try {
    return fs.statSync(value).isFile();
  } catch {
    return false;
  }
}

function comparePages(a, b) {
  return collator.compare(String(a.title ?? ""), String(b.title ?? "")) ||
    collator.compare(a.url, b.url);
}
