import type { Metadata } from "next";
import LegalPage, { controllerName } from "@/components/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Service | Italy Event Management Services",
  description: "Terms that apply to quotes, bookings and services arranged through this website.",
  path: "/terms",
  index: false,
});

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" updated="19 September 2026 (draft)">
      <section>
        <h2>1. Who we are and who provides each service</h2>
        <p>
          Services are arranged by {controllerName()}. Each service (for example a transfer or a hotel stay) is
          performed by the licensed supplier named on your voucher. Your quote and voucher state who performs each
          service.
        </p>
      </section>
      <section>
        <h2>2. Quotes and prices</h2>
        <p>
          A quote is valid for the period stated on it. Prices are in euros unless stated, include the items listed as
          included and show any extras (for example city access fees, night supplements or waiting time) as separate
          lines. VAT is shown according to the applicable rules.
        </p>
      </section>
      <section>
        <h2>3. Booking and payment</h2>
        <p>
          A booking is confirmed when you accept the quote and the required payment is received. Payment schedules
          (deposit and balance) are stated in the quote.
        </p>
      </section>
      <section>
        <h2>4. Changes and cancellation</h2>
        <p>See our cancellation policy. Changes are subject to availability and supplier terms.</p>
      </section>
      <section>
        <h2>5. Responsibilities</h2>
        <p>
          You must provide accurate details (dates, times, flight numbers, passenger numbers and luggage). We are
          responsible for arranging the services as described; suppliers are responsible for performing them. Nothing
          limits liability that cannot be limited by law.
        </p>
      </section>
      <section>
        <h2>6. Complaints</h2>
        <p>Please contact us as soon as possible so that we can resolve any issue during your trip.</p>
      </section>
      <section>
        <h2>7. Governing law</h2>
        <p>Italian law applies, without prejudice to mandatory consumer protections in your country of residence.</p>
      </section>
    </LegalPage>
  );
}
