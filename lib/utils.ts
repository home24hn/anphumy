/** Joins class names, skipping falsy values. No dependency needed for this project's scale. */
export function cn(...inputs: Array<string | false | null | undefined>): string {
  return inputs.filter(Boolean).join(" ");
}
