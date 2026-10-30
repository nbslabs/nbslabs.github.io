# Getting Started with dotai - AI-Powered Development Workflows

Every modern developer uses AI coding assistants - but jumping between projects means your AI starts from zero each time. What if your AI could *remember* across sessions? That's exactly what **dotai** does.

dotai is an open-source CLI tool that creates a persistent AI knowledge base for your codebase. It auto-generates context files, manages knowledge across sessions, and keeps every supported AI tool in sync - all without a build step.

## Why dotai Exists

The problem is simple: AI coding assistants are stateless. Every new session, every new conversation, your assistant has to re-discover your project's architecture, conventions, and constraints. This wastes time and leads to inconsistent suggestions.

dotai solves this by creating a `.ai/` directory in your project root that contains:

- **AI.md** - a single source of truth for all AI tools, auto-symlinked to CLAUDE.md, GEMINI.md, AGENTS.md, etc.
- **Knowledge base** - persistent context files that survive across sessions, including module maps, gotchas, patterns, and changelogs.
- **SDD toolkit** - a Spec-Driven Development workflow for structured feature implementation.

> dotai doesn't change how you write code. It changes how your AI *understands* your code.

## Quick Setup

Getting started takes under two minutes. Here's everything you need:

### Install

```bash
npm install -g @nbslabs/dotai
```

### Initialize in your project

```bash
cd your-project
dotai init
```

This scaffolds the `.ai/` directory with sensible defaults and auto-detects your project type.

### Scan your codebase

```bash
dotai knowledge scan
```

This generates the knowledge base - a set of structured markdown files that describe your codebase's modules, exports, dependencies, patterns, and gotchas.

## Supported AI Tools

dotai v3.0.0 supports four AI coding tools out of the box:

- **Claude Code** - via `CLAUDE.md` symlink
- **Gemini CLI** - via `GEMINI.md` symlink
- **Antigravity** - via `AGENTS.md` symlink
- **GitHub Copilot** - via `.github/copilot-instructions.md` symlink

All four read from the same `AI.md` source file, so your project context stays consistent regardless of which tool you're using.

## The Knowledge Base

The real power of dotai is the knowledge base. It's a set of markdown files that persist across AI sessions:

### INDEX.md

The top-level module map. Lists every module in your project, its path, file count, key exports, and dependencies. Think of it as a GPS for your codebase.

### gotchas.md

Things that are **not obvious** from reading the code. Edge cases, hidden dependencies, "never do X" rules. This file saves hours of debugging.

### patterns.md

Recurring code patterns discovered in the codebase - design tokens, section shells, card hover effects, naming conventions. AI agents read this to follow existing conventions instead of inventing new ones.

### changelog.md

Recent changes to the codebase, tracked at a higher level than git log. Useful for understanding what's been modified recently.

## Best Practices

Here are a few tips from teams using dotai in production:

1. **Run `dotai knowledge scan` regularly** - ideally after major refactors or new feature additions. The knowledge base is a snapshot; keep it fresh.

2. **Review AI.md after init** - the generated file is a great starting point, but you'll want to customize the project overview, constraints, and conventions sections to match your team's practices.

3. **Use the SDD workflow for complex features** - the Spec-Driven Development toolkit breaks features into phases (idea → requirements → tasks → implementation → evaluation → review). It's especially useful for features that span multiple files or modules.

4. **Commit your `.ai/` directory** - it's designed to be version-controlled. This way, every team member (and every AI session) gets the same context.

## What's Next

dotai is actively maintained by nbslabs and the open-source community. We're working on:

- **Auto-sync** - automatic knowledge base updates when files change
- **Team profiles** - per-developer preferences and context
- **Plugin system** - extend dotai with custom analyzers and generators

---

Ready to try it? Install dotai, run `dotai init` in your project, and experience the difference persistent AI context makes.

```bash
npm install -g @nbslabs/dotai
dotai init
dotai knowledge scan
```

That's it. Your AI assistant just got a permanent memory.
