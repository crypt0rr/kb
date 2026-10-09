import assert from "node:assert/strict";
import test from "node:test";
import { getAllTags, getFilterTags, getPages, groupTags, labelTags } from "../src/lib/content.ts";

test("groups tags that differ only in case or punctuation under the first spelling", () => {
  const groups = groupTags([
    { tags: ["Docker", "Linux"] },
    { tags: ["docker"] },
    { tags: ["Active Directory", "active-directory"] }
  ]);

  assert.deepEqual([...groups.values()], [
    { tag: "Docker", count: 2 },
    { tag: "Linux", count: 1 },
    { tag: "Active Directory", count: 1 }
  ]);
});

test("labels a page's tags with the grouped spelling", () => {
  const groups = groupTags([{ tags: ["Docker"] }, { tags: ["docker", "Active Directory"] }]);

  assert.deepEqual(labelTags(["docker"], groups), ["Docker"]);
  assert.deepEqual(labelTags(["active-directory", "Active Directory"], groups), ["Active Directory"]);
  assert.deepEqual(labelTags(["Unknown"], groups), ["Unknown"]);
});

test("every indexed page tag is a tag filter option with a matching count", () => {
  const options = new Map(getAllTags().map((item) => [item.tag, item.count]));
  const counts = new Map();
  for (const page of getPages()) {
    for (const tag of getFilterTags(page)) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }

  assert.deepEqual(counts, options);
});
