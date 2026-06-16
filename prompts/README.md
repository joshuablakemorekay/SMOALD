# Prompt Library

[![Prompt Eval](https://github.com/joshuablakemorekay/smoald/actions/workflows/prompt-eval.yml/badge.svg)](https://github.com/joshuablakemorekay/smoald/actions/workflows/prompt-eval.yml)

This folder documents the prompts used to **decide on, design, and build SMOALD.com — the SMOALD brand-house website**. It exists as portfolio evidence of prompt engineering, evaluation, and iteration — not as runtime configuration.

Each prompt directory contains the final version, the reasoning behind it, an executable evaluation rubric, and version history where the prompt was refined over time. Every rubric runs on every push via GitHub Actions.

## Index

Listed in the order the work actually happened — from first decision to final polish.

| Prompt | Category | What it does | Iterated? |
|---|---|---|---|
| [`design-smoald-brand-strategy`](./design-smoald-brand-strategy/) | analysis | Settles SMOALD's brand structure — three mini-hubs under one parent, founder-now vs holding-company-later — before any code is written | Yes (v1→v3) |
| [`choose-hosting-platform`](./choose-hosting-platform/) | analysis | Turns "where do I host this?" into an evidence-based decision via the commercial-use-on-free lens — landing on Cloudflare | Yes (v1→v2) |
| [`build-smoald-brand-hub`](./build-smoald-brand-hub/) | agent-workflow | Turns the brand-architecture brief into a complete, deployed multi-page "brand house" site | Yes (v1→v4) |
| [`redesign-homepage-figma-merge`](./redesign-homepage-figma-merge/) | code-generation | Merges a Figma design's tri-colour system and interactive "Ecosystem" into the live homepage while preserving the existing site | Yes (v1→v3) |

## Featured iterations

Prompts where the v1 → final journey shows the most learning:

### [`design-smoald-brand-strategy`](./design-smoald-brand-strategy/)
The decision that came before the code. v1 sketched a full Virgin-style empire — six divisions on paper. v2 spotted that several were the same business (building e-commerce stores *is* development; Wear/Living/Store are all "products for consumers") and merged six into three. v3 made the two calls that mattered most: name the build hub **AI** (not the generic "Tech" or junior-sounding "Dev"), and build the founder brand that gets you hired *now* rather than the hollow holding company. The story shows strategy treated as a real discipline — and the judgment that an org chart isn't traction.

### [`choose-hosting-platform`](./choose-hosting-platform/)
How a beginner's hosting worry became an evidence-based decision. v1 asked too broadly ("which are free, and what do Apple/Amazon use?"), mixing a freelancer's budget with enterprise infrastructure. v2 pinned the real lens — *which genuinely-free tiers allow commercial use* — and launched a 250+ source research sweep. That lens is the one a beginner misses: it ruled out Vercel's Hobby tier (commercial use prohibited) and GitHub Pages, and surfaced Render's expiring free database. The result was a single, confident choice — **Cloudflare** — with the gotchas (OpenNext adapter, 3 MiB Worker cap) flagged up front. The site is live on Cloudflare today.

### [`build-smoald-brand-hub`](./build-smoald-brand-hub/)
What began as a four-word "just do it" grew into a deployed, four-page website over four rounds. v1 built the hubs; v2 added the full hub-and-spoke model; v3 wired in the existing portfolio and settled the project name; v4 repositioned the build hub from "Tech" to "AI" and gave the portfolio a clean `/ai/hire` URL that mirrors the brand's own structure. The story shows natural language steered into a real product — and the judgment calls (honest "coming soon" states, consistent branding, no dead links) that kept it shippable.

### [`redesign-homepage-figma-merge`](./redesign-homepage-figma-merge/)
A masterclass in *constrained* redesign. The brief was "merge this Figma design in while keeping everything as it is" — so the challenge wasn't building something new, it was adopting a design's best ideas (a red/yellow/orange pillar system, an interactive "Ecosystem") without discarding the founder framing, copy, and sub-pages that already worked. v1 chose to rebuild the look in the existing static site rather than adopt the Figma export's React framework; v2 delivered the merge as a preview-before-deploy; v3 swapped in the real logo, removing a screenshot's baked-in background programmatically and verifying the result before sign-off. The judgment calls — preview before going live, catching that the repo deploys via `wrangler` not git push, knocking out a logo background cleanly — are the story.

## Skills demonstrated

This library is structured to show:

- [x] **Prompt design** — every prompt has a documented goal and structure
- [x] **Iteration** — see `versions/` subdirectories for prompts that were refined
- [x] **Evaluation** — every prompt has a rubric with executable pass conditions
- [x] **Automated testing** — rubrics run on every push via [`prompt-eval.yml`](../.github/workflows/prompt-eval.yml)
- [x] **Regression prevention** — `--fail-under 0.8` blocks merges that drop score below threshold
- [x] **Documentation** — every prompt has a REASONING.md explaining the *why*
- [x] **Consistency** — all prompts follow the same file structure and metadata
- [x] **Research & decision-support** — turning open questions (brand structure, hosting) into sourced, actionable decisions

## How to read this folder

- **90 seconds:** read this index and skim the featured iteration.
- **5 minutes:** read this index plus the [`REASONING.md`](./build-smoald-brand-hub/REASONING.md).
- **Longer:** read the [CHANGELOG](./CHANGELOG.md) for the iteration story, then run the eval runner.

## Running the evaluations locally

```bash
pip install pyyaml
python3 scripts/eval_runner.py --provider mock
```

This validates every prompt against its rubric using deterministic fixtures (no API costs). See [`results-summary.md`](./results-summary.md) for the latest run.

To run against the real API: set `ANTHROPIC_API_KEY` and pass `--provider anthropic`.

## Changelog

See [`CHANGELOG.md`](./CHANGELOG.md) for a chronological view of prompt evolution.
