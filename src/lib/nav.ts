import { footerColumns, navGroups, navLinks, type NavColumn, type NavGroup } from "@/config/nav";
import { getPublishedPage, labelFor, pathFor } from "@/content/registry";

export interface ResolvedItem {
  label: string;
  href: string;
}
export interface ResolvedColumn {
  title: string;
  items: ResolvedItem[];
}
export interface ResolvedGroup {
  label: string;
  all?: { label: string; href: string };
  columns: ResolvedColumn[];
}

function resolveColumn(col: NavColumn): ResolvedColumn {
  const items: ResolvedItem[] = [];
  for (const slug of col.slugs) {
    const p = getPublishedPage(slug);
    if (p) items.push({ label: labelFor(p), href: pathFor(p) });
  }
  return { title: col.title, items };
}

function resolveGroup(g: NavGroup): ResolvedGroup {
  return {
    label: g.label,
    all: g.all,
    columns: g.columns.map(resolveColumn).filter((c) => c.items.length > 0),
  };
}

/** Header menus with only live pages. */
export function getNavGroups(): ResolvedGroup[] {
  return navGroups.map(resolveGroup).filter((g) => g.columns.length > 0);
}

export function getNavLinks() {
  return navLinks;
}

export function getFooterColumns(): ResolvedColumn[] {
  return footerColumns.map(resolveColumn).filter((c) => c.items.length > 0);
}
