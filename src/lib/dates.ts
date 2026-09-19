/** Business dates are Italian local time (Europe/Rome). Stored as "YYYY-MM-DD" or "YYYY-MM-DDTHH:mm" text. */

export const TZ = "Europe/Rome";

const partsFmt = new Intl.DateTimeFormat("en-CA", {
  timeZone: TZ,
  hourCycle: "h23",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

function parts(d: Date) {
  const p = partsFmt.formatToParts(d);
  const get = (t: string) => Number(p.find((x) => x.type === t)?.value ?? 0);
  return { y: get("year"), mo: get("month"), d: get("day"), h: get("hour"), mi: get("minute"), s: get("second") };
}

const pad = (n: number) => String(n).padStart(2, "0");

/** "YYYY-MM-DD" in Rome right now (or for the given instant). */
export function todayRome(d = new Date()): string {
  const p = parts(d);
  return `${p.y}-${pad(p.mo)}-${pad(p.d)}`;
}

/** "YYYY-MM-DDTHH:mm" in Rome right now. */
export function nowRome(d = new Date()): string {
  const p = parts(d);
  return `${p.y}-${pad(p.mo)}-${pad(p.d)}T${pad(p.h)}:${pad(p.mi)}`;
}

function offsetMin(d: Date): number {
  const p = parts(d);
  const asUtc = Date.UTC(p.y, p.mo - 1, p.d, p.h, p.mi, p.s);
  return Math.round((asUtc - Math.floor(d.getTime() / 1000) * 1000) / 60000);
}

/** Converts a Rome-local "YYYY-MM-DD[THH:mm]" string into the real instant. */
export function romeLocalToDate(local: string): Date {
  const [dPart, tPart = "00:00"] = local.split("T");
  const [y, m, day] = dPart.split("-").map(Number);
  const [hh, mm] = tPart.split(":").map(Number);
  const guess = Date.UTC(y, m - 1, day, hh || 0, mm || 0);
  let inst = guess - offsetMin(new Date(guess)) * 60000;
  inst = guess - offsetMin(new Date(inst)) * 60000;
  return new Date(inst);
}

/** Hours from now until a Rome-local moment (negative when in the past). */
export function hoursUntil(local: string, now = new Date()): number {
  return (romeLocalToDate(local).getTime() - now.getTime()) / 3600_000;
}

/** Adds days to a "YYYY-MM-DD" date. */
export function addDays(date: string, n: number): string {
  const [y, m, d] = date.slice(0, 10).split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d + n));
  return `${dt.getUTCFullYear()}-${pad(dt.getUTCMonth() + 1)}-${pad(dt.getUTCDate())}`;
}

/** Rome-local "YYYY-MM-DDTHH:mm" shifted by a number of hours. */
export function shiftLocal(local: string, hours: number): string {
  return nowRome(new Date(romeLocalToDate(local).getTime() + hours * 3600_000));
}

export function monthStart(date = todayRome()): string {
  return `${date.slice(0, 7)}-01`;
}

export function nextMonthStart(date = todayRome()): string {
  const [y, m] = date.split("-").map(Number);
  return m === 12 ? `${y + 1}-01-01` : `${y}-${pad(m + 1)}-01`;
}

/** "Sat 19 Sep 2026, 14:30" — for admin lists. */
export function fmtDateTime(local: string | null | undefined): string {
  if (!local) return "–";
  const [d, t] = local.split("T");
  const dt = new Date(`${d}T00:00:00Z`);
  const label = dt.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
  return t ? `${label}, ${t.slice(0, 5)}` : label;
}

export function fmtDate(iso: string | null | undefined): string {
  if (!iso) return "–";
  return new Date(iso.length <= 10 ? `${iso}T00:00:00Z` : iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: TZ,
  });
}

/** Whole days from today (Rome) to a date: negative = past. */
export function daysFromToday(date: string): number {
  const a = Date.parse(`${todayRome()}T00:00:00Z`);
  const b = Date.parse(`${date.slice(0, 10)}T00:00:00Z`);
  return Math.round((b - a) / 86400_000);
}

/** "2026-09" shifted by n months. */
export function shiftYm(ym: string, n: number): string {
  const [y, m] = ym.split("-").map(Number);
  const d = new Date(Date.UTC(y, m - 1 + n, 1));
  return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}`;
}
