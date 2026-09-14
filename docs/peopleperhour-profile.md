# PeoplePerHour — profile and offers

Ready to paste. Written for someone with **no reviews yet**, which changes the
strategy: you cannot win on ratings, so you win on being specific, being UK
based, and being able to point at things that are live.

---

## The positioning problem

PPH is full of "web designer · 5★ · fast delivery · unlimited revisions", much
of it priced below what a UK freelancer can live on. Competing there on price
is unwinnable and not worth winning.

Three things separate you, and all three are true today:

1. **You handle the infrastructure.** Domain, DNS, SSL, hosting, deployment.
   Most web designers hand a client a folder of files and leave them to it.
2. **You build AI features that work.** A Claude-powered assistant with usage
   caps, live in production. Almost nobody at this price point can do that.
3. **You are the person who builds it.** No agency, no account manager, no
   junior. For a small business that is reassurance, not a limitation.

Lead with those. Never lead with "I know Python" or "I use AI tools" — buyers
do not care what you know, they care what they end up with.

---

## Profile title

```
UK Web Developer — Business Websites, Web Apps & Cloudflare Setup
```

PPH weights the title heavily in search. It names what is bought (websites, web
apps), where you are (UK), and the thing few others offer (Cloudflare).

---

## Profile description

```
I build websites and web applications for UK businesses — and I handle the
parts most developers hand back to you: domain, DNS, SSL, hosting and
deployment.

You deal with me directly from the first message to the day it goes live.
There is no account manager and nothing gets passed to a junior.

Recent work:

· A bilingual Thai/English website for a working honey farm — product
  catalogue, gallery and contact pages, rebuilt from a dated site and now
  loading in under a second.

· ThaiBridge AI — a subscription web app with user accounts, Stripe billing
  and a built-in AI tutor. Around 9,000 lines, 1,500 automated tests, live on
  its own domain. Both are linked below and both are running right now.

I also build AI chat assistants into websites — the kind that answer customer
questions — with usage limits so they cannot run up a bill.

I use AI coding tools as part of how I work, which is how one person ships at
this pace. Everything I hand over is reviewed, tested and deployed by someone
who understands every line of it.

Based in Lichfield, working with clients across the UK and remotely.
smoald.com
```

**Do not claim** years of experience, team size, or client numbers you do not
have. A buyer who checks and finds it untrue is gone, and PPH removes profiles
for it.

---

## Hourlies (fixed-price offers)

These matter more than the profile. PPH surfaces Hourlies in search, and a
buyer can purchase one without ever posting a job.

**PPH caps delivery at five days.** Nothing longer can be posted at all, which
is why the two big builds below were originally cut.

### Live (7)

| Title | Price | Delivery |
|---|---|---|
| Build your 5-page business website, live in 5 days | £445 | 5 days |
| Add Stripe payments, a database and file storage to your web app | £395 | 5 days |
| Restyle your existing website with a ready-made premium theme | £245 | 3 days |
| Set up your business online — Google, Meta and business email | £165 | 5 days |
| Fix your slow website and get it loading in under a second | £165 | 5 days |
| Set up your domain, DNS and SSL on Cloudflare | £145 | 5 days |
| Add a contact form to your website that actually reaches you | £95 | 5 days |

Every offer now carries a `HOW IT WORKS — STEP BY STEP` section (what the
buyer does before paying, then what happens day by day) and a section that
says why it is worth paying for. The five fixed-price jobs on
smoald.com/services carry the same steps, so the two stay in step.

