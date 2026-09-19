import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// The site is prerendered (SSG) plus one dynamic page and one server action.
// Static-assets cache serves the prerendered pages straight from Workers Static Assets:
// no R2/KV bindings needed. (No on-demand revalidation — redeploy to update content.)
const cloudflareConfig = defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
  enableCacheInterception: true,
});

export default {
  ...cloudflareConfig,
  // package.json's "build" script runs `opennextjs-cloudflare build`, so OpenNext must not call
  // `npm run build` again (infinite loop). It builds Next.js with this command instead.
  buildCommand: "npx next build",
};
