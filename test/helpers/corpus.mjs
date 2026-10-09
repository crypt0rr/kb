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

export function urlForMarkdownFile(relativeFile) {
  const slug = relativeFile
    .replace(/(?:^|\/)(?:_index|index)\.md$/, "")
    .replace(/\.md$/, "");
  return slug ? `/${slug}/` : "/";
}

export function describeCorpus(directory = contentRoot) {
  const files = walkMarkdownFiles(directory);
  const explicitDrafts = files.filter((file) => {
    const source = fs.readFileSync(path.join(directory, file), "utf8");
    return parseFrontmatter(source, file).data.draft === true;
  });
  const index = buildContentIndex({ contentRoot: directory });
  const published = index.allPages.filter((page) => page.effectiveFrontmatter.draft !== true);
  const latestDate = published
    .flatMap((page) => [page.effectiveFrontmatter.date, page.effectiveFrontmatter.lastReviewed])
    .map((value) => normalizeDate(value))
    .filter(Boolean)
    .sort()
    .at(-1);

  return {
    files,
    explicitDrafts,
    index,
    published,
    publishedUrls: published.map((page) => page.url).sort(),
    missingLastReviewed: published.filter(
      (page) => !normalizeDate(page.effectiveFrontmatter.lastReviewed)
    ).length,
    latestDate
  };
}

// Corpus reports use a fixed review date for determinism. Moving it forward to
// the newest content date keeps a fresh `lastReviewed` from turning into a
// future-date finding without making the tests depend on the wall clock.
export function corpusAsOf(corpus, floor) {
  return corpus.latestDate && corpus.latestDate > floor ? corpus.latestDate : floor;
}
