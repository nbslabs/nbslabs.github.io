# Skill: Task Decomposition

## Purpose
Break an approved `requirements.md` into a set of discrete, implementable task files in the `tasks/` directory.

## Feature Resolution
If the feature name is not provided in the prompt, list all directories in `.ai/sdd/`
(excluding `_template-feature/` and `README.md`) and ask the developer which feature
to operate on. Do not guess.

## Instructions
1. Read `.ai/sdd/<feature-name>/requirements.md` in full.
2. Identify every distinct unit of work required to fulfill the requirements.
3. For each task:
   - Assign a zero-padded index reflecting its execution order (01, 02, 03, ...).
   - Derive a short snake_case slug from the task title.
   - Write a task file named `<index>_<slug>.task.md` into `.ai/sdd/<feature-name>/tasks/`.
4. Each task file must contain:
   - **Task title**
   - **Goal** — one sentence describing what this task achieves.
   - **Depends on** — list of task indices this task must follow (empty if none).
   - **Input files** — existing files the coding agent must read to do this task.
   - **Output files** — files the coding agent must create or modify.
   - **Definition of done** — specific, observable criteria that confirm the task is complete.
5. Tasks must be ordered so all dependencies are satisfied before a task is attempted. No circular dependencies.
6. Tasks must be granular enough for a coding agent to execute autonomously without making architectural decisions.
7. After writing all task files, notify the developer that human review is required.
