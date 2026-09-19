import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Cookie Policy | Italy Event Management Services",
  description: "Which cookies this website uses and how to manage your choices.",
  path: "/cookies",
  index: false,
});

export default function CookiesPage() {
  return (
    <LegalPage title="Cookie Policy" updated="19 September 2026 (draft)">
      <section>
        <h2>Current status</h2>
        <p>
          This website currently uses only technical cookies and storage that are strictly necessary for it to work. No
          analytics or advertising cookies are set.
        </p>
      </section>
      <section>
        <h2>When we add analytics or advertising</h2>
        <p>
          Before we use any non-technical cookies (for example analytics or advertising), we will ask for your consent
          through a cookie banner and list each cookie here, with its purpose and duration.
        </p>
      </section>
    </LegalPage>
  );
}
