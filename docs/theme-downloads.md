# Classic & Modern — how a sale turns into a download

Set up 2026-09-13. Before this, the Payment Links ended on "I'll email you a
download link within one working day" and every sale was fulfilled by hand.

## The flow

1. Buyer clicks Buy on `/products` → a Stripe Payment Link (one per licence).
2. Stripe takes the money (as merchant of record — tax is handled) and sends
   the buyer to `/templates-thanks?session_id=cs_live_…`.
3. That page asks `/api/download?session_id=…` (a Cloudflare Pages Function)
   whether the session is paid. If yes, it shows the download button; the
   button hits the same URL, which streams the zip.
4. The zip comes from the **latest GitHub release** of the private
   `classic-modern-theme` repo, fetched with a read-only token. It is never
   a public URL.

The thank-you page's address keeps working, so a buyer can come back for the
file later. Anyone without a paid session id gets a plain-English refusal
and an email address.

## Prices, products and links

| Licence | Price | Live Payment Link |
|---|---|---|
| Personal | £39 | https://buy.stripe.com/28EaEPcCZbb7gyxgOZdZ603 |
| Commercial | £99 | https://buy.stripe.com/6oUfZ99qN6UR5TTaqBdZ601 |
| Extended | £299 | https://buy.stripe.com/bJe7sDeL7a735TTaqBdZ604 |

Prices are tax-inclusive: the buyer pays the number on the page. The old
£29 and £249 prices and links were archived the same day.

`scripts/stripe_theme_setup.py` created all of this and is safe to re-run.
It adopts products by name, adds any missing price, makes sure each link
redirects to the thank-you page, and archives anything superseded. Run it
without flags for test mode, with `--live` for the live account (that needs
the CLI's restricted key to have Products, Prices and Payment Links set to
Write — the dashboard link in any "more_permissions_required" error goes
straight to the right page).

## What the Function needs (Cloudflare dashboard)

Workers & Pages → smoald → Settings → Variables and Secrets:

| Name | Type | Value |
|---|---|---|
| `STRIPE_SECRET_KEY` | Secret | A **restricted** key with only *Checkout Sessions: Read*. Test key (`rk_test_…`) to test, live key (`rk_live_…`) for real sales. Never the full secret key. |
| `GITHUB_TOKEN` | Secret | A fine-grained token: repository access only `classic-modern-theme`, permission *Contents: Read-only*. |
| `THEME_REPO` | Plain | `joshuablakemorekay/classic-modern-theme` |

Without them the page says "Downloads are not configured yet" and gives the
email address — buyers are never left with nothing.

## Testing it without spending money

1. Put the **test** restricted key in `STRIPE_SECRET_KEY`.
2. Buy through a test link (the script prints them when run without
   `--live`) with card `4242 4242 4242 4242`, any future date, any CVC.
3. You land on `/templates-thanks`; the button appears; the zip downloads.
4. Swap `STRIPE_SECRET_KEY` for the **live** restricted key. Done.

A live session id and a test key (or vice versa) fails with "Stripe does
not recognise that session" — that is the mismatch, not a bug.

## Releasing a new version of the theme

In the theme repo: bump `CHANGELOG.md`, `python scripts/build_release.py`,
then `gh release create vX.Y.Z dist/classic-modern-theme-X.Y.Z.zip`. The
Function always serves the latest release, so nothing here changes.
