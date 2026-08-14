const safeSegmentPattern = /^[A-Za-z0-9_-]+$/;

export function isValidYoutubeId(value) {
  return safeSegmentPattern.test(String(value).trim());
}

export function parseGistReference(value) {
  const parts = String(value).trim().split(/\s+/).filter(Boolean);
  if (parts.length !== 2 || parts.some((part) => !safeSegmentPattern.test(part))) {
    return null;
  }

  return { owner: parts[0], gistId: parts[1] };
}
