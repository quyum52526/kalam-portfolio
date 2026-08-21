import type {
  PortfolioItem,
  PortfolioPage,
  PortfolioPageId,
} from "@/types/portfolio";

/** One entry per pinned item: `${pageId}:${groupId}:${itemId}` -> the epoch ms it was pinned.
 *  Absence = not featured. This is the entire persisted state for the Feature/Pin system —
 *  everything else about an item (title, thumbnail, video, etc.) still lives in the static
 *  data/portfolio/*.ts files, untouched. Pure data, safe to pass into Server or Client
 *  Components alike; the actual store (lib/featured-store.ts) is server-only. */
export type FeaturedMap = Record<string, number>;

export function featuredKey(pageId: string, groupId: string, itemId: string) {
  return `${pageId}:${groupId}:${itemId}`;
}

/** Sorts one PortfolioCategory group's items: featured items first (most-recently-pinned
 *  first), then every non-featured item in its original data order. "Section" for this
 *  reordering is the group — e.g. Branding & Visuals' "Logo Design" and "T-Shirt Design"
 *  are separate rendered grids, so pinning within one never reorders the other. Pure — safe
 *  to call from a Server or Client Component, the map is just data passed in. */
export function sortGroupItems(
  items: PortfolioItem[],
  pageId: string,
  groupId: string,
  map: FeaturedMap
): PortfolioItem[] {
  const withFeaturedAt = items.map((item) => {
    const featuredAt = map[featuredKey(pageId, groupId, item.id)];
    return featuredAt ? { ...item, featuredAt } : item;
  });

  const featured = withFeaturedAt
    .filter((item): item is PortfolioItem & { featuredAt: number } =>
      item.featuredAt !== undefined
    )
    .sort((a, b) => b.featuredAt - a.featuredAt);
  const rest = withFeaturedAt.filter((item) => item.featuredAt === undefined);

  return [...featured, ...rest];
}

/** Applies sortGroupItems to every group on a page — used wherever a full PortfolioPage is
 *  rendered (category pages, the home page's grouped "All Work" view). */
export function applyFeaturedToPage(
  page: PortfolioPage,
  map: FeaturedMap
): PortfolioPage {
  return {
    ...page,
    categories: page.categories.map((group) => ({
      ...group,
      items: sortGroupItems(group.items, page.id, group.id, map),
    })),
  };
}

export interface FeaturedPick {
  pageId: PortfolioPageId;
  groupId: string;
  item: PortfolioItem & { featuredAt: number };
}

/** The Homepage "Featured" cross-section pick for one page: the single item with the
 *  highest featuredAt across ALL of that page's groups — a page-wide "section" for this one
 *  rule, distinct from the per-group scope sortGroupItems uses (the cross-section rule names
 *  the four portfolio pages themselves as "the four portfolio sections"). Falls back to the
 *  page's first item in default data order (first group, first item) when nothing on the
 *  page is pinned, so the homepage always has up to 4 slots filled instead of sometimes
 *  showing fewer. Returns null only if the page has zero items at all (e.g. Web Experiences'
 *  "GAP — Example Category" placeholder). */
export function pickPageTopFeatured(
  page: PortfolioPage,
  map: FeaturedMap
): FeaturedPick | null {
  let best: FeaturedPick | null = null;

  for (const group of page.categories) {
    for (const item of group.items) {
      const featuredAt = map[featuredKey(page.id, group.id, item.id)];
      if (featuredAt && (!best || featuredAt > best.item.featuredAt)) {
        best = { pageId: page.id, groupId: group.id, item: { ...item, featuredAt } };
      }
    }
  }

  if (best) return best;

  const firstGroup = page.categories[0];
  const firstItem = firstGroup?.items[0];
  if (!firstGroup || !firstItem) return null;

  // Fallback pick has no real pin timestamp — 0 marks it as "not actually featured" for
  // any caller that checks, while still satisfying the FeaturedPick shape.
  return { pageId: page.id, groupId: firstGroup.id, item: { ...firstItem, featuredAt: 0 } };
}
