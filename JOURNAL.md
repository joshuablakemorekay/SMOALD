# Development Journal — SMOALD.com Hub
A chronological log of key developments, decisions and learnings throughout this project.

---

## 2026-06-08 — Designed the SMOALD brand architecture

**TL;DR:** Settled on a Virgin-style hub-and-spoke brand — one parent (SMOALD) with three mini-hubs (AI, Learn, Store) — and made the key call to build the site that gets me hired *now*, not the full holding company.

**Type:** Decision

**What I built or did**
Mapped SMOALD as a parent brand with divisions, modelled on Virgin Group and Meta. Worked through naming (Tech vs AI vs Dev → **AI**), merged overlapping divisions, and landed on three hubs: Build (AI), Learn, Store.

**Why I did it this way**
A founder brand lets me charge more and scale later — but six empty divisions would look hollow with nothing shipped. So: founder brand now, holding-company structure once the divisions actually exist.

**How We Did It**
1) Compared Virgin/Meta hub-and-spoke models → 2) listed every possible division → 3) merged the overlaps (Tech + AI + Commerce → one build hub; Wear + Living + Store → one Store hub) → 4) chose Anthropic-style focus for layout + Virgin-style story for the About page → 5) decided to put my portfolio *under* SMOALD, not on a separate site.

**What I learned**
Brand architecture is a real discipline. Borrow selectively — Virgin's story, Anthropic's restraint — rather than copying one site wholesale. An org chart isn't traction.

**References / Conversations**
Brainstorm sessions; archived as the [`design-smoald-brand-strategy`](./prompts/design-smoald-brand-strategy/) prompt.

---

## 2026-06-14 — Researched free hosting and chose Cloudflare

**TL;DR:** Ran a deep, multi-source comparison of free hosting tiers and chose **Cloudflare** — the one platform that allows commercial use, never expires, and gives unlimited static bandwidth.

**Type:** Decision / Research

**What I built or did**
Compared the genuinely-free tiers of Vercel, Netlify, Render and Cloudflare against one question: which lets a freelancer run a *commercial* project for free? Wrote the findings up as a sourced report (250+ sources).

**Why I did it this way**
Picking the wrong host costs money or forces a painful migration once you have paying clients. Worth getting right once.

**How it works**
The headline findings: Vercel's free Hobby tier *bans* commercial use; GitHub Pages bans e-commerce/SaaS; Render's free Postgres expires after 30 days and its services sleep. Cloudflare allows commercial use, has no expiry, and unlimited static bandwidth — so no surprise bills.

**How We Did It**
1) Framed the real question (commercial-use-on-free) → 2) ran a deep-research sweep across 250+ sources → 3) ranked platforms worst→best on "likely to force payment" (Render → Netlify → Cloudflare) → 4) chose Cloudflare → 5) noted the one gotcha: new Next.js apps go on Workers via the OpenNext adapter, with a 3 MiB free size cap.

**What I learned**
"Free" almost always has an operational catch (sleeping, expiry, size caps), not a legal one. Free is perfect for building and first customers; budget to upgrade the revenue app later.

**References / Conversations**
Deep-research session; archived as the [`choose-hosting-platform`](./prompts/choose-hosting-platform/) prompt.

---

## 2026-06-15 — Built & shipped the SMOALD.com brand hub

**TL;DR:** Turned a brand-architecture idea into a live, 4-page "brand house" website on Cloudflare Pages with the `smoald.com` domain — then documented the prompts that built it.

**Type:** Milestone

**What I built or did**
A parent homepage with three "doors" (SMOALD AI, Learn, Store), a page per mini-hub, and a hub-and-spoke architecture map. Wired my portfolio in at `/ai/hire`. Deployed it and connected `smoald.com`.

**Why I did it this way**
A unified brand house makes me look like a founder running a company, not a freelancer for hire — and it scales as new products go live.

