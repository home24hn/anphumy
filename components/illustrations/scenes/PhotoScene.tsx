import Image from "next/image";
import type { ReactNode } from "react";

// A soft white vignette painted OVER the image edges so every scene blends
// into the white section background, regardless of whether the source
// photo already has its own painted fade. Deliberately a plain gradient
// background rather than CSS mask-image: masking an optimized/negotiated
// image format turned out to composite unreliably (the photo could
// disappear entirely), where painting solid white on top always works.
const EDGE_FADE =
  "radial-gradient(ellipse closest-side at center, transparent 55%, #fff 100%)";

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
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: EDGE_FADE }}
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
