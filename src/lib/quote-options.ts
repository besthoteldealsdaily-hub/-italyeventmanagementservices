/** Shared (client + server) constants and types for the quote form. No zod here, so the client bundle stays small. */

export const SERVICE_OPTIONS = [
  { value: "transfer", label: "Airport / city-to-city transfer" },
  { value: "chauffeur", label: "Private chauffeur (hourly / full day)" },
  { value: "wedding", label: "Wedding guest logistics" },
  { value: "group", label: "Group transport (minivan / minibus / coach)" },
  { value: "hotel-block", label: "Group hotel accommodation / room block" },
  { value: "event", label: "Corporate event / MICE logistics" },
  { value: "tour", label: "Private tour or day trip" },
  { value: "trade", label: "Trade account (agency / planner / event agency)" },
  { value: "supplier", label: "Supplier application (I provide transport, hotels, venues…)" },
  { value: "other", label: "Something else" },
] as const;

export type ServiceValue = (typeof SERVICE_OPTIONS)[number]["value"];

export interface QuoteFormState {
  status: "idle" | "success" | "error";
  message?: string;
  reference?: string;
  fieldErrors?: Record<string, string>;
  /** Echoed back on error so the form keeps what the user typed. */
  values?: Record<string, string>;
}

export function isServiceValue(v: string | undefined): v is ServiceValue {
  return SERVICE_OPTIONS.some((o) => o.value === v);
}
