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
## 2026-09-14 — The first buyer was me, and I couldn't work it

**TL;DR:**
- Bought my own theme on smoald.com, refunded it, unzipped it, and couldn't tell how to use it. The README explains the *theme*; nothing explained the *job*.
- Fixed by adding `START-HERE.md` — ten plain-English steps from "decide what the site is for" to "upload it" — shipped as v1.2.0 and proven live through the real download path.
- Found out along the way that a refund does not revoke a download.

**Type:** Learning / Feature

**What I built or did**
Yesterday I tested the sale end to end by buying the theme. Today I came back to it as a buyer would:

> "I bought this on smoald.com as a test payment but since I'm the developer and it's my business I refunded it immediately. I saved the downloadable and unzipped it. I forgot to look at and save the instructions how to use it. Can you tell me?"

The instructions were there — `README.md`, twelve sections, correctly written. Read back to me, it was still wrong:

> "It's too technical. I need very simple instructions telling me clearly how to use this template."

A second attempt — "open `index.html`, edit line 16, change the `:root` block" — got the same verdict, and this time the question that cracked it:

> "How would you approach this job? How would you start it? What is the procedure? Take me through it step by step. Summarise it. Use bullet points."

That is not a question about HTML. It's a question about *the job* — where do you begin, what do you do before you touch a file. The answer was ten steps, and the first three (decide what the site is for, plan the pages, gather the words and pictures) have nothing to do with the theme at all. That's the document the download was missing.

> "Add this as a START-HERE.md in the theme"
> "Yes, commit it and release 1.2.0"
> "Test the download on smoald.com"

**Why I did it this way**
The README was written by the person who built the theme, for the person who built the theme. It answers "how does this work?" Nobody buying a £39 template asks that first; they ask "what do I do?" So the guide went in as a *separate* file rather than a rewrite — the README is right for the second question, and a buyer who follows START-HERE will get to it at step 8 when they need it.

It ships in the zip (added to `build_release.py`'s file list) and sits at the top of the README's file tree, so it's the first thing seen after unzipping. One commit, one release, no change to the site — the download Function always serves the latest GitHub release, so smoald.com picked up 1.2.0 the moment it was published.

**How We Did It**
1) Read the README back → 2) plain rewrite, rejected → 3) reframed as a procedure, accepted → 4) `START-HERE.md`, changelog, README tree, release script → 5) commit, push, `build_release.py`, `gh release create v1.2.0` → 6) proof: `curl` the live `/api/download` with yesterday's paid session id — `200`, `classic-modern-theme-1.2.0.zip`, 32,069 bytes, byte-for-byte the build, `START-HERE.md` inside.

**What I learned**
Two things.

First: the one user test worth more than any amount of documentation is the author trying to use the product cold, a day later, without their notes. It took a single buyer — me — to find that the product had a manual and no instructions. Nothing in the code, the tests, or the sale flow could have found that.

Second, a smaller one from the proof: a refunded Stripe Checkout Session still reports `payment_status: paid`, so the thank-you link keeps working after a refund. For a one-off zip that's fine and I'm leaving it — but it's now written down rather than assumed.

**Engineering Contribution**

*Decisions made:*
- **A new file, not a rewritten README.** Two audiences, two documents. Rewriting the README simpler would have thrown away the reference the buyer needs at step 8.
- **Cut 1.2.0 rather than patch.** A new document a buyer is meant to read first is a MINOR change by the changelog's own rule, and a versioned release is what the Function serves — no other way to get it to buyers.
- **Prove it through the live path, not the build.** The zip in `dist/` was right; the question was whether smoald.com served it. The paid session from yesterday's purchase answered that without a second purchase.

*Improvements made to generated code:*
- The first two drafts of the guide were mine to reject, and I rejected both. The third exists because the question changed from "how do I edit this" to "how would you do this job". That reframe is the entire value of the file.
- The guide points back into the README by section name at the two places a buyer will need detail (colours, support), so the two documents don't drift into saying the same thing twice.

*Roughly how much was accepted as-is vs engineered on:*
The ten steps are close to the third draft as spoken; the wiring (release list, README tree, changelog, release) went in first pass. The rejection of the first two drafts was the whole contribution.

