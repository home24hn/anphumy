import Image from "next/image";
import type { ReactNode } from "react";

// A soft elliptical fade so every scene blends into the white section
// background at its edges, regardless of whether the source photo already
// has its own painted fade — closest-side sizing fades corners first,
// which reads as a natural vignette rather than a hard rectangular cut.
const FADE_MASK =
  "radial-gradient(ellipse closest-side at center, black 62%, transparent 100%)";

export function PhotoScene({
  src,
  overlay,
}: {
  src: string;
  overlay?: ReactNode;
}) {
  return (
    <div className="relative h-full w-full">
      <Image
        src={src}
        alt=""
        fill
        sizes="(min-width: 1024px) 40vw, (min-width: 640px) 60vw, 100vw"
        className="object-contain object-center"
        style={{
          maskImage: FADE_MASK,
          WebkitMaskImage: FADE_MASK,
        }}
      />
      {overlay ? (
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 h-full w-full"
          role="presentation"
        >
          {overlay}
        </svg>
      ) : null}
    </div>
  );
}
