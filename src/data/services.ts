/* ------------------------------------------------------------------
   Services catalogue — powers the pill nav + alternating cards on
   /services (and the ServicesBrowser component if reused on Home).

   Live, bookable services only. Wine Tours and Gift Cards are not
   live yet (no booking/checkout destination) — do not add a category
   here until it has a real page to send people to. See the same rule
   in src/data/home.ts.
   ------------------------------------------------------------------ */
import type { ImageMetadata } from "astro";
import type { Lang } from "../i18n/routes";

import imgTasting from "../assets/images/moment-serve.jpg";
import imgPort from "../assets/images/moment-room-gold.jpg";
import imgBoxes from "../assets/images/moment-bottles.jpg";

export interface ServiceCategory {
  slug: string;
  label: string;
  labelPt: string;
}

export interface Service {
  category: string; // matches ServiceCategory.slug
  eyebrow: string;
  headline: string;
  /** Keep to two sentences max — enforced by convention, not code. */
  description: string;
  image: ImageMetadata;
  alt: string;
  ctaLabel: string;
  /** Route key + optional #anchor, resolved per language at render time. */
  route: "tastings" | "cases";
  anchor?: string;
  pt: Pick<Service, "eyebrow" | "headline" | "description" | "alt" | "ctaLabel">;
}

export function localizeService(s: Service, lang: Lang): Service {
  return lang === "pt" ? { ...s, ...s.pt } : s;
}

export const serviceCategories: ServiceCategory[] = [
  { slug: "wine-tasting", label: "Wine Tasting", labelPt: "Provas de vinho" },
  { slug: "port-wine-tasting", label: "Port Wine Tasting", labelPt: "Provas de vinho do Porto" },
  { slug: "wine-boxes", label: "Wine Boxes", labelPt: "Caixas de vinho" },
];

export const services: Service[] = [
  {
    category: "wine-tasting",
    eyebrow: "Wine Tasting",
    headline: "A careful selection of the very best of Portugal.",
    description:
      "Six guided flights, from bright Vinho Verde to bold Portuguese icons. Every pour is led by our sommelier, at your table.",
    image: imgTasting,
    alt: "Vasilii serving wine to guests at the bottle wall inside Dogma",
    ctaLabel: "See more",
    route: "tastings",
    pt: {
      eyebrow: "Provas de vinho",
      headline: "Uma seleção cuidada do melhor que Portugal tem.",
      description:
        "Seis provas guiadas, do Vinho Verde luminoso aos grandes ícones portugueses. Cada copo é servido pelo nosso escanção, à sua mesa.",
      alt: "Vasilii a servir vinho a clientes junto à parede de garrafas do Dogma",
      ctaLabel: "Saber mais",
    },
  },
  {
    category: "port-wine-tasting",
    eyebrow: "Port Wine Tasting",
    headline: "The finest selection, guided by a Master of Port.",
    description:
      "From an introduction to the essential styles to a flight of truly rare bottles — led by Portugal's first Master of Port.",
    image: imgPort,
    alt: "Guests gathered for an evening of Port tasting at Dogma, under warm light",
    ctaLabel: "See more",
    route: "tastings",
    anchor: "port-intro",
    pt: {
      eyebrow: "Provas de vinho do Porto",
      headline: "A melhor seleção, guiada por um Master of Port.",
      description:
        "Da introdução aos estilos essenciais a uma prova de garrafas verdadeiramente raras — conduzida pelo primeiro Master of Port de Portugal.",
      alt: "Clientes reunidos numa noite de prova de vinho do Porto no Dogma, sob luz quente",
      ctaLabel: "Saber mais",
    },
  },
  {
    category: "wine-boxes",
    eyebrow: "Wine Boxes",
    headline: "Portugal in a case.",
    description:
      "A personal selection of exceptional wines, curated by Vasilii Grebencea and shipped to your door anywhere in the world.",
    image: imgBoxes,
    alt: "A curated shelf of wine bottles and awards at Dogma",
    ctaLabel: "See more",
    route: "cases",
    pt: {
      eyebrow: "Caixas de vinho",
      headline: "Portugal numa caixa.",
      description:
        "Uma seleção pessoal de vinhos excecionais, escolhida por Vasilii Grebencea e enviada para a sua porta, em qualquer parte do mundo.",
      alt: "Uma prateleira de garrafas escolhidas e distinções no Dogma",
      ctaLabel: "Saber mais",
    },
  },
];
