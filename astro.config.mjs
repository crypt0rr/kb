import fs from "node:fs";
import path from "node:path";
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

const contentAssetsDevServer = {
  name: "content-assets-dev-server",
  configureServer(server) {
    server.middlewares.use((request, response, next) => {
      if (!request.url) return next();

      const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
      const relativePath = pathname.replace(/^\/+/, "");
      const filePath = path.resolve(process.cwd(), "content", relativePath);
      const contentRoot = path.resolve(process.cwd(), "content");

      if (!filePath.startsWith(`${contentRoot}${path.sep}`)) return next();
      if (filePath.endsWith(".md")) return next();
      if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) return next();

      response.setHeader("content-type", mimeType(filePath));
      fs.createReadStream(filePath).pipe(response);
    });
  }
};

export default defineConfig({
  site: "https://kb.offsec.nl",
  output: "static",
  publicDir: "./static",
  integrations: [sitemap()],
  vite: {
    plugins: [contentAssetsDevServer]
  },
  build: {
    format: "directory",
    outDir: "./dist"
  },
  markdown: {
    syntaxHighlight: "shiki"
  }
});

function mimeType(filePath) {
  const extension = path.extname(filePath).toLowerCase();
  return (
    {
      ".avif": "image/avif",
      ".css": "text/css; charset=utf-8",
      ".gif": "image/gif",
      ".html": "text/html; charset=utf-8",
      ".jpeg": "image/jpeg",
      ".jpg": "image/jpeg",
      ".js": "text/javascript; charset=utf-8",
      ".json": "application/json; charset=utf-8",
      ".mp4": "video/mp4",
      ".pdf": "application/pdf",
      ".png": "image/png",
      ".svg": "image/svg+xml",
      ".txt": "text/plain; charset=utf-8",
      ".webp": "image/webp",
      ".zip": "application/zip"
    }[extension] ?? "application/octet-stream"
  );
}
