/* ------------------------------------------------------------------
   Signature Cases front-end catalogue.
   Prices/slugs MUST match the server-authoritative netlify/lib/cases.mjs.
   ------------------------------------------------------------------ */

export const BOTTLE_SIZES = [6, 12, 18, 24, 30, 36, 42, 48] as const;
export type BottleSize = (typeof BOTTLE_SIZES)[number];

export interface CaseCategory {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  pricePerBottle: number;
}

export const CASE_CATEGORIES: CaseCategory[] = [
  {
    slug: "medium-plus",
    name: "Medium+ Quality Wines",
    tagline: "€30 per bottle",
    description:
      "Exceptional Portuguese wines that exceed expectations — accessible in price, uncompromising in quality.",
    pricePerBottle: 30,
  },
  {
    slug: "top-quality",
    name: "Top Quality Wines",
    tagline: "€39 per bottle",
    description:
      "Outstanding bottles from Portugal's most celebrated estates and recent vintages — wines earning international recognition.",
    pricePerBottle: 39,
  },
  {
    slug: "icons",
    name: "Icons of Portugal",
    tagline: "€69 per bottle",
    description:
      "The most prestigious wines Portugal produces — icons of winemaking that define a generation, personally selected.",
    pricePerBottle: 69,
  },
];

export function getCaseCategory(slug: string): CaseCategory | undefined {
  return CASE_CATEGORIES.find((c) => c.slug === slug);
}
