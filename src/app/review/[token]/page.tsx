import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDb } from "@/lib/db/client";
import DocShell from "@/components/DocShell";
import SubmitButton from "@/components/admin/SubmitButton";
import { submitReview } from "./actions";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: { absolute: "How was your service? | Italy Event Management Services" }, robots: { index: false, follow: false } };

type Props = { params: Promise<{ token: string }>; searchParams: Promise<{ done?: string; err?: string }> };

export default async function ReviewPage({ params, searchParams }: Props) {
  const { token } = await params;
  const db = await getDb();
  if (!db) notFound();
  const r = await db.first<{ rating: number | null }>("SELECT rating FROM reviews WHERE token = ?", token);
  if (!r) notFound();
  const sp = await searchParams;
  const done = Boolean(r.rating) || sp.done === "1";
  const googleUrl = process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL;

  return (
    <DocShell>
      <h1 className="font-serif text-3xl font-semibold">How was your service?</h1>
      {done ? (
        <div className="mt-6 rounded-xl border border-line bg-white p-5 text-sm">
          <p className="font-medium">Thank you for your feedback.</p>
          {r.rating && r.rating >= 4 && googleUrl && (
            <p className="mt-2">
              Would you share it publicly too?{" "}
              <a className="font-medium text-accent underline" href={googleUrl} target="_blank" rel="noopener noreferrer">
                Leave a Google review
              </a>
            </p>
          )}
          {r.rating && r.rating <= 3 && <p className="mt-2">We are sorry we fell short — someone from our team will contact you to put it right.</p>}
        </div>
      ) : (
        <form action={submitReview.bind(null, token)} className="mt-6 space-y-4 rounded-xl border border-line bg-white p-5">
          {sp.err && <p role="alert" className="text-sm text-red-700">Please choose a rating.</p>}
          <fieldset>
            <legend className="text-xs font-semibold uppercase tracking-wide text-muted">Your rating</legend>
            <div className="mt-2 flex gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <label key={n} className="cursor-pointer">
                  <input type="radio" name="rating" value={n} required className="peer sr-only" />
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-line bg-white text-base font-semibold peer-checked:border-accent peer-checked:bg-accent peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-accent">
                    {n}
                  </span>
                </label>
              ))}
            </div>
            <p className="mt-1 text-xs text-muted">1 = poor, 5 = excellent</p>
          </fieldset>
          <label className="block text-sm">
            <span className="text-xs font-semibold uppercase tracking-wide text-muted">Comments (optional)</span>
            <textarea name="comment" rows={4} maxLength={1500} className="mt-1 block w-full rounded-md border border-line px-3 py-2" />
          </label>
          <SubmitButton pendingText="Sending…">Send feedback</SubmitButton>
        </form>
      )}
    </DocShell>
  );
}
