import { PhotoScene } from "./PhotoScene";
import { ACCENT } from "./palette";

/** Scene B — Security Systems. A dashed sightline from the camera to the
 * entrance it's watching, standing in for a coverage zone. */
export function SecurityPhotoScene() {
  return (
    <PhotoScene
      src="/images/illustrations/security.webp"
      overlay={
        <g stroke={ACCENT} strokeWidth={0.25} opacity={0.8}>
          <line
            x1="80"
            y1="22"
            x2="48"
            y2="68"
            strokeDasharray="2.5 2.5"
            className="illus-flow"
          />
          <circle cx="80" cy="22" r="0.8" fill={ACCENT} className="illus-pulse" />
          <circle
            cx="48"
            cy="68"
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
