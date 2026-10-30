# Master Prompt: Serverless Blog System for Static Sites (GitHub Pages)

> **Target AI Coding Agent**: This prompt is self-contained. Read it fully before writing a single line of code. Every decision you make must trace back to a requirement stated here.

---

## 1. Project Context

You are adding a **fully serverless blog system** to an existing static website (deployed on GitHub Pages or any static host). There is no backend, no build step, no framework, no bundler. The entire system runs on **raw HTML, CSS, and vanilla JavaScript** — nothing else.

Blog posts are authored as **Markdown files** committed directly to the repository. A hand-maintained (or AI-generated) `blog-index.json` file acts as the single source of truth for post metadata. Rendering, routing, and all UI logic happen entirely client-side at runtime.

---

## 2. File & Directory Structure

Create the following structure inside the existing project. Do **not** reorganise or touch files outside this structure unless the integration step explicitly requires it.

```
/blog/
├── index.html              # Blog listing page (all posts, filterable)
├── post.html               # Single post reader page
├── blog-index.json         # Metadata registry for all posts (see schema below)
├── blog-creation-instructions.md  # Guide for authors / AI agents (see Section 8)
│
├── posts/                  # All Markdown source files live here
│   └── example-post.md
│
├── assets/
│   ├── covers/             # Cover images referenced in blog-index.json
│   └── inline/             # Inline post images referenced in blog-index.json
│
├── css/
│   └── blog.css            # All blog styles (isolated from the host site)
│
└── js/
    ├── blog-core.js        # Shared utilities (JSON fetch, MD parser bootstrap)
    ├── blog-listing.js     # Logic for index.html
    ├── blog-post.js        # Logic for post.html
    └── blog-reader-prefs.js # Reader preference panel logic & persistence
```

> **Integration with existing site**: To add a "Blog" link to the host site's nav, only touch the host site's existing nav HTML — insert one `<a href="/blog/">Blog</a>` anchor. Nothing else in the host site changes.

---

## 3. `blog-index.json` — Full Schema

```json
{
  "posts": [
    {
      "id": "unique-post-slug",
      "title": "Post Title Here",
      "description": "One or two sentence summary shown on the listing card.",
      "author": "Author Name",
      "publishedAt": "2025-04-18",
      "updatedAt": "2025-04-20",
      "category": "Engineering",
      "tags": ["open-source", "javascript", "tooling"],
      "status": "published",
      "filePath": "posts/unique-post-slug.md",
      "coverImage": {
        "src": "assets/covers/unique-post-slug.jpg",
        "alt": "Descriptive alt text for the cover image"
      },
      "inlineImages": [
        {
          "placeholder": "[[IMG_1]]",
          "src": "assets/inline/diagram-arch.png",
          "alt": "Architecture diagram showing the data flow",
          "caption": "Optional caption shown below the image"
        },
        {
          "placeholder": "[[IMG_2]]",
          "src": "https://external.cdn.com/some-image.png",
          "alt": "External image example",
          "caption": ""
        }
      ],
      "readingTimeMinutes": 5
    }
  ]
}
```

### Schema Rules

