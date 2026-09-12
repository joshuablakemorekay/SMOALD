<p align="center">
  <img src="./assets/smoald-readme-banner.png" alt="SMOALD" width="100%" />
</p>

# SMOALD.com — Brand-House Hub

**🔗 Live:** [https://smoald.com](https://smoald.com) · also at [smoald.pages.dev](https://smoald.pages.dev)

The homepage of SMOALD — a single hub linking everything I build, learn, sell and live, founded and run by Joshua Kay.

## What It Does
- A parent homepage with four "doors": **SMOALD AI** (build), **SMOALD Learn** (learn), **SMOALD Store** (shop) and **SMOALD Lifestyle** (live well)
- A clean **red + gold theme** on white, with the SMOALD lightning-bolt logo
- A **hub-and-spoke map** showing every product under each hub — live vs. coming soon
- A page per mini-hub listing its spokes
- Serves my full developer portfolio in-house at `/ai/hire` (with a `/hire` shortcut)
- Live on **Cloudflare Pages** at the `smoald.com` domain

## Built With
- **HTML & CSS** — static, hand-built pages, no framework
- **One shared stylesheet + script** — every page is themed from a single `assets/style.css` (red + gold, switched per page via a `data-hub` attribute) with shared `assets/site.js` for behaviour
- **Cloudflare Pages** — hosting; chosen after a [250+ source hosting comparison](./prompts/choose-hosting-platform/) for allowing commercial use on its free tier
- **GitHub Actions** — deploys on every push to `main`: stages the public files from `.deployfilter`, ships them, then checks the live site is serving the new build *and* that nothing internal is reachable
- **Cloudflare Pages Functions** — the enquiry form's server side, in `functions/api/`
- **Stripe Payment Links** — the theme's three licence tiers, with Stripe as merchant of record
- **Cloudflare DNS** — the `smoald.com` custom domain
- **`/prompts` library + GitHub Actions** — documents and auto-tests the prompts that built the site

## How to Run It
1. Clone the repo
2. Open `index.html` in your browser — it's a static site, no build step
3. To deploy: **push to `main`** — `.github/workflows/deploy.yml` publishes to
   Cloudflare Pages and then checks smoald.com is really serving the new build.

   **Do not run `wrangler pages deploy .` from the repo root.** That publishes
   every working file — notes, scripts, this workflow — which is how a third
   party's email address once ended up live on the site. Stage it first, the
   way CI does. (The account id is needed because the Pages token cannot list
   accounts, and `wrangler login` refuses while `CLOUDFLARE_API_TOKEN` is set.)

   ```
   export CLOUDFLARE_ACCOUNT_ID=709dfa1ba244a9d4e780015aa4ea426c
   rsync -a --delete --prune-empty-dirs --filter='merge .deployfilter' ./ .deploy/
   wrangler pages deploy .deploy --project-name=smoald --branch=main
   ```

   `.deployfilter` is an allowlist: nothing reaches smoald.com unless it is
   named there, so a new internal folder is private by default.

   Note Pages strips `.html` and redirects, so `/services.html` serves at
   `/services` — keep canonicals, the sitemap and internal links on the clean
   form. And check a deploy by its **content**, never its status code: while the
   site was stale every path still returned 200.

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

### 2026-06-23 — Rebranded to red + gold and went live (four doors)
I redesigned the whole site from the old dark theme to a clean white background with the SMOALD **red + gold** brand colours and my real lightning-bolt logo, then merged the four-door version (adding **SMOALD Lifestyle**) into `main` and deployed it live. Along the way I pulled all the repeated CSS/JS into one shared stylesheet, rebuilt the Store page around the live SMOALD Living product, and recoloured the Lifestyle hub from green to gold. **Key lesson:** a deep gold reads as orange when it fills a button — even a two-colour brand needs rules about *where* each colour goes; and one shared stylesheet turned the whole reskin into a handful of edits, not hundreds.

### 2026-06-23 — Polished the launch: LinkedIn link + branded README banner
After going live, I added my real LinkedIn link to the portfolio page (contact + footer) and redeployed, then gave this README a proper brand cover banner — the lightning bolt above the SMOALD wordmark on a white card. **Key lesson:** a transparent logo follows GitHub's light/dark theme, so I baked a white card into the image to keep it on the brand's white background; and upscaling a small PNG looks blurry, so I render the wordmark as *text* to keep it crisp at any size.

### 2026-09-11 — Turned the hub into a business that can be hired
The site stopped being a brand showcase and started selling: the homepage now leads with the offer, and `services`, `pricing`, `portfolio`, `about`, `contact` and `products` joined it alongside four legal pages. I built the enquiry form as a Cloudflare Pages Function on Resend — honeypot, length caps, HTML escaping, origin check — and proved it by watching a real email arrive. Then I automated deploys with GitHub Actions, which is how I discovered the live site had been two months out of date. **Key lesson:** a 200 status code proves nothing — every URL answered perfectly the whole time the site was stale — and "it goes live when someone remembers to run a command" is a bug in the process, not the code.

### 2026-09-12 — Made the design a product, and got listed where buyers look
I pulled the ThaiBridge design out into its own theme repo — 1,127 lines of CSS behind 33 colour tokens, a second colourway, five demo pages and a three-tier licence — so it became a product rather than one site's stylesheet. I settled a VAT question I'd raised twice (Stripe is merchant of record, so the fix was inclusive pricing, not switching tax off), fixed the honey farm's 21.6-second load down to 0.26s, and listed the business on Google Business Profile, Search Console and PeoplePerHour. **Key lesson:** check *which account* you're looking at before drawing conclusions — a whole confident line of reasoning turned out to be about the wrong Stripe account; and rebranding only really works if the translucent colours are derived from the tokens too, which is why 42 hardcoded `rgba()` values became `color-mix()`.

### 2026-09-12 — Put the theme on sale, and stopped the site publishing its own notes
The Classic & Modern theme became genuinely buyable — three Stripe Payment Links at £29 / £99 / £249, wired into `/products` only after loading each checkout to confirm it showed the right product at the right price. Then I found the deploy had been publishing the whole repo root, so my working notes — one of them carrying a friend's email address — were live at public URLs. I fixed it by staging the site into a clean folder before shipping, switched to an allowlist so a new internal folder is private by default, deleted nine old deployments that still served the address, and added a CI step that now fails the build if anything internal is reachable. **Key lesson:** a 200 status code is not evidence — the file was reported gone twice before it actually was, once because the fix silently did nothing and once because a delete loop reported success while deleting nothing. Only asking the live URL settled it.

## What's Next
- Flip the remaining "coming soon" spokes to "live" as more Store, Learn and Lifestyle products ship *(SMOALD Living ✓)*
- Add a CV PDF + LinkedIn link to the portfolio page
- Consider folding the standalone portfolio repo fully into this hub
- Sell the first theme licence, and automate the delivery email once it is worth automating
- A Flask/Jinja edition of the Classic &amp; Modern theme
- No automated tests yet — the CI deploy checks (is the new build live, is anything internal public, did staging drop a required file) are the only safety net
