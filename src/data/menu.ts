/* ------------------------------------------------------------------
   Dogma menus — native, structured content (no Google Drive embeds).
   Rendered as semantic HTML in src/pages/menu.astro so the menu is
   fast, mobile-friendly and indexable by search engines.

   Model
   -----
   Each section is a tab. A section has groups; each group has items.
   An item is one line on the menu:
     • name  — the headline (a wine region, a dish, a tasting tier…)
     • desc  — the secondary line (grape/style, or the Portuguese name)
     • meta  — the tertiary line (vintage · producer, or the scope)
     • price — bare number; the euro/VAT note lives in `notes`

   The menu is generated from "MENU NOVO.numbers" by the weekly Numbers sync
   (Thursdays 17:00). Hand edits to `groups` are overwritten; section headings,
   intros and notes below are editorial and are preserved.
   ------------------------------------------------------------------ */

export interface MenuItem {
  price?: string;
  name: string;
  desc?: string;
  meta?: string;
}

export interface MenuGroup {
  /** English group title, e.g. "White" */
  title?: string;
  /** Portuguese echo of the title, shown in italics, e.g. "brancos" */
  titlePt?: string;
  /** Small sub-label inside a group, e.g. "Lebanon · SEPT Winery (biodynamic)" */
  note?: string;
  items: MenuItem[];
}

export interface MenuSection {
  id: string;
  /** Tab label */
  label: string;
  /** Big heading */
  title: string;
  /** Portuguese echo of the heading */
  titlePt?: string;
  /** One-line intro under the heading */
  intro?: string;
  groups: MenuGroup[];
  /** Footnotes (serving sizes, VAT) */
  notes?: string[];
}

const vatNote =
  "All prices are in euros (€) and include VAT at the legal rate in force.";

