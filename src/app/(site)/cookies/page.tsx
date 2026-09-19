import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Cookie Policy | Italy Event Management Services",
  description: "Which cookies and similar technologies this website uses, and how to control them.",
  path: "/cookies",
  index: false,
});

const ANALYTICS = Boolean(process.env.NEXT_PUBLIC_GA_ID);

export default function CookiesPage() {
  return (
    <LegalPage title="Cookie Policy" updated="19 September 2026">
      <section>
        <h2>What this website uses</h2>
        <p>
          This website uses only technical cookies and similar storage that are strictly necessary for it to work and to
          keep it secure — for example to protect the quote form against spam. These do not require consent.
        </p>
        <div className="mt-4 overflow-x-auto rounded-lg border border-line bg-white">
          <table className="w-full min-w-[32rem] text-left text-sm">
            <thead className="bg-sand/60 text-xs uppercase tracking-wider text-muted">
              <tr>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Used?</th>
                <th className="px-4 py-3">Purpose</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              <tr>
                <th scope="row" className="px-4 py-3 font-medium">Strictly necessary</th>
                <td className="px-4 py-3">Yes</td>
                <td className="px-4 py-3 text-muted">Site operation, security and form protection</td>
              </tr>
              <tr>
                <th scope="row" className="px-4 py-3 font-medium">Analytics / statistics</th>
                <td className="px-4 py-3">{ANALYTICS ? "Only if you accept" : "No"}</td>
                <td className="px-4 py-3 text-muted">
                  {ANALYTICS ? "Google Analytics 4 (cookies _ga and _ga_*, up to 2 years) to measure visits. Not loaded until you press “Accept analytics”; change your choice any time under “Cookie settings” in the footer." : "—"}
                </td>
              </tr>
              <tr>
                <th scope="row" className="px-4 py-3 font-medium">Advertising / tracking</th>
                <td className="px-4 py-3">No</td>
                <td className="px-4 py-3 text-muted">—</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>Fonts and external links</h2>
        <p>
          Fonts are served from our own domain. Links to external services — for example WhatsApp or our contact email —
          open those services, which have their own privacy and cookie policies.
        </p>
      </section>

      <section>
        <h2>If this changes</h2>
        <p>
          Before we use any non-essential cookies (such as analytics or advertising), we will ask for your consent
          through a cookie banner and list each cookie here with its purpose and duration.
        </p>
      </section>

      <section>
        <h2>Controlling cookies</h2>
        <p>
          You can delete or block cookies in your browser settings. Blocking strictly necessary storage may affect parts
          of the website, such as the quote form.
        </p>
      </section>
    </LegalPage>
  );
}
