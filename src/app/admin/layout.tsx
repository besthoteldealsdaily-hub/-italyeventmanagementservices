import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Admin | Italy Event Management Services" },
  robots: { index: false, follow: false },
};

// Everything under /admin is dynamic and never indexed.
export const dynamic = "force-dynamic";

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-sand/40 text-ink">{children}</div>;
}
