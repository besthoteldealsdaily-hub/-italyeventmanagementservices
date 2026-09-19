/** Money is stored as integer cents everywhere (never floats). */

const fmt = new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR" });

export function eur(cents: number | null | undefined): string {
  return fmt.format((cents ?? 0) / 100);
}

/** "1,234.50" | "1234,5" | 12 → 123450 cents. Invalid → 0. */
export function toCents(v: string | number | null | undefined): number {
  if (v === null || v === undefined || v === "") return 0;
  const n = typeof v === "number" ? v : Number(String(v).trim().replace(/\s/g, "").replace(/,(\d{1,2})$/, ".$1").replace(/,/g, ""));
  return Number.isFinite(n) ? Math.round(n * 100) : 0;
}

/** cents → "1234.50" for form inputs */
export function centsToInput(cents: number | null | undefined): string {
  return ((cents ?? 0) / 100).toFixed(2);
}

export function pct(part: number, whole: number): string {
  if (!whole) return "–";
  return `${((part / whole) * 100).toFixed(1)}%`;
}

/** VAT amount on a net amount, rounded to the cent. */
export function vatOf(netCents: number, ratePercent: number): number {
  return Math.round((netCents * ratePercent) / 100);
}
