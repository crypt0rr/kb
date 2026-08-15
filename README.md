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
npm run check:external-links
npm run audit:known
npm run sysinternals:check
npm run content:review
npm run content:graph
npm run content:health
npm test
npm run doctor
npm run build
npm run smoke
npm run test:a11y
npm run validate
```

The build renders the Astro site, copies non-Markdown files from `content/`
into `dist/`, generates an asset manifest with SHA256 hashes, and then builds
the Pagefind search index.

The supported angle shortcodes are rendered through the static page pipeline:
`youtube` embeds use the privacy-preserving `youtube-nocookie.com` host and
`gist` renders as a CSP-safe link to GitHub. The content checker validates the
required identifiers for both forms; unsupported or malformed shortcodes must
be fixed before publishing.

`npm run check:content` validates frontmatter, shortcodes, references, and
downloadable content assets. New files under `content/**/files/` must be
referenced by a `resources` or `attachments` shortcode unless they are an
intentional mirror/bulk asset listed in `scripts/content-policy.json`.
`npm run check:links` validates internal Markdown links, anchors, images, and
downloadable assets. External links are inventoried without network calls.
`npm run validate` runs the full local validation gate.

`npm test` runs focused parser and content-contract tests. `npm run doctor`
checks the Node.js version, required project paths, and local npm availability.
`npm run test:a11y` builds the deployable static site, serves it with Astro
Preview, and runs the browser-level Playwright/Axe smoke suite against
representative routes and keyboard interactions. The `Browser accessibility
smoke tests` workflow runs the same check on pull requests, pushes to `main`,
and manual dispatches. For a first local run, install the test browser once
with `npx playwright install chromium`.

`npm run check:external-links` checks reachable external URLs and writes
Markdown plus complete JSON reports under `.reports/`. The scheduled and
manual `Check external links` workflow uploads both reports and adds the check
counts plus a short list of failures to the GitHub job summary. It remains
report-only: an unreachable external URL does not block content builds.

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

`npm run content:health` produces the maintainer-only Content Trust Ledger at
`.reports/content-health.md` and `.reports/content-health.json`. It combines the
freshness queue with metadata provenance, missing link/anchor/asset findings, and
explicit graph context into four derived states: **Verified**, **Review due**,
**Repair needed**, and **Context light**. The Markdown report shows the highest
priority 100 pages; JSON contains the complete corpus. The ledger is report-only:
it never backfills frontmatter or fails a content change solely because a page is
due for review. External and protocol URLs are inventoried but are not treated as
broken internal targets. The scheduled `Content freshness review` workflow runs
this command weekly or on manual dispatch and uploads both report formats.

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
with `https://live.sysinternals.com/`. The check uses the reviewed
`scripts/sysinternals-manifest.json` SHA-256 inventory, so an upstream listing
change requires an explicit `npm run sysinternals:refresh-manifest` review
before syncing. Use `npm run sysinternals:sync` to download missing or changed
root and ARM64 files; every replacement is checked against the manifest hash
before the atomic rename. Manifest refresh downloads temporary copies only; it
does not modify the mirrored files. The sync workflow skips live directories,
marker files, and files over the 25MB Cloudflare Pages limit.
The mirror path preserves upstream bytes and line endings so the manifest hashes
remain reproducible after checkout.

## Security Notes

`npm run audit:known` expects a clean `npm audit` result and fails on any
reported vulnerability. Keep Astro/Vite updated through Renovate and review
dependency advisories before adding any exception. GitHub Actions are pinned
to reviewed commit SHAs; Renovate keeps those pins current.

## Contributing

Feel free to open a PR with your content/changes. Some rules:

- Markdown styling as used in other content;
- Content is UTF-8;
- Single file size limit 25MB;
- Non-Markdown files in `content/` are published as downloadable assets;
- PR naming describes content.

## License

[GNU GPLv3](https://github.com/crypt0rr/kb/blob/master/LICENSE)
