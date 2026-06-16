import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import MarkdownIt from "markdown-it";
import { parseFrontmatter } from "../src/lib/frontmatter.mjs";

const root = process.cwd();
const contentDir = path.join(root, "content");
const md = new MarkdownIt({ html: true, linkify: false });
const markdownFiles = [
  ...listMarkdown(contentDir),
  path.join(root, "README.md")
].filter((file) => existsSync(file));
const contentPages = [];
const contentAssets = new Set();
const pagesByUrl = new Map();
const pagesByFile = new Map();
const errors = [];
let internalLinks = 0;
let externalLinks = 0;
let protocolLinks = 0;

collectContent();

for (const file of markdownFiles) {
  checkMarkdownFile(file);
}

console.log(`${markdownFiles.length} Markdown file(s) scanned`);
console.log(`${internalLinks} internal link(s) checked`);
console.log(`${externalLinks} external link(s) inventoried`);
console.log(`${protocolLinks} protocol link(s) inventoried`);

if (errors.length) {
  for (const error of errors) {
    console.error(`error: ${error}`);
  }
  process.exitCode = 1;
}

function collectContent() {
  for (const file of listFiles(contentDir)) {
    const relative = slash(path.relative(contentDir, file));
    if (relative.endsWith(".md")) {
      const raw = readFileSync(file, "utf8");
      const parsed = parseFrontmatter(raw, relative);
      if (parsed.data.draft === true) continue;

      const slug = slugFromFile(relative);
      const page = {
        file,
        relative,
        sourceDir: slash(path.dirname(relative)),
        url: slug ? `/${slug}/` : "/",
        anchors: collectAnchors(parsed.content)
      };

      contentPages.push(page);
      pagesByUrl.set(page.url, page);
      pagesByFile.set(slash(path.relative(root, file)), page);
      continue;
    }

    contentAssets.add(`/${relative}`);
  }
}

function checkMarkdownFile(file) {
  const raw = readFileSync(file, "utf8");
  const source = slash(path.relative(root, file));
  const parsed = parseFrontmatter(raw, source);
  const tokens = md.parse(parsed.content, {});
  const page = pagesByFile.get(slash(path.relative(root, file))) ?? null;
  const baseDir = page ? path.join(contentDir, page.sourceDir) : path.dirname(file);

  for (const token of tokens) {
    collectTokenLinks(token, source, baseDir, page);
  }
}

function collectTokenLinks(token, source, baseDir, page) {
  const line = token.map ? token.map[0] + 1 : 1;

  if (token.type === "inline" && token.children) {
    for (const child of token.children) {
      collectTokenLinks({ ...child, map: token.map }, source, baseDir, page);
    }
    return;
  }

  if (token.type === "link_open") {
    checkTarget(getAttr(token, "href"), source, line, baseDir, page, "link");
    return;
  }

  if (token.type === "image") {
    checkTarget(getAttr(token, "src"), source, line, baseDir, page, "image");
    return;
  }

  if (token.type === "html_inline" || token.type === "html_block") {
    for (const target of htmlTargets(token.content)) {
      checkTarget(target.value, source, line, baseDir, page, target.kind);
    }
  }
}

function checkTarget(rawTarget, source, line, baseDir, page, kind) {
  if (!rawTarget) return;

  const target = decodeTarget(rawTarget.trim());
  if (!target || target.startsWith("javascript:")) return;

  if (/^https?:\/\//i.test(target)) {
    externalLinks += 1;
    return;
  }

  if (/^[a-z][a-z0-9+.-]*:/i.test(target)) {
    protocolLinks += 1;
    return;
  }

  internalLinks += 1;
  const [targetPath, rawFragment = ""] = target.split("#");
  const fragment = rawFragment.trim();
  const resolved = resolveInternalTarget(targetPath, baseDir, page);

  if (!resolved) {
    errors.push(`${source}:${line}: missing ${kind} target ${rawTarget}`);
    return;
  }

  if (fragment && resolved.page && !resolved.page.anchors.has(slugify(fragment))) {
    errors.push(`${source}:${line}: missing anchor #${fragment} in ${resolved.page.url}`);
  }
}

