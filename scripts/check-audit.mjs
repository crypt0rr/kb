import { spawnSync } from "node:child_process";

const expectedSources = new Set([1120679, 1120680]);
const expectedNames = new Set(["astro", "esbuild", "vite"]);

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

const unexpected = vulnerabilities.filter((vulnerability) => !isExpected(vulnerability));
if (unexpected.length) {
  console.error("npm audit found unexpected vulnerabilities:");
  for (const vulnerability of unexpected) {
    console.error(`- ${vulnerability.name} (${vulnerability.severity})`);
  }
  process.exit(1);
}

const advisories = [...collectSources(vulnerabilities)].sort((a, b) => a - b).join(", ");
console.warn(`npm audit: only known upstream Astro/Vite/esbuild advisories found (${advisories})`);

function isExpected(vulnerability) {
  if (!expectedNames.has(vulnerability.name)) return false;

  const sources = collectSources([vulnerability]);
  if (sources.size > 0) {
    return [...sources].every((source) => expectedSources.has(source));
  }

  return asArray(vulnerability.via).every((via) => {
    if (typeof via === "string") return expectedNames.has(via);
    return expectedSources.has(via.source);
  });
}

function collectSources(vulnerabilities) {
  const sources = new Set();
  for (const vulnerability of vulnerabilities) {
    for (const via of asArray(vulnerability.via)) {
      if (typeof via === "object" && Number.isInteger(via.source)) {
        sources.add(via.source);
      }
    }
  }
  return sources;
}

function asArray(value) {
  return Array.isArray(value) ? value : [];
}