*Note on the verbatim ratio:* around 20%. Higher than usual, and rightly: today's turning point was a question, and the question is the finding.

**References / Conversations**
This Claude Code session; theme release https://github.com/joshuablakemorekay/classic-modern-theme/releases/tag/v1.2.0; `docs/theme-downloads.md` (the download flow the proof went through); `START-HERE.md` in the theme repo.

---
## 2026-09-14 — Every offer learns to answer "what do I do, and why should I pay?"

**TL;DR:**
- The START-HERE lesson from this morning, applied to everything for sale: all seven PeoplePerHour offers and every service and product on smoald.com now say how the job goes, step by step, and why it is worth paying for.
- PPH fought back twice — a 2,500-character cap nobody mentions, and a checkbox that silently ignores anything but a real mouse click. Both are written down.
- Two commits, deployed and read back live; the PPH copy read back from the public offer pages, not the edit form.

**Type:** Feature / Learning

**What I built or did**
This morning a plain-English procedure fixed the theme download. This afternoon the question was whether the same thing belonged everywhere else:

> "Very simple instructions telling me clearly how to use i.e. How would you approach this job? How would you start it? What is the procedure? Take me through it step by step. Summarise it. Use bullet points. […] Can you add this to all 7 offers necessary on my PPH account and to all digital products and services necessary on smoal.com each tailored?"

So: seven PPH offers read back from the live pages, the site's thirteen service cards and the theme card, and a draft of a tailored procedure for each — day by day, the buyer's part first — in one file, before anything was posted.

> "Approved, apply both — PPH first, show me each before saving"

Halfway through the second offer, a bigger question:

> "Hang on. For all 7 offers on PPH and all digital products and services on smoald.com if we have not already mentioned this should we add it to these instructions as well - Why this in particular is worth paying for and why you should be willing to buy it? What it offers and how it benefit you? Lets make sure this is done for all then Yes, save it and continue"

That is a different question from "how does it go", and a better one. Four offers already answered it under other headings; three did not. All seven do now, and every card on the site has a why-paragraph above its steps.

**Why I did it this way**
The steps went into the existing home each time — PPH's own HOW IT WORKS section, expanded; a collapsible block inside each card on the site, closed by default so a page with thirteen cards does not triple in length. No new page, no new nav entry.

The PPH copy and the site copy for the five fixed-price jobs are the same steps, because a buyer who finds two versions of the process stops trusting either — the same rule the prices already follow.

> "Please confirm if these instructions being added are relevant as to when the client has paid for the product/service? Or if they only apply before the client has paid?"

Both, and it matters which box they sit in. The description is the sales page, read before paying; the steps describe what happens after. PPH's separate "what do you need from the buyer" box is the post-purchase one, and it already said "the five days start when I have these". A buyer can also buy without ever messaging, so "before you buy, send me…" is an invitation, not a gate.

**How We Did It**
1) Read all seven offers from the live pages → 2) one draft file with every procedure → 3) approved → 4) each PPH offer: swap the section in the edit form, show the full text, wait for "save", click, read the public page back → 5) the site: a script that inserts one `<details class="how">` per card, matched to the FAQ's +/− pattern → 6) two commits, deploy, live check with cache-busting → 7) docs and memory.

**What I learned**
The first save on PPH did nothing, and looked like it had worked. An analytics event fired, the page moved, no error showed — but the public offer was unchanged. The cause was the delivery-policy checkbox: ticked through the form tool it was ticked in the DOM and unticked as far as PPH was concerned, and the only error appeared under the box, off-screen. A real click fixed it. Then the second offer hit a 2,500-character limit that appears only after you press Update. Three offers had to be trimmed to fit; nothing was dropped, but sentences got shorter and two overlapping sections were merged.

The lesson is the same one as the last three days, in a new place: the thing that says it saved is not the proof. The public page is.

**Engineering Contribution**

