// Shared publishing rules for files under content/. Any path segment that
// starts with "." (for example `.env` or `.git-credentials/token`) is private:
// it is never rendered as a page, copied to dist/, or listed in the public
// asset manifest.

// Housekeeping files that are skipped silently instead of being reported.
export const ignoredContentFiles = new Set([".DS_Store", ".gitkeep"]);

// Local tool caches that may exist in a working copy and are skipped silently.
export const ignoredContentDirectories = new Set([".rumdl_cache"]);

export function contentPathSegments(relativePath) {
  return String(relativePath ?? "")
    .split(/[\\/]+/)
    .filter(Boolean);
}

export function isPrivateContentPath(relativePath) {
  return contentPathSegments(relativePath).some((segment) => segment.startsWith("."));
}

// True for private paths that are expected housekeeping (a `.gitkeep` marker,
// a Finder `.DS_Store`, or anything inside an ignored cache directory) rather
// than an accidentally committed secret. Housekeeping names only count for
// files, so a directory named `.gitkeep` is still walked and reported.
export function isIgnoredContentPath(relativePath, { directory = false } = {}) {
  const segments = contentPathSegments(relativePath);
  if (!segments.length) return false;
  if (segments.slice(0, -1).some((segment) => ignoredContentDirectories.has(segment))) {
    return true;
  }
  const name = segments.at(-1);
  return directory ? ignoredContentDirectories.has(name) : ignoredContentFiles.has(name);
}
