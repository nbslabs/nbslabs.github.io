# nbslabs Brand Guidelines

> **Version:** 1.0  
> **Last Updated:** April 2026  
> **Website:** www.nbslabs.dev

---

## 1. Brand Identity Overview

**nbslabs** is a developer-focused tech brand from Bangladesh, positioned around open-source collaboration, AI-powered tooling, and community mentorship. The brand communicates **precision, minimalism, and quiet confidence** — built for engineers who value substance over noise.

**Brand Personality:**
- Clean & Minimal
- Technical yet Approachable
- Modern & Forward-thinking
- Community-driven

**Tagline Direction:** *Empowering Developers in Bangladesh*

---

## 2. Logo

### 2.1 Primary Logo

The logo is a **wordmark** — lowercase `nbslabs` — using a deliberate weight contrast:

| Part | Style | Weight |
|------|-------|--------|
| `nbs` | Bold / Black | `font-weight: 800–900` |
| `labs` | Thin / Light | `font-weight: 200–300` |

This bold-thin pairing is the **core visual identity** of the brand and must be preserved in all logo usages.

### 2.2 Logo Rules

- **Do NOT** alter the weight split between `nbs` and `labs`
- **Do NOT** add outlines, shadows, or gradients to the logo
- **Do NOT** use all-caps or mixed-case
- **Do NOT** stretch or distort proportions
- Always maintain adequate clear space (minimum: half the logo height on all sides)

### 2.3 Logo Variants

| Variant | Use Case |
|---------|----------|
| Dark on Light (primary) | Web, print, light backgrounds |
| White on Dark | Dark backgrounds, dark mode |
| Monochrome Black | Emboss, embroidery, single-color print |

---

## 3. Color Palette

### 3.1 Primary Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Charcoal Black** | `#1A1A1A` | `26, 26, 26` | Logo, primary text, headers |
| **Off-White / Mist** | `#F2F2F2` | `242, 242, 242` | Primary background, canvas |
| **Pure White** | `#FFFFFF` | `255, 255, 255` | Cards, content surfaces |

### 3.2 Secondary / Accent Colors

Derived from the banner's decorative geometric and skyline illustrations:

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Steel Teal** | `#7EA6A8` | `126, 166, 168` | Accent lines, icons, highlights |
| **Slate Blue-Gray** | `#8FA8B2` | `143, 168, 178` | Graph nodes, subtle UI elements |
| **Muted Aqua** | `#A8C4C6` | `168, 196, 198` | Hover states, borders, tags |
| **Deep Teal** | `#4A7A7D` | `74, 122, 125` | Footer bar, strong accents |

### 3.3 Neutral / Supporting Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Light Gray** | `#E8E8E8` | `232, 232, 232` | Dividers, subtle borders |
| **Mid Gray** | `#9E9E9E` | `158, 158, 158` | Placeholder text, secondary text |
| **Dark Gray** | `#3D3D3D` | `61, 61, 61` | Body text on light backgrounds |

### 3.4 Background Gradient

The brand background uses a very subtle radial/vignette gradient:

```css
background: radial-gradient(ellipse at center, #FFFFFF 40%, #EBEBEB 100%);
```

This creates the soft, professional studio feel seen in the logo lockup.

### 3.5 Color Usage Rules

- **Never** use saturated or vibrant colors as primary elements — the brand is deliberately desaturated and calm
- Steel Teal (`#7EA6A8`) is the **only** accent color allowed for interactive/highlight UI elements
- Text on light backgrounds must be `#1A1A1A` or `#3D3D3D` — never pure black `#000000`
- Dark backgrounds use white (`#FFFFFF`) text at full opacity

---

## 4. Typography

### 4.1 Primary Typeface — Wordmark

The logo wordmark uses a **geometric sans-serif** typeface with the following characteristics:
- Very rounded terminals (especially visible in `b`, `s`, `a`)
- Open apertures
- Near-zero stroke contrast

**Closest matching free/web fonts:**

| Priority | Font | Source |
|----------|------|--------|
| 1st choice | **Nunito** | Google Fonts |
| 2nd choice | **Poppins** | Google Fonts |
| 3rd choice | **DM Sans** | Google Fonts |

> If exact logo font is identified or licensed separately, it takes precedence over the above.

### 4.2 Type Scale & Weights

