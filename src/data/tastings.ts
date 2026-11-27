/* ------------------------------------------------------------------
   Front-end tasting catalogue — the single source for display copy
   used by both Home ("We propose") and /bookatasting.

   Prices/slugs MUST match the server-authoritative catalogue in
   netlify/lib/tastings.mjs (the server is the source of truth for what
   Stripe charges — the browser only ever sends the `slug`).
   ------------------------------------------------------------------ */
import type { ImageMetadata } from "astro";
import type { Lang } from "../i18n/routes";

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
  /** Group session with one fixed daily start time ("16:30"). Must match
   *  `fixedTime` in netlify/lib/tastings.mjs. Absent = private, any free time. */
  fixedTime?: string;
  /** Optional per-person add-on (EUR). Must match `upgrade` in netlify/lib/tastings.mjs. */
  upgradePrice?: number;
  image: ImageMetadata;
  alt: string;
  /** European-Portuguese copy, including the PT name (approved by Vasilii,
   *  2026-11). Must match `labelPt` in netlify/lib/tastings.mjs. */
  pt: Pick<Tasting, "name" | "category" | "description" | "includes" | "alt">;
}

/** The tasting with its copy in the requested language. */
export function localizeTasting(t: Tasting, lang: Lang): Tasting {
  return lang === "pt" ? { ...t, ...t.pt } : t;
}

