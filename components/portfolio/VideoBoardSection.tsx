"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, ExternalLink } from "lucide-react";
import type { VideoBoard } from "@/types/portfolio";
import { cn } from "@/lib/utils";
import {
  BLOCK_PADDING,
  SECTION_LABEL_CLASS,
  GUIDE_HEADING_CLASS,
  GUIDE_BODY_CLASS,
} from "@/components/portfolio/BrandBoardSection";

/** AI & Generative (and any future video-led) item's popup: click-to-play player, overview,
 *  spec list, pipeline/tools, and an outbound "Watch on YouTube" link. Reuses BrandBoardSection's
 *  spacing/label constants (imported, not redeclared) so it reads as the same visual system —
 *  it's a sibling component rather than a BrandBoard variant because a video reel has no
 *  palette/lockup concept and needs real interactive state (click-to-play), which none of
 *  BrandBoardSection's boards do. */
export function VideoBoardSection({
  board,
  title,
}: {
  board: VideoBoard;
  title: string;
}) {
  const [playing, setPlaying] = useState(false);
  const isPortrait = board.orientation === "portrait";

  const player = playing ? (
    <iframe
      src={`https://www.youtube-nocookie.com/embed/${board.videoId}?autoplay=1&rel=0`}
      title={board.videoTitle}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      className="absolute inset-0 h-full w-full"
    />
  ) : (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Play ${board.videoTitle}`}
      className="group absolute inset-0 h-full w-full"
    >
      {/* Remote i.ytimg.com thumbnail — a real candidate for next/image's optimization (unlike
          this component's other, local/static assets elsewhere in the codebase), so it's used
          here specifically. fill + sizes since the box's size is driven by CSS (aspect-video
          width-driven for landscape, height-driven aspect-[9/16] for portrait), not a fixed
          pixel size. object-cover crops a vertical Short's letterboxed 16:9 thumbnail down to
          its real 9:16 content instead of showing the blurred fill bars. */}
      <Image
        src={board.thumbnail}
        alt={board.videoTitle}
        fill
        sizes={isPortrait ? "260px" : "(max-width: 768px) 100vw, 768px"}
        loading="lazy"
        className="object-cover"
      />
      <span className="absolute inset-0 flex items-center justify-center bg-navy-950/30 transition-colors group-hover:bg-navy-950/50">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-navy-900 shadow-md transition-transform group-hover:scale-105">
          <Play className="h-6 w-6 translate-x-0.5 fill-current" />
        </span>
      </span>
    </button>
  );

  return (
    <div className="text-xs">
      <h3 className="sr-only">{title}</h3>

      {/* Row 1 — Player. Click-to-play facade: the iframe (and therefore any YouTube script)
          only mounts after the click, never on page load. Landscape (16:9) videos use the
          original width-driven box; portrait (9:16) Shorts use a height-driven box instead —
          a full-width 9:16 box at this modal's width would render ~1350px tall, well past a
          typical viewport, so height is capped and width follows from the aspect ratio. */}
      {isPortrait ? (
        <div className="flex justify-center bg-surface-inset p-4">
          {/* max-h-[380px] (not 420px) — measured against this board's real Overview/Specs/
              Pipeline/Watch-link content: 420px pushed the modal's total height to 777px on a
              900px-tall viewport, 12px past the 85vh (765px) scroll budget. 380px keeps the
              whole popup visible with no internal scroll needed at 900px, with margin to spare
              for slightly taller copy in future items. */}
          <div className="relative aspect-[9/16] h-[50vh] max-h-[380px] w-auto">{player}</div>
        </div>
      ) : (
        <div className="relative aspect-video w-full bg-surface-inset">{player}</div>
      )}

      {/* Row 2 — Overview */}
      <div className={cn("border-t border-border", BLOCK_PADDING)}>
        <p className={cn(SECTION_LABEL_CLASS, "text-text-accent")}>Overview</p>
        <p className={cn(GUIDE_BODY_CLASS, "mt-1")}>{board.overview}</p>
      </div>

      {/* Row 3 — Spec list (duration, aspect ratio, format) */}
      <div className={cn("border-t border-border bg-surface-inset", BLOCK_PADDING)}>
        <p className={GUIDE_HEADING_CLASS}>Specs</p>
        <dl className="mt-1.5 space-y-1">
          {board.specs.map((spec) => (
            <div
              key={spec.label}
              className="flex items-baseline justify-between gap-2 border-b border-border/60 py-0.5 last:border-b-0"
            >
              <dt className={cn(SECTION_LABEL_CLASS, "text-text-accent")}>{spec.label}</dt>
              <dd className="text-[11px] font-semibold text-text-body">{spec.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Row 4 — Pipeline / tools */}
      <div className={cn("border-t border-border", BLOCK_PADDING)}>
        <p className={GUIDE_HEADING_CLASS}>Pipeline / Tools</p>
        <ul className={cn("mt-1.5 list-disc space-y-0.5 pl-4", GUIDE_BODY_CLASS)}>
          {board.pipeline.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ul>
      </div>

      {/* Row 5 — Watch on YouTube */}
      <div className={cn("flex justify-center border-t border-border bg-surface-inset", BLOCK_PADDING)}>
        <a
          href={board.youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-border-strong px-5 text-sm font-semibold text-text-body transition-colors hover:bg-surface-card"
        >
          Watch on YouTube
          <ExternalLink className="h-4 w-4" aria-hidden />
        </a>
      </div>
    </div>
  );
}
