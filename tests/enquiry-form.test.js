// Tests for assets/enquiry.js — the form's own checking, in the browser.
// Run with:  node --test
//
// jsdom builds the real contact and home pages in memory and runs the real
// script against them, so a change to either the markup or the script that
// breaks the empty-form path fails here. Turnstile's script is never loaded;
// the form must work without it.
//
// The bug this guards: the form is `novalidate`, and a missing field used to
// fall through to the no-JavaScript POST, sending the visitor to a bare error
// page with their typing gone.

import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { JSDOM } from "jsdom";

const script = readFileSync(new URL("../assets/enquiry.js", import.meta.url), "utf8");

function loadPage(file) {
  const html = readFileSync(new URL(`../${file}`, import.meta.url), "utf8");
  const dom = new JSDOM(html, { url: "https://smoald.com/", runScripts: "outside-only" });
  const { window } = dom;
  const sent = [];
  window.fetch = async (url, init) => {
    sent.push(JSON.parse(init.body));
    return { ok: true, json: async () => ({ ok: true }) };
  };
  window.eval(script);

  const doc = window.document;
  const form = doc.getElementById("enquiryForm");
  // Registered after the script's own handler, so it sees the final verdict.
  let leftThePage = null;
  form.addEventListener("submit", (e) => { leftThePage = !e.defaultPrevented; });

  const field = (id) => doc.getElementById(id);
  const invalid = () => [...form.querySelectorAll('[aria-invalid="true"]')].map((f) => f.id);
  return {
    window, doc, form, field, invalid, sent,
    submit() { form.requestSubmit(); return leftThePage; },
    status: () => doc.getElementById("efStatus").textContent,
  };
}

function fillIn(page) {
  page.field("ef-name").value = "Sarah Jones";
  page.field("ef-email").value = "sarah@bakery.co.uk";
  page.field("ef-need").value = "A new business website";
  page.field("ef-budget").value = "Under £500";
  page.field("ef-message").value = "A simple site with our opening hours.";
}

for (const file of ["contact.html", "index.html"]) {
  test(`${file}: an empty form stays on the page and says what is missing`, () => {
    const page = loadPage(file);
    assert.equal(page.submit(), false, "the form must not fall through to the no-JS POST");
    assert.equal(page.sent.length, 0);
    assert.deepEqual(page.invalid(), ["ef-name", "ef-email", "ef-need", "ef-budget", "ef-message"]);
    assert.equal(
      page.status(),
      "Please check: Your name, Email, What do you need?, Rough budget, Tell me a bit more.",
    );
    assert.equal(page.doc.activeElement.id, "ef-name", "the cursor goes to the first problem");
    assert.equal(page.field("ef-name").getAttribute("aria-describedby"), "efStatus",
      "a screen reader hears the message on arriving at the field");
  });

  test(`${file}: the optional business field and the honeypot are never flagged`, () => {
    const page = loadPage(file);
    page.submit();
    assert.equal(page.field("ef-business").hasAttribute("aria-invalid"), false);
    assert.equal(page.field("ef-website").hasAttribute("aria-invalid"), false);
  });

  test(`${file}: a malformed email is flagged on its own`, () => {
    const page = loadPage(file);
    fillIn(page);
    page.field("ef-email").value = "sarah-at-bakery";
    assert.equal(page.submit(), false);
    assert.deepEqual(page.invalid(), ["ef-email"]);
    assert.equal(page.status(), "Please check: Email.");
    assert.equal(page.doc.activeElement.id, "ef-email");
  });

  test(`${file}: fixing a field clears its error straight away`, () => {
    const page = loadPage(file);
    page.submit();
    const name = page.field("ef-name");
    name.value = "Sarah";
    name.dispatchEvent(new page.window.Event("input", { bubbles: true }));
    assert.equal(name.hasAttribute("aria-invalid"), false);
    assert.equal(name.hasAttribute("aria-describedby"), false);
    assert.equal(page.invalid().includes("ef-email"), true, "unfixed fields stay flagged");
  });

  test(`${file}: a complete form is sent in place, with nothing flagged`, async () => {
    const page = loadPage(file);
    fillIn(page);
    assert.equal(page.submit(), false, "sent by fetch, so the page itself stays put");
    assert.deepEqual(page.invalid(), []);
    assert.equal(page.sent.length, 1);
    assert.equal(page.sent[0].email, "sarah@bakery.co.uk");
    assert.equal(page.sent[0].website, "", "the honeypot travels empty");
    await new Promise((r) => setTimeout(r, 0));
    assert.match(page.status(), /that's with me/);
  });
}
