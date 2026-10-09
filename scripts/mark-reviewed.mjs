import fs from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { isDeepStrictEqual } from "node:util";
import { isMap, isScalar, parseDocument } from "yaml";
import { isPrivateContentPath } from "../src/lib/content-paths.mjs";
import { normalizeDate } from "../src/lib/date.mjs";
import {
  frontmatterYamlOptions,
  locateFrontmatter,
  parseFrontmatter
} from "../src/lib/frontmatter.mjs";

// Records that a maintainer reviewed one or more pages by setting the
// top-level `lastReviewed` frontmatter field. The file is edited in place with
// a single inserted or replaced line instead of re-serialising the YAML, so key
// order, quoting, comments, line endings, a BOM, and the body stay byte-for-byte
// identical. Every edit is re-parsed and must yield the original data plus the
// new date before anything is written.

export const FIELD = "lastReviewed";
export const USAGE =
  "Usage: npm run content:mark-reviewed -- <path...> [--date YYYY-MM-DD] [--dry-run]";

const pageIndexFiles = ["index.md", "_index.md"];

export function currentUtcDate(now = new Date()) {
  return now.toISOString().slice(0, 10);
}

// Accepts only a strict YYYY-MM-DD calendar date that is not after `today`
// (UTC), matching the date the review reports use to flag future dates.
export function validateReviewDate(value, { today = currentUtcDate() } = {}) {
  const text = String(value ?? "");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(text)) {
    throw new Error(`--date must use the YYYY-MM-DD format, got "${text}"`);
  }
  if (normalizeDate(text) !== text) {
    throw new Error(`--date ${text} is not a valid calendar date`);
  }
  if (text > today) {
    throw new Error(`--date ${text} is in the future (today in UTC is ${today})`);
  }
  return text;
}

// Resolves a CLI argument to a publishable page source under contentRoot. A
// directory resolves to its index.md or _index.md bundle file.
export function resolvePagePath(input, { contentRoot, cwd = process.cwd() }) {
  const root = path.resolve(contentRoot);
  const absolute = path.resolve(cwd, String(input));
  const relative = path.relative(root, absolute);

  if (isOutside(relative)) {
    throw new Error(`${input}: path is outside content/`);
  }
  if (isPrivateContentPath(relative)) {
    throw new Error(`${input}: dot-segment paths are private and are never published`);
  }

  let stats;
  try {
    stats = fs.statSync(absolute);
  } catch (error) {
    if (error.code === "ENOENT") throw new Error(`${input}: no such file or directory`);
    throw error;
  }

  let file = absolute;
  if (stats.isDirectory()) {
    const candidates = pageIndexFiles
      .map((name) => path.join(absolute, name))
      .filter((candidate) => isFile(candidate));
    if (!candidates.length) {
      throw new Error(`${input}: directory has no index.md or _index.md page`);
    }
    if (candidates.length > 1) {
      throw new Error(`${input}: directory has both index.md and _index.md; pass the page file`);
    }
    file = candidates[0];
  } else if (!stats.isFile()) {
    throw new Error(`${input}: not a regular file`);
  } else if (!absolute.endsWith(".md")) {
    throw new Error(`${input}: not a Markdown page (.md)`);
  }

  if (isOutside(path.relative(fs.realpathSync(root), fs.realpathSync(file)))) {
    throw new Error(`${input}: resolves outside content/ through a symlink`);
  }

  return { file, relativeFile: slash(path.relative(root, file)) };
}