export const menuSections: MenuSection[] = [
  /* ----------------------------- TASTINGS ----------------------------- */
  {
    id: "tastings",
    label: "Tastings",
    title: "Tastings",
    titlePt: "provas",
    intro:
      "Guided flights to travel across Portugal — and into Port — one glass at a time.",
    groups: [
      {
        title: "Wine flights",
        titlePt: "provas de vinho",
        items: [
          {
            price: "33",
            name: "VINHO VERDE region's diversity",
            desc: "sparkling · 2 whites · 2 reds",
          },
          {
            price: "42",
            name: "INTRO first \"dive\"",
            desc: "sparkling · rosé · white · red · port [all Portugal]",
          },
          {
            price: "36",
            name: "MEDIUM +",
            desc: "2 whites and 2 reds of medium-high tier of quality [all Portugal]",
            meta: "More whites or more reds? Only whites or only reds? Ask me",
          },
          {
            price: "49",
            name: "TOP",
            desc: "2 whites and 2 reds of high tier of quality [all Portugal]",
            meta: "More whites or more reds? Only whites or only reds? Ask me",
          },
          {
            price: "81",
            name: "ICONIC",
            desc: "2 whites and 2 reds of the best of Portugal",
            meta: "More whites or more reds? Only whites or only reds? Ask me",
          },
        ],
      },
    ],
    notes: [
      "Wine sample 75 ml (2.5 oz) · Port sample 60 ml (2 oz).",
      vatNote,
    ],
  },

  /* ------------------------------- FOOD ------------------------------- */
  {
    id: "food",
    label: "Food",
    title: "Food",
    titlePt: "comida",
    intro: "Small plates made to share, built around what the wine wants.",
    groups: [
      {
        title: "to start",
        titlePt: "para picar algo",
        items: [
          {
            price: "6",
            name: "bread · olives · tomato pesto · virgin extra olive oil",
            desc: "pão · azeite virgem extra · pesto de tomate seco · azeitonas",
          },
          {
            price: "7.5",
            name: "padrón peppers · pimentos padrón",
          },
          {
            price: "6",
            name: "seasonal tomato salad · salada de tomate coração de boi",
          },
        ],
      },
      {
        title: "from our Atlantic",
        titlePt: "do nosso rico mar",
        items: [
          {
            price: "9",
            name: "anchovies, green olives, spicy peppers “gilda” · gilda à Portuguesa",
          },
          {
            price: "9",
            name: "lemon seasoned sardines bruschettas with tartar sauce [ 2 pieces ]",
            desc: "bruschettas com molho tártaro e sardinhas com limão [ 2 uni ]",
          },
          {
            price: "9",
            name: "spiced tomato sardines bruschettas with tomato pesto [ 2 pieces ]",
            desc: "bruschettas com pesto de tomate e sardinhas em tomate picante [ 2 uni ]",
          },
          {
            price: "15",
            name: "grilled season fruit & muxama (salted dry tuna loin) salad",
            desc: "salada de muxama e fruta da época grelhada",
          },
        ],
      },
      {
        title: "warm snacks",
        titlePt: "petiscos quentes",
        items: [
          {
            price: "15",
            name: "clams · white wine · olive oil · butter · garlic · parsley · lemon",
            desc: "amêijoas à Bulhão Pato à nossa maneira",
          },
          {
            price: "9",
            name: "oxtail croquettes · Dijon mustard [ 2 pieces ]",
            desc: "croquetes de rabo de boi com mostarda de Dijon [ 2 uni ]",
          },
        ],
      },
      {
        title: "classics",
        titlePt: "clássicos",
        items: [
          {
            price: "12",
            name: "smoked duck prosciutto · presunto de pato fumado",
          },
          {
            price: "15",
            name: "dry cured ham (ibérico) · min. 30 months of cure",
            desc: "presunto de porco preto alentejano com o mínimo de 30 meses de cura",
          },
          {
            price: "15",
            name: "cheese board · 3 types",
            desc: "tábua de 3 queijos",
          },
          {
            price: "21",
            name: "mixed board · 2 cheese & 2 charcuterie",
            desc: "tábua mista",
          },
        ],
      },
      {
        title: "sweet chapter",
        titlePt: "doces",
        items: [
          {
            price: "4.5",
            name: "red berries sorbet · sorvete de frutos silvestres",
          },
          {
            price: "4.5",
            name: "chocolate mousse · mousse de chocolate",
          },
        ],
      },
    ],
    notes: [vatNote],
  },

  /* -------------------------- WINES BY GLASS -------------------------- */
  {
    id: "wines-by-glass",
    label: "Wines by Glass",
    title: "By the glass",
    titlePt: "a copo",
    intro: "A rotating pour list, always open to a conversation with the sommelier.",
    groups: [
      {
        title: "sparkling",
        titlePt: "espumante",
        items: [
          {
            price: "10",
            name: "Vinho Verde",
            desc: "Alvarinho · brut nature",
            meta: "2022 · Cortinha Velha",
          },
          {
            price: "15",
            name: "Bairrada",
            desc: "Baga · brut",
            meta: "2017 · Caves São Domingos GR",
          },
        ],
      },
      {
        title: "rosé",
        items: [
          {
            price: "15",
            name: "Bairrada",
            desc: "Baga & Pinot Noir",
            meta: "2025 · CSJ Quinta do Poço do Lobo Reserva",
          },
        ],
      },
      {
        title: "white",
        titlePt: "brancos",
        items: [
          {
            price: "9",
            name: "Vinho Verde",
            desc: "Loureiro",
            meta: "2025 · Casa de Nabais",
          },
          {
            price: "15",
            name: "Vinho Verde",
            desc: "Loureiro & Alvarinho",
            meta: "2021 · Tamada GIO C & Luís C",
          },
          {
            price: "17",
            name: "Dão [Lafões]",
            desc: "Arinto & Cercial & DB",
            meta: "2020 · Chão do Vale VV",
          },
          {
            price: "18",
            name: "Douro",
            desc: "Rabigato",
            meta: "2022 · Muxagat Os Xistos Altos",
          },
          {
            price: "38",
            name: "Alentejo",
            desc: "Arinto & Antão Vaz",
            meta: "2023 · Herdade do Sobroso ARCHÉ",
          },
          {
            price: "16",
            name: "Açores",
            desc: "Blend",
            meta: "2023 · Rola Pipa",
          },
        ],
      },
      {
        title: "red",
        titlePt: "tintos",
        items: [
          {
            price: "9",
            name: "Vinho Verde",
            desc: "Blend",
            meta: "2024 · Zafirah",
          },
          {
            price: "18",
            name: "Dão",
            desc: "Blend",
            meta: "2019 · Fugitivo Centenárias",
          },
          {
            price: "24",
            name: "Douro",
            desc: "Blend",
            meta: "2016 · Quinta dos Lagares VV44",
          },
          {
            price: "13",
            name: "Douro",
            desc: "Blend",
            meta: "2019 · Quinta da Devesa VV",
          },
          {
            price: "18",
            name: "Bairrada",
            desc: "Baga",
            meta: "2014 · Vadio Library Release",
          },
          {
            price: "18",
            name: "Tejo",
            desc: "Blend",
            meta: "2015 · Marquesa de Cadaval",
          },
        ],
      },
    ],
    notes: ["Glass 150 ml (5 oz).", vatNote],
  },

  /* --------------------- PORT, FORTIFIED & DRINKS --------------------- */
  {
    id: "port",
    label: "Port & Other Drinks",
    title: "Port",
    titlePt: "vinho do Porto",
    intro: "Poured by Portugal’s first Master of Port — from extra-dry whites to old tawnies.",
    groups: [
      {
        title: "Port",
        titlePt: "vinho do Porto",
        items: [
          {
            price: "6",
            name: "Extra Dry White",
            meta: "Casa Santa Eufêmia",
          },
          {
            price: "9",
            name: "Extra Dry White",
            meta: "Manoella 10 Years Old",
          },
          {
            price: "15",
            name: "Dry White",
            meta: "Dalva 20 Years Old",
          },
          {
            price: "9",
            name: "Tawny",
            meta: "DR Agri-Roncão 10 Years Old",
          },
          {
            price: "18",
            name: "Tawny",
            meta: "Quinta da Gaivosa 20 Years Old",
          },
          {
            price: "27",
            name: "Tawny",
            meta: "Vieira de Sousa Colheita · Bottled 2025",
          },
          {
            price: "60",
            name: "Tawny",
            meta: "Messias 50 Years Old",
          },
          {
            price: "15",
            name: "Ruby Vintage",
            meta: "Quinta do Crasto · 2000",
          },
          {
            price: "18",
            name: "Ruby Vintage",
            meta: "Pintas · 2016",
          },
          {
            price: "21",
            name: "Ruby Vintage",
            meta: "Quinta do Javali · 2016",
          },
        ],
      },
      {
        title: "Other fortified wines",
        titlePt: "fortificados",
        items: [
          {
            price: "12",
            name: "Carcavelos DOC",
            meta: "Villa Oeiras Superior · ~ 15 YO",
          },
          {
            price: "21",
            name: "Moscatel de Setúbal DOC",
            meta: "Horácio Simões Excellent Roxo · ~ 20 YO",
          },
          {
            price: "39",
            name: "Madeira DOP",
            desc: "Cercial · Dry",
            meta: "D’Oliveiras Frasqueira",
          },
          {
            price: "39",
            name: "Verdelho Medium Dry Madeira DOP",
            meta: "D’Oliveiras Frasqueira",
          },
        ],
      },
      {
        title: "Soft drinks & beer",
        titlePt: "bebidas e cerveja",
        items: [
          {
            price: "3",
            name: "still water 0,75L",
            meta: "Vitalis grande",
          },
          {
            price: "3",
            name: "sparkling water 0,75L",
            meta: "Pedras grande",
          },
          {
            price: "3",
            name: "tonic water",
            meta: "Água tónica",
          },
          {
            price: "4.5",
            name: "peach & ginger soda",
            meta: "WHY NOT · Pêssego & gengibre",
          },
          {
            price: "4.5",
            name: "pomegranate & cucumber soda",
            meta: "WHY NOT · Romã & pepino",
          },
          {
            price: "6",
            name: "beer of the moment",
            meta: "Cerveja do momento",
          },
        ],
      },
    ],
    notes: ["Port and fortified wines 60 ml per glass.", vatNote],
  },

  /* -------------------------- WINES BY BOTTLE ------------------------- */
  {
    id: "wines-by-bottle",
    label: "Wines by Bottle",
    title: "Bottles",
    titlePt: "garrafas",
    intro: "The full cellar — Dogma exclusives, Portugal end to end, and a Lebanese chapter.",
    groups: [
      {
        title: "DOGMA ORIGINALS",
        titlePt: "exclusivos",
        items: [
          {
            price: "36",
            name: "France (Limoux)",
            desc: "Blend · brut",
            meta: "NV · Domaine B&B",
          },
          {
            price: "64",
            name: "Lebanon (Zahleh)",
            desc: "Obeideh",
            meta: "2022 · SEPT (white wine)",
          },
          {
            price: "48",
            name: "Lebanon (Zahleh)",
            desc: "Obeideh Skin Contact",
            meta: "2022 · SEPT (white wine)",
          },
          {
            price: "48",
            name: "Lebanon (Nehla)",
            desc: "Merweh",
            meta: "2022 · SEPT (white wine)",
          },
          {
            price: "99",
            name: "Lebanon (Riyaq)",
            desc: "Viognier",
            meta: "2022 · SEPT (white wine) · 1500 ml",
          },
          {
            price: "120",
            name: "Lebanon (Maytouba)",
            desc: "Zitani",
            meta: "2022 · SEPT (white wine)",
          },
          {
            price: "69",
            name: "Lebanon (Eddeh, Batroun)",
            desc: "Grenache",
            meta: "2022 · SEPT (red wine)",
          },
          {
            price: "60",
            name: "Lebanon (North Bekaa)",
            desc: "Cab Sauv & Tempranillo",
            meta: "2021 · SEPT (red wine)",
          },
          {
            price: "81",
            name: "Moldova (Codru)",
            desc: "Riesling",
            meta: "2021 · Chateau Vartely (ice wine) · 375 ml",
          },
        ],
      },
      {
        title: "sparkling",
        titlePt: "espumantes",
        items: [
          {
            price: "40",
            name: "Vinho Verde",
            desc: "Alvarinho · brut nature",
            meta: "2022 · Cortinha Velha",
          },
          {
            price: "60",
            name: "Távora Varosa",
            desc: "MF & Gouveio · brut",
            meta: "2011 · Casa Santa Eufêmia",
          },
          {
            price: "60",
            name: "Bairrada",
            desc: "Baga · brut",
            meta: "2017 · Caves São Domingos GR",
          },
          {
            price: "60",
            name: "Távora Varosa",
            desc: "TN & MF & Cercial · brut",
            meta: "2017 · Família HEHN Reserva",
          },
        ],
      },
      {
        title: "rosé",
        items: [
          {
            price: "60",
            name: "Bairrada",
            desc: "Baga & Pinot Noir",
            meta: "2025 · CSJ Quinta do Poço do Lobo Reserva",
          },
          {
            price: "48",
            name: "Alentejo",
            desc: "TN & Tinta Míuda",
            meta: "2023 · Torre de Palma",
          },
        ],
      },
      {
        title: "white",
        titlePt: "brancos",
        items: [
          {
            price: "36",
            name: "Vinho Verde",
            desc: "Alvarinho",
            meta: "2024 · Casa do Capitão Mor",
          },
          {
            price: "132",
            name: "Vinho Verde",
            desc: "Alvarinho",
            meta: "2021 · Granito CRU (Luís Seabra) · 1500 ml",
          },
          {
            price: "60",
            name: "Vinho Verde",
            desc: "Loureiro & Alvarinho",
            meta: "2021 · Tamada by GC & LC",
          },
          {
            price: "36",
            name: "Vinho Verde",
            desc: "Loureiro",
            meta: "2025 · Casa de Nabais",
          },
          {
            price: "72",
            name: "Douro",
            desc: "Rabigato",
            meta: "2022 · Muxagat Os Xistos Altos",
          },
          {
            price: "156",
            name: "Douro",
            desc: "Rabigato",
            meta: "2019 · Eremitas Antão do Deserto · 1500 ml",
          },
          {
            price: "68",
            name: "Dão · Lafões DOP",
            desc: "Arinto & Cercial & DB",
            meta: "2020 · Chão do Vale VV",
          },
          {
            price: "44",
            name: "Dão",
            desc: "Encruzado",
            meta: "2025 · Quinta do Perdigão",
          },
          {
            price: "60",
            name: "Lisboa",
            desc: "Arinto",
            meta: "2023 · Baías e Enseadas",
          },
          {
            price: "100",
            name: "Lisboa · Colares DOC",
            desc: "Malvasia de Colares",
            meta: "2012 · Casal Santa Maria · 500 ml",
          },
          {
            price: "152",
            name: "Alentejo",
            desc: "Arinto & Antão Vaz",
            meta: "2023 · Herdade do Sobroso ARCHÉ",
          },
          {
            price: "64",
            name: "Açores",
            desc: "Blend",
            meta: "2023 · Rola Pipa",
          },
        ],
      },
      {
        title: "red",
        titlePt: "tintos",
        items: [
          {
            price: "36",
            name: "Vinho Verde",
            desc: "Blend",
            meta: "2024 · Zafirah",
          },
          {
            price: "48",
            name: "Vinho Verde",
            desc: "Padeiro",
            meta: "2023 · Villa Seara",
          },
          {
            price: "72",
            name: "Vinho Verde",
            desc: "Alvarelhão",
            meta: "2020 · Aphros Ouranos",
          },
          {
            price: "72",
            name: "Dão",
            desc: "Blend",
            meta: "2019 · Fugitivo Centenárias",
          },
          {
            price: "90",
            name: "Dão",
            desc: "Alfrocheiro",
            meta: "2019 · MONO A (first edition)",
          },
          {
            price: "60",
            name: "Dão",
            desc: "Blend",
            meta: "2021 · Revela (first edition)",
          },
          {
            price: "96",
            name: "Douro",
            desc: "Blend",
            meta: "2016 · Quinta dos Lagares VV44",
          },
          {
            price: "210",
            name: "Douro",
            desc: "Blend",
            meta: "2017 · Chryseia",
          },
          {
            price: "72",
            name: "Bairrada",
            desc: "Baga",
            meta: "2014 · Vadio Library Release",
          },
          {
            price: "44",
            name: "Bairrada",
            desc: "Baga",
            meta: "2019 · Sidónio de Sousa Reserva",
          },
          {
            price: "96",
            name: "Bairrada",
            desc: "Baga",
            meta: "2009 · Quinta da Vacariça Garrafeira",
          },
          {
            price: "52",
            name: "Douro",
            desc: "Blend",
            meta: "2019 · Quinta da Devesa VV",
          },
          {
            price: "72",
            name: "Tejo",
            desc: "Blend",
            meta: "2015 · Marquesa de Cadaval",
          },
          {
            price: "84",
            name: "Setúbal · Palmela DOC",
            desc: "Castelão",
            meta: "2016 · Quinta do Piloto Col. da Fam.",
          },
          {
            price: "171",
            name: "Alentejo",
            desc: "AB & TN & Petit Verdot",
            meta: "2021 · Zambujeiro",
          },
          {
            price: "72",
            name: "Alentejo",
            desc: "Moreto",
            meta: "2024 · Maquete Talha",
          },
          {
            price: "60",
            name: "Alentejo",
            desc: "Tinta Miúda",
            meta: "2021 · Herdade Grande",
          },
        ],
      },
    ],
    notes: [vatNote],
  },
];
