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
  const ancestors = [];
  const visited = new Set();
  let current = page.parentUrl ? byUrl.get(page.parentUrl) : undefined;

  while (current) {
    if (visited.has(current.url)) {
      throw new Error(`metadata inheritance cycle detected at ${current.url}`);
    }
    visited.add(current.url);
    ancestors.unshift(current);
    current = current.parentUrl ? byUrl.get(current.parentUrl) : undefined;
  }

  const inherited = {};
  for (const ancestor of ancestors) {
    Object.assign(
      inherited,
      parseCascade(ancestor.frontmatter.cascade, ancestor.relativeFile)
    );
  }

  return normalizeFrontmatter({ ...inherited, ...page.frontmatter });
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
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[\u0027\u0060\"]+/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
