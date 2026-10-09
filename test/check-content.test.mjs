import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const script = fileURLToPath(new URL("../scripts/check-content.mjs", import.meta.url));

async function writePage(root, relative, frontmatter, body = "") {
  const file = path.join(root, "content", relative);
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, `---\n${frontmatter}\n---\n${body}\n`);
}

test("reports unresolved, draft-only and ambiguous refs but lets drafts ref drafts", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "kb-check-content-"));

  try {
    await mkdir(path.join(root, "scripts"), { recursive: true });
    await writeFile(
      path.join(root, "scripts", "content-policy.json"),
      JSON.stringify({ allowedAssetWarnings: [] })
    );
    await writePage(root, "_index.md", "title: Root");
    await writePage(root, "commands/dup/index.md", "title: Dup command");
    await writePage(root, "other/dup/index.md", "title: Dup other");
    await writePage(root, "tools/beta/index.md", "title: Beta");
    await writePage(root, "tools/secret/index.md", "title: Secret\ndraft: true");
    await writePage(
      root,
      "tools/plan/index.md",
      "title: Plan\ndraft: true",
      '[Secret]({{< ref "secret" >}})'
    );
    await writePage(
      root,
      "tools/alpha/index.md",
      "title: Alpha",
      [
        '[Beta]({{< ref "beta" >}})',
        '[Exact]({{< ref "commands/dup" >}})',
        '[Dup]({{< ref "dup" >}})',
        '[Secret]({{< ref "secret" >}})',
        '[Missing]({{< ref "missing" >}})'
      ].join("\n")
    );

    const result = spawnSync(process.execPath, [script], { cwd: root, encoding: "utf8" });
    const errors = result.stderr
      .split("\n")
      .filter((line) => line.startsWith("error: "))
      .sort();

    assert.equal(result.status, 1);
    assert.deepEqual(errors, [
      "error: tools/alpha/index.md: ambiguous ref dup matches /commands/dup/, /other/dup/; use a path",
      "error: tools/alpha/index.md: unresolved ref missing",
      "error: tools/alpha/index.md: unresolved ref secret"
    ]);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
