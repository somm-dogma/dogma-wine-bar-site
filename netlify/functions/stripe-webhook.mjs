/* ------------------------------------------------------------------
   POST /.netlify/functions/stripe-webhook   (set this URL in Stripe)
   Stripe → us, on `checkout.session.completed`.

   Verifies the Stripe signature, then creates the resOS booking for
   the now-paid session. Idempotent (won't double-book on retries).
   If the slot was lost between payment and here, the charge is
   refunded automatically so nobody pays without a table.

   Needs env: STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, RESOS_API_KEY.
   ------------------------------------------------------------------ */

import Stripe from "stripe";
import { createBooking, checkAvailability } from "../lib/resos.mjs";
import { getTasting } from "../lib/tastings.mjs";

export default async (req) => {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });

  const sig = req.headers.get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!sig || !secret || !stripeKey) {
    console.error("[stripe-webhook] missing signature or env");
    return new Response("Webhook not configured", { status: 500 });
  }

  const stripe = new Stripe(stripeKey);
  const raw = await req.text(); // raw body required for signature verification

  let event;
  try {
    event = stripe.webhooks.constructEvent(raw, sig, secret);
  } catch (err) {
    console.error("[stripe-webhook] bad signature:", err?.message);
    return new Response("Invalid signature", { status: 400 });
  }

  if (event.type !== "checkout.session.completed") {
    return new Response("ignored", { status: 200 });
  }

  const session = event.data.object;
  const m = session.metadata || {};

  // Only act on paid tasting sessions.
  if (session.payment_status !== "paid" || m.kind !== "tasting") {
    return new Response("ok", { status: 200 });
  }

  const piId = typeof session.payment_intent === "string" ? session.payment_intent : null;

  try {
    // Idempotency: if we already booked this payment, stop.
    let pi = null;
    if (piId) {
      pi = await stripe.paymentIntents.retrieve(piId);
      if (pi.metadata?.resosBookingId) {
        return new Response("already-booked", { status: 200 });
      }
    }

    const people = parseInt(m.people, 10);
    const tasting = getTasting(m.tastingType);

    // ⚠️ TEMP (dry-run only — REMOVE after testing): booking with the guest name
    // "__DOGMA_REFUND_TEST__" forces the "slot lost after payment" branch so we can
    // verify the auto-refund fires. It only ever triggers a refund (safe direction).
    const FORCE_CONFLICT = m.name === "__DOGMA_REFUND_TEST__";

    // Re-check the slot is still free now that payment cleared.
    const avail = FORCE_CONFLICT
      ? { available: false, openingHourId: null }
      : await checkAvailability({ date: m.date, time: m.time, people });
    if (!avail.available) {
      if (piId) await stripe.refunds.create({ payment_intent: piId });
      console.error(`[stripe-webhook] slot lost after payment; refunded session ${session.id}`);
      return new Response("refunded", { status: 200 });
    }

    const bookingId = await createBooking({
      date: m.date,
      time: m.time,
      people,
      durationMin: tasting?.durationMin || 120,
      openingHourId: avail.openingHourId || m.openingHourId || null,
      guest: {
        name: m.name,
        email: session.customer_details?.email || session.customer_email,
        phone: m.phone,
      },
      note: `Tasting: ${m.label} — ${people} guest(s) · paid €${(session.amount_total / 100).toFixed(
        2
      )} via Stripe`,
      metadata: { source: "website-tasting", tastingType: m.tastingType, stripeSessionId: session.id },
      status: "confirmed",
    });

    // Mark as processed so retries don't double-book.
    if (piId) {
      await stripe.paymentIntents.update(piId, {
        metadata: { ...(pi?.metadata || {}), resosBookingId: bookingId || "created" },
      });
    }

    console.log(`[stripe-webhook] resOS booking ${bookingId} created for session ${session.id}`);
    return new Response("booked", { status: 200 });
  } catch (err) {
    console.error(`[stripe-webhook] booking failed for session ${session.id}:`, err?.message);
    // Don't leave the customer charged with no booking.
    try {
      if (piId) await stripe.refunds.create({ payment_intent: piId });
    } catch (refundErr) {
      console.error("[stripe-webhook] refund also failed:", refundErr?.message);
    }
    // Return 200 so Stripe doesn't retry into duplicate side-effects; handled + logged.
    return new Response("error-handled", { status: 200 });
  }
};