**How it works**
Static HTML matching my portfolio's design. Honest "coming soon" badges, relative links, a `/hire` redirect. Deployed with wrangler; domain via Cloudflare DNS (CNAMEs → `smoald.pages.dev`).

**How We Did It**
1) Built the 4-page hub from the brief → 2) added the full spokes + map → 3) brought the portfolio in and renamed the project to `smoald` → 4) renamed "Tech" → "AI" and restructured URLs → 5) deployed to Cloudflare Pages → 6) moved `smoald.com` to Cloudflare + added DNS → 7) archived the prompts with an eval harness.

**What I learned**
Domain setup has real gotchas: Pages custom domains need DNS records that the API won't auto-create, and a Pages-only token can't list accounts. Also fixed a Windows UTF-8 crash in the eval runner.

**References / Conversations**
This Claude Code session; repo `joshuablakemorekay/smoald`.

---

## 2026-06-15 — smoald.com verified live

**Type:** Milestone

**What I built or did**
Confirmed the custom domain is fully live: `https://smoald.com` returns HTTP 200 over HTTPS with a valid SSL certificate, both the apex and `www` are active on Cloudflare, and the domain resolves globally. The build → deploy → custom-domain chain is complete.

---

## 2026-06-15 — Redesigned the homepage from a Figma design

**TL;DR:** Merged a Figma design's red/yellow/orange colour system and an interactive "Ecosystem" into the live homepage — keeping everything that already worked — then added the real logo and archived the prompts.

**Type:** Feature

**What I built or did**
A three-colour pillar system (Build = orange, Learn = yellow, Shop = red), an interactive "Ecosystem" visual that replaced the old static map, restyled cards, and a blended hero. Later swapped my placeholder wordmark for the real cloud + globe logo.

**Why I did it this way**
I loved the Figma design but didn't want to lose my founder framing, copy, or sub-pages — so I merged the best ideas into the existing site instead of rebuilding from scratch.

**How it works**
Still one static HTML file, no build step. The logo screenshots had a dark background, so I removed it automatically with a small Python script to get clean transparent images.

**How We Did It**
1) Backed up the site → 2) reviewed the Figma screenshots → 3) built a preview so the live site stayed safe → 4) deployed the redesign → 5) added the real logo with its background removed → 6) archived the prompts with an eval harness.

**What I learned**
This repo doesn't auto-publish on a git push — it only goes live when I run the deploy command. Catching that stopped me calling it "live" too early.

**References / Conversations**
This Claude Code session; repo `joshuablakemorekay/smoald`.

---

## 2026-06-16 — First Store brand goes live: SMOALD Living

**TL;DR:** SMOALD Living (the homeware storefront) is now live, so I wired it into the hub — its first real link out to a shipped Store product — and updated the Store page copy to match.

**Type:** Build

**What I built or did**
Rebranded the old "SMOLD & Co." storefront to **SMOALD Living** and surfaced it across the hub: the Store page card is now a clickable "Live" link, the homepage ecosystem panel switched Living from "Soon" to a "Live" link, and the Store door counter reads "1 live · 2 coming soon". I also softened the Store page's "coming soon" badge to "First product live" and updated its title + meta to match.

**Why I did it this way**
The site claimed Living was "coming soon" while it was actually live — so the priority was making the hub tell the truth everywhere, reusing the existing "live vs soon" styling rather than inventing new design.

**How We Did It**
1) Found every spot the hub mentioned SMOALD Living or the Store's status. 2) Turned the Store card and ecosystem-panel line into live links to the storefront. 3) Bumped the Store door counter to "1 live · 2 coming soon". 4) Softened the page badge, title and meta so nothing still said "coming soon". 5) Deployed to Cloudflare Pages and verified each change live on smoald.com.

**What I learned**
A brand's name and status live in more spots than you expect — the card, the panel, the counter, the badge, even the page title and search description. Hunting them all down is what keeps the story consistent.

**References / Conversations**
This Claude Code session; live site `joshuablakemorekay.github.io/SMOALD-Living/`.

