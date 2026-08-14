import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";

export const manifestSchemaVersion = 1;
export const manifestSource = "https://live.sysinternals.com";

export function createManifest(entries) {
  const files = Object.fromEntries(
    [...entries]
      .sort((a, b) => a.relative.localeCompare(b.relative))
      .map((entry) => [
        entry.relative,
        {
          size: entry.size,
          sha256: entry.sha256
        }
      ])
  );

  return {
    schemaVersion: manifestSchemaVersion,
    source: manifestSource,
    files
  };
}

export function validateManifest(manifest) {
  if (!manifest || manifest.schemaVersion !== manifestSchemaVersion) {
    throw new Error(`Sysinternals manifest schema must be ${manifestSchemaVersion}`);
  }
  if (manifest.source !== manifestSource) {
    throw new Error(`Sysinternals manifest source must be ${manifestSource}`);
  }
  if (!manifest.files || typeof manifest.files !== "object" || Array.isArray(manifest.files)) {
    throw new Error("Sysinternals manifest files must be an object");
  }

  for (const [relative, entry] of Object.entries(manifest.files)) {
    if (!Number.isInteger(entry?.size) || entry.size < 0) {
      throw new Error(`Sysinternals manifest size is invalid for ${relative}`);
    }
    if (!/^[a-f0-9]{64}$/i.test(entry.sha256 ?? "")) {
      throw new Error(`Sysinternals manifest SHA-256 is invalid for ${relative}`);
    }
  }

  return manifest;
}

export function hashFile(absolute) {
  return new Promise((resolve, reject) => {
    const hash = createHash("sha256");
    const stream = createReadStream(absolute);
    stream.on("data", (chunk) => hash.update(chunk));
    stream.on("error", reject);
    stream.on("end", () => resolve(hash.digest("hex")));
  });
}
