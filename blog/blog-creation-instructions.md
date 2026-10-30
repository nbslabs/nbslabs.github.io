# Blog Creation Instructions

## Overview

The nbslabs blog is a **fully serverless, static blog system** that runs entirely in the browser. There is no backend, no build step, no framework. Blog posts are authored as **Markdown files** committed directly to the repository. A hand-maintained `blog-index.json` file acts as the single source of truth for post metadata. Rendering, routing, and all UI logic happen entirely client-side at runtime using vanilla JavaScript, [marked.js](https://cdn.jsdelivr.net/npm/marked/marked.min.js) for Markdown parsing, and [highlight.js](https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js) for code syntax highlighting.

---

## Step-by-Step: Adding a New Blog Post

### Step 1 — Create the Markdown File

- **File location**: `blog/posts/your-post-slug.md`
- **Naming convention**: lowercase, hyphenated, no special characters.
  - ✅ `getting-started-with-dotai.md`
  - ✅ `why-open-source-matters.md`
  - ❌ `My Blog Post!.md`
  - ❌ `post_2024_new.md`
- The slug (filename without `.md`) becomes the **post ID** and the **URL parameter** (`post.html?post=your-post-slug`).
- Start with a single **H1** (`# Title`) that matches the `title` field in `blog-index.json`.
- For each image you want **inside** the post body, add a placeholder on its own line:
  ```
  [[IMG_1]]
  [[IMG_2]]
  ```
  The numbering must start at 1 and be sequential.

### Step 2 — Add Images (if any)

- **Cover image**: place in `blog/assets/covers/`. Name it `{slug}.jpg` or `{slug}.png`.
  - Example: `blog/assets/covers/getting-started-with-dotai.png`
- **Inline images**: place in `blog/assets/inline/`. Name them descriptively.
  - Example: `blog/assets/inline/dotai-architecture-diagram.png`
- **External image URLs** are also accepted in `inlineImages[].src` — you can use any public URL.

### Step 3 — Register the Post in `blog-index.json`

Open `blog/blog-index.json` and add a new entry to the `posts` array. Copy-paste this template and fill in your values:

```json
{
  "id": "your-post-slug",
  "title": "Your Post Title Here",
  "description": "One or two sentences that summarize the post. Shown on the listing card.",
  "author": "Your Name",
  "publishedAt": "2026-04-18",
  "updatedAt": "",
  "category": "Engineering",
  "tags": ["topic-one", "topic-two", "topic-three"],
  "status": "published",
  "filePath": "posts/your-post-slug.md",
  "coverImage": {
    "src": "assets/covers/your-post-slug.png",
    "alt": "Descriptive alt text for the cover image"
  },
  "inlineImages": [
    {
      "placeholder": "[[IMG_1]]",
      "src": "assets/inline/your-image-name.png",
      "alt": "Descriptive alt text for this inline image",
      "caption": "Optional caption shown below the image"
    }
  ],
  "readingTimeMinutes": 5
}
```

**Field reference:**

| Field | Required | Notes |
|-------|----------|-------|
| `id` | ✅ | URL-safe, unique, kebab-case. Must match the filename (without `.md`). |
| `title` | ✅ | Plain text. Should match the H1 in your `.md` file. |
| `description` | ✅ | 1–2 sentences for the listing card. |
| `author` | ✅ | Author name. |
| `publishedAt` | ✅ | ISO 8601 date: `YYYY-MM-DD`. |
| `updatedAt` | ❌ | Set when updating a post. Leave empty (`""`) for new posts. |
| `category` | ✅ | Single string (e.g., "Engineering", "Community", "Tutorial"). |
| `tags` | ✅ | Array of lowercase strings. Used for filtering. |
| `status` | ✅ | `"published"` or `"draft"`. Drafts are completely hidden. |
| `filePath` | ✅ | Relative to `blog/`. Always `"posts/{slug}.md"`. |
| `coverImage.src` | ✅ | Path relative to `blog/` or absolute URL. |
| `coverImage.alt` | ✅ | Descriptive alt text for accessibility. |
| `inlineImages` | ❌ | Array. Omit or use `[]` if no inline images. |
| `readingTimeMinutes` | ❌ | If omitted, calculated automatically (~200 wpm). |

### Step 4 — Verify

1. Start a local server:
   ```bash
   npx serve .
   ```
   Or use VS Code Live Server, or `python -m http.server`.

2. Open `http://localhost:3000/blog/` (or your local port).
3. Confirm the post card appears on the listing page.
4. Click through to `post.html?post={your-slug}`.
5. Verify:
   - Cover image loads
   - Body text renders correctly
   - Inline images replace `[[IMG_N]]` placeholders
   - Table of Contents generates from H2/H3 headings
   - Code blocks have syntax highlighting

### Step 5 — Commit & Push

```bash
git add blog/posts/your-post-slug.md
git add blog/assets/
git add blog/blog-index.json
git commit -m "blog: add post — Your Post Title"
git push origin main
```

GitHub Pages will auto-deploy from the `main` branch.

---

## Markdown Cheatsheet for Posts

```markdown
# H1 — Post Title (one per post, at the very top)

## H2 — Major Section Heading

### H3 — Subsection Heading

#### H4 — Minor Heading

**Bold text** and *italic text* and ***bold italic***.

`inline code` for short code references.

> Blockquote for emphasis or callouts.

- Unordered list item one
- Unordered list item two
  - Nested item

1. Ordered list item one
2. Ordered list item two

---

Horizontal rule (visual separator).

[Link text](https://example.com)

[[IMG_1]]

```javascript
// Fenced code block with language
const greeting = (name) => `Hello, ${name}!`;
```
```

---

## Image Placeholder Rules

1. In your `.md` file, place `[[IMG_1]]`, `[[IMG_2]]`, etc. **on their own line** where you want the image to appear.
2. Number placeholders starting from 1, sequentially: `[[IMG_1]]`, `[[IMG_2]]`, `[[IMG_3]]`.
3. Each placeholder must have a matching entry in `inlineImages` inside `blog-index.json`.
4. If a placeholder has no match, it will show as literal text `[[IMG_1]]` in the rendered post (and a warning appears in the browser console).
5. Each `inlineImages` entry needs:
   - `placeholder`: the exact string, e.g. `"[[IMG_1]]"`
   - `src`: path to the image (relative to `blog/`) or an external URL
   - `alt`: descriptive alt text (required for accessibility)
   - `caption`: text shown below the image (use `""` for no caption)

---

## Tips for AI-Generated Posts

If you're using an AI agent to create blog posts:

1. **Output the `.md` content** as a complete Markdown file starting with `# Title`.
2. **Fill in all JSON fields** in `blog-index.json` — don't leave any required field empty.
3. **Pick a slug** that is concise, descriptive, and URL-safe: `building-ai-workflows`, not `my-thoughts-on-various-topics-regarding-ai`.
4. **Choose tags** from existing tags when possible, or create new lowercase kebab-case tags.
5. **Choose a category** that fits the content: "Engineering", "Community", "Tutorial", "Announcement", etc.
6. **Write alt text** for every image — describe what the image shows, not what it is (`"Architecture diagram showing data flow between frontend and API"`, not `"diagram.png"`).
7. **Estimate reading time** at ~200 words per minute, or omit `readingTimeMinutes` to let the system calculate it.

---

## Status: Draft vs Published

- `"status": "published"` — the post is visible on the listing page and accessible via its URL.
- `"status": "draft"` — the post is **completely hidden**. It won't appear on the listing page or in any filter results. Use this for work-in-progress posts.

To publish a draft, change `"status": "draft"` to `"status": "published"`, commit, and push.

---

## Updating an Existing Post

1. Edit the `.md` file in `blog/posts/`.
2. Update the `blog-index.json` entry if the title, description, tags, or images changed.
3. Set the `updatedAt` field to today's date (`YYYY-MM-DD`). The post will display "Updated on …" below the author line.
4. Commit and push.

```bash
git add blog/posts/your-post-slug.md blog/blog-index.json
git commit -m "blog: update — Your Post Title"
git push origin main
```
