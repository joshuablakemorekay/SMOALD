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
