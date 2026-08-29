import Image from "next/image";
import Link from "next/link";
import type { Locale, Project } from "@/types/project";
import { categoryLabel } from "@/lib/projects/categories";
import { localePath } from "@/components/layout/locale-links";

export function ProjectCard({
  project,
  locale,
}: {
  project: Project;
  locale: Locale;
}) {
  const title = (locale === "en" ? project.title_en : project.title_vi) || project.title_vi;
  const location = (locale === "en" ? project.location_en : project.location_vi) || project.location_vi;

  return (
    <Link
      href={localePath(locale, `/projects/${project.slug}`)}
      className="group block overflow-hidden rounded-lg border border-brand-border bg-white transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-brand-light">
        {project.cover_image_url ? (
          <Image
            src={project.cover_image_url}
            alt={title}
            fill
            loading="eager"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-brand-muted">
            APM TECH
          </div>
        )}
      </div>
      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-brand-accent">
          {categoryLabel(project.category, locale)}
        </p>
        <h3 className="mt-2 text-base font-semibold text-brand-dark">{title}</h3>
        <p className="mt-1.5 text-sm text-brand-muted">
          {[location, project.year].filter(Boolean).join(" · ")}
        </p>
      </div>
    </Link>
  );
}
