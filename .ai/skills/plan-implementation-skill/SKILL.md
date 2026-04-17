# Skill: Plan Implementation

## Purpose
Execute the implementation plan for a single task by following its plan file exactly.

## Feature Resolution
If the feature name is not provided in the prompt, list all directories in `.ai/sdd/`
(excluding `_template-feature/` and `README.md`) and ask the developer which feature
to operate on. Do not guess.

## Instructions
1. Identify the current task to implement. Always work on the lowest-indexed incomplete task.
2. Read the following files before writing any code:
   - `.ai/sdd/<feature-name>/tasks/<index>_<slug>.task.md`
   - `.ai/sdd/<feature-name>/plans/<index>_<slug>.plan.md`
   - `.ai/knowledge/` — for codebase context and established conventions.
3. Follow the implementation steps in the plan file in order. Do not skip steps.
4. Do not make design decisions not covered by the plan. If something is unclear, check `requirements.md` and `plans/` first. If still unclear, stop and ask the developer.
5. After completing the task, verify that all output files listed in the task file have been created or modified as specified.
6. If this is a retry after a failed evaluation:
   - Read the evaluation result file (`.result.md`) for this task first.
   - Focus only on the failing criteria — do not rewrite passing code.
   - After fixing, report completion and await re-evaluation.
7. Do not begin the next task automatically. Report completion and wait.
