import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import WhatsAppButton from "@/components/WhatsAppButton";
import { site } from "@/config/site";
import { ogImage, organizationJsonLd, websiteJsonLd } from "@/lib/seo";

// Self-hosted variable fonts (see ./fonts/LICENSE.txt): no network access needed at build time.
const inter = localFont({
  src: "./fonts/inter-latin-wght-normal.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
});
const fraunces = localFont({
  src: "./fonts/fraunces-latin-wght-normal.woff2",
  variable: "--font-fraunces",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Transfers, Hotels & DMC`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  robots: { index: site.indexable, follow: site.indexable },
  openGraph: {
    siteName: site.name,
    type: "website",
    locale: "en_GB",
    images: [ogImage],
  },
  twitter: { card: "summary_large_image", images: [ogImage.url] },
};

export const viewport: Viewport = {
  themeColor: "#12202f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-white focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
