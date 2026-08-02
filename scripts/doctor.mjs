import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { execFileSync } from "node:child_process";

const root = process.cwd();
const requiredFiles = [
  ".node-version",
  "package.json",
  "package-lock.json",
  "astro.config.mjs",
  "content",
  "src"
];
const errors = [];

for (const file of requiredFiles) {
  try {
    await access(path.join(root, file));
  } catch {
    errors.push(`missing required project path: ${file}`);
  }
}

const expectedNode = (await readFile(path.join(root, ".node-version"), "utf8")).trim();
const actualNode = process.versions.node;
if (expectedNode && !actualNode.startsWith(`${expectedNode}.`) && actualNode !== expectedNode) {
  errors.push(`Node.js ${actualNode} is active; .node-version requires ${expectedNode}`);
}

try {
  execFileSync("npm", ["--version"], { stdio: "ignore" });
} catch {
  errors.push("npm is not available on PATH");
}

if (errors.length) {
  for (const error of errors) console.error(`error: ${error}`);
  process.exitCode = 1;
} else {
  console.log(`Environment ready: Node.js ${actualNode}`);
}
