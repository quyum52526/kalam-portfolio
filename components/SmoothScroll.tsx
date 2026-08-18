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
    });
    window.__lenis = lenis;

    return () => {
      window.__lenis = undefined;
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
