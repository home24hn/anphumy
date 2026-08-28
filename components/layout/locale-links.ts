import type { Locale } from "@/types/project";

/** Prefix used for internal links in the given locale ("" for vi, "/en" for en). */
export function localeBase(locale: Locale): string {
  return locale === "en" ? "/en" : "";
}

export function localePath(locale: Locale, path: string): string {
  const base = localeBase(locale);
  if (path === "/" || path === "") return base || "/";
  return `${base}${path}`;
}

/** Given the current pathname, returns the equivalent path in the target locale. */
export function switchLocalePath(pathname: string, target: Locale): string {
  const isEn = pathname.startsWith("/en");
  const rest = isEn ? pathname.slice(3) : pathname;
  const normalizedRest = rest === "" ? "/" : rest;
  return localePath(target, normalizedRest);
}
