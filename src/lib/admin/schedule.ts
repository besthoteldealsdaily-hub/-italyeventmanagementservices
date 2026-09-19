import { addDays } from "@/lib/dates";

/**
 * Default payment schedules by service type (blueprint §21.4). Amounts are integer cents; the last milestone
 * absorbs rounding. Milestones due in the past are clamped to today and merged, so a booking made inside a
 * balance window simply becomes "pay now".
 *
 *   transfers            → 100% now (transfers over €1,500 are treated like chauffeur days)
 *   chauffeur days       → 30% now, balance T−3 days (72 h)
 *   wedding/group        → 30% now, balance T−14 days
 *   events               → 30% now, 40% at T−60 days, 30% at T−14 days
 *   anything else        → settings: deposit % now, balance N days before
 */

export interface Milestone {
  milestone: string;
  due: string;
  amount: number;
}

export type Profile = "transfer" | "chauffeur" | "group" | "event" | "other";

export function profileFor(types: (string | null | undefined)[], gross: number): Profile {
  const t = types.filter((x): x is string => Boolean(x));
  let p: Profile = "other";
  if (t.includes("event")) p = "event";
  else if (t.includes("group_transport") || t.includes("wedding_transport")) p = "group";
  else if (t.includes("chauffeur_day")) p = "chauffeur";
  else if (t.length > 0 && t.every((x) => x === "transfer")) p = "transfer";
  if (p === "transfer" && gross > 150_000) p = "chauffeur";
  return p;
}

export function planSchedule(opts: {
  types: (string | null | undefined)[];
  gross: number;
  start: string | null;
  today: string;
  /** explicit deposit % chosen by the owner (overrides the profile's split) */
  depositPct?: number;
  fallbackDepositPct: number;
  fallbackBalanceDays: number;
}): Milestone[] {
  const { gross, today } = opts;
  if (gross <= 0) return [];
  const start = opts.start ? opts.start.slice(0, 10) : null;
  const at = (daysBefore: number) => {
    if (!start) return today;
    const d = addDays(start, -daysBefore);
    return d < today ? today : d;
  };
  const profile = profileFor(opts.types, gross);
  const balanceDays = profile === "group" || profile === "event" ? 14 : profile === "chauffeur" ? 3 : opts.fallbackBalanceDays;

  const parts: { name: string; share: number; due: string }[] = [];
  const pct = opts.depositPct;
  if (pct !== undefined) {
    if (pct >= 100) parts.push({ name: "Full payment", share: 1, due: today });
    else {
      parts.push({ name: `Deposit ${pct}%`, share: pct / 100, due: today });
      parts.push({ name: "Balance", share: 1 - pct / 100, due: at(balanceDays) });
    }
  } else if (profile === "transfer") {
    parts.push({ name: "Full payment", share: 1, due: today });
  } else if (profile === "event") {
    parts.push({ name: "Deposit 30%", share: 0.3, due: today });
    parts.push({ name: "Instalment 40%", share: 0.4, due: at(60) });
    parts.push({ name: "Final 30%", share: 0.3, due: at(14) });
  } else {
    const dep = profile === "other" ? opts.fallbackDepositPct : 30;
    if (dep >= 100) parts.push({ name: "Full payment", share: 1, due: today });
    else {
      parts.push({ name: `Deposit ${dep}%`, share: dep / 100, due: today });
      parts.push({ name: "Balance", share: 1 - dep / 100, due: at(balanceDays) });
    }
  }

  // Amounts: round each, last one takes the remainder.
  let allocated = 0;
  const rows: Milestone[] = parts.map((p, i) => {
    const amount = i === parts.length - 1 ? gross - allocated : Math.round(gross * p.share);
    allocated += amount;
    return { milestone: p.name, due: p.due, amount };
  });

  // Merge milestones that fall on the same day (e.g. everything is already due).
  const merged: Milestone[] = [];
  for (const r of rows) {
    const last = merged[merged.length - 1];
    if (last && last.due === r.due) {
      last.milestone = `${last.milestone} + ${r.milestone}`;
      last.amount += r.amount;
    } else merged.push({ ...r });
  }
  return merged.filter((m) => m.amount > 0);
}
