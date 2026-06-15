# Build the SMOALD Brand-House Hub

> **Category:** agent-workflow
> **Model used:** Claude Opus 4.8 (Claude Code)
> **Project area:** SMOALD.com brand-house website
> **Status:** production
> **Last updated:** 2026-06-15

## What this prompt does

Turns a brand-architecture brief into a complete, deployed, multi-page "brand house" website — a parent hub linking three mini-hubs — through plain-English instructions to Claude Code, refined over four rounds.

## The prompt

```
I'm sure about this. SMOALD as parent hub. Three mini hubs and sub hubs within. Just do it.
```

## Inputs

- A **brand-architecture brief** (pasted from an earlier brainstorm) describing SMOALD as a parent company with three mini-hubs — Tech/AI, Learn, Store — each owning its own "spokes" (products).
- An **existing portfolio site** (`smoald-joshua-kay`) whose design system — dark `#0E1116` background, orange `#FF6A3D` accent, Bricolage Grotesque + Hanken Grotesk fonts — should be matched so the new site reads as one brand.

## Expected output

A complete, internally-linked static site:
- A parent homepage with three "doors" (the mini-hubs) and a hub-and-spoke architecture map
- A page per mini-hub (SMOALD AI / Learn / Store) listing its spokes
- **Honest** "coming soon" states for anything not built yet — no fake content
- Branding consistent with the existing portfolio
- Clean relative links that survive folder renames — ready to deploy to Cloudflare Pages

## Related files

- Reasoning: [`REASONING.md`](./REASONING.md)
- Evaluation rubric: [`rubric.yaml`](./rubric.yaml)
- Version history: [`versions/`](./versions/)
