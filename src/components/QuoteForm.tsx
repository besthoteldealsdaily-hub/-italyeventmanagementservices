"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef, useState } from "react";
import { submitQuote } from "@/app/actions/quote";
import { SERVICE_OPTIONS, type QuoteFormState, type ServiceValue } from "@/lib/quote-options";

const initialState: QuoteFormState = { status: "idle" };

/** Which optional fields are relevant for each service. */
const SHOW = {
  route: ["transfer", "chauffeur", "wedding", "group", "tour", "event", "hotel-block", "trade", "supplier", "other"],
  datetime: ["transfer", "chauffeur", "wedding", "group", "tour", "event", "hotel-block"],
  flight: ["transfer"],
  pax: ["transfer", "chauffeur", "wedding", "group", "tour", "event", "hotel-block"],
  vehicle: ["transfer", "chauffeur", "group", "tour"],
  rooms: ["hotel-block"],
  budget: ["wedding", "group", "tour", "event", "hotel-block", "other"],
} satisfies Record<string, ServiceValue[]>;

const has = (group: keyof typeof SHOW, s: ServiceValue) => (SHOW[group] as readonly string[]).includes(s);

const ROUTE_LABELS: Record<ServiceValue, [string, string]> = {
  transfer: ["Pick-up (airport, station, hotel or address)", "Drop-off"],
  chauffeur: ["Start point", "End point / places to visit"],
  wedding: ["Venue / area", "Hotels guests will stay in"],
  group: ["Pick-up", "Drop-off / route"],
  tour: ["Start point", "Places to visit"],
  event: ["City / venue", "Other locations"],
  "hotel-block": ["City / area", "Preferred hotels (optional)"],
  trade: ["Your main Italy destinations", "Typical group sizes"],
  supplier: ["Cities you cover", "What you provide (vehicles, rooms, venues…)"],
  other: ["Location", "Other details"],
};

const fieldBase =
  "mt-1 block w-full rounded-md border border-line bg-white px-3 py-2.5 text-base text-ink placeholder:text-muted/70 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent";

interface FieldProps {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  min?: number | string;
  values: Record<string, string>;
  errors: Record<string, string>;
}

function Field({ name, label, type = "text", required = false, placeholder, autoComplete, min, values, errors }: FieldProps) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium">
        {label}
        {required && <span className="text-accent"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        min={min}
        defaultValue={values[name] ?? ""}
        aria-invalid={Boolean(errors[name])}
        aria-describedby={errors[name] ? `${name}-error` : undefined}
        className={fieldBase}
      />
      {errors[name] && (
        <p id={`${name}-error`} className="mt-1 text-sm text-red-700">
          {errors[name]}
        </p>
      )}
    </div>
  );
}

