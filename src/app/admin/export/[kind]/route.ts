import { isAdmin } from "@/lib/auth";
import { getDb } from "@/lib/db/client";
import { nextMonthStart, todayRome } from "@/lib/dates";

export const dynamic = "force-dynamic";

/** CSV cell: quoted, and neutralised against spreadsheet formula injection. */
function cell(v: unknown): string {
  let s = v === null || v === undefined ? "" : String(v);
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return `"${s.replace(/"/g, '""')}"`;
}
const cents = (v: unknown) => (Number(v ?? 0) / 100).toFixed(2);
const csv = (header: string[], rows: unknown[][]) => [header.map(cell).join(","), ...rows.map((r) => r.map(cell).join(","))].join("\r\n");

export async function GET(req: Request, { params }: { params: Promise<{ kind: string }> }) {
  if (!(await isAdmin())) return new Response("Unauthorized", { status: 401 });
  const db = await getDb();
  if (!db) return new Response("Database not enabled", { status: 503 });

  const { kind } = await params;
  const url = new URL(req.url);
  let body = "";

  if (kind === "invoices") {
    const year = /^\d{4}$/.test(url.searchParams.get("year") ?? "") ? (url.searchParams.get("year") as string) : todayRome().slice(0, 4);
    const rows = await db.all<Record<string, string | number | null>>(
      `SELECT i.*, b.ref AS booking_ref FROM invoices i LEFT JOIN bookings b ON b.id = i.booking_id WHERE i.number LIKE ? ORDER BY i.number`,
      `${year}/%`,
    );
    body = csv(
      ["number", "kind", "date", "customer", "customer_vat", "regime", "net_eur", "vat_eur", "total_eur", "sdi_status", "sdi_id", "booking"],
      rows.map((r) => [r.number, r.kind, r.issued_on, r.customer_name, r.customer_vat, r.vat_regime, cents(r.net_cents), cents(r.vat_cents), cents(r.total_cents), r.sdi_status, r.sdi_id, r.booking_ref]),
    );
  } else if (kind === "payments") {
    const month = /^\d{4}-\d{2}$/.test(url.searchParams.get("month") ?? "") ? (url.searchParams.get("month") as string) : todayRome().slice(0, 7);
    const rows = await db.all<Record<string, string | number | null>>(
      `SELECT p.*, b.ref AS booking_ref FROM payments p JOIN bookings b ON b.id = p.booking_id WHERE p.status = 'paid' AND p.paid_at >= ? AND p.paid_at < ? ORDER BY p.paid_at`,
      `${month}-01`,
      nextMonthStart(`${month}-01`),
    );
    body = csv(["date", "booking", "method", "reference", "amount_eur", "fee_eur"], rows.map((r) => [String(r.paid_at).slice(0, 10), r.booking_ref, r.provider, r.provider_ref, cents(r.amount_cents), cents(r.fee_cents)]));
  } else if (kind === "payouts") {
    const rows = await db.all<Record<string, string | number | null>>(
      `SELECT p.*, s.legal_name, s.vat_id, s.iban, b.ref AS booking_ref FROM supplier_payouts p LEFT JOIN suppliers s ON s.id = p.supplier_id LEFT JOIN bookings b ON b.id = p.booking_id ORDER BY p.due_on`,
    );
    body = csv(
      ["supplier", "vat_id", "iban", "booking", "amount_eur", "due_on", "status", "paid_at", "method", "reference"],
      rows.map((r) => [r.legal_name, r.vat_id, r.iban, r.booking_ref, cents(r.amount_cents), r.due_on, r.status, r.paid_at, r.method, r.reference]),
    );
  } else {
    return new Response("Unknown export", { status: 404 });
  }

  return new Response(`﻿${body}`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${kind}-${todayRome()}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
