import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { site } from "@/config/site";
import { ogImage } from "@/lib/seo";

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
  // Search Console "HTML tag" verification (set NEXT_PUBLIC_GSC_VERIFICATION to the token only).
  ...(process.env.NEXT_PUBLIC_GSC_VERIFICATION ? { verification: { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION } } : {}),
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

/** Root layout: only <html>/<body>. The public site and the admin area each add their own shell. */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="flex min-h-screen flex-col">{children}</body>
    </html>
  );
}
