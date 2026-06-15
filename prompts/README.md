# Prompt Library

[![Prompt Eval](https://github.com/joshuablakemorekay/smoald/actions/workflows/prompt-eval.yml/badge.svg)](https://github.com/joshuablakemorekay/smoald/actions/workflows/prompt-eval.yml)

This folder documents the prompts used to build **SMOALD.com — the SMOALD brand-house website**. It exists as portfolio evidence of prompt engineering, evaluation, and iteration — not as runtime configuration.

Each prompt directory contains the final version, the reasoning behind it, an executable evaluation rubric, and version history where the prompt was refined over time. Every rubric runs on every push via GitHub Actions.

## Index

| Prompt | Category | What it does | Iterated? |
|---|---|---|---|
| [`build-smoald-brand-hub`](./build-smoald-brand-hub/) | agent-workflow | Turns a brand-architecture brief into a complete, deployed multi-page "brand house" site | Yes (v1→v4) |

## Featured iterations

Prompts where the v1 → final journey shows the most learning:

### [`build-smoald-brand-hub`](./build-smoald-brand-hub/)
What began as a four-word "just do it" grew into a deployed, four-page website over four rounds. v1 built the hubs; v2 added the full hub-and-spoke model; v3 wired in the existing portfolio and settled the project name; v4 repositioned the build hub from "Tech" to "AI" and gave the portfolio a clean `/ai/hire` URL that mirrors the brand's own structure. The story shows natural language steered into a real product — and the judgment calls (honest "coming soon" states, consistent branding, no dead links) that kept it shippable.

## Skills demonstrated

This library is structured to show:

- [x] **Prompt design** — every prompt has a documented goal and structure
- [x] **Iteration** — see `versions/` subdirectories for prompts that were refined
- [x] **Evaluation** — every prompt has a rubric with executable pass conditions
- [x] **Automated testing** — rubrics run on every push via [`prompt-eval.yml`](../.github/workflows/prompt-eval.yml)
- [x] **Regression prevention** — `--fail-under 0.8` blocks merges that drop score below threshold
- [x] **Documentation** — every prompt has a REASONING.md explaining the *why*
- [x] **Consistency** — all prompts follow the same file structure and metadata

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
