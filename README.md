# Knowledge Base (kb)

Just some silly notes digitalized, have fun and feel free to open PR.

Live version of the site is available on [kb.offsec.nl](https://kb.offsec.nl).

## Run Locally?

```plain
git clone https://github.com/crypt0rr/kb
cd kb
npm ci
npm run dev -- --host 127.0.0.1
```

Use the Node.js version in `.node-version`.

## Checks

```plain
npm run check
npm run check:content
npm run check:links
npm run audit:known
npm run build
npm run smoke
```

The build renders the Astro site, copies non-Markdown files from `content/`
into `dist/`, generates an asset manifest with SHA256 hashes, and then builds
the Pagefind search index.

`npm run check:content` validates frontmatter, shortcodes, references, and
downloadable content assets. New files under `content/**/files/` must be
referenced by a `resources` or `attachments` shortcode unless they are an
intentional mirror/bulk asset listed in `scripts/content-policy.json`.
`npm run check:links` validates internal Markdown links, anchors, images, and
downloadable assets. External links are inventoried without network calls.

## Security Notes

`npm audit` currently reports upstream `esbuild` advisories through Astro/Vite.
Use `npm run audit:known` in CI and local checks: it allows only the documented
Astro/Vite/esbuild advisory chain and fails on any new vulnerability. Do not run
`npm audit fix --force` for that advisory, because npm currently proposes an
invalid Astro downgrade path. Keep Astro/Vite updated through Renovate and review
the advisory again when a compatible upstream fix is available.

## Contributing

Feel free to open a PR with your content/changes. Some rules:

- Markdown styling as used in other content;
- Content is UTF-8;
- Single file size limit 25MB unless explicitly allowlisted in `scripts/content-policy.json`;
- Non-Markdown files in `content/` are published as downloadable assets;
- PR naming describes content.

## License

[GNU GPLv3](https://github.com/crypt0rr/kb/blob/master/LICENSE)