| Role | Font | Weight | Size (Desktop) | Size (Mobile) |
|------|------|--------|----------------|---------------|
| Logo — `nbs` | Nunito | 800 (ExtraBold) | — | — |
| Logo — `labs` | Nunito | 200 (ExtraLight) | — | — |
| Display / Hero | Nunito | 700 (Bold) | 48–64px | 32–40px |
| Section Heading | Nunito | 600 (SemiBold) | 28–36px | 22–28px |
| Sub-heading | Nunito | 500 (Medium) | 20–24px | 16–20px |
| Body Text | Nunito | 400 (Regular) | 15–17px | 14–16px |
| Caption / Label | Nunito | 300 (Light) | 12–13px | 11–12px |
| Code / Mono | **JetBrains Mono** | 400 | 14px | 13px |

### 4.3 Typography Rules

- All headings: **UPPERCASE only for section labels** (e.g., `EMPOWERING DEVELOPERS IN BANGLADESH`), not general headings
- Letter-spacing for uppercase labels: `0.08em` to `0.12em`
- Line height: `1.5` for body, `1.2` for display headings
- Paragraph max-width: `680px` for readability
- **Do NOT** mix more than 2 typefaces — Nunito + JetBrains Mono is the only permitted pair

### 4.4 Google Fonts Import

```css
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@200;300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
```

---

## 5. Iconography & Illustration Style

### 5.1 Icon Style

Derived from the banner's icon set:

- **Style:** Line/outline icons with minimal fill
- **Stroke weight:** 1.5–2px
- **Corner radius:** Slightly rounded (2–4px)
- **Color:** Steel Teal `#7EA6A8` or Charcoal Black `#1A1A1A`
- **Recommended library:** Lucide Icons, Phosphor Icons (outline variant)

### 5.2 Illustration / Decorative Graphics

The brand uses **geometric network/node illustrations** as background decoration:

- Thin connecting lines between dot nodes
- Low-opacity overlay (10–20%) over the background
- Color: Steel Teal or Slate Blue-Gray tones
- Style: Abstract, tech-inspired, not figurative

**Skyline / Architecture motifs** (Bangladesh-specific):
- Flat, outline-only style
- Single color: `#A8C4C6` or similar muted teal at 30–50% opacity
- Used as large background silhouettes, never as primary foreground content

### 5.3 Illustration Rules

- Keep decorative elements at **low opacity** — they should never compete with text
- No photography or realistic imagery in brand materials (brand is illustration-first)
- Maintain the geometric, tech-aesthetic language throughout

---

## 6. Spacing & Layout

### 6.1 Grid

| Context | Columns | Gutter | Margin |
|---------|---------|--------|--------|
| Desktop (1280px+) | 12 | 24px | 80px |
| Tablet (768–1279px) | 8 | 20px | 40px |
| Mobile (< 768px) | 4 | 16px | 20px |

### 6.2 Spacing Scale (8px base unit)

```
4px   — xs (micro gaps, icon padding)
8px   — sm (tight spacing)
16px  — md (default element spacing)
24px  — lg (section sub-spacing)
40px  — xl (between components)
64px  — 2xl (section separators)
96px  — 3xl (page-level sections)
```

### 6.3 Border Radius

| Element | Radius |
|---------|--------|
| Buttons | `6px` |
| Cards | `10px` |
| Tags / Pills | `999px` (full round) |
| Modals | `12px` |
| Input fields | `6px` |

---

## 7. UI Component Styling

### 7.1 Buttons

**Primary Button**
```css
background: #1A1A1A;
color: #FFFFFF;
font-family: 'Nunito', sans-serif;
font-weight: 600;
font-size: 14px;
letter-spacing: 0.04em;
padding: 10px 24px;
border-radius: 6px;
border: none;
transition: background 0.2s ease;

/* Hover */
background: #3D3D3D;
```

**Secondary / Outline Button**
```css
background: transparent;
color: #1A1A1A;
border: 1.5px solid #1A1A1A;
font-weight: 600;
padding: 10px 24px;
border-radius: 6px;

/* Hover */
background: #F2F2F2;
```

**Accent Button**
```css
background: #7EA6A8;
color: #FFFFFF;
font-weight: 600;
padding: 10px 24px;
border-radius: 6px;
```

### 7.2 Cards

```css
background: #FFFFFF;
border: 1px solid #E8E8E8;
border-radius: 10px;
padding: 24px;
box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
```

### 7.3 Links

```css
color: #4A7A7D;
text-decoration: none;
font-weight: 500;

/* Hover */
text-decoration: underline;
color: #7EA6A8;
```

### 7.4 Code Blocks

