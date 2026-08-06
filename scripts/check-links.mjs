import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { buildContentIndex } from "../src/lib/content-index.mjs";
import { parseFrontmatter } from "../src/lib/frontmatter.mjs";
import {
  collectAnchors,
  collectMarkdownTargets,
  createContentResolver,
  isInternalTarget,
  slugify,
  splitTarget
} from "../src/lib/content-graph.mjs";

const root = process.cwd();
const contentDir = path.join(root, "content");
const index = buildContentIndex({ contentRoot: contentDir, strict: false });
const contentPages = index.pages.map((page) => ({
  ...page,
  anchors: collectAnchors(page.body)
}));
const pagesByFile = new Map(contentPages.map((page) => [path.resolve(page.file), page]));
const resolver = createContentResolver({
  root,
  contentRoot: contentDir,
  pages: contentPages
});
const markdownFiles = [
  ...contentPages.map((page) => page.file),
  path.join(root, "README.md")
].filter((file) => existsSync(file));
const errors = [];
let internalLinks = 0;
let externalLinks = 0;
let protocolLinks = 0;

for (const file of markdownFiles) checkMarkdownFile(file);

console.log(`${markdownFiles.length} Markdown file(s) scanned`);
console.log(`${internalLinks} internal link(s) checked`);
console.log(`${externalLinks} external link(s) inventoried`);
console.log(`${protocolLinks} protocol link(s) inventoried`);

if (errors.length) {
  for (const error of errors) console.error(`error: ${error}`);
  process.exitCode = 1;
}

function checkMarkdownFile(file) {
  const raw = readFileSync(file, "utf8");
  const source = slash(path.relative(root, file));
  const parsed = parseFrontmatter(raw, source);
  const page = pagesByFile.get(path.resolve(file)) ?? null;
  const baseDir = page ? path.join(contentDir, page.sourceDir) : path.dirname(file);

  for (const target of collectMarkdownTargets(parsed.content)) {
    checkTarget(target, source, baseDir, page);
  }
}

function checkTarget(target, source, baseDir, page) {
  const rawTarget = String(target.value ?? "").trim();
  if (!rawTarget || rawTarget.startsWith("javascript:")) return;

  if (/^https?:\/\//i.test(rawTarget)) {
    externalLinks += 1;
    return;
  }

  if (/^[a-z][a-z0-9+.-]*:/i.test(rawTarget)) {
    protocolLinks += 1;
    return;
  }

  if (!isInternalTarget(rawTarget)) return;
  internalLinks += 1;

  const { path: targetPath, fragment } = splitTarget(rawTarget);
  const resolved = target.shortcode
    ? resolver.resolveRef(targetPath, page)
    : resolver.resolve(targetPath, baseDir, page);

  if (!resolved) {
    errors.push(`${source}:${target.line}: missing ${target.kind} target ${rawTarget}`);
    return;
  }

  if (fragment && resolved.page && !resolved.page.anchors.has(slugify(fragment))) {
    errors.push(`${source}:${target.line}: missing anchor #${fragment} in ${resolved.page.url}`);
  }
}

function slash(value) {
  return value.replace(/\\/g, "/");
}
