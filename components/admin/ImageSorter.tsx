"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import type { ProjectImage } from "@/types/project";
import { deleteProjectImage, moveProjectImage } from "@/lib/actions/projects";

export function ImageSorter({
  projectId,
  images,
}: {
  projectId: string;
  images: ProjectImage[];
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function move(imageId: string, direction: "up" | "down") {
    startTransition(async () => {
      await moveProjectImage(projectId, imageId, direction);
      router.refresh();
    });
  }

  function remove(imageId: string) {
    startTransition(async () => {
      await deleteProjectImage(imageId);
      router.refresh();
    });
  }

  if (images.length === 0) {
    return <p className="text-sm text-brand-muted">Chưa có ảnh nào trong gallery.</p>;
  }

  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {images.map((image, i) => (
        <li key={image.id} className="overflow-hidden rounded-md border border-brand-border">
          <div className="relative aspect-[4/3] bg-brand-light">
            <Image src={image.image_url} alt="" fill sizes="200px" className="object-cover" />
          </div>
          <div className="flex items-center justify-between gap-1 p-1.5">
            <button
              type="button"
              disabled={pending || i === 0}
              onClick={() => move(image.id, "up")}
              className="rounded px-1.5 py-1 text-xs text-brand-muted hover:text-brand-dark disabled:opacity-30"
              aria-label="Lên"
            >
              ↑
            </button>
            <button
              type="button"
              disabled={pending || i === images.length - 1}
              onClick={() => move(image.id, "down")}
              className="rounded px-1.5 py-1 text-xs text-brand-muted hover:text-brand-dark disabled:opacity-30"
              aria-label="Xuống"
            >
              ↓
            </button>
            <button
              type="button"
              disabled={pending}
              onClick={() => remove(image.id)}
              className="rounded px-1.5 py-1 text-xs text-red-600 hover:bg-red-50"
              aria-label="Xóa"
            >
              ✕
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
