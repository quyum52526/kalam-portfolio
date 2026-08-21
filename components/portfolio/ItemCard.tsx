import type { PortfolioItem } from "@/types/portfolio";
import { cn } from "@/lib/utils";

function hasRealThumbnail(thumbnail: string) {
  return Boolean(thumbnail) && thumbnail !== "GAP";
}

/** Static literal classes only — Tailwind's build-time scanner greps source text for literal
 *  utility names, so an interpolated `aspect-[${x}]` wouldn't be found and its CSS would never
 *  be generated (same constraint BrandBoardSection documents for its own aspect box). */
const ASPECT_RATIO_CLASS: Record<"1/1" | "4/5" | "16/9" | "9/16", string> = {
  "1/1": "aspect-square",
  "4/5": "aspect-[4/5]",
  "16/9": "aspect-video",
  "9/16": "aspect-[9/16]",
};

export function ItemCard({
  item,
  onOpenDetails,
  aspectRatio = "1/1",
}: {
  item: PortfolioItem;
  onOpenDetails: () => void;
  /** Card image area's aspect ratio — set per-group by the caller (PortfolioCategorySection),
   *  driven by data/portfolio/*.ts's `category.aspectRatio`. Defaults to the existing 1:1 square
   *  so any caller that doesn't pass this renders exactly as before. */
  aspectRatio?: "1/1" | "4/5" | "16/9" | "9/16";
}) {
  // Brand-board thumbnails (DigiCode IT, RF-TEQ, and future brands) are curated presentation
  // graphics with readable content near the edges (a "VISION" heading, colour-swatch labels,
  // etc.) — cropping them to fill the tile can cut that content off, as it did for DigiCode's
  // 500x400 (1.25:1) mockup. object-contain keeps the whole image visible regardless of its
  // aspect ratio, which matters since this library will keep growing with brands whose mockup
  // dimensions aren't known yet.
  // Video thumbnails (YouTube reels) are the opposite case: they're conventionally always
  // crop-safe (every video platform crops its own thumbnail grid — subjects are framed with
  // that in mind), and YouTube's own stored thumbnail for a vertical Short is a 16:9 canvas
  // with the real 9:16 frame pillarboxed — object-contain would show that letterboxing/blur
  // fill inside a 9:16 card instead of cropping down to the real content, so video items use
  // the plain fill-and-crop path below, same as flat logo/product thumbnails.
  const isBrandBoardMockup = Boolean(item.brandBoard);
  const isPortraitMockup = item.brandBoard?.heroLayout === "photo";

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border bg-surface">
      <div className={cn("relative w-full bg-surface-inset", ASPECT_RATIO_CLASS[aspectRatio])}>
        {hasRealThumbnail(item.thumbnail) ? (
          // eslint-disable-next-line @next/next/no-img-element -- thumbnails may be remote (e.g. YouTube) URLs
          <img
            src={item.thumbnail}
            alt={item.title}
            loading="lazy"
            decoding="async"
            className={cn(
              "absolute inset-0 h-full w-full",
              isPortraitMockup
                ? "object-cover"
                : isBrandBoardMockup
                  ? "object-contain"
                  : "object-cover"
            )}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-surface-card to-transparent p-2 text-center text-xs text-muted">
            No preview
          </div>
        )}
      </div>
      <div className="flex items-center justify-between gap-2 p-3">
        {/* line-clamp-2 (not truncate/nowrap) so a title too long for one line wraps onto a
            second instead of ellipsis-cutting mid-word — a short title like "RF-TEQ" or
            "LMT Agro" still renders as a single line exactly as before, since the clamp only
            engages when content would otherwise overflow. min-w-0 lets the paragraph actually
            shrink within the flex row instead of pushing against the Details button. */}
        <p className="line-clamp-2 min-w-0 text-sm font-medium">{item.title}</p>
        {/* py-3.5 (was py-1) brings the tappable height to 46px (>=44px minimum);
            -my-2.5 cancels the added padding in the margin box so the footer row's
            own height stays the same as before. */}
        <button
          type="button"
          onClick={onOpenDetails}
          className="-my-2.5 shrink-0 rounded-full border border-border-strong px-3 py-3.5 text-xs font-medium text-text-body transition-colors hover:bg-surface-card"
        >
          Details
        </button>
      </div>
    </div>
  );
}
