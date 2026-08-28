/**
 * Decorative photos for the homepage Solutions / Energy cards (not project
 * photos — those live in Supabase and must be real, see section 30).
 * `null` means no suitable, non-misleading free-license photo was found
 * for that specific service; the card falls back to a styled icon panel
 * instead. Replace with real APM Tech photos as they become available.
 */
export const SOLUTION_IMAGES: (string | null)[] = [
  "/images/services/security.jpg",
  "/images/services/network.jpg",
  null, // access-control — stock results were either residential locks or unrelated
  null, // elv-maintenance — no Vietnam-context match found; swap in a real photo when available
];

export const ENERGY_IMAGES: (string | null)[] = [
  "/images/services/solar.jpg",
  null, // bess — stock results were consumer batteries, not grid-scale storage
  null, // energy-management — stock results were unrelated or outdated-looking
];
