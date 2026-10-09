import { parseDocument } from "yaml";

const delimiter = "---";

export const frontmatterYamlOptions = Object.freeze({ merge: true, prettyErrors: false });

export function parseFrontmatter(source, file = "content") {
  const located = locateFrontmatter(source, file);

  if (!located.hasFrontmatter) {
    return { data: {}, content: located.source };
  }

  const frontmatter = located.source.slice(located.start, located.end);
  const content = located.source.slice(located.closingEnd).replace(/^\r?\n/, "");
  const document = parseDocument(frontmatter, frontmatterYamlOptions);

  if (document.errors.length) {
    throw new Error(`${file}: invalid frontmatter YAML: ${document.errors[0].message}`);
  }

  const data = document.toJSON() ?? {};
  if (!isPlainObject(data)) {
    throw new Error(`${file}: frontmatter must be a YAML object`);
  }

  return { data, content };
}

// Splits a file exactly like parseFrontmatter without parsing the YAML, so
// tools that edit frontmatter in place agree with the parser on its bounds.
// Offsets index into `source` (the input without an optional UTF-8 BOM): the
// YAML text is source.slice(start, end) and the closing delimiter line ends at
// closingEnd. `eol` is the line ending of the opening delimiter.
export function locateFrontmatter(source, file = "content") {
  const text = String(source);
  const bom = text.startsWith("﻿") ? "﻿" : "";
  const cleanSource = text.slice(bom.length);

  if (!cleanSource.startsWith(`${delimiter}\n`) && !cleanSource.startsWith(`${delimiter}\r\n`)) {
    return { hasFrontmatter: false, bom, source: cleanSource };
  }

  const firstLineEnd = cleanSource.indexOf("\n");
  const bodyStart = firstLineEnd + 1;
  const closing = findClosingDelimiter(cleanSource, bodyStart);

  if (closing === -1) {
    throw new Error(`${file}: missing closing frontmatter delimiter`);
  }

  return {
    hasFrontmatter: true,
    bom,
    source: cleanSource,
    eol: cleanSource[firstLineEnd - 1] === "\r" ? "\r\n" : "\n",
    start: bodyStart,
    end: closing.start,
    closingEnd: closing.end
  };
}

function findClosingDelimiter(source, start) {
  let lineStart = start;

  while (lineStart < source.length) {
    const lineEnd = source.indexOf("\n", lineStart);
    const end = lineEnd === -1 ? source.length : lineEnd;
    const line = source.slice(lineStart, end).replace(/\r$/, "");

    if (line === delimiter) {
      return {
        start: lineStart,
        end: lineEnd === -1 ? end : lineEnd + 1
      };
    }

    if (lineEnd === -1) break;
    lineStart = lineEnd + 1;
  }

  return -1;
}

function isPlainObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}
