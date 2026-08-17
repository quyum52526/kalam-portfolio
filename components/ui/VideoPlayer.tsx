"use client";

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
      className={cn("h-full w-full rounded-xl object-cover", className)}
    />
  );
}