*Decisions made:*
- **Show each PPH edit before saving, one at a time.** Seven outward-facing edits to live sales copy; a batch would have been faster and would have hidden the checkbox failure behind six "successes".
- **Trim to the cap rather than cut sections.** On the Stripe offer the "what this is" section was folded into steps 1–2 and "the part people get wrong" became the why-section — the argument survived, the duplication did not.
- **Collapsible on the site, not inline.** Thirteen cards with seven steps each is a wall. `<details>` keeps the scan-and-compare page and gives the full procedure one click away.
- **A script, not thirteen hand edits.** Idempotent, keyed on the card's `<h3>`, three insertion points for three card types. Re-runnable when a card is added.

*Improvements made to generated code:*
- The "why" question came from Josh, mid-run, and changed the deliverable. My first pass had answered "how"; the audit of which offers already said "why" — and under what heading — is what made it a complete job rather than a section pasted seven times.
- The ordering rule — the buyer's step comes first — was carried over from the theme and applied to every procedure. On a five-day job it is the difference between an honest deadline and a clock that starts while the buyer hunts for their logo.

*Roughly how much was accepted as-is vs engineered on:*
The procedures went in close to draft. The PPH session was the engineered part: two silent failures diagnosed from network traffic and a scrolled-away error, and three descriptions cut to a cap with nothing lost. Josh's contributions were the scope, the second question, and the approval of every save.

*Note on the verbatim ratio:* about 20%, and the quotes are the deliverable's shape — the "why should I pay" question is the reason the work looks the way it does.

**References / Conversations**
This Claude Code session; `docs/how-it-works-copy.md` (source copy and what was trimmed); `docs/peopleperhour-profile.md` (the cap and the checkbox); commits `d3720d3` and `b2dc7dc`; PPH offers 1131720–1131724, 1131740, 1131818.

---
## 2026-09-14 — Read on a phone, three questions, and the answer that wasn't there

**TL;DR:**
- Josh read the offers on his phone and asked where the "why it's worth paying for" bit was. It was there — under a cleverer heading. That is the same as not there.
- He then asked whether all three of his questions had been answered — *why buy, what it offers, how it benefits you* — and on a strict read, four offers and five site cards only said what it cost *not* to buy. Every one now ends on what you get.
- PPH's form fought a third and fourth time; the whole save recipe is now written down and has held for the last eight saves.

**Type:** Learning / Feature

**What I built or did**
The evening was the afternoon's work read back cold, one offer at a time:

> "Read the £445 offer on my phone"

I can't reach a phone, so I read each as a thumb-scroller would and reported what landed and what didn't. Three small edits came out of it — "SSL (the padlock)", "a first migration run (your tables created)", and a restyle bullet that had drifted into theme-designer language. Then the one that mattered:

> "Read the £165 business online offer on my phone - I did this but don't see the WhY THIS IS WORTH PAYING FOR bit?"

Four offers had the why-section under their own headings — *The problem this solves*, *Why this matters more than it sounds*, *The most common cause*, *Why this is worth doing*. I had argued that counted. Josh, reading on a phone after the £445 and £395 pages, looked for the words he had just seen and did not find them.

> "Just do as I asked at the start […] Lets make sure this is done for all then Yes, save it and continue"

All four renamed to the same heading; the site blocks labelled *Why it's worth paying for* and *How the job goes*; the theme card's *What it actually saves you* given the same words. Then the audit he actually wanted:

> "Good. What about these - why you should be willing to buy it? What it offers and how it benefit you? - Have these been added to them all aswell or not?"

Honest answer: two of three, everywhere; the third only in six of seven, and only implied in three of those. Domain/DNS said a missing padlock costs you customers and never said what £145 gets you. Every why-section now ends with a plain "you get…" sentence.

> "what about for all digital products and services on smoald.com ?"

Same read, same finding — five cards behind their PPH twins. Fixed with the same sentences, and a script that checks every why-paragraph for a benefit close so it cannot drift again.

> "Are we done yet?"

Yes.

**Why I did it this way**
Consistency over cleverness. A buyer moving between offers is pattern-matching, not reading; the heading has to be the same string every time. And a why-section that only names the cost of inaction is half an answer — the other half is the sentence that starts "you get".

**What I learned**
The author's read and the buyer's read are different reads. I had audited the four offers and passed them because the *content* was there. Josh failed them in five seconds because the *words* weren't. Both audits were correct; only one was the buyer's.

