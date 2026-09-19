import { requireAdmin } from "@/lib/auth";
import { getDb } from "@/lib/db/client";
import { getSettings } from "@/lib/admin/stats";
import { mailConfigured } from "@/lib/mail";
import { stripeEnabled } from "@/lib/stripe";
import { Badge, Card, Flash, inputCls, labelCls, PageHead, SetupNeeded, SubmitButton } from "@/components/admin/ui";
import { importSeed, saveSettings } from "./actions";

type Props = { searchParams: Promise<{ ok?: string; err?: string }> };

const FIELDS: { group: string; items: { key: string; label: string; help?: string; type?: "date" | "select"; options?: string[] }[] }[] = [
  {
    group: "Business",
    items: [
      { key: "company_legal_name", label: "Legal company name", help: "Shown on invoices and the payment page." },
      { key: "company_vat_id", label: "VAT number (P.IVA)" },
      { key: "sender_name", label: "Your name in outreach messages", help: "Replaces {{Name}} in message templates." },
      { key: "launch_date", label: "Launch date", type: "date", help: "Used to line up the monthly KPI targets with real months." },
    ],
  },
  {
    group: "Bank transfer details (shown on the payment page)",
    items: [
      { key: "bank_beneficiary", label: "Account holder" },
      { key: "bank_iban", label: "IBAN" },
      { key: "bank_bic", label: "BIC / SWIFT" },
    ],
  },
  {
    group: "Quotes & payment terms",
    items: [
      { key: "quote_valid_days", label: "Quote validity (days)" },
      { key: "deposit_pct", label: "Default deposit % (non-transfer bookings)" },
      { key: "balance_due_days", label: "Balance due (days before service)" },
      { key: "terms_version", label: "Terms version recorded at acceptance", help: "Change when you publish new Terms." },
      { key: "vat_regime", label: "Default VAT regime", type: "select", options: ["ordinary", "margin_74ter"], help: "Ask your accountant which regime applies to your services." },
    ],
  },
  {
    group: "Profit tracking",
    items: [
      { key: "target_net_monthly", label: "Monthly net profit target (€)" },
      { key: "fixed_costs_monthly", label: "Fixed costs per month (€)", help: "Software, insurance, accountant, marketing, your minimum pay…" },
      { key: "min_margin_pct", label: "Minimum acceptable margin %", help: "Bookings below this are flagged red in Finance." },
      { key: "card_fee_pct", label: "Card fee estimate %", help: "Used only when the real fee was not recorded." },
      { key: "card_fee_fixed", label: "Card fee fixed part (€ per payment)" },
    ],
  },
];

const flag = (ok: boolean) => <Badge tone={ok ? "green" : "amber"}>{ok ? "on" : "off"}</Badge>;

export default async function SettingsPage({ searchParams }: Props) {
  await requireAdmin();
  const db = await getDb();
  if (!db) return <SetupNeeded />;
  const sp = await searchParams;
  const settings = await getSettings(db);
  const counts = await Promise.all(
    ["leads", "quotes", "bookings", "suppliers", "prospects", "plan_items", "kpi_targets", "templates", "routes"].map(async (t) => [t, await db.scalar(`SELECT COUNT(*) FROM ${t}`)] as const),
  );

  return (
    <>
      <PageHead title="Settings & import" sub="Business settings, system status and importing your private planning files." />
      <Flash ok={sp.ok} err={sp.err} />

      <form action={saveSettings} className="space-y-6">
        {FIELDS.map((g) => (
          <Card key={g.group} title={g.group}>
            <div className="grid gap-4 sm:grid-cols-2">
              {g.items.map((f) => (
                <div key={f.key}>
                  <label htmlFor={f.key} className={labelCls}>
                    {f.label}
                  </label>
                  {f.type === "select" ? (
                    <select id={f.key} name={f.key} defaultValue={settings[f.key]} className={`${inputCls} mt-1`}>
                      {f.options?.map((o) => (
                        <option key={o} value={o}>
                          {o.replace(/_/g, " ")}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input id={f.key} name={f.key} type={f.type ?? "text"} defaultValue={settings[f.key]} className={`${inputCls} mt-1`} />
                  )}
                  {f.help && <p className="mt-1 text-xs text-muted">{f.help}</p>}
                </div>
              ))}
            </div>
          </Card>
        ))}
        <SubmitButton>Save settings</SubmitButton>
      </form>

      <Card title="System status" className="mt-6">
        <ul className="grid gap-2 text-sm sm:grid-cols-2">
          <li>Database (D1): {flag(true)}</li>
          <li>Transactional email (Resend): {flag(mailConfigured())}</li>
          <li>Card payments (Stripe key): {flag(stripeEnabled())}</li>
          <li>Stripe webhook secret: {flag(Boolean(process.env.STRIPE_WEBHOOK_SECRET))}</li>
          <li>Lead webhook (Telegram/Slack/Make): {flag(Boolean(process.env.LEAD_WEBHOOK_URL))}</li>
          <li>Bot check (Turnstile): {flag(Boolean(process.env.TURNSTILE_SECRET_KEY && process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY))}</li>
          <li>Analytics (GA4): {flag(Boolean(process.env.NEXT_PUBLIC_GA_ID))}</li>
        </ul>
        <p className="mt-3 text-xs text-muted">
          Rows: {counts.map(([t, c]) => `${t.replace(/_/g, " ")} ${c}`).join(" · ")}
        </p>
        <p className="mt-2 text-xs text-muted">Secrets are set in the Cloudflare dashboard (Workers → Settings → Variables and Secrets), never in this app.</p>
      </Card>

      <Card title="Import planning data" className="mt-6">
        <p className="text-sm text-muted">
          Upload a JSON file from your <strong>private</strong> blueprint folder (<code>blueprint/seed/*.json</code>) — launch plan, monthly targets, message templates or routes. Importing again updates existing
          rows instead of duplicating them.
        </p>
        <form action={importSeed} className="mt-4 space-y-3">
          <input type="file" name="file" accept="application/json,.json" className="block text-sm" aria-label="JSON file" />
          <textarea name="json" rows={4} placeholder="…or paste JSON here" className={inputCls} aria-label="JSON" />
          <SubmitButton pendingText="Importing…">Import</SubmitButton>
        </form>
      </Card>
    </>
  );
}
