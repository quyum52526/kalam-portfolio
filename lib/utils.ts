import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** True on devices with a real mouse — false on touch, where tap can emit a single
 *  synthetic mousemove/mouseenter with no matching mouseleave, leaving hover-driven
 *  effects (spotlight glow, magnetic buttons) stuck on. */
export function supportsFinePointer() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

/** Updates --spot-x / --spot-y CSS vars on an element for the `.spotlight` hover effect. */
export function handleSpotlightMove(e: React.MouseEvent<HTMLElement>) {
  if (!supportsFinePointer()) return;
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width) * 100;
  const y = ((e.clientY - rect.top) / rect.height) * 100;
  el.style.setProperty("--spot-x", `${x}%`);
  el.style.setProperty("--spot-y", `${y}%`);
}

export type EmbedInfo =
  | { type: "mp4"; src: string }
  | { type: "iframe"; src: string }
  | { type: "none" };

const YOUTUBE_RE =
  /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/;
const VIMEO_RE = /vimeo\.com\/(?:video\/)?(\d+)/;

/** Detects whether a project video URL is a direct file or a YouTube/Vimeo embed. */
export function getEmbedInfo(url: string): EmbedInfo {
  if (!url) return { type: "none" };

  const youtubeMatch = url.match(YOUTUBE_RE);
  if (youtubeMatch) {
    return {
      type: "iframe",
      src: `https://www.youtube.com/embed/${youtubeMatch[1]}?autoplay=1&rel=0`,
    };
  }

  const vimeoMatch = url.match(VIMEO_RE);
  if (vimeoMatch) {
    return {
      type: "iframe",
      src: `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`,
    };
  }

  if (/\.(mp4|webm|mov)(\?.*)?$/i.test(url)) {
    return { type: "mp4", src: url };
  }

  return { type: "none" };
}
