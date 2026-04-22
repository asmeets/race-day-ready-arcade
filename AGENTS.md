# AGENTS.md

This repository is a Microsoft MakeCode Arcade project for an F1 x Mercedes x Microsoft STEM and career exploration activation aimed at middle school students.

Optimize every change for three outcomes: event reliability, student remixability, and clear learning value.

Treat the game as classroom-ready software. Keep controls simple, feedback immediate, text short, and failure states recoverable.

Use MakeCode Arcade conventions. Preserve editor-friendly files such as `main.ts`, `pxt.json`, tilemaps, image literals, generated asset files, and other Arcade project resources.

## Core repo guidance

- Prefer readable MakeCode Arcade TypeScript patterns over generic app architecture.
- Keep tuning values obvious and easy to modify.
- Use direct events, sprite kinds, overlaps, timers, score, and life systems where possible.
- Keep content age-appropriate, inclusive, and connected to engineering tradeoffs, teamwork, and career pathways.
- Assume sprite art is normally 32x32 and always constrained to the Arcade 16-color palette unless there is a clear reason to do otherwise.
- Before building custom systems, blocks, or helper extensions, check whether an existing Arcade extension is a better fit.

## Instruction sources

- Repository-wide Copilot guidance lives in `.github/copilot-instructions.md`.
- Specialized reusable workflows live in `.github/skills`.
- Role-specific custom agents live in `.github/agents`.

Trust those repo customizations first before broad exploration.

## Skills to use

- `makecode-arcade-architecture` for gameplay system structure and refactors.
- `makecode-arcade-gameplay-tuning` for balancing speed, handling, efficiency, scoring, and collision tradeoffs.
- `makecode-arcade-classroom-remix` for student remix tasks and facilitator-led changes.
- `makecode-arcade-accessibility-review` for readability, controls, and event readiness.
- `makecode-arcade-learning-design` for tutorials, skillmaps, block-friendly activities, and pedagogy.
- `makecode-arcade-project-documentation` for keeping the companion wiki aligned with gameplay, learning, facilitation, and planning updates.
- `makecode-arcade-asset-packs` for reusable Arcade art, tilemaps, sounds, and packaging.
- `makecode-arcade-custom-blocks` for project-local or reusable blocks in `custom.ts` or extensions.
- `makecode-arcade-extension-selection` for evaluating existing Arcade extensions before building custom implementations.

Load multiple skills when the task crosses domains.

## Agents to use

- `arcade-builder` for implementation and refactoring.
- `learning-designer` for student-facing instructional content.
- `tutorial-language-reviewer` for checking tutorial language appropriateness, explanation depth, and clarity for high school freshmen.
- `event-readiness-reviewer` for classroom and activation review.
- `pixel-art-designer` for sprite and asset direction.

Use agent handoffs when moving from design to implementation or from implementation to review.

## Validation

- Prefer the MakeCode Arcade extension, simulator, or editor validation flow when available.
- If execution is unavailable, still validate the structure and correctness of markdown, metadata, and project layout.
- Do not assume generic Node.js or web build commands exist unless the repository later adds them.