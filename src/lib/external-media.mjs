import { collectMarkdownTargets } from "./content-graph.mjs";

/**
 * The deployed CSP (`public/_headers`) only allows same-origin media
 * (`img-src 'self' data:`, `media-src 'self'`), so a page that embeds an
 * absolute or protocol-relative source renders a broken image or player.
 */
export const EXTERNAL_MEDIA_HINT =
  "the site CSP only allows same-origin media (img-src/media-src 'self'), so browsers block it; " +
  "download the file into the page's images/ directory and reference it relatively";

export function isExternalSource(value) {
  return /^(?:https?:)?\/\//i.test(String(value ?? "").trim());
}

/**
 * Find Markdown images and raw HTML src/srcset/poster values that point to
 * another origin. Code blocks are ignored because targets come from the
 * Markdown token stream.
 */
export function collectExternalMediaSources(source) {
  return collectMarkdownTargets(source)
    .filter((target) => target.kind === "asset" && isExternalSource(target.value))
    .map(({ value, line, attribute }) => ({
      value: String(value).trim(),
      line,
      attribute: attribute ?? "image"
    }));
}
