# Classic &amp; Modern — buyer email

**Status:** template, never yet sent
**Send when:** Stripe notifies a sale on one of the three Payment Links

Delivery is manual. Stripe takes the money and emails a receipt; nothing else
happens on its own. This is the email that turns a payment into a delivered
product, so it needs sending the same day.

## Before sending

1. Open the Stripe payment in the dashboard and note the **buyer's name, email
   and which licence they bought**.
2. Swap `[NAME]`, `[LINK]` and `[TIER]`.
3. **Delete the two tier paragraphs that do not apply.** Sending all three
   reads as a form letter and invites an argument about which one they have.
4. Check the download link works from a signed-out browser before sending.

## Delivery method

A zip on a private link — Cloudflare R2 or an unlisted Pages URL — rather than
a GitHub collaborator invite. Buyers are often designers or small business
owners with no GitHub account, and "make an account and accept an invite"
before they have even seen the files is friction at the worst moment. Repo
access stays available to anyone who asks for it.

---

## The email

**Subject:** Your Classic &amp; Modern licence — download inside

---

Hello [NAME],

Thank you for buying Classic &amp; Modern. Here is everything you need.

**Download:** [LINK]

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
- **No download deadline.** Tempting for tidiness, but a dead link a year later
  generates refund requests rather than preventing them.
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
