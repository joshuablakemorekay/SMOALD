// Tests for functions/api/download.js — every way it can refuse, plus the
// one way it says yes. Run with:  node --test   (finds *.test.js itself)
//
// Lives outside functions/ on purpose: Pages turns every file in there into
// a route, and /api/download.test is not a page anyone should be able to hit.

import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { onRequestGet, onRequestHead } from "../functions/api/download.js";

const ENV = {
  STRIPE_SECRET_KEY: "rk_test_x",
  GITHUB_TOKEN: "github_pat_x",
  THEME_REPO: "joshuablakemorekay/classic-modern-theme",
};

const get = (id, env = ENV) =>
  onRequestGet({ request: new Request(`https://smoald.com/api/download?session_id=${id}`), env });

// A fake internet: each test says what Stripe and GitHub answer.
let answers;
const realFetch = globalThis.fetch;
before(() => {
  globalThis.fetch = async (url) => {
    for (const [prefix, make] of answers) if (String(url).startsWith(prefix)) return make();
    throw new Error(`unexpected fetch ${url}`);
  };
});
after(() => { globalThis.fetch = realFetch; });

const json = (body, status = 200) => new Response(JSON.stringify(body), { status });
const stripeSays = (session, status = 200) => ["https://api.stripe.com/v1/checkout/sessions/", () => json(session, status)];

test("refuses a missing or malformed session id before touching Stripe", async () => {
  answers = [];
  for (const bad of ["", "abc", "cs_live_", "cs_live_abc;drop", "pi_123"]) {
    const res = await get(bad);
    assert.equal(res.status, 400, `expected 400 for ${JSON.stringify(bad)}`);
  }
});

test("tells the buyer downloads are not configured when a variable is missing", async () => {
  answers = [];
  for (const missing of Object.keys(ENV)) {
    const res = await get("cs_live_ok", { ...ENV, [missing]: "" });
    assert.equal(res.status, 500);
    assert.match(await res.text(), /not configured yet/);
  }
});

test("refuses a session Stripe does not know", async () => {
  answers = [stripeSays({ error: { message: "No such checkout.session" } }, 404)];
  const res = await get("cs_live_unknown");
  assert.equal(res.status, 404);
});

test("refuses a session that has not been paid", async () => {
  answers = [stripeSays({ payment_status: "unpaid", metadata: { product: "classic-modern-theme" } })];
  const res = await get("cs_live_unpaid");
  assert.equal(res.status, 402);
});

test("refuses a paid session for some other product", async () => {
  answers = [stripeSays({ payment_status: "paid", metadata: { product: "something-else" } })];
  const res = await get("cs_live_other");
  assert.equal(res.status, 403);
});

test("HEAD says yes for a paid session without fetching the zip", async () => {
  let githubCalls = 0;
  answers = [
    stripeSays({ payment_status: "paid", metadata: { product: "classic-modern-theme" } }),
    ["https://api.github.com/", () => { githubCalls++; return json({}); }],
  ];
  const res = await onRequestHead({ request: new Request("https://smoald.com/api/download?session_id=cs_live_paid"), env: ENV });
  assert.equal(res.status, 200);
  assert.equal(githubCalls, 0, "HEAD must not touch GitHub");
});

test("streams the latest release zip for a paid session", async () => {
  answers = [
    stripeSays({ payment_status: "paid", metadata: { product: "classic-modern-theme" } }),
    ["https://api.github.com/repos/", () => json({ assets: [
      { name: "notes.txt", url: "https://api.github.com/assets/1" },
      { name: "classic-modern-theme-1.1.0.zip", url: "https://api.github.com/assets/2" },
    ] })],
    ["https://api.github.com/assets/2", () => new Response("PKfake-zip", { status: 200 })],
  ];
  const res = await get("cs_live_paid");
  assert.equal(res.status, 200);
  assert.equal(res.headers.get("content-type"), "application/zip");
  assert.equal(res.headers.get("content-disposition"), 'attachment; filename="classic-modern-theme-1.1.0.zip"');
  assert.equal(res.headers.get("cache-control"), "no-store");
  assert.equal(await res.text(), "PKfake-zip");
});

test("explains itself when the release has no zip", async () => {
  answers = [
    stripeSays({ payment_status: "paid", metadata: { product: "classic-modern-theme" } }),
    ["https://api.github.com/repos/", () => json({ assets: [] })],
  ];
  const res = await get("cs_live_paid");
  assert.equal(res.status, 502);
  assert.match(await res.text(), /joshua@smoald.com/);
});
