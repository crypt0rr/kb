import { spawnSync } from "node:child_process";

const result = spawnSync("npm", ["outdated", "--json", "--depth=0"], {
  encoding: "utf8",
  stdio: ["ignore", "pipe", "pipe"]
});

if (result.error) {
  console.error(`Unable to check outdated dependencies: ${result.error.message}`);
  process.exit(1);
}

if (![0, 1].includes(result.status)) {
  console.error(result.stderr.trim() || "npm outdated failed");
  process.exit(1);
}

let outdated;
try {
  outdated = result.stdout.trim() ? JSON.parse(result.stdout) : {};
} catch (error) {
  console.error(`npm outdated returned invalid JSON: ${error.message}`);
  process.exit(1);
}

const entries = Object.entries(outdated);
const compatibleUpdates = entries.filter(([, dependency]) => dependency.current !== dependency.wanted);
const newerMajors = entries.filter(([, dependency]) => dependency.current === dependency.wanted && dependency.wanted !== dependency.latest);

if (newerMajors.length > 0) {
  console.log("New versions outside the declared dependency ranges (informational):");
  for (const [name, dependency] of newerMajors) {
    console.log(`- ${name}: ${dependency.current} (latest: ${dependency.latest})`);
  }
}

if (compatibleUpdates.length === 0) {
  console.log("All direct dependencies use the latest compatible versions.");
  process.exit(0);
}

console.error("Compatible dependency updates are available:");
for (const [name, dependency] of compatibleUpdates) {
  console.error(`- ${name}: ${dependency.current} -> ${dependency.wanted}`);
}
process.exit(1);
