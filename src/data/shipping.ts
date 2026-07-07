/* ------------------------------------------------------------------
   Shipping data for Dogma Signature Cases.
   Source: IberoMail 2026 tables (4 PDFs, verified against source):
     - Serviço Garrafeira Europa (ges6826)      → EUROPA_TABLE / EUROPA_ZONE
     - Serviço Garrafeiras Reino Unido (gks0126) → UK_TABLE
     - Serviço Aéreo Garrafeiras EUA (gps0126)   → US_AEREA_TABLE
     - Serviço Encomenda Postal (gms2526)        → POSTAL_TABLE / POSTAL_ZONE

   Precedence (see calculateShipping): UK → US-air → Europa → Postal →
   consultation. A country present in more than one source table is
   routed by that order (Europa road is cheapest for continental EU).

   Must stay in sync with netlify/lib/shipping.mjs (server authority).
   ------------------------------------------------------------------ */

// ─── Price tables (EUR) ─────────────────────────────────────────────────────

/** Europa Garrafeira. Index = zone - 1 (z1→[0] … z4→[3]).
 *  null = no tabled rate → custom quote. */
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

/** UK Garrafeira (weight tiers → bottle counts; 18+ exceeds the 20 kg tier). */
export const UK_TABLE: Record<number, number | null> = {
   6: 46.10,
  12: 71.60,
  18:  null, 24: null, 30: null, 36: null, 42: null, 48: null,
};

/** US air freight (Serviço Aéreo EUA). Covers the full 6–48 range (up to 75 kg).
 *  Note: Alaska/Hawaii carry a +€40 per-6-bottles surcharge and Puerto Rico has
 *  no service — neither is distinguishable at country level, so the sommelier
 *  handles those cases manually on the follow-up. */
export const US_AEREA_TABLE: Record<number, number> = {
   6: 119.00,
  12: 172.00,
  18: 255.00,
  24: 338.00,
  30: 424.00,
  36: 538.00,
  42: 598.00,
  48: 689.00,
};

/** Postal Garrafeiras (Resto do Mundo). Index = zone - 1.
 *  null row = exceeds 30 kg IberoMail postal limit (max tier is 18 bottles). */
export const POSTAL_TABLE: Record<number, (number | null)[] | null> = {
   6:  [52.00,  66.00, 115.00, 126.00],
  12:  [82.00, 110.00, 200.00, 243.00],
  18: [124.00, 168.00, 306.00, 319.00],
  24: null, 30: null, 36: null, 42: null, 48: null,
};

// ─── Zone mappings ──────────────────────────────────────────────────────────

/**
 * Europa zone (1–4) per country (ges6826).
 * Z1: ES · Z2: DE AT BE DK SK SI FR NL HU IT LT LU PL CZ ·
 * Z3: BG HR EE FI GR IE RO SE · Z4: IS RS.
 * (Norway/Switzerland/UK/islands are excluded from this table.)
 */
export const EUROPA_ZONE: Record<string, 1 | 2 | 3 | 4> = {
  ES: 1,
  AT: 2, BE: 2, CZ: 2, DE: 2, DK: 2, FR: 2, HU: 2,
  IT: 2, LT: 2, LU: 2, NL: 2, PL: 2, SI: 2, SK: 2,
  BG: 3, EE: 3, FI: 3, GR: 3, HR: 3, IE: 3, RO: 3, SE: 3,
  IS: 4, RS: 4,
};

/** Countries served by the dedicated UK table (gks0126). */
export const UK_COUNTRY_CODES = new Set(["GB"]);

/** Countries served by the US air table (gps0126). */
export const US_AEREA_CODES = new Set(["US"]);

/**
 * Postal zone (1–4) per country (gms2526 "Países por Zonas", verified).
 * Only the countries offered in the dropdown are listed; the PDF has more.
 * Europa/UK-covered countries are omitted here — precedence routes them first.
 * Z1: NO CH · Z2: TR CY MT AL MD UA · Z3: Americas + Middle East + most of
 * Africa · Z4: East/South/SE Asia + Oceania.
 */
export const POSTAL_ZONE: Record<string, 1 | 2 | 3 | 4> = {
  // Zone 1 — Europe outside the road table
  NO: 1, CH: 1,
  // Zone 2
  TR: 2, CY: 2, MT: 2, AL: 2, MD: 2, UA: 2,
  // Zone 3 — Americas
  US: 3, CA: 3, MX: 3, BR: 3, AR: 3, CO: 3, PE: 3, EC: 3, UY: 3, VE: 3, CR: 3, PA: 3,
  // Zone 3 — Middle East
  AE: 3, SA: 3, QA: 3, KW: 3, BH: 3, OM: 3, IL: 3, JO: 3, LB: 3,
  // Zone 3 — Africa
  MA: 3, TN: 3, DZ: 3, EG: 3, ZA: 3, NG: 3, GH: 3, SN: 3, AO: 3, MZ: 3, KE: 3,
  // Zone 4 — Asia + Oceania
  IN: 4, JP: 4, CN: 4, KR: 4, HK: 4, SG: 4, TW: 4, TH: 4, MY: 4, VN: 4, ID: 4,
  AU: 4, NZ: 4,
};

// ─── Calculation ─────────────────────────────────────────────────────────────

export type ShippingResult =
  | { kind: "price"; price: number; tableType: "europa" | "uk" | "us-air" | "postal"; zone: number }
  | { kind: "consultation" };

export function calculateShipping(countryCode: string, bottles: number): ShippingResult {
  if (UK_COUNTRY_CODES.has(countryCode)) {
    const price = UK_TABLE[bottles] ?? null;
    if (price !== null) return { kind: "price", price, tableType: "uk", zone: 0 };
    return { kind: "consultation" };
  }

  if (US_AEREA_CODES.has(countryCode)) {
    const price = US_AEREA_TABLE[bottles] ?? null;
    if (price !== null) return { kind: "price", price, tableType: "us-air", zone: 0 };
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
  // Europe — Postal table (Norway/Switzerland/etc.)
  { code: "NO", name: "Norway" },
  { code: "CH", name: "Switzerland" },
  { code: "CY", name: "Cyprus" },
  { code: "MT", name: "Malta" },
  { code: "AL", name: "Albania" },
  { code: "MD", name: "Moldova" },
  { code: "UA", name: "Ukraine" },
  // Americas — US via air, rest via Postal
  { code: "US", name: "United States" },
  { code: "CA", name: "Canada" },
  { code: "MX", name: "Mexico" },
  { code: "BR", name: "Brazil" },
  { code: "AR", name: "Argentina" },
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
