---
name: Dogma Wine Bar
description: Premium wine destination in Porto led by Portugal's first Master of Port
colors:
  wine-950: "#2b0a11"
  wine-900: "#3e0f18"
  wine-800: "#571922"
  wine-700: "#73242f"
  cream: "#f7f0e1"
  cream-50: "#fbf6ec"
  paper: "#fffdf8"
  ink: "#241317"
  ink-soft: "#6a565a"
  gold: "#c9a86a"
  gold-300: "#ddc38f"
  line: "rgba(36, 19, 23, 0.14)"
typography:
  display:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "clamp(3rem, 2rem + 5vw, 6.5rem)"
    fontWeight: 600
    lineHeight: 1.04
    letterSpacing: "0.005em"
  headline:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "clamp(2.4rem, 1.9rem + 2.5vw, 4rem)"
    fontWeight: 600
    lineHeight: 1.04
  title:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "clamp(1.75rem, 1.5rem + 1.2vw, 2.6rem)"
    fontWeight: 600
    lineHeight: 1.04
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(1rem, 0.95rem + 0.25vw, 1.13rem)"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  label:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(0.83rem, 0.78rem + 0.2vw, 0.95rem)"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.08em"
    textTransform: "uppercase"
spacing:
  xs: "0.5rem"
  sm: "1rem"
  md: "1.5rem"
  lg: "2.5rem"
  xl: "4rem"
rounded:
  sm: "4px"
  md: "8px"
  lg: "14px"
  pill: "999px"
components:
  button-primary:
    backgroundColor: "{colors.wine-800}"
    textColor: "{colors.cream-50}"
    rounded: "{rounded.pill}"
    padding: "0.95em 1.8em"
  button-cream:
    backgroundColor: "{colors.cream-50}"
    textColor: "{colors.wine-800}"
    rounded: "{rounded.pill}"
    padding: "0.95em 1.8em"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.cream-50}"
    rounded: "{rounded.pill}"
    padding: "0.95em 1.8em"
  card:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.lg}"
    padding: "2rem"
---

# Design System: Dogma Wine Bar

## 1. Overview

**Creative North Star: "The Mecca of Portuguese Wines"**

Dogma's visual system lives in two worlds: the deep, sophisticated burgundy of fine wine and the warm, refined cream of an elegant room. Together they create an atmosphere of expertise and welcome — you're in the presence of mastery (the Master of Port), but you're invited in warmly.

The system rejects stuffiness (cold, gatekeeping tone), generic SaaS defaults (cream everywhere with eyebrows on every section), and kitsch decoration. Instead, it uses **restrained color** (burgundy + cream + restrained gold), **high-contrast typography** (display serif paired with clean sans-serif body), and **purposeful micro-interactions** (subtle shadows, soft gradations on interactive elements, and smooth motion). Every element serves clarity and credibility.

