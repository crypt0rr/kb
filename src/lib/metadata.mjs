import { parseFrontmatter } from "./frontmatter.mjs";

const tagAliases = new Map([
  ["hash-cracking", "Hash Cracking"],
  ["wirehark", "Wireshark"]
]);

export function parseCascade(value, file = "content") {
  if (value === undefined || value === null) return {};

  if (isPlainObject(value)) {
    if (Object.hasOwn(value, "cascade")) {
      throw new Error(`${file}: cascade cannot contain another cascade`);
    }
    return { ...value };
  }

  if (typeof value === "string") {
    const legacy = value.trim().match(/^([A-Za-z][A-Za-z0-9_-]*)\s*=\s*([\s\S]+)$/);
    if (!legacy) {
      throw new Error(`${file}: cascade must be a YAML object`);
    }

    try {
      return parseFrontmatter(
        `---\n${legacy[1]}: ${legacy[2]}\n---\n`,
        `${file} cascade`
      ).data;
    } catch (error) {
      throw new Error(`${file}: invalid cascade value: ${error.message}`);
    }
  }

  throw new Error(`${file}: cascade must be a YAML object`);
}

export function resolveInheritedFrontmatter(page, byUrl) {
  return resolveInheritedMetadata(page, byUrl).frontmatter;
}

export function resolveInheritedMetadata(page, byUrl, options = {}) {
  const strict = options.strict ?? true;
  const ancestors = [];
  const visited = new Set();
  const errors = [];
  let current = page.parentUrl ? byUrl.get(page.parentUrl) : undefined;

  while (current) {
    if (visited.has(current.url)) {
      const error = new Error(`metadata inheritance cycle detected at ${current.url}`);
      if (strict) throw error;
      errors.push(error.message);
      break;
    }
    visited.add(current.url);
    ancestors.unshift(current);
    current = current.parentUrl ? byUrl.get(current.parentUrl) : undefined;
  }

  const inherited = {};
  const provenance = {};
  for (const ancestor of ancestors) {
    let cascade;
    try {
      cascade = parseCascade(ancestor.frontmatter.cascade, ancestor.relativeFile);
    } catch (error) {
      if (strict) throw error;
      errors.push(error.message);
      continue;
    }

    for (const [field, value] of Object.entries(cascade)) {
      inherited[field] = value;
      provenance[field] = {
        source: ancestor.relativeFile,
        kind: "cascade"
      };
    }
  }

  if (page.frontmatter.cascade !== undefined) {
    try {
      parseCascade(page.frontmatter.cascade, page.relativeFile);
    } catch (error) {
      if (strict) throw error;
      errors.push(error.message);
    }
  }

  for (const field of Object.keys(page.frontmatter)) {
    provenance[field] = {
      source: page.relativeFile,
      kind: "explicit"
    };
  }

  return {
    frontmatter: normalizeFrontmatter({ ...inherited, ...page.frontmatter }),
    provenance,
    errors
  };
}

export function normalizeFrontmatter(frontmatter) {
  const normalized = { ...frontmatter };

  if (normalized.tags !== undefined) {
    normalized.tags = [...new Set(uniqueStrings(normalized.tags).map(canonicalTag))];
  }
  if (normalized.platforms !== undefined) {
    normalized.platforms = uniqueStrings(normalized.platforms);
  }
  if (normalized.status !== undefined) {
    normalized.status = String(normalized.status).trim().toLowerCase();
  }

  return normalized;
}

export function canonicalTag(value) {
  const label = String(value ?? "").trim();
  return tagAliases.get(tagKey(label)) ?? label;
}

export function tagKey(value) {
  return slugify(String(value ?? ""));
}

export function uniqueStrings(value) {
  if (!value) return [];
  const values = Array.isArray(value) ? value : [value];
  return [...new Set(values.map((item) => String(item).trim()).filter(Boolean))];
}

function isPlainObject(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[\u0027\u0060\"]+/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
