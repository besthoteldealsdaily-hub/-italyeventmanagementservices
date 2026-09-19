import type { Db } from "@/lib/db/client";
import { addNote } from "@/app/admin/(panel)/common-actions";
import { fmtDateTime } from "@/lib/dates";
import { Card, inputCls, SubmitButton } from "./ui";

/** History + "add note" form for any record. Every customer conversation should be logged here. */
export default async function NotesPanel({ db, entityType, entityId, returnPath }: { db: Db; entityType: string; entityId: string; returnPath: string }) {
  const notes = await db.all<{ id: string; channel: string; body: string; created_at: string }>(
    "SELECT id, channel, body, created_at FROM communications WHERE entity_type = ? AND entity_id = ? ORDER BY created_at DESC LIMIT 50",
    entityType,
    entityId,
  );
  return (
    <Card title="Notes & history" className="mt-6">
      <form action={addNote.bind(null, entityType, entityId, returnPath)} className="flex flex-col gap-2 sm:flex-row">
        <select name="channel" className={`${inputCls} sm:w-36`} aria-label="Channel" defaultValue="note">
          <option value="note">Note</option>
          <option value="call">Call</option>
          <option value="email">Email</option>
          <option value="whatsapp">WhatsApp</option>
          <option value="meeting">Meeting</option>
        </select>
        <input name="body" required placeholder="What was said / agreed?" className={inputCls} aria-label="Note" />
        <SubmitButton pendingText="Adding…">Add</SubmitButton>
      </form>
      <ul className="mt-4 space-y-2 text-sm">
        {notes.length === 0 && <li className="text-muted">No notes yet.</li>}
        {notes.map((n) => (
          <li key={n.id} className="rounded-md border border-line px-3 py-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-muted">
              {n.channel} · {fmtDateTime(n.created_at.slice(0, 16))}
            </span>
            <p className="mt-0.5 whitespace-pre-wrap">{n.body}</p>
          </li>
        ))}
      </ul>
    </Card>
  );
}
