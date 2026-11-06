/* ------------------------------------------------------------------
   Portuguese overlay for the menu (/pt/carta/).

   src/data/menu.ts is rewritten weekly by the Numbers sync (groups only),
   so nothing here touches it. This file only supplies what the PT page
   shows *instead of* the English editorial bits: tab labels and intros
   per section id, plus a phrase table for footnotes.

   Footnotes are translated by exact EN text. If the sync ever writes a
   note that is not in `notesPt`, the PT page shows the English original
   rather than a stale translation — add the new line here when it does.
   ------------------------------------------------------------------ */

export const menuPt: Record<string, { label?: string; intro?: string }> = {
  tastings: {
    label: "Provas",
    intro: "Provas guiadas para viajar por Portugal — e pelo vinho do Porto — um copo de cada vez.",
  },
  food: {
    label: "Petiscos",
    intro: "Pratos pequenos para partilhar, pensados à medida do que o vinho pede.",
  },
  "wines-by-glass": {
    label: "Vinhos a copo",
    intro: "Uma lista de vinhos a copo em rotação, sempre aberta a uma conversa com o escanção.",
  },
  port: {
    label: "Porto e outras bebidas",
    intro: "Servido pelo primeiro Master of Port de Portugal — dos brancos extra secos aos tawnies velhos.",
  },
  "wines-by-bottle": {
    label: "Vinhos à garrafa",
    intro: "A garrafeira completa — exclusivos Dogma, Portugal de ponta a ponta e um capítulo libanês.",
  },
};

export const notesPt: Record<string, string> = {
  "All prices are in euros (€) and include VAT at the legal rate in force.":
    "Todos os preços são em euros (€) e incluem IVA à taxa legal em vigor.",
  "Wine sample 75 ml (2.5 oz) · Port sample 60 ml (2 oz).":
    "Amostra de vinho 75 ml · amostra de vinho do Porto 60 ml.",
  "Glass 150 ml (5 oz).": "Copo de 150 ml.",
  "Port and fortified wines 60 ml per glass.": "Vinho do Porto e fortificados: 60 ml por copo.",
};

export const translateNote = (note: string) => notesPt[note] ?? note;
