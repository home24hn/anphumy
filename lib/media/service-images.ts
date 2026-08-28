/**
 * Decorative photos for the homepage Solutions / Energy cards (not project
 * photos — those live in Supabase and must be real, see section 30).
 * `null` means no suitable free-license photo was found; the card falls
 * back to a tinted icon panel instead of a mismatched or misleading image.
 */
export const SOLUTION_IMAGES: (string | null)[] = [
  "/images/services/security.jpg",
  "/images/services/network.jpg",
  null, // access-control
  "/images/services/elv-maintenance.jpg",
];

export const ENERGY_IMAGES: (string | null)[] = [
  "/images/services/solar.jpg",
  null, // bess
  null, // energy-management
];
