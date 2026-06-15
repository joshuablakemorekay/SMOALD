# SMOALD.com — Brand-House Hub

The homepage of SMOALD — a single hub linking everything I build, learn and sell, founded and run by Joshua Kay.

## What It Does
- A parent homepage with three "doors": **SMOALD AI** (build), **SMOALD Learn** (learn), **SMOALD Store** (shop)
- A **hub-and-spoke map** showing every product under each hub — live vs. coming soon
- A page per mini-hub listing its spokes
- Serves my full developer portfolio in-house at `/ai/hire` (with a `/hire` shortcut)
- Live on **Cloudflare Pages** at the `smoald.com` domain

## Built With
- **HTML & CSS** — static, hand-built pages, no framework
- **Cloudflare Pages** — hosting & deploys (via the `wrangler` CLI)
- **Cloudflare DNS** — the `smoald.com` custom domain
- **`/prompts` library + GitHub Actions** — documents and auto-tests the prompts that built the site

## How to Run It
1. Clone the repo
2. Open `index.html` in your browser — it's a static site, no build step
3. To deploy: `wrangler pages deploy . --project-name=smoald`

## My Journey
### 2026-06-15 — Built & shipped the SMOALD.com brand hub
Turned a brand-architecture idea into a live, 4-page "brand house" on Cloudflare Pages with the `smoald.com` domain, then archived the prompts that built it with an eval harness. Built the hub, added the full hub-and-spoke model, wired in my portfolio at `/ai/hire`, renamed "Tech" → "AI", and connected the domain. **Key lesson:** Cloudflare Pages custom domains need DNS records the API won't auto-create, and a Pages-only token can't list accounts — plus I fixed a Windows UTF-8 crash in the eval runner.

## What's Next
- Flip "coming soon" spokes to "live" as Store and Learn products ship
- Add a CV PDF + LinkedIn link to the portfolio page
- Consider folding the standalone portfolio repo fully into this hub
