import Link from "next/link";
import { workCategories } from "@/data/categories";
import { cn } from "@/lib/utils";

// py-3 (was py-2) brings the tappable height to 44px; -my-1 cancels the added
// 4px/side in the margin box so the nav's own height and spacing stay unchanged —
// only the real, measurable hit area grows.
const TAB_CLASS =
  "relative -my-1 rounded-full px-4 py-3 text-sm font-medium transition-colors";

/** Real navigation, not a client-side filter — each tab is a Link to its own
 *  /work or /work/[category] route, so the URL changes and back/forward work. */
export function WorkTabs({ activeSlug }: { activeSlug?: string }) {
  const isAllActive = !activeSlug;

  return (
    <nav
      aria-label="Work categories"
      className="mb-10 inline-flex flex-wrap gap-1 rounded-full border border-border bg-surface p-1"
    >
      <Link
        href="/work"
        aria-current={isAllActive ? "page" : undefined}
        className={cn(
          TAB_CLASS,
          isAllActive
            ? "bg-foreground text-background"
            : "text-muted hover:text-foreground"
        )}
      >
        All
      </Link>
      {workCategories.map((category) => {
        const active = category.slug === activeSlug;
        return (
          <Link
            key={category.slug}
            href={`/work/${category.slug}`}
            aria-current={active ? "page" : undefined}
            className={cn(
              TAB_CLASS,
              active
                ? "bg-foreground text-background"
                : "text-muted hover:text-foreground"
            )}
          >
            {category.label}
          </Link>
        );
      })}
    </nav>
  );
}
