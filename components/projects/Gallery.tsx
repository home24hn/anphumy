import Image from "next/image";
import type { Locale, ProjectImage } from "@/types/project";

export function Gallery({ images, locale }: { images: ProjectImage[]; locale: Locale }) {
  if (images.length === 0) return null;

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {images.map((image) => {
        const alt = (locale === "en" ? image.alt_en : image.alt_vi) || "APM Tech";
        return (
          <div
            key={image.id}
            className="relative aspect-[4/3] overflow-hidden rounded-lg bg-brand-light"
          >
            <Image
              src={image.image_url}
              alt={alt}
              fill
              sizes="(min-width: 640px) 33vw, 50vw"
              className="object-cover"
            />
          </div>
        );
      })}
    </div>
  );
}
