"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";

/**
 * Centralizes the page entrance animation shared across all sections.
 * Animates a title (y: -40 → 0) and exposes refs for the container
 * and the main heading so callers can scope the GSAP context correctly.
 *
 * Additional elements can be animated inside the returned `ctx` by
 * the consuming component using the same GSAP context timing conventions.
 */
export function usePageEntrance() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: -40, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.6, ease: "power2.out" },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return { containerRef, titleRef };
}
