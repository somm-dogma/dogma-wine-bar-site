/* ------------------------------------------------------------------
   Shipping data for Dogma Signature Cases.
   Source: IberoMail 2026 tables.

   IMPORTANT: POSTAL_ZONE country assignments are approximations based
   on standard Portuguese postal zone conventions. Verify the complete
   list against the IberoMail "Serviço Encomenda Postal Garrafeiras" PDF
   before activating new markets.

   Must stay in sync with netlify/lib/shipping.mjs (server authority).
   ------------------------------------------------------------------ */

// ─── Price tables (EUR) ─────────────────────────────────────────────────────

/** Europa Garrafeira table. Index = zone - 1 (z1→[0], z2→[1], z3→[2], z4→[3]).
 *  null = no tabled rate; requires a custom shipping quote. */
export const EUROPA_TABLE: Record<number, (number | null)[]> = {
   6: [24.40, 34.10, 43.90, 76.50],
  12: [34.10, 43.90, 63.40, 92.60],
  18: [43.90, 60.80, 81.50,  null],
  24: [49.20, 63.20, 95.10,  null],
  30: [64.90, 85.30, 128.00, null],
  36: [69.60, 92.10, 142.70, null],
  42: [ null,  null,  null,  null],
  48: [ null,  null,  null,  null],
};

/** UK Garrafeira table (converted from weight tiers). */
export const UK_TABLE: Record<number, number | null> = {
   6: 46.10,
  12: 71.60,
  18:  null,
  24:  null,
  30:  null,
  36:  null,
  42:  null,
  48:  null,
};

/** Postal Garrafeiras table (Resto do Mundo). Index = zone - 1.
 *  null row = exceeds 30 kg IberoMail limit for postal service. */
export const POSTAL_TABLE: Record<number, (number | null)[] | null> = {
   6:  [52.00,  66.00, 115.00, 126.00],
  12:  [82.00, 110.00, 200.00, 243.00],
  18: [124.00, 168.00, 306.00, 319.00],
  24: null,
  30: null,
  36: null,
  42: null,
  48: null,
};

// ─── Zone mappings ──────────────────────────────────────────────────────────

/**
 * Europa zone (1–4) per country.
 * Zone 1: ES
 * Zone 2: AT BE CZ DE DK FR HU IT LT LU NL PL SI SK
 * Zone 3: BG EE FI GR HR IE RO SE
 * Zone 4: IS RS
 * Excluded (not in table): NO CH — fall through to consultation.
 */
export const EUROPA_ZONE: Record<string, 1 | 2 | 3 | 4> = {
  ES: 1,
  AT: 2, BE: 2, CZ: 2, DE: 2, DK: 2, FR: 2, HU: 2,
  IT: 2, LT: 2, LU: 2, NL: 2, PL: 2, SI: 2, SK: 2,
  BG: 3, EE: 3, FI: 3, GR: 3, HR: 3, IE: 3, RO: 3, SE: 3,
  IS: 4, RS: 4,
};

/** Countries served by the separate UK table. */
export const UK_COUNTRY_CODES = new Set(["GB"]);

/**
 * Postal zone (1–4) for Resto do Mundo countries.
 * APPROXIMATE — verify against IberoMail postal zone PDF.
 */
export const POSTAL_ZONE: Record<string, 1 | 2 | 3 | 4> = {
  // Zone 1: North America + North Africa
  US: 1, CA: 1, MX: 1,
  MA: 1, DZ: 1, TN: 1,
  // Zone 2: Latin America + Portuguese-speaking Africa + West Africa
  BR: 2, AR: 2, CL: 2, CO: 2, EC: 2, PE: 2, PY: 2, UY: 2, VE: 2, CR: 2, PA: 2,
  AO: 2, CV: 2, GQ: 2, GW: 2, MZ: 2, ST: 2,
  GH: 2, NG: 2, SN: 2, CI: 2, CM: 2,
  // Zone 3: Sub-Saharan Africa + Middle East + South/SE Asia
  EG: 3, KE: 3, TZ: 3, ZA: 3, ET: 3, UG: 3,
  AE: 3, BH: 3, IL: 3, JO: 3, KW: 3, LB: 3, OM: 3, QA: 3, SA: 3, TR: 3,
  BD: 3, IN: 3, LK: 3, PK: 3,
  ID: 3, MY: 3, PH: 3, TH: 3, VN: 3,
  // Zone 4: East Asia + Oceania
  AU: 4, NZ: 4,
  CN: 4, HK: 4, JP: 4, KR: 4, MO: 4, SG: 4, TW: 4,
};

// ─── Calculation ─────────────────────────────────────────────────────────────

export type ShippingResult =
  | { kind: "price"; price: number; tableType: "europa" | "uk" | "postal"; zone: number }
  | { kind: "consultation" };

