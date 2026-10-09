import assert from "node:assert/strict";
import { mkdir, mkdtemp, readFile, rm, symlink, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import {
  currentUtcDate,
  parseArguments,
  resolvePagePath,
  run,
  setLastReviewed,
  validateReviewDate
} from "../scripts/mark-reviewed.mjs";
import { locateFrontmatter, parseFrontmatter } from "../src/lib/frontmatter.mjs";

const today = "2026-08-06";

async function withContent(callback) {
  const root = await mkdtemp(path.join(os.tmpdir(), "kb-mark-reviewed-"));
  const contentRoot = path.join(root, "content");
  const files = {
    "_index.md": "---\ntitle: Root\n---\n",
    "cve/_index.md": "---\ntitle: CVE\n---\n",
    "cve/cve-1/index.md": "---\ntitle: CVE 1\ndate: 2020-01-01\n---\nBody\n",
    "cve/cve-1/images/shot.png": "png",
    "cve/both/index.md": "---\ntitle: Both\n---\n",
    "cve/both/_index.md": "---\ntitle: Both section\n---\n",
    "cve/empty/notes.txt": "not a page",
    "tools/leaf.md": "---\ntitle: Leaf\n---\n",
    "tools/.drafts/secret.md": "---\ntitle: Secret\n---\n"
  };
  for (const [file, contents] of Object.entries(files)) {
    await mkdir(path.dirname(path.join(contentRoot, file)), { recursive: true });
    await writeFile(path.join(contentRoot, file), contents);
  }
  await writeFile(path.join(root, "README.md"), "# Outside\n");

  try {
    await callback({ root, contentRoot });
  } finally {
    await rm(root, { recursive: true, force: true });
  }
}

test("validates review dates as real, non-future calendar dates", () => {
  assert.equal(validateReviewDate("2026-08-06", { today }), "2026-08-06");
  assert.equal(validateReviewDate("2024-02-29", { today }), "2024-02-29");
  assert.throws(() => validateReviewDate("2026-08-07", { today }), /in the future \(today in UTC is 2026-08-06\)/);
  assert.throws(() => validateReviewDate("2025-02-29", { today }), /not a valid calendar date/);
  assert.throws(() => validateReviewDate("2025-04-31", { today }), /not a valid calendar date/);
  assert.throws(() => validateReviewDate("2025-13-01", { today }), /not a valid calendar date/);
  assert.throws(() => validateReviewDate("2025-1-01", { today }), /YYYY-MM-DD/);
  assert.throws(() => validateReviewDate("2025-01-01T00:00:00Z", { today }), /YYYY-MM-DD/);
  assert.equal(currentUtcDate(new Date("2026-08-06T23:59:59+02:00")), "2026-08-06");
});

test("parses paths, --date, and --dry-run", () => {
  assert.deepEqual(parseArguments(["content/a", "--date", "2026-01-01", "--dry-run", "content/b"]), {
    paths: ["content/a", "content/b"],
    date: "2026-01-01",
    dryRun: true,
    help: false
  });
  assert.equal(parseArguments(["--date=2026-01-02", "content/a"]).date, "2026-01-02");
  assert.throws(() => parseArguments(["--date"]), /--date requires a value/);
  assert.throws(() => parseArguments(["--force"]), /Unknown option --force/);
});

test("resolves page files and bundle directories inside content/", async () => {
  await withContent(async ({ root, contentRoot }) => {
    const resolve = (input) => resolvePagePath(input, { contentRoot, cwd: root }).relativeFile;

    assert.equal(resolve("content/cve/cve-1/index.md"), "cve/cve-1/index.md");
    assert.equal(resolve("content/cve/cve-1"), "cve/cve-1/index.md");
    assert.equal(resolve("content/cve/cve-1/"), "cve/cve-1/index.md");
    assert.equal(resolve("content/cve"), "cve/_index.md");
    assert.equal(resolve("content"), "_index.md");
    assert.equal(resolve("content/tools/leaf.md"), "tools/leaf.md");
    assert.equal(resolve(path.join(contentRoot, "cve", "cve-1")), "cve/cve-1/index.md");
    assert.equal(
      resolvePagePath("cve-1", { contentRoot, cwd: path.join(contentRoot, "cve") }).relativeFile,
      "cve/cve-1/index.md"
    );
  });
});

test("rejects paths outside content/, private, missing, and non-Markdown paths", async () => {
  await withContent(async ({ root, contentRoot }) => {
    const resolve = (input) => resolvePagePath(input, { contentRoot, cwd: root });

    assert.throws(() => resolve("README.md"), /README\.md: path is outside content\//);
    assert.throws(() => resolve("content/../README.md"), /path is outside content\//);
    assert.throws(() => resolve(".."), /path is outside content\//);
    assert.throws(() => resolve("content/tools/.drafts/secret.md"), /dot-segment paths are private/);
    assert.throws(() => resolve("content/tools/.drafts"), /dot-segment paths are private/);
    assert.throws(() => resolve("content/cve/missing"), /no such file or directory/);
    assert.throws(() => resolve("content/cve/cve-1/images/shot.png"), /not a Markdown page/);
    assert.throws(() => resolve("content/cve/empty"), /no index\.md or _index\.md/);
    assert.throws(() => resolve("content/cve/both"), /both index\.md and _index\.md/);

    await symlink(path.join(root, "README.md"), path.join(contentRoot, "linked.md"));
    assert.throws(() => resolve("content/linked.md"), /outside content\/ through a symlink/);
  });
});

test("inserts lastReviewed after a top-level date and leaves other bytes intact", () => {
  const source = [
    "---",
    "title : \"Quoted: title\"",
    "# a comment that must survive",
    "date : 2020-03-11T12:34:37+01:00",
    "tags : ['CVE']",
    "cascade:",
    "    pre : '<i></i> '",
    "---",
    "",
    "# Body",
    ""
  ].join("\n");
  const result = setLastReviewed(source, "2026-08-01", "fixture.md");

  assert.equal(result.action, "added");
  assert.equal(
    result.source,
    source.replace("+01:00\n", "+01:00\nlastReviewed: 2026-08-01\n")
  );
  assert.deepEqual(parseFrontmatter(result.source).data, {
    ...parseFrontmatter(source).data,
    lastReviewed: "2026-08-01"
  });
});

test("appends lastReviewed at the end of frontmatter without a date", () => {
  const source = "---\ntitle: No date\ntags:\n  - one\n# trailing comment\n---\nBody\n";
  const result = setLastReviewed(source, "2026-08-01");

  assert.equal(result.action, "added");
  assert.equal(
    result.source,
    "---\ntitle: No date\ntags:\n  - one\n# trailing comment\nlastReviewed: 2026-08-01\n---\nBody\n"
  );
  assert.equal(
    setLastReviewed("---\n---\nBody\n", "2026-08-01").source,
    "---\nlastReviewed: 2026-08-01\n---\nBody\n"
  );
});

test("replaces an existing value in place, keeping key spelling and comments", () => {
  const cases = [
    ["lastReviewed: 2024-01-01\n", "lastReviewed: 2026-08-01\n", "2024-01-01"],
    ["lastReviewed :  '2024-01-01' # who\n", "lastReviewed :  2026-08-01 # who\n", "'2024-01-01'"],
    ["\"lastReviewed\": \"2024-01-01\"\n", "\"lastReviewed\": 2026-08-01\n", "\"2024-01-01\""],
    ["lastReviewed:\n", "lastReviewed: 2026-08-01\n", null]
  ];

  for (const [line, expected, previous] of cases) {
    const source = `---\ntitle: T\n${line}weight: 1\n---\nBody\n`;
    const result = setLastReviewed(source, "2026-08-01");
    assert.equal(result.action, "updated", line);
    assert.equal(result.previous, previous, line);
    assert.equal(result.source, `---\ntitle: T\n${expected}weight: 1\n---\nBody\n`, line);
  }

  const same = "---\ntitle: T\nlastReviewed: 2026-08-01\n---\n";
  assert.deepEqual(setLastReviewed(same, "2026-08-01"), {
    source: same,
    action: "unchanged",
    previous: "2026-08-01"
  });
});

test("only edits the top-level field, not cascade or nested keys", () => {
  const source = "---\ntitle: S\ncascade:\n  lastReviewed: 2020-01-01\n---\n";
  const result = setLastReviewed(source, "2026-08-01");

  assert.equal(result.action, "added");
  assert.equal(
    result.source,
    "---\ntitle: S\ncascade:\n  lastReviewed: 2020-01-01\nlastReviewed: 2026-08-01\n---\n"
  );
});

test("refuses values it cannot replace on a single line", () => {
  assert.throws(
    () => setLastReviewed("---\nlastReviewed: >\n  2024-01-01\n---\n", "2026-08-01", "block.md"),
    /block\.md: lastReviewed spans multiple lines/
  );
  assert.throws(
    () => setLastReviewed("---\nlastReviewed:\n  - 2024-01-01\n---\n", "2026-08-01", "list.md"),
    /list\.md: lastReviewed is not a single date value/
  );
  assert.throws(
    () => setLastReviewed("---\n{title: Flow}\n---\n", "2026-08-01", "flow.md"),
    /flow\.md: frontmatter is a flow mapping/
  );
  assert.throws(
    () => setLastReviewed("---\ntitle: [unclosed\n---\n", "2026-08-01", "bad.md"),
    /bad\.md: invalid frontmatter YAML/
  );
});

test("preserves CRLF line endings and a UTF-8 BOM", () => {
  const source = "﻿---\r\ntitle: Windows\r\ndate: 2020-01-01\r\n---\r\n\r\nBody\r\n";
  const result = setLastReviewed(source, "2026-08-01");

  assert.equal(
    result.source,
    "﻿---\r\ntitle: Windows\r\ndate: 2020-01-01\r\nlastReviewed: 2026-08-01\r\n---\r\n\r\nBody\r\n"
  );

  const replaced = setLastReviewed(result.source, "2026-08-02");
  assert.equal(replaced.source, result.source.replace("2026-08-01", "2026-08-02"));
  assert.equal(locateFrontmatter(replaced.source).eol, "\r\n");
});

test("creates frontmatter when a page has none", () => {
  const plain = setLastReviewed("# Plain page\n\nText\n", "2026-08-01");
  assert.equal(plain.action, "created");
  assert.equal(plain.source, "---\nlastReviewed: 2026-08-01\n---\n\n# Plain page\n\nText\n");
  assert.equal(parseFrontmatter(plain.source).content, "# Plain page\n\nText\n");

  const windows = setLastReviewed("﻿\r\n# Leading blank\r\n", "2026-08-01");
  assert.equal(
    windows.source,
    "﻿---\r\nlastReviewed: 2026-08-01\r\n---\r\n\r\n\r\n# Leading blank\r\n"
  );
  assert.equal(parseFrontmatter(windows.source).content, "\r\n# Leading blank\r\n");
  assert.equal(setLastReviewed("", "2026-08-01").source, "---\nlastReviewed: 2026-08-01\n---\n\n");
});

test("writes every resolved page and prints a per-file summary", async () => {
  await withContent(async ({ root, contentRoot }) => {
    const lines = [];
    const result = await run(
      ["content/cve/cve-1", "content/cve/cve-1/index.md", "content/tools/leaf.md", "--date", "2026-08-01"],
      { cwd: root, contentRoot, today, log: (line) => lines.push(line) }
    );

    assert.equal(result.results.length, 2);
    assert.equal(
      await readFile(path.join(contentRoot, "cve/cve-1/index.md"), "utf8"),
      "---\ntitle: CVE 1\ndate: 2020-01-01\nlastReviewed: 2026-08-01\n---\nBody\n"
    );
    assert.equal(
      await readFile(path.join(contentRoot, "tools/leaf.md"), "utf8"),
      "---\ntitle: Leaf\nlastReviewed: 2026-08-01\n---\n"
    );
    assert.deepEqual(lines, [
      "content/cve/cve-1/index.md: add lastReviewed: 2026-08-01",
      "content/tools/leaf.md: add lastReviewed: 2026-08-01",
      "Marked 2 page(s) reviewed on 2026-08-01: 2 added, 0 updated, 0 unchanged"
    ]);
  });
});

test("dry run and invalid input write nothing", async () => {
  await withContent(async ({ root, contentRoot }) => {
    const file = path.join(contentRoot, "cve/cve-1/index.md");
    const before = await readFile(file, "utf8");
    const lines = [];

    await run(["content/cve/cve-1", "--dry-run"], {
      cwd: root,
      contentRoot,
      today,
      log: (line) => lines.push(line)
    });
    assert.equal(await readFile(file, "utf8"), before);
    assert.match(lines[0], /would add lastReviewed: 2026-08-06/);
    assert.match(lines.at(-1), /^Dry run: .*no files were written$/);

    await assert.rejects(
      run(["content/cve/cve-1", "README.md"], { cwd: root, contentRoot, today, log: () => {} }),
      /README\.md: path is outside content\/\nNo files were changed\./
    );
    await assert.rejects(
      run(["content/cve/cve-1", "--date", "2026-08-07"], { cwd: root, contentRoot, today, log: () => {} }),
      /in the future/
    );
    await assert.rejects(
      run([], { cwd: root, contentRoot, today, log: () => {} }),
      /pass at least one page path/
    );
    assert.equal(await readFile(file, "utf8"), before);
  });
});
