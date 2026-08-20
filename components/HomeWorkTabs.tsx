"use client";

import { workCategories } from "@/data/categories";
import { cn } from "@/lib/utils";

// py-3 (was py-2) brings the tappable height to 44px; -my-1 cancels the added
// 4px/side in the margin box so the nav's own height and spacing stay unchanged —
// only the real, measurable hit area grows.
const TAB_CLASS =
  "relative -my-1 rounded-full px-4 py-3 text-sm font-medium transition-colors";

/** Home page chip bar — a client-side filter, not navigation. WorkTabs (used by /work
 *  and /work/[category]) Links to a different route per chip; this instead calls
 *  onSelect so HomeFeaturedWork can swap which section(s) it renders without leaving
 *  "/". Chip order/labels reuse data/categories.ts's workCategories, unmodified. */
export function HomeWorkTabs({
  activeSlug,
  onSelect,
}: {
  activeSlug: string | null;
  onSelect: (slug: string | null) => void;
}) {
  const isAllActive = activeSlug === null;

  return (
    <nav
      aria-label="Work categories"
      className="mb-10 inline-flex flex-wrap gap-1 rounded-full border border-border bg-surface p-1"
    >
      <button
        type="button"
        onClick={() => onSelect(null)}
        aria-current={isAllActive ? "page" : undefined}
        className={cn(
          TAB_CLASS,
          isAllActive
            ? "bg-foreground text-background"
            : "text-muted hover:text-foreground"
        )}
      >
        All Work
      </button>
      {workCategories.map((category) => {
        const active = category.slug === activeSlug;
        return (
          <button
            type="button"
            key={category.slug}
            onClick={() => onSelect(category.slug)}
            aria-current={active ? "page" : undefined}
            className={cn(
              TAB_CLASS,
              active
                ? "bg-foreground text-background"
                : "text-muted hover:text-foreground"
            )}
          >
            {category.label}
          </button>
        );
      })}
    </nav>
  );
}
