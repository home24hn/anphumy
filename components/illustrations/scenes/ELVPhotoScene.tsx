import { PhotoScene } from "./PhotoScene";
import { ACCENT } from "./palette";

/** Scene E — ELV Infrastructure. Pipes and conduits already carry the
 * story; overlay marks the riser junction feeding a distribution panel. */
export function ELVPhotoScene() {
  return (
    <PhotoScene
      src="/images/illustrations/elv.webp"
      overlay={
        <g stroke={ACCENT} strokeWidth={0.25} opacity={0.8}>
          <line x1="68" y1="22" x2="26" y2="66" className="illus-flow" />
          <circle cx="68" cy="22" r="0.8" fill={ACCENT} className="illus-pulse" />
          <circle
            cx="26"
            cy="66"
            r="0.8"
            fill={ACCENT}
            className="illus-pulse"
            style={{ animationDelay: "0.8s" }}
          />
        </g>
      }
    />
  );
}
