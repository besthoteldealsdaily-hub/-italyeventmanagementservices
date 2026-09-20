import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  // public/_headers covers prerendered pages/assets served straight from Workers Static
  // Assets; this covers routes that instead go through the Worker itself (admin, api,
  // quote/pay/voucher/review token pages), which that file's rules don't reach.
  async headers() {
    return [{ source: "/:path*", headers: [{ key: "X-Content-Type-Options", value: "nosniff" }] }];
  },
};

export default nextConfig;

// Lets `next dev` use Cloudflare bindings locally. No-op for production builds.
initOpenNextCloudflareForDev();
