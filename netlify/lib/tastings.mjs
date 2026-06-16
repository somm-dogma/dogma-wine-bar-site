/* ------------------------------------------------------------------
   Server-authoritative tasting catalogue.

   This is the ONLY source of truth for prices. The browser sends a
   `tastingType` key, never a price — the amount charged is computed
   here, server-side, so a tampered request can't change what Stripe
   charges. Keep the display copy on /bookatasting in sync by hand.
   ------------------------------------------------------------------ */

export const TASTINGS = {
  "vinho-verde": {
    label: "Vinho Verde, Beyond Expectations",
    pricePerPerson: 51, // EUR
    minPeople: 1,
    maxPeople: 12,
    durationMin: 90,
  },
  "top-wines": {
    label: "TOP Wine Tasting",
    pricePerPerson: 75,
    minPeople: 1,
    maxPeople: 12,
    durationMin: 120,
  },
  icons: {
    label: "Icons of Portugal",
    pricePerPerson: 99,
    minPeople: 1,
    maxPeople: 12,
    durationMin: 120,
  },
  "port-intro": {
    label: "Port Introduction",
    pricePerPerson: 45,
    minPeople: 1,
    maxPeople: 12,
    durationMin: 90,
  },
  "port-top": {
    label: "TOP Port Selection",
    pricePerPerson: 72,
    minPeople: 1,
    maxPeople: 12,
    durationMin: 120,
  },
  "dreamy-ports": {
    label: "Ports from Heaven",
    pricePerPerson: 210,
    minPeople: 1,
    maxPeople: 12,
    durationMin: 150,
  },
};

export const CURRENCY = "eur";

/** Returns the catalogue entry or null for an unknown key. */
export function getTasting(type) {
  return Object.prototype.hasOwnProperty.call(TASTINGS, type) ? TASTINGS[type] : null;
}
