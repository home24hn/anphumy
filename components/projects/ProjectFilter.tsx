import Link from "next/link";
import type { Locale } from "@/types/project";
import { PROJECT_FILTERS } from "@/lib/projects/categories";
import { cn } from "@/lib/utils";
import { localePath } from "@/components/layout/locale-links";

export function ProjectFilter({
  locale,
  active,
}: {
  locale: Locale;
  active: string;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {PROJECT_FILTERS.map((filter) => {
        const isActive = filter.key === active;
        const href =
          filter.key === "all"
            ? localePath(locale, "/projects")
            : `${localePath(locale, "/projects")}?category=${filter.key}`;

        return (
          <Link
            key={filter.key}
            href={href}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
              isActive
                ? "border-brand-accent bg-brand-accent text-white"
                : "border-brand-border text-brand-dark/80 hover:border-brand-dark",
            )}
          >
            {filter.label[locale]}
          </Link>
        );
      })}
    </div>
  );
}
