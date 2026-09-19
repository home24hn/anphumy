/**
 * Decorative photos for the homepage Solutions / Energy cards (not project
 * photos — those live in Supabase and must be real, see section 30).
 */

/** Used by the standalone /solutions page — do not change without asking. */
export const SOLUTION_IMAGES: (string | null)[] = [
  "/images/services/security.webp",
  "/images/services/network.webp",
  "/images/services/access-control.webp",
  "/images/services/elv-maintenance.webp",
];

/**
 * Used only by the homepage Solutions cards. The security slot points at
 * the same real installation photo as the /solutions page — the previous
 * home-security.webp was a generic rendered clip-art camera that read as
 * fake next to the other three genuine on-site photos.
 */
export const HOME_SOLUTION_IMAGES: (string | null)[] = [
  "/images/services/security.webp",
  "/images/services/home-network.webp",
  "/images/services/home-access-control.webp",
  "/images/services/home-elv-maintenance.webp",
];

// Third slot (energy-management.png) intentionally left null: it was a
// generic "futuristic HUD" stock photo that read as AI-generated filler
// next to the real solar/BESS photos. Falls back to the icon tile instead.
export const ENERGY_IMAGES: (string | null)[] = [
  "/images/services/solar.jpg",
  "/images/services/bess.jpg",
  null,
];
