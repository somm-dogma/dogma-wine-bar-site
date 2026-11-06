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
  image: ImageMetadata;
  alt: string;
  /** European-Portuguese copy. Names stay as set by Vasilii (fixed). */
  pt: Pick<Tasting, "category" | "description" | "includes" | "alt">;
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
      "Often mistaken for a single style, Vinho Verde is actually a diverse region — fresh, vibrant, and surprisingly varied.",
    includes: "Five samples: sparkling, two whites, two reds. Served with snacks of our selection.",
    price: "€51",
    duration: "90–120 min",
    image: imgVinhoVerde,
    alt: "Map of the Vinho Verde sub-regions of northern Portugal",
    pt: {
      category: "Branco · Vinho Verde",
      description: "Muitas vezes confundido com um só estilo, o Vinho Verde é, na verdade, uma região diversa — fresca, vibrante e surpreendentemente variada.",
      includes: "Cinco amostras: espumante, dois brancos, dois tintos. Servidas com petiscos à nossa escolha.",
      alt: "Mapa das sub-regiões do Vinho Verde, no norte de Portugal",
    },
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
    pt: {
      category: "Prova de vinhos",
      description: "Portugal produz hoje alguns dos vinhos mais entusiasmantes da Europa. Esta prova é uma seleção cuidada de garrafas verdadeiramente excecionais.",
      includes: "Quatro amostras: dois brancos, dois tintos. Servidas com petiscos à nossa escolha.",
      alt: "Rolhas de vinho de produtores de todo o mundo, dispostas em grelha sobre fundo preto",
    },
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
    pt: {
      category: "Prova de vinhos",
      description: "Descubra os vinhos que construíram a reputação de Portugal — ousados, expressivos e enraizados em séculos de tradição vinícola.",
      includes: "Quatro amostras: dois brancos, dois tintos. Servidas com petiscos à nossa escolha.",
      alt: "Estátua de bronze de um timoneiro português contra o céu do Porto",
    },
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
    pt: {
      category: "Vinho do Porto",
      description: "Uma viagem guiada pelos estilos essenciais do vinho do Porto — dos brancos secos aos tawnies envelhecidos e aos rubies encorpados. Pensada para quem descobre o Porto pela primeira vez, com contexto, contraste e sem atalhos.",
      includes: "Três amostras, servidas com a nossa seleção de queijos.",
      alt: "Vitral iluminado numa cave de vinho do Porto às escuras",
    },
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
    pt: {
      category: "Vinho do Porto",
      description: "Há Portos a que volto sempre. Não por serem caros — mas porque dizem alguma coisa. Esta é uma pequena seleção de garrafas que conquistaram um lugar permanente na minha lista. Venha prová-las comigo.",
      includes: "Três amostras, servidas com a nossa seleção de queijos.",
      alt: "Pipas de vinho do Porto a envelhecer sob uma lanterna numa cave escura, a preto e branco",
    },
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
    pt: {
      category: "Vinho do Porto · raro",
      description: "Uma prova extraordinária de Portos verdadeiramente excecionais, escolhidos e apresentados pessoalmente pelo primeiro Master of Port de Portugal.",
      includes: "Três amostras, servidas com a nossa seleção de queijos.",
      alt: "Mapa gravado do Distrito Vinhateiro do Alto Douro, de Forrester (1843)",
    },
  },
];
