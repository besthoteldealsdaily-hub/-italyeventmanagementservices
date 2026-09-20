# Admin panel & operations system — setup

The public website works on its own. The **admin panel** (`/admin`) adds: leads inbox, quote builder with customer acceptance,
bookings, payments (bank transfer + optional Stripe cards), invoices records, supplier network and compliance, cancellations and
refunds, profit dashboard, sales CRM and the launch/KPI tracker. It stores data in **Cloudflare D1** (SQLite, free tier is plenty).

## 1. Turn it on (one time, ~10 minutes)

1. **Add the database binding.** In `wrangler.jsonc`, add before `"observability"`:

   ```jsonc
   "d1_databases": [{ "binding": "DB", "database_name": "italyeventmanagementservices-db" }],
   ```

   Commit and push. Cloudflare Workers Builds creates the D1 database automatically on the next deploy (automatic provisioning).
   If your deploy log says it could not provision, create it yourself: Cloudflare dashboard → Storage & Databases → D1 → *Create*,
   name `italyeventmanagementservices-db`, then add its `database_id` to the binding above.
2. **Set two runtime secrets** — Workers & Pages → your Worker → Settings → *Variables and Secrets* → *Add* (type **Secret**):
   - `ADMIN_PASSWORD` — your login password (long and unique).
   - `SESSION_SECRET` — 16+ random characters.
3. Redeploy (push any commit). Open `https://YOUR-DOMAIN/admin` and log in.

Tables are created automatically the first time the admin is opened — there is nothing to run by hand.

> Until step 1 is done the admin shows "Database not connected", and the public site + quote form keep working exactly as before
> (quote requests still arrive by email / webhook).

## 2. First 30 minutes inside the admin

1. **Settings & import** → fill bank details (for the payment page), deposit %, fixed costs, monthly net target, **launch date** `2026-10-01`.
2. **Settings & import → Import planning data** → upload the JSON files from your private `blueprint/seed/` folder
   (`plan_items.json`, `kpi_targets.json`, `templates.json`). They fill the launch plan, KPI targets and outreach message library.
3. **Suppliers** → add each supplier, then their documents (with expiry dates) and mark them verified after you called the issuing body.
   **Supplier compliance** shows who is ready to receive bookings.
4. **Pricing** → add Routes (set *slug* to the website page slug, e.g. `rome-to-florence-transfer`), supplier rate cards (cost) and Sell prices.
   Once a **b2c sell price** exists, that route/airport page on the website shows a live "Fixed price from €…" box automatically.

## 3. Daily flow

`Leads` → *Create quote* → add lines (price, VAT, your cost, supplier) → *Email to customer* → customer clicks **Accept** (name, time and IP are stored)
→ *Convert to booking* (creates the payment schedule and the T‑72 h / T‑24 h / T‑3 h checklist) → customer pays on `/pay/…` (card or bank transfer)
→ assign supplier/vehicle/driver, get the supplier's **written confirmation**, email the voucher → after the service *Mark completed*
→ *Create supplier payouts* → pay suppliers only when the customer has paid in full → *Create invoice record* → send your accountant the CSV.

## 4. Card payments with Stripe (optional)

1. Create a Stripe account, get the **secret key** → runtime secret `STRIPE_SECRET_KEY`.
2. Stripe → Developers → Webhooks → *Add endpoint*: `https://YOUR-DOMAIN/api/stripe/webhook`, event **`checkout.session.completed`**.
   Copy the signing secret → runtime secret `STRIPE_WEBHOOK_SECRET`.
3. Redeploy. The payment page now offers "Pay by card". Payments are recorded automatically; the same payment can never be recorded twice.

## 5. Email (optional but recommended)

`RESEND_API_KEY`, `QUOTE_FROM_EMAIL`, `QUOTE_TO_EMAIL` (see `.env.example`). Enables "Email to customer" buttons and owner alerts
(quote accepted, payment received, low review).

## 6. File storage for documents and photos (optional — Cloudflare R2)

Without this, supplier documents still work — you just paste a Google Drive/Dropbox link. Adding R2 lets you upload the file
directly (PDF or photo) instead, stored privately (10 GB free, no egress fee).

1. **Add the bucket binding.** In `wrangler.jsonc`, add alongside the D1 binding:

   ```jsonc
   "r2_buckets": [{ "binding": "BUCKET", "bucket_name": "italyeventmanagementservices-docs" }],
   ```

   Commit and push. If the deploy log says it could not provision the bucket, create it yourself: Cloudflare dashboard →
   Storage & Databases → R2 → *Create bucket*, name `italyeventmanagementservices-docs`.
2. Redeploy. Open a supplier's document (or add a new one) — an upload button now appears under "Or upload the file here".
   Uploaded files are served back only to logged-in admins (`/admin/files/…`), never made public.

## 7. Important limits — read this

- **Invoices here are internal records.** The legally valid Italian e-invoice (FatturaPA via SDI) must be issued through your accountant or an
  e-invoicing provider. The panel numbers invoices sequentially per year, keeps the VAT regime, and exports a CSV for your accountant.
- **VAT rates and the 74‑ter margin scheme** are inputs, not advice — confirm with your commercialista.
- **Security:** one owner password. Use a long unique password; the login is rate-limited. Make the GitHub repository **private** if you store
  anything sensitive in code (this repo holds none — all data lives in D1).
- **Backups:** D1 has Time Travel (30 days point-in-time restore on the free plan). Export the CSVs monthly as well. R2 has no
  automatic point-in-time restore — don't delete the only copy of a document elsewhere until you're sure the upload worked.
- **Privacy:** you now store customer names, emails and phone numbers. Keep the Privacy Policy accurate and delete data you no longer need.
