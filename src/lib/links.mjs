import path from "node:path";
import MarkdownIt from "markdown-it";
import anchor from "markdown-it-anchor";

/**
 * Single source of truth for slugs, `ref` resolution and heading anchors.
 *
 * The renderer, the content graph and the content/link checks all import from
 * here so a target or anchor that passes CI is exactly what the site renders.
 */

const collator = new Intl.Collator("en", { sensitivity: "base", numeric: true });
const headerLink = anchor.permalink.headerLink();
const anchorMarkdown = createMarkdown();

export function slugify(value) {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/['"`]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function withSlashes(value) {
  if (value === "/") return "/";
  return `/${String(value).replace(/^\/+|\/+$/g, "")}/`;
}

export function slash(value) {
  return String(value).replace(/\\/g, "/");
}

/**
 * Create the markdown-it instance used to render pages and to derive anchors.
 */
export function createMarkdown() {
  return new MarkdownIt({
    html: true,
    linkify: true,
    typographer: false
  }).use(anchor, {
    slugify,
    permalink: headingPermalink
  });
}

/**
 * Collect the heading ids a page renders, plus ids declared in raw HTML.
 */
export function collectAnchors(source) {
  const anchors = new Set();
  const tokens = anchorMarkdown.parse(String(source), {});

  for (const token of tokens) {
    if (token.type === "heading_open") {
      const id = token.attrGet("id");
      if (id) anchors.add(slugify(id));
    }

    if (token.type === "html_block") {
      for (const id of htmlIds(token.content)) anchors.add(slugify(id));
    }

    for (const child of token.children ?? []) {
      if (child.type !== "html_inline") continue;
      for (const id of htmlIds(child.content)) anchors.add(slugify(id));
    }
  }

  return anchors;
}

/**
 * Index pages by every key a `ref` shortcode may use: URL basename, source
 * directory or file name, and slugified title.
 */
export function buildRefMap(pages) {
  const map = new Map();
  for (const page of pages) {
    const keys = new Set([
      page.slug?.split("/").filter(Boolean).pop()?.toLowerCase(),
      page.relativeFile?.replace(/\/_?index\.md$/i, "").split("/").pop()?.toLowerCase(),
      slugify(page.title ?? "")
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

export function createRefIndex(pages) {
  const list = [...pages];
  return {
    pagesByUrl: new Map(list.map((page) => [page.url, page])),
    refMap: buildRefMap(list)
  };
}

/**
 * Resolve a `ref` shortcode target relative to the page that contains it.
 *
 * Exact URL candidates win. Otherwise the basename matches closest to the
 * source page (longest shared slug prefix) are used; if several share the best
 * score the first by title/URL is returned and the result is marked ambiguous.
 */
export function resolveRef(target, page, { pagesByUrl, refMap }) {
  const clean = String(target)
    .split("#")[0]
    .replace(/\\/g, "/")
    .replace(/(^"|"$)/g, "")
    .replace(/\.md$/i, "")
    .replace(/\/index$/i, "")
    .replace(/\/_index$/i, "")
    .replace(/^\/+|\/+$/g, "");

  if (!clean) return { page: page ?? null, ambiguous: false, candidates: [] };

  const candidates = [
    `/${clean}/`,
    `/${slash(path.posix.normalize(path.posix.join(page?.sourceDir ?? "", clean)))}/`,
    `/${slash(path.posix.normalize(clean))}/`
  ].map(withSlashes);

  for (const candidate of candidates) {
    const found = pagesByUrl.get(candidate);
    if (found) return { page: found, ambiguous: false, candidates: [] };
  }

  const basename = clean.split("/").filter(Boolean).pop()?.toLowerCase();
  const matches = basename ? refMap.get(basename) ?? [] : [];
  if (matches.length <= 1) {
    return { page: matches[0] ?? null, ambiguous: false, candidates: [] };
  }

  const scored = matches.map((match) => ({
    match,
    score: commonPrefix(page?.slug, match.slug)
  }));
  const best = Math.max(...scored.map(({ score }) => score));
  const nearest = scored
    .filter(({ score }) => score === best)
    .map(({ match }) => match)
    .sort(comparePages);

  return {
    page: nearest[0],
    ambiguous: nearest.length > 1,
    candidates: nearest.length > 1 ? nearest : []
  };
}

/**
 * Wrap plain headings in a self link, but never nest anchors: headings that
 * already contain a link get a separate labelled permalink instead.
 */
function headingPermalink(slug, options, state, index) {
  const children = state.tokens[index + 1]?.children ?? [];
  if (!children.some(isLinkToken)) {
    headerLink(slug, options, state, index);
    return;
  }

  const title = children
    .filter((token) => token.type === "text" || token.type === "code_inline")
    .map((token) => token.content)
    .join("")
    .trim();
  anchor.permalink.linkInsideHeader({
    class: "heading-permalink",
    symbol: "#",
    renderAttrs: () => ({ "aria-label": `Permalink to ${title}` })
  })(slug, options, state, index);
}

function isLinkToken(token) {
  return token.type === "link_open" ||
    (token.type === "html_inline" && /^<a[\s>]/i.test(token.content));
}

function htmlIds(value) {
  const ids = [];
  const matcher = /\bid\s*=\s*(['"])(.*?)\1/gi;
  let match;
  while ((match = matcher.exec(value))) ids.push(match[2]);
  return ids;
}

function commonPrefix(a, b) {
  const left = String(a ?? "").split("/").filter(Boolean);
  const right = String(b ?? "").split("/").filter(Boolean);
  let count = 0;
  while (left[count] && right[count] && left[count] === right[count]) count += 1;
  return count;
}

function comparePages(a, b) {
  return collator.compare(String(a.title ?? ""), String(b.title ?? "")) ||
    collator.compare(String(a.url ?? ""), String(b.url ?? ""));
}
