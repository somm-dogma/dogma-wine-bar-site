/* ------------------------------------------------------------------
   Menu sections — each embeds a Google Drive PDF live.
   To update a menu, just replace the PDF in Google Drive (keep the
   same file, "anyone with the link can view"). To add/rename a
   section, edit this list. fileId is the part of the Drive URL
   between /d/ and /view.
   ------------------------------------------------------------------ */

export interface MenuSection {
  label: string;
  fileId: string;
}

export const menuSections: MenuSection[] = [
  { label: "Tastings", fileId: "1inR3ReBLNjSzDOvsbMvfFAtzalNQh-ex" },
  { label: "Food", fileId: "11N7jW30W5lHmAlyqTcUOWcagz8xK9ZS4" },
  { label: "Wines by Glass", fileId: "1E7YAbxaoJ3FJLlqSPuo5TaAUKjSaFJHO" },
  { label: "Port & Other Drinks", fileId: "1_i5FATSsD3tFXj_19RNYlSfGK9TQTkQU" },
  { label: "Wines by Bottle", fileId: "1rrvtV5OhfYupS_Ff-aZEXOSukCALdrvS" },
];
