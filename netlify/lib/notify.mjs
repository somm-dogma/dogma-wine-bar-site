/* ------------------------------------------------------------------
   Telegram notifications for staff.

   Fail-safe: if the bot isn't configured, or Telegram is down, this
   never throws — a notification problem must never break a booking.
   Needs env: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID.
   ------------------------------------------------------------------ */

export async function notifyTelegram(text) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return { ok: false, skipped: "not configured" };

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });
    if (!res.ok) {
      const body = await res.json().catch(() => null);
      console.error("[notify] telegram non-OK:", res.status, body?.description);
      return { ok: false, status: res.status, description: body?.description };
    }
    return { ok: true };
  } catch (e) {
    console.error("[notify] telegram failed:", e?.message);
    return { ok: false, error: e?.message };
  }
}

/** Minimal HTML escape for values interpolated into a parse_mode:HTML message. */
export function esc(s) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
