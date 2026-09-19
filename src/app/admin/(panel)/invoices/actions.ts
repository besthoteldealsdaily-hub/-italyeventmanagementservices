"use server";

import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { getDb } from "@/lib/db/client";
import { flashUrl } from "@/lib/admin/urls";

const SDI = ["not_sent", "sent", "delivered", "rejected", "not_required"];

/** Tracks the e-invoice (FatturaPA/SDI) status. The legally valid XML is issued via your accountant or an e-invoicing provider. */
export async function updateSdi(id: string, formData: FormData) {
  await requireAdmin();
  const db = await getDb();
  if (!db) redirect("/admin");
  const status = String(formData.get("sdi_status") ?? "");
  if (!SDI.includes(status)) redirect(flashUrl(`/admin/invoices/${id}`, "err", "Unknown status."));
  await db.update("invoices", id, { sdi_status: status, sdi_id: String(formData.get("sdi_id") ?? "").trim().slice(0, 80) || null });
  await db.audit("invoice_sdi", "invoices", id, { status });
  redirect(flashUrl(`/admin/invoices/${id}`, "ok", "Saved"));
}
