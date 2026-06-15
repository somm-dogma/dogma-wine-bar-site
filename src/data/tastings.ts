/* ------------------------------------------------------------------
   Front-end tasting catalogue — the single source for display copy
   used by both Home ("We propose") and /bookatasting.

   Prices/slugs MUST match the server-authoritative catalogue in
   netlify/lib/tastings.mjs (the server is the source of truth for what
   Stripe charges — the browser only ever sends the `slug`).
   ------------------------------------------------------------------ */
import type { ImageMetadata } from "astro";

import imgVinhoVerde from "../assets/images/tasting-vinho-verde.jpg";
import imgTopWine from "../assets/images/tasting-top-wine.jpg";
import imgIcons from "../assets/images/tasting-icons-portugal.jpg";
import imgPortIntro from "../assets/images/tasting-port-introduction.jpg";
import imgTopPort from "../assets/images/tasting-top-port.jpg";
import imgDreamyPorts from "../assets/images/tasting-ports-from-heaven.jpg";

export interface Tasting {
  /** URL slug — the deep-link key (/bookatasting?tasting=<slug>) and the
   *  `tastingType` sent to the server. Engineering-canonical, never changes. */
  slug: string;
  name: string;
  category: string;
  description: string;
  /** What's included: samples and accompaniment. */
  includes: string;
  /** Display price, e.g. "€51". Authoritative number lives server-side. */
  price: string;
  /** Display duration. */
  duration: string;
  image: ImageMetadata;
  alt: string;
}

export const tastings: Tasting[] = [
  {
    slug: "vinho-verde",
    name: "Vinho Verde, Beyond Expectations",
    category: "White · Vinho Verde",
    description:
      "Often mistaken for a single style, Vinho Verde is actually a diverse region — fresh, vibrant, and surprisingly varied.",
    includes: "Five samples: sparkling, two whites, two reds. Served with snacks of our selection.",
    price: "€51",
    duration: "90–120 min",
    image: imgVinhoVerde,
    alt: "Map of the Vinho Verde sub-regions of northern Portugal",
  },
  {
    slug: "top-wines",
    name: "TOP Wine Tasting",
    category: "Wine flight",
    description:
      "Portugal is producing some of the most exciting wines in Europe today. This tasting is a curated selection of truly outstanding bottles.",
    includes: "Four samples: two whites, two reds. Served with snacks of our selection.",
    price: "€75",
    duration: "90–120 min",
    image: imgTopWine,
    alt: "A grid of wine corks from estates around the world on black",
  },
  {
    slug: "icons",
    name: "Icons of Portugal",
    category: "Wine flight",
    description:
      "Discover the wines that shaped Portugal's reputation — bold, expressive, and deeply rooted in centuries of winemaking tradition.",
    includes: "Four samples: two whites, two reds. Served with snacks of our selection.",
    price: "€99",
    duration: "90–120 min",
    image: imgIcons,
    alt: "Bronze statue of a Portuguese helmsman against the sky in Porto",
  },
  {
    slug: "port-intro",
    name: "Port Introduction",
    category: "Port",
    description:
      "A guided journey through the essential styles of Port wine — from dry whites to aged tawnies and rich rubies. Built for those discovering Port for the first time, with context, contrast, and no shortcuts.",
    includes: "Three samples, served with our cheese selection.",
    price: "€45",
    duration: "90–120 min",
    image: imgPortIntro,
    alt: "Stained-glass window glowing in a dark Porto wine lodge",
  },
  {
    slug: "port-top",
    name: "TOP Port Selection",
    category: "Port",
    description:
      "Some Ports I keep coming back to. Not because they're expensive — because they say something. This is a small selection of bottles that earned a permanent spot on my list. Come taste them with me.",
    includes: "Three samples, served with our cheese selection.",
    price: "€72",
    duration: "90–120 min",
    image: imgTopPort,
    alt: "Port pipes aging under a lantern in a dark cellar, black and white",
  },
  {
    slug: "dreamy-ports",
    name: "Ports from Heaven",
    category: "Port · rare",
    description:
      "An extraordinary tasting of truly outstanding Ports, personally selected and presented by Portugal's 1st Master of Port.",
    includes: "Three samples, served with our cheese selection.",
    price: "€210",
    duration: "90–120 min",
    image: imgDreamyPorts,
    alt: "Forrester's 1843 engraved Map of the Wine District of the Alto-Douro",
  },
];
