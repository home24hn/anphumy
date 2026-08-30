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

/** Used only by the homepage Solutions cards — separate set, client-supplied. */
export const HOME_SOLUTION_IMAGES: (string | null)[] = [
  "/images/services/home-security.webp",
  "/images/services/home-network.webp",
  "/images/services/home-access-control.webp",
  "/images/services/home-elv-maintenance.webp",
];

export const ENERGY_IMAGES: (string | null)[] = [
  "/images/services/solar.jpg",
  "/images/services/bess.jpg",
  "/images/services/energy-management.png",
];
