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
npm run check:outdated
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
the Pagefind search index. It also publishes `search.json`, a public page index
with each page's `title`, `description`, `url`, `tags`, `section`, `date`,
`lastReviewed`, `status`, and `platforms`. The site itself searches with
Pagefind and does not read `search.json`; it is kept as a machine-readable page
list for external tools. Rendered pages take no state from the build clock: the
footer copyright year comes from `SOURCE_DATE_EPOCH` when set and otherwise from
the commit date, so rebuilding the same commit produces identical HTML. Any
content path with a segment that starts with `.` (for example
`tools/x/files/.env` or `tools/.drafts/notes.md`) is private: the build never
renders it as a page, copies it, links it from a `resources` listing, or lists
it in the asset manifest, and `npm run smoke` fails if one appears there.

The search dialog filters by section and by tag; the tag filter lists every
tag with its page count, and each page indexes the same tag labels, so a tag
option always returns the pages it counts. With an empty query, a section or
tag filter alone runs a filter-only search that shows the first 12 matching
pages and the total count; there is no paging yet. The query and filters are
kept in the URL, and opening a link such as `/?tag=Docker`, `/?tag=docker`
(the `/tags/<slug>/` slug) or `/?section=cve` opens search with those results;
an unknown filter value is dropped from the URL. The pure search helpers live
in `static/js/kb-search.js`.

The supported angle shortcodes are rendered through the static page pipeline:
`youtube` embeds use the privacy-preserving `youtube-nocookie.com` host and
`gist` renders as a CSP-safe link to GitHub. The content checker validates the
required identifiers for both forms; unsupported or malformed shortcodes must
be fixed before publishing.

`npm run check:content` validates frontmatter, shortcodes, references, and
downloadable content assets. New files under `content/**/files/` must be
referenced by a `resources` or `attachments` shortcode unless they are an
intentional mirror/bulk asset listed in `scripts/content-policy.json`. It also
fails on any dot-segment file under `content/` other than `.gitkeep` and
`.DS_Store` files and the git-ignored `.rumdl_cache` lint cache directory, so an
accidentally committed `.env`, credential file, or dot-directory page fails CI.
Markdown images and raw HTML `src`, `srcset`, and `poster` attributes must not
use sources that resolve to another origin, such as absolute `http(s)://` or
protocol-relative `//` URLs: the deployed CSP only allows same-origin media
(`img-src 'self' data:`, `media-src 'self'`), so browsers would block them.
Mirror the file into the page's `images/` directory and reference it
relatively. External `<iframe>` and `<script>` sources fail the same check and
point to the `youtube` and `gist` shortcodes instead. Code blocks, text inside
raw HTML, and attributes such as `data-src` are ignored.
`ref` shortcodes must resolve to exactly one published (non-draft) page; a
basename that matches several equally close pages is reported as ambiguous and
needs a path. Drafts are not rendered, so their own refs may also point at
other drafts. The build also fails on an unresolved `ref`.
`npm run check:links` validates internal Markdown links, anchors, images, and
downloadable assets. External links are inventoried without network calls.
The renderer, both checks, and the content graph share one slug, `ref`, and
heading-anchor resolver (`src/lib/links.mjs`), and expand `ref` shortcodes in
headings before deriving ids, so an anchor that passes the check is the id the
page renders, including `-1` suffixes for repeated headings.
`notice` bodies are ordinary Markdown, so code blocks and other shortcodes work
inside them.
Fenced code is syntax highlighted at build time with highlight.js
(`src/lib/highlight.mjs`), so pages ship no highlighting script. Only fences
labelled with a known language are highlighted (`bash`/`sh`, `shell`,
`powershell`/`ps1`, `cmd`/`bat`, `yaml`, `html`/`xml`, `c`, `cpp`, `json`,
`python`, `javascript`, `ini`, `sql`, `diff` and their highlight.js aliases,
case-insensitively); the language is never guessed, so `plain`, unlabelled and
unknown fences stay plain escaped text. The output is `hljs-*` class spans
styled by `src/styles/global.css`, never inline `style` attributes, which the
CSP (`style-src 'self'`) would block. The copy button still copies the exact
fence text.
`npm run validate` runs the full local validation gate.

`npm test` runs focused parser and content-contract tests. Tests against the
real `content/` tree assert invariants derived from the files and frontmatter
rather than fixed page counts, so adding a page or a `lastReviewed` date does
not require test changes. `npm run smoke` checks the built `dist/` output,
including that no trust-ledger state appears in any generated HTML page or in
`search.json`.
`npm run doctor` checks the Node.js version, required project paths, and local
npm availability. A different Node.js major version than `.node-version` fails;
a minor or patch difference only prints a warning. CI installs the exact pinned
version.
`npm run test:a11y` builds the deployable static site, serves it with
`scripts/serve-dist.mjs`, and runs every Playwright spec in `tests/`: the
Axe smoke suite against representative routes and keyboard interactions,
`tests/search-filters.spec.mjs` (filter-only search, and tag filter options
that match the built Pagefind index), plus
`tests/security-headers.spec.mjs`. The `Browser accessibility smoke tests`
workflow runs the same check on pull requests, pushes to `main`, and manual
dispatches. For a first local run, install the test browser once with
`npx playwright install chromium`.

