/* ------------------------------------------------------------------
   Front-end tasting catalogue — the single source for display copy
   used by both Home ("We propose") and /bookatasting.

   Prices/slugs MUST match the server-authoritative catalogue in
   netlify/lib/tastings.mjs (the server is the source of truth for what
   Stripe charges — the browser only ever sends the `slug`).

   Display names, categories, durations and slugs are FINAL (Design +
   engineering). Descriptions are Design's placeholder one-liners in the
   brand voice — replace with Vasilii's real notes when available.
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
  /** Display price, e.g. "€51". Authoritative number lives server-side. */
  price: string;
  /** Display duration, e.g. "90 min". */
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
      "Bright, mineral and alive — the north of Portugal, well beyond the cliché.",
    price: "€51",
    duration: "90 min",
    image: imgVinhoVerde,
    alt: "Map of the Vinho Verde sub-regions of northern Portugal",
  },
  {
    slug: "top-wines",
    name: "TOP Wine Tasting",
    category: "Wine flight",
    description:
      "A sweep across the country's defining regions, poured side by side.",
    price: "€75",
    duration: "120 min",
    image: imgTopWine,
    alt: "A grid of wine corks from estates around the world on black",
  },
  {
    slug: "icons",
    name: "Icons of Portugal",
    category: "Wine flight",
    description:
      "The benchmark bottles every serious cellar measures itself against.",
    price: "€99",
    duration: "120 min",
    image: imgIcons,
    alt: "Bronze statue of a Portuguese helmsman against the sky in Porto",
  },
  {
    slug: "port-intro",
    name: "Port Introduction",
    category: "Port",
    description:
      "Where Port begins — style, method and the first real taste of the Douro.",
    price: "€45",
    duration: "90 min",
    image: imgPortIntro,
    alt: "Stained-glass window glowing in a dark Porto wine lodge",
  },
  {
    slug: "port-top",
    name: "TOP Port Selection",
    category: "Port",
    description:
      "A tighter, higher flight through standout Ports worth the detour.",
    price: "€72",
    duration: "120 min",
    image: imgTopPort,
    alt: "Port pipes aging under a lantern in a dark cellar, black and white",
  },
  {
    slug: "dreamy-ports",
    name: "Ports from Heaven",
    category: "Port · rare",
    description:
      "The rarest pours in the house — decades in wood, vintages from another era.",
    price: "€210",
    duration: "150 min",
    image: imgDreamyPorts,
    alt: "Forrester's 1843 engraved Map of the Wine District of the Alto-Douro",
  },
];
