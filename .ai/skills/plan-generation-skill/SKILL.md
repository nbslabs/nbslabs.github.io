# Skill: Plan Generation

## Purpose
For each task file in `tasks/`, produce a corresponding implementation plan file in `plans/`.

## Feature Resolution
If the feature name is not provided in the prompt, list all directories in `.ai/sdd/`
(excluding `_template-feature/` and `README.md`) and ask the developer which feature
to operate on. Do not guess.

## Instructions
1. Read `.ai/sdd/<feature-name>/requirements.md` for full context.
2. For each file in `.ai/sdd/<feature-name>/tasks/`:
   a. Read the task file completely.
   b. Produce a plan file named with the same index and slug: `<index>_<slug>.plan.md`.
   c. Save it to `.ai/sdd/<feature-name>/plans/`.
3. Each plan file must contain:
   - **Task reference** — the task index and title this plan belongs to.
   - **Implementation steps** — ordered, numbered steps the coding agent must follow.
   - **Files to create** — exact file paths and a description of their purpose.
   - **Files to modify** — exact file paths, which sections to change, and what to change them to.
   - **Patterns and conventions** — specific coding patterns, naming conventions, or architectural rules to follow.
   - **APIs and interfaces** — any internal or external APIs the task must call or implement.
   - **Error handling** — how the implementation must handle failures and edge cases.
4. Plans must be detailed enough that a coding agent can follow them without making design decisions.
