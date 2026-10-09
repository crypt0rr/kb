import assert from "node:assert/strict";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import {
  classifyOutdated,
  exitCodeFor,
  parseArguments,
  parseOutdatedJson,
  renderConsoleReport,
  renderSummary,
  run
} from "../scripts/check-outdated.mjs";

const fixture = {
  yaml: { current: "2.9.0", wanted: "2.9.1", latest: "2.9.1", location: "node_modules/yaml" },
  astro: { current: "7.2.4", wanted: "7.3.0", latest: "8.0.0", location: "node_modules/astro" },
  typescript: { current: "6.0.2", wanted: "6.0.2", latest: "7.0.1", location: "node_modules/typescript" }
};

test("classifies in-range updates separately from newer majors", () => {
  const report = classifyOutdated(fixture);

  assert.deepEqual(
    report.compatibleUpdates.map((entry) => entry.name),
    ["astro", "yaml"]
  );
  assert.deepEqual(report.newerMajors, [
    { name: "typescript", current: "6.0.2", wanted: "6.0.2", latest: "7.0.1" }
  ]);
  assert.equal(exitCodeFor(report), 1);
});

test("passes when only newer majors exist", () => {
  const report = classifyOutdated({ typescript: fixture.typescript });

  assert.equal(report.compatibleUpdates.length, 0);
  assert.equal(exitCodeFor(report), 0);
  assert.deepEqual(renderConsoleReport(report), {
    stdout: [
      "New versions outside the declared dependency ranges (informational):",
      "- typescript: 6.0.2 (latest: 7.0.1)",
      "All direct dependencies use the latest compatible versions."
    ],
    stderr: []
  });
});

test("treats a missing installed package as a compatible update", () => {
  const report = classifyOutdated({ pagefind: { wanted: "1.4.0", latest: "1.4.0" } });

  assert.deepEqual(report.compatibleUpdates, [
    { name: "pagefind", current: "missing", wanted: "1.4.0", latest: "1.4.0" }
  ]);
  assert.equal(exitCodeFor(report), 1);
});

test("renders a Markdown summary with both update tables", () => {
  const summary = renderSummary(classifyOutdated(fixture));

  assert.match(summary, /^## Dependency freshness\n/);
  assert.match(summary, /- Compatible updates: 2\n/);
  assert.match(summary, /- Newer versions outside declared ranges: 1\n/);
  assert.match(summary, /\| astro \| 7\.2\.4 \| 7\.3\.0 \| 8\.0\.0 \|/);
  assert.match(summary, /\| yaml \| 2\.9\.0 \| 2\.9\.1 \| 2\.9\.1 \|/);
  assert.match(summary, /### Newer versions outside declared ranges[\s\S]*\| typescript \| 6\.0\.2 \| 7\.0\.1 \|/);
});

test("renders a current summary when nothing is outdated", () => {
  const report = classifyOutdated(parseOutdatedJson(""));

  assert.equal(exitCodeFor(report), 0);
  assert.match(renderSummary(report), /All direct dependencies are current\./);
});

test("rejects invalid npm outdated JSON and unknown options", () => {
  assert.throws(() => parseOutdatedJson("{"), /npm outdated returned invalid JSON/);
  assert.throws(() => parseArguments(["--nope"]), /Unknown option --nope/);
  assert.throws(() => parseArguments(["--summary-file"]), /--summary-file requires a value/);
});

test("appends the summary file and keeps the failing exit code", async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), "kb-check-outdated-"));
  const summaryFile = path.join(directory, "summary.md");
  const originalLog = console.log;
  const originalError = console.error;

  try {
    await writeFile(summaryFile, "## Earlier step\n");
    console.log = () => {};
    console.error = () => {};
    const exitCode = await run(["--summary-file", summaryFile], {
      readOutdated: () => JSON.stringify(fixture)
    });
    console.log = originalLog;
    console.error = originalError;

    const summary = await readFile(summaryFile, "utf8");
    assert.equal(exitCode, 1);
    assert.match(summary, /^## Earlier step\n## Dependency freshness\n/);
    assert.match(summary, /\| astro \|/);
  } finally {
    console.log = originalLog;
    console.error = originalError;
    await rm(directory, { recursive: true, force: true });
  }
});
