import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { getDb } from "@/lib/db/client";
import { fmtDateTime, nowRome, todayRome } from "@/lib/dates";
import { syncReminderTasks } from "@/lib/admin/stats";
import { A, Card, Flash, inputCls, PageHead, SetupNeeded, SubmitButton } from "@/components/admin/ui";
import { addTask, toggleTask } from "../common-actions";

type Task = { id: string; title: string; due_at: string | null; done_at: string | null; entity_type: string | null; entity_id: string | null };
type Props = { searchParams: Promise<{ show?: string; ok?: string; err?: string }> };

const linkFor = (t: Task) =>
  t.entity_type === "booking" ? `/admin/bookings/${t.entity_id}` : t.entity_type === "quote" ? `/admin/quotes/${t.entity_id}` : t.entity_type === "lead" ? `/admin/leads/${t.entity_id}` : null;

export default async function TasksPage({ searchParams }: Props) {
  await requireAdmin();
  const db = await getDb();
  if (!db) return <SetupNeeded />;
  const sp = await searchParams;
  await syncReminderTasks(db, todayRome());
  const showDone = sp.show === "done";
  const tasks = await db.all<Task>(
    showDone
      ? "SELECT * FROM tasks WHERE done_at IS NOT NULL ORDER BY done_at DESC LIMIT 100"
      : "SELECT * FROM tasks WHERE done_at IS NULL ORDER BY due_at IS NULL, due_at LIMIT 300",
  );
  const now = nowRome();
  const overdue = tasks.filter((t) => t.due_at && t.due_at < now);
  const later = tasks.filter((t) => !t.due_at || t.due_at >= now);

  const Row = ({ t }: { t: Task }) => {
    const href = linkFor(t);
    return (
      <li>
        <form action={toggleTask.bind(null, t.id)} className="flex items-center gap-2 text-sm">
          <input type="hidden" name="return" value="/admin/tasks" />
          <button className={`h-5 w-5 shrink-0 rounded border ${t.done_at ? "border-green-600 bg-green-600 text-white" : "border-line bg-white"}`} aria-label={t.done_at ? "Reopen" : "Done"}>
            {t.done_at ? "✓" : ""}
          </button>
          <span className={t.done_at ? "text-muted line-through" : ""}>{t.title}</span>
          {href && <A href={href}>open</A>}
          <span className={`ml-auto shrink-0 text-xs ${!t.done_at && t.due_at && t.due_at < now ? "font-semibold text-red-700" : "text-muted"}`}>{fmtDateTime(t.due_at)}</span>
        </form>
      </li>
    );
  };

  return (
    <>
      <PageHead
        title="Tasks"
        sub="Booking checklists are created automatically (T−72 h, T−24 h, T−3 h, after service). Add your own below."
        actions={
          <Link href={showDone ? "/admin/tasks" : "/admin/tasks?show=done"} className="text-sm font-medium text-accent hover:underline">
            {showDone ? "Show open tasks" : "Show completed"}
          </Link>
        }
      />
      <Flash ok={sp.ok} err={sp.err} />
      {!showDone && (
        <form action={addTask.bind(null, "", "", "/admin/tasks")} className="mb-6 flex flex-col gap-2 sm:flex-row">
          <input name="title" required placeholder="New task…" className={inputCls} aria-label="Task" />
          <input name="due_at" type="datetime-local" className={`${inputCls} sm:w-56`} aria-label="Due" />
          <SubmitButton pendingText="Adding…">Add</SubmitButton>
        </form>
      )}
      {showDone ? (
        <Card>
          <ul className="space-y-2">{tasks.map((t) => <Row key={t.id} t={t} />)}</ul>
        </Card>
      ) : (
        <div className="space-y-6">
          <Card title={`Overdue (${overdue.length})`}>
            <ul className="space-y-2">
              {overdue.length === 0 && <li className="text-sm text-muted">Nothing overdue.</li>}
              {overdue.map((t) => <Row key={t.id} t={t} />)}
            </ul>
          </Card>
          <Card title={`Upcoming (${later.length})`}>
            <ul className="space-y-2">
              {later.length === 0 && <li className="text-sm text-muted">No upcoming tasks.</li>}
              {later.map((t) => <Row key={t.id} t={t} />)}
            </ul>
          </Card>
        </div>
      )}
    </>
  );
}
