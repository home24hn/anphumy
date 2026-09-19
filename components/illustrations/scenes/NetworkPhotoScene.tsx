import { PhotoScene } from "./PhotoScene";
import { ACCENT } from "./palette";

/** Scene C — Network Infrastructure. Corridor already reads as a data
 * hall; overlay just marks the uplink path down the center aisle. */
export function NetworkPhotoScene() {
  return (
    <PhotoScene
      src="/images/illustrations/network.webp"
      overlay={
        <g stroke={ACCENT} strokeWidth={0.25} opacity={0.8}>
          <line x1="50" y1="6" x2="50" y2="40" className="illus-flow" />
          <circle cx="50" cy="6" r="0.8" fill={ACCENT} className="illus-pulse" />
          <circle
            cx="50"
            cy="40"
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
