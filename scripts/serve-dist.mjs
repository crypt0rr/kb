import { createReadStream, existsSync, readFileSync } from "node:fs";
import { realpath, stat } from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import { pathToFileURL } from "node:url";

/**
 * Serve the built site the way Cloudflare Pages does for the parts the browser
 * tests depend on: directory index files, content types, and the response
 * headers declared in `_headers` (CSP, COOP, CORP and friends). `astro preview`
 * ignores `_headers`, so tests run against it never see the production policy.
 */

export const DEFAULT_HOST = "127.0.0.1";
export const DEFAULT_PORT = 4321;
export const DEFAULT_DIR = "dist";

const contentTypes = {
  ".avif": "image/avif",
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".htm": "text/html; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".mp3": "audio/mpeg",
  ".mp4": "video/mp4",
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".wasm": "application/wasm",
  ".webm": "video/webm",
  ".webmanifest": "application/manifest+json",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".xml": "application/xml; charset=utf-8",
  ".zip": "application/zip"
};

// Cloudflare Pages never serves its own configuration files.
const hiddenFiles = new Set(["/_headers", "/_redirects", "/_routes.json"]);

/**
 * Parse Cloudflare Pages `_headers` syntax into ordered rules.
 *
 * A rule starts with an unindented URL pattern; the indented lines below it are
 * `Name: value` headers or `! Name` lines that detach a header set by an
 * earlier matching rule. Blank lines and `#` comments are ignored.
 */
export function parseHeadersFile(source) {
  const rules = [];
  let current = null;

  for (const [index, rawLine] of String(source).split(/\r?\n/).entries()) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;

    if (!/^\s/.test(rawLine)) {
      current = { pattern: line, set: [], detach: [] };
      rules.push(current);
      continue;
    }

    if (!current) {
      throw new Error(`_headers:${index + 1}: header line without a URL pattern`);
    }

    if (line.startsWith("!")) {
      const name = line.slice(1).trim();
      if (name) current.detach.push(name.toLowerCase());
      continue;
    }

    const separator = line.indexOf(":");
    if (separator <= 0) {
      throw new Error(`_headers:${index + 1}: expected "Name: value"`);
    }
    current.set.push([line.slice(0, separator).trim(), line.slice(separator + 1).trim()]);
  }

  return rules;
}

/**
 * Convert a `_headers` URL pattern into a RegExp for request pathnames.
 *
 * `*` is a greedy splat and `:name` matches one path segment. Patterns with a
 * scheme or host only constrain the path here, because the local server has a
 * single origin.
 */
export function compileHeaderPattern(pattern) {
  const pathPattern = String(pattern).replace(/^(?:https?:)?\/\/[^/]*/i, "") || "/";
  let source = "^";

  for (let index = 0; index < pathPattern.length; index += 1) {
    const char = pathPattern[index];

    if (char === "*") {
      source += ".*";
      continue;
    }

    if (char === ":") {
      const name = /^:[A-Za-z]\w*/.exec(pathPattern.slice(index));
      if (name) {
        source += "[^/]+";
        index += name[0].length - 1;
        continue;
      }
    }

    source += char.replace(/[\\^$+?.()|[\]{}]/g, "\\$&");
  }

  return new RegExp(`${source}$`);
}

/**
 * Collect the headers for a pathname. Values for a header set by several
 * matching rules are joined with ", " like Cloudflare Pages does, and a
 * detached header is removed no matter which matching rule set it.
 */
export function headersForPath(rules, pathname) {
  const headers = new Map();
  const detached = new Set();

  for (const rule of rules) {
    if (!compileHeaderPattern(rule.pattern).test(pathname)) continue;

    for (const [name, value] of rule.set) {
      const key = name.toLowerCase();
      const existing = headers.get(key);
      headers.set(
        key,
        existing ? { name: existing.name, value: `${existing.value}, ${value}` } : { name, value }
      );
    }

    for (const name of rule.detach) detached.add(name);
  }

  for (const name of detached) headers.delete(name);
  return Object.fromEntries([...headers.values()].map(({ name, value }) => [name, value]));
}

export function contentTypeFor(file) {
  return contentTypes[path.extname(file).toLowerCase()] ?? "application/octet-stream";
}

/**
 * Map a request pathname to a file below `rootDir`.
 *
 * Returns `{ file }`, `{ redirect }` for directories requested without a
 * trailing slash, or `null` when nothing should be served. The lexical check
 * rejects `..` escapes; `realpath` rejects symlinks that leave the root.
 */
