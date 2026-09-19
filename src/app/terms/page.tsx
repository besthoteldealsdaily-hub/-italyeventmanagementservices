import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { controllerDetails } from "@/components/LegalPage";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Service | Italy Event Management Services",
  description: "The terms that apply to quotes, bookings and services arranged through Italy Event Management Services.",
  path: "/terms",
  index: false,
});

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" updated="19 September 2026">
      <section>
        <h2>1. Who we are and what we do</h2>
        <p>
          These terms apply to quotes, bookings and services arranged by {controllerDetails()} (&quot;we&quot;,
          &quot;us&quot;). We coordinate ground transportation, group accommodation and event logistics in Italy. Each
          service is performed by an independent, licensed supplier (for example a transport operator or a hotel). Your
          quote and voucher name the supplier that performs each service.
        </p>
      </section>

      <section>
        <h2>2. Quotes and prices</h2>
        <ol>
          <li>A quote is valid for the period stated on it. After that, availability and prices may change.</li>
          <li>Prices are in euros unless stated otherwise and show VAT according to the applicable rules.</li>
          <li>
            The quote lists what is included. Anything else — for example city access or parking fees, night or
            early-morning supplements, extra waiting time, extra stops — is shown as a separate line or agreed with you
            before it is charged.
          </li>
        </ol>
      </section>

      <section>
        <h2>3. Booking and payment</h2>
        <ol>
          <li>
            A booking is confirmed when you accept our quote in writing (including by email or online acceptance) and
            we have received the payment due at that stage.
          </li>
          <li>
            Transfers and single services are normally paid in full at booking. Groups, weddings and events use a
            deposit and balance schedule shown in the quote.
          </li>
          <li>
            Card payments are processed by our payment provider over a secure connection. Business customers can agree
            bank transfer and invoice terms with us in writing.
          </li>
          <li>If a payment is not received by its due date, we may release your booking.</li>
        </ol>
      </section>

      <section>
        <h2>4. Your responsibilities</h2>
        <ul>
          <li>
            Give us accurate information: dates and times, flight numbers, addresses, number of passengers, luggage and
            any special requirements. Vehicle and service choices are based on it.
          </li>
          <li>Be at the agreed place on time. Tell us promptly if plans change.</li>
          <li>Follow the reasonable instructions of drivers and staff, and local rules such as seat-belt requirements.</li>
          <li>You are responsible for damage or excessive cleaning caused by you or your group.</li>
        </ul>
      </section>

      <section>
        <h2>5. How services are delivered</h2>
        <ul>
          <li>
            <strong>Waiting time.</strong> For airport pick-ups the quoted price includes 60 minutes of waiting after
            your flight lands; for other pick-ups, 15 minutes. Extra waiting is charged at the rate in your quote.
          </li>
          <li>
            <strong>Access rules.</strong> Many Italian city centres and the Amalfi Coast restrict vehicle access. Where
            a vehicle cannot legally reach your exact address, the driver will use the nearest permitted point and we
            will tell you in advance where it is.
          </li>
          <li>
            <strong>Timing.</strong> Journey times are estimates and depend on traffic, weather and road conditions.
          </li>
          <li>
            <strong>Substitutions.</strong> We may replace a vehicle, driver or supplier with an equivalent one. If we
            cannot provide an equivalent service, you may cancel that service and receive a refund of what you paid for it.
          </li>
        </ul>
      </section>

      <section>
        <h2>6. Changes and cancellation by you</h2>
        <p>
          Cancellation and change terms are in our{" "}
          <Link className="underline" href="/cancellation-policy">
            cancellation policy
          </Link>{" "}
          and in your quote. Group, wedding and event bookings mirror the cancellation terms of the suppliers involved.
        </p>
      </section>

      <section>
        <h2>7. Liability</h2>
        <ol>
          <li>
            We are responsible for arranging your services as described in the quote, and we take care in choosing and
            monitoring our suppliers. Suppliers are responsible for performing their services.
          </li>
          <li>
            Nothing in these terms excludes or limits liability for death or personal injury, for fraud, for wilful
            misconduct or gross negligence, or any liability that cannot be excluded or limited by law.
          </li>
          <li>
            Subject to that, and to the extent the law allows, our liability to business customers for a service is limited
            to the price paid for that service. We are not liable for indirect or consequential loss such as lost profit.
            This paragraph does not reduce the statutory rights of consumers.
          </li>
          <li>
            We are not liable for failure or delay caused by events beyond our reasonable control, such as severe
            weather, strikes, road closures, accidents, public-authority orders or airline disruption. In these cases we
            will help you re-plan where we reasonably can.
          </li>
        </ol>
      </section>

      <section>
        <h2>8. Complaints</h2>
        <p>
          If something is wrong during your service, please contact the dispatch number on your voucher straight away so
          that we can fix it on the spot. For anything else, write to{" "}
          <a className="underline" href={`mailto:${site.contact.email}`}>
            {site.contact.email}
          </a>{" "}
          within 14 days after the service and we will reply within 14 days.
        </p>
      </section>

      <section>
        <h2>9. Consumers</h2>
        <p>
          If you are a consumer, these terms do not affect your statutory rights. Under the Italian Consumer Code
          (art. 59), the 14-day right of withdrawal for distance contracts does not apply to accommodation, car rental,
          catering and leisure services booked for a specific date or period.
        </p>
      </section>

      <section>
        <h2>10. Personal data</h2>
        <p>
          We handle personal data as described in our{" "}
          <Link className="underline" href="/privacy">
            privacy policy
          </Link>
          .
        </p>
      </section>

      <section>
        <h2>11. Website content</h2>
        <p>
          The text, design and images on this website belong to us or our licensors. You may not copy or reuse them
          commercially without our written permission.
        </p>
      </section>

      <section>
        <h2>12. Governing law</h2>
        <p>
          These terms are governed by Italian law. Disputes are for the competent Italian courts. If you are a consumer,
          you keep the protection of mandatory consumer law in your country of residence and may bring proceedings in
          the courts of your place of residence.
        </p>
      </section>

      <section>
        <h2>13. Changes to these terms</h2>
        <p>
          We may update these terms. The version that applies to a booking is the one published when you accepted the
          quote.
        </p>
      </section>
    </LegalPage>
  );
}
