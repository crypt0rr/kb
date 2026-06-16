import { parseDocument } from "yaml";

const delimiter = "---";

export function parseFrontmatter(source, file = "content") {
  const cleanSource = String(source).replace(/^\uFEFF/, "");

  if (!cleanSource.startsWith(`${delimiter}\n`) && !cleanSource.startsWith(`${delimiter}\r\n`)) {
    return { data: {}, content: cleanSource };
  }

  const firstLineEnd = cleanSource.indexOf("\n");
  const bodyStart = firstLineEnd + 1;
  const closing = findClosingDelimiter(cleanSource, bodyStart);

  if (closing === -1) {
    throw new Error(`${file}: missing closing frontmatter delimiter`);
  }

  const frontmatter = cleanSource.slice(bodyStart, closing.start);
  const content = cleanSource.slice(closing.end).replace(/^\r?\n/, "");
  const document = parseDocument(frontmatter, { merge: true, prettyErrors: false });

  if (document.errors.length) {
    throw new Error(`${file}: invalid frontmatter YAML: ${document.errors[0].message}`);
  }

  const data = document.toJSON() ?? {};
  if (!isPlainObject(data)) {
    throw new Error(`${file}: frontmatter must be a YAML object`);
  }

  return { data, content };
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
