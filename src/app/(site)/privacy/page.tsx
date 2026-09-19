import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { controllerDetails } from "@/components/LegalPage";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy | Italy Event Management Services",
  description: "How we collect, use and protect personal data when you request a quote, book a service or use this website.",
  path: "/privacy",
  index: false,
});

const purposes: [string, string, string][] = [
  ["Reply to your enquiry and prepare a quote", "Name, contact details, trip or event details", "Steps taken at your request before a contract (GDPR art. 6(1)(b))"],
  ["Arrange and deliver your booking (vouchers, supplier instructions, on-the-day support)", "Traveller names, pick-up and drop-off details, flight numbers, phone number, special requirements", "Performance of a contract (art. 6(1)(b))"],
  ["Invoicing, payments, accounting and tax", "Billing details, payment references, invoices", "Legal obligation (art. 6(1)(c)) and contract"],
  ["Keep the website and our systems secure; prevent spam and fraud", "Technical data such as IP address and request logs", "Legitimate interest (art. 6(1)(f))"],
  ["Follow up with business contacts (agencies, planners, corporate clients) and manage the relationship", "Business contact details, correspondence", "Legitimate interest (art. 6(1)(f)); you can object at any time"],
  ["Send marketing messages", "Name, email", "Your consent (art. 6(1)(a)) or, where the law allows, our legitimate interest in similar services to existing customers. You can opt out at any time"],
];

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="19 September 2026">
      <section>
        <h2>1. Who is responsible for your data</h2>
        <p>
          The data controller is {controllerDetails()}. You can contact us about this policy or about your data at{" "}
          <a className="underline" href={`mailto:${site.contact.email}`}>
            {site.contact.email}
          </a>
          .
        </p>
        <p>
          This policy explains how we handle personal data when you use {site.url.replace("https://", "")}, request a
          quote, make a booking or deal with us as a business contact.
        </p>
      </section>

      <section>
        <h2>2. What data we collect</h2>
        <ul>
          <li>
            <strong>Data you give us:</strong> name, email, phone/WhatsApp number, company and country; trip or event
            details (dates, places, number of guests, luggage, flight numbers, hotels); the message you write; and, for
            bookings, the names of travellers and any special requirements you tell us about (for example accessibility
            or dietary needs).
          </li>
          <li>
            <strong>Payment data:</strong> card payments are handled by our payment provider. We do not store full card
            numbers.
          </li>
          <li>
            <strong>Technical data:</strong> IP address, browser and device information and request logs, created when you
            visit the website and used to run and protect it.
          </li>
        </ul>
        <p>
          Please only tell us about health, religious or similar needs where they matter for arranging the service. We
          use such information only to arrange your service, based on your consent (GDPR art. 9(2)(a)).
        </p>
      </section>

      <section>
        <h2>3. Why we use your data, and on what legal basis</h2>
        <div className="overflow-x-auto rounded-lg border border-line bg-white">
          <table className="w-full min-w-[40rem] text-left text-sm">
            <thead className="bg-sand/60 text-xs uppercase tracking-wider text-muted">
              <tr>
                <th className="px-4 py-3">Purpose</th>
                <th className="px-4 py-3">Data</th>
                <th className="px-4 py-3">Legal basis</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line align-top">
              {purposes.map(([p, d, b]) => (
                <tr key={p}>
                  <td className="px-4 py-3 font-medium">{p}</td>
                  <td className="px-4 py-3 text-muted">{d}</td>
                  <td className="px-4 py-3 text-muted">{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          We do not use automated decision-making or profiling that has legal or similarly significant effects on you.
        </p>
      </section>

      <section>
        <h2>4. Who receives your data</h2>
        <ul>
          <li>
            <strong>Suppliers who deliver your service</strong> — for example the licensed driver or transport company,
            hotel or venue. They receive only what they need (such as names, pick-up details, phone number and timing).
          </li>
          <li>
            <strong>Service providers that help us run the business</strong> — website hosting and security, email and
            messaging tools, payment processing, accounting and IT support. They act on our instructions.
          </li>
          <li>
            <strong>Professional advisers and authorities</strong> — accountants, lawyers, insurers, and public
            authorities where the law requires.
          </li>
        </ul>
        <p>We do not sell your personal data.</p>
      </section>

      <section>
        <h2>5. Transfers outside the EU/EEA</h2>
        <p>
          Some providers may process data outside the EU/EEA, for example in the United States. Where this happens we rely
          on an adequacy decision (such as the EU–US Data Privacy Framework for certified providers) or on the European
          Commission&apos;s standard contractual clauses.
        </p>
      </section>

      <section>
        <h2>6. How long we keep your data</h2>
        <ul>
          <li>Enquiries that do not lead to a booking: up to 24 months.</li>
          <li>Bookings, invoices and accounting records: for the period required by Italian tax and accounting law (generally 10 years).</li>
          <li>Marketing contact details: until you withdraw consent or object.</li>
          <li>Technical and security logs: only as long as needed for security and troubleshooting.</li>
        </ul>
      </section>

      <section>
        <h2>7. Your rights</h2>
        <p>
          You have the right to access your data, have it corrected or erased, restrict or object to its use, receive it
          in a portable format, and withdraw consent at any time (withdrawal does not affect earlier processing). To
          exercise a right, email us; we will answer within one month.
        </p>
        <p>
          You also have the right to lodge a complaint with the Italian data protection authority, the{" "}
          <a className="underline" href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer">
            Garante per la protezione dei dati personali
          </a>
          , or with the authority in your country of residence.
        </p>
      </section>

      <section>
        <h2>8. Providing your data</h2>
        <p>
          Some details are needed to answer a request or perform a booking (for example a way to contact you and the
          trip details). If you do not provide them we may not be able to help. Other fields are optional.
        </p>
      </section>

      <section>
        <h2>9. Cookies</h2>
        <p>
          We currently use only technical cookies and storage that are strictly necessary. See our{" "}
          <Link className="underline" href="/cookies">
            cookie policy
          </Link>
          .
        </p>
      </section>

      <section>
        <h2>10. Children</h2>
        <p>Our services are aimed at adults and businesses. We do not knowingly collect data from children.</p>
      </section>

      <section>
        <h2>11. Changes to this policy</h2>
        <p>We may update this policy. The date at the top shows when it was last changed.</p>
      </section>
    </LegalPage>
  );
}
