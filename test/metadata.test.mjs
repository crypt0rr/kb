import assert from "node:assert/strict";
import test from "node:test";
import {
  canonicalTag,
  parseCascade,
  resolveInheritedFrontmatter,
  tagKey,
  uniqueStrings
} from "../src/lib/metadata.mjs";

test("parses object and legacy assignment cascade values", () => {
  assert.deepEqual(parseCascade({ tags: ["Tools"] }, "section/_index.md"), {
    tags: ["Tools"]
  });
  assert.deepEqual(parseCascade("tags= ['macOS']", "commands/macos/_index.md"), {
    tags: ["macOS"]
  });
  assert.throws(
    () => parseCascade("not a cascade", "broken/_index.md"),
    /cascade must be a YAML object/
  );
});

test("inherits the nearest cascade while preserving explicit child metadata", () => {
  const root = {
    url: "/",
    parentUrl: null,
    relativeFile: "_index.md",
    frontmatter: { cascade: { tags: ["Tools"], platforms: ["Linux"] } }
  };
  const section = {
    url: "/tools/",
    parentUrl: "/",
    relativeFile: "tools/_index.md",
    frontmatter: { cascade: { tags: ["Networking"] } }
  };
  const inherited = {
    url: "/tools/nmap/",
    parentUrl: "/tools/",
    relativeFile: "tools/nmap/index.md",
    frontmatter: { title: "Nmap" }
  };
  const explicit = {
    ...inherited,
    frontmatter: { title: "Nmap", tags: ["Wirehark"] }
  };
  const byUrl = new Map([root, section, inherited, explicit].map((page) => [page.url, page]));

  assert.deepEqual(resolveInheritedFrontmatter(inherited, byUrl), {
    tags: ["Networking"],
    platforms: ["Linux"],
    title: "Nmap"
  });
  assert.deepEqual(resolveInheritedFrontmatter(explicit, byUrl), {
    tags: ["Wireshark"],
    platforms: ["Linux"],
    title: "Nmap"
  });
});

test("canonicalizes known tag aliases deterministically", () => {
  assert.equal(canonicalTag("Wirehark"), "Wireshark");
  assert.equal(canonicalTag("hash-cracking"), "Hash Cracking");
  assert.equal(tagKey("Hash Cracking"), tagKey("hash-cracking"));
});

test("does not invent values for absent list metadata", () => {
  assert.deepEqual(uniqueStrings(undefined), []);
  assert.deepEqual(uniqueStrings(null), []);
  assert.deepEqual(uniqueStrings(["", "  ", "Linux"]), ["Linux"]);
});
