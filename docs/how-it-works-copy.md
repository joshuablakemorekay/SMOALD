# "How it works" — step-by-step copy for every offer, product and service

Drafted 2026-09-14, after the START-HERE lesson: a buyer does not ask "how does
this work?", they ask "what do I do, and what happens next?" Every offer on
PeoplePerHour and every product and service on smoald.com gets the same
thing the theme got — the job as a procedure, in order, in plain English.

Two rules carried over from the theme:

- **It goes in the existing home.** On PPH that is the HOW IT WORKS section
  of each offer, expanded. On smoald.com it is a "How this job goes" block
  inside each existing card — no new page, no new nav entry.
- **The buyer's part comes first.** Step 1 is always what they send or decide
  before anything is built, because that is where a five-day job is won or lost.

PPH copy must not name the company or link to the site. The smoald.com copy
may; it is otherwise the same procedure, so the two stay in step.

Status: **APPLIED 2026-09-14.** All seven PPH offers were edited live, and
the site blocks shipped in `services.html` / `products.html` (collapsible
`<details class="how">` inside each card).

Two things changed between this draft and what is live on PPH:

- **PPH caps the description at 2,500 characters** (the error only shows
  after you press Update: "The details should be maximum 2500 characters
  long"). Three offers had to be trimmed to fit — the £445 site, the £395
  Stripe job and the £245 restyle. Sentences were tightened; no step and no
  section was dropped, except that on the Stripe offer "WHAT THIS IS" was
  folded into steps 1–2 and "THE PART PEOPLE GET WRONG" became the why
  section. The live offer text is the truth; this file is the source draft.
- **Every offer also got a "why this is worth paying for" answer.** Three
  offers gained a new `WHY THIS IS WORTH PAYING FOR` section (£445 site,
  £395 Stripe, £245 restyle). The other four already had one under another
  name — *The problem this solves*, *Why this matters more than it sounds*,
  *The most common cause*, *Why this is worth doing* — and each got one
  extra sentence that says the value in money-or-customers terms. On
  smoald.com the why-paragraph sits above the steps in every block.

**Editing a live offer — what actually works.** The description can be set
programmatically, but the "I confirm I can deliver" checkbox must be clicked
with a real mouse click — on its **label**, since the input is `display:none`
— or PPH silently refuses the save (an analytics
`form_submit` fires, no request reaches PPH, no error shows until you scroll
to the box). A successful save lands on `/hourlie/featureit?id=…`, which is
the upsell page — decline it. Then read the public offer page back: the
edit form is not proof.

---

## PeoplePerHour — the seven offers

Each block replaces the existing HOW IT WORKS section of that offer. Everything
else in the description stays as it is.

### 1 · Build your 5-page business website, live in 5 days — £445 (id 1131740)

```
HOW IT WORKS — STEP BY STEP

1. Before you buy, send me a sentence on what your business does and
   whether your text is written. I will tell you within a day if the
   five days are honest for you, or what would make them so.
2. Day 1 — I read everything you have sent and draw a one-page outline:
   five pages, what each one is for, what sits in the menu. You approve
   it before I build anything, so nothing gets built twice.
3. Day 1 — I put your home page on the design first, with your own words
   in it, so you see the look early rather than on the last day.
4. Day 2 to 3 — the other four pages, and a contact form wired to your
   inbox and tested with a real message.
5. Day 3 — you get a private link to review. Look at it on your phone as
   well as a computer; most of your visitors will.
6. Day 4 — your changes. Two rounds are included.
7. Day 5 — I connect your domain, switch on SSL and it goes live. You get
   the code and a short note on how to change your own text.
```

### 2 · Add Stripe payments, a database and file storage — £395 (id 1131724)

```
HOW IT WORKS — STEP BY STEP

1. Before you buy, send me the repository link or a description of what
   you are building. I will confirm this offer fits, or tell you plainly
   what would.
2. Day 1 — I read your code and we agree, in writing, exactly what people
   will pay for and what needs storing. Stripe, database and storage
   accounts are created in your name, or I use the ones you have.
3. Day 2 — the database connected and a first migration run. Every key
   and secret in environment variables, none in the code.
4. Day 3 — Stripe Checkout, the success page and receipt, and the webhook:
   the signed message from Stripe that is the only thing allowed to mark
   anyone as paid.
5. Day 4 — file storage wired in, then a test payment from start to
   finish with a test card, including the cases that go wrong: a declined
   card, an abandoned checkout, a duplicate webhook.
6. Day 5 — a written summary of what exists, what it will cost past the
   free tiers, how to change it, and the one checklist for going live.
```

### 3 · Restyle your existing website with a ready-made premium theme — £245 (id 1131818)

```
HOW IT WORKS — STEP BY STEP

1. Before you buy, send me the address of your current site. I will
   confirm it is eight pages or fewer and that this offer is the right
   one — if you actually need new pages or new copy, I will say so.
2. Day 1 — I read your site and draw an outline: every page you have,
   where it sits in the new menu, and anything that nothing links to.
   You approve it before I move a single page.
3. Day 1 — I set the theme to your colours and fonts, taken from your
   logo if you have no brand guide, and show you one page — usually the
   home page — before doing the rest.
4. Day 2 — the remaining pages moved across, word for word, and your old
   addresses redirected so the search ranking you have earned survives.
5. Day 2 — a private link to review. Two rounds of changes are included.
6. Day 3 — live on your domain with SSL. You get the code and the
   commercial licence, so it is yours to keep editing.
```

### 4 · Set up your business online — Google, Meta and business email — £165 (id 1131723)

```
HOW IT WORKS — STEP BY STEP

1. Before we start, you tell me what already exists — any Facebook page,
   Instagram, Google listing or email — and who controls each one.
   Untangling that is often the real job, and it is included.
2. Day 1 — your Google Business Profile created or claimed in an account
   the business owns, and verification requested. If you work at your
   customers' premises, I set it up as a service-area business so your
   home address is not published.
3. Day 1 — Meta Business Suite created, with your Facebook page and
   Instagram brought under it and away from anyone's personal phone.
4. Day 2 — business email on your own domain, and each member of staff
   given their own login with the access they need — no shared password.
5. Day 3 — you get a one-page summary: every account, who owns it, who
   has access, and how to remove someone in thirty seconds.
6. When Google's postcard arrives, five to fourteen days later, you enter
   the code. I will talk you through it — it is the one step only you can
   do.
```

### 5 · Add a contact form to your website that actually reaches you — £95 (id 1131722)

```
HOW IT WORKS — STEP BY STEP

1. Before we start, send me your site address, the inbox enquiries should
   reach, and what you want to ask people. Not sure? Tell me what you
   sell and I will suggest a sensible set of fields.
2. Day 1 — I build the form to match your site, with spam protection and
   a proper thank-you message. It works even with JavaScript turned off.
3. Day 1 — I send a real test message and check it lands in your inbox
   with the right reply address. Then you send one, from your phone.
4. Day 2 — any changes to the fields, and a handover note showing how to
   change the address it goes to yourself.
```

### 6 · Fix your slow website and get it loading in under a second — £165 (id 1131721)

```
HOW IT WORKS — STEP BY STEP

1. Before we start, send me your site address. I measure it cold — the
   first visit after it has sat idle — and send you the number. That is
   the "before", and it is usually worse than you think.
2. Day 1 — I find the cause: hosting that goes to sleep, images far
   larger than needed, no caching, hosting in the wrong part of the
   world, slow database queries. I tell you what it is, in plain
   English, before I change anything.
3. Day 2 — I apply the fixes and deploy the site properly, so it stays
   fast rather than being fast today.
4. Day 3 — I measure again the same way and send you both numbers with a
   summary of what changed. If the honest answer includes paid hosting,
   I say so — it goes to the host, in your name, and is usually a few
   pounds a month.
```

### 7 · Set up your domain, DNS and SSL on Cloudflare — £145 (id 1131720)

```
HOW IT WORKS — STEP BY STEP

1. Before we start, send me your domain name, where it is registered and
   where the site is hosted. Do not know? Send me the web address and I
   will work the rest out.
2. Day 1 — we create your Cloudflare account together, in your name, and
   I copy your existing DNS records across before anything is pointed at
   it, so nothing goes down.
3. Day 1 — nameservers switched, SSL turned on, and both www and non-www
   checked to load.
4. Day 2 — email routing if you want it, then I test from a phone on
   mobile data rather than only from my own computer, and send you a
   short note of what I changed and why.
```

---

## smoald.com — products

### Classic & Modern theme (products.html)

Goes under "What is in the download", as a collapsible "How to use it — the
ten steps". It is START-HERE.md from the download, condensed, so a buyer sees
the procedure before they pay for it.

```
HOW TO USE IT — THE TEN STEPS

The first three have nothing to do with the theme, and they are half the job.

1. Decide what the site is for — who it is for, and what you want a
   visitor to do.
2. Plan your pages. Five or six is plenty. That list becomes your menu.
3. Gather your content first — the words for each page, your photos, your
   logo, two or three brand colours.
4. Open index.html and click through the demo. Notice which layout suits
   each of your pages.
5. Copy the folder and rename it after your site. Leave the original
   untouched.
6. Keep the pages you need, delete the rest, duplicate one for any extra.
7. Swap the words and pictures, one page at a time. Home first.
8. Change the site name and the colours. One block at the top of theme.css
   controls the colours for every page.
9. Open every page, click every link, try it on your phone.
10. Upload the folder to any web host. Nothing to install.

Stuck on any step? Email support is included for 60 days. And if you would
rather not do steps 5 to 10 at all, installation on your domain starts at £150.
```

The Flask starter is still "In preparation" — nothing added until it ships.

---

## smoald.com — services (services.html)

Each package and fixed-price job gets a collapsible "How this job goes" inside
its existing card. The five fixed-price jobs use the same steps as their PPH
twins above (Domain/DNS/SSL, Fix slow site, Contact form, Business online,
Payments/database/storage) so the two stay in step — not repeated here.

### Starter website — from £450, 1–2 weeks

```
1. You tell me what your business does and what the site needs to
   achieve. If your text is not written yet, say so — I can work from
   notes, and it changes the timeline honestly rather than quietly.
2. I send a fixed quote and a one-page outline: three to five pages, what
   each is for, what sits in the menu. You approve both.
3. The 50% deposit clears and work starts. Your home page goes on the
   design first, with your own words, so you see the look in week one.
4. The remaining pages, the contact form tested with a real message, and
   the basic SEO so you can be found by name.
5. A private link to review. Two rounds of changes are included.
6. Your domain connected, SSL on, live. The balance is due now, and the
   code and copyright are yours.
7. Thirty days of aftercare — anything that does not behave, I fix.
```

### Professional business website — from £900, 2–4 weeks

```
1. We talk through the business properly — what you sell, who buys it,
   what a good enquiry looks like. This one deserves an hour, not an
   email.
2. I draw the site outline: six to twelve pages, the catalogue or gallery
   if you need one, and where the forms, maps or bookings sit. You
   approve it before any building.
3. Fixed quote, 50% deposit, work starts.
4. Built in the order you will review it — home and the main service
   pages first, catalogue and integrations second — with a private link
   updated as it grows, so there is no big reveal at the end.
5. Wording help along the way if you want it, and search and analytics
   set up so you can see who arrives and from where.
6. Two rounds of changes, then live on your domain with SSL. Balance due;
   code and copyright yours.
7. Google Business Profile connected, and thirty days of aftercare.
```

### Website redesign — from £600, 2–3 weeks

```
1. Send me the address of your current site. I read all of it and list
   every page and every address that search engines know about.
2. I send a fixed quote and an outline of the new site: what stays, what
   merges, what goes — and a redirect for every old address so the
   ranking you have earned survives the move.
3. 50% deposit, work starts. Your existing content moves across first,
   then the design goes on top; the words are the valuable part.
4. Made to work properly on phones, made faster, SSL sorted.
5. A private link to review, side by side with the old site. Two rounds
   of changes.
6. The switch: redirects live, old site off, new site on, and every old
   address checked. Balance due; code and copyright yours.
```

### Custom web application — from £2,500, quoted in phases

```
1. We start with what the business actually does, not with features. I
   want to see the spreadsheet, the inbox or the process you are trying
   to replace.
2. I write up the phases — usually accounts and sign-in first, then the
   core tool, then payments, then the admin area — each with its own
   fixed price. You only ever commit to the next phase.
3. Phase one: deposit, build, automated tests written alongside, a
   private link you can log in to.
4. You use it for real for a week before we agree the next phase. What
   you learn changes the plan, and it should.
5. Each further phase the same way: quote, deposit, build, tests, review,
   live.
6. Every phase ships deployed, tested and documented, so if we stop after
   any of them you have a working product, not half of one.
```

### Domain, DNS, SSL & deployment — from £145, 1–2 days

Same steps as the PPH Domain/DNS/SSL offer, plus:

```
5. If the site is not live yet, I deploy it too — and if it is on hosting
   that goes to sleep, I fix that at the same time.
```

### Maintenance & care plans — from £30/month

```
1. We start with a short health check: backups, updates, SSL expiry,
   what is monitoring the site, and who has access to what. Anything
   already wrong is fixed before the plan starts.
2. Monitoring switched on — I know the site is down before you do.
3. Every month: backups taken, software updated, small text changes made
   as you send them. On the Care plan, an hour of changes and a short
   report on what happened.
4. Something looks wrong? You email me. That is the plan.
5. One month's notice to stop, whenever you like. Everything stays in
   your name.
```

### Template installation — from £150, usually two days

```
1. Send me which template, your domain, and your content — words and
   images for each page.
2. Day 1 — I put your content on the template, wire the forms to your
   inbox and test them with a real message.
3. Day 1 — a private link to review on your phone.
4. Day 2 — your domain connected, SSL on, live. You have a finished site
   without touching any code.
```

### Template customisation — from £250, quoted

```
1. Tell me what does not fit: your colours and fonts, extra pages, a
   feature the template does not have.
2. I send a fixed quote for exactly that list, and nothing appears on the
   bill that is not on it.
3. Deposit, then the changes, then a private link to review.
4. Live, and a short note on what I changed so the next person — or you —
   can find it.
```
