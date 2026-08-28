import type { Metadata } from "next";
import Link from "next/link";
import { ProjectForm } from "@/components/admin/ProjectForm";

export const metadata: Metadata = { title: "Admin — Thêm công trình", robots: { index: false } };

export default function NewProjectPage() {
  return (
    <div>
      <Link href="/admin/projects" className="text-sm font-medium text-brand-accent hover:text-brand-accent-dark">
        ← Công trình
      </Link>
      <h1 className="mt-3 text-xl font-semibold text-brand-dark">Thêm công trình</h1>

      <div className="mt-8 max-w-2xl rounded-lg border border-brand-border bg-white p-6 sm:p-8">
        <ProjectForm mode="create" />
      </div>
    </div>
  );
}