| Field                        | Required           | Notes                                                                           |
| ---------------------------- | ------------------ | ------------------------------------------------------------------------------- |
| `id`                         | ✅                  | Must be URL-safe, unique, kebab-case. Used as the `?post=` query param.         |
| `title`                      | ✅                  | Plain text. No HTML.                                                            |
| `description`                | ✅                  | 1–2 sentences. Shown on listing cards.                                          |
| `author`                     | ✅                  |                                                                                 |
| `publishedAt`                | ✅                  | ISO 8601 date string `YYYY-MM-DD`.                                              |
| `updatedAt`                  | ❌                  | Optional. Show "Updated on …" if present and different from `publishedAt`.      |
| `category`                   | ✅                  | Single string. Used for filtering.                                              |
| `tags`                       | ✅                  | Array of strings. Used for filtering and display.                               |
| `status`                     | ✅                  | `"published"` or `"draft"`. Draft posts are completely hidden from the listing. |
| `filePath`                   | ✅                  | Relative to `/blog/`.                                                           |
| `coverImage.src`             | ✅                  | Relative path or absolute URL.                                                  |
| `coverImage.alt`             | ✅                  |                                                                                 |
| `inlineImages`               | ❌                  | Array. Each entry maps a placeholder string to an image.                        |
| `inlineImages[].placeholder` | ✅ if array present | Must appear verbatim inside the `.md` file. Pattern: `[[IMG_N]]`.               |
| `inlineImages[].src`         | ✅ if array present |                                                                                 |
| `inlineImages[].alt`         | ✅ if array present |                                                                                 |
| `inlineImages[].caption`     | ❌                  | Empty string if no caption.                                                     |
| `readingTimeMinutes`         | ❌                  | If omitted, calculate at render time from word count (~200 wpm).                |

---

## 4. Markdown File Format

Each post is a `.md` file inside `posts/`. Use **standard CommonMark Markdown**. Image placeholders are the only non-standard element.

```markdown
# Post Title (H1 — used as display title; should match `title` in JSON)

Opening paragraph text...

## Section Heading

More text. A paragraph with a placeholder for an image below.

[[IMG_1]]

Continued text after the image...

### Subsection

- Bullet list item one
- Bullet list item two

> A blockquote for emphasis.

```javascript
// A fenced code block
const greet = (name) => `Hello, ${name}!`;
```

Final paragraph.

```
### Inline Image Replacement Rules

1. Parse the raw Markdown text **before** passing it to the MD renderer.
2. Scan for each placeholder string (e.g., `[[IMG_1]]`) in `inlineImages`.
3. Replace each placeholder with an HTML snippet:
   ```html
   <figure class="blog-inline-figure">
     <img src="{src}" alt="{alt}" loading="lazy" />
     <figcaption>{caption}</figcaption>  <!-- omit <figcaption> if caption is empty -->
   </figure>
```

4. Then pass the result through the Markdown renderer. This means placeholders on their own line become standalone `<figure>` blocks.
5. If a placeholder in the `.md` file has **no matching entry** in `inlineImages`, leave it as-is (render as literal text) and log a warning to the browser console.

---

## 5. Markdown Parsing