---

## 2026-06-16 — Added SMOALD Lifestyle as a fourth mini-hub (experiment branch)

**TL;DR:** Grew the brand house from three doors to four — a new SMOALD Lifestyle hub (Travel + Fitness & Wellness) — built safely on an experiment branch so the live site stays untouched until I'm happy.

**Type:** Feature

**What I built or did**
A new green/teal `lifestyle.html` mini-hub with two coming-soon spokes: SMOALD Travel and SMOALD Fitness & Wellness. Reworked the homepage from three doors to four — a new Lifestyle door card, updated hero copy and button, and the interactive Ecosystem diagram reshaped from a triangle into a diamond. Added "Lifestyle" to the nav and every footer. SMOALD Living stays under Store for now.

**Why I did it this way**
The "L" for Lifestyle was already in the SBALD acronym, so the hub just realises a promise the brand already made. I built it on a `living-experiment` branch first so live smoald.com couldn't break while I experimented.

**How We Did It**
1) Sanity-checked the idea against the Virgin model → 2) synced and branched off main → 3) built the Lifestyle page → 4) extended the homepage's colour system, doors and Ecosystem to four → 5) wired Lifestyle into navs and footers → 6) previewed in the browser, then committed on the branch.

**What I learned**
Adding one hub ripples everywhere — a tri-colour system, a 3-spoke diagram and copy that literally said "three doors" all had to become four. Branching first let me restructure freely without risking the live site.

**References / Conversations**
This Claude Code session; branch `living-experiment` (not yet merged to main).

---

## 2026-06-23 — Rebranded SMOALD to a red + gold light theme and shipped it live

**TL;DR:** Redesigned the whole site from the old dark theme to a clean white background with the SMOALD red + gold colours and my real logo — then merged the four-door version into `main` and took it live at smoald.com.

**Type:** Milestone

**What I built or did**
Flipped every page from dark to white-background red + gold. Added my real lightning-bolt logo (nav mark + favicon) and a crisp text wordmark (SMO red · AL gold · D red). Pulled all the repeated CSS/JS into one shared stylesheet and script, and rebuilt the Store page to lead with the live SMOALD Living product. Settled on four doors — AI · Learn · Store · Lifestyle — as the final site.

**Why I did it this way**
The dark theme didn't match my actual brand. I worked on safe branches first and only merged once I was happy, so the live site never broke mid-change.

**How it works**
One `style.css` themes every page; each page just sets a `data-hub` for its accent colour. Strictly red + gold — gold is kept for highlights, never big button fills.

**How We Did It**
1) Branched off `main` for a safe `redesign` → 2) extracted the shared CSS/JS and fixed the Store page → 3) flipped to the red + gold light theme with the real logo → 4) applied the same theme to the four-door `living-experiment` branch → 5) recoloured the Lifestyle hub from green to gold → 6) merged four-door into `main` (clean fast-forward) → 7) deployed to Cloudflare Pages and verified smoald.com live.

**What I learned**
A deep gold reads as orange when it fills a button — so even a two-colour brand needs rules about *where* each colour goes. And keeping the CSS in one shared file turned the whole reskin into a handful of edits instead of hundreds.

**References / Conversations**
This Claude Code session; repo `joshuablakemorekay/SMOALD`, live at https://smoald.com.

---

## 2026-06-23 — Post-launch polish: LinkedIn link + branded README banner

**TL;DR:** Added my real LinkedIn link to the portfolio page, and gave the GitHub README a proper brand cover banner with the SMOALD wordmark rendered crisp (not blurry).

**Type:** Polish

**What I built or did**
Swapped the placeholder `#` LinkedIn links on my hire page (contact + footer) for my real profile and redeployed. Added a cover banner to the top of the README — the lightning bolt above the SMOALD wordmark, on a white card, sized wide like a cover photo.

