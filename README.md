# Italy Event Management Services — website

Next.js (App Router) · TypeScript · Tailwind CSS 4. Domain: **italyeventmanagementservices.com**.

## Run it

```bash
cp .env.example .env.local     # then edit values
npm install
npm run dev                    # http://localhost:3000
npm run lint && npx tsc --noEmit
npm run build:next && npm start   # plain Next.js build; use `npm run build` for the Cloudflare build
```

> `AGENTS.md` (created by Next.js) says this Next version has breaking changes — read
> `node_modules/next/dist/docs/` before changing framework-level code.

## How the site is organised

| Path | What |
|---|---|
| `src/config/site.ts` | Site-wide config. Company/licence details come from env vars and stay **hidden until set**. |
| `src/content/pages/published.ts` | **Live pages** (services, airports, routes, verticals, B2B, city). Only these are routable and in the sitemap. |
| `src/content/pages/stubs.ts` | The rest of the **planned 100 pages** — not routable. |
| `src/content/registry.ts` | Merges both; `getPublishedPage()`; nav helpers never link to unpublished pages. |
| `src/app/[slug]/page.tsx` | One template for every registry page; `dynamicParams = false` → unknown slugs 404. |
| `src/components/RegistryPage.tsx` | Renders facts, inclusions, sections, FAQs; emits Breadcrumb + Service + FAQ JSON-LD. |
| `src/app/page.tsx` | Home. Static pages: `about`, `contact`, `partners`, `vehicles`, `request-a-quote`. |
| `src/app/actions/quote.ts` + `src/lib/leads.ts` | Quote form → validation (zod) → email (Resend) and/or webhook. Honeypot + time trap. |
| `src/app/{sitemap,robots}` + `public/og-image.png` | SEO plumbing. **robots blocks everything until `NEXT_PUBLIC_ALLOW_INDEXING=true`.** The share image is a static PNG on purpose (keeps the Cloudflare Worker small). |
| `db/schema.sql` | Booking-system schema (not wired yet). |

### Publishing a new page
1. Add a full `ContentPage` object with the **same slug** as its stub to `published.ts`.
2. It must contain **unique, real data** (`facts`) — the "no unique data, no page" rule. Set `updated` to today.
3. Link it from related pages via `related: [...]`. Nav/footer pick it up only if you add it in `Header.tsx`.
4. `npm run build` — the page appears in `/sitemap.xml` automatically.

## Deploy on Cloudflare (Workers + OpenNext)

Adapter: `@opennextjs/cloudflare` (supports Next.js 16). Config in the repo: `wrangler.jsonc`, `open-next.config.ts`,
`public/_headers`, `.node-version`. **Use Workers, not Cloudflare Pages.**

**Dashboard settings (the defaults work):**
- Build command: `npm run build` — this runs `opennextjs-cloudflare build` (which builds Next.js itself and creates `.open-next/`)
- Deploy command: `npx wrangler deploy` — Wrangler detects the OpenNext project and runs `opennextjs-cloudflare deploy`
- Root directory: empty (the repo root is the app)
- **Worker name must equal `name` in `wrangler.jsonc`** (currently `italyeventmanagementservices`). If you rename the Worker in the dashboard,
  change both `name` and the `WORKER_SELF_REFERENCE` service in `wrangler.jsonc`.

**Variables**
- **Build variables** (Settings → Build → Variables and secrets): every `NEXT_PUBLIC_*` value from `.env.example` — inlined at build time,
  so changing them needs a new deploy.
- **Runtime variables & secrets** (Settings → Variables and secrets): `RESEND_API_KEY` (secret), `QUOTE_FROM_EMAIL`, `QUOTE_TO_EMAIL`, `LEAD_WEBHOOK_URL`.

**Domain & launch**
- Worker → Settings → Domains & Routes → add `italyeventmanagementservices.com` (domain must use Cloudflare DNS).
- Keep `NEXT_PUBLIC_ALLOW_INDEXING=false` until launch; then set it to `true` and **redeploy**.

**Scripts**
- `npm run build` → OpenNext/Cloudflare build (creates `.open-next/`) · `npm run build:next` → plain `next build`
- `npm run preview` → run the Worker locally (worked on Windows in testing; the real build runs on Linux). Local secrets go in `.dev.vars` (gitignored).

**Troubleshooting**
- *"Service binding 'WORKER_SELF_REFERENCE' references Worker 'web' which was not found"* → the repo had no `wrangler.jsonc`, so Wrangler auto-generated
  one from `package.json`'s name. Make sure the committed `wrangler.jsonc` is on the branch Cloudflare builds.
- *Build succeeds but deploy says the Worker name doesn't match* → align the Worker name in the dashboard and `wrangler.jsonc`.
- Prerendered pages are served from static assets; there is no on-demand revalidation — content changes ship with a redeploy.
- Free-plan Worker limit is 3 MiB compressed; this app is about 1.2 MiB (Wrangler dry run).

## Before you launch (checklist)

**Facts and promises the site makes — make sure operations can keep them**
- [ ] "Reply within 1 hour on business days" (`site.responseSla`)
- [ ] "60 minutes free waiting after landing", "flight tracking", "backup vehicle process", "24/7 dispatch number on every voucher"
- [ ] Route/airport facts on published pages (distances, times) — confirm with your suppliers; update `updated`
- [ ] No prices are published yet (by design) — add "from" prices only from signed supplier rate cards

**Legal**
- [ ] Have a lawyer review the legal pages (privacy, terms, cookies, cancellation) before you start taking bookings — they are complete, but written without legal review
- [ ] Fill company details env vars after the SRL exists
- [ ] Set `NEXT_PUBLIC_AGENCY_LICENSED=true` + authorisation + insurer **only** when the SCIA is filed and insurance is bound (switches JSON-LD to `TravelAgency` and shows the authorisation in the footer)
- [ ] Cookie banner **before** adding GA4/ads (site currently sets no non-technical cookies)

**Go-live**
- [ ] Configure `RESEND_*` and/or `LEAD_WEBHOOK_URL` (production returns an error to the user if neither works — by design)
- [ ] Set `NEXT_PUBLIC_WHATSAPP`, `NEXT_PUBLIC_PHONE`
- [ ] Set `NEXT_PUBLIC_ALLOW_INDEXING=true`, submit `/sitemap.xml` in Search Console
- [ ] Verify the email domain (SPF/DKIM/DMARC) for the sender

## Next build steps (suggested order)
1. **Persist leads** in Postgres (Neon/Supabase, EU region) with Drizzle or Prisma using `db/schema.sql`; keep email/webhook as notifications.
2. **Cloudflare Turnstile** on the quote form + basic rate limiting.
3. **Instant-price widget** for airport/route pages (rate cards → `sell_prices`), quote-to-booking flow, Stripe Checkout + webhook.
4. **Admin** (`/admin`, protected): leads → quotes → bookings → suppliers → payouts.
5. **Analytics + consent**, Google Search Console, GA4 (server-side events for form submits).
6. Remaining pages from `stubs.ts` (start with the highest-value routes, airports and B2B pages), then guides (`/guides/[slug]`), then `/it` and Arabic locales.
