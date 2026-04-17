# AI Instructions — nbslabs.github.io

> This file is your single source of truth for all AI coding tools.
> It is symlinked to CLAUDE.md, GEMINI.md, AGENTS.md, and more by dotai.
> Edit this file — all tools stay in sync automatically.

---

## ⚡ Before You Start — Read the Knowledge Base

**IMPORTANT**: Before exploring the codebase or asking the user questions, read the
knowledge base files in `.ai/knowledge/`. They contain pre-scanned codebase context
that saves you from re-discovering what previous sessions already learned.

1. **Start with** `.ai/knowledge/INDEX.md` — module map, exports, and dependency graph
2. **Check** `.ai/knowledge/gotchas.md` — known edge cases and "never do X" rules
3. **Check** `.ai/knowledge/patterns.md` — recurring code patterns in this project
4. **Check** `.ai/knowledge/changelog.md` — recent code changes
5. **For deep context on a specific module**, read `.ai/knowledge/modules/<name>.md`

If the knowledge base does not exist yet, suggest the user runs:
\`\`\`bash
dotai knowledge scan
\`\`\`

## 🧠 Auto-Persist Rule (MANDATORY)

**YOU MUST FOLLOW THIS RULE AT ALL TIMES**:

Whenever you read, analyze, or modify code and discover something that is NOT already
in the knowledge base — **immediately persist it** by calling the \`knowledge_append\`
MCP tool (or the CLI equivalent). Do NOT wait for the user to ask. Do NOT batch findings.
Do NOT skip this step. Every non-obvious discovery must be persisted as soon as you make it.

**This is automatic behavior, not optional.** Treat it like writing to a log — it happens
as a side effect of your work, not as a separate step the user requests.

### What triggers auto-persist:
- You read a file and notice a non-obvious constraint or side effect
- You discover a hidden dependency between modules
- You fix or debug a bug and find the root cause was subtle
- You notice a pattern used consistently across multiple files
- You find that a particular approach does NOT work (saves future sessions from repeating mistakes)
- You encounter an undocumented API requirement or configuration rule
- You discover something that contradicts or is missing from the current knowledge base

### How to persist (in order of preference):
1. **MCP tool** — call \`knowledge_append\` directly (no user interaction needed)
2. **Shell command** — run \`dotai knowledge append --gotchas --finding "..." --agent "your-name"\`

### What NOT to persist:
- Information already in the knowledge base (check first)
- Trivially obvious things readable from the code itself
- Task-specific context that won't help future sessions

### Persist format:
- Be specific: include file names, function names, line references
- Explain WHY, not just WHAT
- Keep each finding under 3 sentences
- Use \`target: "gotchas"\` for edge cases, bugs, constraints
- Use \`target: "patterns"\` for recurring code patterns
- Use \`module: "<name>"\` for module-specific discoveries

## 📋 MCP Server Reference

If the dotai knowledge MCP server is configured, you have access to these tools:

| Tool | Description |
|------|-------------|
| \`knowledge_query\` | Search knowledge base by keyword |
| \`knowledge_get_module\` | Get full summary of a specific module |
| \`knowledge_list_modules\` | List all indexed modules |
| \`knowledge_recent_changes\` | Get recent codebase changes |
| \`knowledge_append\` | **Write back** a finding to persist across sessions |
| \`knowledge_explore\` | Read source files for deep analysis |
| \`knowledge_populate_ai_md\` | Update AI.md project sections with codebase-specific info |

---

## Project Overview

Static landing page for nbslabs (nbslabs.dev) — a Bangladeshi developer community and open-source initiative. Showcases six programs, open-source projects (dotai flagship + others), community info, and contact details. Deployed via GitHub Pages with a custom CNAME.

## Architecture

No build step. Single-file static site:

- `index.html` — entire site: inline CSS, inline JS, all HTML sections
- `README.md` — repo documentation
- `CNAME` — custom domain: nbslabs.dev
- `.ai/contexts/brand_guideline.md` — source of truth for all visual/brand decisions
- `.ai/contexts/nbslabs_profile.md` — source of truth for all copy and program descriptions
- `.ai/knowledge/` — persistent agent memory (INDEX, gotchas, patterns, changelog)

Page sections in DOM order: `#home` → `#programs` → `#oss` → `#audience` → `#mission` → `#involve` → `#contact` → `footer`

## Tech Stack

- **HTML/CSS/JS**: Vanilla, no framework, no bundler, no package.json
- **Fonts**: Google Fonts CDN — Nunito (wght 200–800), JetBrains Mono (wght 400–500)
- **Icons**: Emoji only (no icon library)
- **Deployment**: GitHub Pages, auto-deploys from `main` branch root
- **Domain**: nbslabs.dev via CNAME file

## Coding Conventions

- Follow existing patterns in the codebase — do not introduce new patterns without asking
- All CSS uses `var(--token-name)` design tokens — never hardcode hex values that have a token
- Section structure always: `<section>` → `.section-inner` → `.section-header` → content grid
- Button variants: `.btn-primary`, `.btn-outline`, `.btn-accent` — do not create new button styles
- Logo always: `<span class="nbs">nbs</span><span class="labs">labs</span>` (weights 800 / 200)
- Uppercase text ONLY on `.section-label` — never on headings or body copy
- All JS is vanilla, at bottom of `<body>` — no libraries, no modules

## Key Commands

| Action | Command |
|--------|---------|
| Preview locally | Open `index.html` in browser (no server needed) |
| Deploy | `git push origin main` — GitHub Pages auto-deploys |
| Update AI configs | Edit `.ai/AI.md` — dotai symlinks propagate to all AI tools |

## Important Constraints

- **NEVER** introduce a build toolchain, bundler, or package.json without explicit approval
- **NEVER** add external JS CDN libraries without explicit approval
- **NEVER** use pure black `#000000` — always `#1A1A1A` or `#3D3D3D`
- **NEVER** alter the `.nbs` / `.labs` font-weight split (800 / 200) — core brand identity
- **NEVER** use uppercase on headings or body — only on `.section-label` elements
- **NEVER** re-add the Roadmap section — intentionally removed by user
- **ALWAYS** consult `.ai/contexts/brand_guideline.md` before adding colors, fonts, or UI patterns
- **ALWAYS** consult `.ai/contexts/nbslabs_profile.md` before updating copy or program descriptions

## Common Pitfalls

- All CSS is inline in `index.html` — there is no external stylesheet
- dotai v3.0.0 supports only: Claude Code, Gemini CLI, Antigravity, GitHub Copilot — not Cursor/Windsurf
- dotai GitHub link is `https://github.com/nbslabs/dotai-cli` (not `/nbslabs`)
- Sponsor "Get in touch" links to `/contact` — not `mailto:`
- Mobile nav: `.nav-links` hidden at ≤768px, toggled via `.open` class — restructuring breaks mobile
- Decorative SVG network in hero must stay ≤15% opacity — must not compete with text


## SDD Toolkit

This project uses a Spec-Driven Development workflow managed by the `dotai sdd` toolkit.

Read `.ai/sdd/README.md` at the start of every session before writing any code for a feature that has an entry in `.ai/sdd/`.

The SDD workflow uses skills located at `.ai/skills/`. Each phase specifies which skill to use. Always read the relevant skill file before starting a phase — do not rely on memory of what the skill does.

Never modify files in `.ai/sdd/<feature-name>/evaluation/` after Phase 4 is approved unless the developer explicitly instructs you to. These files are the contract for automated evaluation.