**Key Characteristics:**
- Deep burgundy (#3e0f18) as the primary theme color; cream as a breathing space.
- Serif display (Cormorant Garamond) for authority and elegance; clean sans-serif (Inter) for approachability and readability.
- Fluid typography with `clamp()` for responsive scale without breakpoints.
- Restrained use of gold (#c9a86a) as accent and eyebrow text on burgundy sections.
- Soft shadows and subtle motion to add polish without distraction.
- WCAG AA contrast throughout; no compromises on readability.

## 2. Colors

Deep burgundy carries the wine heritage and mastery; warm cream invites visitors in; gold adds warmth and accent weight.

### Primary
- **Wine-900** (#3e0f18): The core theme color. Used as background for hero, major sections (Master of Port, sommelier, footer). Paired with cream-50 text for 7.5:1 contrast.
- **Cream** (#f7f0e1): Primary background for body sections and breathing space. Warm ivory, not stark white. Paired with ink (#241317) for 9.8:1 contrast.

### Secondary
- **Wine-800** (#571922): Slightly raised burgundy for hover states and button backgrounds. Creates depth without breaking the palette.
- **Wine-700** (#73242f): Lighter burgundy for interactive hover states and muted badges.
- **Paper** (#fffdf8): Off-white for cards and nested surfaces on cream background. Creates subtle layering.
- **Cream-50** (#fbf6ec): Lighter cream for text on burgundy and accents.

### Accent
- **Gold** (#c9a86a): Warm accent for eyebrows, dividers, and decorative elements on burgundy sections. 7.4:1 contrast on wine-900.
- **Gold-300** (#ddc38f): Lighter gold for text and secondary accents on burgundy sections. 7.0:1 contrast on wine-900.

### Utility
- **Ink** (#241317): Body text on cream. Near-black for high contrast.
- **Ink-soft** (#6a565a): Muted text on cream for secondary content. 4.8:1 contrast.
- **Line** (rgba(36, 19, 23, 0.14)): Subtle border color for dividers and card borders.

## 3. Typography

Two-family system: Cormorant Garamond (serif, 400–600 weights) for display and hierarchy; Inter (sans-serif, 400–600 weights) for body and UI.

### Display (H1)
- **Font:** Cormorant Garamond 600
- **Size:** `clamp(3rem, 2rem + 5vw, 6.5rem)` — scales from 48px (mobile) to 104px (desktop). Never exceeds 6.5rem to avoid shouting.
- **Line Height:** 1.04 (tight for display elegance)
- **Letter Spacing:** -0.005em (negative but not cramped; letters sit close without touching)
- **Usage:** Hero title, major section headings. Must use `text-wrap: balance` to avoid orphans.

### Headline (H2, H3)
- **Font:** Cormorant Garamond 600
- **Size:** `clamp(2.4rem, 1.9rem + 2.5vw, 4rem)` for H2; adjust H3 down one step
- **Line Height:** 1.04
- **Letter Spacing:** -0.005em
- **Usage:** Section headings, card titles. Set `text-wrap: balance`.

### Title (H4)
- **Font:** Cormorant Garamond 600
- **Size:** `clamp(1.75rem, 1.5rem + 1.2vw, 2.6rem)`
- **Line Height:** 1.04
- **Usage:** Subheadings, component titles.

### Body
- **Font:** Inter 400
- **Size:** `clamp(1rem, 0.95rem + 0.25vw, 1.13rem)` — readable on all screens
- **Line Height:** 1.65 (generous for readability on cream)
- **Letter Spacing:** normal
- **Max Width:** 65–75ch per line (enforced via container widths, not CSS)
- **Usage:** Paragraphs, article text. Set `text-wrap: pretty` on long prose to reduce orphans.

### Label
- **Font:** Inter 600
- **Size:** `clamp(0.83rem, 0.78rem + 0.2vw, 0.95rem)`
- **Line Height:** 1.4
- **Letter Spacing:** 0.08em
- **Text Transform:** uppercase
- **Usage:** Eyebrows (small caps above headings), button labels, UI labels.

## 4. Elevation

**Flat with layered depth.** No stacked shadows. One signature shadow for cards, buttons, and hover states.

- **Card Shadow:** `0 22px 50px -24px rgba(43, 10, 17, 0.5)` — soft, wide blur, restrained offset. Creates depth without drama.
- **Hover Lift:** Buttons and clickable elements add the card shadow on hover + slight `translateY(-2px)` for tactile feedback. No spring or bounce.
- **No Ghost Cards:** Reject `border: 1px + box-shadow` together. Pick one: a single solid 1px border at brand color OR a defined shadow at 8px blur max. This design uses the shadow approach on cards; buttons use a solid border and transform on hover.

## 5. Components

### Buttons

Three variants, all `border-radius: 999px` (full pill):

**Button Primary** (wine-800 bg, cream-50 text)
- Padding: 0.95em 1.8em
- Hover: bg → wine-700, transform: translateY(-2px), shadow applies
- Smooth transition: 0.18s transform ease, 0.2s background ease
- On active: scale slightly tighter (no bounce)

**Button Cream** (cream-50 bg, wine-800 text)
- Padding: 0.95em 1.8em
- Hover: bg → white, transform: translateY(-2px)
- Used for CTAs on burgundy sections (hero, Master of Port, footer)

**Button Ghost** (transparent, cream-50 text, cream-50 border)
- Border: 1px solid currentColor
- Hover: bg → rgba(255, 255, 255, 0.12)
- Used for secondary CTAs on dark sections

**All buttons:** 
- Font: Inter 600, uppercase, 0.08em letter-spacing
- Reduced motion: no transform on hover, cross-fade background only

### Cards

- **Background:** paper (#fffdf8)
- **Border:** none (shadow provides definition)
- **Border Radius:** 14px
- **Padding:** 2rem
- **Shadow:** card shadow (0 22px 50px -24px)
- **Hover:** shadow intensifies, slight lift (no movement on the card itself)

### Navigation

- **Font:** Inter 500
- **Size:** label scale (small, uppercase-ish)
- **Link Color:** Inherits parent (cream on burgundy, ink on cream)
- **Hover:** color → gold or wine-700 depending on context
- **Underline:** optional bottom border on hover (brand detail, not required)

### Eyebrows

- **Font:** Inter 600
- **Size:** label scale
- **Letter Spacing:** 0.22em (wide track)
- **Text Transform:** uppercase
- **Color on Burgundy:** gold (#c9a86a) — 7.4:1 contrast
- **Color on Cream:** wine-700 (#73242f) — 8:1 contrast (gold fails at 1.9:1 on cream)
- **Margin:** sits above heading with 0.18em margin-bottom

## 6. Do's and Don'ts

### Do

- ✅ Use the fluid typography scale (`clamp()`) — never hardcode pixel sizes for headings.
- ✅ Leverage the two-color system (burgundy + cream) for clean contrast and breathing room.
- ✅ Apply the card shadow for depth; it's the only shadow in the system.
- ✅ Use gold accents sparingly (eyebrows, dividers, icons on burgundy sections).
- ✅ Pair Cormorant display with Inter body — serif for authority, sans for clarity.
- ✅ Test hover states and motion on all interactive elements; smooth easing (ease-out), no bounce.
- ✅ Respect `prefers-reduced-motion` — replace `translateY` hover with opacity fade on motion-sensitive systems.
- ✅ Maintain WCAG AA contrast (≥4.5:1 body text, ≥3:1 large text). Use ink-soft sparingly (secondary copy only).
- ✅ Use eyebrow classes strategically — one or two per page, not above every section.

### Don't

- ❌ Add shadows to multiple elements; the system has one shadow recipe.
- ❌ Pair a 1px border with a drop shadow on the same element (ghost-card antipattern).
- ❌ Use gold (#c9a86a) for body text on cream (fails contrast). Use wine-700 instead with `eyebrow--ink` class.
- ❌ Oversaturate with eyebrows; one named eyebrow per section max, or the cadence becomes noise.
- ❌ Hardcode colors; always reference CSS custom properties (e.g., `var(--wine-900)`).
- ❌ Ignore line length; cap body text at 65–75ch. Long lines are hard to read, no matter the color.
- ❌ Animate layout properties (width, height, padding). Animate transform and opacity only.
- ❌ Round corners beyond 14px on cards; the system uses 14px (`--radius`) as the max.
- ❌ Add a third font family. Cormorant + Inter is the system; extra faces read as indecision.
- ❌ Use the cream background on full-screen sections without a visual break. Alternate burgundy sections provide rhythm.
