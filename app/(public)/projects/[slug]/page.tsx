import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/i18n";
import { getProjectBySlug } from "@/lib/projects/queries";
import { categoryLabel } from "@/lib/projects/categories";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Gallery } from "@/components/projects/Gallery";
import { ContactCTA } from "@/components/home/ContactCTA";
import { localePath } from "@/components/layout/locale-links";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};

  const description =
    project.summary_vi ??
    `${categoryLabel(project.category, "vi")}${project.location_vi ? ` tại ${project.location_vi}` : ""}.`;

  return {
    title: project.title_vi,
    description,
    alternates: {
      canonical: `/projects/${slug}`,
      languages: { en: `/en/projects/${slug}` },
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const dict = getDictionary("vi");
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) notFound();

  const workItems = project.work_items_vi ?? [];

  return (
    <>
      <Section tone="light" className="!pb-10 lg:!pb-10">
        <Link
          href={localePath("vi", "/projects")}
          className="text-sm font-medium text-brand-accent hover:text-brand-accent-dark"
        >
          ← {dict.common.backToProjects}
        </Link>

        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.1em] text-brand-accent">
          {categoryLabel(project.category, "vi")}
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-brand-dark sm:text-4xl">
          {project.title_vi}
        </h1>
        <p className="mt-3 text-sm text-brand-muted">
          {[project.location_vi, project.year].filter(Boolean).join(" · ")}
        </p>
      </Section>

      {project.cover_image_url ? (
        <Container className="!max-w-[1280px]">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-brand-light">
            <Image
              src={project.cover_image_url}
              alt={project.title_vi}
              fill
              sizes="100vw"
              priority
              className="object-cover"
            />
          </div>
        </Container>
      ) : null}

      <Section tone="light">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
          {project.summary_vi ? (
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-accent">
                {dict.common.overview}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-brand-muted">
                {project.summary_vi}
              </p>
            </div>
          ) : null}

          {workItems.length > 0 ? (
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-accent">
                {dict.common.scopeOfWork}
              </h2>
              <ol className="mt-3 space-y-2.5">
                {workItems.map((item, i) => (
                  <li key={item.id} className="flex gap-3 text-sm text-brand-dark/85">
                    <span className="font-medium text-brand-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {item.text_vi}
                  </li>
                ))}
              </ol>
            </div>
          ) : null}
        </div>

        {project.project_images && project.project_images.length > 0 ? (
          <div className="mt-14">
            <Gallery images={project.project_images} locale="vi" />
          </div>
        ) : null}
      </Section>

      <ContactCTA locale="vi" dict={dict} />
    </>
  );
}
