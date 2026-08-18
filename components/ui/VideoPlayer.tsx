"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export function VideoPlayer({
  src,
  poster,
  className,
  autoPlay = false,
  controls = true,
  preload = "metadata",
}: {
  src: string;
  poster?: string;
  className?: string;
  autoPlay?: boolean;
  controls?: boolean;
  preload?: "none" | "metadata" | "auto";
}) {
  const [failed, setFailed] = useState(false);

  // Reset if the caller swaps in a new source (e.g. a different project's video).
  const [lastSrc, setLastSrc] = useState(src);
  if (src !== lastSrc) {
    setLastSrc(src);
    setFailed(false);
  }

  if (failed) {
    return (
      <div
        className={cn(
          "flex h-full w-full items-center justify-center rounded-xl bg-surface-inset text-sm text-muted",
          className
        )}
      >
        Video unavailable
      </div>
    );
  }

  return (
    <video
      src={src}
      poster={poster}
      autoPlay={autoPlay}
      muted={autoPlay}
      loop={autoPlay}
      playsInline
      controls={controls}
      preload={preload}
      onError={() => setFailed(true)}
      className={cn("h-full w-full rounded-xl object-cover", className)}
    />
  );
}
