"use server";

import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { getDb, nowIso } from "@/lib/db/client";
import { flashUrl } from "@/lib/admin/urls";

/**
 * Marks a supplier payout as paid. The rule from the blueprint: pay suppliers only after the customer has paid
 * in full and the service is complete — an override must be ticked deliberately.
 */
export async function markPayoutPaid(id: string, formData: FormData) {
  await requireAdmin();
  const db = await getDb();
  if (!db) redirect("/admin");
  const payout = await db.first<{ booking_id: string | null; status: string }>("SELECT booking_id, status FROM supplier_payouts WHERE id = ?", id);
  if (!payout || payout.status === "paid") redirect("/admin/payouts");

  const booking = payout.booking_id ? await db.first<{ status: string; payment_status: string }>("SELECT status, payment_status FROM bookings WHERE id = ?", payout.booking_id) : null;
  const ready = booking?.payment_status === "paid" && booking?.status === "completed";
  if (!ready && formData.get("override") !== "on") {
    redirect(flashUrl("/admin/payouts", "err", "Not ready: the customer has not fully paid or the service is not completed. Tick “pay anyway” only if you are sure."));
  }
  await db.update("supplier_payouts", id, {
    status: "paid",
    paid_at: nowIso(),
    method: String(formData.get("method") ?? "bank_transfer").slice(0, 30),
    reference: String(formData.get("reference") ?? "").trim().slice(0, 120) || null,
  });
  await db.audit("payout_paid", "supplier_payouts", id, { override: !ready });
  redirect(flashUrl("/admin/payouts", "ok", "Payout marked as paid"));
}
