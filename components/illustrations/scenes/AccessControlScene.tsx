import { ACCENT, INK, MUTED, STROKE_ACCENT, STROKE_MAIN, STROKE_SECONDARY } from "./palette";

/**
 * Scene D — Access Control: an entrance with a reader tied to a central
 * management system, and an abstract "granted" indicator above the
 * threshold instead of a literal person — keeps the scene technical
 * rather than illustrative-of-people.
 */
export function AccessControlScene() {
  return (
    <svg viewBox="0 0 480 380" className="h-full w-full" role="presentation">
      <line x1={20} y1={330} x2={460} y2={330} stroke={INK} strokeWidth={STROKE_MAIN} />

      {/* Wall either side of the entrance */}
      <rect x={40} y={90} width={50} height={240} fill="none" stroke={INK} strokeWidth={STROKE_MAIN} />
      <rect x={290} y={90} width={50} height={240} fill="none" stroke={INK} strokeWidth={STROKE_MAIN} />

      {/* Double door */}
      <rect x={95} y={110} width={90} height={220} fill="#ffffff" stroke={INK} strokeWidth={STROKE_MAIN} />
      <rect x={195} y={110} width={90} height={220} fill="#ffffff" stroke={INK} strokeWidth={STROKE_MAIN} />
      <rect x={105} y={125} width={70} height={90} rx={2} fill="none" stroke={MUTED} strokeWidth={1} />
      <rect x={205} y={125} width={70} height={90} rx={2} fill="none" stroke={MUTED} strokeWidth={1} />
      <line x1={183} y1={220} x2={183} y2={232} stroke={INK} strokeWidth={STROKE_SECONDARY} />
      <line x1={197} y1={220} x2={197} y2={232} stroke={INK} strokeWidth={STROKE_SECONDARY} />

      {/* Abstract "granted" indicator over the threshold */}
      <circle cx={240} cy={92} r={11} fill="#ffffff" stroke={ACCENT} strokeWidth={1.5} className="illus-pulse" />
      <path
        d="M234,92 l4,5 l9,-11"
        fill="none"
        stroke={ACCENT}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Reader */}
      <rect x={300} y={170} width={26} height={50} rx={3} fill="#ffffff" stroke={INK} strokeWidth={STROKE_MAIN} />
      <rect x={305} y={176} width={16} height={14} fill="none" stroke={MUTED} strokeWidth={1} />
      <circle cx={313} cy={205} r={3} fill={ACCENT} className="illus-pulse" />

      {/* Link to the management system */}
      <path
        d="M326,190 C345,175 358,160 372,148"
        fill="none"
        stroke={ACCENT}
        strokeWidth={STROKE_ACCENT}
        strokeLinecap="round"
        className="illus-flow"
      />

      {/* Management system */}
      <rect x={370} y={108} width={90} height={80} rx={4} fill="#ffffff" stroke={INK} strokeWidth={STROKE_MAIN} />
      <rect x={402} y={145} width={26} height={20} rx={3} fill="none" stroke={INK} strokeWidth={STROKE_SECONDARY} />
      <path
        d="M406,145 v-8 a9,9 0 0 1 18,0 v8"
        fill="none"
        stroke={INK}
        strokeWidth={STROKE_SECONDARY}
      />
    </svg>
  );
}
