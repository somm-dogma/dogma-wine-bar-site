/* ------------------------------------------------------------------
   Server-authoritative Signature Cases catalogue.
   Prices here are what Stripe charges — the browser never sends a price.
   Must stay in sync with src/data/cases.ts.
   ------------------------------------------------------------------ */

export const CURRENCY = "eur";

export const BOTTLE_SIZES = [6, 12, 18, 24, 30, 36, 42, 48];

const CATEGORIES = {
  "medium-plus": { slug: "medium-plus", name: "Medium+ Quality Wines", pricePerBottle: 30 },
  "top-quality": { slug: "top-quality", name: "Top Quality Wines",     pricePerBottle: 39 },
  "icons":        { slug: "icons",       name: "Icons of Portugal",     pricePerBottle: 69 },
};

export function getCaseCategory(slug) {
  return CATEGORIES[slug] ?? null;
}

export function isValidBottleCount(n) {
  return BOTTLE_SIZES.includes(n);
}
