/**
 * POST /api/enquiry — Cloudflare Pages Function.
 *
 * Receives the enquiry form, validates it, and emails it to CONTACT_TO.
 *
 * Required environment variables (Cloudflare dashboard →
 * Workers & Pages → smoald → Settings → Environment variables):
 *
 *   RESEND_API_KEY   secret   API key from resend.com (free tier: 3,000/month)
 *   CONTACT_TO       plain    where enquiries are sent, e.g. joshua@smoald.com
 *   CONTACT_FROM     plain    the sender address (see below)
 *
 * Mark RESEND_API_KEY as a SECRET, never a plain variable, and never commit it.
 *
 * TWO WAYS TO SET CONTACT_FROM
 *
 *   1. Quick start, no DNS needed. Use `onboarding@resend.dev`. Resend allows
 *      this sender without verifying a domain, but it will only deliver to the
 *      address the Resend account was opened with — so sign up using the same
 *      address as CONTACT_TO and the form works straight away. Enquiries
 *      arrive from "SMOALD enquiries <onboarding@resend.dev>".
 *
 *   2. Proper setup, once the DNS records are in. Verify smoald.com in Resend,
 *      add the records it gives you to Cloudflare DNS, then switch this to
 *      `enquiries@smoald.com`. Better deliverability, and the sender reads as
 *      your own domain rather than Resend's.
 *
 * Start with 1 so the form is live today; move to 2 when convenient. Nothing
 * in the code changes — only this one environment variable.
 */

const LIMITS = {
  name: 100,
  email: 150,
  business: 150,
  need: 80,
  budget: 60,
  message: 4000,
};

const ALLOWED_ORIGINS = ['https://smoald.com', 'https://www.smoald.com'];

/** Escape user input before it goes anywhere near HTML. */
function esc(value) {
  return String(value == null ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function json(body, statusCode) {
  return new Response(JSON.stringify(body), {
    status: statusCode,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}

/** Plain HTML response for visitors without JavaScript. */
function page(title, message, statusCode) {
  const html = `<!DOCTYPE html><html lang="en-GB"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)} · SMOALD</title>
<style>body{font-family:system-ui,sans-serif;background:#FBF6EC;color:#1A120B;
display:grid;place-items:center;min-height:100vh;margin:0;padding:24px;line-height:1.6}
div{max-width:34rem;text-align:center}h1{font-size:1.6rem;margin:0 0 12px}
a{color:#E20613}</style></head><body><div>
<h1>${esc(title)}</h1><p>${esc(message)}</p>
<p><a href="/">← Back to smoald.com</a></p></div></body></html>`;
  return new Response(html, {
    status: statusCode,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}

export async function onRequestPost(context) {
  const { request, env } = context;

  // Only accept submissions that came from the site itself.
  const origin = request.headers.get('Origin');
  if (origin && !ALLOWED_ORIGINS.includes(origin)) {
    return json({ error: 'Unrecognised origin.' }, 403);
  }

  const wantsJson = (request.headers.get('Accept') || '').includes('application/json');

  // Accept either a JSON body (from enquiry.js) or a normal form POST.
  let data;
  try {
    const contentType = request.headers.get('Content-Type') || '';
    if (contentType.includes('application/json')) {
      data = await request.json();
    } else {
      data = Object.fromEntries(await request.formData());
    }
  } catch {
    return wantsJson
      ? json({ error: 'Could not read that submission.' }, 400)
      : page("That didn't send", 'Please email joshua@smoald.com instead.', 400);
  }

  // Honeypot: a real person never fills this in.
  if (data.website) {
    return wantsJson ? json({ ok: true }, 200) : page('Thank you', 'Your enquiry has been sent.', 200);
  }

  const fields = {};
  for (const [key, max] of Object.entries(LIMITS)) {
    fields[key] = String(data[key] == null ? '' : data[key]).trim().slice(0, max);
  }

  const missing = ['name', 'email', 'need', 'budget', 'message'].filter((k) => !fields[k]);
  if (missing.length) {
    const error = 'Please fill in every required field.';
    return wantsJson ? json({ error }, 400) : page("That didn't send", error, 400);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(fields.email)) {
    const error = 'That email address does not look right.';
    return wantsJson ? json({ error }, 400) : page("That didn't send", error, 400);
  }

  if (!env.RESEND_API_KEY || !env.CONTACT_TO || !env.CONTACT_FROM) {
    console.error('Enquiry form is missing RESEND_API_KEY, CONTACT_TO or CONTACT_FROM.');
    const error = 'The form is not configured yet. Please email joshua@smoald.com.';
    return wantsJson ? json({ error }, 500) : page("That didn't send", error, 500);
  }

  const rows = [
    ['Name', fields.name],
    ['Email', fields.email],
    ['Business', fields.business || '—'],
    ['Needs', fields.need],
    ['Budget', fields.budget],
  ]
    .map(([label, value]) => `<tr><td><strong>${esc(label)}</strong></td><td>${esc(value)}</td></tr>`)
    .join('');

  const body = `<h2>New enquiry from smoald.com</h2>
<table cellpadding="6" style="border-collapse:collapse">${rows}</table>
<h3>Message</h3>
<p style="white-space:pre-wrap">${esc(fields.message)}</p>`;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `SMOALD enquiries <${env.CONTACT_FROM}>`,
        to: [env.CONTACT_TO],
        reply_to: fields.email,
        subject: `Enquiry — ${fields.need} — ${fields.name}`,
        html: body,
      }),
    });

    if (!res.ok) {
      console.error('Resend rejected the enquiry:', res.status, await res.text());
      const error = "That didn't send. Please email joshua@smoald.com instead.";
      return wantsJson ? json({ error }, 502) : page("That didn't send", error, 502);
    }
  } catch (err) {
    console.error('Enquiry send failed:', err);
    const error = "That didn't send. Please email joshua@smoald.com instead.";
    return wantsJson ? json({ error }, 502) : page("That didn't send", error, 502);
  }

  return wantsJson
    ? json({ ok: true }, 200)
    : page('Thank you', "That's with me. I'll reply within one working day.", 200);
}

/** Someone visiting /api/enquiry directly gets sent back to the form. */
export async function onRequestGet() {
  return new Response(null, { status: 303, headers: { Location: '/#enquire' } });
}