export function calculateShipping(countryCode: string, bottles: number): ShippingResult {
  if (UK_COUNTRY_CODES.has(countryCode)) {
    const price = UK_TABLE[bottles] ?? null;
    if (price !== null) return { kind: "price", price, tableType: "uk", zone: 0 };
    return { kind: "consultation" };
  }

  const europaZone = EUROPA_ZONE[countryCode];
  if (europaZone !== undefined) {
    const row = EUROPA_TABLE[bottles];
    if (!row) return { kind: "consultation" };
    const price = row[europaZone - 1];
    if (price != null) return { kind: "price", price, tableType: "europa", zone: europaZone };
    return { kind: "consultation" };
  }

  const postalZone = POSTAL_ZONE[countryCode];
  if (postalZone !== undefined) {
    const row = POSTAL_TABLE[bottles];
    if (!row) return { kind: "consultation" };
    const price = row[postalZone - 1];
    if (price != null) return { kind: "price", price, tableType: "postal", zone: postalZone };
    return { kind: "consultation" };
  }

  return { kind: "consultation" };
}

// ─── Country list for dropdown ───────────────────────────────────────────────

export interface Country {
  code: string;
  name: string;
}

/** Countries shown in the checkout dropdown, in display order. */
export const COUNTRIES: Country[] = [
  { code: "PT", name: "Portugal" },
  // Europe — IberoMail Garrafeira Europa table
  { code: "ES", name: "Spain" },
  { code: "FR", name: "France" },
  { code: "DE", name: "Germany" },
  { code: "NL", name: "Netherlands" },
  { code: "BE", name: "Belgium" },
  { code: "LU", name: "Luxembourg" },
  { code: "IT", name: "Italy" },
  { code: "AT", name: "Austria" },
  { code: "PL", name: "Poland" },
  { code: "CZ", name: "Czech Republic" },
  { code: "SK", name: "Slovakia" },
  { code: "HU", name: "Hungary" },
  { code: "SI", name: "Slovenia" },
  { code: "DK", name: "Denmark" },
  { code: "SE", name: "Sweden" },
  { code: "FI", name: "Finland" },
  { code: "IE", name: "Ireland" },
  { code: "GR", name: "Greece" },
  { code: "RO", name: "Romania" },
  { code: "BG", name: "Bulgaria" },
  { code: "HR", name: "Croatia" },
  { code: "EE", name: "Estonia" },
  { code: "LT", name: "Lithuania" },
  { code: "IS", name: "Iceland" },
  { code: "RS", name: "Serbia" },
  // Europe — separate UK table
  { code: "GB", name: "United Kingdom" },
  // Europe — not in any current table (consultation)
  { code: "NO", name: "Norway" },
  { code: "CH", name: "Switzerland" },
  { code: "LV", name: "Latvia" },
  { code: "MT", name: "Malta" },
  { code: "CY", name: "Cyprus" },
  { code: "AL", name: "Albania" },
  { code: "BA", name: "Bosnia & Herzegovina" },
  { code: "ME", name: "Montenegro" },
  { code: "MK", name: "North Macedonia" },
  { code: "MD", name: "Moldova" },
  { code: "UA", name: "Ukraine" },
  // Americas
  { code: "US", name: "United States" },
  { code: "CA", name: "Canada" },
  { code: "MX", name: "Mexico" },
  { code: "BR", name: "Brazil" },
  { code: "AR", name: "Argentina" },
  { code: "CL", name: "Chile" },
  { code: "CO", name: "Colombia" },
  { code: "PE", name: "Peru" },
  { code: "EC", name: "Ecuador" },
  { code: "UY", name: "Uruguay" },
  { code: "VE", name: "Venezuela" },
  { code: "CR", name: "Costa Rica" },
  { code: "PA", name: "Panama" },
  // Middle East
  { code: "AE", name: "United Arab Emirates" },
  { code: "SA", name: "Saudi Arabia" },
  { code: "QA", name: "Qatar" },
  { code: "KW", name: "Kuwait" },
  { code: "BH", name: "Bahrain" },
  { code: "OM", name: "Oman" },
  { code: "IL", name: "Israel" },
  { code: "JO", name: "Jordan" },
  { code: "LB", name: "Lebanon" },
  { code: "TR", name: "Turkey" },
  // Africa
  { code: "MA", name: "Morocco" },
  { code: "TN", name: "Tunisia" },
  { code: "DZ", name: "Algeria" },
  { code: "EG", name: "Egypt" },
  { code: "ZA", name: "South Africa" },
  { code: "NG", name: "Nigeria" },
  { code: "GH", name: "Ghana" },
  { code: "SN", name: "Senegal" },
  { code: "AO", name: "Angola" },
  { code: "MZ", name: "Mozambique" },
  { code: "KE", name: "Kenya" },
  // Asia
  { code: "IN", name: "India" },
  { code: "JP", name: "Japan" },
  { code: "CN", name: "China" },
  { code: "KR", name: "South Korea" },
  { code: "HK", name: "Hong Kong" },
  { code: "SG", name: "Singapore" },
  { code: "TW", name: "Taiwan" },
  { code: "TH", name: "Thailand" },
  { code: "MY", name: "Malaysia" },
  { code: "VN", name: "Vietnam" },
  { code: "ID", name: "Indonesia" },
  // Oceania
  { code: "AU", name: "Australia" },
  { code: "NZ", name: "New Zealand" },
];
