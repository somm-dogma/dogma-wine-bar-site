/* ⚠️ TEMPORARY diagnostic — REMOVE after debugging the dry-run.
   Token-gated. Reveals resOS availability and (optionally) the exact
   error when creating a booking, so we can see why the live booking failed.
   GET /.netlify/functions/debug-resos?token=dogma-diag-7Q2&date=2026-06-13&time=19:00&people=2&book=1
*/
import { checkAvailability, createBooking } from "../lib/resos.mjs";
import { getTasting } from "../lib/tastings.mjs";

export default async (req) => {
  const url = new URL(req.url);
  if (url.searchParams.get("token") !== "dogma-diag-7Q2") {
    return new Response("not found", { status: 404 });
  }
  const date = url.searchParams.get("date") || "2026-06-13";
  const time = url.searchParams.get("time") || "19:00";
  const people = parseInt(url.searchParams.get("people") || "2", 10);
  const out = { date, time, people, hasKey: !!process.env.RESOS_API_KEY };

  try {
    out.availability = await checkAvailability({ date, time, people });
  } catch (e) {
    out.availabilityError = { name: e.name, message: e.message, status: e.status };
  }

  if (url.searchParams.get("book") === "1") {
    const t = getTasting("wine");
    try {
      const id = await createBooking({
        date,
        time,
        people,
        durationMin: t.durationMin,
        openingHourId: out.availability?.openingHourId || null,
        guest: { name: "DIAG TEST (delete me)", email: "diag@dogmawinebar.com", phone: "+351912925598" },
        note: "DIAG TEST booking — please delete",
        metadata: { source: "diag" },
        status: "confirmed",
      });
      out.bookingId = id;
    } catch (e) {
      out.bookingError = { name: e.name, message: e.message, status: e.status, data: e.data };
    }
  }

  return new Response(JSON.stringify(out, null, 2), {
    status: 200,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
};