export default function QuoteForm({ defaultService = "transfer" }: { defaultService?: ServiceValue }) {
  const [state, formAction, pending] = useActionState(submitQuote, initialState);
  const [service, setService] = useState<ServiceValue>(defaultService);
  const mountedAt = useRef(0);

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  const v = state.values ?? {};
  const err = state.fieldErrors ?? {};
  const [pickupLabel, dropoffLabel] = ROUTE_LABELS[service];

  if (state.status === "success") {
    return (
      <div role="status" className="rounded-xl border border-line bg-white p-8 text-center">
        <p className="font-serif text-2xl font-semibold">Request received</p>
        <p className="mt-3 text-muted">{state.message}</p>
        {state.reference && (
          <p className="mt-4 text-sm">
            Your reference: <span className="rounded bg-sand px-2 py-1 font-mono font-semibold">{state.reference}</span>
          </p>
        )}
        <p className="mt-4 text-sm text-muted">Please keep the reference if you contact us again about this request.</p>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      onSubmit={(e) => {
        const el = e.currentTarget.elements.namedItem("startedAt") as HTMLInputElement | null;
        if (el) el.value = String(mountedAt.current || "");
      }}
      className="space-y-6 rounded-xl border border-line bg-white p-6 sm:p-8"
      noValidate={false}
    >
      {/* Honeypot + time trap */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <input type="hidden" name="startedAt" defaultValue="" />

      {state.status === "error" && state.message && (
        <p role="alert" className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {state.message}
        </p>
      )}

      <div>
        <label htmlFor="service" className="block text-sm font-medium">
          What do you need? <span className="text-accent">*</span>
        </label>
        <select
          id="service"
          name="service"
          required
          value={service}
          onChange={(e) => setService(e.target.value as ServiceValue)}
          className={fieldBase}
        >
          {SERVICE_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        {err.service && <p className="mt-1 text-sm text-red-700">{err.service}</p>}
      </div>

      {has("route", service) && (
        <fieldset className="grid gap-4 sm:grid-cols-2">
          <legend className="sr-only">Trip details</legend>
          <Field values={v} errors={err} name="pickup" label={pickupLabel} />
          <Field values={v} errors={err} name="dropoff" label={dropoffLabel} />
        </fieldset>
      )}

      {has("datetime", service) && (
        <div className="grid gap-4 sm:grid-cols-3">
          <Field values={v} errors={err} name="date" label="Date" type="date" />
          <Field values={v} errors={err} name="time" label="Time" type="time" />
          {has("flight", service) && <Field values={v} errors={err} name="flight" label="Flight number" placeholder="e.g. AZ611" />}
        </div>
      )}

      {(has("pax", service) || has("vehicle", service)) && (
        <div className="grid gap-4 sm:grid-cols-3">
          {has("pax", service) && (
            <Field values={v} errors={err} name="passengers" label={service === "wedding" || service === "event" ? "Guests" : "Passengers"} type="number" min={1} />
          )}
          {has("vehicle", service) && <Field values={v} errors={err} name="luggage" label="Luggage" placeholder="e.g. 4 large, 2 small" />}
          {has("vehicle", service) && (
            <div>
              <label htmlFor="vehicle" className="block text-sm font-medium">
                Vehicle
              </label>
              <select id="vehicle" name="vehicle" defaultValue={v.vehicle ?? ""} className={fieldBase}>
                <option value="">Not sure — advise me</option>
                <option value="sedan">Sedan (up to 3)</option>
                <option value="van">Van (up to 7)</option>
                <option value="minibus">Minibus (16–35)</option>
                <option value="coach">Coach (50+)</option>
                <option value="luxury">Luxury / VIP</option>
              </select>
            </div>
          )}
        </div>
      )}

      {has("rooms", service) && (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field values={v} errors={err} name="rooms" label="Rooms needed" type="number" min={1} />
          <Field values={v} errors={err} name="nights" label="Nights" type="number" min={1} />
        </div>
      )}

      {has("budget", service) && <Field values={v} errors={err} name="budget" label="Budget (optional)" placeholder="e.g. €3,000 total or €150 per room" />}

      <div>
        <label htmlFor="message" className="block text-sm font-medium">
          Anything else we should know?
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          defaultValue={v.message ?? ""}
          placeholder="Special requirements, timeline, accessibility, VIP guests…"
          className={fieldBase}
        />
      </div>

      <div className="grid gap-4 border-t border-line pt-6 sm:grid-cols-2">
        <Field values={v} errors={err} name="name" label="Your name" required autoComplete="name" />
        <Field values={v} errors={err} name="email" label="Email" type="email" required autoComplete="email" />
        <Field values={v} errors={err} name="phone" label="Phone / WhatsApp (recommended)" type="tel" autoComplete="tel" placeholder="+1 555 123 4567" />
        <Field values={v} errors={err} name="company" label="Company / agency (optional)" autoComplete="organization" />
        <Field values={v} errors={err} name="country" label="Country (optional)" autoComplete="country-name" />
      </div>

      <div>
        <label className="flex items-start gap-3 text-sm">
          <input
            type="checkbox"
            name="consent"
            defaultChecked={v.consent === "on"}
            required
            className="mt-1 h-4 w-4 rounded border-line text-accent"
          />
          <span>
            I agree to be contacted about this request. See our{" "}
            <Link href="/privacy" className="underline">
              privacy policy
            </Link>
            .
          </span>
        </label>
        {err.consent && <p className="mt-1 text-sm text-red-700">{err.consent}</p>}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex w-full items-center justify-center rounded-md bg-accent px-6 py-3.5 text-base font-semibold text-white hover:bg-accent-dark disabled:opacity-60 sm:w-auto"
      >
        {pending ? "Sending…" : "Send request"}
      </button>
      <p className="text-xs text-muted">We reply with a fixed quote, usually within the hour on business days.</p>
    </form>
  );
}
