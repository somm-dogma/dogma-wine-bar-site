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
      "Often mistaken for a single style, Vinho Verde is actually a diverse region — fresh, vibrant, and surprisingly varied. One table, one hour: Monday to Saturday at 16:30.",
    includes: "Five samples: sparkling, two whites, two reds. Still or sparkling water, and a few simple nibbles on the table.",
    price: "€36",
    duration: "90–120 min",
    fixedTime: "16:30",
    image: imgVinhoVerde,
    alt: "Map of the Vinho Verde sub-regions of northern Portugal",
    pt: {
      name: "Vinho Verde, Além das Expectativas",
      category: "Branco · Vinho Verde",
      description: "Muitas vezes confundido com um só estilo, o Vinho Verde é, na verdade, uma região diversa — fresca, vibrante e surpreendentemente variada. Uma mesa, uma hora: de segunda a sábado, às 16h30.",
      includes: "Cinco amostras: espumante, dois brancos, dois tintos. Água lisa ou com gás e alguns aperitivos simples na mesa.",
      alt: "Mapa das sub-regiões do Vinho Verde, no norte de Portugal",
    },
  },
  {
    slug: "portugal-in-magnum",
    name: "Portugal in Magnum",
    category: "Wine flight · evening",
    description:
      "Five Portuguese wines that change with what we open — often from magnum, sometimes double magnum. Here the wine comes first and the food follows it. One table, one evening: Monday to Saturday at 19:00.",
    includes: "Five samples: one sparkling, two whites, two reds — each with a snack of its own. Make it dinner: more generous portions, +€24 per person.",
    price: "€90",
    duration: "90–120 min",
    fixedTime: "19:00",
    upgradePrice: 24,
    image: imgTopWine,
    alt: "A grid of wine corks from estates around the world on black",
    pt: {
      name: "Portugal em Magnum",
      category: "Prova de vinhos · ao fim do dia",
      description: "Cinco vinhos portugueses que mudam com o que abrimos — muitas vezes em magnum, por vezes em duplo magnum. Aqui, o vinho vem primeiro e a comida segue-o. Uma mesa, um serão: de segunda a sábado, às 19h00.",
      includes: "Cinco amostras: um espumante, dois brancos, dois tintos — cada uma com o seu petisco. Versão jantar: porções mais generosas, +24 € por pessoa.",
      alt: "Rolhas de vinho de produtores de todo o mundo, dispostas em grelha sobre fundo preto",
    },
  },
  {
    slug: "icons",
    name: "Icons of Portugal",
    category: "Wine flight · private",
    description:
      "Discover the wines that shaped Portugal's reputation — bold, expressive, and deeply rooted in centuries of winemaking tradition. A private tasting for your party alone, at the hour you choose.",
    includes: "Six samples, with still or sparkling water. Served with snacks of our selection.",
    price: "€180",
    duration: "90–120 min",
    image: imgIcons,
    alt: "Bronze statue of a Portuguese helmsman against the sky in Porto",
    pt: {
      name: "Ícones de Portugal",
      category: "Prova de vinhos · privada",
      description: "Descubra os vinhos que construíram a reputação de Portugal — ousados, expressivos e enraizados em séculos de tradição vinícola. Uma prova privada, só para o seu grupo, à hora que escolher.",
      includes: "Seis amostras, com água lisa ou com gás. Servidas com petiscos à nossa escolha.",
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
      name: "Introdução ao Vinho do Porto",
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
      name: "Seleção TOP de Vinho do Porto",
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
      name: "Portos Divinos",
      category: "Vinho do Porto · raro",
      description: "Uma prova extraordinária de Portos verdadeiramente excecionais, escolhidos e apresentados pessoalmente pelo primeiro Master of Port de Portugal.",
      includes: "Três amostras, servidas com a nossa seleção de queijos.",
      alt: "Mapa gravado do Distrito Vinhateiro do Alto Douro, de Forrester (1843)",
    },
  },
];
