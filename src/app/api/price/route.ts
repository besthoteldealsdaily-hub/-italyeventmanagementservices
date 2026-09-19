import { getDb } from "@/lib/db/client";
import { todayRome } from "@/lib/dates";

export const dynamic = "force-dynamic";

const SLUG = /^[a-z0-9-]{2,120}$/;
const ORDER = ["sedan", "van", "minibus", "coach", "luxury"];

/**
 * Public "from" prices for a route/airport page (B2C, currently valid, cheapest per vehicle class).
 * Returns an empty list when nothing is priced — the page then shows no price at all (never a made-up one).
 */
export async function GET(req: Request) {
  const slug = new URL(req.url).searchParams.get("slug") ?? "";
  const headers = { "Content-Type": "application/json", "Cache-Control": "public, max-age=300, s-maxage=300" };
  if (!SLUG.test(slug)) return new Response(JSON.stringify({ prices: [] }), { status: 400, headers });

  try {
    const db = await getDb();
    if (!db) return new Response(JSON.stringify({ prices: [] }), { headers });
    const today = todayRome();
    const rows = await db.all<{ vehicle_class: string; price_cents: number }>(
      `SELECT sp.vehicle_class AS vehicle_class, MIN(sp.price_cents) AS price_cents
       FROM sell_prices sp JOIN routes r ON r.id = sp.route_id
       WHERE r.slug = ? AND sp.channel = 'b2c' AND sp.price_cents > 0
         AND (sp.valid_from IS NULL OR sp.valid_from = '' OR sp.valid_from <= ?)
         AND (sp.valid_to IS NULL OR sp.valid_to = '' OR sp.valid_to >= ?)
       GROUP BY sp.vehicle_class`,
      slug,
      today,
      today,
    );
    rows.sort((a, b) => ORDER.indexOf(a.vehicle_class) - ORDER.indexOf(b.vehicle_class));
    return new Response(JSON.stringify({ prices: rows.map((r) => ({ vehicleClass: r.vehicle_class, priceCents: r.price_cents })) }), { headers });
  } catch {
    return new Response(JSON.stringify({ prices: [] }), { headers });
  }
}
