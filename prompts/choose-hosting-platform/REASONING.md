# Reasoning: Choose a Free Hosting Platform

This document captures the thinking behind the prompt — why the research was framed this way, and why it landed on Cloudflare.

## Goal

Decide, with evidence, which free host to build SMOALD on — specifically one that allows *commercial* use for free. I'll sell digital products, so I can't have a host that bans commercial projects or forces an early paid upgrade the moment money changes hands.

## Iteration history

- **v1** — A broad question: "which platforms are free, and what do Virgin / Apple / Amazon / Anthropic use?" Too open to answer well, and it mixed two different things (hosting vs. the big players' enterprise infra).
- **v2** — Added the constraints that actually mattered: I build in JS / Next.js, free should cover as much as possible, and I want to know what big companies *started* on — not what they run now. That turned a vague ask into a researchable question and produced a 250+ source comparison.

## Failure modes the final version handles

- **Mixing layers** — v1 blurred "where do I host the site" with "what do giant companies run." v2 separated them and pinned my real stack.
- **The commercial-use trap** — the refined lens ("commercial use on free") is the one a beginner misses. It ruled out Vercel's Hobby tier (commercial use *prohibited*) and GitHub Pages (no e-commerce/SaaS) — exactly the hosts I might have reached for by default.
- **Hidden expiry / sleep** — it surfaced that Render's free Postgres expires after ~30 days and its services sleep, which would have bitten me later.

## Outcome

A sourced report ranking platforms by commercial-use-on-free, and a clear decision: **Cloudflare** — commercial use allowed, no expiry, unlimited static bandwidth, so no surprise bills. The gotchas were noted up front (new Next.js apps deploy on Workers via the OpenNext adapter; the free Worker size cap is 3 MiB). Good enough to act on — SMOALD is now live on Cloudflare.

## What I'd change next

Re-run the same commercial-use lens on the *database* layer (Supabase vs. Cloudflare D1) if a future SMOALD product needs one — the free-tier catches there (idle-pausing, expiry) deserve the same scrutiny.

## Tags

`analysis` `research` `decision-support`