function resolveInternalTarget(targetPath, baseDir, page) {
  if (!targetPath) return page ? { page } : { file: baseDir };

  if (targetPath.startsWith("/")) {
    return resolveAbsoluteSiteTarget(targetPath);
  }

  const absolute = path.resolve(baseDir, targetPath);
  const contentRelative = slash(path.relative(contentDir, absolute));
  if (!contentRelative.startsWith("../")) {
    const contentTarget = resolveContentRelative(contentRelative);
    if (contentTarget) return contentTarget;
  }

  const repoRelative = slash(path.relative(root, absolute));
  if (!repoRelative.startsWith("../") && existsSync(absolute)) {
    return { file: absolute };
  }

  return null;
}

function resolveAbsoluteSiteTarget(targetPath) {
  const normalized = withSlashes(targetPath.replace(/\/index\.html?$/i, ""));
  if (pagesByUrl.has(normalized)) return { page: pagesByUrl.get(normalized) };

  const assetPath = `/${targetPath.replace(/^\/+/, "")}`;
  if (contentAssets.has(assetPath)) return { file: path.join(contentDir, assetPath.slice(1)) };

  return null;
}

function resolveContentRelative(relative) {
  const normalized = slash(path.posix.normalize(relative));
  const absolute = path.join(contentDir, normalized);

  if (normalized.endsWith(".md")) {
    const page = pagesByFile.get(`content/${normalized}`);
    if (page) return { page };
  }

  if (existsSync(absolute) && statSync(absolute).isFile()) {
    return { file: absolute };
  }

  const indexFile = path.join(absolute, "index.md");
  if (existsSync(indexFile)) {
    const page = pagesByFile.get(slash(path.relative(root, indexFile)));
    if (page) return { page };
  }

  const sectionFile = path.join(absolute, "_index.md");
  if (existsSync(sectionFile)) {
    const page = pagesByFile.get(slash(path.relative(root, sectionFile)));
    if (page) return { page };
  }

  const url = withSlashes(normalized.replace(/\.html?$/i, ""));
  if (pagesByUrl.has(url)) return { page: pagesByUrl.get(url) };

  return null;
}

function collectAnchors(source) {
  const anchors = new Set();
  const tokens = md.parse(source, {});

  for (let index = 0; index < tokens.length; index += 1) {
    const token = tokens[index];
    if (token.type === "heading_open") {
      const id = token.attrGet("id");
      if (id) anchors.add(slugify(id));

      const inline = tokens[index + 1];
      if (inline?.type === "inline") {
        anchors.add(slugify(inline.content));
      }
    }

    if (token.type === "html_block" || token.type === "html_inline") {
      for (const id of htmlIds(token.content)) {
        anchors.add(slugify(id));
      }
    }
  }

  return anchors;
}

function htmlTargets(value) {
  const targets = [];
  const matcher = /\b(href|src)\s*=\s*(['"])(.*?)\2/gi;
  let match;
  while ((match = matcher.exec(value))) {
    targets.push({ kind: match[1].toLowerCase() === "src" ? "asset" : "link", value: match[3] });
  }
  return targets;
}

function getAttr(token, name) {
  if (typeof token.attrGet === "function") return token.attrGet(name);
  return token.attrs?.find(([key]) => key === name)?.[1] ?? "";
}

function htmlIds(value) {
  const ids = [];
  const matcher = /\bid\s*=\s*(['"])(.*?)\1/gi;
  let match;
  while ((match = matcher.exec(value))) {
    ids.push(match[2]);
  }
  return ids;
}

function decodeTarget(value) {
  const [pathPart, fragmentPart] = value.split("#");
  const decodedPath = decodeUriPath(pathPart.split("?")[0]);
  const fragment = fragmentPart === undefined ? "" : `#${fragmentPart}`;
  return `${decodedPath}${fragment}`;
}

function decodeUriPath(value) {
  try {
    return decodeURI(value);
  } catch {
    return value;
  }
}

function listMarkdown(dir) {
  return listFiles(dir).filter((file) => file.endsWith(".md"));
}

function listFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const absolute = path.join(dir, entry.name);
    if (entry.isDirectory()) return listFiles(absolute);
    return [absolute];
  });
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

function slash(value) {
  return value.replace(/\\/g, "/");
}
