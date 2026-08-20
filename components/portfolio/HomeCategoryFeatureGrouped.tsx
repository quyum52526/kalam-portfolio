import Link from "next/link";
import type { WorkCategory } from "@/data/categories";
import type { PortfolioCategory } from "@/types/portfolio";
import { PortfolioCategorySection } from "@/components/portfolio/PortfolioCategorySection";

const MAX_GROUPS = 2;
const MAX_ITEMS_PER_GROUP = 4;

/** One category's featured block for the home page "All Work" tab: heading +
 *  description + "View all" link, then the category's first 2 top-section sub-groups
 *  (existing data order, not re-sorted — just the first 1 if that's all there is, e.g.
 *  the "GAP — Example Category" placeholder), each capped at its first 4 items. Each
 *  sub-group is rendered with PortfolioCategorySection — the same component
 *  /work/[category] uses per sub-group — so sub-group headings, card style, and
 *  Details popup behaviour are identical to the category page; only the items array
 *  handed to it is pre-sliced here. The category heading below is sized a step larger
 *  (text-2xl/3xl) than PortfolioCategorySection's own sub-group heading (text-xl/2xl)
 *  so the hierarchy reads: category → sub-group → cards. */
export function HomeCategoryFeatureGrouped({
  category,
  groups,
}: {
  category: WorkCategory;
  groups: PortfolioCategory[];
}) {
  const featuredGroups = groups.slice(0, MAX_GROUPS).map((group) => ({
    ...group,
    items: group.items.slice(0, MAX_ITEMS_PER_GROUP),
  }));

  return (
    <section className="mb-14">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {category.label}
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-muted">
            {category.description}
          </p>
        </div>
        {/* py-3 -my-3 brings the tappable height to 44px without shifting the
            text's visual position or the row's own height (negative margin cancels
            the added padding in the margin box). */}
        <Link
          href={`/work/${category.slug}`}
          className="-my-3 shrink-0 py-3 text-sm font-medium text-text-body transition-colors hover:text-foreground"
        >
          View all →
        </Link>
      </div>

      {featuredGroups.map((group) => (
        <PortfolioCategorySection key={group.id} category={group} />
      ))}
    </section>
  );
}
