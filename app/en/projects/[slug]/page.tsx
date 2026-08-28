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

  const title = project.title_en || project.title_vi;
  const description =
    project.summary_en ??
    project.summary_vi ??
    `${categoryLabel(project.category, "en")}${project.location_en ? ` in ${project.location_en}` : ""}.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/en/projects/${slug}`,
      languages: { vi: `/projects/${slug}` },
    },
  };
}

export default async function EnProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const dict = getDictionary("en");
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) notFound();

  const isTranslated = Boolean(project.title_en);
  const title = project.title_en || project.title_vi;
  const location = project.location_en || project.location_vi;
  const summary = project.summary_en || project.summary_vi;
  const workItems =
    project.work_items_en && project.work_items_en.length > 0
      ? project.work_items_en
      : project.work_items_vi ?? [];

  return (
    <>
      <Section tone="light" className="!pb-10 lg:!pb-10">
        <Link
          href={localePath("en", "/projects")}
          className="text-sm font-medium text-brand-accent hover:text-brand-accent-dark"
        >
          ← {dict.common.backToProjects}
        </Link>

        {!isTranslated ? (
          <p className="mt-5 rounded-md bg-brand-light px-4 py-2.5 text-xs text-brand-muted">
            {dict.common.languageNotice}
          </p>
        ) : null}

        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.1em] text-brand-accent">
          {categoryLabel(project.category, "en")}
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-brand-dark sm:text-4xl">
          {title}
        </h1>
        <p className="mt-3 text-sm text-brand-muted">
          {[location, project.year].filter(Boolean).join(" · ")}
        </p>
      </Section>

      {project.cover_image_url ? (
        <Container className="!max-w-[1280px]">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-brand-light">
            <Image
              src={project.cover_image_url}
              alt={title}
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
          {summary ? (
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-accent">
                {dict.common.overview}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-brand-muted">{summary}</p>
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
                    {item.text_en || item.text_vi}
                  </li>
                ))}
              </ol>
            </div>
          ) : null}
        </div>

        {project.project_images && project.project_images.length > 0 ? (
          <div className="mt-14">
            <Gallery images={project.project_images} locale="en" />
          </div>
        ) : null}
      </Section>

      <ContactCTA locale="en" dict={dict} />
    </>
  );
}
