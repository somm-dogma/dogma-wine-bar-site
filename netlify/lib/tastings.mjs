/* ------------------------------------------------------------------
   Server-authoritative tasting catalogue.

   This is the ONLY source of truth for prices. The browser sends a
   `tastingType` key, never a price — the amount charged is computed
   here, server-side, so a tampered request can't change what Stripe
   charges. Keep the display copy on /bookatasting in sync by hand.
   ------------------------------------------------------------------ */

export const TASTINGS = {
  wine: {
    label: "Portuguese Wine Tasting",
    pricePerPerson: 45, // EUR
    minPeople: 1,
    maxPeople: 12,
    durationMin: 90,
  },
  port: {
    label: "Port Wine Master Class",
    pricePerPerson: 65,
    minPeople: 1,
    maxPeople: 12,
    durationMin: 120,
  },
  private: {
    label: "Private Group Tasting",
    pricePerPerson: 55,
    minPeople: 4,
    maxPeople: 20,
    durationMin: 120,
  },
};

export const CURRENCY = "eur";

/** Returns the catalogue entry or null for an unknown key. */
export function getTasting(type) {
  return Object.prototype.hasOwnProperty.call(TASTINGS, type) ? TASTINGS[type] : null;
}
