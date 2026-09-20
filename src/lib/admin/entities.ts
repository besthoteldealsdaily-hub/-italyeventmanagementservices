/**
 * Config-driven CRUD for the simple admin tables (organisations, suppliers, vehicles, rate cards …).
 * One generic list page, one generic edit page and one generic server action serve all of them.
 * Money fields are stored as integer cents and edited as decimals.
 */

export type FieldType = "text" | "textarea" | "number" | "money" | "date" | "datetime" | "select" | "checkbox" | "ref" | "file";

export interface FieldDef {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: string[];
  ref?: { table: string; label: string };
  help?: string;
  /** shown as a column in the list view */
  list?: boolean;
  placeholder?: string;
  /** pre-filled value when adding a new row */
  default?: string;
  /** render this text value as a clickable link (external URL, or a stored file via /admin/files) */
  link?: boolean;
  /** file fields only: accepted file types, e.g. ".pdf,.jpg,.png" */
  accept?: string;
  /** file fields only: not a real column — a successful upload is written into this field instead */
  mapsTo?: string;
}

export interface ChildDef {
  entity: string;
  fk: string;
  label: string;
  /** open rows in a dedicated admin page (e.g. /admin/bookings) instead of the generic editor */
  linkBase?: string;
  /** hide the "+ Add" button (these rows are created elsewhere) */
  noAdd?: boolean;
}

export interface EntityDef {
  key: string;
  table: string;
  label: string;
  plural: string;
  title: string; // column used as the row's display name
  fields: FieldDef[];
  order: string;
  search: string[];
  children?: ChildDef[];
  intro?: string;
}

const SUPPLIER_TYPES = [
  "ncc", "coach", "minibus", "hotel", "villa", "venue", "caterer", "guide", "av", "security", "hosts",
  "interpreter", "wedding_planner", "photographer", "activity", "boat", "agency", "other",
];
const VEHICLE_CLASSES = ["sedan", "van", "minibus", "coach", "luxury"];
export const SERVICE_TYPES = [
  "transfer", "chauffeur_day", "group_transport", "wedding_transport", "hotel", "event", "venue", "catering", "guide", "activity", "other",
];
const VAT_HELP = "10% for passenger transport and hotel/food; 22% for most other services. Confirm with your accountant.";

