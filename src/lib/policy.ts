/**
 * Cancellation / refund policy engine. Mirrors the public page /cancellation-policy exactly —
 * change both together. Percentages are of the amount the customer paid for that line.
 */

export type PolicyKind = "transfer" | "chauffeur" | "group" | "custom";

export function policyKind(serviceType: string | null | undefined): PolicyKind {
  switch (serviceType) {
    case "transfer":
      return "transfer";
    case "chauffeur_day":
      return "chauffeur";
    case "group_transport":
    case "wedding_transport":
      return "group";
    default:
      return "custom"; // hotel, event, venue, catering… follow the supplier terms stated in the quote
  }
}

export const POLICY_TEXT: Record<PolicyKind, string> = {
  transfer: "Transfer: full refund ≥24 h before pick-up · 50% from 24 h to 6 h · none under 6 h or no-show",
  chauffeur: "Chauffeur day: full refund ≥72 h · 50% from 72 h to 24 h · none under 24 h",
  group: "Group / wedding transport: full refund ≥60 days (less the admin fee in the quote) · 50% from 59 to 30 days · none under 30 days",
  custom: "Hotel / event / venue: supplier terms in the quote apply — set the refund manually",
};

export interface RefundRule {
  /** null = cannot be decided automatically */
  percent: number | null;
  band: string;
}

export function refundRule(kind: PolicyKind, hoursBefore: number): RefundRule {
  const h = hoursBefore;
  switch (kind) {
    case "transfer":
      if (h >= 24) return { percent: 100, band: "≥ 24 h before" };
      if (h >= 6) return { percent: 50, band: "24 h – 6 h before" };
      return { percent: 0, band: h >= 0 ? "under 6 h before" : "after the start / no-show" };
    case "chauffeur":
      if (h >= 72) return { percent: 100, band: "≥ 72 h before" };
      if (h >= 24) return { percent: 50, band: "72 h – 24 h before" };
      return { percent: 0, band: "under 24 h before" };
    case "group":
      if (h >= 60 * 24) return { percent: 100, band: "≥ 60 days before (minus admin fee)" };
      if (h >= 30 * 24) return { percent: 50, band: "59 – 30 days before" };
      return { percent: 0, band: "under 30 days before" };
    default:
      return { percent: null, band: "supplier terms — set manually" };
  }
}
