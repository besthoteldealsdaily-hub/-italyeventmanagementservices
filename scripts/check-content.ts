/**
 * Content QA. Run: npx tsx scripts/check-content.ts
 * Fails (exit 1) on broken links/slugs; warns on SEO length and duplicate copy.
 */
import { navGroups, footerColumns } from "../src/config/nav";
import { getPublishedPages, registryStats } from "../src/content/registry";

const pages = getPublishedPages();
const slugs = new Set(pages.map((p) => p.slug));
const errors: string[] = [];
const warnings: string[] = [];

for (const p of pages) {
  for (const r of p.related ?? []) if (!slugs.has(r)) errors.push(`${p.slug}: related → unknown slug "${r}"`);
  if (p.parent && p.parent.slug !== "guides" && !slugs.has(p.parent.slug)) errors.push(`${p.slug}: parent → unknown slug "${p.parent.slug}"`);
  if (p.parent?.slug === p.slug) errors.push(`${p.slug}: parent points to itself`);
  for (const g of p.groups ?? []) for (const s of g.slugs) if (!slugs.has(s)) errors.push(`${p.slug}: hub group "${g.title}" → unknown slug "${s}"`);

  if (p.title.length > 60) warnings.push(`${p.slug}: title is ${p.title.length} chars (> 60): ${p.title}`);
  if (p.description.length > 160) warnings.push(`${p.slug}: description is ${p.description.length} chars (> 160)`);
  if (p.description.length < 70) warnings.push(`${p.slug}: description is short (${p.description.length})`);
  if (p.kind !== "hub" && (!p.faqs || p.faqs.length < 2)) warnings.push(`${p.slug}: fewer than 2 FAQs`);
  if (p.kind !== "hub" && p.kind !== "guide" && (!p.facts || p.facts.length < 3)) warnings.push(`${p.slug}: fewer than 3 unique facts`);
  if (p.kind === "guide" && (!p.sources || p.sources.length === 0)) warnings.push(`${p.slug}: guide without sources`);
}

for (const g of navGroups) for (const c of g.columns) for (const s of c.slugs) if (!slugs.has(s)) errors.push(`nav "${g.label}/${c.title}" → unknown slug "${s}"`);
for (const c of footerColumns) for (const s of c.slugs) if (!slugs.has(s)) errors.push(`footer "${c.title}" → unknown slug "${s}"`);

const dupe = (key: (p: (typeof pages)[number]) => string, label: string) => {
  const seen = new Map<string, string>();
  for (const p of pages) {
    const k = key(p);
    const prev = seen.get(k);
    if (prev) errors.push(`duplicate ${label}: "${k.slice(0, 70)}" (${prev} and ${p.slug})`);
    else seen.set(k, p.slug);
  }
};
dupe((p) => p.title, "title");
dupe((p) => p.description, "description");
dupe((p) => p.h1, "h1");

// Pages nobody links to (orphans)
const linked = new Set<string>();
for (const p of pages) {
  for (const r of p.related ?? []) linked.add(r);
  if (p.parent) linked.add(p.parent.slug);
  for (const g of p.groups ?? []) for (const s of g.slugs) linked.add(s);
}
for (const g of navGroups) for (const c of g.columns) for (const s of c.slugs) linked.add(s);
for (const c of footerColumns) for (const s of c.slugs) linked.add(s);
const orphans = pages.filter((p) => !linked.has(p.slug)).map((p) => p.slug);
if (orphans.length) warnings.push(`pages not linked from any related/parent/hub/nav list: ${orphans.join(", ")}`);

console.log(registryStats());
if (warnings.length) console.log(`\nWARNINGS (${warnings.length})\n- ${warnings.join("\n- ")}`);
if (errors.length) {
  console.log(`\nERRORS (${errors.length})\n- ${errors.join("\n- ")}`);
  process.exit(1);
}
console.log("\nContent check passed.");
