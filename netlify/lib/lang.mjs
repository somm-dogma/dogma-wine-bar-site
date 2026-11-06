/* ------------------------------------------------------------------
   Language of a checkout request → Stripe locale + return URLs.

   The client sends `lang: "en" | "pt"`. Anything else falls back to
   English, so a crafted value can never steer the redirect URLs: they
   are picked from this fixed table, never built from user input.
   Paths mirror src/i18n/routes.ts (keep in sync).
   ------------------------------------------------------------------ */

const PATHS = {
  en: {
    tastings: "/bookatasting/",
    bookingConfirmed: "/booking-confirmed/",
    cases: "/signature-cases/",
    caseConfirmed: "/case-confirmed/",
  },
  pt: {
    tastings: "/pt/provas/",
    bookingConfirmed: "/pt/reserva-confirmada/",
    cases: "/pt/caixas-de-vinho/",
    caseConfirmed: "/pt/encomenda-confirmada/",
  },
};

export function pickLang(value) {
  return value === "pt" ? "pt" : "en";
}

/** Stripe Checkout locale: "pt" is European Portuguese ("pt-BR" is Brazil). */
export function stripeLocale(lang) {
  return lang === "pt" ? "pt" : "en";
}

export function langPath(lang, key) {
  return PATHS[pickLang(lang)][key];
}
