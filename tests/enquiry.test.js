// Tests for functions/api/enquiry.js — the spam defences, the translation,
// and the plain delivery that must keep working through all of it.
// Run with:  node --test
//
// Nothing here touches the internet: Resend, Turnstile and Anthropic are
// all answered by the fake fetch below, and KV is an in-memory Map.

import { test, beforeEach, after } from "node:test";
import assert from "node:assert/strict";
import { onRequestPost } from "../functions/api/enquiry.js";

/** Just enough of the Workers KV API for the rate limit and blocklist. */
function fakeKV(entries = {}) {
  const store = new Map(Object.entries(entries));
  return {
    store,
    get: async (key) => (store.has(key) ? store.get(key) : null),
    put: async (key, value) => { store.set(key, value); },
  };
}

const BASE_ENV = {
  RESEND_API_KEY: "re_test",
  CONTACT_TO: "joshua@smoald.com",
  CONTACT_FROM: "onboarding@resend.dev",
};
const fullEnv = (kv = fakeKV()) => ({
  ...BASE_ENV,
  TURNSTILE_SECRET_KEY: "ts_secret",
  ANTHROPIC_API_KEY: "sk-ant-test",
  ENQUIRY_KV: kv,
});

const ENGLISH = {
  name: "Sarah Jones",
  email: "sarah@bakery.co.uk",
  business: "Jones Bakery",
  need: "A new business website",
  budget: "£500 – £1,000",
  message: "Hi, I run a small bakery in Widnes and need a simple site with our opening hours.",
  "cf-turnstile-response": "good-token",
};

// What each fake service says. Tests change these before posting.
let turnstileOK;
let analysis;          // what "Claude" returns, or null to simulate an outage
let resendStatus;
let sentEmails;
let anthropicCalls;

const realFetch = globalThis.fetch;
beforeEach(() => {
  turnstileOK = true;
  analysis = { language: "English", is_english: true, english_translation: "", is_sales_pitch: false };
  resendStatus = 200;
  sentEmails = [];
  anthropicCalls = 0;
  globalThis.fetch = async (url, init) => {
    const u = String(url);
    if (u.startsWith("https://challenges.cloudflare.com/turnstile/")) {
      const token = init.body.get("response");
      return Response.json({ success: turnstileOK && token === "good-token" });
    }
    if (u === "https://api.anthropic.com/v1/messages") {
      anthropicCalls++;
      if (!analysis) return new Response("overloaded", { status: 529 });
      return Response.json({
        stop_reason: "end_turn",
        content: [{ type: "text", text: JSON.stringify(analysis) }],
      });
    }
    if (u === "https://api.resend.com/emails") {
      sentEmails.push(JSON.parse(init.body));
      return new Response("{}", { status: resendStatus });
    }
    throw new Error(`unexpected fetch ${u}`);
  };
});
after(() => { globalThis.fetch = realFetch; });

function post(fields, env, ip = "203.0.113.7") {
  const request = new Request("https://smoald.com/api/enquiry", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Origin: "https://smoald.com",
      "CF-Connecting-IP": ip,
    },
    body: JSON.stringify(fields),
  });
  return onRequestPost({ request, env });
}

// 1. A normal English enquiry works.
test("an English enquiry is emailed as before, untranslated", async () => {
  const res = await post(ENGLISH, fullEnv());
  assert.equal(res.status, 200);
  assert.equal(sentEmails.length, 1);
  const email = sentEmails[0];
  assert.equal(email.subject, "Enquiry — A new business website — Sarah Jones");
  assert.equal(email.reply_to, "sarah@bakery.co.uk");
  assert.match(email.html, /<h3>Message<\/h3>/);
  assert.match(email.html, /opening hours/);
  assert.doesNotMatch(email.html, /Detected language/);
  assert.match(email.html, /203\.0\.113\.7/, "the sender IP is shown so it can be blocked");
});

// 2. A foreign-language enquiry is translated and delivered.
test("a Spanish enquiry arrives with language, translation and original", async () => {
  analysis = {
    language: "Spanish",
    is_english: false,
    english_translation: "Hello, I need a website for my restaurant in Madrid.",
    is_sales_pitch: false,
  };
  const res = await post(
    { ...ENGLISH, message: "Hola, necesito una página web para mi restaurante en Madrid." },
    fullEnv(),
  );
  assert.equal(res.status, 200);
  const email = sentEmails[0];
  assert.match(email.subject, /\[Spanish\]$/);
  assert.doesNotMatch(email.subject, /Spam/, "a foreign language alone is not spam");
  assert.match(email.html, /Detected language:<\/strong> Spanish/);
  assert.match(email.html, /English translation<\/h3>\s*<p[^>]*>Hello, I need a website/);
  assert.match(email.html, /Original message \(Spanish\)<\/h3>\s*<p[^>]*>Hola, necesito/);
});

test("if translation is down the enquiry still arrives, in the original", async () => {
  analysis = null;
  const res = await post({ ...ENGLISH, message: "Bonjour, j'ai besoin d'un site." }, fullEnv());
  assert.equal(res.status, 200);
  assert.equal(sentEmails.length, 1);
  assert.match(sentEmails[0].html, /Bonjour/);
});

// 3. Repeated submissions are rate-limited.
test("a fourth enquiry from one IP within the hour is refused", async () => {
  const env = fullEnv();
  for (let i = 0; i < 3; i++) assert.equal((await post(ENGLISH, env)).status, 200);
  const res = await post(ENGLISH, env);
  assert.equal(res.status, 429);
  assert.match((await res.json()).error, /email joshua@smoald\.com/);
  assert.equal(sentEmails.length, 3);

  // Someone else is unaffected.
  assert.equal((await post(ENGLISH, env, "198.51.100.1")).status, 200);
});

