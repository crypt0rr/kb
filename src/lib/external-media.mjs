import { collectMarkdownTargets } from "./content-graph.mjs";

/**
 * The deployed CSP (`public/_headers`) only allows same-origin media
 * (`img-src 'self' data:`, `media-src 'self'`), so a page that embeds an
 * absolute or protocol-relative source renders a broken image or player.
 */
export const EXTERNAL_MEDIA_HINT =
  "the site CSP only allows same-origin media (img-src/media-src 'self'), so browsers block it; " +
  "download the file into the page's images/ directory and reference it relatively";

// Frames and scripts are covered by frame-src/script-src, and the site has
// shortcodes for the only embeds it supports.
const elementHints = {
  iframe:
    "the site CSP only allows same-origin frames plus youtube-nocookie.com (frame-src); " +
    "use the {{< youtube ID >}} shortcode for YouTube videos and link to anything else",
  script:
    "the site CSP does not allow third-party scripts (script-src); " +
    "use the {{< gist user id >}} shortcode for gists and link to anything else"
};

/** Build the check:content message for one collected source. */
export function describeExternalSource({ value, element }) {
  if (elementHints[element]) return `external ${element} source ${value}; ${elementHints[element]}`;
  return `external media source ${value}; ${EXTERNAL_MEDIA_HINT}`;
}

// A sentinel origin: anything that resolves elsewhere is another origin to the CSP.
const pageUrl = new URL("https://same-origin.invalid/section/page/");

/**
 * Resolve the value like a browser does on a site page. This also catches
 * forms such as `\\host/a.png` or `http:host/a.png` that browsers treat as
 * absolute URLs.
 */
export function isExternalSource(value) {
  let url;
  try {
    url = new URL(String(value ?? "").trim(), pageUrl);
  } catch {
    return false;
  }
  return (url.protocol === "http:" || url.protocol === "https:") && url.origin !== pageUrl.origin;
}

/**
 * Find Markdown images and raw HTML src/srcset/poster values that point to
 * another origin. Code blocks are ignored because targets come from the
 * Markdown token stream.
 */
export function collectExternalMediaSources(source) {
  return collectMarkdownTargets(source)
    .filter((target) => target.kind === "asset" && isExternalSource(target.value))
    .map(({ value, line, attribute, element }) => ({
      value: String(value).trim(),
      line,
      attribute: attribute ?? "image",
      element: element ?? "img"
    }));
}