export const ENTITIES: Record<string, EntityDef> = {
  organizations: {
    key: "organizations",
    table: "organizations",
    label: "Customer",
    plural: "Customers (organisations)",
    title: "name",
    order: "name COLLATE NOCASE",
    search: ["name", "vat_id", "country"],
    intro: "Agencies, planners, corporates and hotels you invoice. Payment terms and credit limit drive how you take payment.",
    children: [
      { entity: "contacts", fk: "organization_id", label: "Contacts" },
      { entity: "quotes", fk: "organization_id", label: "Quotes", linkBase: "/admin/quotes", noAdd: true },
      { entity: "bookings", fk: "organization_id", label: "Booking history", linkBase: "/admin/bookings", noAdd: true },
    ],
    fields: [
      { name: "name", label: "Name", type: "text", required: true, list: true },
      { name: "type", label: "Type", type: "select", options: ["agency", "tour_operator", "planner", "event_agency", "corporate", "hotel", "other"], list: true },
      { name: "country", label: "Country", type: "text", list: true },
      { name: "vat_id", label: "VAT ID", type: "text" },
      { name: "sdi_code", label: "SDI code", type: "text", help: "Italian e-invoice recipient code (7 chars). Use 0000000 with PEC, or XXXXXXX for foreign customers — confirm with your accountant." },
      { name: "pec", label: "PEC", type: "text" },
      { name: "payment_terms_days", label: "Payment terms (days)", type: "number", list: true, help: "0 = prepay. New accounts should prepay their first bookings." },
      { name: "credit_limit_cents", label: "Credit limit (€)", type: "money" },
      { name: "notes", label: "Notes", type: "textarea" },
    ],
  },
  contacts: {
    key: "contacts",
    table: "contacts",
    label: "Contact",
    plural: "Contacts",
    title: "full_name",
    order: "full_name COLLATE NOCASE",
    search: ["full_name", "email", "phone"],
    fields: [
      { name: "full_name", label: "Name", type: "text", required: true, list: true },
      { name: "organization_id", label: "Organisation", type: "ref", ref: { table: "organizations", label: "name" }, list: true },
      { name: "email", label: "Email", type: "text", list: true },
      { name: "phone", label: "Phone / WhatsApp", type: "text", list: true },
      { name: "role", label: "Role", type: "text" },
      { name: "whatsapp_opt_in", label: "OK to WhatsApp", type: "checkbox", help: "Only tick if they agreed to be messaged on WhatsApp." },
      { name: "source", label: "Source", type: "text" },
      { name: "notes", label: "Notes", type: "textarea" },
    ],
  },
  suppliers: {
    key: "suppliers",
    table: "suppliers",
    label: "Supplier",
    plural: "Suppliers",
    title: "legal_name",
    order: "legal_name COLLATE NOCASE",
    search: ["legal_name", "trade_name", "cities", "vat_id"],
    intro: "Your vetted network. Add every document (NCC authorisation, insurance…) with its expiry date — the dashboard warns you before they lapse.",
    children: [
      { entity: "supplier_documents", fk: "supplier_id", label: "Documents and verification" },
      { entity: "vehicles", fk: "supplier_id", label: "Vehicles" },
      { entity: "drivers", fk: "supplier_id", label: "Drivers" },
      { entity: "rate_cards", fk: "supplier_id", label: "Rate cards (what they charge us)" },
      { entity: "incidents", fk: "supplier_id", label: "Incidents (quality record)" },
    ],
    fields: [
      { name: "legal_name", label: "Legal name", type: "text", required: true, list: true },
      { name: "trade_name", label: "Trade name", type: "text" },
      { name: "type", label: "Type", type: "select", options: SUPPLIER_TYPES, list: true },
      { name: "status", label: "Status", type: "select", options: ["prospect", "active", "paused", "blocked"], list: true },
      { name: "tier", label: "Tier", type: "select", options: ["1", "2", "3"], list: true, help: "1 = primary, 2 = approved backup, 3 = emergency only." },
      { name: "cities", label: "Cities covered", type: "text", list: true, placeholder: "Rome, Florence" },
      { name: "contact_name", label: "Contact person", type: "text" },
      { name: "phone", label: "Phone", type: "text", list: true },
      { name: "emergency_phone", label: "24/7 emergency phone", type: "text" },
      { name: "email", label: "Email", type: "text" },
      { name: "vat_id", label: "VAT ID", type: "text" },
      { name: "iban", label: "IBAN", type: "text" },
      { name: "payout_terms_days", label: "Payout terms (days)", type: "number", help: "Pay only after you have been paid and the service is complete." },
      { name: "commission_type", label: "Commercial model", type: "select", options: ["net", "commission_percent", "fixed_margin"] },
      { name: "commission_value", label: "Commission % / margin €", type: "number" },
      { name: "rating", label: "Rating (0–5)", type: "number" },
      { name: "notes", label: "Notes", type: "textarea" },
    ],
  },
  supplier_documents: {
    key: "supplier_documents",
    table: "supplier_documents",
    label: "Supplier document",
    plural: "Supplier documents",
    title: "doc_type",
    order: "valid_to",
    search: ["doc_type", "number"],
    fields: [
      { name: "supplier_id", label: "Supplier", type: "ref", ref: { table: "suppliers", label: "legal_name" }, required: true, list: true },
      {
        name: "doc_type",
        label: "Document",
        type: "select",
        required: true,
        list: true,
        options: [
          "ncc_authorisation", "bus_authorisation", "visura_camerale", "durc", "rca_insurance", "passenger_insurance",
          "liability_insurance", "sanitary_registration", "cin", "guide_enrolment", "vehicle_registration", "safety_certificate", "other",
        ],
      },
      { name: "number", label: "Number / reference", type: "text", list: true },
      { name: "issued_by", label: "Issued by", type: "text", help: "e.g. Comune di Roma, INPS, insurer" },
      { name: "valid_from", label: "Valid from", type: "date" },
      { name: "valid_to", label: "Valid to (expiry)", type: "date", list: true },
      { name: "file_url", label: "Document link", type: "text", list: true, link: true, help: "Paste a Google Drive/Dropbox link, or leave blank and upload the file below." },
      {
        name: "document_file",
        label: "Or upload the file here",
        type: "file",
        accept: ".pdf,.jpg,.jpeg,.png,.heic,.heif",
        mapsTo: "file_url",
        help: "PDF or photo, stored privately (only admins can open it). Uploading here fills the link above and takes priority over it.",
      },
      { name: "verified_by", label: "Verified by", type: "text" },
      { name: "verified_at", label: "Verified on", type: "date" },
      { name: "verification_method", label: "How verified", type: "select", options: ["called_authority", "checked_registry", "saw_original", "other"] },
    ],
  },
  vehicles: {
    key: "vehicles",
    table: "vehicles",
    label: "Vehicle",
    plural: "Vehicles",
    title: "plate",
    order: "plate",
    search: ["plate", "class"],
    fields: [
      { name: "supplier_id", label: "Supplier", type: "ref", ref: { table: "suppliers", label: "legal_name" }, required: true, list: true },
      { name: "plate", label: "Plate", type: "text", required: true, list: true },
      { name: "class", label: "Class", type: "select", options: VEHICLE_CLASSES, list: true },
      { name: "seats", label: "Seats", type: "number", list: true },
      { name: "bags", label: "Large bags", type: "number" },
      { name: "model_year", label: "Model year", type: "number" },
      { name: "ncc_flag", label: "Registered for NCC use", type: "checkbox" },
      { name: "last_inspection", label: "Last inspection", type: "date" },
      { name: "insurance_expiry", label: "Insurance expiry", type: "date", list: true },
      { name: "notes", label: "Notes", type: "textarea" },
    ],
  },
  drivers: {
    key: "drivers",
    table: "drivers",
    label: "Driver",
    plural: "Drivers",
    title: "name",
    order: "name COLLATE NOCASE",
    search: ["name", "phone"],
    fields: [
      { name: "supplier_id", label: "Supplier", type: "ref", ref: { table: "suppliers", label: "legal_name" }, required: true, list: true },
      { name: "name", label: "Name", type: "text", required: true, list: true },
      { name: "phone", label: "Phone", type: "text", list: true },
      { name: "languages", label: "Languages", type: "text", list: true },
      { name: "licence_no", label: "Licence no.", type: "text" },
      { name: "cap_expiry", label: "Professional certificate expiry", type: "date" },
    ],
  },
  hotels: {
    key: "hotels",
    table: "hotels",
    label: "Hotel",
    plural: "Hotels",
    title: "name",
    order: "name COLLATE NOCASE",
    search: ["name", "city"],
    intro: "Group desks and commission terms. Track each room block with its cut-off and attrition — the dashboard warns 14 days before a cut-off.",
    children: [{ entity: "room_blocks", fk: "hotel_id", label: "Room blocks / allotments" }],
    fields: [
      { name: "name", label: "Name", type: "text", required: true, list: true },
      { name: "city", label: "City", type: "text", list: true },
      { name: "stars", label: "Stars", type: "number", list: true },
      { name: "cin", label: "CIN (national ID code)", type: "text" },
      { name: "group_desk_contact", label: "Group desk contact", type: "text" },
      { name: "commission_pct", label: "Group commission %", type: "number", list: true },
      { name: "supplier_id", label: "Linked supplier", type: "ref", ref: { table: "suppliers", label: "legal_name" } },
      { name: "terms", label: "Terms (cut-off, attrition, cancellation)", type: "textarea" },
    ],
  },
  room_blocks: {
    key: "room_blocks",
    table: "room_blocks",
    label: "Room block",
    plural: "Room blocks",
    title: "notes",
    order: "cutoff_date",
    search: ["notes"],
    fields: [
      { name: "hotel_id", label: "Hotel", type: "ref", ref: { table: "hotels", label: "name" }, required: true, list: true },
      { name: "booking_id", label: "Booking", type: "ref", ref: { table: "bookings", label: "ref" } },
      { name: "rooms", label: "Rooms", type: "number", required: true, list: true },
      { name: "nights", label: "Nights", type: "number", list: true },
      { name: "rate_cents", label: "Rate per room-night (€)", type: "money", list: true },
      { name: "cutoff_date", label: "Cut-off date", type: "date", list: true, help: "Last day to confirm the final rooming list or release rooms without penalty." },
      { name: "attrition_pct", label: "Attrition allowed %", type: "number", help: "Typically ±10% — rooms you can drop without penalty." },
      { name: "status", label: "Status", type: "select", options: ["requested", "confirmed", "released", "cancelled"], list: true },
      { name: "notes", label: "Terms / confirmation numbers", type: "textarea" },
    ],
  },
  venues: {
    key: "venues",
    table: "venues",
    label: "Venue",
    plural: "Venues",
    title: "name",
    order: "name COLLATE NOCASE",
    search: ["name", "city"],
    fields: [
      { name: "name", label: "Name", type: "text", required: true, list: true },
      { name: "city", label: "City", type: "text", list: true },
      { name: "capacity", label: "Capacity", type: "number", list: true },
      { name: "certifications", label: "Safety/capacity documents on file", type: "textarea" },
      { name: "commission_pct", label: "Agency commission %", type: "number" },
      { name: "supplier_id", label: "Linked supplier", type: "ref", ref: { table: "suppliers", label: "legal_name" } },
      { name: "notes", label: "Notes", type: "textarea" },
    ],
  },
  routes: {
    key: "routes",
    table: "routes",
    label: "Route",
    plural: "Routes",
    title: "name",
    order: "name COLLATE NOCASE",
    search: ["name", "slug"],
    intro: "Set the slug to a route/airport page slug on the website. Once a sell price exists, that page shows a live “from €” price.",
    children: [
      { entity: "rate_cards", fk: "route_id", label: "Supplier rate cards (cost)" },
      { entity: "sell_prices", fk: "route_id", label: "Sell prices" },
    ],
    fields: [
      { name: "name", label: "Name", type: "text", required: true, list: true },
      { name: "slug", label: "Website page slug", type: "text", list: true, placeholder: "rome-to-florence-transfer" },
      { name: "from_label", label: "From", type: "text" },
      { name: "to_label", label: "To", type: "text" },
      { name: "distance_km", label: "Distance (km)", type: "number", list: true },
      { name: "duration_min", label: "Duration (min)", type: "number" },
      { name: "toll_cents", label: "Tolls (€)", type: "money" },
    ],
  },
  rate_cards: {
    key: "rate_cards",
    table: "rate_cards",
    label: "Rate card",
    plural: "Rate cards (cost)",
    title: "vehicle_class",
    order: "route_id, vehicle_class",
    search: ["vehicle_class"],
    fields: [
      { name: "supplier_id", label: "Supplier", type: "ref", ref: { table: "suppliers", label: "legal_name" }, required: true, list: true },
      { name: "route_id", label: "Route", type: "ref", ref: { table: "routes", label: "name" }, required: true, list: true },
      { name: "vehicle_class", label: "Vehicle class", type: "select", options: VEHICLE_CLASSES, required: true, list: true },
      { name: "cost_cents", label: "Cost to us (€, ex-VAT)", type: "money", required: true, list: true },
      { name: "valid_from", label: "Valid from", type: "date" },
      { name: "valid_to", label: "Valid to", type: "date" },
      { name: "notes", label: "Notes", type: "textarea" },
    ],
  },
  sell_prices: {
    key: "sell_prices",
    table: "sell_prices",
    label: "Sell price",
    plural: "Sell prices",
    title: "vehicle_class",
    order: "route_id, vehicle_class",
    search: ["vehicle_class"],
    fields: [
      { name: "route_id", label: "Route", type: "ref", ref: { table: "routes", label: "name" }, required: true, list: true },
      { name: "vehicle_class", label: "Vehicle class", type: "select", options: VEHICLE_CLASSES, required: true, list: true },
      { name: "channel", label: "Channel", type: "select", options: ["b2c", "b2b"], list: true, help: "Only B2C prices are shown on the public website." },
      { name: "price_cents", label: "Price (€, incl. VAT for B2C)", type: "money", required: true, list: true },
      { name: "valid_from", label: "Valid from", type: "date" },
      { name: "valid_to", label: "Valid to", type: "date" },
    ],
  },
  quotes: {
    key: "quotes",
    table: "quotes",
    label: "Quote",
    plural: "Quotes",
    title: "title",
    order: "created_at DESC",
    search: ["title", "ref", "contact_name"],
    fields: [
      { name: "title", label: "Title", type: "text", required: true, list: true },
      { name: "organization_id", label: "Customer (organisation)", type: "ref", ref: { table: "organizations", label: "name" } },
      { name: "contact_name", label: "Contact name", type: "text", required: true, list: true },
      { name: "contact_email", label: "Contact email", type: "text" },
      { name: "contact_phone", label: "Contact phone", type: "text" },
      { name: "valid_until", label: "Valid until", type: "date", list: true },
      { name: "public_notes", label: "Notes shown to the customer", type: "textarea", help: "Inclusions, exclusions, cancellation terms specific to this quote, supplier terms for hotels/events." },
      { name: "internal_notes", label: "Internal notes", type: "textarea" },
    ],
  },
  bookings: {
    key: "bookings",
    table: "bookings",
    label: "Booking",
    plural: "Bookings",
    title: "title",
    order: "service_start DESC",
    search: ["title", "ref", "customer_name"],
    fields: [
      { name: "title", label: "Title", type: "text", required: true, list: true },
      { name: "status", label: "Status", type: "select", list: true, options: ["pending_payment", "confirmed", "in_progress", "completed", "cancelled"] },
      { name: "organization_id", label: "Customer (organisation)", type: "ref", ref: { table: "organizations", label: "name" } },
      { name: "customer_name", label: "Customer name", type: "text", required: true },
      { name: "customer_email", label: "Customer email", type: "text" },
      { name: "customer_phone", label: "Customer phone", type: "text" },
      { name: "service_start", label: "Service start (Italy time)", type: "datetime", list: true },
      { name: "notes", label: "Internal notes", type: "textarea" },
    ],
  },
  quote_items: {
    key: "quote_items",
    table: "quote_items",
    label: "Quote line",
    plural: "Quote lines",
    title: "description",
    order: "position, rowid",
    search: ["description"],
    fields: [
      { name: "quote_id", label: "Quote", type: "ref", ref: { table: "quotes", label: "ref" }, required: true },
      { name: "position", label: "Order", type: "number", default: "0" },
      { name: "service_type", label: "Service", type: "select", options: SERVICE_TYPES, list: true },
      { name: "description", label: "Description", type: "text", required: true, list: true, placeholder: "Rome FCO → Florence hotel, Mercedes V-Class, 4 pax" },
      { name: "service_date", label: "Service date / time", type: "datetime", list: true },
      { name: "supplier_id", label: "Supplier (internal)", type: "ref", ref: { table: "suppliers", label: "legal_name" } },
      { name: "qty", label: "Qty", type: "number", required: true, default: "1", list: true },
      { name: "unit_cost_cents", label: "Unit cost to us (€, internal)", type: "money", help: "Never shown to the customer." },
      { name: "unit_price_cents", label: "Unit price (€, ex-VAT)", type: "money", required: true, list: true },
      { name: "vat_rate", label: "VAT %", type: "number", required: true, default: "10", help: VAT_HELP },
    ],
  },
  booking_items: {
    key: "booking_items",
    table: "booking_items",
    label: "Booking line",
    plural: "Booking lines",
    title: "description",
    order: "position, pickup_at",
    search: ["description", "pickup", "dropoff"],
    fields: [
      { name: "booking_id", label: "Booking", type: "ref", ref: { table: "bookings", label: "ref" }, required: true },
      { name: "position", label: "Order", type: "number", default: "0" },
      { name: "service_type", label: "Service", type: "select", options: SERVICE_TYPES, list: true },
      { name: "description", label: "Description", type: "text", required: true, list: true },
      { name: "pickup_at", label: "Pick-up / service time (Italy time)", type: "datetime", list: true },
      { name: "pickup", label: "Pick-up / from", type: "text" },
      { name: "dropoff", label: "Drop-off / to", type: "text" },
      { name: "pax", label: "Passengers", type: "number" },
      { name: "bags", label: "Bags", type: "number" },
      { name: "flight_no", label: "Flight no.", type: "text", help: "Drivers track the flight — always collect it for airport pick-ups." },
      { name: "supplier_id", label: "Supplier", type: "ref", ref: { table: "suppliers", label: "legal_name" }, list: true },
      { name: "vehicle_id", label: "Vehicle", type: "ref", ref: { table: "vehicles", label: "plate" } },
      { name: "driver_id", label: "Driver", type: "ref", ref: { table: "drivers", label: "name" } },
      { name: "supplier_status", label: "Supplier status", type: "select", options: ["requested", "confirmed", "declined", "done"], list: true },
      { name: "supplier_confirmation", label: "Supplier confirmation ref", type: "text", help: "Written confirmation (WhatsApp/email) — keep the reference here." },
      { name: "qty", label: "Qty", type: "number", required: true, default: "1" },
      { name: "price_cents", label: "Unit price (€, ex-VAT)", type: "money", required: true, list: true },
      { name: "cost_cents", label: "Unit cost to us (€)", type: "money", list: true },
      { name: "vat_rate", label: "VAT %", type: "number", required: true, default: "10", help: VAT_HELP },
      { name: "notes", label: "Notes for the driver / supplier", type: "textarea" },
    ],
  },
  prospects: {
    key: "prospects",
    table: "prospects",
    label: "Prospect",
    plural: "Prospects",
    title: "name",
    order: "created_at DESC",
    search: ["name", "company", "email", "country"],
    fields: [
      { name: "name", label: "Contact name", type: "text", required: true, list: true },
      { name: "company", label: "Company", type: "text", list: true },
      { name: "segment", label: "Segment", type: "select", options: ["dmc", "tour_operator", "wedding_planner", "event_agency", "corporate_travel", "hotel", "supplier", "other"], list: true },
      { name: "country", label: "Country", type: "text", list: true },
      { name: "email", label: "Email", type: "text", list: true },
      { name: "phone", label: "Phone (public business number)", type: "text" },
      { name: "linkedin", label: "LinkedIn URL", type: "text" },
      { name: "source", label: "Where you found them", type: "text" },
      { name: "status", label: "Status", type: "select", options: ["new", "in_sequence", "replied", "meeting", "won", "lost", "no_reply", "unsubscribed"], list: true },
      { name: "step", label: "Touches done", type: "number", list: true },
      { name: "next_touch_at", label: "Next touch", type: "date", list: true },
      { name: "notes", label: "Notes", type: "textarea" },
    ],
  },
  events: {
    key: "events",
    table: "events",
    label: "Event",
    plural: "Events",
    title: "name",
    order: "start_date DESC",
    search: ["name", "city"],
    intro: "Corporate events, incentives and weddings. Add components with supplier cost and client price to see budget vs. margin.",
    children: [{ entity: "event_components", fk: "event_id", label: "Components (budget)" }],
    fields: [
      { name: "name", label: "Name", type: "text", required: true, list: true },
      { name: "type", label: "Type", type: "select", options: ["corporate_meeting", "conference", "exhibition", "product_launch", "retreat", "incentive", "wedding", "gala", "private"], list: true },
      { name: "organization_id", label: "Client", type: "ref", ref: { table: "organizations", label: "name" }, list: true },
      { name: "city", label: "City", type: "text", list: true },
      { name: "start_date", label: "Start", type: "date", list: true },
      { name: "end_date", label: "End", type: "date" },
      { name: "pax", label: "Guests", type: "number", list: true },
      { name: "budget_cents", label: "Client budget (€)", type: "money" },
      { name: "status", label: "Status", type: "select", options: ["planning", "confirmed", "running", "completed", "cancelled"], list: true },
      { name: "notes", label: "Notes", type: "textarea" },
    ],
  },
  event_components: {
    key: "event_components",
    table: "event_components",
    label: "Event component",
    plural: "Event components",
    title: "description",
    order: "due_date",
    search: ["description", "type"],
    fields: [
      { name: "event_id", label: "Event", type: "ref", ref: { table: "events", label: "name" }, required: true, list: true },
      { name: "type", label: "Type", type: "select", options: ["hotel", "venue", "catering", "transport", "av", "decor", "activities", "staff", "other"], list: true },
      { name: "description", label: "Description", type: "text", list: true },
      { name: "supplier_id", label: "Supplier", type: "ref", ref: { table: "suppliers", label: "legal_name" } },
      { name: "cost_cents", label: "Supplier cost (€)", type: "money", list: true },
      { name: "price_cents", label: "Client price (€)", type: "money", list: true },
      { name: "due_date", label: "Payment due", type: "date" },
      { name: "status", label: "Status", type: "select", options: ["planned", "requested", "confirmed", "paid", "cancelled"], list: true },
    ],
  },
  commissions: {
    key: "commissions",
    table: "commissions",
    label: "Commission",
    plural: "Commissions",
    title: "party_name",
    order: "created_at DESC",
    search: ["party_name"],
    intro: "Referral/concierge/agent commissions you owe. Pay on completed, paid bookings only.",
    fields: [
      { name: "party_type", label: "Party type", type: "select", options: ["concierge", "planner", "agent", "hotel", "other"], list: true },
      { name: "party_name", label: "Party", type: "text", required: true, list: true },
      { name: "booking_id", label: "Booking", type: "ref", ref: { table: "bookings", label: "ref" }, list: true },
      { name: "basis_cents", label: "Basis (€)", type: "money" },
      { name: "amount_cents", label: "Commission (€)", type: "money", required: true, list: true },
      { name: "status", label: "Status", type: "select", options: ["accrued", "approved", "paid"], list: true },
      { name: "paid_at", label: "Paid on", type: "date" },
    ],
  },
  incidents: {
    key: "incidents",
    table: "incidents",
    label: "Incident",
    plural: "Incidents",
    title: "type",
    order: "reported_at DESC",
    search: ["type", "notes"],
    intro: "Log every no-show, delay, breakdown or complaint — supplier scoring depends on it.",
    fields: [
      { name: "booking_id", label: "Booking", type: "ref", ref: { table: "bookings", label: "ref" }, list: true },
      { name: "supplier_id", label: "Supplier", type: "ref", ref: { table: "suppliers", label: "legal_name" }, list: true },
      { name: "type", label: "Type", type: "select", options: ["no_show", "late", "breakdown", "accident", "complaint", "lost_item", "ztl_fine", "other"], required: true, list: true },
      { name: "severity", label: "Severity", type: "select", options: ["1", "2", "3"], list: true, help: "1 minor · 2 service affected · 3 serious/safety" },
      { name: "reported_at", label: "Reported", type: "date", list: true },
      { name: "resolved_at", label: "Resolved", type: "date" },
      { name: "extra_cost_cents", label: "Extra cost to us (€)", type: "money" },
      { name: "notes", label: "What happened and how it was fixed", type: "textarea" },
    ],
  },
  templates: {
    key: "templates",
    table: "templates",
    label: "Message template",
    plural: "Message templates",
    title: "title",
    order: "key",
    search: ["title", "key", "body"],
    intro: "Use {{first_name}}, {{company}}, {{route}} etc. Import the starter set from Settings & import.",
    fields: [
      { name: "key", label: "Key", type: "text", required: true, list: true, placeholder: "cold_email_agency" },
      { name: "title", label: "Title", type: "text", required: true, list: true },
      { name: "channel", label: "Channel", type: "select", options: ["email", "linkedin", "whatsapp", "followup", "proposal", "supplier", "hotel"], list: true },
      { name: "segment", label: "Segment", type: "text", list: true },
      { name: "body", label: "Body", type: "textarea", required: true },
    ],
  },
  plan_items: {
    key: "plan_items",
    table: "plan_items",
    label: "Plan item",
    plural: "Launch plan items",
    title: "title",
    order: "week, position",
    search: ["title", "phase"],
    fields: [
      { name: "phase", label: "Phase", type: "text", list: true },
      { name: "week", label: "Week", type: "number", list: true },
      { name: "position", label: "Order", type: "number" },
      { name: "title", label: "Task", type: "textarea", required: true, list: true },
      { name: "target", label: "Target / KPI", type: "text", list: true },
      { name: "done_at", label: "Done on", type: "date", list: true },
    ],
  },
  kpi_targets: {
    key: "kpi_targets",
    table: "kpi_targets",
    label: "Monthly target",
    plural: "Monthly targets",
    title: "label",
    order: "month",
    search: ["label"],
    fields: [
      { name: "month", label: "Month #", type: "number", required: true, list: true },
      { name: "label", label: "Label", type: "text", list: true, placeholder: "Oct-26" },
      { name: "gbv_cents", label: "Revenue target / GBV (€)", type: "money", list: true },
      { name: "bookings", label: "Bookings", type: "number", list: true },
      { name: "b2b_accounts", label: "Active B2B accounts", type: "number" },
      { name: "suppliers", label: "Verified suppliers", type: "number" },
      { name: "seo_pages", label: "SEO pages", type: "number" },
      { name: "sessions", label: "Organic sessions", type: "number" },
      { name: "fixed_cents", label: "Fixed costs (€)", type: "money" },
      { name: "notes", label: "Notes", type: "textarea" },
    ],
  },
};

export function getEntity(key: string): EntityDef | undefined {
  return ENTITIES[key];
}
