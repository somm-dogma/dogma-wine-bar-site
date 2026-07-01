/* ------------------------------------------------------------------
   Server-authoritative shipping calculator for Signature Cases.
   Source: IberoMail 2026 tables.
   Must stay in sync with src/data/shipping.ts.
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

const POSTAL_ZONE = {
  US: 1, CA: 1, MX: 1, MA: 1, DZ: 1, TN: 1,
  BR: 2, AR: 2, CL: 2, CO: 2, EC: 2, PE: 2, PY: 2, UY: 2, VE: 2, CR: 2, PA: 2,
  AO: 2, CV: 2, GQ: 2, GW: 2, MZ: 2, ST: 2,
  GH: 2, NG: 2, SN: 2, CI: 2, CM: 2,
  EG: 3, KE: 3, TZ: 3, ZA: 3, ET: 3, UG: 3,
  AE: 3, BH: 3, IL: 3, JO: 3, KW: 3, LB: 3, OM: 3, QA: 3, SA: 3, TR: 3,
  BD: 3, IN: 3, LK: 3, PK: 3,
  ID: 3, MY: 3, PH: 3, TH: 3, VN: 3,
  AU: 4, NZ: 4,
  CN: 4, HK: 4, JP: 4, KR: 4, MO: 4, SG: 4, TW: 4,
};

/** Returns { kind:"price", price } or { kind:"consultation" }. */
export function calculateShipping(countryCode, bottles) {
  if (UK_COUNTRIES.has(countryCode)) {
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
