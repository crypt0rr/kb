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
npm run check:assets
npm run check:content
npm run check:links
npm run audit:known
npm run sysinternals:check
npm run content:review
npm run content:graph
npm test
npm run doctor
npm run build
npm run smoke
npm run validate
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
`npm run validate` runs the full local validation gate.

`npm test` runs focused parser and content-contract tests. `npm run doctor`
checks the Node.js version, required project paths, and local npm availability.

The scheduled `Check external links` workflow creates a report of reachable
external URLs without blocking content builds.

`npm run content:review` scans all publishable pages and writes a maintainer-only
review queue to `.reports/content-review.md` plus a complete JSON report at
`.reports/content-review.json`. It always reports missing `lastReviewed` values,
marks pages stale when their effective review date is more than 12 months old,
and never changes frontmatter or fails a content build. The report uses the same
effective metadata index as the site and includes field provenance plus a
deterministic priority score, so inherited metadata cannot silently diverge
between the site and maintenance checks. Reports use non-strict mode to record
malformed cascade metadata for maintainers, while the site remains strict. The
scheduled `Content freshness review` workflow uploads the same reports weekly
and adds a summary to the workflow run. Markdown shows the oldest 100 queue
entries by default (`--limit` changes this); JSON contains the complete corpus,
field provenance, and priority data for future tooling.

`npm run content:graph` builds the same canonical page index into a deterministic
relationship report at `.reports/content-graph.md` and a complete
`.reports/content-graph.json`. It includes explicit Markdown and `ref` shortcode
references, incoming/outgoing counts, and pages without explicit references.
Those pages are not necessarily disconnected: the site still provides hierarchy
and shared-tag navigation. The weekly content review workflow uploads both graph
formats alongside the freshness queue.

Content pages may optionally define `lastReviewed` (`YYYY-MM-DD`), `status`
(`active`, `deprecated`, or `archived`), and `platforms` (a string or list of
strings). These fields power freshness and compatibility hints without being
required for existing pages.

Section `_index.md` files may also define a `cascade` mapping. Its metadata is
inherited by descendant pages unless a closer section or the page itself
provides an explicit value. This preserves the existing Hugo-style taxonomy
without rewriting content frontmatter. The content checker validates cascade
values, including the legacy `tags= [...]` form, and the site normalizes known
tag aliases such as `Wirehark` to `Wireshark`.

Use `npm run sysinternals:check` to compare the published Sysinternals files
with `https://live.sysinternals.com/`. Use `npm run sysinternals:sync` to
download missing or changed root and ARM64 files. The sync workflow skips live
directories, marker files, and files over the 25MB Cloudflare Pages limit.

## Security Notes

`npm run audit:known` expects a clean `npm audit` result and fails on any
reported vulnerability. Keep Astro/Vite updated through Renovate and review
dependency advisories before adding any exception.

## Contributing

Feel free to open a PR with your content/changes. Some rules:

- Markdown styling as used in other content;
- Content is UTF-8;
- Single file size limit 25MB;
- Non-Markdown files in `content/` are published as downloadable assets;
- PR naming describes content.

## License

[GNU GPLv3](https://github.com/crypt0rr/kb/blob/master/LICENSE)
