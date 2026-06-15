# Reasoning: Build the SMOALD Brand-House Hub

This document captures the thinking behind the prompt. It exists so a reader can understand not just *what* the prompt is, but *why* it ended up this way.

## Goal

Turn a brand-architecture idea into a real, live website — a unified "brand house" for SMOALD with a parent homepage linking three mini-hubs (AI, Learn, Store), so clients see a *founder running a company*, not a freelancer for hire.

## Iteration history

This was one site, refined across four rounds — each round a separate prompt (see [`versions/`](./versions/)):

- **v1** — "Just do it": built the 4-page hub from the architecture brief, matching the existing portfolio's design so it reads as one brand.
- **v2** — Added the full hub-and-spoke model: an architecture map on the homepage, plus every spoke under each hub (e.g. Web apps, Game apps, AI integration, Prompt engineering).
- **v3** — Wired the existing portfolio in as a spoke and renamed the project to `smoald.com`.
- **v4** — Renamed "SMOALD Tech" → "SMOALD AI" and restructured the portfolio URL to `/ai/hire` (with a `/hire` shortcut redirect).

## Failure modes the final version handles

- **Design drift** — kept identical colours and fonts to the existing portfolio so the two sites read as one brand, not two.
- **Fake content** — used honest "coming soon" badges for unbuilt areas (the Store) instead of inventing products.
- **Dead links** — replaced a broken link to a *private* GitHub Pages repo with the live Cloudflare Pages URL.
- **Brittle paths** — used relative links that survived renaming the project folder from `smoald-hub` to `smoald`.

## Outcome

A live, deployed 4-page site on Cloudflare Pages (`smoald.pages.dev`), with the custom domain `smoald.com` wired up. Good enough to ship and put on proposals.

## What I'd change next

Keep building out the Store and Learn spokes as they go live — flipping each "coming soon" badge to "live" when the real product ships.

## Tags

`code-generation` `agent-workflow` `web-dev`
