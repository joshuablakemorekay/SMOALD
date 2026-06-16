# Prompt Changelog

Chronological record of prompt creation and refinement. Newest entries at the top.

Each entry follows this format:
- **Date** — what changed and why

---

## choose-hosting-platform

### 2026-06-14 — v2
**Change:** Refined the broad hosting question into a researchable one — pinned the stack (JS/Next.js), set "free covers as much as possible," and reframed the big-company angle to what they *started* on. Launched a 250+ source research sweep.
**Reason:** v1 mixed a freelancer's budget with enterprise infrastructure and couldn't give an actionable answer.
**Impact:** Produced a sourced ranking by commercial-use-on-free, ruling out Vercel Hobby and GitHub Pages, and a single decision — Cloudflare — with the OpenNext adapter and 3 MiB Worker cap flagged.

### 2026-06-08 — v1
**Change:** Initial broad question — which platforms are free, and what do Virgin/Apple/Amazon/Anthropic use?
**Reason:** Start figuring out where to host SMOALD.
**Impact:** Interesting but not actionable; bundled two different questions (a freelancer's needs vs. giant companies' infra).

---

## design-smoald-brand-strategy

### 2026-06-10 — v3
**Change:** Named the build hub "SMOALD AI" (over Tech/Dev), made the founder-now-not-holding-company call, and placed the portfolio under the SMOALD brand.
**Reason:** Settle the last open questions so the structure could become a build brief.
**Impact:** A clean three-hub model (AI/Learn/Store) with the portfolio at `/ai/hire` — the brief the build prompt then turned into the live site.

### 2026-06-09 — v2
**Change:** Merged overlapping divisions — Commerce + Tech + AI into one build hub; Wear + Living + Store into one Store hub.
**Reason:** Several "divisions" were really the same business; six hollow ones read as fake.
**Impact:** Six divisions collapsed into three clean ones.

### 2026-06-08 — v1
**Change:** Initial Virgin-style sketch — every possible division under one parent.
**Reason:** Map the brand ambition.
**Impact:** An ambitious six-division empire on paper; the seed of the "org chart isn't traction" lesson.

---

## redesign-homepage-figma-merge

### 2026-06-15 — v3
**Change:** Replaced the code-built `SM◍ALD` placeholder with the real cloud + globe logo art, removing the screenshots' baked-in dark background programmatically (Pillow brightness key) to get clean transparent PNGs.
**Reason:** A first `mix-blend-mode` attempt left a faint box / washed-out colours; a true transparent logo was needed.
**Impact:** Nav and hero logos sit cleanly over the dark site; verified by compositing over the site colour before sign-off.

### 2026-06-15 — v2
**Change:** Merged the Figma design's tri-colour system (Build orange / Learn yellow / Shop red) and an interactive "Ecosystem" into the homepage, replacing the old static architecture map. Delivered as a preview file first, then deployed live.
**Reason:** Adopt the design ideas the user liked while keeping the existing site, copy, and founder framing intact.
**Impact:** Redesign verified live on smoald.com; the static, no-build architecture was preserved.

### 2026-06-15 — v1
**Change:** Initial version — assessed the Figma Make link and its React/Vite/Tailwind export.
**Reason:** Decide how to "use" the design.
**Impact:** Chose to rebuild the look inside the existing static site rather than adopt the framework, keeping the site fast and consistent.

---

## build-smoald-brand-hub

### 2026-06-15 — v4
**Change:** Renamed the build hub from "SMOALD Tech" to "SMOALD AI" across the whole site, and moved the portfolio to a nested `/ai/hire` URL with a `/hire` shortcut.
**Reason:** Reposition the offering around AI, and make the URL mirror the hub-and-spoke structure.
**Impact:** Naming is consistent everywhere; the portfolio URL now reads as "the hire spoke of the AI hub."

### 2026-06-15 — v3
**Change:** Wired the existing freelancer portfolio in as a spoke; renamed the project from `smoald-hub` to `smoald`.
**Reason:** Connect the portfolio to the hub and settle a clean, host-safe project name while keeping `smoald.com` as the brand.
**Impact:** Portfolio reachable from the hub; the earlier dead private-repo link was replaced with the live Cloudflare Pages URL.

### 2026-06-15 — v2
**Change:** Added the full hub-and-spoke model — an architecture map on the homepage plus every spoke under each hub.
**Reason:** v1 had the three hubs but not the complete set of spokes.
**Impact:** The homepage now visualises the whole brand structure; each hub page lists its real and planned products.

### 2026-06-15 — v1
**Change:** Initial version.
**Reason:** Turn a brand-architecture brief into a real, multi-page "brand house" website.
**Impact:** Produced a 4-page hub (homepage + three mini-hubs) in the existing portfolio's design language, with honest "coming soon" states.
