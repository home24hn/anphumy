import { PhotoScene } from "./PhotoScene";
import { ACCENT } from "./palette";

/** Scene D — Access Control. Links the wall-mounted reader to the
 * turnstile lane it authorizes. */
export function AccessControlPhotoScene() {
  return (
    <PhotoScene
      src="/images/illustrations/access-control.webp"
      overlay={
        <g stroke={ACCENT} strokeWidth={0.25} opacity={0.8}>
          <line x1="88" y1="38" x2="56" y2="64" className="illus-flow" />
          <circle cx="88" cy="38" r="0.8" fill={ACCENT} className="illus-pulse" />
          <circle
            cx="56"
            cy="64"
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