// Returns the edited source plus what happened: "added" (new line in existing
// frontmatter), "created" (frontmatter block added), "updated" (value
// replaced), or "unchanged". Throws instead of guessing when the existing
// value is not a single-line scalar or the edit would change anything else.
export function setLastReviewed(source, date, file = "content") {
  const original = String(source);
  const before = parseFrontmatter(original, file);
  const located = locateFrontmatter(original, file);
  let next;
  let action;
  let previous = null;

  if (!located.hasFrontmatter) {
    const eol = detectEol(located.source);
    next = `${located.bom}---${eol}${FIELD}: ${date}${eol}---${eol}${eol}${located.source}`;
    action = "created";
  } else {
    const yamlText = located.source.slice(located.start, located.end);
    const edit = planFrontmatterEdit(yamlText, date, located.eol, file);
    if (edit.unchanged) {
      return { source: original, action: "unchanged", previous: edit.previous };
    }
    const offset = located.start;
    next =
      located.bom +
      located.source.slice(0, offset + edit.start) +
      edit.text +
      located.source.slice(offset + edit.end);
    action = edit.newLine ? "added" : "updated";
    previous = edit.previous;
  }

  const after = parseFrontmatter(next, file);
  if (
    !isDeepStrictEqual(after.data, { ...before.data, [FIELD]: date }) ||
    after.content !== before.content
  ) {
    throw new Error(
      `${file}: refusing to write; setting ${FIELD} would change other frontmatter or content`
    );
  }

  return { source: next, action, previous };
}

function planFrontmatterEdit(yamlText, date, eol, file) {
  const document = parseDocument(yamlText, frontmatterYamlOptions);
  const map = document.contents;

  if (map && !isMap(map)) {
    throw new Error(`${file}: frontmatter must be a YAML object`);
  }
  if (map?.flow) {
    throw new Error(`${file}: frontmatter is a flow mapping; set ${FIELD} manually`);
  }

  const items = map?.items ?? [];
  const existing = items.find((pair) => keyIs(pair, FIELD));

  if (existing) {
    const value = existing.value;
    if (!isScalar(value) || !value.range) {
      throw new Error(`${file}: ${FIELD} is not a single date value; edit it manually`);
    }
    const [start, end] = value.range;
    if (value.type?.startsWith("BLOCK") || yamlText.slice(start, end).includes("\n")) {
      throw new Error(`${file}: ${FIELD} spans multiple lines; edit it manually`);
    }
    const previous = yamlText.slice(start, end) || null;
    if (value.value === date) {
      return { unchanged: true, previous };
    }
    if (start === end) {
      // `lastReviewed:` with an empty value, optionally followed by a comment:
      // replace the gap after the colon with one space and the date, and keep
      // a space before the comment so it stays a comment.
      let gapStart = start;
      while (gapStart > 0 && /[ \t]/.test(yamlText[gapStart - 1])) gapStart -= 1;
      if (yamlText[gapStart - 1] !== ":") {
        throw new Error(`${file}: ${FIELD} has an empty value in an unexpected form; edit it manually`);
      }
      const comment = yamlText[start] === "#" ? " " : "";
      return { start: gapStart, end, text: ` ${date}${comment}`, previous };
    }
    return { start, end, text: date, previous };
  }

  // Insert a new line directly after a single-line top-level `date`, which
  // keeps the two dates together, and otherwise at the end of the block.
  const anchor = items.find((pair) => keyIs(pair, "date"));
  let offset = yamlText.length;
  let indentFrom = items[0]?.key?.range?.[0];

  if (isScalar(anchor?.value) && anchor.value.range) {
    const valueEnd = anchor.value.range[1];
    const lineEnd = yamlText.indexOf("\n", valueEnd);
    const valueText = yamlText.slice(anchor.key.range[0], valueEnd);
    if (lineEnd !== -1 && !valueText.includes("\n")) {
      offset = lineEnd + 1;
      indentFrom = anchor.key.range[0];
    }
  }

  const indent = indentFrom === undefined ? "" : lineIndent(yamlText, indentFrom);
  return {
    start: offset,
    end: offset,
    text: `${indent}${FIELD}: ${date}${eol}`,
    newLine: true,
    previous: null
  };
}

export function parseArguments(argv = []) {
  const options = { paths: [], date: undefined, dryRun: false, help: false };

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (!argument.startsWith("--") || argument === "--") {
      if (argument !== "--") options.paths.push(argument);
      continue;
    }

    const [flag, inlineValue] = argument.split("=", 2);
    switch (flag) {
      case "--date": {
        const value = inlineValue ?? argv[++index];
        if (!value || value.startsWith("--")) throw new Error("--date requires a value");
        options.date = value;
        break;
      }
      case "--dry-run":
        rejectInlineValue(flag, inlineValue);
        options.dryRun = true;
        break;
      case "--help":
        rejectInlineValue(flag, inlineValue);
        options.help = true;
        break;
      default:
        throw new Error(`Unknown option ${flag}`);
    }
  }

  return options;
}

