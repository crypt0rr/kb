import assert from "node:assert/strict";
import test from "node:test";
import { parseEpochSeconds, resolveBuildDate } from "../src/lib/build-date.mjs";

const wallClock = () => new Date("2031-06-01T00:00:00Z");

test("prefers SOURCE_DATE_EPOCH over the commit time and the wall clock", () => {
  const date = resolveBuildDate({
    env: { SOURCE_DATE_EPOCH: "1767225600" },
    readCommitTime: () => "1700000000\n",
    now: wallClock
  });

  assert.equal(date.toISOString(), "2026-01-01T00:00:00.000Z");
});

test("uses the commit time when SOURCE_DATE_EPOCH is unset or invalid", () => {
  for (const env of [{}, { SOURCE_DATE_EPOCH: "" }, { SOURCE_DATE_EPOCH: "yesterday" }]) {
    const date = resolveBuildDate({ env, readCommitTime: () => "1700000000\n", now: wallClock });
    assert.equal(date.toISOString(), "2023-11-14T22:13:20.000Z");
  }
});

test("falls back to the wall clock outside a git checkout", () => {
  const date = resolveBuildDate({ env: {}, readCommitTime: () => undefined, now: wallClock });

  assert.equal(date.getUTCFullYear(), 2031);
});

test("accepts only whole-second epoch values", () => {
  assert.equal(parseEpochSeconds(" 0 ")?.toISOString(), "1970-01-01T00:00:00.000Z");
  for (const value of [undefined, null, "", "-1", "1.5", "1e9", "abc"]) {
    assert.equal(parseEpochSeconds(value), undefined, String(value));
  }
});
