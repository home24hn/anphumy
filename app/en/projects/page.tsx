import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectFilter } from "@/components/projects/ProjectFilter";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { getPublishedProjects } from "@/lib/projects/queries";
import { PROJECT_FILTERS } from "@/lib/projects/categories";

export const metadata: Metadata = {
  title: "Projects",
  description: "Projects APM Tech has delivered: CCTV, network, access control, ELV maintenance and energy.",
  alternates: { canonical: "/en/projects", languages: { vi: "/projects" } },
};

export default async function EnProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const dict = getDictionary("en");
  const { category } = await searchParams;

  const activeFilter = PROJECT_FILTERS.find((f) => f.key === category) ?? PROJECT_FILTERS[0];
  const categories = activeFilter.key === "all" ? undefined : activeFilter.categories;
  const projects = await getPublishedProjects(categories);

  return (
    <Section tone="light">
      <SectionHeading title={dict.projectsPage.title} subtitle={dict.projectsPage.subtitle} />

      <div className="mt-8">
        <ProjectFilter locale="en" active={activeFilter.key} />
      </div>

      {projects.length > 0 ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} locale="en" />
          ))}
        </div>
      ) : (
        <p className="mt-10 rounded-lg border border-dashed border-brand-border p-10 text-center text-sm text-brand-muted">
          {dict.projectsPage.empty}
        </p>
      )}
    </Section>
  );
}
