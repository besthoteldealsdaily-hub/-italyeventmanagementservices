# Italy Event Management Services — website

Next.js (App Router) · TypeScript · Tailwind CSS 4. Domain: **italyeventmanagementservices.com**.

## Run it

```bash
cp .env.example .env.local     # then edit values
npm install
npm run dev                    # http://localhost:3000
npm run lint && npx tsc --noEmit && npm run check:content
npm run build:next && npm start   # plain Next.js build; use `npm run build` for the Cloudflare build
```

> `AGENTS.md` (created by Next.js) says this Next version has breaking changes — read
> `node_modules/next/dist/docs/` before changing framework-level code.

## How the site is organised

The site is **data-driven**: 98 content pages live in `src/content/pages/` and render through one template.
Static pages: `/`, `/about`, `/contact`, `/partners`, `/vehicles`, `/request-a-quote`, `/guides`, and the four legal pages.

| Path | What |
|---|---|
| `src/config/site.ts` | Site-wide config. Company/licence details come from env vars and stay **hidden until set**. |
| `src/config/nav.ts` | Header menus and footer columns (page slugs; only published pages are shown). |
| `src/content/pages/hubs.ts` | Category hubs: `/services`, `/transportation`, `/hotels`, `/destinations`. |
| `src/content/pages/services-transport.ts`, `services-events.ts`, `published.ts` | Service pages (transport, hotels, events, MICE, corporate, weddings, tours, groups, DMC). |
| `src/content/pages/airports.ts` | 8 airport pages. |
| `src/content/pages/routes.ts` | 25 route pages, built with the `route()` helper (distance, drive time, stops, access notes, route-specific advice). |
| `src/content/pages/cities.ts` | City/region hubs (10). Each city page auto-lists every page tagged with its slug. |
| `src/content/pages/verticals.ts` | City × service pages (chauffeur, weddings, MICE, fairs, events). |
| `src/content/pages/industries.ts` | "For …" pages for agencies, planners, event agencies, tour operators, corporates. |
| `src/content/pages/guides.ts` | 10 guides served at `/guides/[slug]`, each with sources. |
| `src/content/registry.ts` | Merges everything; `pathFor()`, related-links logic, tag lookups. Duplicate slugs fail the build. |
| `src/app/[slug]/page.tsx`, `src/app/guides/[slug]/page.tsx` | One template each; `dynamicParams = false` → unknown slugs 404. |
| `src/components/RegistryPage.tsx` | Renders hubs, cities, routes, services, guides; emits Breadcrumb + Service/Article/Collection + FAQ JSON-LD. |
| `src/app/actions/quote.ts` + `src/lib/leads.ts` | Quote form → validation (zod) → email (Resend) and/or webhook. Honeypot + time trap. |
| `src/app/{sitemap,robots}` + `public/og-image.png` | SEO plumbing. **robots blocks everything until `NEXT_PUBLIC_ALLOW_INDEXING=true`.** |
| `scripts/check-content.ts` | Content QA: broken links/slugs, duplicate titles/descriptions, title/description length, orphans. |
| `src/lib/db/` | Cloudflare D1 (SQLite) client + automatic migrations for the operations system (see below). |
| `src/app/admin/` | Password-protected operations panel: leads, quotes, bookings, payments, invoices, suppliers, finance, sales CRM, plan/KPIs. |
| `src/app/{quote,pay,voucher,review}/[token]` | Private customer pages reached by unguessable links (quote acceptance, payment, voucher, feedback). |
| `src/app/api/{price,stripe/webhook}` | Public "from" price lookup for route pages; Stripe webhook (signature-verified). |

### Adding or editing a page
1. Add a `page({...})` (or `route({...})` / `airport({...})`) entry in the right file in `src/content/pages/`.
2. It must carry **unique, real data** (`facts`) — the "no unique data, no page" rule. Set `updated` when you re-check facts.
3. Give it a `parent`, `tags` (destination slugs, so city pages list it) and `related` slugs.
4. Run `npm run check:content` (must pass), then `npm run build`. The page appears in `/sitemap.xml` automatically.

## Operations system (admin panel)

