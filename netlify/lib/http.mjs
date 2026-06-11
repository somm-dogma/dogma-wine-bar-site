/* ------------------------------------------------------------------
   Shared helpers for the booking Functions: CORS locked to our own
   domain, JSON responses, input validation, and a best-effort
   per-IP rate limit.

   Note on the rate limit: serverless instances are ephemeral and not
   shared, so this Map is per-instance — it slows obvious spam but is
   not a hard global guarantee. It mainly protects the resOS rate
   limit and raises the cost of trivial abuse. A durable limiter would
   need an external store (out of scope for this batch).
   ------------------------------------------------------------------ */

const ALLOWED_ORIGINS = new Set([
  "https://www.dogmawinebar.com",
  "https://dogmawinebar.com",
  "https://dogma-wine-bar.netlify.app",
  "http://localhost:4321",
  "http://localhost:4330",
  "http://localhost:8888", // netlify dev
]);

export function pickOrigin(req) {
  const origin = req.headers.get("origin") || "";
  return ALLOWED_ORIGINS.has(origin) ? origin : "";
}

/** True when the request comes from an origin we don't recognise. */
export function isDisallowedOrigin(req) {
  const origin = req.headers.get("origin");
  // No Origin header → same-origin navigation or server-to-server; allow.
  if (!origin) return false;
  return !ALLOWED_ORIGINS.has(origin);
}

function corsHeaders(origin) {
  const h = {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    Vary: "Origin",
  };
  if (origin) {
    h["Access-Control-Allow-Origin"] = origin;
    h["Access-Control-Allow-Methods"] = "POST, OPTIONS";
    h["Access-Control-Allow-Headers"] = "Content-Type";
    h["Access-Control-Max-Age"] = "86400";
  }
  return h;
}

export function json(data, { status = 200, origin = "" } = {}) {
  return new Response(JSON.stringify(data), { status, headers: corsHeaders(origin) });
}

export function preflight(origin) {
  return new Response(null, { status: 204, headers: corsHeaders(origin) });
}

export function getClientIp(req, context) {
  return (
    context?.ip ||
    req.headers.get("x-nf-client-connection-ip") ||
    (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() ||
    "unknown"
  );
}

// --- best-effort per-IP rate limit -------------------------------------------
const hits = new Map(); // ip -> number[] (timestamps, ms)

export function rateLimit(ip, { max, windowMs }) {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < windowMs);
  arr.push(now);
  hits.set(ip, arr);
  // opportunistic cleanup so the Map can't grow unbounded
  if (hits.size > 5000) {
    for (const [k, v] of hits) {
      if (!v.length || now - v[v.length - 1] > windowMs) hits.delete(k);
    }
  }
  if (arr.length > max) {
    return { ok: false, retryAfterMs: windowMs - (now - arr[0]) };
  }
  return { ok: true };
}

// --- validation --------------------------------------------------------------
export function isNonEmptyString(v, max = 500) {
  return typeof v === "string" && v.trim().length > 0 && v.length <= max;
}

export function isValidEmail(v) {
  return typeof v === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) && v.length <= 254;
}

export function isValidPhone(v) {
  // permissive: digits, spaces, +, -, (), 6–20 chars
  return typeof v === "string" && /^[+()\-\s\d]{6,20}$/.test(v);
}

export function isValidDate(v) {
  // YYYY-MM-DD, real calendar date
  if (typeof v !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(v)) return false;
  const d = new Date(v + "T00:00:00Z");
  return !Number.isNaN(d.getTime()) && v === d.toISOString().slice(0, 10);
}

export function isValidTime(v) {
  return typeof v === "string" && /^([01]\d|2[0-3]):[0-5]\d$/.test(v);
}

/** A YYYY-MM-DD that is today or later in Europe/Lisbon. */
export function isFutureOrToday(dateStr) {
  if (!isValidDate(dateStr)) return false;
  const todayLisbon = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Lisbon",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date()); // en-CA → YYYY-MM-DD
  return dateStr >= todayLisbon;
}

export function clampInt(v) {
  const n = Number(v);
  return Number.isInteger(n) ? n : NaN;
}
