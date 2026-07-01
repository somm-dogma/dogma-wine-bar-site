/* ------------------------------------------------------------------
   POST /api/create-case-checkout
   Body: { categorySlug, bottles, countryCode, name, email, phone,
           comment, consent, botField }
   → { url }  (Stripe hosted Checkout URL)

   Wine price and shipping are computed server-side from the
   authoritative catalogues — the client never sends a price.
   ------------------------------------------------------------------ */

import Stripe from "stripe";
import {
  json, preflight, pickOrigin, isDisallowedOrigin,
  getClientIp, rateLimit, isNonEmptyString, isValidEmail, isValidPhone,
} from "../lib/http.mjs";
import { getCaseCategory, isValidBottleCount, CURRENCY } from "../lib/cases.mjs";
import { calculateShipping } from "../lib/shipping.mjs";

const SITE = process.env.URL || "https://www.dogmawinebar.com";

export default async (req, context) => {
  const origin = pickOrigin(req);
  if (req.method === "OPTIONS") return preflight(origin);
  if (req.method !== "POST")    return json({ error: "Method not allowed." }, { status: 405, origin });
  if (isDisallowedOrigin(req))  return json({ error: "Forbidden." }, { status: 403, origin });

  const rl = rateLimit(getClientIp(req, context), { max: 8, windowMs: 60_000 });
  if (!rl.ok) return json({ error: "Too many requests — please slow down." }, { status: 429, origin });

  if (!process.env.STRIPE_SECRET_KEY) {
    console.error("[create-case-checkout] STRIPE_SECRET_KEY missing");
    return json({ error: "Payment is not configured yet." }, { status: 500, origin });
  }

  let body;
  try { body = await req.json(); }
  catch { return json({ error: "Invalid request." }, { status: 400, origin }); }

  const { categorySlug, bottles, countryCode, name, email, phone, comment, consent, botField } = body || {};

  if (botField) return json({ error: "Invalid submission." }, { status: 400, origin });

  const category = getCaseCategory(categorySlug);
  const bottlesInt = Number.isInteger(bottles) ? bottles : NaN;
  const country = typeof countryCode === "string" && /^[A-Z]{2}$/.test(countryCode) ? countryCode : null;

  const fields = [];
  if (!category)                       fields.push("categorySlug");
  if (!isValidBottleCount(bottlesInt)) fields.push("bottles");
  if (!country)                        fields.push("countryCode");
  if (!isNonEmptyString(name, 120))    fields.push("name");
  if (!isValidEmail(email))            fields.push("email");
  if (!isValidPhone(phone))            fields.push("phone");
  if (consent !== true)                fields.push("consent");
  if (fields.length) return json({ error: "Please check the form and try again.", fields }, { status: 400, origin });

  // Authoritative price calculation
  const wineTotal    = category.pricePerBottle * bottlesInt;
  const shipping     = calculateShipping(country, bottlesInt);

  if (shipping.kind === "consultation") {
    return json(
      { error: "This shipping destination requires a custom quote. Please contact us directly.", consultation: true },
      { status: 400, origin }
    );
  }

  const shippingPrice = shipping.price;
  const commentText   = (typeof comment === "string" ? comment.trim() : "").slice(0, 499);

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: email.trim(),
      line_items: [
        {
          price_data: {
            currency: CURRENCY,
            unit_amount: Math.round(category.pricePerBottle * 100),
            product_data: {
              name: `${category.name} — Dogma`,
              description: `${bottlesInt} bottles, personally curated by Vasilii Grebencea`,
            },
          },
          quantity: bottlesInt,
        },
        {
          price_data: {
            currency: CURRENCY,
            unit_amount: Math.round(shippingPrice * 100),
            product_data: {
              name: "International Shipping",
              description: `IberoMail delivery to ${country}`,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        kind:           "case",
        categorySlug:   category.slug,
        categoryName:   category.name,
        pricePerBottle: String(category.pricePerBottle),
        bottles:        String(bottlesInt),
        countryCode:    country,
        shippingEur:    String(shippingPrice),
        name:           name.trim(),
        phone:          phone.trim(),
        comment:        commentText,
      },
      payment_intent_data: {
        metadata: {
          kind:        "case",
          categorySlug: category.slug,
          bottles:     String(bottlesInt),
          countryCode: country,
        },
      },
      success_url: `${SITE}/case-confirmed?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:  `${SITE}/signature-cases?canceled=1`,
    });

    return json({ url: session.url }, { origin });
  } catch (err) {
    console.error("[create-case-checkout]", err?.message);
    return json({ error: "Could not start checkout. Please try again." }, { status: 502, origin });
  }
};
