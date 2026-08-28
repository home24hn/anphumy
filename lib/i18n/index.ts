import type { Locale } from "@/types/project";
import type { Dictionary } from "./types";
import { vi } from "./vi";
import { en } from "./en";

const dictionaries: Record<Locale, Dictionary> = { vi, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };
