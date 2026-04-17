# Skill: Evaluation

## Purpose
Verify a completed task implementation against its acceptance criteria and produce a clear pass or fail verdict.

## Feature Resolution
If the feature name is not provided in the prompt, list all directories in `.ai/sdd/`
(excluding `_template-feature/` and `README.md`) and ask the developer which feature
to operate on. Do not guess.

## Instructions
1. Identify the task to evaluate by its index.
2. Read the following files:
   - `.ai/sdd/<feature-name>/evaluation/<index>_<slug>.evaluation.md`
   - `.ai/sdd/<feature-name>/tasks/<index>_<slug>.task.md`
   - All files listed under "Files to inspect" in the evaluation file.
3. Check every acceptance criterion in the evaluation file. For each criterion, record:
   - Whether it passes or fails.
   - The specific evidence from the code that supports this verdict.
4. Save the evaluation report to `.ai/sdd/<feature-name>/evaluation/<index>_<slug>.result.md` with:
   - **Overall verdict** — PASS or FAIL.
   - **Criterion results** — the pass/fail verdict and evidence for each criterion.
   - **Failure details** — for any failing criterion, a precise description of what is wrong and what the correct implementation should look like.
5. If the overall verdict is FAIL, the Coding Agent must retry the task using the failure details as input. Do not advance to the next task until the verdict is PASS.
6. If the overall verdict is PASS, report completion and proceed to the next task's evaluation.
