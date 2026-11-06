/* ------------------------------------------------------------------
   Bilingual routing — the single source of truth for EN ↔ PT pairs.

   English lives at the root (/menu/), European Portuguese under /pt/
   with Portuguese slugs (/pt/carta/). Every page that exists in both
   languages has one entry here; the language switch, <link hreflang>,
   the sitemap alternates and every internal link read from this map.

   Rules (see CLAUDE.md): paths ALWAYS end in a trailing slash.
   Imported by astro.config.mjs too (sitemap), so keep it dependency-free.
   ------------------------------------------------------------------ */

export type Lang = "en" | "pt";
export const LANGS: Lang[] = ["en", "pt"];

/** BCP-47 tags for <html lang> and hreflang. Portuguese is strictly pt-PT. */
export const HTML_LANG: Record<Lang, string> = { en: "en", pt: "pt-PT" };
export const OG_LOCALE: Record<Lang, string> = { en: "en_US", pt: "pt_PT" };

export const routes = {
  home:             { en: "/",                   pt: "/pt/" },
  tastings:         { en: "/bookatasting/",      pt: "/pt/provas/" },
  cases:            { en: "/signature-cases/",   pt: "/pt/caixas-de-vinho/" },
  menu:             { en: "/menu/",              pt: "/pt/carta/" },
  services:         { en: "/services/",          pt: "/pt/servicos/" },
  sommelier:        { en: "/sommelier/",         pt: "/pt/escancao/" },
  contacts:         { en: "/contacts/",          pt: "/pt/contactos/" },
  masterOfPort:     { en: "/master-of-port/",    pt: "/pt/master-of-port/" },
  privacy:          { en: "/privacy/",           pt: "/pt/privacidade/" },
  cookies:          { en: "/cookies/",           pt: "/pt/cookies/" },
  bookingConfirmed: { en: "/booking-confirmed/", pt: "/pt/reserva-confirmada/" },
  caseConfirmed:    { en: "/case-confirmed/",    pt: "/pt/encomenda-confirmada/" },
  messageSent:      { en: "/obrigado/",          pt: "/pt/mensagem-enviada/" },
} as const satisfies Record<string, Record<Lang, string>>;

export type RouteKey = keyof typeof routes;

/** Path of a page in a given language: r("pt", "menu") → "/pt/carta/". */
export function r(lang: Lang, key: RouteKey): string {
  return routes[key][lang];
}

const withSlash = (p: string) => (p.endsWith("/") ? p : `${p}/`);

/** Language of a URL path — everything under /pt/ is Portuguese. */
export function langFromPath(pathname: string): Lang {
  return pathname === "/pt" || pathname.startsWith("/pt/") ? "pt" : "en";
}

/** The route entry a path belongs to (or undefined for e.g. 404). */
export function routeKeyOf(pathname: string): RouteKey | undefined {
  const p = withSlash(pathname);
  return (Object.keys(routes) as RouteKey[]).find(
    (k) => routes[k].en === p || routes[k].pt === p
  );
}

/** Both language versions of the page at `pathname`, if it has a twin. */
export function alternatesOf(pathname: string): Record<Lang, string> | undefined {
  const key = routeKeyOf(pathname);
  return key ? routes[key] : undefined;
}
