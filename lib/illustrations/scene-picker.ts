"use client";

/**
 * Shuffle-bag scene picker for the "APM Tech làm gì?" illustration,
 * backed by sessionStorage: every one of the 5 scenes appears once before
 * any repeats, and the same scene never shows twice in a row — even right
 * across a bag refill boundary.
 *
 * Client-only by construction (reads/writes sessionStorage). Call this
 * only from a useEffect, never during render/SSR — see TechIllustration.
 */

export const SCENE_COUNT = 5;

const BAG_KEY = "apm-scene-bag";
const LAST_KEY = "apm-scene-last";

function shuffledIndices(n: number): number[] {
  const arr = Array.from({ length: n }, (_, i) => i);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function pickScene(): number {
  if (typeof window === "undefined") return 0;

  let bag: number[] = [];
  try {
    const raw = window.sessionStorage.getItem(BAG_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    if (Array.isArray(parsed) && parsed.every((n) => Number.isInteger(n))) {
      bag = parsed;
    }
  } catch {
    bag = [];
  }

  let last: number | null = null;
  try {
    const rawLast = window.sessionStorage.getItem(LAST_KEY);
    last = rawLast !== null ? Number(rawLast) : null;
  } catch {
    last = null;
  }

  if (bag.length === 0) {
    bag = shuffledIndices(SCENE_COUNT);
    // A fresh shuffle could coincidentally start with the same scene that
    // just closed out the previous bag — swap it out so visits never repeat.
    if (bag[0] === last && bag.length > 1) {
      const swapWith = 1 + Math.floor(Math.random() * (bag.length - 1));
      [bag[0], bag[swapWith]] = [bag[swapWith], bag[0]];
    }
  }

  const next = bag.shift()!;

  try {
    window.sessionStorage.setItem(BAG_KEY, JSON.stringify(bag));
    window.sessionStorage.setItem(LAST_KEY, String(next));
  } catch {
    // Storage unavailable (private browsing quota, etc.) — the render for
    // *this* visit is still correct; we just lose cross-visit memory.
  }

  return next;
}
