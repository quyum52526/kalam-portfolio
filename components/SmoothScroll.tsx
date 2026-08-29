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
