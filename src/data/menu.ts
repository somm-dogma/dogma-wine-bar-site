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

   To edit the menu, change the text here — the page updates on build.
   PDFs in /public/menu are offered as secondary downloads only.
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
  /** Secondary PDF download (served locally from /public/menu) */
  pdf?: string;
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
            name: "Vinho Verde",
            desc: "5 samples · sparkling · 2 whites · 2 reds",
            meta: "the region’s diversity",
          },
          {
            price: "42",
            name: "Intro",
            desc: "5 samples · sparkling · white · rosé · red · port",
            meta: "the first “dive” · all Portugal",
          },
          {
            price: "36",
            name: "Medium+",
            desc: "4 samples · a careful selection of the medium-high tier of quality",
            meta: "all Portugal",
          },
          {
            price: "49",
            name: "Top",
            desc: "4 samples · a careful selection of the high tier of quality",
            meta: "all Portugal",
          },
          {
            price: "81",
            name: "Iconic",
            desc: "4 samples · a careful selection of the very best of Portugal",
          },
        ],
      },
      {
        title: "Port flights",
        titlePt: "provas de Porto",
        items: [
          {
            price: "30",
            name: "Port · medium+",
            desc: "3 samples · extra dry white · tawny colheita · ruby vintage",
          },
          {
            price: "54",
            name: "Port · top",
            desc: "3 samples · 10 yo extra dry white · tawny 30 yo · ruby vintage",
          },
          {
            price: "81",
            name: "Port · top+",
            desc: "3 samples · 20 yo dry white · tawny +40 yo · ruby vintage",
          },
        ],
      },
    ],
    notes: [
      "Wine sample 75 ml (2.5 oz) · Port sample 60 ml (2 oz).",
      vatNote,
    ],
    pdf: "/menu/tastings.pdf",
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
        title: "To start",
        titlePt: "para picar algo",
        items: [
          {
            price: "6",
            name: "Bread · olives · sun-dried tomato pesto · extra virgin olive oil",
            desc: "pão · azeite virgem extra · pesto de tomate seco · azeitonas",
          },
          {
            price: "7.5",
            name: "Padrón peppers",
            desc: "pimentos padrón",
          },
          {
            price: "6",
            name: "Oxheart tomato salad",
            desc: "salada de tomate coração de boi",
          },
        ],
      },
      {
        title: "From our Atlantic",
        titlePt: "do nosso rico mar",
        items: [
          {
            price: "9",
            name: "Anchovies, green olives & spicy peppers “gilda”",
            desc: "gilda à Portuguesa",
          },
          {
            price: "9",
            name: "Lemon-seasoned sardine bruschettas with tartar sauce",
            desc: "bruschettas com molho tártaro e sardinhas com limão · 2 pieces",
          },
          {
            price: "9",
            name: "Spiced-tomato sardine bruschettas with tomato pesto",
            desc: "bruschettas com pesto de tomate e sardinhas em tomate picante · 2 pieces",
          },
          {
            price: "15",
            name: "Grilled seasonal fruit & muxama salad",
            desc: "salada de muxama e fruta da época grelhada",
          },
        ],
      },
      {
        title: "Warm snacks",
        titlePt: "petiscos quentes",
        items: [
          {
            price: "15",
            name: "Clams · white wine · olive oil · garlic · parsley · lemon",
            desc: "amêijoas à Bulhão Pato a nossa maneira",
          },
          {
            price: "9",
            name: "Oxtail croquettes with Dijon mustard",
            desc: "croquetes de rabo de boi com mostarda de Dijon · 2 pieces",
          },
        ],
      },
      {
        title: "Classics",
        titlePt: "clássicos",
        items: [
          {
            price: "12",
            name: "Smoked duck prosciutto",
            desc: "presunto de pato fumado",
          },
          {
            price: "15",
            name: "Dry-cured ham (ibérico) · min. 30 months of cure",
            desc: "presunto de porco preto alentejano com o mínimo de 30 meses de cura",
          },
          {
            price: "15",
            name: "Cheese board · 3 types",
            desc: "tábua de queijos",
          },
          {
            price: "21",
            name: "Mixed board · 2 cheeses & 2 charcuterie",
            desc: "tábua mista",
          },
        ],
      },
      {
        title: "Desserts",
        titlePt: "doces",
        items: [
          { price: "4.5", name: "Strawberry sorbet", desc: "sorbete de morango" },
          { price: "4.5", name: "Chocolate mousse", desc: "mousse de chocolate" },
        ],
      },
    ],
    notes: [vatNote],
    pdf: "/menu/food.pdf",
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
        title: "Sparkling",
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
            name: "Távora-Varosa",
            desc: "Malvasia Fina & Gouveio · brut",
            meta: "2011 · Casa Santa Eufémia",
          },
        ],
      },
      {
        title: "Rosé",
        titlePt: "rosado",
        items: [
          {
            price: "12",
            name: "Lisboa",
            desc: "Castelão",
            meta: "2025 · Ramilo Nativas",
          },
        ],
      },
      {
        title: "White",
        titlePt: "brancos",
        items: [
          {
            price: "15",
            name: "Vinho Verde",
            desc: "Alvarinho",
            meta: "2023 · Casa Capitão Mor · magnum",
          },
          {
            price: "15",
            name: "Douro",
            desc: "Blend",
            meta: "2022 · Coliseu by Hugo Linton",
          },
          {
            price: "15",
            name: "Dão",
            desc: "Blend",
            meta: "2021 · Quinta das Marias Tonel Reserva",
          },
          {
            price: "36",
            name: "Lisboa",
            desc: "Malvasia de Colares DOC",
            meta: "2021 · Ramilo",
          },
          {
            price: "12",
            name: "Alentejo",
            desc: "Arinto",
            meta: "2021 · Dona Maria",
          },
          {
            price: "15",
            name: "Açores",
            desc: "Arinto dos Açores & Verdelho",
            meta: "2024 · Ínsula Chão de Lava",
          },
        ],
      },
      {
        title: "Red",
        titlePt: "tintos",
        items: [
          {
            price: "12",
            name: "Vinho Verde",
            desc: "Padeiro",
            meta: "2023 · Villa Seara",
          },
          {
            price: "18",
            name: "Dão",
            desc: "Blend",
            meta: "2019 · Fugitivo Vinhas Centenárias",
          },
          {
            price: "11",
            name: "Bairrada",
            desc: "Baga",
            meta: "2019 · Sidónio de Sousa Reserva",
          },
          {
            price: "18",
            name: "Tejo",
            desc: "Blend",
            meta: "2015 · Marquesa de Cadaval",
          },
          {
            price: "18",
            name: "Alentejo",
            desc: "Moreto · clay pot",
            meta: "2024 · Maquete",
          },
          {
            price: "15",
            name: "Lebanon",
            desc: "Cabernet Sauvignon & Tempranillo",
            meta: "2021 · SEPT Winery",
          },
        ],
      },
    ],
    notes: ["Glass 150 ml (5 oz).", vatNote],
    pdf: "/menu/wines-by-glass.pdf",
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
          { price: "6", name: "Extra dry White", meta: "Quinta de Santa Eufémia Reserva" },
          { price: "9", name: "10 years old extra dry White", meta: "Manoella" },
          { price: "15", name: "20 years old dry White", meta: "Dalva" },
          { price: "96", name: "Very very old White · +80 years", meta: "Foz Tua" },
          { price: "9", name: "10 years old Tawny", meta: "DR Agri-Roncão" },
          { price: "18", name: "20 years old Tawny", meta: "Quinta do Crasto" },
          { price: "27", name: "1994 Colheita Tawny", meta: "Vieira de Sousa" },
          { price: "60", name: "50 years old Tawny", meta: "Messias" },
          { price: "15", name: "Ruby Vintage", meta: "Quinta do Grifo · 2013" },
          { price: "21", name: "Ruby Vintage", meta: "Quinta do Javali · 2016" },
          { price: "18", name: "Ruby Vintage", meta: "Pintas · 2016" },
        ],
      },
      {
        title: "Other fortified wines of Portugal",
        titlePt: "fortificados",
        items: [
          { price: "12", name: "Carcavelos Superior DOC", meta: "Villa Oeiras" },
          {
            price: "21",
            name: "Moscatel Roxo de Setúbal DO",
            meta: "Horácio Simões Excellent",
          },
          {
            price: "39",
            name: "Madeira Frasqueira · dry",
            meta: "D’Oliveiras Sercial · 1999",
          },
          {
            price: "39",
            name: "Madeira Frasqueira · medium dry",
            meta: "D’Oliveiras Verdelho · 2000",
          },
        ],
      },
      {
        title: "Soft drinks & beer",
        titlePt: "bebidas e cerveja",
        items: [
          { price: "3", name: "Still water 0.75 L", meta: "Vitalis grande" },
          { price: "3", name: "Sparkling water 0.75 L", meta: "Pedras grande" },
          { price: "3", name: "Tonic water", meta: "água tónica" },
          {
            price: "4.5",
            name: "Peach & ginger craft soda",
            meta: "WHY NOT · pêssego & gengibre",
          },
          {
            price: "4.5",
            name: "Pomegranate & cucumber craft soda",
            meta: "WHY NOT · romã & pepino",
          },
          { price: "6", name: "Beer of the moment", meta: "cerveja do momento" },
        ],
      },
    ],
    notes: ["Port and fortified wines 60 ml per glass.", vatNote],
    pdf: "/menu/port-and-fortified.pdf",
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
        title: "Dogma originals",
        titlePt: "exclusivos",
        items: [
          {
            price: "36",
            name: "France · Limoux",
            desc: "Blend · brut",
            meta: "NV · Domaine B&B",
          },
        ],
      },
      {
        note: "Lebanon · SEPT Winery (biodynamic)",
        items: [
          {
            price: "64",
            name: "Zahleh · 1150 m",
            desc: "Obeideh · white (light orange)",
            meta: "2022",
          },
          {
            price: "48",
            name: "Zahleh · 1150 m",
            desc: "Obeideh skin contact · white (orange)",
            meta: "2022",
          },
          {
            price: "48",
            name: "Nehla · 900–1300 m",
            desc: "Merweh · white (light orange)",
            meta: "2022",
          },
          {
            price: "99",
            name: "Riyaq · 900 m",
            desc: "Viognier · white · magnum",
            meta: "2022",
          },
          {
            price: "120",
            name: "Maytouba · 1300 m",
            desc: "Zitani · white",
            meta: "2022",
          },
          {
            price: "69",
            name: "Edde, Batroun · 350 m",
            desc: "Grenache · red",
            meta: "2022",
          },
          {
            price: "60",
            name: "North Bekaa · 1150 m",
            desc: "Cabernet Sauvignon & Tempranillo · red",
            meta: "2021",
          },
        ],
      },
      {
        title: "Sparkling",
        titlePt: "espumantes",
        items: [
          {
            price: "40",
            name: "Vinho Verde",
            desc: "Alvarinho · brut nature",
            meta: "2022 · Cortinha Velha SR",
          },
          {
            price: "60",
            name: "Távora-Varosa",
            desc: "Malvasia Fina & Gouveio · brut",
            meta: "2011 · Casa Santa Eufémia SR",
          },
          {
            price: "60",
            name: "Távora-Varosa",
            desc: "Blend · brut",
            meta: "2017 · Hehn Reserva",
          },
        ],
      },
      {
        title: "Rosé",
        titlePt: "rosados",
        items: [
          {
            price: "48",
            name: "Lisboa",
            desc: "Castelão",
            meta: "2025 · Ramilo Nativas",
          },
          {
            price: "48",
            name: "Alentejo",
            desc: "Touriga Nacional & Tinta Miúda",
            meta: "2023 · Torre de Palma",
          },
        ],
      },
      {
        title: "White",
        titlePt: "brancos",
        items: [
          {
            price: "120",
            name: "Vinho Verde",
            desc: "Alvarinho · magnum",
            meta: "2023 · Casa Capitão Mor",
          },
          {
            price: "60",
            name: "Vinho Verde",
            desc: "Avesso",
            meta: "2023 · A&D Esculpido",
          },
          {
            price: "132",
            name: "Vinho Verde",
            desc: "Alvarinho · magnum",
            meta: "2021 · Granito Cru (Luís Seabra)",
          },
          {
            price: "60",
            name: "Douro",
            desc: "Blend",
            meta: "2023 · Coliseu by Hugo Linton",
          },
          {
            price: "60",
            name: "Dão",
            desc: "Blend",
            meta: "2021 · Quinta das Marias Tonel Reserva",
          },
          {
            price: "84",
            name: "Dão",
            desc: "Encruzado",
            meta: "2023 · Quinta da Pellada Late Release",
          },
          {
            price: "144",
            name: "Lisboa",
            desc: "Malvasia de Colares DOC",
            meta: "2021 · Ramilo",
          },
          {
            price: "48",
            name: "Alentejo",
            desc: "Arinto",
            meta: "2021 · Dona Maria",
          },
          {
            price: "90",
            name: "Alentejo",
            desc: "Antão Vaz",
            meta: "2021 · Gloria Reynolds",
          },
          {
            price: "100",
            name: "Alentejo",
            desc: "Blend",
            meta: "2022 · Monte Branco",
          },
          {
            price: "60",
            name: "Madeira",
            desc: "Listrão & Caracol",
            meta: "2023 · Colombo by Justino’s",
          },
          {
            price: "60",
            name: "Açores",
            desc: "Arinto dos Açores & Verdelho",
            meta: "2024 · Ínsula Chão de Lava",
          },
          {
            price: "96",
            name: "Açores",
            desc: "Verdelho",
            meta: "2023 · Entre Pedras",
          },
        ],
      },
      {
        title: "Red",
        titlePt: "tintos",
        items: [
          {
            price: "48",
            name: "Vinho Verde",
            desc: "Padeiro",
            meta: "2023 · Villa Seara",
          },
          {
            price: "36",
            name: "Vinho Verde",
            desc: "Blend",
            meta: "2024 · Zafirah by Constantino Ramos",
          },
          {
            price: "36",
            name: "Trás-os-Montes",
            desc: "Blend",
            meta: "2018 · Valpaços Reserva",
          },
          {
            price: "72",
            name: "Dão",
            desc: "Blend",
            meta: "2019 · Fugitivo Vinhas Centenárias",
          },
          {
            price: "90",
            name: "Dão",
            desc: "Alfrocheiro",
            meta: "2019 · MONO A by Luís Seabra",
          },
          {
            price: "60",
            name: "Dão",
            desc: "Blend · first edition",
            meta: "2021 · Revela",
          },
          {
            price: "124",
            name: "Dão",
            desc: "Blend",
            meta: "2016 · M.O.B. Gauvé",
          },
          {
            price: "132",
            name: "Douro",
            desc: "Tinta Roriz",
            meta: "2016 · Quinta do Crasto",
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
            meta: "2011 · Vacariça Tonel 18",
          },
          {
            price: "72",
            name: "Tejo",
            desc: "Blend",
            meta: "2015 · Marquesa de Cadaval",
          },
          {
            price: "84",
            name: "Tejo",
            desc: "Baga",
            meta: "2020 · Pinhal da Torre",
          },
          {
            price: "84",
            name: "Setúbal",
            desc: "Castelão",
            meta: "2021 · Quinta do Piloto Colecção de Família",
          },
          {
            price: "72",
            name: "Alentejo",
            desc: "Moreto · clay pot",
            meta: "2024 · Maquete",
          },
          {
            price: "88",
            name: "Alentejo",
            desc: "Blend",
            meta: "2022 · Herdade do Sobroso Grande Reserva",
          },
        ],
      },
    ],
    notes: [vatNote],
    pdf: "/menu/wines-by-bottle.pdf",
  },
];
