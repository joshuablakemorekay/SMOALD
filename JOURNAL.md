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
