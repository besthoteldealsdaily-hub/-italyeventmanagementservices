import type { Metadata } from "next";
import LegalPage, { controllerName } from "@/components/LegalPage";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy | Italy Event Management Services",
  description: "How we collect, use and protect personal data when you request a quote or use this website.",
  path: "/privacy",
  index: false,
});

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="19 September 2026 (draft)">
      <section>
        <h2>Who we are</h2>
        <p>
          The data controller is {controllerName()}
          {site.company.registeredOffice ? `, ${site.company.registeredOffice}` : ""}. Contact:{" "}
          {site.contact.email}.
        </p>
      </section>
      <section>
        <h2>What data we collect</h2>
        <ul>
          <li>Details you enter in our quote form: name, email, phone/WhatsApp, company, country and trip or event details.</li>
          <li>Messages you send us by email or WhatsApp.</li>
          <li>Technical data (for example IP address and browser type) needed to run and secure the website.</li>
        </ul>
      </section>
      <section>
        <h2>Why we use it, and on what basis</h2>
        <ul>
          <li>To reply to your request and prepare a quote — steps taken at your request before a contract (GDPR art. 6(1)(b)).</li>
          <li>To perform a booking, issue vouchers and invoices, and meet tax and accounting duties (art. 6(1)(b) and (c)).</li>
          <li>To follow up on business enquiries and run our services securely (legitimate interest, art. 6(1)(f)).</li>
          <li>To send marketing where you have agreed, or where the law allows it for business contacts. You can opt out at any time.</li>
        </ul>
      </section>
      <section>
        <h2>Who receives your data</h2>
        <p>
          Service providers that help us run the website and our business (hosting, email delivery, payment processing,
          accounting), and the licensed suppliers who perform your service — who only receive what they need to do so
          (for example names, pick-up details and contact information on the day).
        </p>
      </section>
      <section>
        <h2>How long we keep it</h2>
        <p>
          Unconverted enquiries are kept for up to 24 months. Booking and invoicing records are kept for the period
          required by Italian tax and accounting law.
        </p>
      </section>
      <section>
        <h2>Your rights</h2>
        <p>
          You can ask to access, correct, delete or restrict your data, object to processing, and request portability.
          Write to {site.contact.email}. You also have the right to complain to the Italian data protection authority
          (Garante per la protezione dei dati personali).
        </p>
      </section>
      <section>
        <h2>International transfers</h2>
        <p>
          Some providers may process data outside the EU/EEA. Where they do, we rely on appropriate safeguards such as
          adequacy decisions or standard contractual clauses.
        </p>
      </section>
    </LegalPage>
  );
}
