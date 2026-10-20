"use client";

import { useEffect } from "react";
import type Lenis from "lenis";

/** Optional progressive enhancement: native scroll remains functional without JS. */
export function SmoothScrollProvider() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let disposed = false;
    let lenis: Lenis | undefined;
    let animationFrame = 0;
    async function setup() {
      const { default: Lenis } = await import("lenis");
      if (disposed) return;
      lenis = new Lenis({ duration: 1.05, smoothWheel: true });
      const raf = (time: number) => {
        lenis?.raf(time);
        animationFrame = requestAnimationFrame(raf);
      };
      animationFrame = requestAnimationFrame(raf);
    }
    void setup();
    return () => {
      disposed = true;
      cancelAnimationFrame(animationFrame);
      lenis?.destroy();
    };
  }, []);
  return null;
}
