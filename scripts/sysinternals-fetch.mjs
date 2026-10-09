import { createWriteStream } from "node:fs";
import { rename, rm, stat } from "node:fs/promises";
import https from "node:https";
import { hashFile, manifestSource } from "./sysinternals-manifest.mjs";

export const DEFAULT_TIMEOUT_MS = 30_000;
export const MAX_REDIRECTS = 5;
export const SAFE_NAME_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._-]*$/;

export function parseListing(html) {
  const entries = [];
  const matcher = /(?:&lt;dir&gt;|(\d+))\s+<A HREF="([^"]+)">([^<]+)<\/A>/gi;
  let match;
  while ((match = matcher.exec(html))) {
    if (!match[1]) continue;
    entries.push({
      href: match[2],
      name: match[3],
      size: Number(match[1])
    });
  }
  return entries;
}

// Upstream names become filesystem paths and hrefs become download URLs, so
// reject anything that could escape the mirror directory or leave the origin.
export function validateListingEntry(entry, base = manifestSource) {
  const name = String(entry?.name ?? "");
  const href = String(entry?.href ?? "");

  if (!SAFE_NAME_PATTERN.test(name) || name.includes("..")) {
    throw new Error(
      `Sysinternals listing entry has an unsafe name "${name}"; expected ${SAFE_NAME_PATTERN} without ".."`
    );
  }

  if (!isSameOriginPath(href, base)) {
    throw new Error(
      `Sysinternals listing entry "${name}" has an unsafe href "${href}"; expected a same-origin absolute path on ${new URL(base).origin}`
    );
  }

  if (!Number.isSafeInteger(entry.size) || entry.size < 0) {
    throw new Error(`Sysinternals listing entry "${name}" has an invalid size "${entry.size}"`);
  }

  return entry;
}

export function parseValidatedListing(html, base = manifestSource) {
  return parseListing(html).map((entry) => validateListingEntry(entry, base));
}

function isSameOriginPath(href, base) {
  if (!href.startsWith("/") || href.startsWith("//") || href.includes("\\")) return false;

  let url;
  try {
    url = new URL(href, base);
  } catch {
    return false;
  }

  if (url.origin !== new URL(base).origin) return false;
  return !href
    .split(/[?#]/, 1)[0]
    .split("/")
    .some((segment) => {
      try {
        return decodeURIComponent(segment) === "..";
      } catch {
        return true;
      }
    });
}

// Production uses HTTPS only. Tests may inject another transport (for example
// node:http against a local server) together with its protocol and a short timeout.
export function createSysinternalsClient({
  transport = https,
  protocol = "https:",
  timeoutMs = DEFAULT_TIMEOUT_MS,
  maxRedirects = MAX_REDIRECTS
} = {}) {
  function openResponse(url, redirects = 0) {
    return new Promise((resolve, reject) => {
      let parsed;
      try {
        parsed = new URL(url);
      } catch {
        reject(new Error(`${url}: invalid URL`));
        return;
      }
      if (parsed.protocol !== protocol) {
        reject(new Error(`${url}: only ${protocol} URLs are allowed`));
        return;
      }

      let response;
      const request = transport.get(parsed, (incoming) => {
        response = incoming;
        const { statusCode, headers } = incoming;

        if (statusCode >= 300 && statusCode < 400 && headers.location) {
          incoming.resume();
          if (redirects >= maxRedirects) {
            reject(new Error(`${url}: too many redirects`));
            return;
          }
          resolve(openResponse(new URL(headers.location, url).href, redirects + 1));
          return;
        }

        if (statusCode !== 200) {
          incoming.resume();
          reject(new Error(`${url}: HTTP ${statusCode}`));
          return;
        }

        resolve(incoming);
      });

      // Idle socket timeout: covers connect, waiting for headers, and stalled bodies.
      request.setTimeout(timeoutMs, () => {
        const error = new Error(`${url}: request timed out after ${timeoutMs} ms without activity`);
        error.code = "ETIMEDOUT";
        reject(error);
        response?.destroy(error);
        request.destroy(error);
      });
      request.on("error", (error) => reject(withUrl(url, error)));
    });
  }

  async function fetchBuffer(url) {
    const response = await openResponse(url);
    return new Promise((resolve, reject) => {
      const chunks = [];
      response.on("data", (chunk) => chunks.push(chunk));
      response.on("end", () => resolve(Buffer.concat(chunks)));
      watchIncomplete(response, url, reject);
    });
  }

  async function fetchText(url) {
    return (await fetchBuffer(url)).toString("utf8");
  }

  async function downloadToFile(url, target) {
    const response = await openResponse(url);
    await new Promise((resolve, reject) => {
      const file = createWriteStream(target);
      let failure;
      const fail = (error) => {
        if (failure) return;
        failure = error;
        response.destroy();
        file.destroy();
      };

      // Settle only after the file handle is closed so callers can remove it.
      file.on("close", () => (failure ? reject(failure) : resolve()));
      file.on("error", (error) => fail(new Error(`${target}: ${error.message}`, { cause: error })));
      watchIncomplete(response, url, fail);
      response.pipe(file);
    });
  }

  // Downloads into `${target}.download`, verifies size and SHA-256, then
  // renames atomically. The temporary file is always removed on failure.
  async function downloadVerified({ url, target, size, sha256, label = target }) {
    const temporary = `${target}.download`;
    try {
      await downloadToFile(url, temporary);
      const fileStat = await stat(temporary);
      if (fileStat.size !== size) {
        throw new Error(`${label}: expected ${size} byte(s), got ${fileStat.size}`);
      }
      if ((await hashFile(temporary)) !== sha256) {
        throw new Error(`${label}: downloaded SHA-256 does not match the reviewed manifest`);
      }
      await rename(temporary, target);
    } finally {
      await rm(temporary, { force: true });
    }
  }

  return { fetchBuffer, fetchText, downloadToFile, downloadVerified };
}

// `aborted` fires before `error` when a response is destroyed with an error
// (for example by the timeout), so prefer the recorded cause when present.
function watchIncomplete(response, url, fail) {
  const failWith = (message) =>
    fail(response.errored ? withUrl(url, response.errored) : new Error(`${url}: ${message}`));

  response.on("error", (error) => fail(withUrl(url, error)));
  response.on("aborted", () => failWith("response aborted before completion"));
  response.on("close", () => {
    if (!response.complete) failWith("connection closed before the response completed");
  });
}

function withUrl(url, error) {
  if (error.message.startsWith(`${url}:`)) return error;
  return new Error(`${url}: ${error.message}`, { cause: error });
}