export const tastings: Tasting[] = [
  {
    slug: "vinho-verde",
    name: "Vinho Verde, Beyond Expectations",
    category: "White · Vinho Verde",
    description:
      "Most people know Vinho Verde as a light, cheap white. It's one of Portugal's most diverse regions: nine sub-regions, serious whites, sparkling, even reds. One session a day, at 16:30.",
    includes: "5 wines: 1 sparkling, 2 whites, 2 reds · water · simple nibbles",
    price: "€36",
    duration: "90–120 min",
    fixedTime: "16:30",
    image: imgVinhoVerde,
    alt: "Map of the Vinho Verde sub-regions of northern Portugal",
    pt: {
      name: "Vinho Verde, Além das Expectativas",
      category: "Branco · Vinho Verde",
      description: "A maioria conhece o Vinho Verde como um branco leve e barato. É uma das regiões mais diversas de Portugal: nove sub-regiões, brancos sérios, espumantes e até tintos. Uma sessão por dia, às 16h30.",
      includes: "5 vinhos: 1 espumante, 2 brancos, 2 tintos · água · aperitivos simples",
      alt: "Mapa das sub-regiões do Vinho Verde, no norte de Portugal",
    },
  },
  {
    slug: "collectors-table",
    name: "The Collector's Table",
    category: "Wine flight · evening",
    description:
      "Five Portuguese wines we'd normally keep for ourselves: older vintages, limited bottles, often from magnum. The line-up changes; the food is chosen to follow the wine, not the other way round. One session a day, at 19:00.",
    includes: "5 wines: 1 sparkling, 2 whites, 2 reds · a snack with each · Make it dinner: more generous portions, +€24 per person",
    price: "€90",
    duration: "90–120 min",
    fixedTime: "19:00",
    upgradePrice: 24,
    image: imgTopWine,
    alt: "A grid of wine corks from estates around the world on black",
    pt: {
      name: "A Mesa do Colecionador",
      category: "Prova de vinhos · ao fim do dia",
      description: "Cinco vinhos portugueses que normalmente guardaríamos para nós: colheitas antigas, garrafas limitadas, muitas vezes em magnum. A seleção muda; a comida é escolhida para seguir o vinho, e não o contrário. Uma sessão por dia, às 19h00.",
      includes: "5 vinhos: 1 espumante, 2 brancos, 2 tintos · um petisco com cada · Versão jantar: porções mais generosas, +24 € por pessoa",
      alt: "Rolhas de vinho de produtores de todo o mundo, dispostas em grelha sobre fundo preto",
    },
  },
  {
    slug: "icons",
    name: "Icons of Portugal",
    category: "Wine flight · private",
    description:
      "Portugal's reference wines — the bottles that built the country's reputation. The selection changes; the standard doesn't. Private: your party only, at the time you choose.",
    includes: "6 wines · water · snacks of our selection",
    price: "€180",
    duration: "90–120 min",
    image: imgIcons,
    alt: "Bronze statue of a Portuguese helmsman against the sky in Porto",
    pt: {
      name: "Ícones de Portugal",
      category: "Prova de vinhos · privada",
      description: "Os vinhos de referência de Portugal — as garrafas que construíram a reputação do país. A seleção muda; a exigência não. Privada: só o seu grupo, à hora que escolher.",
      includes: "6 vinhos · água · petiscos à nossa escolha",
      alt: "Estátua de bronze de um timoneiro português contra o céu do Porto",
    },
  },
  {
    slug: "port-intro",
    name: "Port Introduction",
    category: "Port",
    description:
      "Never tasted Port properly? Start here. White, ruby and tawny side by side: how Port is made, why the styles differ, and how to order it anywhere after today.",
    includes: "3 Ports: white, ruby, tawny · our cheese selection",
    price: "€45",
    duration: "90–120 min",
    image: imgPortIntro,
    alt: "Stained-glass window glowing in a dark Porto wine lodge",
    pt: {
      name: "Introdução ao Vinho do Porto",
      category: "Vinho do Porto",
      description: "Nunca provou vinho do Porto a sério? Comece aqui. Branco, ruby e tawny lado a lado: como se faz o vinho do Porto, porque diferem os estilos e como o pedir em qualquer lado a partir de hoje.",
      includes: "3 Portos: branco, ruby, tawny · a nossa seleção de queijos",
      alt: "Vitral iluminado numa cave de vinho do Porto às escuras",
    },
  },
  {
    slug: "port-top",
    name: "TOP Port Selection",
    category: "Port",
    description:
      "Some Ports we keep coming back to — not because they're expensive, but because they say something. A white, a tawny and a Vintage: one of each great style, chosen from our permanent list.",
    includes: "3 Ports: white, tawny, Vintage · our cheese selection",
    price: "€72",
    duration: "90–120 min",
    image: imgTopPort,
    alt: "Port pipes aging under a lantern in a dark cellar, black and white",
    pt: {
      name: "Seleção TOP de Vinho do Porto",
      category: "Vinho do Porto",
      description: "Há Portos a que voltamos sempre — não por serem caros, mas porque dizem alguma coisa. Um branco, um tawny e um Vintage: um de cada grande estilo, escolhidos da nossa lista permanente.",
      includes: "3 Portos: branco, tawny, Vintage · a nossa seleção de queijos",
      alt: "Pipas de vinho do Porto a envelhecer sob uma lanterna numa cave escura, a preto e branco",
    },
  },
  {
    slug: "dreamy-ports",
    name: "Ports from Heaven",
    category: "Port · rare",
    description:
      "The same three styles — white, tawny and Vintage — from much older, rarer bottles. Port as only time can make it.",
    includes: "3 Ports: old white, old tawny, old Vintage · our cheese selection",
    price: "€210",
    duration: "90–120 min",
    image: imgDreamyPorts,
    alt: "Forrester's 1843 engraved Map of the Wine District of the Alto-Douro",
    pt: {
      name: "Portos Divinos",
      category: "Vinho do Porto · raro",
      description: "Os mesmos três estilos — branco, tawny e Vintage — em garrafas muito mais antigas e raras. O vinho do Porto como só o tempo o sabe fazer.",
      includes: "3 Portos: branco velho, tawny velho, Vintage antigo · a nossa seleção de queijos",
      alt: "Mapa gravado do Distrito Vinhateiro do Alto Douro, de Forrester (1843)",
    },
  },
];
