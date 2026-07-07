/* ------------------------------------------------------------------
   Server-authoritative shipping calculator for Signature Cases.
   Source: IberoMail 2026 tables (verified against the 4 source PDFs).
   Must stay in sync with src/data/shipping.ts.

   Precedence: UK → US-air → Europa → Postal → consultation.
   ------------------------------------------------------------------ */

const EUROPA_TABLE = {
   6: [24.40, 34.10, 43.90, 76.50],
  12: [34.10, 43.90, 63.40, 92.60],
  18: [43.90, 60.80, 81.50,  null],
  24: [49.20, 63.20, 95.10,  null],
  30: [64.90, 85.30, 128.00, null],
  36: [69.60, 92.10, 142.70, null],
  42: [ null,  null,  null,  null],
  48: [ null,  null,  null,  null],
};

const UK_TABLE = {
   6: 46.10,
  12: 71.60,
  18: null, 24: null, 30: null, 36: null, 42: null, 48: null,
};

// US air freight (Serviço Aéreo EUA) — covers the full 6–48 range.
const US_AEREA_TABLE = {
   6: 119.00,
  12: 172.00,
  18: 255.00,
  24: 338.00,
  30: 424.00,
  36: 538.00,
  42: 598.00,
  48: 689.00,
};

const POSTAL_TABLE = {
   6:  [52.00,  66.00, 115.00, 126.00],
  12:  [82.00, 110.00, 200.00, 243.00],
  18: [124.00, 168.00, 306.00, 319.00],
  24: null, 30: null, 36: null, 42: null, 48: null,
};

const EUROPA_ZONE = {
  ES: 1,
  AT: 2, BE: 2, CZ: 2, DE: 2, DK: 2, FR: 2, HU: 2,
  IT: 2, LT: 2, LU: 2, NL: 2, PL: 2, SI: 2, SK: 2,
  BG: 3, EE: 3, FI: 3, GR: 3, HR: 3, IE: 3, RO: 3, SE: 3,
  IS: 4, RS: 4,
};

const UK_COUNTRIES = new Set(["GB"]);
const US_AEREA_COUNTRIES = new Set(["US"]);

const POSTAL_ZONE = {
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

/** Returns { kind:"price", price } or { kind:"consultation" }. */
export function calculateShipping(countryCode, bottles) {
  if (UK_COUNTRIES.has(countryCode)) {
    const price = UK_TABLE[bottles] ?? null;
    if (price !== null) return { kind: "price", price, tableType: "uk", zone: 0 };
    return { kind: "consultation" };
  }

  if (US_AEREA_COUNTRIES.has(countryCode)) {
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
