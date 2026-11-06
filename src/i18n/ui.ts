/* ------------------------------------------------------------------
   Shared interface copy (header, footer, cookie banner, cards, page
   shell). Page-specific copy lives next to its markup in src/views/.

   Portuguese = European Portuguese, Coimbra register. Never PT-BR
   (e.g. "contactos", "equipa", "registo", "telemóvel", "receção").
   ------------------------------------------------------------------ */
import type { Lang } from "./routes";

export const ui = {
  en: {
    siteTitleSuffix: "Wine Bar in Porto · Master of Port",
    siteDescription:
      "Wine and Port tastings in Porto's historic centre, led by Portugal's first Master of Port. Six guided flights from €45 — book online in a minute.",
    skip: "Skip to content",
    homeLabel: "Dogma — Wine Bar & Tasting, home",
    toggleMenu: "Toggle menu",
    mainNav: "Main navigation",
    bookShort: "Book",
    bookTasting: "Book a tasting",
    bookTable: "Book a table",
    menu: "Menu",
    nav: {
      tastings: "Tastings",
      cases: "Signature Cases",
      menu: "Menu",
      services: "Services",
      sommelier: "Sommelier",
      contacts: "Contacts",
    },
    langSwitch: "Language",
    footer: {
      overline: "Visit",
      title: "Pull up a seat.",
      tag: "A place where the art of great winemakers fills glasses.",
      services: "Services",
      degustation: "Tastings",
      wineBoxes: "Wine Boxes",
      contacts: "Contacts",
      company: "Company",
      about: "About",
      sommelier: "Sommelier",
      rights: "All rights reserved.",
      privacy: "Privacy Policy",
      cookies: "Cookie Policy",
    },
    cookie: {
      region: "Cookie consent",
      text: "We use essential cookies to make this site work. With your consent we’d also use analytics cookies to understand how it’s used. Read our",
      policy: "Cookie Policy",
      accept: "Accept",
      decline: "Decline",
    },
    card: { perPerson: "per person", reserve: "Reserve" },
  },
  pt: {
    siteTitleSuffix: "Wine Bar no Porto · Master of Port",
    siteDescription:
      "Provas de vinho e de vinho do Porto no centro histórico do Porto, conduzidas pelo primeiro Master of Port de Portugal. Seis provas desde 45 €.",
    skip: "Saltar para o conteúdo",
    homeLabel: "Dogma — Wine Bar & Tasting, página inicial",
    toggleMenu: "Abrir ou fechar o menu",
    mainNav: "Navegação principal",
    bookShort: "Reservar",
    bookTasting: "Reservar uma prova",
    bookTable: "Reservar mesa",
    menu: "Carta",
    nav: {
      tastings: "Provas",
      cases: "Caixas de Vinho",
      menu: "Carta",
      services: "Serviços",
      sommelier: "Escanção",
      contacts: "Contactos",
    },
    langSwitch: "Idioma",
    footer: {
      overline: "Visite-nos",
      title: "Sente-se connosco.",
      tag: "Um lugar onde a arte dos grandes produtores enche os copos.",
      services: "Serviços",
      degustation: "Provas",
      wineBoxes: "Caixas de Vinho",
      contacts: "Contactos",
      company: "A casa",
      about: "Sobre nós",
      sommelier: "Escanção",
      rights: "Todos os direitos reservados.",
      privacy: "Política de Privacidade",
      cookies: "Política de Cookies",
    },
    cookie: {
      region: "Consentimento de cookies",
      text: "Usamos cookies essenciais para que o site funcione. Com o seu consentimento, usaríamos também cookies analíticos para perceber como é utilizado. Leia a nossa",
      policy: "Política de Cookies",
      accept: "Aceitar",
      decline: "Recusar",
    },
    card: { perPerson: "por pessoa", reserve: "Reservar" },
  },
} satisfies Record<Lang, unknown>;

export type UI = (typeof ui)["en"];

/** Euro amounts the way each language writes them: "€45" / "45 €". */
export function euro(lang: Lang, amount: number | string): string {
  const n = String(amount).replace(/[^0-9.,]/g, "");
  return lang === "pt" ? `${n.replace(".", ",")} €` : `€${n}`;
}

/** Hours lines for the footer/contacts, per language. */
export const hours = {
  en: [
    { days: "Monday – Saturday", time: "16:00 – 22:00" },
    { days: "Sunday", time: "Closed" },
  ],
  pt: [
    { days: "Segunda a sábado", time: "16:00 – 22:00" },
    { days: "Domingo", time: "Encerrado" },
  ],
} satisfies Record<Lang, { days: string; time: string }[]>;
