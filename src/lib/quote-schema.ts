import { z } from "zod";
import { SERVICE_OPTIONS, type ServiceValue } from "./quote-options";

const serviceValues = SERVICE_OPTIONS.map((o) => o.value) as [ServiceValue, ...ServiceValue[]];

const optionalText = (max = 300) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((v) => (v && v.length > 0 ? v : undefined));

const optionalInt = z
  .string()
  .trim()
  .optional()
  .transform((v) => (v && v.length > 0 ? Number(v) : undefined))
  .pipe(z.number("Please enter a number").int("Please enter a whole number").min(0).max(5000).optional());

export const quoteSchema = z.object({
  service: z.enum(serviceValues, "Please choose a service"),
  name: z.string().trim().min(2, "Please enter your name").max(120),
  email: z.string().trim().toLowerCase().pipe(z.email("Please enter a valid email")).pipe(z.string().max(200)),
  phone: optionalText(40),
  company: optionalText(160),
  country: optionalText(80),

  pickup: optionalText(200),
  dropoff: optionalText(200),
  date: optionalText(20),
  time: optionalText(10),
  flight: optionalText(20),
  passengers: optionalInt,
  luggage: optionalText(60),
  vehicle: optionalText(40),

  rooms: optionalInt,
  nights: optionalInt,
  budget: optionalText(80),

  message: optionalText(2000),

  consent: z.literal("on", "Please confirm so we can contact you about this request"),

  // Spam traps
  website: optionalText(200), // honeypot — must stay empty
  startedAt: optionalText(20),
});

export type QuoteInput = z.infer<typeof quoteSchema>;