The PPH form also taught two more lessons: the delivery checkbox's real input is `display:none`, so the only tick that always registers is the label's own `.click()` in page JavaScript; and the Update button can miss a mouse click too — `button.click()` submits every time. Set text, one real keystroke, `label.click()`, check `.checked`, `button.click()`, land on `featureit`, read the public page. Eight saves in a row on that recipe.

**Engineering Contribution**

*Decisions made:*
- **Same heading string on all seven and on the site**, over four specific headings that were arguably better. The buyer's scan wins.
- **"You get" as the closing sentence of every why-section**, not a third labelled section — a third heading pushes the long offers past the cap and lengthens the phone scroll.
- **A merge, not a trim, on the restyle offer** when the new sentence overlapped the old one and broke the cap — same content, 2,482.
- **An automated check on the site** for the benefit close, so the rule survives the next card that gets added.

*Improvements made to generated code:*
- Every finding this evening was Josh's, from reading his own copy as a stranger. My contribution was the strict audit once asked — question by question, offer by offer, saying which passed and which only looked like they did.

*Roughly how much was accepted as-is vs engineered on:*
The sentences went in as proposed. The two form fixes were engineered from failures, one each.

*Note on the verbatim ratio:* about 25%. The evening was six questions and the answers to them; the questions are the entry.

**References / Conversations**
This Claude Code session; `docs/how-it-works-copy.md` (the same-heading and "you get" rules, and the save recipe); commits `2fc3d5a`, `3082f11`, `babb3f2` and the four docs commits between; PPH offers 1131720–1131724, 1131740, 1131818.

---
## 2026-09-14 — Three questions, three headings

**TL;DR:**
- One more phone read, one more thing not found: the benefit was the last sentence of a paragraph, and a last sentence is not a heading.
- Every PPH offer and every site card now carries HOW IT BENEFITS YOU as its own section, between the why and the how. Josh's three questions are three headings in his words.

**Type:** Learning

**What I built or did**
> "Read the £95 contact form offer on my phone - I did this yet don't see these: why you should be willing to buy it? What it offers and how it benefit you?"

The answers were all on the page: the offers under WHAT YOU GET, the why under WHY THIS IS WORTH PAYING FOR, the benefit as that section's closing sentence. Two out of three findable by heading; the third only by reading the whole paragraph, which a phone reader does not do. I offered to rename all three headings to his exact words.

> "It's fine as it is just include How it benefits you to all of them please."

So: the "you get…" sentence lifted out of each why-section into its own HOW IT BENEFITS YOU section, on all seven offers. Three were at the 2,500 cap and gave up a few words elsewhere. On smoald.com the same split, by script, on all thirteen cards — and the script showed two whose closing line was a reason ("cheaper than starting again", "quoted as a fixed list") rather than a benefit, so those two got a real one.

**Why I did it this way**
The pattern of the whole day, third time: the content was there and the *label* was not. A reader scanning for "how it benefits you" needs to see those words as a heading. The fix that respects the buyer is not a cleverer sentence, it is a heading.

**What I learned**
Each of Josh's three questions is a heading, not a quality of the prose. I had treated "how it benefits you" as something a good why-paragraph naturally contains. It does — and it still fails the test, because the test is a thumb on a phone looking for a word. By the third round I should have proposed the heading first; he had to ask for it.

**Engineering Contribution**

*Decisions made:*
- **Keep WHAT YOU GET and WHY THIS IS WORTH PAYING FOR; add HOW IT BENEFITS YOU.** Josh's call over my rename-all-three proposal. Less churn, and the two existing headings already did their job.
- **The benefit sits between the why and the how**, so the page reads problem → value → what you walk away with → how it happens.
- **Split by script on the site, then read the results.** The script is what caught the two non-benefits.

*Improvements made to generated code:*
- A `__split` / `__save` pair of page-side helpers for PPH, so each offer was one call to move the sentence and one call to save — with the checkbox, the cap and the text presence asserted before the button is pressed. Nine saves, no failures.

*Roughly how much was accepted as-is vs engineered on:*
The finding was Josh's, again. The two site cards that needed new benefit sentences were the only new prose.

**References / Conversations**
This Claude Code session; commits `589875d`, `402a954`; `docs/how-it-works-copy.md` (three questions, three headings).

---
