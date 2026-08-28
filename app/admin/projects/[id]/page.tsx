import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectByIdForAdmin } from "@/lib/projects/admin-queries";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { DeleteProjectButton } from "@/components/admin/DeleteProjectButton";

export const metadata: Metadata = { title: "Admin — Sửa công trình", robots: { index: false } };

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProjectByIdForAdmin(id);

  if (!project) notFound();

  return (
    <div>
      <div className="flex items-center justify-between">
        <Link
          href="/admin/projects"
          className="text-sm font-medium text-brand-accent hover:text-brand-accent-dark"
        >
          ← Công trình
        </Link>
        <DeleteProjectButton projectId={project.id} title={project.title_vi} />
      </div>
      <h1 className="mt-3 text-xl font-semibold text-brand-dark">{project.title_vi}</h1>
      {project.status === "published" ? (
        <Link
          href={`/projects/${project.slug}`}
          target="_blank"
          className="mt-1 inline-block text-sm text-brand-muted hover:text-brand-dark"
        >
          Xem trên trang web ↗
        </Link>
      ) : null}

      <div className="mt-8 max-w-2xl rounded-lg border border-brand-border bg-white p-6 sm:p-8">
        <ProjectForm mode="edit" project={project} />
      </div>
    </div>
  );
}