You must use **[marked.js](https://cdn.jsdelivr.net/npm/marked/marked.min.js)** loaded from the jsDelivr CDN. No other Markdown library is permitted.

For syntax highlighting inside code blocks, use **[highlight.js](https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js)** with the `github-dark` theme CSS, both loaded from CDN. Initialise with `hljs.highlightAll()` after the post body is injected into the DOM.

Configure marked to:

- Enable GitHub Flavored Markdown (tables, strikethrough).
- Sanitise output — set `mangle: false`, `headerIds: false`.
- Use a custom renderer that adds `id` attributes to all headings (slug of heading text) so the table of contents can link to them.

---

## 6. Pages

### 6.1 `blog/index.html` — Listing Page

**Layout:**

- A full-width hero/header strip with the blog name and a one-line description (both configurable via a `const BLOG_CONFIG` object at the top of `blog-listing.js`).
- A sticky filter bar below the hero with:
  - A text search input (searches title, description, tags in real-time, no debounce delay needed).
  - A category dropdown (populated dynamically from `blog-index.json`).
  - A tag filter (multi-select chips, populated dynamically).
  - A "Clear filters" button.
- A responsive post card grid (2 columns on desktop, 1 on mobile).
- Each card contains: cover image, category badge, title, description (truncated to 2 lines), author, date, reading time, and tag chips.
- Clicking a card navigates to `post.html?post={id}`.
- Only `"published"` posts appear. Posts are sorted newest-first by default.
- A subtle empty state message when filters match nothing.

**Performance:** Fetch `blog-index.json` once. Cache the parsed result in a module-level variable. Do not re-fetch on filter changes.

---

### 6.2 `blog/post.html` — Reader Page

**Layout (desktop, default):**

```
[ ← Back to Blog ]   [Reader Preferences ⚙]

        ┌────────────────────────────────┐
        │         COVER IMAGE            │
        └────────────────────────────────┘

        Category  ·  Tag  ·  Tag

        # Post Title

        Author · Date · N min read

        ─────────────────────────────────

        [Post body rendered from .md]

        ─────────────────────────────────

        Tags: [tag] [tag]

        [ ← Prev Post ]    [ Next Post → ]

[ Table of Contents ]    [Post Body]       [ (reserved/empty) ]
  (sticky sidebar)         (center)
```

- The **Table of Contents** sidebar is generated automatically from all H2 and H3 headings in the post. It is sticky, scrolls with the page, and highlights the currently-visible section. Hidden on mobile (accessible via a floating TOC button).
- Post body width, alignment, font, and theme are all controlled by the Reader Preferences panel (see Section 7).
- Load the post by reading `?post={id}` from the URL, finding the matching entry in `blog-index.json`, fetching the `.md` file, running image replacement, running it through marked, then injecting the result.
- Show a loading skeleton while fetching.
- Show a clear error state if the post ID is not found or the fetch fails.

---

## 7. Reader Preferences Panel

This is the most important UX feature. It must be thorough and polished.

### Trigger

A persistent **"⚙ Reading Preferences"** button fixed to the top-right of `post.html`. Clicking it opens a slide-in panel from the right side. A semi-transparent backdrop covers the rest of the page. Clicking the backdrop or an ✕ button closes the panel.

### Preferences & Controls

| Preference            | Control Type                                             | Options / Range                                                                             | CSS Variable Affected                                                        |
| --------------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| **Theme**             | 4 icon buttons                                           | Light, Dark, Sepia, Custom                                                                  | `--blog-bg`, `--blog-text`, `--blog-muted`, `--blog-border`, `--blog-accent` |
| **Custom Theme**      | Two color pickers (visible only when Custom is selected) | Background color, Text color                                                                | Same as above                                                                |
| **Font Size**         | Slider + live px readout                                 | 14px – 24px, step 1px                                                                       | `--blog-font-size`                                                           |
| **Content Width**     | Slider + live % readout                                  | 40% – 90% of viewport, step 5%                                                              | `--blog-content-width`                                                       |
| **Text Alignment**    | 4 icon buttons                                           | Left, Center, Right, Justify                                                                | `text-align` on `.blog-post-body`                                            |
| **Font Family**       | Dropdown or button group                                 | Georgia (serif), Literata (serif), Source Sans (sans), IBM Plex Mono (mono), System Default | `--blog-font-family`                                                         |
| **Line Height**       | Slider                                                   | 1.4 – 2.0, step 0.1                                                                         | `--blog-line-height`                                                         |
| **Letter Spacing**    | Slider                                                   | 0em – 0.08em, step 0.01em                                                                   | `--blog-letter-spacing`                                                      |
| **Paragraph Spacing** | Slider                                                   | 0.5em – 2em, step 0.25em                                                                    | `--blog-paragraph-spacing` (applied as `margin-bottom` on `p`)               |
| **Show TOC**          | Toggle switch                                            | On / Off                                                                                    | Toggles `.blog-toc` visibility                                               |
| **Reset to Defaults** | Text button                                              | —                                                                                           | Resets all to defaults                                                       |

### Persistence

All preferences are stored in `localStorage` under the key `blog_reader_prefs` as a JSON object. On every page load, preferences are read from `localStorage` and applied **before** the post body is injected (to prevent flash of unstyled content). CSS variables are applied to `document.documentElement` (`:root`).

### Preloaded Fonts

All custom fonts must be loaded via Google Fonts CDN in `post.html`'s `<head>`. Swap display strategy: `&display=swap`.

### Theme Definitions

| Theme  | `--blog-bg` | `--blog-text` | `--blog-muted`                             | `--blog-border`                        | `--blog-accent` |
| ------ | ----------- | ------------- | ------------------------------------------ | -------------------------------------- | --------------- |
| Light  | `#ffffff`   | `#1a1a1a`     | `#6b7280`                                  | `#e5e7eb`                              | `#2563eb`       |
| Dark   | `#0f1117`   | `#e8eaf0`     | `#9ca3af`                                  | `#2d2f3a`                              | `#60a5fa`       |
| Sepia  | `#f5f0e8`   | `#3b2f1e`     | `#8a7560`                                  | `#d6c9b4`                              | `#b05a2f`       |
| Custom | user-picked | user-picked   | auto-derived (muted = text at 60% opacity) | auto-derived (border = mix of bg+text) | `#2563eb`       |

---

## 8. `blog-creation-instructions.md` — Author / AI Guide

Create this file at `blog/blog-creation-instructions.md`. It must be a standalone, human-readable, AI-parseable guide. Write it with the following sections (use this as the exact content structure — expand each section with full detail):

```markdown
# Blog Creation Instructions

## Overview
[Explain the serverless architecture in 3–4 sentences.]

## Step-by-Step: Adding a New Blog Post

### Step 1 — Create the Markdown File
- File location: `blog/posts/your-post-slug.md`
- Naming convention: lowercase, hyphenated, no special characters. Example: `getting-started-with-dotai.md`
- The slug (filename without `.md`) becomes the post ID and the URL parameter.
- Start with a single H1 (`# Title`) that matches the `title` field in `blog-index.json`.
- For each image you want inside the post, add a placeholder on its own line: `[[IMG_1]]`, `[[IMG_2]]`, etc. The numbering must start at 1 and be sequential.

### Step 2 — Add Images (if any)
- Cover image: place in `blog/assets/covers/`. Name it `{slug}.jpg` or `{slug}.png`.
- Inline images: place in `blog/assets/inline/`. Name them descriptively.
- External image URLs are also accepted in `inlineImages[].src`.

### Step 3 — Register the Post in `blog-index.json`
[Provide the full JSON snippet template an author should copy-paste and fill in. Include every field from Section 3 with example values and comments.]

### Step 4 — Verify
- Open `blog/index.html` locally (use a local server: `npx serve .` or VS Code Live Server).
- Confirm the post card appears.
- Click through to `post.html?post={your-slug}`.
- Confirm the cover image loads, the body renders, inline images replace placeholders, and the TOC generates correctly.

### Step 5 — Commit & Push
```

git add blog/posts/your-post-slug.md
git add blog/assets/
git add blog/blog-index.json
git commit -m "blog: add post — Your Post Title"
git push origin main

```
## Markdown Cheatsheet for Posts
[Full cheatsheet: headings H1–H4, bold, italic, inline code, fenced code blocks with language, blockquotes, unordered/ordered lists, horizontal rules, links, and the `[[IMG_N]]` placeholder syntax.]

## Image Placeholder Rules
[Restate Section 4's rules in plain language for a non-technical author.]

## Tips for AI-Generated Posts
[Instruct an AI agent: what to output (the .md content), what fields to fill in the JSON, how to pick a slug, how to choose tags and category, how to write an alt text for each image, and how to estimate reading time.]

## Status: Draft vs Published
[Explain that `"status": "draft"` hides a post completely. Use it for WIP posts.]

## Updating an Existing Post
[Explain: edit the `.md` file and/or the JSON entry, update `updatedAt`, commit and push.]
```

---

## 9. Design & Styling Requirements

### Philosophy

The blog must be **reader-first**. Every design decision must serve reading comfort. No decorative clutter. Typography is the primary design element.

### CSS Architecture

- All styles live in `blog/css/blog.css`. 
- Use CSS custom properties (variables) exclusively for all colors, typography, and spacing values — never hardcode values inline or in media queries.
- The stylesheet must be completely isolated from the host site. Use `.blog-*` BEM-style class prefixes throughout to avoid any conflicts.
- Use `@import url(...)` for Google Fonts at the top of `blog.css`.

### Typography Scale (defaults)

```css
:root {
  --blog-font-size: 18px;
  --blog-font-family: 'Literata', Georgia, serif;
  --blog-line-height: 1.75;
  --blog-letter-spacing: 0em;
  --blog-paragraph-spacing: 1.25em;
  --blog-content-width: 68%;
  --blog-heading-font: 'Fraunces', serif;  /* display font for headings */
}
```

### Post Body Typographic Styles (inside `.blog-post-body`)

- `p`: `margin-bottom: var(--blog-paragraph-spacing)`, `max-width: 75ch` (prevents ultra-wide lines even if content-width is wide).
- `h1`: `font-size: 2.4em`, `font-family: var(--blog-heading-font)`, `font-weight: 700`, `letter-spacing: -0.02em`, `line-height: 1.2`.
- `h2`: `font-size: 1.6em`, same font, weight 600, `margin-top: 2.5em`.
- `h3`: `font-size: 1.2em`, same font, weight 600, `margin-top: 2em`.
- `blockquote`: left border `4px solid var(--blog-accent)`, `padding-left: 1.25em`, italic, muted text color.
- `code` (inline): monospace, `background: var(--blog-border)`, `padding: 0.1em 0.3em`, `border-radius: 3px`.
- `pre` (block): `overflow-x: auto`, `border-radius: 8px`, use highlight.js theme for colors.
- `img`: `max-width: 100%`, `border-radius: 6px`, `margin: 1.5em auto`, `display: block`.
- `figure.blog-inline-figure`: `margin: 2em 0`, centered.
- `figcaption`: small, muted, centered, italic, `margin-top: 0.5em`.
- `a`: `color: var(--blog-accent)`, underline on hover only.
- `hr`: `border: none`, `border-top: 2px solid var(--blog-border)`, `margin: 2.5em 0`.

### Responsive Breakpoints

- `> 1200px`: Two-column layout (TOC sidebar + post body).
- `768px – 1200px`: Single column, TOC hidden, floating TOC button visible.
- `< 768px`: Single column, content width forced to 95%, all preference sliders still functional.

### Card Design (listing page)

- Subtle shadow, smooth `transform: translateY` hover lift.
- Cover image has a fixed aspect ratio (`aspect-ratio: 16/9`), `object-fit: cover`.
- Category badge: small, uppercase, accent color background.
- Description: `-webkit-line-clamp: 2` truncation.

---

## 10. Routing

Both pages use **query-string routing** — no hash routing, no SPA framework.

- `blog/index.html`: no query params needed. All filtering is in-memory.
- `blog/post.html?post={id}`: reads `id` via `new URLSearchParams(window.location.search).get('post')`.
- Prev/Next navigation is determined by the post's position in the `posts` array in `blog-index.json` (among published posts, sorted by `publishedAt` ascending).

---

## 11. Error & Loading States

### Loading State

While fetching JSON or Markdown, show a **skeleton loader** that mirrors the layout of the actual content (not a spinner). Use CSS animation (`@keyframes shimmer`) with a gradient sweep. The skeleton must match:

- Listing page: 4–6 card-shaped skeletons.
- Post page: A cover image rectangle, title block, author line, and several paragraph bars.

### Error States

- **Post not found** (`id` not in JSON): Show a friendly message with a "← Back to Blog" link.
- **Markdown fetch failed** (network error or 404): Show a message explaining the post couldn't be loaded, with a retry button (`window.location.reload()`).
- **JSON fetch failed**: Show a site-level error message on the listing page.

---

## 12. Accessibility Requirements

- All interactive elements (buttons, sliders, dropdowns) must have visible focus rings.
- Reader preference panel must be keyboard-navigable (Tab order logical, Escape key closes it).
- All images must have `alt` attributes (sourced from `blog-index.json`).
- Use semantic HTML throughout: `<article>`, `<header>`, `<nav>`, `<aside>`, `<figure>`, `<figcaption>`, `<main>`, `<time datetime="...">`.
- Color contrast must meet WCAG AA for all four themes.
- TOC links must be `aria-label`ed.

---

## 13. Performance Requirements

- All external resources (marked.js, highlight.js, Google Fonts) are loaded from CDN with `crossorigin="anonymous"`.
- Fonts in `<head>` must use `rel="preload"` for the two primary fonts.
- All post images use `loading="lazy"`.
- Cover images on the listing page use `loading="lazy"`.
- No JavaScript framework. No npm. No build step. The entire system works by opening `index.html` with a local HTTP server or deploying as-is to GitHub Pages.

---

## 14. Configuration Object

At the top of `blog-listing.js`, define:

```javascript
const BLOG_CONFIG = {
  blogName: "The Blog",               // Shown in listing hero
  blogTagline: "Thoughts on building things.", // Shown in listing hero
  indexPath: "blog-index.json",       // Path to JSON, relative to blog/
  postsPerPage: 0,                    // 0 = no pagination, show all
  dateLocale: "en-US",                // For date formatting
  dateFormat: { year: "numeric", month: "long", day: "numeric" }
};
```

This object is the only place authors need to touch for basic site configuration. Document it clearly with comments.

---

## 15. Deliverables Checklist

Before considering this task complete, verify every item:

- [ ] `blog/index.html` renders the listing correctly from `blog-index.json`
- [ ] `blog/post.html` loads and renders a post from its `.md` file
- [ ] Inline image placeholder replacement works (`[[IMG_N]]` → `<figure>`)
- [ ] Reader Preferences panel opens, all controls work, CSS variables update live
- [ ] All preferences persist across page reloads via `localStorage`
- [ ] All four themes (Light, Dark, Sepia, Custom) render correctly
- [ ] Custom color pickers work and derive muted/border colors automatically
- [ ] Table of Contents generates from headings, is sticky, highlights active section
- [ ] Prev/Next post navigation works
- [ ] Category and tag filters work on listing page
- [ ] Text search works on listing page
- [ ] Skeleton loaders show while content is fetching
- [ ] Error states display correctly for missing post and network failure
- [ ] `blog-creation-instructions.md` is complete and self-contained
- [ ] `example-post.md` and a corresponding `blog-index.json` entry exist as a working demo
- [ ] All styles are scoped to `.blog-*` classes — zero conflicts with host site
- [ ] No JavaScript errors in the browser console on either page
- [ ] Responsive layout works on mobile (375px), tablet (768px), desktop (1440px)
- [ ] All images have `alt` attributes
- [ ] Semantic HTML used throughout
- [ ] `BLOG_CONFIG` object is at the top of `blog-listing.js` and documented

---

## 16. What NOT to Do

- ❌ Do not install npm packages or create a `package.json`.
- ❌ Do not use React, Vue, Svelte, or any framework.
- ❌ Do not use a bundler (Webpack, Vite, Rollup, Parcel).
- ❌ Do not use TypeScript.
- ❌ Do not use a CSS preprocessor (Sass, Less).
- ❌ Do not use `document.write()`.
- ❌ Do not use `innerHTML` for untrusted content without sanitisation — marked.js output is controlled content (from your own repo), which is acceptable, but flag this in a code comment.
- ❌ Do not hardcode post data inside JavaScript — always read from `blog-index.json`.
- ❌ Do not touch any files outside the `blog/` directory except to insert the nav link.
- ❌ Do not use `alert()` or `confirm()` for any UI.
- ❌ Do not block the main thread — all fetches are `async/await`.

---

*End of master prompt.*
