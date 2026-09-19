import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { getDb } from "@/lib/db/client";
import { fmtDateTime } from "@/lib/dates";
import { SERVICE_OPTIONS } from "@/lib/quote-options";
import NotesPanel from "@/components/admin/NotesPanel";
import { Card, Flash, inputCls, PageHead, SetupNeeded, StatusBadge, SubmitButton, btnCls, btnGhostCls } from "@/components/admin/ui";
import { createCustomerFromLead, createQuoteFromLead, createSupplierFromLead, setLeadStatus } from "../actions";

type Props = { params: Promise<{ id: string }>; searchParams: Promise<{ ok?: string; err?: string }> };

const STATUSES = ["new", "contacted", "quoted", "won", "lost", "spam"];

export default async function LeadDetail({ params, searchParams }: Props) {
  await requireAdmin();
  const { id } = await params;
  const db = await getDb();
  if (!db) return <SetupNeeded />;
  const lead = await db.byId<Record<string, string | null>>("leads", id);
  if (!lead) notFound();
  const sp = await searchParams;

  let payload: Record<string, unknown> = {};
  try {
    payload = lead.payload ? JSON.parse(lead.payload) : {};
  } catch {
    payload = {};
  }
  const shownElsewhere = new Set(["service", "name", "email", "phone", "company", "country", "message"]);
  const extra = Object.entries(payload).filter(([k, v]) => !shownElsewhere.has(k) && v !== "" && v !== undefined);
  const service = SERVICE_OPTIONS.find((o) => o.value === lead.service)?.label ?? lead.service;
  const linkedQuote = await db.first<{ id: string; ref: string }>("SELECT id, ref FROM quotes WHERE lead_id = ? ORDER BY created_at DESC", id);
  const digits = (lead.phone ?? "").replace(/[^\d]/g, "");

  return (
    <>
      <PageHead
        title={`${lead.ref} — ${lead.name}`}
        sub={`${service} · received ${fmtDateTime((lead.created_at ?? "").slice(0, 16))}`}
        actions={
          <Link href="/admin/leads" className="text-sm font-medium text-accent hover:underline">
            ← All leads
          </Link>
        }
      />
      <Flash ok={sp.ok} err={sp.err} />

      <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
        <Card title="Request">
          <dl className="grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
            {[
              ["Name", lead.name],
              ["Company", lead.company],
              ["Email", lead.email],
              ["Phone / WhatsApp", lead.phone],
              ["Country", lead.country],
              ...extra.map(([k, v]) => [k.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase()), String(v)] as [string, string]),
            ]
              .filter(([, v]) => v)
              .map(([k, v]) => (
                <div key={k as string}>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-muted">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
          </dl>
          {lead.message && (
            <div className="mt-4 rounded-md bg-sand/60 p-3 text-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">Message</p>
              <p className="mt-1 whitespace-pre-wrap">{lead.message}</p>
            </div>
          )}
          <div className="mt-4 flex flex-wrap gap-2">
            {lead.email && (
              <a className={btnGhostCls} href={`mailto:${lead.email}?subject=${encodeURIComponent(`Your request ${lead.ref}`)}`}>
                Email
              </a>
            )}
            {digits && (
              <a
                className={btnGhostCls}
                href={`https://wa.me/${digits}?text=${encodeURIComponent(`Hello ${lead.name}, about your request ${lead.ref}…`)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
            )}
          </div>
        </Card>

        <div className="space-y-6">
          <Card title="Status">
            <p className="mb-3">
              <StatusBadge status={lead.status} />
              {lead.first_response_at && <span className="ml-2 text-xs text-muted">first reply {fmtDateTime(lead.first_response_at.slice(0, 16))}</span>}
            </p>
            <form action={setLeadStatus.bind(null, id)} className="flex gap-2">
              <select name="status" defaultValue={lead.status ?? "new"} className={inputCls} aria-label="Status">
                {STATUSES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
              <SubmitButton>Set</SubmitButton>
            </form>
          </Card>
          <Card title="Next step">
            <div className="flex flex-col gap-2">
              {linkedQuote && (
                <Link href={`/admin/quotes/${linkedQuote.id}`} className={btnGhostCls}>
                  Open quote {linkedQuote.ref}
                </Link>
              )}
              {lead.service === "supplier" ? (
                <form action={createSupplierFromLead.bind(null, id)}>
                  <SubmitButton className="w-full">Create supplier &amp; start onboarding</SubmitButton>
                </form>
              ) : lead.service === "trade" ? (
                <form action={createCustomerFromLead.bind(null, id)}>
                  <SubmitButton className="w-full">Create trade customer</SubmitButton>
                </form>
              ) : (
                !linkedQuote && (
                  <form action={createQuoteFromLead.bind(null, id)}>
                    <button className={`${btnCls} w-full`}>Create quote</button>
                  </form>
                )
              )}
            </div>
          </Card>
        </div>
      </div>

      <NotesPanel db={db} entityType="lead" entityId={id} returnPath={`/admin/leads/${id}`} />
    </>
  );
}