Everything from the business blueprint that is software lives behind `/admin`. **It is switched off until the database is enabled** —
the public site works without it. Full setup guide: **[docs/ADMIN-SETUP.md](docs/ADMIN-SETUP.md)**.

| Area | Where | What it does |
|---|---|---|
| Leads | `/admin/leads` | Website requests stored **before** any email is sent; status, first-response time, notes; supplier/trade applications become suppliers/customers in one click. |
| Quotes | `/admin/quotes` → `/quote/[token]` | Line-item builder (price, VAT, your cost, supplier), internal margin, customer link; the customer accepts online — name, time, IP and terms version are recorded. |
| Bookings | `/admin/bookings` | Created from a quote: lines with supplier/vehicle/driver, payment schedule (deposit/balance), automatic T‑72 h / T‑24 h / T‑3 h / after-service checklist, voucher, review request. |
| Payments | `/pay/[token]`, `/api/stripe/webhook` | Bank-transfer instructions + optional Stripe Checkout; webhook verified with HMAC and idempotent; manual payments and refunds recorded. |
| Cancellations | booking page | Refund suggestion computed from the same rules as the public cancellation policy (`src/lib/policy.ts`), editable; queues the refund, cancels supplier payouts. |
| Invoices | `/admin/invoices` | Sequential numbering per year, VAT regime, SDI status tracking, CSV for the accountant. **Not** the legal e-invoice (see setup guide). |
| Suppliers | `/admin/data/suppliers`, `/admin/documents` | Documents with expiry + verification, per-type onboarding checklist, vehicles, drivers, rate cards, payouts (paid only after the customer paid and the service is complete). |
| Pricing | `/admin/data/routes` | Routes, supplier cost rate cards, sell prices. A **b2c** sell price makes the route/airport page show "Fixed price from €…". |
| Finance | `/admin/finance` | Revenue, margin by service, estimated card fees/commissions/incidents, contribution, result vs your monthly target, receivables/payables. |
| Sales CRM | `/admin/sales` | Daily outreach queue with the blueprint cadence (day 0 → 4 → 9 → 15), daily targets, message templates, opt-out handling. |
| Plan & KPIs | `/admin/plan` | Launch checklist and monthly targets vs real numbers (import from your private `blueprint/seed/*.json`). |

Data model: `src/lib/db/migrations.ts` (money in integer cents, ISO dates, schema changes = new migration appended). Simple record types are
config-driven in `src/lib/admin/entities.ts` — one list/edit page serves them all. **Every admin page and server action calls `requireAdmin()`**
(layouts alone do not protect server actions).

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
- **Runtime variables & secrets** (Settings → Variables and secrets): `RESEND_API_KEY` (secret), `QUOTE_FROM_EMAIL`, `QUOTE_TO_EMAIL`, `LEAD_WEBHOOK_URL`;
  for the admin panel `ADMIN_PASSWORD` and `SESSION_SECRET` (secrets); optional `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `TURNSTILE_SECRET_KEY`.

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
- [ ] Analytics: set `NEXT_PUBLIC_GA_ID` only when ready — a consent banner then appears automatically, GA loads only after "Accept", and the Cookie Policy page updates itself. No ads/tracking pixels without extending the banner.

**Go-live**
- [ ] Configure `RESEND_*` and/or `LEAD_WEBHOOK_URL` (production returns an error to the user if neither works — by design)
- [ ] Set `NEXT_PUBLIC_WHATSAPP`, `NEXT_PUBLIC_PHONE`
- [ ] Set `NEXT_PUBLIC_ALLOW_INDEXING=true`, submit `/sitemap.xml` in Search Console
- [ ] Verify the email domain (SPF/DKIM/DMARC) for the sender

## Next build steps (suggested order)
1. Enable the database and log in to the admin (see docs/ADMIN-SETUP.md), import the plan files, add your first suppliers and prices.
2. Turn on email (Resend) and, when you have a company account, Stripe.
3. Add Cloudflare Turnstile keys (free) to the quote form; add GA4 + Search Console when you are ready to launch.
4. Connect an e-invoicing provider (FatturaPA/SDI) or agree the CSV workflow with your accountant.
5. Remaining pages from `stubs.ts`, then `/it` and Arabic locales.
