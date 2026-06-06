/* ------------------------------------------------------------------
   Global site info — safe to edit. Change text/numbers here and the
   whole site updates. (Structural changes: ask Claude.)
   ------------------------------------------------------------------ */

export const site = {
  name: "Dogma Wine Bar",
  shortName: "Dogma",
  tagline: "A place where the art of great winemakers fills glasses",
  description:
    "Discover the world of wine at Dogma — a wine paradise in the heart of Porto's historic centre. Tastings, Port wine, and a curated cellar guided by Portugal's first Master of Port.",
  url: "https://www.dogmawinebar.com",
  established: "2023",

  contact: {
    address: "Rua dos Caldeireiros 238",
    postalCode: "4050-139",
    city: "Porto",
    country: "Portugal",
    phone: "+351 912 925 598",
    phoneHref: "tel:+351912925598",
    email: "somm@dogmawinebar.com",
  },

  // Each line shows as "days — time"
  hours: [
    { days: "Monday – Saturday", time: "16:00 – 22:00" },
    { days: "Sunday", time: "Closed" },
  ],

  booking: {
    table: "https://dogma-wine-bar.resos.com/booking",
    tasting: "/bookatasting",
  },

  social: {
    instagram: "https://instagram.com/dogma.wine.bar",
    instagramHandle: "@dogma.wine.bar",
    facebook: "",
  },

  credits: {
    designer: "Daria Kostiuchenkova",
    designerUrl: "https://www.behance.net/2be8ea1",
  },
};

// Main navigation
export const nav = [
  { label: "Menu", href: "/menu" },
  { label: "Sommelier", href: "/sommelier" },
  { label: "Our Services", href: "/#services" },
  { label: "Blog", href: "/#blog" },
  { label: "Contacts", href: "/contacts" },
];
