/* ------------------------------------------------------------------
   POST /api/create-checkout-session
   Body: { name, email, phone, date, time, partySize, tastingType,
           consent, botField }
   → { url }            (Stripe hosted Checkout URL to redirect to)
   → { available:false, slots } if the slot was taken meanwhile.

   The amount is computed here from the server-side catalogue — the
   client never sends a price. The resOS booking is NOT created here;
   it is created by the Stripe webhook once payment succeeds.
   ------------------------------------------------------------------ */

import Stripe from "stripe";
import {
  json,
  preflight,
  pickOrigin,
  isDisallowedOrigin,
  getClientIp,
  rateLimit,
  isNonEmptyString,
  isValidEmail,
  isValidPhone,
  isValidTime,
  isFutureOrToday,
  clampInt,
} from "../lib/http.mjs";
import { getTasting, CURRENCY } from "../lib/tastings.mjs";
import { checkAvailability, ResosError } from "../lib/resos.mjs";

const SITE = process.env.URL || "https://www.dogmawinebar.com";

export default async (req, context) => {
  const origin = pickOrigin(req);

  if (req.method === "OPTIONS") return preflight(origin);
  if (req.method !== "POST") return json({ error: "Method not allowed." }, { status: 405, origin });
  if (isDisallowedOrigin(req)) return json({ error: "Forbidden." }, { status: 403, origin });

  const rl = rateLimit(getClientIp(req, context), { max: 8, windowMs: 60_000 });
  if (!rl.ok) return json({ error: "Too many requests — please slow down." }, { status: 429, origin });

  if (!process.env.STRIPE_SECRET_KEY) {
    console.error("[create-checkout-session] STRIPE_SECRET_KEY missing");
    return json({ error: "Payment is not configured yet." }, { status: 500, origin });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid request." }, { status: 400, origin });
  }

  const { name, email, phone, date, time, partySize, tastingType, consent, botField } = body || {};

  // Honeypot: real users never fill this.
  if (botField) return json({ error: "Invalid submission." }, { status: 400, origin });

  const tasting = getTasting(tastingType);
  const people = clampInt(partySize);

  const fields = [];
  if (!isNonEmptyString(name, 120)) fields.push("name");
  if (!isValidEmail(email)) fields.push("email");
  if (!isValidPhone(phone)) fields.push("phone");
  if (!tasting) fields.push("tastingType");
  if (!isValidTime(time)) fields.push("time");
  if (!isFutureOrToday(date)) fields.push("date");
  if (!Number.isInteger(people)) fields.push("partySize");
  else if (tasting && (people < tasting.minPeople || people > tasting.maxPeople)) fields.push("partySize");
  if (consent !== true) fields.push("consent");
  if (fields.length) return json({ error: "Please check the form and try again.", fields }, { status: 400, origin });

  try {
    // Guard against booking a slot that filled up since the first check.
    const avail = await checkAvailability({ date, time, people });
    if (!avail.available) {
      return json({ available: false, slots: avail.alternativeTimes }, { origin });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const unitAmount = Math.round(tasting.pricePerPerson * 100); // cents

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: email,
      line_items: [
        {
          quantity: people,
          price_data: {
            currency: CURRENCY,
            unit_amount: unitAmount,
            product_data: {
              name: `${tasting.label} — Dogma Wine Bar`,
              description: `${date} at ${time} · ${people} guest(s)`,
            },
          },
        },
      ],
      // Everything the webhook needs to create the resOS booking.
      metadata: {
        kind: "tasting",
        tastingType,
        label: tasting.label,
        date,
        time,
        people: String(people),
        name: name.trim(),
        phone: phone.trim(),
        openingHourId: avail.openingHourId || "",
      },
      payment_intent_data: {
        metadata: { kind: "tasting", tastingType, date, time, people: String(people) },
      },
      success_url: `${SITE}/booking-confirmed?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE}/bookatasting?canceled=1`,
    });

    return json({ url: session.url }, { origin });
  } catch (err) {
    if (err instanceof ResosError && err.rateLimited) {
      return json(
        { error: "We're handling a lot of bookings right now — please try again in a moment." },
        { status: 503, origin }
      );
    }
    console.error("[create-checkout-session]", err?.message);
    return json({ error: "Could not start checkout. Please try again." }, { status: 502, origin });
  }
};