`scripts/serve-dist.mjs` is a dependency-free static server for `dist/` that
applies the response headers from `dist/_headers` (falling back to
`public/_headers`) using the Cloudflare Pages `_headers` syntax, so browser
tests run under the production CSP and cross-origin policies; Astro Preview
ignores `_headers`. It serves `/x/` as `/x/index.html`, redirects
directories without a trailing slash (keeping the query string), returns `404`
for missing files and for `_headers`, `_redirects`, and `_routes.json`, and
refuses paths outside the served directory. An unreadable file returns `500`
without stopping the server. Run it directly with
`node scripts/serve-dist.mjs --host 127.0.0.1 --port 4321 --dir dist`.
Playwright starts it on `PLAYWRIGHT_PORT` (default `4321`); set a different
port when another local server already uses the default. The security spec
checks that the served policy headers match `public/_headers` exactly, fails on
CSP violations, "Refused to" console messages, and `ERR_BLOCKED_BY_RESPONSE`
requests on the accessibility suite's representative routes and the pages with
mirrored images, checks that
Pagefind search works under the CSP, and loads the YouTube embed against a
local stub that mirrors YouTube's cross-origin headers. All other third-party
requests are blocked, so the suite needs no internet access.

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
between the site and maintenance checks. The freshness queue is maintainer-only
and is not rendered on the public site; pages only show their own `date`,
`lastReviewed`, `status`, and `platforms` values. Reports use non-strict mode to
record malformed cascade metadata for maintainers, while the site remains
strict. The scheduled `Content freshness review` workflow uploads the same
reports weekly and adds a summary to the workflow run. Markdown shows the oldest
100 queue entries by default (`--limit` changes this); JSON contains the
complete corpus, field provenance, and priority data for future tooling.

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
due for review. Its states depend on the date the report runs, so the ledger is
not rendered on the public site, in the Pagefind filters, or in `search.json`.
External and protocol URLs are inventoried but are not treated as broken
internal targets. The scheduled `Content freshness review` workflow runs
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
Every upstream listing entry must have a plain file name
(`[A-Za-z0-9][A-Za-z0-9._-]*`, never `..`) and a same-origin absolute link, or
the run stops with an error. Requests use HTTPS only and fail after 30 seconds
without network activity, and a failed download never leaves its temporary
`.download` file behind.
The mirror path preserves upstream bytes and line endings so the manifest hashes
remain reproducible after checkout.

## Security Notes

`npm run audit:known` expects a clean `npm audit` result and fails on any
reported vulnerability. Keep Astro/Vite updated through Renovate and review
dependency advisories before adding any exception. GitHub Actions are pinned
to reviewed commit SHAs; Renovate keeps those pins current.

`npm run check:outdated` lists dependency updates allowed by the declared
ranges (and fails when any exist) plus newer versions outside those ranges. It
is not part of the build gate, so pull requests do not depend on npm registry
state. The scheduled `Dependency freshness report` workflow runs it weekly or on
manual dispatch and writes both lists to the job summary
(`--summary-file <path>` appends the same Markdown summary locally).

`public/_headers` defines the deployed response headers, including a
self-only Content Security Policy. Images and media are served from the site
itself rather than allowlisting third-party hosts, so visitors' IP addresses
and referrers are not sent to image hosts and local copies survive upstream
link rot.

The site does not send `Cross-Origin-Embedder-Policy`. The only third-party
frame, the `youtube` shortcode's `youtube-nocookie.com` embed, sends
`Cross-Origin-Resource-Policy: cross-origin` but only a report-only COEP, so
Chromium blocks the iframe (`ERR_BLOCKED_BY_RESPONSE`) under an enforced
`credentialless` or `require-corp` policy. Nothing on the site needs
cross-origin isolation (no `SharedArrayBuffer` or `crossOriginIsolated` use in
the site scripts or Pagefind), so COEP was removed instead of adding
workarounds. `Cross-Origin-Opener-Policy` and `Cross-Origin-Resource-Policy`
stay in place. `tests/security-headers.spec.mjs` and `npm test` guard this.

## Contributing

Feel free to open a PR with your content/changes. Some rules:

- Markdown styling as used in other content;
- Content is UTF-8;
- Single file size limit 25MB;
- Non-Markdown files in `content/` are published as downloadable assets;
- PR naming describes content.

## License

[GNU GPLv3](https://github.com/crypt0rr/kb/blob/master/LICENSE)
