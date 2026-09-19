import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { getDb } from "@/lib/db/client";
import { fmtDate, todayRome } from "@/lib/dates";
import { getSettings } from "@/lib/admin/stats";
import { A, btnGhostCls, Card, EmptyRow, Flash, inputCls, Kpi, labelCls, PageHead, SetupNeeded, StatusBadge, SubmitButton, TableWrap, tdCls, thCls } from "@/components/admin/ui";
import { addProspect, importProspects, logTouch, setProspectStatus } from "./actions";

/** Daily targets from the blueprint (§16.3). */
const TARGET = { newProspects: 35, emails: 15, linkedin: 10, whatsapp: 10, followups: 15 };
const STEP_LABEL = ["First touch", "Follow-up #1 (day 3–4)", "Follow-up #2 (day 8–10)", "Follow-up #3 (break-up)"];
const SEGMENTS = ["dmc", "tour_operator", "wedding_planner", "event_agency", "corporate_travel", "hotel", "supplier", "other"];

type Prospect = {
  id: string; name: string; company: string | null; segment: string | null; country: string | null; email: string | null; phone: string | null; linkedin: string | null;
  status: string; step: number; next_touch_at: string | null; last_touch_at: string | null;
};
type Template = { key: string; title: string; channel: string; segment: string | null; body: string };
type Props = { searchParams: Promise<{ view?: string; q?: string; ok?: string; err?: string }> };

function fill(body: string, p: Prospect, sender: string) {
  const first = p.name.split(" ")[0];
  return body
    .replace(/\{\{\s*(first name|name|nome)\s*\}\}/g, first)
    .replace(/\{\{\s*(Name|Nome)\s*\}\}/g, sender || "—")
    .replace(/\{\{\s*(company|Agency)\s*\}\}/gi, p.company ?? "your company");
}

/** Picks the library template for the prospect's next step: first touch by segment, then follow-up f1/f2/f3. */
function suggest(templates: Template[], p: Prospect): Template | undefined {
  if (p.step === 0) return templates.find((t) => t.channel === "email" && t.segment === p.segment) ?? templates.find((t) => t.channel === "email");
  return templates.find((t) => t.channel === "followup" && t.segment === `f${p.step}`);
}

