import { access, cp, mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import { isPrivateContentPath } from "../src/lib/content-paths.mjs";

const root = process.cwd();
const contentDir = path.join(root, "content");
const distDir = path.join(root, "dist");

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const source = path.join(dir, entry.name);
    const relative = path.relative(contentDir, source);

    // Dot-segment paths (.gitkeep, .DS_Store, caches, secrets) are never published.
    if (isPrivateContentPath(relative)) {
      continue;
    }

    if (entry.isDirectory()) {
      await walk(source);
      continue;
    }

    if (entry.name.endsWith(".md")) {
      continue;
    }

    const target = path.join(distDir, relative);
    await mkdir(path.dirname(target), { recursive: true });
    await cp(source, target);
  }
}

await walk(contentDir);

for (const cloudflareFile of ["_headers", "_redirects"]) {
  const source = path.join(root, "public", cloudflareFile);
  if (await exists(source)) {
    await cp(source, path.join(distDir, cloudflareFile));
  }
}

async function exists(file) {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}
