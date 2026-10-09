import assert from "node:assert/strict";
import test from "node:test";
import { checkNodeVersion } from "../scripts/doctor.mjs";

test("accepts the exact pinned Node.js version", () => {
  assert.deepEqual(checkNodeVersion("24.21.0", "24.21.0"), { status: "ok" });
  assert.deepEqual(checkNodeVersion("v24.21.0", "24.21.0"), { status: "ok" });
});

test("warns but passes on a minor or patch difference within the pinned major", () => {
  const patch = checkNodeVersion("24.21.0", "24.19.0");
  assert.equal(patch.status, "warning");
  assert.match(patch.message, /Node\.js 24\.19\.0 is active; \.node-version pins 24\.21\.0/);

  assert.equal(checkNodeVersion("24.21.0", "24.22.1").status, "warning");
});

test("fails on a major version mismatch", () => {
  const older = checkNodeVersion("24.21.0", "22.18.0");
  assert.equal(older.status, "error");
  assert.match(older.message, /requires major version 24/);

  assert.equal(checkNodeVersion("24.21.0", "26.0.0").status, "error");
});

test("compares only the components a partial .node-version specifies", () => {
  assert.deepEqual(checkNodeVersion("24", "24.19.0"), { status: "ok" });
  assert.deepEqual(checkNodeVersion("24.19", "24.19.3"), { status: "ok" });
  assert.equal(checkNodeVersion("24", "22.0.0").status, "error");
});

test("skips the check when .node-version is empty and rejects unparsable versions", () => {
  assert.deepEqual(checkNodeVersion("", "24.19.0"), { status: "ok" });
  assert.equal(checkNodeVersion("24.21.0", "not-a-version").status, "error");
});

test("warns when .node-version is not a numeric version", () => {
  const alias = checkNodeVersion("lts/iron", "24.19.0");
  assert.equal(alias.status, "warning");
  assert.match(alias.message, /unable to parse \.node-version "lts\/iron"/);
});
