import { ExternalLink } from "lucide-react";
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
  // Web Experiences thumbnails are full-page site screenshots — ultra-tall relative to
  // their card, so a center crop mostly shows empty below-the-fold space. object-top
  // anchors the crop to the hero section at the top of the page instead.
  const isWebScreenshot = Boolean(item.liveUrl) && !isBrandBoardMockup;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/70 shadow-[0_12px_35px_rgba(15,23,42,0.22)]">
      <div className="relative w-full overflow-hidden rounded-t-2xl bg-surface-inset">
        {hasRealThumbnail(item.thumbnail) ? (
          // eslint-disable-next-line @next/next/no-img-element -- thumbnails may be remote (e.g. YouTube) URLs
          <img
            src={item.thumbnail}
            alt={item.title}
            loading="lazy"
            decoding="async"
            className={cn(
              "h-full w-full object-cover object-top",
              ASPECT_RATIO_CLASS[aspectRatio],
              isPortraitMockup
                ? "object-cover"
                : isBrandBoardMockup
                  ? "object-contain"
                  : isWebScreenshot
                    ? "object-cover object-top"
                    : "object-cover"
            )}
          />
        ) : (
          <div
            className={cn(
              "flex h-full w-full items-center justify-center bg-gradient-to-br from-surface-card to-transparent p-2 text-center text-xs text-muted",
              ASPECT_RATIO_CLASS[aspectRatio]
            )}
          >
            No preview
          </div>
        )}
      </div>

      <div className="flex w-full flex-col gap-2.5 p-5">
        <div className="flex w-full items-center justify-between gap-2">
          {item.tagline ? (
            <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.18em] text-emerald-400/90">
              {item.tagline}
            </span>
          ) : (
            <span className="w-0" aria-hidden="true" />
          )}

          <div className="flex shrink-0 items-center gap-2">
            {item.liveUrl && (
              item.linkLabel ? (
                <a
                  href={item.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${item.title} live demo in a new tab`}
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex h-9 shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-slate-700 bg-slate-900/70 px-3 py-2 text-xs font-medium text-slate-100 transition-colors hover:border-slate-500 hover:bg-slate-800"
                >
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                  {item.linkLabel}
                </a>
              ) : (
                <a
                  href={item.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Live preview of ${item.title}`}
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 bg-slate-900/70 text-slate-200 transition-colors hover:border-slate-500 hover:bg-slate-800"
                >
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                </a>
              )
            )}
            <button
              type="button"
              onClick={onOpenDetails}
              className="rounded-full border border-slate-700 bg-slate-900/70 px-3 py-2 text-xs font-medium text-slate-100 transition-colors hover:border-slate-500 hover:bg-slate-800"
            >
              Details
            </button>
          </div>
        </div>

        <h3 className="w-full truncate text-lg font-bold tracking-tight text-white md:text-xl">
          {item.title}
        </h3>

        {item.description && (
          <p className="w-full text-xs leading-relaxed text-slate-400 line-clamp-2 md:text-sm">
            {item.description}
          </p>
        )}
      </div>
    </div>
  );
}
