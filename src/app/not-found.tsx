import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ButtonLink, Container } from "@/components/ui";

export const metadata: Metadata = { title: "Page not found", robots: { index: false, follow: false } };

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Container narrow className="py-28 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">404</p>
          <h1 className="mt-3 text-4xl font-semibold">This page isn&apos;t available</h1>
          <p className="mt-4 text-muted">
            It may have moved, or it isn&apos;t published yet. Tell us what you&apos;re planning and we&apos;ll help directly.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <ButtonLink href="/request-a-quote">Request a quote</ButtonLink>
            <ButtonLink href="/" variant="outline">
              Back to home
            </ButtonLink>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
