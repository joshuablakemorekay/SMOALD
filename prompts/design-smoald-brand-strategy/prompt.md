# Design the SMOALD Brand Strategy

> **Category:** analysis
> **Model used:** Claude Opus 4.8
> **Project area:** SMOALD — brand architecture & positioning
> **Status:** production (became the brief for the live site)
> **Last updated:** 2026-06-10

## What this prompt does

Settles SMOALD's brand structure *before* a line of the site is built — deciding whether it's one company or many, how the divisions fit together, what to name them, and where the freelancer portfolio lives. The output became the brief that the [`build-smoald-brand-hub`](../build-smoald-brand-hub/) prompt then turned into a live website.

## The prompt

```
Now we have the main parent hub with three mini hubs each containing spokes.
My long-term vision is for SMOALD to become a holding company, but right now
I'm a freelancer trying to find work. Should my portfolio go under the SMOALD
parent, or be a separate site? Wouldn't SMOALD Commerce come under SMOALD Tech,
and couldn't Tech and AI then merge into one? Help me settle the structure.
```

## Inputs

- A **brand ambition**: SMOALD as a Virgin/Meta-style parent with divisions — modelled explicitly on the hub-and-spoke structure.
- A **reality check**: no revenue yet, one founder, one shipped product (ThaiBridge-AI).
- A **naming question**: what to call the build division — Tech, Dev, or AI.

## Expected output

A single, clear brand model:
- **SMOALD** (parent) → three mini-hubs — **AI** (build), **Learn**, **Store** — each with its own spokes
- A decision to **merge the overlaps** (Tech + AI + Commerce → one build hub; Wear + Living + Store → one Store hub) so there are three clean divisions, not six hollow ones
- The strategic call: build the **founder brand that gets me hired now**, not the full holding company — grow into that structure once the divisions genuinely exist
- The **portfolio lives under SMOALD** (at `/ai/hire`), so clients see a founder, not a freelancer asking for a favour

## Related files

- Reasoning: [`REASONING.md`](./REASONING.md)
- Evaluation rubric: [`rubric.yaml`](./rubric.yaml)
- Version history: [`versions/`](./versions/)