**Why I did it this way**
The README is the first thing people see on GitHub, so it should look on-brand. A transparent logo follows GitHub's dark/light theme, but my brand is red + gold on *white* — so I baked a white card into the image to lock that in.

**How it works**
A small Pillow script renders SMOALD as live text (SMO red, AL gold, D red) under the bolt — rendering text instead of scaling a PNG keeps it sharp at any size.

**How We Did It**
1) Added the LinkedIn link in both spots and redeployed → 2) put the bolt + wordmark at the top of the README → 3) it sat on GitHub's dark theme, so I moved it onto a white card → 4) widened it into a cover banner → 5) replaced the blurry upscaled wordmark with crisp rendered text.

**What I learned**
Upscaling a small PNG always looks blurry — rendering the wordmark as text keeps it crisp at any size. And transparent logos inherit the page's theme, so a baked-in white card is the reliable way to stay on-brand on GitHub.

**References / Conversations**
This Claude Code session; repo `joshuablakemorekay/SMOALD`, live at https://smoald.com.

---

## 2026-09-11 — Turned the hub into a business that can be hired

**TL;DR:**
- smoald.com stopped being a brand showcase and became something that sells: six packages, fixed-price jobs, and four legal pages.
- A working enquiry form on Pages Functions, proven by an email actually arriving.
- Deploys became automatic — which is how I found the live site had been two months out of date.

**Type:** Feature / Infrastructure

**What I built or did**
Rewrote the homepage to lead with the offer rather than the brand, and added `services`, `pricing`, `portfolio`, `about`, `contact` and `products`, plus privacy, terms, licence and refunds. Built the enquiry endpoint as a Pages Function on Resend — honeypot, length caps, HTML escaping, origin check. Added a sitemap, robots, a social preview image, clean-URL redirects and `ProfessionalService` markup with the trading location.

**Why I did it this way**
The whole point was to earn money, and nothing on the site let anyone buy or even enquire. Before any of it went near the live site I asked:

> "Before we continue, can you confirm that this isn't affecting the exsisting web apps: thaibridge-ai and smoald.com? And that for smoald.com it's only adding to it?"

and the brief was explicit from the start:

> "Do not fabricate credentials or client results."

so the copy claims six real packages and no clients I do not have. Two overstated claims were pulled out later the same evening.

**How We Did It**
1) Rewrote the homepage around the offer → 2) added the sales pages, then the legal pages → 3) built the enquiry Function and confirmed a real email landed in Gmail → 4) added the SEO files → 5) found every URL returning 200 while still serving the *old* homepage → 6) discovered Cloudflare Pages had no git integration at all: deploys were a command someone had to remember → 7) added the GitHub Actions workflow → 8) fixed a nav bug where `.nav-links a` quietly outranked `.nav-cta` and greyed out the button text.

**What I learned**
A 200 is not proof of anything — the site had been stale for two months while every path answered perfectly. And "it goes live when someone remembers to run a command" is a bug in the process, not the code; the fix was a workflow, not a reminder.

**Engineering Contribution**

*Decisions made:*
- Pages Functions over a third-party form service: no monthly fee, no data leaving the account, and the spam protection is a hidden field rather than a CAPTCHA that punishes real people.
- `onRequestPost` plus `onRequestGet` rather than a catch-all `onRequest`, which would have shadowed the POST handler and broken the form silently.
- Two claims removed from the copy rather than softened. Half-true is still untrue.

*Improvements made to generated code:*
- Field length caps and HTML escaping on the endpoint, so a long or hostile submission cannot fill the inbox or inject markup into the email.
- The deploy workflow verifies by *content* — it greps the live page for a word that only the new build contains — because the status code had already lied once.

*Roughly how much was accepted as-is vs engineered on:*
The page markup mostly went in as drafted. The endpoint and the deploy pipeline did not: both were reworked after the first version proved either unsafe or unverified.

**References / Conversations**
This Claude Code session; repo `joshuablakemorekay/SMOALD`, live at https://smoald.com.

