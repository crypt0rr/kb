import { execFileSync } from "node:child_process";

let cachedBuildYear;

// Dates rendered into pages come from a build input instead of the wall clock,
// so two builds of the same commit produce identical HTML. SOURCE_DATE_EPOCH
// follows the reproducible-builds convention; otherwise the HEAD commit time is
// used, and the wall clock is only a fallback outside a git checkout.
export function resolveBuildDate({
  env = process.env,
  readCommitTime = readGitCommitTime,
  now = () => new Date()
} = {}) {
  return parseEpochSeconds(env.SOURCE_DATE_EPOCH) ?? parseEpochSeconds(readCommitTime()) ?? now();
}

export function getBuildYear() {
  cachedBuildYear ??= resolveBuildDate().getUTCFullYear();
  return cachedBuildYear;
}

export function parseEpochSeconds(value) {
  const text = String(value ?? "").trim();
  if (!/^\d+$/.test(text)) return undefined;
  const date = new Date(Number(text) * 1000);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

function readGitCommitTime() {
  try {
    return execFileSync("git", ["log", "-1", "--format=%ct"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"]
    });
  } catch {
    return undefined;
  }
}
