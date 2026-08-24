/* ------------------------------------------------------------------
   Services catalogue — powers the pill nav + alternating cards on
   /services (and the ServicesBrowser component if reused on Home).

   Live, bookable services only. Wine Tours and Gift Cards are not
   live yet (no booking/checkout destination) — do not add a category
   here until it has a real page to send people to. See the same rule
   in src/data/home.ts.
   ------------------------------------------------------------------ */
import type { ImageMetadata } from "astro";

import imgTasting from "../assets/images/moment-serve.jpg";
import imgPort from "../assets/images/moment-room-gold.jpg";
import imgBoxes from "../assets/images/moment-bottles.jpg";

export interface ServiceCategory {
  slug: string;
  label: string;
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
  href: string;
}

export const serviceCategories: ServiceCategory[] = [
  { slug: "wine-tasting", label: "Wine Tasting" },
  { slug: "port-wine-tasting", label: "Port Wine Tasting" },
  { slug: "wine-boxes", label: "Wine Boxes" },
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
    href: "/bookatasting/",
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
    href: "/bookatasting/#port-intro",
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
    href: "/signature-cases/",
  },
];
