<!-- AUTO-GENERATED: safe to edit, do not delete header -->
# Code Patterns

> Recurring patterns discovered in this codebase.
> Added by: dotai scanner, AI agents (/learn command), and humans.

## Design Token CSS Custom Properties
**Where used**: `index.html:18–41`, applied throughout all CSS rules
**Description**: All colors, fonts, spacing, radii, and shadows are declared as `--var-name` in `:root`. Never hardcode hex values or pixel values that have a token — always reference the token.
**Example**:
```css
/* correct */
border: 1px solid var(--color-border);
/* wrong */
border: 1px solid #E8E8E8;
```

## Section Shell Pattern
**Where used**: Every content section in `index.html`
**Description**: Every `<section>` has `padding: 96px 80px`, contains a single `.section-inner` div with `max-width: 1200px; margin: 0 auto`, and opens with a `.section-header` block (label → heading → subtext). Alternate section backgrounds between `--color-surface` (#FFF) and `--color-background` (#F2F2F2).
**Example**:
```html
<section id="foo">
  <div class="section-inner">
    <div class="section-header">
      <p class="section-label">Label text</p>
      <h2 class="section-heading">Heading</h2>
      <p class="section-subtext">Description...</p>
    </div>
    <!-- content grid -->
  </div>
</section>
```

## Card Hover Lift
**Where used**: `.program-card`, `.audience-card`, `.involve-card`, `.stat-card`, `.oss-project-item`
**Description**: Cards lift on hover with `transform: translateY(-4px)` + `box-shadow: var(--shadow-md)`. Transition is always `0.2s`. Program cards additionally animate a top border via `::after` pseudo-element scaling from `scaleX(0)` to `scaleX(1)`.

## Scroll Reveal via IntersectionObserver
**Where used**: All `.reveal` elements, JS at bottom of `index.html`
**Description**: Elements start `opacity: 0; transform: translateY(24px)` and transition to visible when they enter the viewport. The observer uses `threshold: 0.1` and `rootMargin: '0px 0px -48px 0px'`. Once revealed, the observer unobserves the element (fires once only).

## Mobile Nav Toggle
**Where used**: `#hamburger`, `#navLinks`, CSS `@media (max-width: 768px)`
**Description**: At ≤768px, `.nav-links` is `display: none` by default. Clicking `#hamburger` toggles class `.open` on `#navLinks`, which switches it to `display: flex; flex-direction: column` in an absolute dropdown. All nav link clicks also close the menu.

## Alternating Section Backgrounds
**Where used**: All sections in `index.html`
**Description**: Sections alternate `background: var(--color-surface)` (white) and `background: var(--color-background)` (off-white `#F2F2F2`). The hero uses `radial-gradient(ellipse at center, #FFFFFF 40%, #EBEBEB 100%)`. The mission section uses `--color-primary` (dark) as background with inverted text. Footer uses `--color-accent-dark`.

## Brand Wordmark Split
**Where used**: `<nav>` logo, `<footer>` logo
**Description**: The nbslabs wordmark always renders as two `<span>` elements — `.nbs` at `font-weight: 800` and `.labs` at `font-weight: 200`, both Nunito, both `--color-primary` on light backgrounds, white on dark backgrounds.
```html
<span class="nbs">nbs</span><span class="labs">labs</span>
```

## Button Variants
**Where used**: Hero CTAs, OSS section, involve cards
**Description**: Three button classes exist — `.btn-primary` (dark fill), `.btn-outline` (border only), `.btn-accent` (Steel Teal fill). All share `padding: 10–11px 26px`, `border-radius: var(--radius-sm)`, `font-weight: 600`, `font-size: 0.9rem`. Hover always darkens: primary→`#3D3D3D`, accent→`#4A7A7D`, outline→`#E8E8E8` bg.

## Section Label Uppercase Caps
**Where used**: All `.section-label` elements
**Description**: Section eyebrow labels use `font-size: 0.72rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-accent-dark)`. This is the ONLY place uppercase text appears — never apply uppercase to headings or body copy.