---

## 2026-09-12 — Made the design a product, and got listed where buyers look

**TL;DR:**
- Extracted the ThaiBridge design into its own theme repo with a live demo — a reusable product rather than one site's stylesheet.
- Settled the VAT question with evidence: Stripe is merchant of record, so the advertised price is the price charged.
- Listed the business on Google and PeoplePerHour, and fixed the honey farm's 21-second load.

**Type:** Product / Research / Fix

**What I built or did**
Pulled the design out of ThaiBridge into `classic-modern-theme`: 1,127 lines of CSS behind 33 colour tokens, a second colourway in 24 values, five demo pages, a README, a changelog and a three-tier licence. Fixed ThaiBridge's pricing so the checkout stops quoting a different number from the advert. Pre-rendered the honey farm to static and made its contact address clickable again. Set up Google Business Profile and Search Console, and wrote the PeoplePerHour profile and its first five offers.

**Why I did it this way**
On the VAT I was told twice that Stripe should not be charging it, and pushed back twice:

> "yes, look at the ThaiBridge Stripe Tax issue because I tell you again. I am not registered with VAT."

I was right. Stripe is merchant of record, so it owes the VAT, not me — the fix was to mark prices tax-inclusive rather than to turn tax off. And on PeoplePerHour the rule was mine before anything was touched:

> "set up the profile and hourlies on PPH now as long as it doesn't affect anything on my existing profile i.e. don't remove anything without my permission."

**How We Did It**
1) Fixed the honey farm — 21.6s to 0.26s by pre-rendering, and its email link had been broken on every page → 2) settled the VAT with the Stripe API rather than opinion → 3) extracted the theme → 4) rebranded it properly, which meant replacing every brand-coloured `rgba()` with `color-mix()` so a new palette actually takes → 5) wrote the README, licence and changelog → 6) Google Business Profile, then Search Console: 16 pages discovered → 7) PeoplePerHour profile and five offers → 8) added licences to three repos.

**What I learned**
Pushing back was the right call, and I had to do it twice to be heard. The lesson on my side: check which account you are actually looking at before concluding anything — a whole line of reasoning was consistent, confident, and about the wrong Stripe account entirely.

**Engineering Contribution**

*Decisions made:*
- Sell the design *and* the engine, but only ship the design. The theme is finished; the application starter is not, so the product page says "in preparation" rather than taking money for a half-packaged download.
- Tax-inclusive prices set in code, not in the Stripe dashboard, so the number in the advert and the number charged cannot drift apart.
- Five offers priced £95–£395, deliberately the small self-contained jobs. With no reviews, a £595 rebuild is a harder sell than a £95 contact form that proves I turn up.

*Improvements made to generated code:*
- The extracted stylesheet was scoped to `.site-nav` rather than the bare `nav` element — the original styled *every* nav on the page, which is why ThaiBridge's sidebar still has dark text on a dark gradient today.
- Brand-coloured `rgba()` literals became `color-mix()` against the tokens (42 of them). Pure black and white shadows stayed as they were, because those are palette-independent and converting them would have been change for its own sake.
- A template-scanning test now guards the VAT rule, written after the first fix missed one page. I proved the test works by reintroducing the bug.

*Roughly how much was accepted as-is vs engineered on:*
Little of the theme survived extraction unchanged — the tokens were renamed away from ThaiBridge's subject matter, the hardcoded background came out, and the nav scoping was a genuine bug fix rather than a port.

**References / Conversations**
This Claude Code session; repos `joshuablakemorekay/SMOALD`, `classic-modern-theme`, `thaibridge-ai`, `tpa-honey-website`. Theme demo at https://classic-modern-demo.pages.dev.

---

## 2026-09-12 — The theme goes on sale, and the site stops publishing its own notes

