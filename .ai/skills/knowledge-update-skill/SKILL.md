# Skill: Knowledge Update

## Purpose
Update the `.ai/knowledge/` directory to reflect everything built and decided during this feature cycle, so future sessions start with accurate codebase context.

## Feature Resolution
If the feature name is not provided in the prompt, list all directories in `.ai/sdd/`
(excluding `_template-feature/` and `README.md`) and ask the developer which feature
to operate on. Do not guess.

## Instructions
1. Read the completed feature artifacts:
   - `.ai/sdd/<feature-name>/requirements.md`
   - `.ai/sdd/<feature-name>/tasks/` — all task files.
   - `.ai/sdd/<feature-name>/plans/` — all plan files.
2. Read the existing `.ai/knowledge/` directory to understand what is already documented.
3. Update or create knowledge files to reflect:
   - **New modules or components** — what they do, where they live, and how they are structured.
   - **New patterns or conventions** — coding patterns established during this feature that should be followed in future work.
   - **New APIs or interfaces** — internal APIs created, with their signatures and usage examples.
   - **Architectural decisions** — significant decisions made and the reasoning behind them.
   - **Known limitations** — anything intentionally deferred or left incomplete, and why.
4. Do not delete existing knowledge entries unless they are factually incorrect. Prefer adding or updating.
5. Keep knowledge files concise — they are reference material for agents, not documentation for humans.
