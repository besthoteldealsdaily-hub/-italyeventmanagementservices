import Link from "next/link";
import type { ReactNode } from "react";
import SubmitButton from "./SubmitButton";

export { SubmitButton };

export const inputCls =
  "block w-full rounded-md border border-line bg-white px-3 py-2 text-sm text-ink placeholder:text-muted/60 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent";
export const labelCls = "block text-xs font-semibold uppercase tracking-wide text-muted";
export const btnCls =
  "inline-flex items-center justify-center rounded-md bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-dark disabled:opacity-60";
export const btnGhostCls =
  "inline-flex items-center justify-center rounded-md border border-line bg-white px-3 py-1.5 text-sm font-medium text-ink hover:border-ink";
export const btnDangerCls =
  "inline-flex items-center justify-center rounded-md border border-red-300 bg-white px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-50";

export function PageHead({ title, sub, actions }: { title: string; sub?: string; actions?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
      <div>
        <h1 className="text-2xl font-semibold">{title}</h1>
        {sub && <p className="mt-1 text-sm text-muted">{sub}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

export function Card({ title, children, className = "", action }: { title?: string; children: ReactNode; className?: string; action?: ReactNode }) {
  return (
    <section className={`rounded-xl border border-line bg-white p-5 ${className}`}>
      {(title || action) && (
        <div className="mb-3 flex items-center justify-between gap-3">
          {title && <h2 className="font-serif text-lg font-semibold">{title}</h2>}
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

const TONES = {
  gray: "bg-sand text-ink",
  green: "bg-green-100 text-green-800",
  amber: "bg-amber-100 text-amber-900",
  red: "bg-red-100 text-red-800",
  blue: "bg-blue-100 text-blue-800",
} as const;

export function Badge({ tone = "gray", children }: { tone?: keyof typeof TONES; children: ReactNode }) {
  return <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${TONES[tone]}`}>{children}</span>;
}

const STATUS_TONE: Record<string, keyof typeof TONES> = {
  new: "blue", contacted: "amber", quoted: "amber", won: "green", lost: "red", spam: "gray",
  draft: "gray", sent: "amber", accepted: "green", expired: "red", declined: "red",
  pending_payment: "amber", confirmed: "blue", in_progress: "blue", completed: "green", cancelled: "red",
  unpaid: "red", partial: "amber", paid: "green", refunded: "gray",
  requested: "amber", assigned: "blue", done: "green", failed: "red",
  active: "green", prospect: "gray", paused: "amber", blocked: "red",
  pending: "amber", accrued: "amber", open: "amber", resolved: "green",
};

export function StatusBadge({ status }: { status: string | null | undefined }) {
  const s = status ?? "–";
  return <Badge tone={STATUS_TONE[s] ?? "gray"}>{s.replace(/_/g, " ")}</Badge>;
}

export function Flash({ ok, err }: { ok?: string; err?: string }) {
  if (!ok && !err) return null;
  return (
    <p
      role="status"
      className={`mb-4 rounded-md border px-4 py-2 text-sm ${err ? "border-red-200 bg-red-50 text-red-800" : "border-green-200 bg-green-50 text-green-800"}`}
    >
      {err ?? ok}
    </p>
  );
}

export function EmptyRow({ cols, text = "Nothing here yet." }: { cols: number; text?: string }) {
  return (
    <tr>
      <td colSpan={cols} className="px-4 py-8 text-center text-sm text-muted">
        {text}
      </td>
    </tr>
  );
}

export function TableWrap({ children }: { children: ReactNode }) {
  return <div className="overflow-x-auto rounded-xl border border-line bg-white">{children}</div>;
}

export const thCls = "px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-muted bg-sand/50";
export const tdCls = "px-4 py-2.5 text-sm align-top";

export function A({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="font-medium text-accent hover:underline">
      {children}
    </Link>
  );
}

export function Kpi({ label, value, hint, tone }: { label: string; value: string; hint?: string; tone?: "warn" | "good" }) {
  return (
    <div className="rounded-xl border border-line bg-white p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted">{label}</p>
      <p className={`mt-1 font-serif text-2xl font-semibold ${tone === "warn" ? "text-red-700" : tone === "good" ? "text-green-700" : ""}`}>{value}</p>
      {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
    </div>
  );
}

export function SetupNeeded() {
  return (
    <div className="mx-auto max-w-2xl rounded-xl border border-amber-300 bg-amber-50 p-6 text-sm text-amber-950">
      <p className="font-serif text-lg font-semibold">Database not connected yet</p>
      <p className="mt-2">
        The admin panel needs the Cloudflare D1 database. Until it is enabled, the public site keeps working and quote requests are emailed as before.
      </p>
      <ol className="mt-3 list-decimal space-y-1 pl-5">
        <li>
          In <code>wrangler.jsonc</code> add the D1 binding (see <code>docs/ADMIN-SETUP.md</code>), commit and push.
        </li>
        <li>Cloudflare creates the database on the next deploy; tables are created automatically on first use.</li>
        <li>
          Set the runtime secrets <code>ADMIN_PASSWORD</code> and <code>SESSION_SECRET</code>, then log in.
        </li>
      </ol>
    </div>
  );
}