export async function resolveRequestPath(rootDir, pathname) {
  let decoded;
  try {
    decoded = decodeURIComponent(pathname);
  } catch {
    return null;
  }

  if (!decoded.startsWith("/") || decoded.includes("\0") || decoded.includes("\\")) return null;
  if (hiddenFiles.has(decoded)) return null;

  const root = path.resolve(rootDir);
  const candidate = path.resolve(root, `.${decoded}`);
  if (candidate !== root && !candidate.startsWith(`${root}${path.sep}`)) return null;

  const info = await statOrNull(candidate);
  if (!info) return null;

  let file = candidate;
  if (info.isDirectory()) {
    if (!decoded.endsWith("/")) return { redirect: `${pathname}/` };
    file = path.join(candidate, "index.html");
    const indexInfo = await statOrNull(file);
    if (!indexInfo?.isFile()) return null;
  } else if (!info.isFile() || decoded.endsWith("/")) {
    return null;
  }

  const realRoot = await realpath(root);
  const realFile = await realpath(file);
  if (!realFile.startsWith(`${realRoot}${path.sep}`)) return null;

  return { file: realFile };
}

export function createDistServer({ dir = DEFAULT_DIR, headersFile } = {}) {
  const rootDir = path.resolve(dir);
  const rules = parseHeadersFile(readFileSync(headersFile ?? findHeadersFile(rootDir), "utf8"));
  const notFoundPage = path.join(rootDir, "404.html");

  return http.createServer(async (request, response) => {
    let pathname = "/";
    try {
      pathname = new URL(request.url ?? "/", "http://localhost").pathname;
    } catch {
      // Fall through with "/" so malformed request targets still get headers.
    }

    for (const [name, value] of Object.entries(headersForPath(rules, pathname))) {
      response.setHeader(name, value);
    }

    if (request.method !== "GET" && request.method !== "HEAD") {
      response.writeHead(405, { allow: "GET, HEAD" }).end();
      return;
    }

    try {
      const resolved = await resolveRequestPath(rootDir, pathname);

      if (resolved?.redirect) {
        response.writeHead(308, { location: resolved.redirect }).end();
        return;
      }

      if (!resolved) {
        const hasNotFoundPage = existsSync(notFoundPage);
        await sendFile(request, response, 404, hasNotFoundPage ? notFoundPage : null);
        return;
      }

      await sendFile(request, response, 200, resolved.file);
    } catch (error) {
      if (!response.headersSent) response.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
      response.end(`Internal error: ${error.message}\n`);
    }
  });
}

async function sendFile(request, response, status, file) {
  if (!file) {
    response.writeHead(status, { "content-type": "text/plain; charset=utf-8" }).end("Not found\n");
    return;
  }

  const info = await stat(file);
  response.writeHead(status, {
    "content-type": contentTypeFor(file),
    "content-length": info.size
  });

  if (request.method === "HEAD") {
    response.end();
    return;
  }

  createReadStream(file).pipe(response);
}

function findHeadersFile(rootDir) {
  const candidates = [path.join(rootDir, "_headers"), path.resolve("public", "_headers")];
  const found = candidates.find((candidate) => existsSync(candidate));
  if (!found) throw new Error(`no _headers file found in ${candidates.join(" or ")}`);
  return found;
}

async function statOrNull(file) {
  try {
    return await stat(file);
  } catch {
    return null;
  }
}

export function parseArgs(argv) {
  const options = { host: DEFAULT_HOST, port: DEFAULT_PORT, dir: DEFAULT_DIR };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    const [flag, inlineValue] = arg.split(/=(.*)/s, 2);
    if (!["--host", "--port", "--dir"].includes(flag)) {
      throw new Error(`unknown argument ${arg}`);
    }

    const value = inlineValue ?? argv[++index];
    if (value === undefined || value === "") throw new Error(`${flag} requires a value`);
    options[flag.slice(2)] = value;
  }

  const port = Number(options.port);
  if (!Number.isInteger(port) || port < 0 || port > 65_535) {
    throw new Error(`invalid --port ${options.port}`);
  }

  return { ...options, port };
}

const isMain =
  process.argv[1] &&
  pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url;

if (isMain) {
  try {
    const options = parseArgs(process.argv.slice(2));
    if (!existsSync(options.dir)) {
      throw new Error(`${options.dir} does not exist; run npm run build first`);
    }

    const server = createDistServer({ dir: options.dir });
    server.listen(options.port, options.host, () => {
      const { port } = server.address();
      console.log(`Serving ${options.dir} with _headers at http://${options.host}:${port}/`);
    });
  } catch (error) {
    console.error(`error: ${error.message}`);
    process.exitCode = 1;
  }
}
