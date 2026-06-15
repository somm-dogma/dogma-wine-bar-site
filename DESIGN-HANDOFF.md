# Dogma Wine Bar — Design System Handoff (for Claude Design)

**Read this first.** Dogma is **not a greenfield design**. The site is already built
(Astro) with a mature, locked design system. Your job is to **design new pages *inside*
this system**, not to invent a new one. Anything you produce that uses these exact tokens
and components implements **1:1** in code. Anything that invents new colors/spacing/fonts
costs a translation round-trip and may get rejected for inconsistency.

When you spec a screen, **describe it in these tokens** (e.g. "`--wine-900` panel, `--gold`
eyebrow at `--step--1`, heading `--step-3` in display serif, card radius `--radius`,
`--shadow-md`"), not in arbitrary hexes or pixel guesses.

---

## 1. Immovable constraints (do NOT redesign these)

These are fixed by engineering or the business. Design *around* them.

- **Booking flow.** Tastings are sold through **Stripe Checkout** with **server-authoritative
  pricing** (the browser never sends a price). Table reservations go to **ResOS**. You cannot
  add card fields, change the payment step, or invent a checkout UI. The flow is:
  pick tasting → pick date/time (ResOS availability) → guest details → Stripe Checkout → confirmed.
- **The 6 tastings & prices are fixed** (see §5). Prices are final; only *durations* are still
  being confirmed. CTA label is **"Reserve"**.
- **Deep-link pattern:** every tasting card's button goes to `/bookatasting?tasting=<slug>`
  (pre-selects that tasting). Keep this — don't design bespoke per-tasting pages.
- **Nav** (live destinations only): Tastings · Menu · Sommelier · Contacts. Persistent header
  CTA: "Book a tasting".
- **Just-locked components** (already shipped — reuse, don't restyle): the 4 circular
  **medallions** (Recognition), the **footer** with its two CTAs (Book a tasting · Book a table).
- **Tech reality:** responsive via `clamp()` (no fixed px layouts), scroll-reveal animations,
  **WCAG AA contrast**, and `prefers-reduced-motion` support are mandatory.

---

## 2. Brand tokens (exact — copy these values)

### Color
| Token | Hex | Use |
|---|---|---|
| `--wine-950` | `#2b0a11` | Darkest burgundy — footer, deep panels, shadows base |
| `--wine-900` | `#3e0f18` | **Primary burgundy** — theme color, hero |
| `--wine-800` | `#571922` | Raised burgundy surface, primary button |
| `--wine-700` | `#73242f` | Hover / lighter burgundy, eyebrow-on-cream |
| `--cream` | `#f7f0e1` | Primary ivory surface (page background) |
| `--cream-50` | `#fbf6ec` | Lighter ivory |
| `--paper` | `#fffdf8` | Off-white card surface |
| `--ink` | `#241317` | Body text on cream |
| `--ink-soft` | `#6a565a` | Muted text on cream |
| `--gold` | `#c9a86a` | Accent — eyebrows, dividers, rings (AA on burgundy only) |
| `--gold-300` | `#ddc38f` | Lighter gold for text on burgundy |
| `--line` | `rgba(36,19,23,0.14)` | Hairline borders/dividers |

**Contrast rule (don't break it):** gold passes AA **on burgundy** but FAILS on cream.
Eyebrows on light surfaces must use `--wine-700` (class `.eyebrow--ink`), not gold.

### Type
- **Display (headings):** `Playfair Display`, serif — weight 600 (italic available), line-height 1.04, high-contrast elegant.
- **Body / UI:** `Inter`, sans — line-height 1.65.
- **Numerals / prices:** `JetBrains Mono` (`--font-mono`) — used for price figures, slight negative letter-spacing.
- **Eyebrows:** Inter, 600, uppercase, letter-spacing `0.22em`, at `--step--1`.

### Fluid type scale (all `clamp()`, min→max)
| Token | Range | Typical use |
|---|---|---|
| `--step--1` | 0.83 → 0.95rem | eyebrows, captions, buttons |
| `--step-0` | 1 → 1.13rem | body |
| `--step-1` | 1.3 → 1.6rem | lead paragraph |
| `--step-2` | 1.75 → 2.6rem | sub-headings |
| `--step-3` | 2.4 → 4rem | section headings |
| `--step-4` | 3 → 6.5rem | hero display |

### Layout / shape / elevation / motion
- Container max-width **1180px**; gutter `clamp(1.25rem, 4vw, 4rem)`; section padding `clamp(3.5rem, 7vw, 7rem)`.
- Radius **14px** (`--radius`); header height 76px; pill buttons (`border-radius: 999px`).
- Shadows: `--shadow-sm / -md / -lg / -xl` (brand-tinted, wine-950 base). Cards use `-md`, lift to `-lg` on hover.
- Motion: ease-out `cubic-bezier(0.22,1,0.36,1)`; durations `--dur-fast 180ms / --dur-mid 320ms / --dur-slow 560ms`.
- Reveal pattern: elements fade + rise 28px on scroll-in (disabled under reduced-motion).
- Image figures: `.media` = `overflow:hidden` + radius, image `object-fit:cover`, scales 1.05 on hover.

### Breakpoints to design at
- **Desktop:** 1280px viewport (1180 container)
- **Tablet:** ~768–900px
- **Mobile:** 375px

---

## 3. Component inventory (reuse — already coded)

- **Buttons** (`.btn`, pill, uppercase, `--step--1`, letter-spacing 0.08em, lift 2px on hover):
  - `--primary` (wine-800 → wine-700 hover)
  - `--cream` (cream-50 → paper hover) — use on dark
  - `--ghost` (transparent, currentColor border) — use on dark/photo
- **Eyebrow** (`.eyebrow` gold on burgundy / `.eyebrow--ink` wine on cream)
- **Lead** paragraph (`--step-1`, ink-soft)
- **Medallions** — 4 identical gold-ring circles on paper, 2×2 on mobile (Recognition row). Locked.
- **Footer** — burgundy, brand + tagline + 2 CTAs + nav columns + Tripadvisor line. Locked.
- **Hero** — full-bleed photo, burgundy overlay, display headline, dual CTA.
- **Media figure** — rounded image with hover-zoom.

---

## 4. Voice & copy
- Editorial, confident, warm — "the art of great winemakers fills glasses."
- Vasilii is **Co-owner & Head Sommelier**, "first Master of Port in Portugal."
- En-dashes, restrained punctuation, no exclamation-mark hype. UK/intl English.

---

## 5. The 6 tastings (for the Tastings page + Home "What we offer" cards)

Prices final; **durations proposed, pending Vasilii.** Descriptions per Vasilii's brief.
Each card needs: photo · name · short description · price (per person) · duration · **Reserve** button
→ `/bookatasting?tasting=<slug>`.

Display names are **final** (owned by Vasilii). Note the comma in #1.

| # | Name | Price/person | Duration (proposed) | slug |
|---|---|---|---|---|
| 1 | Vinho Verde, Beyond Expectations | €51 | 90 min | `vinho-verde` |
| 2 | TOP Wine Tasting | €75 | 120 min | `top-wines` |
| 3 | Icons of Portugal | €99 | 120 min | `icons` |
| 4 | Port Introduction | €45 | 90 min | `port-intro` |
| 5 | TOP Port Selection | €72 | 120 min | `port-top` |
| 6 | Ports from Heaven | €210 | 150 min | `dreamy-ports` |

**Card grid:** 3×2 desktop · 2×3 tablet · 1-col mobile. Symmetric, equal-height, Apple-product feel.

---

## 6. How to hand specs back so they implement 1:1
1. Describe every surface in **tokens** (color/scale/radius/shadow names above), not raw values.
2. Give **layout intent + responsive behavior** at the 3 breakpoints, not one fixed canvas.
3. Reuse the **existing components** by name; flag anything genuinely new so we add it deliberately.
4. Keep AA contrast and reduced-motion in mind (gold-on-cream is the classic trap).
5. Export imagery at **2×** for retina.

---

## 7. What's genuinely open for you to shape
Composition, section rhythm, hierarchy, imagery treatment, the **tasting-card** visual, and the
**Tastings page** layout. Define the *one* tasting card well — we build it once and reuse it on
both Home and `/bookatasting`. That single component is the highest-leverage thing to nail.
