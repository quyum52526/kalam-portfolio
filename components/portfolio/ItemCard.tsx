import type { PortfolioItem } from "@/types/portfolio";

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
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-surface-card to-transparent p-2 text-center text-xs text-muted">
            No preview
          </div>
        )}
      </div>
      <div className="flex items-center justify-between gap-2 p-3">
        <p className="truncate text-sm font-medium">{item.title}</p>
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
