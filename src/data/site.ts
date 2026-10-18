/* ------------------------------------------------------------------
   Global site info — safe to edit. Change text/numbers here and the
   whole site updates. (Structural changes: ask Claude.)
   ------------------------------------------------------------------ */

export const site = {
  name: "Dogma Wine Bar",
  shortName: "Dogma",
  tagline: "A place where the art of great winemakers fills glasses",
  description:
    "Discover Dogma — a wine paradise in Porto's historic centre. Tastings, Port wine, and a curated cellar guided by Portugal's first Master of Port.",
  url: "https://dogmawinebar.com",
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
    tasting: "/bookatasting/",
  },

  social: {
    instagram: "https://www.instagram.com/dogma.wine.bar/",
    instagramHandle: "@dogma.wine.bar",
    facebook: "",
    tripadvisor:
      "https://www.tripadvisor.com/Attraction_Review-g189180-d15224502-Reviews-Dogma_Wine_Bar_Tastings-Porto_Porto_District_Northern_Portugal.html",
    // Verified 2026-10-18: this profile carries Dogma's own address, phone and
    // email, and lists Vasilii. These URLs feed schema.org `sameAs`, which is how
    // a machine confirms the website, the TripAdvisor listing and this profile are
    // one business — so only add a URL you have actually opened and checked.
    starWineList: "https://starwinelist.com/wine-place/dogma-wine-bar",
    // Paste the Google Maps place link here and it joins `sameAs` automatically.
    googleMaps: "",
  },

  // Third-party accolades, used for schema.org `award`. Keep these literal and
  // verifiable — an inflated award is worse than none.
  awards: [
    "Star Wine List of the Year — Newcomer List of the Year, International Open 2024",
  ],

  credits: {
    designer: "Daria Kostiuchenkova",
    designerUrl: "https://www.behance.net/2be8ea1",
  },
};

// Main navigation — only real, live destinations (no "coming soon")
export const nav = [
  { label: "Tastings", href: "/bookatasting/" },
  { label: "Signature Cases", href: "/signature-cases/" },
  { label: "Menu", href: "/menu/" },
  { label: "Services", href: "/services/" },
  { label: "Sommelier", href: "/sommelier/" },
  { label: "Contacts", href: "/contacts/" },
];
