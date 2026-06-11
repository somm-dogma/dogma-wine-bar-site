/* ------------------------------------------------------------------
   Thin server-side client for the resOS API v1.2.
   Base URL + auth + endpoints confirmed from the official Postman
   collection (see project notes). The API key is read from the
   RESOS_API_KEY env var and NEVER leaves the server.

   Auth: HTTP Basic, API key as username, empty password →
         Authorization: Basic base64(KEY + ":")
   ------------------------------------------------------------------ */

const BASE = "https://api.resos.com/v1";
const TZ = "Europe/Lisbon";

export class ResosError extends Error {
  constructor(message, { status, rateLimited = false, data = null } = {}) {
    super(message);
    this.name = "ResosError";
    this.status = status;
    this.rateLimited = rateLimited;
    this.data = data;
  }
}

function authHeader() {
  const key = process.env.RESOS_API_KEY;
  if (!key) throw new ResosError("RESOS_API_KEY is not configured", { status: 500 });
  const token = Buffer.from(`${key}:`).toString("base64");
  return `Basic ${token}`;
}

async function resosFetch(path, { method = "GET", body, query } = {}) {
  let url = `${BASE}${path}`;
  if (query) {
    const qs = new URLSearchParams(query).toString();
    url += `?${qs}`;
  }
  const res = await fetch(url, {
    method,
    headers: {
      Authorization: authHeader(),
      Accept: "application/json",
      ...(body ? { "Content-Type": "application/json" } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (res.status === 429) {
    throw new ResosError("resOS rate limit reached", { status: 429, rateLimited: true });
  }

  const text = await res.text();
  let data;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!res.ok) {
    const msg =
      (data && (data.message || data.error || data.reason)) ||
      `resOS request failed (${res.status})`;
    throw new ResosError(String(msg), { status: res.status, data });
  }
  return data;
}

/**
 * Bookable time slots for a date + party size.
 * GET /bookingFlow/times?date=&people= → array of opening-hour objects,
 * each with availableTimes[] (local restaurant time).
 * Returns { times: string[], openingHourByTime: Map<time, openingHourId> }.
 */
export async function getAvailableTimes({ date, people }) {
  const data = await resosFetch("/bookingFlow/times", {
    query: { date, people: String(people) },
  });
  const times = [];
  const openingHourByTime = new Map();
  if (Array.isArray(data)) {
    for (const oh of data) {
      for (const t of oh.availableTimes || []) {
        if (!openingHourByTime.has(t)) {
          openingHourByTime.set(t, oh._id);
          times.push(t);
        }
      }
    }
  }
  times.sort();
  return { times, openingHourByTime };
}

/**
 * Is this exact date/time/party bookable? Returns
 * { available, openingHourId, alternativeTimes }.
 */
export async function checkAvailability({ date, time, people }) {
  const { times, openingHourByTime } = await getAvailableTimes({ date, people });
  const available = openingHourByTime.has(time);
  return {
    available,
    openingHourId: available ? openingHourByTime.get(time) : null,
    alternativeTimes: times,
  };
}

/**
 * Create a booking. We let resOS assign the table (same as its own
 * booking widget) by not pinning tableIds. Returns the booking id.
 */
export async function createBooking({
  date,
  time,
  people,
  durationMin,
  openingHourId,
  guest,
  note,
  comment,
  metadata,
  referrer,
  status = "confirmed",
}) {
  const payload = {
    date,
    time,
    people,
    duration: durationMin,
    status,
    source: "website",
    languageCode: "en",
    guest: {
      name: guest.name,
      email: guest.email,
      phone: guest.phone,
      notificationEmail: true,
      notificationSms: false,
    },
    ...(openingHourId ? { openingHourId } : {}),
    ...(note ? { note } : {}),
    ...(comment ? { comment } : {}),
    ...(metadata ? { metadata } : {}),
    ...(referrer ? { referrer } : {}),
  };
  const id = await resosFetch("/bookings", { method: "POST", body: payload });
  // resOS returns the new booking id as a bare JSON string.
  return typeof id === "string" ? id : id?._id || id?.id || null;
}

export { TZ };
