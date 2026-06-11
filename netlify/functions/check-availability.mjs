/* ------------------------------------------------------------------
   POST /api/check-availability
   Body: { date, time, partySize, tastingType }
   → { available: boolean, slots: string[] }   (alternative times)

   Server-side only: validates input, asks resOS whether the slot is
   bookable, and returns just enough for the UI. The API key never
   leaves this function.
   ------------------------------------------------------------------ */

import {
  json,
  preflight,
  pickOrigin,
  isDisallowedOrigin,
  getClientIp,
  rateLimit,
  isValidTime,
  isFutureOrToday,
  clampInt,
} from "../lib/http.mjs";
import { getTasting } from "../lib/tastings.mjs";
import { checkAvailability, ResosError } from "../lib/resos.mjs";

export default async (req, context) => {
  const origin = pickOrigin(req);

  if (req.method === "OPTIONS") return preflight(origin);
  if (req.method !== "POST") return json({ error: "Method not allowed." }, { status: 405, origin });
  if (isDisallowedOrigin(req)) return json({ error: "Forbidden." }, { status: 403, origin });

  const rl = rateLimit(getClientIp(req, context), { max: 20, windowMs: 60_000 });
  if (!rl.ok) return json({ error: "Too many requests — please slow down." }, { status: 429, origin });

  let body;
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid request." }, { status: 400, origin });
  }

  const { date, time, partySize, tastingType, botField } = body || {};

  // Honeypot: real users never fill this.
  if (botField) return json({ error: "Invalid submission." }, { status: 400, origin });

  const tasting = getTasting(tastingType);
  const people = clampInt(partySize);

  const fields = [];
  if (!tasting) fields.push("tastingType");
  if (!isValidTime(time)) fields.push("time");
  if (!isFutureOrToday(date)) fields.push("date");
  if (!Number.isInteger(people)) fields.push("partySize");
  else if (tasting && (people < tasting.minPeople || people > tasting.maxPeople)) fields.push("partySize");
  if (fields.length) return json({ error: "Invalid booking details.", fields }, { status: 400, origin });

  try {
    const result = await checkAvailability({ date, time, people });
    return json({ available: result.available, slots: result.alternativeTimes }, { origin });
  } catch (err) {
    if (err instanceof ResosError && err.rateLimited) {
      return json(
        { error: "We're handling a lot of bookings right now — please try again in a moment." },
        { status: 503, origin }
      );
    }
    console.error("[check-availability]", err?.message);
    return json({ error: "Could not check availability. Please try again." }, { status: 502, origin });
  }
};
