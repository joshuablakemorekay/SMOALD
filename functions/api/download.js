/**
 * GET /api/download?session_id=cs_... — Cloudflare Pages Function.
 *
 * Hands a buyer the Classic & Modern theme zip, but only after asking Stripe
 * whether that Checkout Session was actually paid. The zip itself lives on a
 * GitHub release of the private theme repo, so it is never a public URL.
 *
 * Required environment variables (Cloudflare dashboard →
 * Workers & Pages → smoald → Settings → Environment variables):
 *
 *   STRIPE_SECRET_KEY   secret   sk_test_… for the sandbox, sk_live_… when live.
 *                                A RESTRICTED key with only "Checkout Sessions:
 *                                read" is enough and is the safer choice.
 *   GITHUB_TOKEN        secret   fine-grained token, Contents: read, on the
 *                                classic-modern-theme repo only.
 *   THEME_REPO          plain    joshuablakemorekay/classic-modern-theme
 *
 * Mark both secrets as SECRET, never plain, and never commit them.
 *
 * Flow: Stripe's Payment Link redirects to /templates-thanks?session_id=…,
 * that page links here, and this checks payment_status === "paid" before
 * streaming the latest release asset back with a download filename.
 */

const STRIPE = "https://api.stripe.com/v1";
const GITHUB = "https://api.github.com";

function fail(status, message) {
  return new Response(message, {
    status,
    headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "no-store" },
  });
}

export async function onRequestGet(context) {
  return handle(context, false);
}

// The thank-you page asks HEAD first, so it can show the button only when
// the payment checks out — without downloading the zip twice.
export async function onRequestHead(context) {
  return handle(context, true);
}

async function handle({ request, env }, headOnly) {
  const sessionId = new URL(request.url).searchParams.get("session_id") || "";
  if (!/^cs_(test|live)_[A-Za-z0-9]+$/.test(sessionId)) {
    return fail(400, "That download link is missing its session id.");
  }
  if (!env.STRIPE_SECRET_KEY || !env.GITHUB_TOKEN || !env.THEME_REPO) {
    return fail(500, "Downloads are not configured yet. Please email joshua@smoald.com and I will send the file by hand.");
  }

  // 1. Is this session paid, and is it one of ours?
  const sessionRes = await fetch(`${STRIPE}/checkout/sessions/${sessionId}`, {
    headers: { authorization: `Bearer ${env.STRIPE_SECRET_KEY}` },
  });
  if (!sessionRes.ok) {
    return fail(404, "Stripe does not recognise that session. If you have paid, email joshua@smoald.com with your receipt.");
  }
  const session = await sessionRes.json();
  if (session.payment_status !== "paid") {
    return fail(402, "That payment has not completed yet. Finish checkout and try the link again.");
  }
  if (session.metadata?.product !== "classic-modern-theme") {
    return fail(403, "That session is not for the Classic & Modern theme.");
  }

  if (headOnly) {
    return new Response(null, { status: 200, headers: { "cache-control": "no-store" } });
  }

  // 2. Find the latest release asset on the private theme repo.
  const gh = { authorization: `Bearer ${env.GITHUB_TOKEN}`, "user-agent": "smoald-downloads" };
  const releaseRes = await fetch(`${GITHUB}/repos/${env.THEME_REPO}/releases/latest`, { headers: gh });
  if (!releaseRes.ok) {
    return fail(502, "The download is temporarily unavailable. Email joshua@smoald.com and I will send it by hand.");
  }
  const release = await releaseRes.json();
  const asset = (release.assets || []).find((a) => a.name.endsWith(".zip"));
  if (!asset) {
    return fail(502, "No release file found. Email joshua@smoald.com and I will send it by hand.");
  }

  // 3. Stream it through. Asking for application/octet-stream makes GitHub
  //    return the file bytes rather than the asset's JSON description.
  const fileRes = await fetch(asset.url, {
    headers: { ...gh, accept: "application/octet-stream" },
  });
  if (!fileRes.ok) {
    return fail(502, "The download failed part way. Try again, or email joshua@smoald.com.");
  }
  return new Response(fileRes.body, {
    headers: {
      "content-type": "application/zip",
      "content-disposition": `attachment; filename="${asset.name}"`,
      "cache-control": "no-store",
    },
  });
}
