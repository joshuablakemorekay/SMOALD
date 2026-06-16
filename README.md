# SMOALD.com — Brand-House Hub

**🔗 Live:** [https://smoald.com](https://smoald.com) · also at [smoald.pages.dev](https://smoald.pages.dev)

> **🧪 Branch preview (`living-experiment`):** [living-experiment.smoald.pages.dev](https://living-experiment.smoald.pages.dev) — work-in-progress *four-door* version with the new **SMOALD Lifestyle** hub (Travel + Fitness & Wellness). Not yet merged to `main`; the production site above is unaffected.

The homepage of SMOALD — a single hub linking everything I build, learn and sell, founded and run by Joshua Kay.

## What It Does
- A parent homepage with three "doors": **SMOALD AI** (build), **SMOALD Learn** (learn), **SMOALD Store** (shop)
- A **hub-and-spoke map** showing every product under each hub — live vs. coming soon
- A page per mini-hub listing its spokes
- Serves my full developer portfolio in-house at `/ai/hire` (with a `/hire` shortcut)
- Live on **Cloudflare Pages** at the `smoald.com` domain

## Built With
- **HTML & CSS** — static, hand-built pages, no framework
- **Cloudflare Pages** — hosting & deploys (via the `wrangler` CLI); chosen after a [250+ source hosting comparison](./prompts/choose-hosting-platform/) for allowing commercial use on its free tier
- **Cloudflare DNS** — the `smoald.com` custom domain
- **`/prompts` library + GitHub Actions** — documents and auto-tests the prompts that built the site

## How to Run It
1. Clone the repo
2. Open `index.html` in your browser — it's a static site, no build step
3. To deploy: `wrangler pages deploy . --project-name=smoald`

## My Journey
*In the order it happened — from first decision to live site.*

### 2026-06-08 — Designed the SMOALD brand architecture
Before writing any code, I settled the brand: a Virgin-style hub-and-spoke with one parent (SMOALD) over three mini-hubs — **AI, Learn, Store**. I merged six imagined divisions down to three and named the build hub "AI" (over Tech/Dev). **Key lesson:** build the founder brand that gets me hired *now*, not the full holding company — an org chart isn't traction.

### 2026-06-14 — Researched free hosting and chose Cloudflare
I ran a deep, 250+ source comparison of free hosting tiers against one lens — *which genuinely allow commercial use for free*. That ruled out Vercel's Hobby tier (commercial use banned) and GitHub Pages, and surfaced Render's expiring free database. **Decision:** Cloudflare — commercial use allowed, no expiry, unlimited static bandwidth. **Key lesson:** "free" almost always has an operational catch (sleeping, expiry, size caps), not a legal one.

### 2026-06-15 — Built & shipped the SMOALD.com brand hub
Turned the brand-architecture brief into a live, 4-page "brand house" on Cloudflare Pages with the `smoald.com` domain, then archived the prompts that built it with an eval harness. Built the hub, added the full hub-and-spoke model, wired in my portfolio at `/ai/hire`, renamed "Tech" → "AI", and connected the domain. **Key lesson:** Cloudflare Pages custom domains need DNS records the API won't auto-create, and a Pages-only token can't list accounts — plus I fixed a Windows UTF-8 crash in the eval runner.

### 2026-06-15 — Homepage redesign from a Figma design
I merged a Figma design I liked — a red/yellow/orange colour system and an interactive "Ecosystem" visual — into my existing homepage, keeping all my copy, founder framing and sub-pages intact. I built it as a preview first so the live site stayed safe, deployed the redesign, then swapped in my real logo (removing its background automatically with a small Python script). **Key lesson:** this site only goes live when I run the deploy command — a git push alone doesn't publish it.

### 2026-06-16 — Shipped the first Store product: SMOALD Living
SMOALD Living (my homeware storefront) went live, so I wired it into the hub and made the Store page tell the truth — its card is now a live link, the ecosystem panel and door counter show "1 live", and the old "coming soon" badge and title became "first product live". **Key lesson:** a product's status lives in more places than you'd think (a card, a panel, a counter, a badge, even the page title) — a launch only feels finished after a sweep across all of them.

### 2026-06-16 — Added a fourth hub: SMOALD Lifestyle (on an experiment branch)
I grew the brand house from three doors to four — a new green/teal **SMOALD Lifestyle** hub with two coming-soon spokes (SMOALD Travel and SMOALD Fitness & Wellness). I reshaped the homepage to match: a new door card, updated hero, and the interactive Ecosystem diagram redrawn from a triangle into a diamond — plus Lifestyle added to every nav and footer. I did it all on a `living-experiment` branch so the live site stayed safe. **Key lesson:** adding one hub ripples everywhere — a tri-colour system, a 3-spoke diagram and copy that said "three doors" all had to become four — so branching first let me restructure freely without touching smoald.com.

## What's Next
- Merge the SMOALD Lifestyle hub to `main` and go live once I'm happy with it
- Flip the remaining "coming soon" spokes to "live" as more Store, Learn and Lifestyle products ship *(SMOALD Living ✓)*
- Add a CV PDF + LinkedIn link to the portfolio page
- Consider folding the standalone portfolio repo fully into this hub
