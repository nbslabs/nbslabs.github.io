<!-- AUTO-GENERATED: safe to edit, do not delete header -->
# Codebase Knowledge Index
> Last updated: 2026-04-18 | Agent: claude-sonnet-4-6
> Total files: 2 (index.html, README.md) across 1 module

## Module Map

| Module | Path | Files | Key Exports | Depends On |
|--------|------|-------|-------------|------------|
| landing | `index.html` | 1 | Full landing page (HTML+CSS+JS, no build step) | Google Fonts CDN |
| docs | `README.md` | 1 | Repo documentation | — |

## Dependency Graph

<!-- Read this to understand what depends on what before making changes -->

```
index.html
  └── Google Fonts CDN (Nunito 200-800, JetBrains Mono 400-500)
  └── No JS frameworks, no npm, no build toolchain
  └── GitHub Pages serves index.html directly from repo root
  └── CNAME → nbslabs.dev
```

## Quick Reference

| Symbol | Module | Kind |
|--------|--------|------|
| `:root` CSS custom properties | `index.html:18–41` | Design token declarations |
| `.reveal` + `IntersectionObserver` | `index.html` | Scroll animation pattern |
| `#navbar` `.scrolled` class toggle | `index.html` | Scroll shadow on nav |
| `#navLinks` `.open` class toggle | `index.html` | Mobile hamburger nav |
| `.logo .nbs` / `.logo .labs` | `index.html:96–97` | Brand weight-split wordmark |

## Page Sections (in DOM order)

| Section ID | Purpose |
|------------|---------|
| `#home` | Hero — headline, stats grid |
| `#programs` | Six programs grid |
| `#oss` | dotai featured + other projects |
| `#audience` | 4-audience grid |
| `#mission` | Mission text + 5 values cards |
| `#involve` | 4-way engagement cards |
| `#contact` | Email / Facebook / GitHub contact cards |
| `footer` | Deep Teal strip — logo, nav links, copyright |
