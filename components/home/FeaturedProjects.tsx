import Link from "next/link";
import type { Dictionary } from "@/lib/i18n/types";
import type { Locale } from "@/types/project";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { getFeaturedProjects } from "@/lib/projects/queries";
import { localePath } from "@/components/layout/locale-links";

export async function FeaturedProjects({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const { featuredProjects } = dict.home;
  const projects = await getFeaturedProjects(6);

  return (
    <Section tone="light">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow={dict.nav.projects}
          title={featuredProjects.title}
          subtitle={featuredProjects.subtitle}
        />
        <Link
          href={localePath(locale, "/projects")}
          className="text-sm font-medium text-brand-accent hover:text-brand-accent-dark"
        >
          {featuredProjects.cta} →
        </Link>
      </div>

      {projects.length > 0 ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} locale={locale} />
          ))}
        </div>
      ) : (
        <p className="mt-10 rounded-lg border border-dashed border-brand-border p-10 text-center text-sm text-brand-muted">
          {featuredProjects.empty}
        </p>
      )}
    </Section>
  );
}
