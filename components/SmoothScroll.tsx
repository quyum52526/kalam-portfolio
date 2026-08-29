"use client";

import { useEffect } from "react";
import Lenis from "lenis";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      autoResize: true,
      // Next.js App Router navigation via <Link> doesn't reload the page — Lenis persists
      // across the route change (it lives in the root layout, which never remounts), but
      // without this, any wheel-driven momentum still in flight when a link is clicked
      // keeps resolving against the OLD page's content, leaving the new page's scroll state
      // desynced from real wheel input until it settles. stopInertiaOnNavigate kills that
      // momentum the moment an internal link is clicked, so the new page starts clean.
      stopInertiaOnNavigate: true,
      // Without this, Lenis hijacks every wheel/touch event on window for its own smooth
      // scroll — including ones over a genuinely scrollable descendant (e.g. the Details
      // modal's internal preview, or any future horizontal card/carousel with its own
      // overflow-x). allowNestedScroll makes Lenis check whether the hovered element can
      // still scroll on its own before taking over: mid-scroll it lets that element's
      // native scroll happen, and once that element hits its edge, native scroll-chaining
      // passes the rest of the gesture up to the page — so vertical wheel scroll always
      // keeps working over any card, without needing a data-lenis-prevent on each one.
      allowNestedScroll: true,
    });

    const refreshScroll = () => {
      lenis.resize();
    };

    const resizeObserver = new ResizeObserver(() => {
      refreshScroll();
    });

    resizeObserver.observe(document.body);
    window.addEventListener("resize", refreshScroll);
    window.addEventListener("orientationchange", refreshScroll);
    window.__lenis = lenis;

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", refreshScroll);
      window.removeEventListener("orientationchange", refreshScroll);
      window.__lenis = undefined;
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