The restyle offer (posted 2026-09-13) is the cheaper door into the theme: the
£445 offer builds a site from nothing, this one moves a site that already
exists — content and pages the buyer already has — onto the theme, in their
colours, with a commercial licence included. It is the PPH twin of the
"Website restyle onto the theme" row on smoald.com/pricing. Full copy is in
[Restyle offer copy](#restyle-offer-copy) below.

Prices sit slightly above the race-to-the-bottom and well below an agency.
They match smoald.com/pricing — keep the two in step.

### The five-day cap, and how the website build got past it

A site built from nothing needs seven to ten days honestly, so for a while
there was no offer on the profile that sold an actual website — the gap in
the lineup, and the most valuable thing missing from it.

The Classic & Modern theme closed it. The design already exists and has run in
production, so the five days go on the buyer's content rather than on deciding
what the site should look like. Five days is now an honest promise rather than
an optimistic one, and the offer says exactly that rather than leaving a buyer
to wonder how it is possible.

Priced at £445 against the £495 originally planned for seven days: faster and
cheaper is the right trade while there are no reviews to trade on.

### Posting an offer — what the form actually requires

- **Title: 64 characters**, and it follows "I can", so start with a verb
- **Short description: 150 characters**
- **Delivery: 5 days maximum**, no exceptions
- **An image is mandatory.** The form fails validation without one, and it is
  easy to miss because the error appears back up the page. 1200×800, and no
  business name or URL in it — the same rule as the text.
- Tags come from a fixed list. "Small business website" and "Business website"
  do not exist; "Website design", "Website development", "Responsive website"
  and "Html/html5" do.

### The description cap, and the checkbox that fails silently

Added 2026-09-14, when every offer gained a step-by-step HOW IT WORKS and a
why-it-is-worth-paying-for section (copy in
[how-it-works-copy.md](how-it-works-copy.md)):

- **The long description is capped at 2,500 characters.** Nothing on the
  form says so; the error appears under the box only after Update is
  pressed. Count with `len()` before pasting.
- **The delivery-policy checkbox must be a real click.** Ticking it through
  the DOM leaves it unticked as far as PPH is concerned, and the form then
  fails without visible error unless you scroll down to it. The `<input>`
  itself is `display:none` — the box you see is its label. Mouse clicks on
  the label (by reference or by coordinate) worked sometimes and missed
  sometimes. The deterministic fix is to call the label's own `.click()` in
  page JavaScript — it goes through the browser's activation path, so the
  form registers a genuine change:
  `[...document.querySelectorAll('input[type=checkbox]')].pop().closest('label').click()`
  then read `.checked` back (must be `true`) before pressing Update.
- **The Update Offer button can miss too.** Once, a click on it by reference
  did nothing while the form was valid; `button.click()` in page JavaScript
  submitted at once. The whole reliable recipe, in order: set the description
  → one real keystroke in the box (Space, Backspace) → `label.click()` on
  the checkbox → confirm `.checked === true` → `button.click()` on Update
  Offer → the page lands on `/hourlie/featureit` → open the PUBLIC offer
  page and read the change back.
- A successful update lands on the "Feature your Offer" page. That redirect
  is the only confirmation you get — then check the public offer page.

### What PPH will not allow in an offer

- Your company name, your full name, or any contact detail, in the title or
  description
- A link sending buyers to your own site for the full details

Both are worth remembering before writing, not after — they rule out the
"you can see my own work at…" close that would otherwise end the description.

### Hourly description template

```
WHAT YOU GET
· [the concrete deliverable, in plain words]
· Deployed live on your own domain, with SSL
· Works properly on phones — most of your visitors are on one
· Two rounds of changes included

HOW IT WORKS
1. You tell me what your business does and what you want the site to achieve
2. I build it and send you a link to review
3. You ask for changes, I make them
4. It goes live, and the code is yours

WHAT I NEED FROM YOU
Your text and images, your logo if you have one, and access to your domain
(or I can register one for you at cost).

WHAT IS NOT INCLUDED
The domain and hosting themselves — those go to the registrar and host, at
cost, in your name. Usually £8–15 a year for a domain, and hosting is often
free for a site this size. I will tell you honestly which you need.
```

The "what is not included" section wins work rather than losing it. Buyers on
PPH are used to being surprised by extras.

This template used to end "You can see my own work at smoald.com". That line
is removed: PPH does not allow an offer to name your business or send buyers
to your own site for the details. Let the offer stand on its own.

---

## Skills / tags

```
Web Development · Website Design · Flask · Python · HTML · CSS · JavaScript
Cloudflare · DNS · SSL · Website Migration · Website Maintenance
Stripe Integration · Web Application Development · AI Chatbot
Responsive Design · Landing Pages · Bug Fixing
```

Leave off anything not shipped — no React, Node, Django, WordPress or Shopify
until there is a real build behind it.

---

## Portfolio pieces

Add in this order. Each needs a screenshot, a link and two or three sentences.

1. **T.P.A. Honey Farm** — a real business, bilingual, live. Say plainly it
   was unpaid work for a friend's business; the honesty costs nothing and
   protects you if anyone asks.
2. **ThaiBridge AI** — accounts, payments, AI. The depth piece.
3. **smoald.com** — your own site. Shows you can do the whole job including
   the infrastructure.
4. **SMOALD Living** — an e-commerce front end, if you want a fourth.

Screenshots are ready in `Desktop\SMOALD-profile-photos\`.

---

## Who to go after

- Food and drink producers — you have one, and it is a portfolio piece
- Trades and local services with no site, or one that is visibly old
- Anyone whose site is slow, unencrypted, or broken on a phone
- Small shops outgrowing a marketplace stall
- Other freelancers and agencies who need a technical pair of hands
- Bilingual or Thai/English businesses — genuinely rare, and you have proof

---

## Proposal structure

Five short paragraphs. Never a template — buyers see dozens a day and can spot
one instantly.

1. **Repeat their problem in your own words**, with one specific detail from
   their post that proves you read it.
2. **Say how you would build it.** Approach, not jargon.
3. **Link the one most relevant thing you have built**, and say why it is
   relevant to them.
4. **Give a price and a timeline.** Never "depends on requirements".
5. **Ask one real question** that only somebody who understood the job would
   ask.

Send fewer, better proposals. Twenty considered ones beat two hundred
templated ones, and PPH charges you credits either way.

### Example

```
Hi [name],

You have a working Wix site but it is slow on mobile and you cannot edit the
menu without it breaking the layout — that combination usually means the theme
is fighting the content rather than anything being wrong with what you have
written.

I would rebuild it as a fast static site with the menu in a single file you
can edit yourself, so changing a price does not risk the layout. I would keep
your existing addresses so you do not lose whatever search ranking you have.

I did something similar for a honey farm recently — bilingual product
catalogue, and it went from around twenty seconds to load to under one. You can
see it at tpa-honey-website.pages.dev.

£595 and about 10 days, including moving the domain and getting SSL working.

One question: do you want to keep taking table bookings through the current
system, or is that something you would like changed at the same time?

Joshua
```

---

## The first five jobs

With no reviews, the first two are the hardest. Worth knowing:

- **Bid slightly low on your first two**, then never again. You are buying
  reviews, not setting a rate. Say so to yourself so it does not become a
  habit.
- **Deliver early.** An early delivery is the single most reliable way to get
  five stars and a repeat client.
- **Ask for the review.** Most buyers forget. One polite message when you hand
  over is enough.
- **Turn every job into a maintenance conversation.** A £495 site that becomes
  £45 a month is worth more by the end of year one than the build was.

---

## Restyle offer copy

Checked against the form limits: title 60/64, short description 144/150,
3-day delivery, no company name or link anywhere. (The first draft counted
149 by hand and was 151 — PPH rejected it. Count with `len()`, not by eye.)

**Title:** Restyle your existing website with a ready-made premium theme

**Short description:** Your pages and content moved onto a classic, book-style
theme in your brand colours, live on your domain in 3 days. Commercial licence
included.

**Price:** £245 · **Delivery:** 3 days · **Category:** Tech → Website
Development · **Tags:** Website design, Responsive website, Html/html5

```
WHAT YOU GET
· Your existing pages (up to eight) rebuilt on a ready-made theme that
  reads like a book rather than a dashboard — serif type, warm ground,
  a layout that chooses one, two or three columns from what each page
  holds
· Recoloured to your brand: your colours and fonts, applied once and
  followed everywhere — buttons, links, borders, hover states
· A site outline drawn up first, so every page has a home in the menu
  and nothing gets orphaned
· Deployed live on your own domain, with SSL
· Works properly on phones — most of your visitors are on one
· A commercial licence for the theme, so it is yours to keep editing
· Two rounds of changes included

HOW IT WORKS
1. You send me the link to your current site and your brand colours
2. I draw the outline, rebuild the pages on the theme and send you a
   link to review
3. You ask for changes, I make them
4. It goes live, and the code is yours

WHAT I NEED FROM YOU
The URL of your current site, your logo, your brand colours if you have
them (or I will pick from your logo), and access to your domain.

WHAT IS NOT INCLUDED
New copy or new pages — this moves what you already have onto a better
design. If you want a site built from nothing, my five-page website
offer is the one for that. Hosting and the domain stay in your name, at
cost; hosting is often free for a site this size.
```

Image: `docs/pph-restyle-theme.png` from `scripts/make_pph_restyle_image.py`
— a before/after of a plain page and the same page on the theme, no name or
URL on it. Posted 2026-09-13 (offer id 1131818) with "Remotely" selected, no
add-ons, and the "Feature your Offer" upsell declined as usual.

---

## Keep in step with the site

The prices here match `smoald.com/pricing`. If either changes, change both —
a buyer who finds two different numbers stops trusting either.

---

## PayPal — written, never run (checked 2026-09-12)

Worth about two hours, then it becomes a truthful claim and a set of tags that
get searched a lot.

**What exists in thaibridge-ai:** a real integration — ~59 references in
`app.py`, routes at `/subscribe/<tier>/paypal` and `/paypal/success`, OAuth
token handling, order creation and capture, and a `provider` column on the
payments table that already accepts `'paypal'`.

**Why it is not claimable yet:**

- Zero `PAYPAL_*` variables in `.env` — never configured, even locally
- No PayPal test file; Stripe has a full suite, PayPal has none of its own
- The live checkout page says it out loud: "PAYPAL NOT SET UP"

So it is code that has never processed a payment, not even in sandbox. Hiring
someone on that basis means finding the first bug on a customer's money.

**To make it true:**

1. Get PayPal sandbox credentials
2. Add `PAYPAL_CLIENT_ID` and `PAYPAL_CLIENT_SECRET` to `.env`
3. Run one sandbox payment all the way through
4. Write a test alongside the Stripe ones

**Then:** edit the backend-setup offer to mention PayPal, and add the `PayPal`
and `PayPal integration` tags. Editing a live offer takes a minute.
