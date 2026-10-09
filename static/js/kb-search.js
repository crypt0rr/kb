// Pure search helpers shared by kb-app.js and the unit tests. Nothing here
// touches the DOM or Pagefind, so the request and markup rules can be tested
// in Node.

export const MAX_RESULTS = 12;

// Returns the Pagefind arguments for the current query and filters, or null
// when there is nothing to search. An empty query with a section or tag filter
// becomes a filter-only search (term null), which lists every matching page.
export function buildSearchRequest({ query = "", section = "", tag = "" } = {}) {
  const term = String(query ?? "").trim().toLowerCase();
  const filters = {};
  if (section) filters.section = section;
  if (tag) filters.tag = tag;
  const hasFilters = Object.keys(filters).length > 0;

  if (!term && !hasFilters) return null;
  return { term: term || null, options: hasFilters ? { filters } : undefined };
}

export function formatResultCount(shown, total) {
  const noun = total === 1 ? "result" : "results";
  return shown < total ? `showing ${shown} of ${total} ${noun}` : `${total} ${noun}`;
}

// Renders the loaded result data; total is the full match count, which may be
// larger than the number of results shown.
export function renderSearchResults(results, total = results.length) {
  if (!results.length) return '<p class="search-status" role="status">no results</p>';

  return `<p class="search-status" role="status">${formatResultCount(results.length, total)}</p>${results
    .map(
      (result) => `<a href="${escapeAttr(result.url)}">
            <strong>${escapeHtml(result.meta?.title || result.url)}</strong>
            ${result.meta?.section ? `<small>${escapeHtml(result.meta.section)}</small>` : ""}
            <p>${sanitizePagefindExcerpt(result.excerpt || result.url)}</p>
          </a>`
    )
    .join("")}`;
}

export function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function escapeAttr(value) {
  return escapeHtml(value).replace(/'/g, "&#39;");
}

export function sanitizePagefindExcerpt(value) {
  return escapeHtml(value)
    .replaceAll("&lt;mark&gt;", "<mark>")
    .replaceAll("&lt;/mark&gt;", "</mark>");
}
