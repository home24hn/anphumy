"use client";

import { deleteProject } from "@/lib/actions/projects";

export function DeleteProjectButton({ projectId, title }: { projectId: string; title: string }) {
  return (
    <form
      action={deleteProject.bind(null, projectId)}
      onSubmit={(e) => {
        if (!confirm(`Xóa công trình "${title}"? Hành động này không thể hoàn tác.`)) {
          e.preventDefault();
        }
      }}
    >
      <button type="submit" className="text-sm font-medium text-red-600 hover:text-red-700">
        Xóa công trình
      </button>
    </form>
  );
}
