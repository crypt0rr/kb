import { spawnSync } from "node:child_process";
import { appendFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

export function parseArguments(argv = []) {
  const options = { summaryFile: undefined };

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    const separator = argument.indexOf("=");
    const flag = separator === -1 ? argument : argument.slice(0, separator);
    const inlineValue = separator === -1 ? undefined : argument.slice(separator + 1);
    const value = inlineValue ?? argv[++index];

    switch (flag) {
      case "--summary-file":
        options.summaryFile = path.resolve(process.cwd(), requireValue(flag, value));
        break;
      default:
        throw new Error(`Unknown option ${flag}`);
    }
  }

  return options;
}

export function parseOutdatedJson(stdout) {
  try {
    return stdout.trim() ? JSON.parse(stdout) : {};
  } catch (error) {
    throw new Error(`npm outdated returned invalid JSON: ${error.message}`);
  }
}

// Splits `npm outdated --json` output into updates allowed by the declared
// ranges (current !== wanted) and newer releases outside those ranges.
export function classifyOutdated(outdated) {
  const entries = Object.entries(outdated ?? {})
    .map(([name, dependency]) => ({
      name,
      current: dependency.current ?? "missing",
      wanted: dependency.wanted,
      latest: dependency.latest
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  return {
    compatibleUpdates: entries.filter((entry) => entry.current !== entry.wanted),
    newerMajors: entries.filter(
      (entry) => entry.current === entry.wanted && entry.wanted !== entry.latest
    )
  };
}

export function renderConsoleReport({ compatibleUpdates, newerMajors }) {
  const stdout = [];
  const stderr = [];

  if (newerMajors.length > 0) {
    stdout.push("New versions outside the declared dependency ranges (informational):");
    for (const entry of newerMajors) {
      stdout.push(`- ${entry.name}: ${entry.current} (latest: ${entry.latest})`);
    }
  }

  if (compatibleUpdates.length === 0) {
    stdout.push("All direct dependencies use the latest compatible versions.");
  } else {
    stderr.push("Compatible dependency updates are available:");
    for (const entry of compatibleUpdates) {
      stderr.push(`- ${entry.name}: ${entry.current} -> ${entry.wanted}`);
    }
  }

  return { stdout, stderr };
}

export function renderSummary({ compatibleUpdates, newerMajors }) {
  const lines = ["## Dependency freshness", ""];

  lines.push(`- Compatible updates: ${compatibleUpdates.length}`);
  lines.push(`- Newer versions outside declared ranges: ${newerMajors.length}`);

  if (compatibleUpdates.length) {
    lines.push(
      "",
      "### Compatible updates",
      "",
      "| Package | Current | Wanted | Latest |",
      "| --- | --- | --- | --- |",
      ...compatibleUpdates.map(
        (entry) =>
          `| ${escapeTable(entry.name)} | ${escapeTable(entry.current)} | ${escapeTable(entry.wanted)} | ${escapeTable(entry.latest)} |`
      )
    );
  }

  if (newerMajors.length) {
    lines.push(
      "",
      "### Newer versions outside declared ranges",
      "",
      "| Package | Current | Latest |",
      "| --- | --- | --- |",
      ...newerMajors.map(
        (entry) =>
          `| ${escapeTable(entry.name)} | ${escapeTable(entry.current)} | ${escapeTable(entry.latest)} |`
      )
    );
  }

  if (!compatibleUpdates.length && !newerMajors.length) {
    lines.push("", "All direct dependencies are current.");
  }

  return `${lines.join("\n")}\n`;
}

export function exitCodeFor({ compatibleUpdates }) {
  return compatibleUpdates.length ? 1 : 0;
}

function runNpmOutdated() {
  const result = spawnSync("npm", ["outdated", "--json", "--depth=0"], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"]
  });

  if (result.error) {
    throw new Error(`Unable to check outdated dependencies: ${result.error.message}`);
  }

  // npm outdated exits 1 when it finds outdated packages.
  if (![0, 1].includes(result.status)) {
    throw new Error(result.stderr.trim() || "npm outdated failed");
  }

  return result.stdout;
}

export async function run(argv = process.argv.slice(2), { readOutdated = runNpmOutdated } = {}) {
  const options = parseArguments(argv);
  const report = classifyOutdated(parseOutdatedJson(readOutdated()));
  const { stdout, stderr } = renderConsoleReport(report);

  for (const line of stdout) console.log(line);
  for (const line of stderr) console.error(line);

  if (options.summaryFile) {
    await appendFile(options.summaryFile, renderSummary(report));
  }

  return exitCodeFor(report);
}

function requireValue(flag, value) {
  if (!value || value.startsWith("--")) throw new Error(`${flag} requires a value`);
  return value;
}

function escapeTable(value) {
  return String(value ?? "").replaceAll("|", "\\|").replaceAll("\n", " ");
}

const isMain =
  process.argv[1] &&
  pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url;

if (isMain) {
  try {
    process.exitCode = await run();
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