export default async function SalesPage({ searchParams }: Props) {
  await requireAdmin();
  const db = await getDb();
  if (!db) return <SetupNeeded />;
  const sp = await searchParams;
  const view = sp.view === "all" ? "all" : "queue";
  const today = todayRome();
  const settings = await getSettings(db);

  const [counts, queue, templates, all] = await Promise.all([
    db.first<{ added: number; email: number; linkedin: number; whatsapp: number; follow: number }>(
      `SELECT (SELECT COUNT(*) FROM prospects WHERE substr(created_at,1,10) = ?) AS added,
              (SELECT COUNT(*) FROM outreach_log WHERE substr(at,1,10) = ? AND channel = 'email' AND step = 1) AS email,
              (SELECT COUNT(*) FROM outreach_log WHERE substr(at,1,10) = ? AND channel = 'linkedin') AS linkedin,
              (SELECT COUNT(*) FROM outreach_log WHERE substr(at,1,10) = ? AND channel = 'whatsapp') AS whatsapp,
              (SELECT COUNT(*) FROM outreach_log WHERE substr(at,1,10) = ? AND step > 1) AS follow`,
      today, today, today, today, today,
    ),
    db.all<Prospect>(
      `SELECT * FROM prospects WHERE (status = 'new' AND step = 0) OR (status = 'in_sequence' AND next_touch_at IS NOT NULL AND substr(next_touch_at,1,10) <= ?)
       ORDER BY step DESC, next_touch_at, created_at LIMIT 60`,
      today,
    ),
    db.all<Template>("SELECT key, title, channel, segment, body FROM templates ORDER BY key"),
    view === "all"
      ? db.all<Prospect>(
          sp.q ? "SELECT * FROM prospects WHERE name LIKE ? OR company LIKE ? OR email LIKE ? ORDER BY created_at DESC LIMIT 200" : "SELECT * FROM prospects ORDER BY created_at DESC LIMIT 200",
          ...(sp.q ? [`%${sp.q}%`, `%${sp.q}%`, `%${sp.q}%`] : []),
        )
      : Promise.resolve([] as Prospect[]),
  ]);
  const c = counts ?? { added: 0, email: 0, linkedin: 0, whatsapp: 0, follow: 0 };
  const rows = view === "all" ? all : queue;

  return (
    <>
      <PageHead
        title="Sales CRM — outreach queue"
        sub="Each day: add ~35 researched prospects, send ~15 first emails, ~10 LinkedIn, ~10 WhatsApp (public business numbers or warm contacts only), and clear the follow-ups below."
        actions={
          <>
            <Link href={view === "all" ? "/admin/sales" : "/admin/sales?view=all"} className={btnGhostCls}>
              {view === "all" ? "Today’s queue" : "All prospects"}
            </Link>
            <Link href="/admin/data/templates" className={btnGhostCls}>
              Message templates
            </Link>
          </>
        }
      />
      <Flash ok={sp.ok} err={sp.err} />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        <Kpi label="Prospects added today" value={`${c.added} / ${TARGET.newProspects}`} tone={c.added >= TARGET.newProspects ? "good" : undefined} />
        <Kpi label="First emails" value={`${c.email} / ${TARGET.emails}`} tone={c.email >= TARGET.emails ? "good" : undefined} />
        <Kpi label="LinkedIn" value={`${c.linkedin} / ${TARGET.linkedin}`} tone={c.linkedin >= TARGET.linkedin ? "good" : undefined} />
        <Kpi label="WhatsApp" value={`${c.whatsapp} / ${TARGET.whatsapp}`} tone={c.whatsapp >= TARGET.whatsapp ? "good" : undefined} />
        <Kpi label="Follow-ups" value={`${c.follow} / ${TARGET.followups}`} tone={c.follow >= TARGET.followups ? "good" : undefined} />
      </div>

      <p className="mt-4 rounded-md border border-amber-300 bg-amber-50 px-4 py-2 text-xs text-amber-950">
        Compliance: B2B outreach only to business contacts, always identify yourself, and stop immediately when someone opts out (use “Opted out” — it blocks further touches). Never WhatsApp private numbers cold.
        Have your lawyer confirm the GDPR / marketing-consent position for each country you contact.
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card title="Add a prospect">
          <form action={addProspect} className="grid gap-3 sm:grid-cols-2">
            <label>
              <span className={labelCls}>Name *</span>
              <input name="name" required className={`${inputCls} mt-1`} />
            </label>
            <label>
              <span className={labelCls}>Company</span>
              <input name="company" className={`${inputCls} mt-1`} />
            </label>
            <label>
              <span className={labelCls}>Email</span>
              <input name="email" type="email" className={`${inputCls} mt-1`} />
            </label>
            <label>
              <span className={labelCls}>Segment</span>
              <select name="segment" className={`${inputCls} mt-1`} defaultValue="dmc">
                {SEGMENTS.map((s) => (
                  <option key={s} value={s}>
                    {s.replace(/_/g, " ")}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span className={labelCls}>Country</span>
              <input name="country" className={`${inputCls} mt-1`} />
            </label>
            <label>
              <span className={labelCls}>Public phone / WhatsApp</span>
              <input name="phone" className={`${inputCls} mt-1`} />
            </label>
            <label className="sm:col-span-2">
              <span className={labelCls}>LinkedIn URL</span>
              <input name="linkedin" className={`${inputCls} mt-1`} />
            </label>
            <input type="hidden" name="source" value="manual" />
            <div className="sm:col-span-2">
              <SubmitButton pendingText="Adding…">Add prospect</SubmitButton>
            </div>
          </form>
        </Card>
        <Card title="Bulk add (paste a list)">
          <form action={importProspects} className="space-y-3">
            <p className="text-xs text-muted">One per line: <code>Name, Company, email, segment, country</code> — e.g. <code>Anna Rossi, Bella Weddings, anna@bella.it, wedding_planner, IT</code></p>
            <textarea name="lines" rows={6} className={inputCls} aria-label="Prospect list" />
            <SubmitButton pendingText="Importing…">Import</SubmitButton>
          </form>
        </Card>
      </div>

      <Card title={view === "all" ? "All prospects" : `Today’s queue (${queue.length})`} className="mt-6">
        {view === "all" && (
          <form className="mb-3 flex gap-2" role="search">
            <input type="hidden" name="view" value="all" />
            <input name="q" defaultValue={sp.q ?? ""} placeholder="Search name, company, email…" className={`${inputCls} max-w-xs`} aria-label="Search" />
            <button className={btnGhostCls}>Search</button>
          </form>
        )}
        <TableWrap>
          <table className="w-full">
            <thead>
              <tr>
                <th className={thCls}>Prospect</th>
                <th className={thCls}>Next step</th>
                <th className={thCls}>Status</th>
                <th className={thCls}>{view === "all" ? "Last touch" : "Log a touch"}</th>
                <th className={thCls}>Outcome</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {rows.length === 0 && <EmptyRow cols={5} text={view === "all" ? "No prospects yet." : "Queue is clear — add more prospects."} />}
              {rows.map((p) => {
                const tpl = suggest(templates, p);
                return (
                  <tr key={p.id}>
                    <td className={tdCls}>
                      <A href={`/admin/data/prospects/${p.id}`}>{p.name}</A>
                      <span className="block text-xs text-muted">
                        {[p.company, p.segment?.replace(/_/g, " "), p.country].filter(Boolean).join(" · ")}
                      </span>
                      {p.email && <span className="block text-xs">{p.email}</span>}
                      {tpl && view !== "all" && (
                        <details className="mt-1 text-xs">
                          <summary className="cursor-pointer text-accent">Suggested message</summary>
                          <p className="mt-1 max-w-md whitespace-pre-wrap rounded bg-sand/60 p-2">{fill(tpl.body, p, settings.sender_name)}</p>
                        </details>
                      )}
                    </td>
                    <td className={tdCls}>{p.step < 4 ? STEP_LABEL[p.step] : "Finished"}</td>
                    <td className={tdCls}>
                      <StatusBadge status={p.status} />
                      {p.next_touch_at && <span className="block text-xs text-muted">next {fmtDate(p.next_touch_at)}</span>}
                    </td>
                    <td className={tdCls}>
                      {view === "all" ? (
                        fmtDate(p.last_touch_at)
                      ) : (
                        <form action={logTouch.bind(null, p.id)} className="flex flex-wrap items-center gap-1">
                          <select name="channel" className={`${inputCls} w-28`} aria-label="Channel" defaultValue="email">
                            <option value="email">email</option>
                            <option value="linkedin">linkedin</option>
                            <option value="whatsapp">whatsapp</option>
                            <option value="call">call</option>
                          </select>
                          <input name="note" placeholder="note" className={`${inputCls} w-28`} aria-label="Note" />
                          <button className={btnGhostCls}>Done</button>
                        </form>
                      )}
                    </td>
                    <td className={tdCls}>
                      <div className="flex flex-wrap gap-1">
                        {(["replied", "meeting", "won", "lost", "unsubscribed"] as const).map((s) => (
                          <form key={s} action={setProspectStatus.bind(null, p.id, s)}>
                            <button className="rounded border border-line px-2 py-0.5 text-xs hover:border-ink">{s === "unsubscribed" ? "Opted out" : s}</button>
                          </form>
                        ))}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </TableWrap>
      </Card>
    </>
  );
}
