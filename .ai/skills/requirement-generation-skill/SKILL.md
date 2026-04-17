# Skill: Requirement Generation

## Purpose
Read the developer's raw idea from `idea.md` and produce a complete, structured `requirements.md` for the feature.

## Feature Resolution
If the feature name is not provided in the prompt, list all directories in `.ai/sdd/`
(excluding `_template-feature/` and `README.md`) and ask the developer which feature
to operate on. Do not guess.

## Instructions
1. Read `.ai/sdd/<feature-name>/idea.md` in full before writing anything.
2. Do not invent scope. Only formalize and expand what the developer has already implied.
3. Produce `requirements.md` with the following sections:
   - **Overview** — one paragraph restating the goal in clear language.
   - **Functional Requirements** — numbered list of specific, testable capabilities the system must have.
   - **User Flows** — step-by-step descriptions of how a user moves through the feature.
   - **Edge Cases** — explicit list of boundary conditions and error states that must be handled.
   - **Non-Functional Requirements** — performance, security, accessibility, or compatibility constraints.
   - **Out of Scope** — explicit list of things this feature does NOT cover.
4. Every functional requirement must be testable. Avoid vague language like "the system should be fast" — write "the API must respond within 300ms under normal load" instead.
5. Save the output to `.ai/sdd/<feature-name>/requirements.md`.
6. After saving, notify the developer that human review is required before the pipeline continues.
