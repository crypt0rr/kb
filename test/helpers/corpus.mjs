import fs from "node:fs";
import path from "node:path";
import { buildContentIndex } from "../../src/lib/content-index.mjs";
import { normalizeDate } from "../../src/lib/date.mjs";
import { parseFrontmatter } from "../../src/lib/frontmatter.mjs";

// Corpus tests compare the real content/ tree against expectations derived here
// instead of literal page counts, so adding a page or a review date keeps them
// green while lost, duplicated, or misclassified pages still fail.
export const contentRoot = path.join(process.cwd(), "content");

// Walks the tree without the content index so the page list is independent of
// the implementation under test. Returns sorted POSIX paths relative to root.
export function walkMarkdownFiles(directory = contentRoot) {
  const files = [];
  const visit = (current) => {
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const absolute = path.join(current, entry.name);
      if (entry.isDirectory()) {
        visit(absolute);
      } else if (entry.isFile() && entry.name.endsWith(".md")) {
        files.push(path.relative(directory, absolute).split(path.sep).join("/"));
      }
    }
  };
  visit(directory);
  return files.sort();
}

// Mirrors the site's URL rules: section and leaf bundles drop `_index.md` or
// `index.md` (case-insensitively), and only `_index.md` is the root page.
export function urlForMarkdownFile(relativeFile) {
  const slug = relativeFile
    .replace(/^_index\.md$/i, "")
    .replace(/\/(?:_index|index)\.md$/i, "")
    .replace(/\.md$/i, "");
  return slug ? `/${slug}/` : "/";
}

export function describeCorpus(directory = contentRoot) {
  const files = walkMarkdownFiles(directory);
  const explicitDrafts = files.filter((file) => {
    const source = fs.readFileSync(path.join(directory, file), "utf8");
    return parseFrontmatter(source, file).data.draft === true;
  });
  const index = buildContentIndex({ contentRoot: directory });
  // The published set and lastReviewed counts come from the index's effective
  // (cascaded) frontmatter, so they check consumers of the index rather than
  // the index itself; draft and cascade rules are covered by fixture tests.
  const published = index.allPages.filter((page) => page.effectiveFrontmatter.draft !== true);

  return {
    files,
    explicitDrafts,
    index,
    published,
    publishedUrls: published.map((page) => page.url).sort(),
    missingLastReviewed: published.filter(
      (page) => !normalizeDate(page.effectiveFrontmatter.lastReviewed)
    ).length
  };
}

// Corpus reports run as of tomorrow (UTC), never before the fixed floor, so a
// fresh `lastReviewed` written in any time zone is not a future date while a
// mistyped future date still fails. As time passes such a check can only start
// passing, never start failing, for unchanged content.
export function corpusAsOf(floor, now = new Date()) {
  const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  return tomorrow > floor ? tomorrow : floor;
}
