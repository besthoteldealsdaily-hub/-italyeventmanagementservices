import type { Metadata } from "next";
import { ButtonLink, Container, Eyebrow } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Vehicles: Sedans, Vans, Minibuses & Coaches in Italy",
  description:
    "The vehicle classes we book with licensed partner operators across Italy — capacities, typical uses and how we match vehicles to groups and luggage.",
  path: "/vehicles",
});

const classes = [
  {
    name: "Sedan",
    example: "Mercedes E-Class or similar",
    capacity: "Up to 3 passengers",
    use: "Executive transfers, couples, small families with light luggage",
  },
  {
    name: "Van / minivan",
    example: "Mercedes V-Class / Vito or similar",
    capacity: "Up to 7 passengers",
    use: "Families, small groups, extra luggage, day trips",
  },
  {
    name: "Minibus",
    example: "16–35 seats (Sprinter-type or similar)",
    capacity: "16–35 passengers",
    use: "Wedding shuttles, small corporate groups, hotel–venue loops",
  },
  {
    name: "Coach",
    example: "50+ seats",
    capacity: "50+ passengers",
    use: "Large airport waves, single-route group movements, tours",
  },
  {
    name: "Luxury / VIP",
    example: "S-Class or equivalent",
    capacity: "Up to 3 passengers",
    use: "VIP guests, couple car, delegations",
  },
];

export default function VehiclesPage() {
  return (
    <Container className="py-16 sm:py-24">
      <Eyebrow>Vehicles</Eyebrow>
      <h1 className="mt-3 max-w-3xl text-4xl font-semibold sm:text-5xl">The right vehicle for your group and luggage</h1>
      <p className="mt-5 max-w-2xl text-lg text-muted">
        We book licensed partner operators rather than owning vehicles — so we can match the vehicle to the job. Models
        are &quot;or similar&quot;; the exact vehicle is confirmed on your voucher.
      </p>

      <div className="mt-10 overflow-x-auto rounded-lg border border-line bg-white">
        <table className="w-full min-w-[40rem] text-left text-sm">
          <thead className="bg-sand/60 text-xs uppercase tracking-wider text-muted">
            <tr>
              <th className="px-5 py-3">Class</th>
              <th className="px-5 py-3">Typical example</th>
              <th className="px-5 py-3">Capacity</th>
              <th className="px-5 py-3">Best for</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {classes.map((c) => (
              <tr key={c.name}>
                <th scope="row" className="px-5 py-4 font-semibold">
                  {c.name}
                </th>
                <td className="px-5 py-4 text-muted">{c.example}</td>
                <td className="px-5 py-4">{c.capacity}</td>
                <td className="px-5 py-4 text-muted">{c.use}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-6 max-w-2xl text-sm text-muted">
        Capacity assumes passengers with normal luggage. Tell us how many large suitcases you have and we will size the
        vehicle accordingly. Historic centres and the Amalfi Coast often favour smaller vehicles.
      </p>

      <div className="mt-10">
        <ButtonLink href="/request-a-quote">Get a quote</ButtonLink>
      </div>
    </Container>
  );
}