function rejectInlineValue(flag, value) {
  if (value !== undefined) throw new Error(`${flag} does not take a value`);
}

export async function run(
  argv = process.argv.slice(2),
  {
    cwd = process.cwd(),
    contentRoot = path.join(cwd, "content"),
    today = currentUtcDate(),
    log = console.log
  } = {}
) {
  const options = parseArguments(argv);
  if (options.help) {
    log(USAGE);
    return { date: null, dryRun: options.dryRun, results: [] };
  }
  if (!options.paths.length) {
    throw new Error(`pass at least one page path\n${USAGE}`);
  }

  const date = validateReviewDate(options.date ?? today, { today });
  const errors = [];
  const pages = new Map();

  for (const input of options.paths) {
    try {
      const page = resolvePagePath(input, { contentRoot, cwd });
      // Key by the real path so a symlinked alias of a page counts once.
      pages.set(fs.realpathSync(page.file), page);
    } catch (error) {
      errors.push(error.message);
    }
  }

  // Plan every edit before writing so one bad path or page leaves all files
  // untouched.
  const results = [];
  for (const page of pages.values()) {
    try {
      const source = await readFile(page.file, "utf8");
      const result = setLastReviewed(source, date, `content/${page.relativeFile}`);
      results.push({ ...page, ...result, changed: result.source !== source });
    } catch (error) {
      errors.push(error.message);
    }
  }

  if (errors.length) {
    throw new Error(`${errors.join("\n")}\nNo files were changed.`);
  }

  if (!options.dryRun) {
    for (const result of results) {
      if (result.changed) await writeFile(result.file, result.source, "utf8");
    }
  }

  for (const result of results) {
    log(describeResult(result, date, options.dryRun));
  }

  const counts = Object.fromEntries(
    ["added", "created", "updated", "unchanged"].map((action) => [
      action,
      results.filter((result) => result.action === action).length
    ])
  );
  log(
    `${options.dryRun ? "Dry run: would mark" : "Marked"} ${results.length} page(s) reviewed on ${date}: ` +
      `${counts.added + counts.created} added, ${counts.updated} updated, ${counts.unchanged} unchanged` +
      (options.dryRun ? "; no files were written" : "")
  );

  return { date, dryRun: options.dryRun, results };
}

export function describeResult(result, date, dryRun = false) {
  const file = `content/${result.relativeFile}`;
  const verb = (word) => (dryRun ? `would ${word}` : word);
  switch (result.action) {
    case "added":
      return `${file}: ${verb("add")} ${FIELD}: ${date}`;
    case "created":
      return `${file}: ${verb("create")} frontmatter with ${FIELD}: ${date}`;
    case "updated":
      return `${file}: ${verb("update")} ${FIELD}: ${result.previous ?? "(empty)"} -> ${date}`;
    default:
      return `${file}: ${FIELD} already ${date}; unchanged`;
  }
}

function keyIs(pair, name) {
  return isScalar(pair?.key) && pair.key.value === name;
}

function lineIndent(text, position) {
  const lineStart = text.lastIndexOf("\n", position - 1) + 1;
  const indent = text.slice(lineStart, position);
  return /^ *$/.test(indent) ? indent : "";
}

function detectEol(text) {
  const lineEnd = text.indexOf("\n");
  return lineEnd > 0 && text[lineEnd - 1] === "\r" ? "\r\n" : "\n";
}

function isOutside(relative) {
  return relative === ".." || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative);
}

function isFile(file) {
  try {
    return fs.statSync(file).isFile();
  } catch {
    return false;
  }
}

function slash(value) {
  return value.split(path.sep).join("/");
}

const isMain =
  process.argv[1] &&
  pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url;

if (isMain) {
  try {
    await run();
  } catch (error) {
    console.error(`error: ${error.message}`);
    process.exitCode = 1;
  }
}
