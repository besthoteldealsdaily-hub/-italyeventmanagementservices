# Italy Event Management Services — website

Next.js (App Router) · TypeScript · Tailwind CSS 4. Domain: **italyeventmanagementservices.com**.

## Run it

```bash
cp .env.example .env.local     # then edit values
npm install
npm run dev                    # http://localhost:3000
npm run lint && npx tsc --noEmit
npm run build && npm start
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
| `src/app/{sitemap,robots,opengraph-image}` | SEO plumbing. **robots blocks everything until `NEXT_PUBLIC_ALLOW_INDEXING=true`.** |
| `db/schema.sql` | Booking-system schema (not wired yet). |

### Publishing a new page
1. Add a full `ContentPage` object with the **same slug** as its stub to `published.ts`.
2. It must contain **unique, real data** (`facts`) — the "no unique data, no page" rule. Set `updated` to today.
3. Link it from related pages via `related: [...]`. Nav/footer pick it up only if you add it in `Header.tsx`.
4. `npm run build` — the page appears in `/sitemap.xml` automatically.

## Before you launch (checklist)

**Facts and promises the site makes — make sure operations can keep them**
- [ ] "Reply within 1 hour on business days" (`site.responseSla`)
- [ ] "60 minutes free waiting after landing", "flight tracking", "backup vehicle process", "24/7 dispatch number on every voucher"
- [ ] Route/airport facts on published pages (distances, times) — confirm with your suppliers; update `updated`
- [ ] No prices are published yet (by design) — add "from" prices only from signed supplier rate cards

**Legal**
- [ ] Replace the **draft** privacy/terms/cookie/cancellation pages with lawyer-reviewed text (they are `noindex` and not in the sitemap)
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
