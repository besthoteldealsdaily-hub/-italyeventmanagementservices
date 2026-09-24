import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  // worker-mailer (SMTP) imports the Workers-only `cloudflare:sockets` API dynamically at call
  // time. Left out of bundling so neither Next's bundler nor the Cloudflare build tries to
  // resolve that import ahead of time; it only has to exist once actually run in a Worker.
  serverExternalPackages: ["worker-mailer"],
  // public/_headers covers prerendered pages/assets served straight from Workers Static
  // Assets; this covers routes that instead go through the Worker itself (admin, api,
  // quote/pay/voucher/review token pages), which that file's rules don't reach.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;

// Lets `next dev` use Cloudflare bindings locally. No-op for production builds.
initOpenNextCloudflareForDev();
