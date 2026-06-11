/* ⚠️ TEMPORARY diagnostic — REMOVE after debugging the dry-run.
   Token-gated. Reveals resOS availability and (optionally) the exact
   error when creating a booking, so we can see why the live booking failed.
   GET /.netlify/functions/debug-resos?token=dogma-diag-7Q2&date=2026-06-13&time=19:00&people=2&book=1
*/
import Stripe from "stripe";
import { checkAvailability, createBooking, cancelBooking, listBookings } from "../lib/resos.mjs";
import { getTasting } from "../lib/tastings.mjs";
import { notifyTelegram } from "../lib/notify.mjs";

export default async (req) => {
  const url = new URL(req.url);
  if (url.searchParams.get("token") !== "dogma-diag-7Q2") {
    return new Response("not found", { status: 404 });
  }
  const date = url.searchParams.get("date") || "2026-06-13";
  const time = url.searchParams.get("time") || "19:00";
  const people = parseInt(url.searchParams.get("people") || "2", 10);
  const out = { date, time, people, hasKey: !!process.env.RESOS_API_KEY };

  // Telegram smoke test: ?notify=1 sends a test message to the configured chat.
  if (url.searchParams.get("notify")) {
    out.telegram = await notifyTelegram("✅ Dogma booking bot — test notification. If you see this, Telegram is wired up.");
    return new Response(JSON.stringify(out, null, 2), {
      status: 200,
      headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
    });
  }

  // Inspect recent Stripe Checkout sessions: did payment complete? metadata intact? refunded?
  if (url.searchParams.get("stripe") === "1") {
    try {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
      const sessions = await stripe.checkout.sessions.list({ limit: 6 });
      out.recentSessions = sessions.data.map((s) => ({
        id: s.id,
        created: new Date(s.created * 1000).toISOString(),
        mode: s.mode,
        payment_status: s.payment_status,
        amount_total: s.amount_total,
        email: s.customer_details?.email || s.customer_email,
        metadata: s.metadata,
        payment_intent: typeof s.payment_intent === "string" ? s.payment_intent : null,
      }));
    } catch (e) {
      out.stripeError = e.message;
    }
    return new Response(JSON.stringify(out, null, 2), {
      status: 200,
      headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
    });
  }

  // List resOS bookings for a date: ?list=YYYY-MM-DD
  const listDate = url.searchParams.get("list");
  if (listDate) {
    try {
      const bookings = await listBookings({
        fromDateTime: `${listDate}T00:00:00.000Z`,
        toDateTime: `${listDate}T23:59:59.000Z`,
      });
      out.bookings = (Array.isArray(bookings) ? bookings : []).map((b) => ({
        id: b._id,
        date: b.date,
        time: b.time,
        people: b.people,
        status: b.status,
        name: b.guest?.name,
        note: b.note,
      }));
    } catch (e) {
      out.listError = { status: e.status, data: e.data, message: e.message };
    }
    return new Response(JSON.stringify(out, null, 2), {
      status: 200,
      headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
    });
  }

  // Cleanup: ?cancel=id1,id2,... cancels throwaway DIAG bookings.
  const cancelIds = url.searchParams.get("cancel");
  if (cancelIds) {
    out.cancelled = {};
    for (const id of cancelIds.split(",").filter(Boolean)) {
      try {
        await cancelBooking(id);
        out.cancelled[id] = "cancelled";
      } catch (e) {
        out.cancelled[id] = { status: e.status, data: e.data };
      }
    }
    return new Response(JSON.stringify(out, null, 2), {
      status: 200,
      headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
    });
  }

  try {
    out.availability = await checkAvailability({ date, time, people });
  } catch (e) {
    out.availabilityError = { name: e.name, message: e.message, status: e.status };
  }

  if (url.searchParams.get("book") === "1") {
    const t = getTasting("wine");
    // Try candidate status values to learn which resOS accepts on insert.
    // "omit" = send no status field (resOS default). Each successful attempt
    // creates a real DIAG booking — they're tagged for easy deletion.
    const candidates = (url.searchParams.get("statuses") || "omit,request,accepted,confirmed,booked,approved").split(",");
    out.statusProbe = {};
    let slot = 0;
    const times = ["19:00", "19:15", "19:30", "19:45", "20:00", "20:15"];
    for (const s of candidates) {
      const useTime = times[slot++ % times.length];
      try {
        const id = await createBooking({
          date,
          time: useTime,
          people,
          durationMin: t.durationMin,
          openingHourId: out.availability?.openingHourId || null,
          guest: { name: `DIAG ${s} (delete me)`, email: "diag@dogmawinebar.com", phone: "+351912925598" },
          note: `DIAG status=${s} — please delete`,
          metadata: { source: "diag" },
          status: s === "omit" ? undefined : s,
        });
        out.statusProbe[s] = { ok: true, time: useTime, bookingId: id };
      } catch (e) {
        out.statusProbe[s] = { ok: false, time: useTime, status: e.status, data: e.data };
      }
    }
  }

  return new Response(JSON.stringify(out, null, 2), {
    status: 200,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
};
