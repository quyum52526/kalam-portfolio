import type { PortfolioItem } from "@/types/portfolio";
import { cn } from "@/lib/utils";

function hasRealThumbnail(thumbnail: string) {
  return Boolean(thumbnail) && thumbnail !== "GAP";
}

export function ItemCard({
  item,
  onOpenDetails,
}: {
  item: PortfolioItem;
  onOpenDetails: () => void;
}) {
  // Brand-board mockup thumbnails (DigiCode IT, RF-TEQ, and future brands) are wide
  // presentation graphics with readable content near the edges (a "VISION" heading,
  // colour-swatch labels, etc.) — cropping them to fill the square tile can cut that
  // content off, as it did for DigiCode's 500x400 (1.25:1) mockup. object-contain keeps
  // the whole image visible regardless of its aspect ratio, which matters since this
  // library will keep growing with brands whose mockup dimensions aren't known yet.
  // Plain logo/product thumbnails (Castel, LMT Agro, business cards, etc.) keep the
  // existing fill-and-crop look, unchanged — the tile's own bg-surface-inset already
  // shows through as the letterbox fill, so no extra styling is needed for that either.
  const isBrandBoardMockup = Boolean(item.brandBoard);

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border bg-surface">
      <div className="relative aspect-square w-full bg-surface-inset">
        {hasRealThumbnail(item.thumbnail) ? (
          // eslint-disable-next-line @next/next/no-img-element -- thumbnails may be remote (e.g. YouTube) URLs
          <img
            src={item.thumbnail}
            alt={item.title}
            loading="lazy"
            decoding="async"
            className={cn(
              "absolute inset-0 h-full w-full",
              isBrandBoardMockup ? "object-contain" : "object-cover"
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
        <button
          type="button"
          onClick={onOpenDetails}
          className="shrink-0 rounded-full border border-border-strong px-3 py-1 text-xs font-medium text-text-body transition-colors hover:bg-surface-card"
        >
          Details
        </button>
      </div>
    </div>
  );
}
