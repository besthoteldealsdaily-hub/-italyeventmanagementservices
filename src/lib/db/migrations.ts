/**
 * Database schema (Cloudflare D1 / SQLite). Money = integer cents. Dates = ISO text.
 * Migrations run automatically, once, the first time the database is used (see client.ts).
 * To change the schema later, ADD a new migration at the end — never edit an applied one.
 */

export interface Migration {
  name: string;
  statements: string[];
}

const t = (sql: string) => sql.replace(/\s+/g, " ").trim();

export const migrations: Migration[] = [
  {
    name: "001_core",
    statements: [
      t(`CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT)`),

      // CRM
      t(`CREATE TABLE IF NOT EXISTS organizations (
        id TEXT PRIMARY KEY, type TEXT, name TEXT NOT NULL, vat_id TEXT, sdi_code TEXT, pec TEXT, country TEXT,
        payment_terms_days INTEGER DEFAULT 0, credit_limit_cents INTEGER DEFAULT 0, notes TEXT, created_at TEXT)`),
      t(`CREATE TABLE IF NOT EXISTS contacts (
        id TEXT PRIMARY KEY, organization_id TEXT, full_name TEXT NOT NULL, email TEXT, phone TEXT,
        whatsapp_opt_in INTEGER DEFAULT 0, role TEXT, unsubscribed_at TEXT, source TEXT, notes TEXT, created_at TEXT)`),
      t(`CREATE TABLE IF NOT EXISTS leads (
        id TEXT PRIMARY KEY, ref TEXT UNIQUE, name TEXT, email TEXT, phone TEXT, company TEXT, country TEXT,
        source TEXT, service TEXT, payload TEXT, message TEXT, status TEXT DEFAULT 'new', assigned_to TEXT,
        first_response_at TEXT, contact_id TEXT, organization_id TEXT, created_at TEXT)`),
      t(`CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status, created_at)`),

      // Supply
      t(`CREATE TABLE IF NOT EXISTS suppliers (
        id TEXT PRIMARY KEY, type TEXT, legal_name TEXT NOT NULL, trade_name TEXT, vat_id TEXT, iban TEXT, tier INTEGER DEFAULT 2,
        status TEXT DEFAULT 'prospect', payout_terms_days INTEGER DEFAULT 15, commission_type TEXT, commission_value REAL,
        cities TEXT, rating REAL, contact_name TEXT, phone TEXT, email TEXT, emergency_phone TEXT, onboarding TEXT, notes TEXT, created_at TEXT)`),
      t(`CREATE TABLE IF NOT EXISTS supplier_documents (
        id TEXT PRIMARY KEY, supplier_id TEXT NOT NULL, doc_type TEXT, number TEXT, issued_by TEXT, valid_from TEXT, valid_to TEXT,
        file_url TEXT, verified_by TEXT, verified_at TEXT, verification_method TEXT, created_at TEXT)`),
      t(`CREATE INDEX IF NOT EXISTS idx_docs_valid_to ON supplier_documents(valid_to)`),
      t(`CREATE TABLE IF NOT EXISTS vehicles (
        id TEXT PRIMARY KEY, supplier_id TEXT NOT NULL, plate TEXT, class TEXT, seats INTEGER, bags INTEGER, model_year INTEGER,
        ncc_flag INTEGER DEFAULT 1, last_inspection TEXT, insurance_expiry TEXT, notes TEXT, created_at TEXT)`),
      t(`CREATE TABLE IF NOT EXISTS drivers (
        id TEXT PRIMARY KEY, supplier_id TEXT NOT NULL, name TEXT NOT NULL, phone TEXT, languages TEXT, licence_no TEXT, cap_expiry TEXT, created_at TEXT)`),
      t(`CREATE TABLE IF NOT EXISTS hotels (
        id TEXT PRIMARY KEY, supplier_id TEXT, name TEXT NOT NULL, city TEXT, stars INTEGER, cin TEXT, group_desk_contact TEXT,
        commission_pct REAL, terms TEXT, created_at TEXT)`),
      t(`CREATE TABLE IF NOT EXISTS venues (
        id TEXT PRIMARY KEY, supplier_id TEXT, name TEXT NOT NULL, city TEXT, capacity INTEGER, certifications TEXT,
        commission_pct REAL, notes TEXT, created_at TEXT)`),

      // Pricing
      t(`CREATE TABLE IF NOT EXISTS routes (
        id TEXT PRIMARY KEY, slug TEXT UNIQUE, name TEXT NOT NULL, from_label TEXT, to_label TEXT, distance_km REAL,
        duration_min INTEGER, toll_cents INTEGER DEFAULT 0, created_at TEXT)`),
      t(`CREATE TABLE IF NOT EXISTS rate_cards (
        id TEXT PRIMARY KEY, supplier_id TEXT NOT NULL, route_id TEXT NOT NULL, vehicle_class TEXT NOT NULL, cost_cents INTEGER NOT NULL,
        valid_from TEXT, valid_to TEXT, notes TEXT, created_at TEXT)`),
      t(`CREATE TABLE IF NOT EXISTS sell_prices (
        id TEXT PRIMARY KEY, route_id TEXT NOT NULL, vehicle_class TEXT NOT NULL, channel TEXT DEFAULT 'b2c', price_cents INTEGER NOT NULL,
        valid_from TEXT, valid_to TEXT, created_at TEXT)`),

      // Sales
      t(`CREATE TABLE IF NOT EXISTS quotes (
        id TEXT PRIMARY KEY, ref TEXT UNIQUE, token TEXT UNIQUE, lead_id TEXT, organization_id TEXT, contact_name TEXT, contact_email TEXT,
        contact_phone TEXT, title TEXT, currency TEXT DEFAULT 'EUR', status TEXT DEFAULT 'draft', valid_until TEXT, terms_version TEXT,
        accepted_at TEXT, accepted_ip TEXT, accepted_name TEXT, public_notes TEXT, internal_notes TEXT, created_at TEXT)`),
      t(`CREATE TABLE IF NOT EXISTS quote_items (
        id TEXT PRIMARY KEY, quote_id TEXT NOT NULL, position INTEGER DEFAULT 0, service_type TEXT, description TEXT, supplier_id TEXT,
        qty REAL DEFAULT 1, unit_cost_cents INTEGER DEFAULT 0, unit_price_cents INTEGER DEFAULT 0, vat_rate REAL DEFAULT 10, service_date TEXT)`),

      // Bookings & operations
      t(`CREATE TABLE IF NOT EXISTS bookings (
        id TEXT PRIMARY KEY, ref TEXT UNIQUE, token TEXT UNIQUE, quote_id TEXT, organization_id TEXT, customer_name TEXT, customer_email TEXT,
        customer_phone TEXT, title TEXT, status TEXT DEFAULT 'pending_payment', service_start TEXT, currency TEXT DEFAULT 'EUR',
        payment_status TEXT DEFAULT 'unpaid', invoice_status TEXT DEFAULT 'none', notes TEXT, created_at TEXT)`),
      t(`CREATE INDEX IF NOT EXISTS idx_bookings_start ON bookings(service_start, status)`),
      t(`CREATE TABLE IF NOT EXISTS booking_items (
        id TEXT PRIMARY KEY, booking_id TEXT NOT NULL, position INTEGER DEFAULT 0, service_type TEXT, description TEXT, supplier_id TEXT,
        vehicle_id TEXT, driver_id TEXT, pickup TEXT, dropoff TEXT, pickup_at TEXT, pax INTEGER, bags INTEGER, flight_no TEXT,
        qty REAL DEFAULT 1, price_cents INTEGER DEFAULT 0, cost_cents INTEGER DEFAULT 0, vat_rate REAL DEFAULT 10,
        supplier_status TEXT DEFAULT 'requested', supplier_confirmation TEXT, notes TEXT)`),
      t(`CREATE TABLE IF NOT EXISTS events (
        id TEXT PRIMARY KEY, booking_id TEXT, organization_id TEXT, name TEXT NOT NULL, type TEXT, start_date TEXT, end_date TEXT,
        pax INTEGER, budget_cents INTEGER DEFAULT 0, city TEXT, status TEXT DEFAULT 'planning', notes TEXT, created_at TEXT)`),
      t(`CREATE TABLE IF NOT EXISTS event_components (
        id TEXT PRIMARY KEY, event_id TEXT NOT NULL, type TEXT, description TEXT, supplier_id TEXT, cost_cents INTEGER DEFAULT 0,
        price_cents INTEGER DEFAULT 0, due_date TEXT, status TEXT DEFAULT 'planned', created_at TEXT)`),
      t(`CREATE TABLE IF NOT EXISTS room_blocks (
        id TEXT PRIMARY KEY, hotel_id TEXT, booking_id TEXT, rooms INTEGER, nights INTEGER, rate_cents INTEGER, cutoff_date TEXT,
        attrition_pct REAL, status TEXT DEFAULT 'requested', notes TEXT, created_at TEXT)`),

      // Money
      t(`CREATE TABLE IF NOT EXISTS payment_schedules (
        id TEXT PRIMARY KEY, booking_id TEXT NOT NULL, milestone TEXT, due_date TEXT, amount_cents INTEGER NOT NULL, status TEXT DEFAULT 'due')`),
      t(`CREATE TABLE IF NOT EXISTS payments (
        id TEXT PRIMARY KEY, booking_id TEXT NOT NULL, schedule_id TEXT, provider TEXT, provider_ref TEXT, kind TEXT, amount_cents INTEGER NOT NULL,
        fee_cents INTEGER DEFAULT 0, currency TEXT DEFAULT 'EUR', status TEXT DEFAULT 'pending', paid_at TEXT, note TEXT, created_at TEXT)`),
      t(`CREATE INDEX IF NOT EXISTS idx_payments_ref ON payments(provider_ref)`),
      t(`CREATE TABLE IF NOT EXISTS invoices (
        id TEXT PRIMARY KEY, booking_id TEXT, organization_id TEXT, number TEXT UNIQUE, kind TEXT DEFAULT 'invoice', vat_regime TEXT DEFAULT 'ordinary',
        net_cents INTEGER DEFAULT 0, vat_cents INTEGER DEFAULT 0, total_cents INTEGER DEFAULT 0, sdi_status TEXT DEFAULT 'not_sent', sdi_id TEXT,
        issued_on TEXT, customer_name TEXT, customer_vat TEXT, customer_address TEXT, notes TEXT, created_at TEXT)`),
      t(`CREATE TABLE IF NOT EXISTS supplier_payouts (
        id TEXT PRIMARY KEY, supplier_id TEXT, booking_id TEXT, amount_cents INTEGER NOT NULL, due_on TEXT, status TEXT DEFAULT 'pending',
        paid_at TEXT, method TEXT, reference TEXT, created_at TEXT)`),
      t(`CREATE TABLE IF NOT EXISTS commissions (
        id TEXT PRIMARY KEY, party_type TEXT, party_name TEXT, booking_id TEXT, basis_cents INTEGER DEFAULT 0, amount_cents INTEGER NOT NULL,
        status TEXT DEFAULT 'accrued', paid_at TEXT, created_at TEXT)`),
      t(`CREATE TABLE IF NOT EXISTS cancellations (
        id TEXT PRIMARY KEY, booking_id TEXT NOT NULL, requested_at TEXT, reason TEXT, hours_before REAL, policy TEXT, refundable_cents INTEGER DEFAULT 0,
        supplier_penalty_cents INTEGER DEFAULT 0, status TEXT DEFAULT 'requested', created_at TEXT)`),
      t(`CREATE TABLE IF NOT EXISTS refunds (
        id TEXT PRIMARY KEY, payment_id TEXT, cancellation_id TEXT, booking_id TEXT, amount_cents INTEGER NOT NULL, provider_ref TEXT,
        status TEXT DEFAULT 'pending', refunded_at TEXT, created_at TEXT)`),

      // Quality & ops
      t(`CREATE TABLE IF NOT EXISTS incidents (
        id TEXT PRIMARY KEY, booking_id TEXT, booking_item_id TEXT, supplier_id TEXT, type TEXT, severity INTEGER DEFAULT 1, reported_at TEXT,
        resolved_at TEXT, extra_cost_cents INTEGER DEFAULT 0, notes TEXT, created_at TEXT)`),
      t(`CREATE TABLE IF NOT EXISTS communications (
        id TEXT PRIMARY KEY, entity_type TEXT, entity_id TEXT, channel TEXT, direction TEXT, body TEXT, created_at TEXT)`),
      t(`CREATE INDEX IF NOT EXISTS idx_comms_entity ON communications(entity_type, entity_id)`),
      t(`CREATE TABLE IF NOT EXISTS reviews (
        id TEXT PRIMARY KEY, booking_id TEXT, token TEXT UNIQUE, rating INTEGER, comment TEXT, source TEXT, requested_at TEXT, created_at TEXT)`),
      t(`CREATE TABLE IF NOT EXISTS tasks (
        id TEXT PRIMARY KEY, entity_type TEXT, entity_id TEXT, kind TEXT, title TEXT NOT NULL, due_at TEXT, done_at TEXT, assigned_to TEXT, created_at TEXT)`),
      t(`CREATE INDEX IF NOT EXISTS idx_tasks_due ON tasks(done_at, due_at)`),
      t(`CREATE TABLE IF NOT EXISTS audit_log (
        id INTEGER PRIMARY KEY AUTOINCREMENT, action TEXT, entity TEXT, entity_id TEXT, detail TEXT, created_at TEXT)`),
      t(`CREATE TABLE IF NOT EXISTS login_attempts (ip TEXT, at TEXT)`),

      // Sales CRM (outbound)
      t(`CREATE TABLE IF NOT EXISTS prospects (
        id TEXT PRIMARY KEY, name TEXT, company TEXT, segment TEXT, country TEXT, email TEXT, phone TEXT, linkedin TEXT, source TEXT,
        status TEXT DEFAULT 'new', step INTEGER DEFAULT 0, last_touch_at TEXT, next_touch_at TEXT, notes TEXT, created_at TEXT)`),
      t(`CREATE INDEX IF NOT EXISTS idx_prospects_next ON prospects(status, next_touch_at)`),
      t(`CREATE TABLE IF NOT EXISTS outreach_log (
        id TEXT PRIMARY KEY, prospect_id TEXT NOT NULL, channel TEXT, step INTEGER, note TEXT, at TEXT)`),
      t(`CREATE TABLE IF NOT EXISTS templates (
        id TEXT PRIMARY KEY, key TEXT UNIQUE, title TEXT, channel TEXT, segment TEXT, body TEXT, created_at TEXT)`),

      // Plans & targets (imported from private seed files)
      t(`CREATE TABLE IF NOT EXISTS plan_items (
        id TEXT PRIMARY KEY, phase TEXT, week INTEGER, position INTEGER DEFAULT 0, title TEXT NOT NULL, target TEXT, done_at TEXT, created_at TEXT)`),
      t(`CREATE TABLE IF NOT EXISTS kpi_targets (
        id TEXT PRIMARY KEY, month INTEGER, label TEXT, gbv_cents INTEGER DEFAULT 0, bookings INTEGER DEFAULT 0, b2b_accounts INTEGER DEFAULT 0,
        suppliers INTEGER DEFAULT 0, seo_pages INTEGER DEFAULT 0, sessions INTEGER DEFAULT 0, fixed_cents INTEGER DEFAULT 0, notes TEXT)`),
    ],
  },
  {
    // A Stripe session can only ever be recorded once, even if two webhooks arrive at the same moment.
    name: "002_payments_unique_stripe",
    statements: [
      t(`CREATE UNIQUE INDEX IF NOT EXISTS uq_payments_stripe ON payments(provider_ref) WHERE provider = 'stripe'`),
      t(`CREATE INDEX IF NOT EXISTS idx_booking_items_booking ON booking_items(booking_id)`),
      t(`CREATE INDEX IF NOT EXISTS idx_quote_items_quote ON quote_items(quote_id)`),
      t(`CREATE INDEX IF NOT EXISTS idx_schedules_booking ON payment_schedules(booking_id)`),
      t(`CREATE INDEX IF NOT EXISTS idx_payments_booking ON payments(booking_id)`),
    ],
  },
];
