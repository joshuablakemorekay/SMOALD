# SMOALD.com — Brand-House Hub

**🔗 Live:** [https://smoald.com](https://smoald.com) · also at [smoald.pages.dev](https://smoald.pages.dev)

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

## What's Next
- Flip "coming soon" spokes to "live" as Store and Learn products ship
- Add a CV PDF + LinkedIn link to the portfolio page
- Consider folding the standalone portfolio repo fully into this hub
