<!-- AUTO-GENERATED: safe to edit, do not delete header -->
# Gotchas & Edge Cases

> Things that are NOT obvious from reading the code.
> Added by: dotai scanner, AI agents (/learn command), and humans.

## Brand: Never use saturated/vibrant colors
**Found in**: `index.html` `:root`, `.ai/contexts/brand_guideline.md`
**Symptom**: Off-brand look; violates brand guidelines explicitly.
**Rule**: Steel Teal `#7EA6A8` is the ONLY accent color allowed for interactive/highlight UI elements. Never introduce `#000000` pure black — use `#1A1A1A`. Never add gradients, neon, glassmorphism, or vibrant hues.

## Brand: Logo wordmark weight split is sacred
**Found in**: `index.html:96–97`
**Symptom**: Brand identity breaks if both spans use the same font-weight.
**Rule**: `.logo .nbs` must always be `font-weight: 800`, `.logo .labs` must always be `font-weight: 200`. Never alter this split, add shadows, or use uppercase.

## No build toolchain — edit index.html directly
**Found in**: repo root
**Symptom**: Running `npm install` or looking for `src/` will find nothing — there is no build step.
**Rule**: The site is a single `index.html` with inline CSS and JS, deployed directly via GitHub Pages. Do not introduce a bundler, framework, or node_modules without explicit user approval.

## All CSS lives inline in index.html
**Found in**: `index.html` `<style>` block
**Symptom**: Editing a separate `.css` file will have no effect — it doesn't exist.
**Rule**: All styles are in the `<style>` tag of `index.html`. There is no external stylesheet.

## No external JS libraries
**Found in**: `index.html`
**Symptom**: Font Awesome icons from the old site are gone — current site has no icon library.
**Rule**: The redesigned site uses emoji for icons, not Font Awesome or Lucide. If adding icons, use emoji or inline SVG to avoid adding CDN dependencies.

## dotai supported tools list (v3.0.0)
**Found in**: `index.html` OSS section, `README.md`
**Symptom**: Adding Cursor/Windsurf to the supported tools list would be incorrect for v3.0.0.
**Rule**: dotai v3.0.0 supports only: Claude Code, Gemini CLI, Antigravity, GitHub Copilot. GitHub link is `https://github.com/nbslabs/dotai-cli` (not `/nbslabs`).

## Sponsor card links to /contact, not mailto
**Found in**: `index.html` `#involve` section
**Symptom**: Using `mailto:` for the Sponsor card was the previous state — now incorrect.
**Rule**: The Sponsor "Get in touch" link points to `/contact` (internal page), not `mailto:`.

## Mobile nav requires `.open` class on `#navLinks`
**Found in**: `index.html` hamburger JS + CSS
**Symptom**: Nav links invisible on mobile unless `.open` is toggled; hamburger JS handles this.
**Rule**: Never hide `.nav-links` with `display:none` unconditionally — the CSS breakpoint at 768px hides it by default, and JS adds `.open` to show it. Restructuring either will break mobile nav.

## Roadmap section was intentionally removed
**Found in**: conversation history
**Symptom**: Re-adding `#roadmap` section or its nav link would reintroduce content the user explicitly removed.
**Rule**: There is no roadmap section. Do not add it back unless explicitly requested.
