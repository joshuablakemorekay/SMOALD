# Choose a Free Hosting Platform (research → decision)

> **Category:** analysis
> **Model used:** Claude Opus 4.8 (with deep web research, 250+ sources)
> **Project area:** SMOALD.com — infrastructure decision
> **Status:** production (decision shipped: site is live on Cloudflare)
> **Last updated:** 2026-06-14

## What this prompt does

Turns an open "where should I host this?" worry into an evidence-based decision. It forces one lens — *which genuinely-free tiers allow commercial use* — across the major platforms, so a beginner freelancer doesn't pick a host that bans commercial projects or forces an early paid upgrade. The research it triggered ended in a single choice: **Cloudflare**.

## The prompt

```
Probably use JS or something. I want to keep costs down so free should cover
as much as possible. Which platforms allow you to run commercial projects for
free? I know Vercel requires Pro. Which is genuinely best? Tell me what big
companies started on before expanding — and focus on the best genuinely-free
options for someone in my position right now.
```

## Inputs

- **My situation:** a UK sole-trader freelancer, beginner, building in JavaScript / Next.js, who will sell digital products — so the host must permit *commercial* use on its free tier.
- **The candidates:** Vercel, Netlify, Render, Cloudflare, GitHub Pages, plus the big clouds (AWS / GCP / Azure).

## Expected output

A sourced comparison that:
- Ranks platforms by whether their **free tier allows commercial use** (not just by features)
- Flags the traps: Vercel Hobby *bans* commercial use; GitHub Pages bans e-commerce/SaaS; Render's free Postgres expires and services sleep
- Ends in a **single recommendation** with the operational gotchas spelled out (for Cloudflare: the OpenNext adapter for Next.js, and the 3 MiB free Worker size cap)
- Notes what big companies *started* on (cheap/free infra) vs. what they run now

## Related files

- Reasoning: [`REASONING.md`](./REASONING.md)
- Evaluation rubric: [`rubric.yaml`](./rubric.yaml)
- Version history: [`versions/`](./versions/)
