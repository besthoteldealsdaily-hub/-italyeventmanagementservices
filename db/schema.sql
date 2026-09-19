-- Booking-system schema (PostgreSQL).
-- Not applied anywhere yet: v0 of the site only emails/webhooks quote requests (see src/lib/leads.ts).
-- Add uuid defaults (gen_random_uuid()) and migrations with Drizzle/Prisma when you wire a database.

create extension if not exists pgcrypto;

-- IDENTITY & CRM
create table users (id uuid primary key, email text unique, role text check (role in ('owner','ops','sales','finance')), created_at timestamptz default now());
create table organizations (id uuid primary key, type text check (type in ('agency','tour_operator','planner','event_agency','corporate','hotel','other')), name text, vat_id text, sdi_code text, pec text, country char(2), payment_terms_days int default 0, credit_limit numeric, notes text);
create table contacts (id uuid primary key, organization_id uuid references organizations, full_name text, email text, phone text, whatsapp_opt_in boolean default false, role text, unsubscribed_at timestamptz, source text);
create table leads (id uuid primary key, contact_id uuid references contacts, organization_id uuid references organizations, source text, service text, payload jsonb, status text default 'new', assigned_to uuid references users, first_response_at timestamptz, created_at timestamptz default now());

-- SUPPLY
create table suppliers (id uuid primary key, type text, legal_name text, vat_id text, iban text, tier smallint default 2, status text default 'active', payout_terms_days int default 15, commission_type text, commission_value numeric, cities text[], rating numeric, notes text);
create table supplier_contacts (id uuid primary key, supplier_id uuid references suppliers, name text, phone text, email text, is_emergency boolean default false);
create table supplier_documents (id uuid primary key, supplier_id uuid references suppliers, doc_type text, number text, issued_by text, valid_from date, valid_to date, file_url text, verified_by uuid references users, verified_at timestamptz, verification_method text);
create table vehicles (id uuid primary key, supplier_id uuid references suppliers, plate text, class text, seats int, bags int, model_year int, ncc_flag boolean, last_inspection date, insurance_expiry date, photos text[]);
create table drivers (id uuid primary key, supplier_id uuid references suppliers, name text, phone text, languages text[], licence_no text, cap_expiry date);
create table hotels (id uuid primary key, supplier_id uuid references suppliers, name text, city text, stars smallint, cin text, group_desk_contact text, commission_pct numeric, terms jsonb);
create table venues (id uuid primary key, supplier_id uuid references suppliers, name text, city text, capacity int, certifications jsonb, commission_pct numeric);

-- PRICING
create table places (id uuid primary key, name text, type text, city text, lat numeric, lng numeric, ztl boolean);
create table routes (id uuid primary key, from_place uuid references places, to_place uuid references places, distance_km numeric, duration_min int, toll_eur numeric);
create table rate_cards (id uuid primary key, supplier_id uuid references suppliers, route_id uuid references routes, vehicle_class text, cost_eur numeric, valid_from date, valid_to date, supplements jsonb);
create table sell_prices (id uuid primary key, route_id uuid references routes, vehicle_class text, channel text, price_eur numeric, valid_from date, valid_to date);

-- SALES
create table quotes (id uuid primary key, lead_id uuid references leads, organization_id uuid references organizations, contact_id uuid references contacts, currency char(3) default 'EUR', status text default 'draft', valid_until timestamptz, terms_version text, accepted_at timestamptz, accepted_ip inet, total_net numeric, total_vat numeric);
create table quote_items (id uuid primary key, quote_id uuid references quotes, service_type text, description text, supplier_id uuid references suppliers, qty numeric, unit_cost numeric, unit_price numeric, vat_rate numeric);

-- BOOKINGS
create table bookings (id uuid primary key, reference text unique, quote_id uuid references quotes, organization_id uuid references organizations, contact_id uuid references contacts, status text default 'pending_payment', service_start timestamptz, currency char(3), total_price numeric, total_cost numeric, payment_status text, invoice_status text, notes text, created_at timestamptz default now());
create table booking_items (id uuid primary key, booking_id uuid references bookings, service_type text, supplier_id uuid references suppliers, vehicle_id uuid references vehicles, driver_id uuid references drivers, pickup_place uuid references places, dropoff_place uuid references places, pickup_at timestamptz, pax int, bags int, flight_no text, hotel_id uuid references hotels, rooms int, check_in date, check_out date, event_component_id uuid, price numeric, cost numeric, vat_rate numeric, supplier_status text default 'requested', voucher_url text);
create table room_blocks (id uuid primary key, hotel_id uuid references hotels, booking_id uuid references bookings, rooms int, nights int, rate numeric, cutoff_date date, attrition_pct numeric, status text);
create table events (id uuid primary key, booking_id uuid references bookings, name text, type text, start_date date, end_date date, pax int, budget numeric, manager uuid references users, status text);
create table event_components (id uuid primary key, event_id uuid references events, type text, supplier_id uuid references suppliers, cost numeric, price numeric, due_date date, status text);

-- MONEY
create table payment_schedules (id uuid primary key, booking_id uuid references bookings, milestone text, due_date date, amount numeric, status text default 'due');
create table payments (id uuid primary key, booking_id uuid references bookings, schedule_id uuid references payment_schedules, provider text, provider_ref text, kind text check (kind in ('deposit','balance','full','refund')), amount numeric, fee numeric, currency char(3), status text, paid_at timestamptz);
create table invoices (id uuid primary key, booking_id uuid references bookings, organization_id uuid references organizations, number text unique, kind text check (kind in ('invoice','credit_note')), vat_regime text, total numeric, vat numeric, sdi_status text, sdi_id text, issued_on date, pdf_url text);
create table supplier_payouts (id uuid primary key, supplier_id uuid references suppliers, booking_item_ids uuid[], amount numeric, due_on date, status text default 'pending', paid_at timestamptz, method text, reference text, proof_of_service text);
create table commissions (id uuid primary key, party_type text, party_id uuid, booking_id uuid references bookings, basis numeric, amount numeric, status text default 'accrued', paid_at timestamptz);
create table cancellations (id uuid primary key, booking_id uuid references bookings, requested_at timestamptz, reason text, policy_applied jsonb, refundable numeric, supplier_penalty numeric, status text);
create table refunds (id uuid primary key, payment_id uuid references payments, cancellation_id uuid references cancellations, amount numeric, provider_ref text, status text, refunded_at timestamptz);

-- OPS & QUALITY
create table incidents (id uuid primary key, booking_item_id uuid references booking_items, type text, severity smallint, reported_at timestamptz, resolved_at timestamptz, extra_cost numeric, notes text);
create table communications (id uuid primary key, entity_type text, entity_id uuid, channel text, direction text, body text, created_at timestamptz default now());
create table reviews (id uuid primary key, booking_id uuid references bookings, source text, rating smallint, comment text, created_at timestamptz default now());
create table tasks (id uuid primary key, entity_type text, entity_id uuid, assigned_to uuid references users, due_at timestamptz, done_at timestamptz, note text);
create table audit_log (id bigserial primary key, user_id uuid, action text, entity text, entity_id uuid, diff jsonb, created_at timestamptz default now());

-- PROFIT VIEW
create view booking_profit as
select b.id, b.reference, b.total_price - b.total_cost as gross_margin,
       coalesce(sum(p.fee),0) as payment_fees,
       coalesce((select sum(amount) from commissions c where c.booking_id=b.id),0) as commissions
from bookings b left join payments p on p.booking_id=b.id group by b.id;
