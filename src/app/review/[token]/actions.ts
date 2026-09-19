"use server";

import { redirect } from "next/navigation";
import { getDb, nowIso } from "@/lib/db/client";
import { notifyOwner } from "@/lib/mail";
import { absoluteUrl } from "@/config/site";

export async function submitReview(token: string, formData: FormData) {
  const db = await getDb();
  if (!db) redirect("/");
  const r = await db.first<{ id: string; booking_id: string; rating: number | null }>("SELECT id, booking_id, rating FROM reviews WHERE token = ?", token);
  if (!r) redirect("/");
  const page = `/review/${token}`;
  if (r.rating) redirect(`${page}?done=1`);

  const rating = Number(formData.get("rating"));
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) redirect(`${page}?err=1`);
  const comment = String(formData.get("comment") ?? "").trim().slice(0, 1500);
  await db.update("reviews", r.id, { rating, comment: comment || null, source: "private", created_at: nowIso() });

  // Unhappy customer → tell the owner right away so it can still be put right (service recovery).
  if (rating <= 3) {
    await notifyOwner(`Low review (${rating}/5)`, `${comment || "(no comment)"}\nBooking: ${absoluteUrl(`/admin/bookings/${r.booking_id}`)}`);
    await db.insert("tasks", {
      entity_type: "booking",
      entity_id: r.booking_id,
      kind: "manual",
      title: `Call the customer — they rated the service ${rating}/5`,
      due_at: nowIso().slice(0, 16),
    });
  }
  redirect(`${page}?done=1`);
}