**TL;DR:**
- Three Stripe Payment Links wired into `/products` — the theme is buyable at £29 / £99 / £249.
- The deploy had been publishing every working file, including a third party's email address. Fixed on the second attempt, then guarded in CI.
- A sixth PeoplePerHour offer, possible only because the theme takes the design work out of a 5-day build.

**Type:** Feature / Fix / Security

**What I built or did**
Made the theme buyable, then found `wrangler pages deploy .` had been serving `docs/`, `scripts/`, the workflow and the dev journal at public URLs. One of those notes carried a friend's email address.

**Why I did it this way**
Stripe is merchant of record: it handles the VAT and keeps me out of registration, worth 3.5% here. Managed Payments cannot make buyers accept my own terms, so the licence travels with the delivery email. On the leak, my standing rule set the pace:

> "as long as it doesn't affect anything on my existing profile i.e. don't remove anything without my permission."

Nothing was deleted until I had seen exactly what, and why.

**How We Did It**
1) Created the three Payment Links — the dashboard hid them:

> "I'm not seeing this URL in the Product Catalogue?"

→ used the direct URL → 2) confirmed each checkout's product and price before wiring it in → 3) found the leak → 4) first fix, `.assetsignore`, did nothing: Pages ignores it → 5) real fix: stage the site into `.deploy/` and ship that → 6) deleted nine old deployments still serving the address → 7) packaged the theme as a 28 KB zip → 8) posted the sixth offer.

**What I learned**
A 200 status code is not evidence. The file was reported gone twice before it was: a fix that silently did nothing, then a delete loop that reported success and deleted nothing. Only the live URL settled it.

> "I don't understand?"

Old deployments live forever at their own addresses — obvious once said, invisible until then.

**Engineering Contribution**

*Decisions made:*
- **Allowlist, not denylist,** for what gets published. A list of exclusions holds until someone adds a folder nobody thought to exclude. Inverting it makes the default private, and the failure mode a missing page rather than a leaked one. Rejected keeping the denylist: simpler to read, but it would publish the next internal folder silently.
- **Delivery by email attachment,** not a hosted private link. The zip is 28 KB, so a bucket, a signed URL and a link that could rot in a year all bought nothing. A GitHub collaborator invite was rejected too — buyers are often not developers.
- **Prices set tax-inclusive in code,** not in the Stripe dashboard, so the figure advertised is the figure charged.

*Improvements made to generated code:*
- The workflow only ever checked that the homepage said "Lichfield". It now asserts the internal paths return 404 and **fails** the build otherwise — a privacy regression that merely warns is one nobody reads.
- Because an allowlist can fail the other way, staging now refuses to deploy when a load-bearing file is missing, rather than quietly shipping a site with holes.
- Dropped `rel="noopener"` from the three buy links: without `target="_blank"` it does nothing, and read like a protection that was not there.

*Roughly how much was accepted as-is vs engineered on:*
The product page edit went in unchanged. The deploy pipeline did not — the first fix was wrong, the second needed the staging approach, and both CI guards came afterwards on reflection rather than in any first draft.

*Note on the verbatim ratio:* about 9%, below the 40% this journal aims for. Most of this session was short approvals and my own questions rather than specifications, and the three quotes above are the ones that actually changed what happened. Padding with the rest would have lowered the signal, not raised it.

**References / Conversations**
This Claude Code session; repo `joshuablakemorekay/SMOALD`, live at https://smoald.com. Buyer delivery in `docs/buyer-email.md`; offer wording in `docs/peopleperhour-profile.md`.

---
## 2026-09-13 — The sale delivers itself

**TL;DR:**
- A buyer now gets the theme seconds after paying: Stripe → thank-you page → a Pages Function that checks the payment, then streams the zip from a private GitHub release. Proven with a real £39 purchase.
- Repriced to £39 / £99 / £299 by script, not dashboard — the old prices and links archived in the same run.
- A seventh PeoplePerHour offer, and a site outline for ThaiBridge and the theme, drawn after the fact from the real routes.

**Type:** Feature / Decision / Learning

