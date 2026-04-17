# Skill: Evaluation Generation

## Purpose
For each task file in `tasks/`, produce a corresponding acceptance criteria file in `evaluation/`.

## Feature Resolution
If the feature name is not provided in the prompt, list all directories in `.ai/sdd/`
(excluding `_template-feature/` and `README.md`) and ask the developer which feature
to operate on. Do not guess.

## Instructions
1. Read `.ai/sdd/<feature-name>/requirements.md` for full context.
2. For each file in `.ai/sdd/<feature-name>/tasks/`:
   a. Read the task file and its corresponding plan file in `plans/`.
   b. Produce an evaluation file named with the same index and slug: `<index>_<slug>.evaluation.md`.
   c. Save it to `.ai/sdd/<feature-name>/evaluation/`.
3. Each evaluation file must contain:
   - **Task reference** — the task index and title this evaluation belongs to.
   - **Acceptance criteria** — numbered list of specific, verifiable conditions that must all be true for the task to pass.
   - **Test scenarios** — concrete input/output examples that demonstrate each criterion.
   - **Edge case checks** — specific edge conditions the evaluator must verify.
   - **Files to inspect** — exact file paths the evaluator must examine.
   - **Failure examples** — examples of what a failing implementation looks like, to help the evaluator make accurate judgements.
4. Every criterion must be verifiable by reading code or running the application. Avoid subjective criteria.
5. After writing all evaluation files, notify the developer that human review is required before implementation begins.