// 4. Obvious spam/bot submissions are challenged or rejected.
test("no Turnstile token, or a bad one, is refused before anything is sent", async () => {
  const { "cf-turnstile-response": _, ...noToken } = ENGLISH;
  assert.equal((await post(noToken, fullEnv())).status, 403);
  assert.equal((await post({ ...ENGLISH, "cf-turnstile-response": "forged" }, fullEnv())).status, 403);
  assert.equal(sentEmails.length, 0);
  assert.equal(anthropicCalls, 0, "a bot never costs a translation call");
});

test("the honeypot still swallows bots silently", async () => {
  const res = await post({ ...ENGLISH, website: "http://spam.example" }, fullEnv());
  assert.equal(res.status, 200);
  assert.equal(sentEmails.length, 0);
});

test("a cold sales pitch is delivered but tagged [Spam?]", async () => {
  analysis = {
    language: "German",
    is_english: false,
    english_translation: "We are a web agency and can build you a new business website cheaply.",
    is_sales_pitch: true,
  };
  await post({ ...ENGLISH, message: "Wir sind eine Webagentur ..." }, fullEnv());
  assert.equal(sentEmails.length, 1);
  assert.match(sentEmails[0].subject, /^\[Spam\?\] /);
  assert.match(sentEmails[0].html, /sales pitch/);
  assert.match(sentEmails[0].html, /block:sarah@bakery\.co\.uk/);
});

test("a message full of links is tagged [Spam?]", async () => {
  await post({ ...ENGLISH, message: "See https://a.example and www.b.example" }, fullEnv());
  assert.match(sentEmails[0].subject, /^\[Spam\?\] /);
});

// Blocking a sender.
test("a blocked email, domain or IP gets a thank-you and nothing is sent", async () => {
  for (const key of ["block:sarah@bakery.co.uk", "block:@bakery.co.uk", "block:203.0.113.7"]) {
    sentEmails = [];
    const res = await post(ENGLISH, fullEnv(fakeKV({ [key]: "spam run" })));
    assert.equal(res.status, 200, key);
    assert.equal(sentEmails.length, 0, key);
  }
});

test("blocking is not case-sensitive on the email", async () => {
  await post({ ...ENGLISH, email: "Sarah@Bakery.co.uk" }, fullEnv(fakeKV({ "block:sarah@bakery.co.uk": "x" })));
  assert.equal(sentEmails.length, 0);
});

// 5. Existing email notifications still work.
test("with none of the new settings the form behaves exactly as before", async () => {
  const res = await post(ENGLISH, { ...BASE_ENV });
  assert.equal(res.status, 200);
  assert.equal(sentEmails.length, 1);
  assert.equal(anthropicCalls, 0);
});

test("a Resend failure is still reported to the visitor", async () => {
  resendStatus = 500;
  const res = await post(ENGLISH, fullEnv());
  assert.equal(res.status, 502);
});

test("a no-JavaScript form post still gets the plain thank-you page", async () => {
  const request = new Request("https://smoald.com/api/enquiry", {
    method: "POST",
    headers: { Origin: "https://smoald.com", "CF-Connecting-IP": "203.0.113.9" },
    body: new URLSearchParams(ENGLISH),
  });
  const res = await onRequestPost({ request, env: fullEnv() });
  assert.equal(res.status, 200);
  assert.match(await res.text(), /Thank you/);
  assert.equal(sentEmails.length, 1);
});

// Engineering pass: the store and the email provider can fail independently.
test("a KV outage lets the enquiry through instead of crashing the form", async () => {
  const broken = {
    get: async () => { throw new Error("KV unavailable"); },
    put: async () => { throw new Error("KV unavailable"); },
  };
  const res = await post(ENGLISH, fullEnv(broken));
  assert.equal(res.status, 200);
  assert.equal(sentEmails.length, 1);
});

test("a send that fails at Resend does not use up one of the three tries", async () => {
  const kv = fakeKV();
  resendStatus = 500;
  assert.equal((await post(ENGLISH, fullEnv(kv))).status, 502);
  assert.equal(kv.store.has("rate:203.0.113.7"), false);
  resendStatus = 200;
  for (let i = 0; i < 3; i++) assert.equal((await post(ENGLISH, fullEnv(kv))).status, 200);
});

// Visitors without JavaScript: an error page must lead back to the form.
function noJsPost(fields, referer) {
  const headers = { Origin: "https://smoald.com", "CF-Connecting-IP": "203.0.113.20" };
  if (referer) headers.Referer = referer;
  const request = new Request("https://smoald.com/api/enquiry", {
    method: "POST", headers, body: new URLSearchParams(fields),
  });
  return onRequestPost({ request, env: fullEnv() });
}

test("a no-JavaScript error page links back to the form it came from", async () => {
  const { "cf-turnstile-response": _, ...noToken } = ENGLISH;
  const home = await (await noJsPost(noToken, "https://smoald.com/")).text();
  assert.match(home, /href="\/#enquiryForm">← Back to the form/);
  const contact = await (await noJsPost({ name: "" }, "https://www.smoald.com/contact")).text();
  assert.match(contact, /href="\/contact#enquiryForm">← Back to the form/);
});

test("with no Referer, or someone else's, the error page links to the contact form", async () => {
  for (const referer of [undefined, "https://evil.example/contact", "not a url"]) {
    const html = await (await noJsPost({ name: "" }, referer)).text();
    assert.match(html, /href="\/contact#enquiryForm"/, String(referer));
  }
});
