import { access, cp, mkdir, readdir } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const contentDir = path.join(root, "content");
const distDir = path.join(root, "dist");
const ignored = new Set([".gitkeep"]);

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const source = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(source);
      continue;
    }

    if (entry.name.endsWith(".md") || ignored.has(entry.name)) {
      continue;
    }

    const relative = path.relative(contentDir, source);
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