**What I built or did**
The day started with a question about a different project:

> "We did not create an outline at the beginning of building this app. The fact is that the app is content rich it's full of content. Is it possible to create an outline now?"

It was — reading the routes and nav back into a Figure 1-1 diagram found two orphan pages nothing linked to. Then:

> "How can we add this as a sellable template on SMOALD and PPH?"

The theme was already extracted, so this became the Store spoke, a £245 restyle offer, and — once the sale was set up — the discovery that `/products` had been on sale since yesterday at £29 / £249 with delivery by hand.

**Why I did it this way**
> "Should Stripe prices be increased slightly with this new premium design? Take me through it step by step what I need to do next."

Yes, and no higher than £39 / £99 / £299 with zero reviews. Delivery went through a Function rather than Stripe's own "I'll email you" page because the repo is private and the zip must never be a public URL.

**How We Did It**
1) Outline from routes → 2) Store card and PPH copy → 3) offer posted — twice it hadn't, once because a required checkbox fails silently, once because the clicks were landing in a different Chrome window; on "tick it and post" it went up → 4) Stripe script in test mode → 5) live needed Josh at every gate:

> "I don't know what I am doing. Please help"
> "Did I have to click Apply changes for Prices too or just once after I did 2. ?"
> "I've got an rk_live"

→ 6) Function, thank-you page, GitHub release v1.1.0 → 7) three Cloudflare variables → 8) the proof:

> "Yes, the button appeared and the zip downloaded — refunded myself too"

**What I learned**
Three of my edits silently did nothing — a Python heredoc replace that didn't match and never asserted — and each time the test run "passed" because it exercised a different path. The fix that stuck was reading the file back. Same lesson as yesterday's 200: green output is not evidence, the artefact is.

> "I can see it on PPH but not on smoald.com ?"

The server had it; the browser didn't. Cache, not code — but only a header check settled it.

**Engineering Contribution**

*Decisions made:*
- **GitHub release + read-only token** for the file, not R2. R2 needs a bucket binding my Pages token can't create; a release is versioned by the same CHANGELOG that names the zip. Rejected embedding the zip in the site repo: it's public.
- **Idempotent script over dashboard clicks** for prices. Prices can't be edited in Stripe, only replaced, so the script adopts existing products, adds prices, moves `default_price` (Stripe refuses to archive a default) and retires the rest. A re-run is the whole price change.
- **Real purchase as the test.** The restricted key was created in live mode; rather than a second key and two swaps, one £39 order proved the exact customer path and cost 80p in fees.
- **Tests outside `functions/`.** Pages routes every file in there — `/api/download.test` would have been a live URL.

*Improvements made to generated code:*
- Eight `node --test` cases for the Function: every refusal (bad id, unconfigured, unknown, unpaid, wrong product, no zip) plus HEAD-doesn't-touch-GitHub and the streamed happy path. First tests of a Function in this repo.
- `aria-live="polite"` on the status line so "Payment confirmed" is announced, not just painted.
- One walk of the Payment Links instead of two — `active_links()` shared by lookup and retirement.
- The script grew `--confirm` (live writes prompt), `encoding="utf-8"` (cp1252 mangled the em-dash and broke name matching) and a hard stop on any non-JSON or error response — each from a real failed run.

*Roughly how much was accepted as-is vs engineered on:*
The Function and thank-you page went in close to first draft. The Stripe script did not: five live runs, five distinct failures, each one a line it now carries. The two dashboard rounds (key permissions, variables) were Josh's hands entirely.

*Note on the verbatim ratio:* about 15%. Today's quotes are questions and gates rather than specifications; the ones kept are the ones that changed what happened.

**References / Conversations**
This Claude Code session; `docs/theme-downloads.md` (the flow and the variables); `scripts/stripe_theme_setup.py`; theme release https://github.com/joshuablakemorekay/classic-modern-theme/releases/tag/v1.1.0; PPH offer 1131818.

---