```css
font-family: 'JetBrains Mono', monospace;
font-size: 13px;
background: #F2F2F2;
border: 1px solid #E8E8E8;
border-radius: 6px;
padding: 16px;
color: #1A1A1A;
line-height: 1.6;
```

---

## 8. Brand Voice & Messaging

| Attribute | Description |
|-----------|-------------|
| **Tone** | Direct, technical, encouraging — no fluff |
| **Language** | English primary; Bengali secondary for community content |
| **Audience** | Developers, CS students, engineers in Bangladesh |
| **Avoid** | Jargon overload, hype language, corporate-speak |
| **Prefer** | Concrete, specific, practical language |

**Pillar Messages:**
1. AI-Powered Workshops
2. Open-Source Collaboration
3. Community Mentorship

**CTA Style:** Action-first — e.g., "Join the Community", "Explore Projects", "Start Building"

---

## 9. Social Media & Banner Specs

| Platform | Dimension | Format |
|----------|-----------|--------|
| Facebook Cover | 1702 × 630px | PNG/JPG |
| LinkedIn Banner | 1584 × 396px | PNG/JPG |
| Twitter/X Header | 1500 × 500px | PNG/JPG |
| Profile Picture | 1080 × 1080px | PNG |
| GitHub Social Preview | 1280 × 640px | PNG |
| npm / Open-source Banner | 1280 × 400px | PNG |

**Banner Design Language (from reference image):**
- Background: Off-white gradient (`#F2F2F2` → `#FFFFFF`)
- Left zone: Decorative geometric/skyline illustration (30% opacity)
- Center: Logo wordmark (large)
- Right zone: Key value propositions with icons
- Bottom strip: Deep Teal `#4A7A7D` for website URL / footer element
- Corner accents: Network node illustrations (Steel Teal, 15% opacity)

---

## 10. CSS Design Tokens (Reference)

```css
:root {
  /* Brand Colors */
  --color-primary:        #1A1A1A;
  --color-background:     #F2F2F2;
  --color-surface:        #FFFFFF;
  --color-accent:         #7EA6A8;
  --color-accent-dark:    #4A7A7D;
  --color-accent-light:   #A8C4C6;
  --color-secondary:      #8FA8B2;

  /* Neutrals */
  --color-text-primary:   #1A1A1A;
  --color-text-secondary: #3D3D3D;
  --color-text-muted:     #9E9E9E;
  --color-border:         #E8E8E8;
  --color-border-dark:    #CCCCCC;

  /* Typography */
  --font-sans:            'Nunito', sans-serif;
  --font-mono:            'JetBrains Mono', monospace;

  --font-size-xs:         12px;
  --font-size-sm:         14px;
  --font-size-md:         16px;
  --font-size-lg:         20px;
  --font-size-xl:         24px;
  --font-size-2xl:        32px;
  --font-size-3xl:        48px;

  --font-weight-light:    300;
  --font-weight-regular:  400;
  --font-weight-medium:   500;
  --font-weight-semibold: 600;
  --font-weight-bold:     700;
  --font-weight-extrabold:800;

  --line-height-tight:    1.2;
  --line-height-normal:   1.5;
  --line-height-relaxed:  1.75;

  /* Spacing */
  --space-xs:   4px;
  --space-sm:   8px;
  --space-md:   16px;
  --space-lg:   24px;
  --space-xl:   40px;
  --space-2xl:  64px;
  --space-3xl:  96px;

  /* Radius */
  --radius-sm:  6px;
  --radius-md:  10px;
  --radius-lg:  12px;
  --radius-full: 999px;

  /* Shadows */
  --shadow-sm:  0 1px 4px rgba(0, 0, 0, 0.06);
  --shadow-md:  0 2px 12px rgba(0, 0, 0, 0.08);
  --shadow-lg:  0 8px 32px rgba(0, 0, 0, 0.10);
}
```

---

## 11. Do's and Don'ts

### ✅ Do
- Use the bold-thin weight contrast in all logo reproductions
- Keep backgrounds clean and minimal — let content breathe
- Use Steel Teal as the only accent color for interactive elements
- Use Nunito across all touchpoints for typographic consistency
- Keep illustrations decorative and low-opacity
- Write in lowercase for informal/community contexts (matches brand tone)

### ❌ Don't
- Use vibrant, saturated colors anywhere
- Use all-caps for the logo
- Mix fonts beyond Nunito + JetBrains Mono
- Add drop shadows or effects to the wordmark
- Use photography as primary brand visual
- Use the logo on complex or busy backgrounds without a clear contrast surface

---

*This document is the single source of truth for all nbslabs visual and brand decisions.*
