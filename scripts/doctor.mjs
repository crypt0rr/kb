import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";

const requiredFiles = [
  ".node-version",
  "package.json",
  "package-lock.json",
  "astro.config.mjs",
  "content",
  "src"
];

// CI pins the exact .node-version through setup-node. Locally only the major
// version must match; minor or patch drift is reported as a warning.
export function checkNodeVersion(expected, actual) {
  const expectedParts = parseVersion(expected);
  const actualParts = parseVersion(actual);

  if (!String(expected ?? "").trim()) return { status: "ok" };
  if (!expectedParts.length) {
    return { status: "warning", message: `unable to parse .node-version "${expected}"` };
  }
  if (!actualParts.length) {
    return { status: "error", message: `unable to parse the active Node.js version "${actual}"` };
  }

  if (expectedParts[0] !== actualParts[0]) {
    return {
      status: "error",
      message: `Node.js ${actual} is active; .node-version requires major version ${expectedParts[0]} (${expected})`
    };
  }

  const drift = expectedParts.some((part, index) => part !== (actualParts[index] ?? 0));
  if (drift) {
    return {
      status: "warning",
      message: `Node.js ${actual} is active; .node-version pins ${expected} (CI uses the pinned version)`
    };
  }

  return { status: "ok" };
}

function parseVersion(value) {
  const match = /^v?(\d+(?:\.\d+){0,2})$/.exec(String(value ?? "").trim());
  return match ? match[1].split(".").map(Number) : [];
}

export async function run(root = process.cwd()) {
  const errors = [];
  const warnings = [];

  for (const file of requiredFiles) {
    try {
      await access(path.join(root, file));
    } catch {
      errors.push(`missing required project path: ${file}`);
    }
  }

  const actualNode = process.versions.node;
  try {
    const expectedNode = (await readFile(path.join(root, ".node-version"), "utf8")).trim();
    const nodeCheck = checkNodeVersion(expectedNode, actualNode);
    if (nodeCheck.status === "error") errors.push(nodeCheck.message);
    if (nodeCheck.status === "warning") warnings.push(nodeCheck.message);
  } catch {
    // A missing .node-version is already reported as a required project path.
  }

  try {
    execFileSync("npm", ["--version"], { stdio: "ignore" });
  } catch {
    errors.push("npm is not available on PATH");
  }

  for (const warning of warnings) console.warn(`warning: ${warning}`);

  if (errors.length) {
    for (const error of errors) console.error(`error: ${error}`);
    process.exitCode = 1;
  } else {
    console.log(`Environment ready: Node.js ${actualNode}`);
  }

  return { errors, warnings };
}

const isMain =
  process.argv[1] &&
  pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url;

if (isMain) {
  await run();
}
