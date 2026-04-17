# Skill: Code Review

## Purpose
Review the entire implementation of a completed feature holistically and produce a structured review report.

## Feature Resolution
If the feature name is not provided in the prompt, list all directories in `.ai/sdd/`
(excluding `_template-feature/` and `README.md`) and ask the developer which feature
to operate on. Do not guess.

## Instructions
1. Read the following context files first:
   - `.ai/sdd/<feature-name>/requirements.md`
   - `.ai/sdd/<feature-name>/tasks/` — all task files.
   - `.ai/knowledge/` — for established project conventions.
2. Read the full implementation — every file created or modified during this feature cycle.
3. Review the code as a complete system, not task by task. Look specifically for:
   - **Consistency** — naming conventions, code style, and architectural patterns inconsistent with the rest of the codebase.
   - **Redundancy** — logic or utilities duplicated across files that should be shared.
   - **Security** — input validation gaps, insecure defaults, exposed secrets, or unsafe data handling.
   - **Error handling** — missing or insufficient handling of failure states.
   - **Test coverage** — missing tests for critical paths or edge cases.
   - **Correctness** — any behaviour that does not match the requirements even if it passed per-task evaluation.
4. Save the review report to `.ai/sdd/<feature-name>/code-review.md` with:
   - **Summary** — overall assessment in 2-3 sentences.
   - **Issues** — each issue listed with severity (critical / major / minor), the affected file and line range, a description of the problem, and a suggested fix.
   - **Positives** — notable things done well.
5. Do not auto-fix anything. The review report is for the developer to read and act on.
