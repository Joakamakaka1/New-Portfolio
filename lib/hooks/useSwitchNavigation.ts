"use client";

// ── useSwitchNavigation — encapsulates carousel state + GSAP logic ────────────
// Manages a 5-slot horizontal buffer (far-left | left | ACTIVE | right | far-right)
// using the seamless loop trick: slide ± slotW, flushSync state, gsap.set back to base.

import { useRef, useState, useCallback } from "react";
import { flushSync } from "react-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

export interface SwitchNavState {
  activeIdx: number;
  locked: boolean;
  slots: number[]; // [far-left, left, ACTIVE, right, far-right]
  innerRef: React.RefObject<HTMLDivElement | null>;
  navigate: (dir: "left" | "right") => void;
  jumpTo: (i: number) => void;
}

/**
 * @param total   Total number of items
 * @param slotW   Width of one stride slot (inactive card width + gap), in pixels
 */
export function useSwitchNavigation(
  total: number,
  slotW: number,
): SwitchNavState {
  const [activeIdx, setActiveIdx] = useState(0);
  const [locked, setLocked] = useState(false);
  const innerRef = useRef<HTMLDivElement>(null);

  const BASE_X = -slotW; // positions slot[1] at the viewport left edge

  // Mount: centre the strip on the active slot
  useGSAP(() => {
    gsap.set(innerRef.current, { x: BASE_X });
  }, []);

  // Derived indices & slots
  const prev = mod(activeIdx - 1, total);
  const next = mod(activeIdx + 1, total);
  const slots = [
    mod(activeIdx - 2, total),
    mod(activeIdx - 1, total),
    activeIdx,
    mod(activeIdx + 1, total),
    mod(activeIdx + 2, total),
  ];

  // ── Main navigation ───────────────────────────────────────────────────────
  const navigate = useCallback(
    (dir: "left" | "right") => {
      if (locked) return;
      setLocked(true);

      // left → strip slides right (to 0); right → strip slides left (to BASE_X * 2)
      const xTo = dir === "left" ? 0 : BASE_X * 2;
      const newIdx = dir === "left" ? prev : next;

      gsap
        .timeline({
          onComplete: () => {
            flushSync(() => setActiveIdx(newIdx));
            gsap.set(innerRef.current, { x: BASE_X });
            setLocked(false);
          },
        })
        .to(innerRef.current, {
          x: xTo,
          duration: 0.3,
          ease: "expo.out", //  ← snappy console feel
        });
    },
    [locked, prev, next, BASE_X],
  );

  // ── Jump directly to index (cross-fade) ──────────────────────────────────
  const jumpTo = useCallback(
    (i: number) => {
      if (locked || i === activeIdx) return;
      setLocked(true);
      gsap.to(innerRef.current, {
        opacity: 0,
        duration: 0.1,
        onComplete: () => {
          flushSync(() => setActiveIdx(i));
          gsap.set(innerRef.current, { x: BASE_X });
          gsap.to(innerRef.current, {
            opacity: 1,
            duration: 0.18,
            onComplete: () => setLocked(false),
          });
        },
      });
    },
    [locked, activeIdx, BASE_X],
  );

  return { activeIdx, locked, slots, innerRef, navigate, jumpTo };
}
