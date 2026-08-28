import type { Metadata } from "next";
import Link from "next/link";
import { getAllProjectsForAdmin } from "@/lib/projects/admin-queries";
import { categoryLabel } from "@/lib/projects/categories";

export const metadata: Metadata = { title: "Admin — Công trình", robots: { index: false } };

export default async function AdminProjectsPage() {
  const projects = await getAllProjectsForAdmin();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-brand-dark">Công trình</h1>
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center justify-center rounded-md bg-brand-accent px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-accent-dark"
        >
          + Thêm công trình
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-lg border border-brand-border bg-white">
        {projects.length === 0 ? (
          <p className="p-10 text-center text-sm text-brand-muted">Chưa có công trình nào.</p>
        ) : (
          <ul className="divide-y divide-brand-border">
            {projects.map((project) => (
              <li key={project.id} className="flex items-center justify-between gap-4 p-5">
                <div>
                  <p className="font-medium text-brand-dark">{project.title_vi}</p>
                  <p className="mt-1 text-sm text-brand-muted">
                    {categoryLabel(project.category, "vi")}
                    {project.location_vi ? ` · ${project.location_vi}` : ""}
                    {" · "}
                    <span
                      className={
                        project.status === "published" ? "text-brand-accent" : "text-brand-muted"
                      }
                    >
                      {project.status === "published" ? "Đã đăng" : "Bản nháp"}
                    </span>
                    {project.featured ? " · Trang chủ" : ""}
                  </p>
                </div>
                <Link
                  href={`/admin/projects/${project.id}`}
                  className="shrink-0 text-sm font-medium text-brand-accent hover:text-brand-accent-dark"
                >
                  Sửa
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
