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
    labelPt: "Vinho Verde, Além das Expectativas",
    pricePerPerson: 36, // EUR
    minPeople: 1,
    maxPeople: 12,
    durationMin: 90,
    // Group session: one fixed start time per day. Any other time is refused.
    fixedTime: "16:30",
  },
  "collectors-table": {
    label: "The Collector's Table",
    labelPt: "A Mesa do Colecionador",
    pricePerPerson: 90,
    minPeople: 1,
    maxPeople: 12,
    durationMin: 90,
    // Group session: one fixed start time per day.
    fixedTime: "19:00",
    // Optional per-person add-on for the whole party: more generous portions.
    upgrade: { pricePerPerson: 24, label: "Make it dinner", labelPt: "Versão jantar" },
  },
  icons: {
    label: "Icons of Portugal",
    labelPt: "Ícones de Portugal",
    pricePerPerson: 180,
    minPeople: 1,
    maxPeople: 12,
    durationMin: 120,
  },
  "port-intro": {
    label: "Port Introduction",
    labelPt: "Introdução ao Vinho do Porto",
    pricePerPerson: 45,
    minPeople: 1,
    maxPeople: 12,
    durationMin: 90,
  },
  "port-top": {
    label: "TOP Port Selection",
    labelPt: "Seleção TOP de Vinho do Porto",
    pricePerPerson: 72,
    minPeople: 1,
    maxPeople: 12,
    durationMin: 120,
  },
  "dreamy-ports": {
    label: "Ports from Heaven",
    labelPt: "Portos Divinos",
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
