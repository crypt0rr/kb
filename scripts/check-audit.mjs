import { spawnSync } from "node:child_process";

const result = spawnSync("npm", ["audit", "--json"], {
  encoding: "utf8",
  stdio: ["ignore", "pipe", "pipe"]
});

if (!result.stdout.trim()) {
  console.error(result.stderr.trim() || "npm audit did not return JSON output");
  process.exit(1);
}

let audit;
try {
  audit = JSON.parse(result.stdout);
} catch (error) {
  console.error(`npm audit returned invalid JSON: ${error.message}`);
  process.exit(1);
}

if (audit.error) {
  console.error(audit.error.summary || "npm audit endpoint returned an error");
  if (audit.error.detail) {
    console.error(audit.error.detail);
  }
  process.exit(1);
}

const vulnerabilities = Object.values(audit.vulnerabilities ?? {});
if (vulnerabilities.length === 0) {
  console.log("npm audit: no vulnerabilities found");
  process.exit(0);
}

console.error("npm audit found vulnerabilities:");
for (const vulnerability of vulnerabilities) {
  console.error(`- ${vulnerability.name} (${vulnerability.severity})`);
  for (const via of asArray(vulnerability.via)) {
    if (typeof via === "object" && via.title) {
      console.error(`  - ${via.title}`);
    }
  }
}
process.exit(1);

function asArray(value) {
  return Array.isArray(value) ? value : [];
}
