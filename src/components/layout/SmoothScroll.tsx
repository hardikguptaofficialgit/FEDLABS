"use client";

import Lenis from "lenis";
import { useEffect } from "react";

const HEADER_OFFSET = 72;

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.1,
      anchors: {
        offset: -HEADER_OFFSET,
      },
    });

    document.documentElement.classList.add("lenis", "lenis-smooth");

    return () => {
      lenis.destroy();
      document.documentElement.classList.remove("lenis", "lenis-smooth");
    };
  }, []);

  return children;
}
