# Classic &amp; Modern — buyer email

**Status:** template, never yet sent
**Send when:** Stripe notifies a sale on one of the three Payment Links

Delivery is manual. Stripe takes the money and emails a receipt; nothing else
happens on its own. This is the email that turns a payment into a delivered
product, so it needs sending the same day.

## Before sending

1. Open the Stripe payment in the dashboard and note the **buyer's name, email
   and which licence they bought**.
2. Swap `[NAME]` and `[TIER]`, and **attach the zip**:
   `web-projects/classic-modern-theme-1.0.0.zip` (28 KB).
3. **Delete the two tier paragraphs that do not apply.** Sending all three
   reads as a form letter and invites an argument about which one they have.
4. Rebuild the zip first if the theme has changed since the last sale, and
   bump the version in its filename to match `CHANGELOG.md`.

## Delivery method

The zip goes **as an email attachment**. It is 28 KB, which is nothing, so
there is no hosting to arrange, no private link to keep alive and nothing to
rot in a year's time. It also means no URL exists that could be passed around.

Rejected, and why:

- **A private download link** (Cloudflare R2, an unlisted Pages path) — more
  moving parts than a 28 KB file deserves, and the link works for anyone who
  ends up with it.
- **A GitHub collaborator invite** — buyers are often designers or small
  business owners with no GitHub account, and "make an account and accept an
  invite" before they have even seen the files is friction at the worst
  possible moment. Still worth offering to anyone who asks for repo access.

Revisit this if the package ever grows past a few megabytes, or if sales get
frequent enough that sending each one by hand stops being reasonable.

---

## The email

**Subject:** Your Classic &amp; Modern licence — download inside

---

Hello [NAME],

Thank you for buying Classic &amp; Modern. Here is everything you need.

The theme is attached to this email as a zip.

**Your licence: [TIER]**

> *Personal* — use it on one website of your own. Commercial use on that site
> is fine; it's the number of sites that's limited, not what you do with them.
>
> *Commercial* — use it on unlimited websites you build for paying clients.
> Your client gets a working website; they don't get a licence to reuse the
> theme elsewhere.
>
> *Extended* — everything in Commercial, plus you can include it inside a
> product you sell on — a SaaS app, a hosted service, a paid platform.

The full terms are in the `LICENSE` file in your download, and at
https://smoald.com/legal/licence. Nothing in them will surprise you: build
things with it, don't resell it as a theme.

**Getting started**

1. Unzip it and open `index.html` in a browser. That's the whole installation
   — no build step, nothing to install.
2. Open `css/theme.css`. The colours are in one block at the top; change them
   and the rest of the site follows.
3. `README.md` covers the layout system, which is the part worth ten minutes
   of your time.

**What you're covered for**

- Email support for 60 days, covering installation and anything that doesn't
  behave as the README says it does
- Bug fixes for 12 months
- Free updates for 12 months — I'll email you if there's a new version

Not covered: building custom features, debugging changes you've made, or
general web development tuition. All of those are available as paid work, so
just ask if you want a quote.

Your receipt and VAT invoice come separately from Stripe, who process the
payment.

If anything at all doesn't work, reply to this email and tell me what you're
seeing. I'd much rather hear about it than not.

Best wishes,

Joshua Kay
SMOALD
joshua@smoald.com · smoald.com

---

## Why it is worded this way

- **The tier is explained in the email, not just the licence file.** It
  duplicates `LICENSE`, but somebody who has just paid £249 should not have to
  open a text file to find out what they bought.
- **Stripe is named for the invoice, not Onelink.** Stripe is the name buyers
  recognise. If anyone queries the name on their statement, explain it then.
- **The files are attached, not linked.** A buyer who keeps the email keeps the
  product. Nothing expires, and there is no link to go dead a year later and
  generate a refund request.
- **Support limits are stated plainly and match the licence.** 60 days support,
  12 months fixes and updates — the same figures as `LICENSE` and the README.
  If one changes, change all three.

## Obligations this email creates

Sending it commits you to work later. Worth knowing before volume grows:

- 60 days of support per buyer, from their purchase date
- 12 months of bug fixes, for everyone who has ever bought
- An email to every past buyer when a new version ships

Keep a record of who bought what and when. Stripe has it, but a one-line
entry per sale somewhere of your own is what makes the update email possible.
