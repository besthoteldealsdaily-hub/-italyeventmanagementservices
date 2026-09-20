import type { Faq } from "@/content/types";

export default function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="divide-y divide-line rounded-lg border border-line bg-white">
      {faqs.map((f) => (
        <details key={f.q} className="group px-5 py-4">
          <summary className="-mx-5 flex cursor-pointer items-center justify-between gap-4 px-5 font-medium transition-colors hover:text-accent">
            {f.q}
            <svg aria-hidden viewBox="0 0 20 20" className="chev h-4 w-4 shrink-0 text-muted transition-transform duration-300" fill="currentColor">
              <path d="M5.3 7.3a1 1 0 0 1 1.4 0L10 10.6l3.3-3.3a1 1 0 1 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 0-1.4Z" />
            </svg>
          </summary>
          <p className="mt-3 leading-relaxed text-muted">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
