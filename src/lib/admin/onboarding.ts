/**
 * Supplier onboarding checklist (blueprint §7.2 / §7.6). A supplier is "ready" only when every required document
 * is on file, verified with the issuing body, and not expired. Titles of permits vary by region — have your
 * transport lawyer confirm the list for each supplier type.
 */

const NCC = ["ncc_authorisation", "visura_camerale", "durc", "rca_insurance", "passenger_insurance"];
const BUS = ["bus_authorisation", "visura_camerale", "durc", "rca_insurance", "passenger_insurance"];

export const REQUIRED_DOCS: Record<string, string[]> = {
  ncc: NCC,
  minibus: BUS,
  coach: BUS,
  hotel: ["cin", "visura_camerale", "liability_insurance"],
  villa: ["cin", "safety_certificate", "liability_insurance"],
  venue: ["safety_certificate", "liability_insurance"],
  caterer: ["sanitary_registration", "durc", "liability_insurance"],
  guide: ["guide_enrolment", "liability_insurance"],
  av: ["liability_insurance"],
  activity: ["liability_insurance"],
  security: ["liability_insurance", "visura_camerale"],
  hosts: ["liability_insurance", "visura_camerale"],
};
const DEFAULT_DOCS = ["visura_camerale"];

export type DocState = "ok" | "expiring" | "expired" | "unverified" | "missing";

export interface ChecklistRow {
  doc: string;
  state: DocState;
  validTo?: string | null;
}

export function requiredFor(type: string | null | undefined): string[] {
  return REQUIRED_DOCS[type ?? ""] ?? DEFAULT_DOCS;
}

export function checklist(
  type: string | null | undefined,
  docs: { doc_type: string; valid_to: string | null; verified_at: string | null }[],
  today: string,
  in30: string,
): ChecklistRow[] {
  return requiredFor(type).map((doc) => {
    const d = docs.filter((x) => x.doc_type === doc).sort((a, b) => String(b.valid_to ?? "9999").localeCompare(String(a.valid_to ?? "9999")))[0];
    if (!d) return { doc, state: "missing" as const };
    if (d.valid_to && d.valid_to < today) return { doc, state: "expired" as const, validTo: d.valid_to };
    if (!d.verified_at) return { doc, state: "unverified" as const, validTo: d.valid_to };
    if (d.valid_to && d.valid_to <= in30) return { doc, state: "expiring" as const, validTo: d.valid_to };
    return { doc, state: "ok" as const, validTo: d.valid_to };
  });
}
