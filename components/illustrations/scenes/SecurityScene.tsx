import { ACCENT, INK, MUTED, STROKE_ACCENT, STROKE_MAIN, STROKE_SECONDARY } from "./palette";

/**
 * Scene B — Security Systems: a building facade under camera coverage,
 * feeding a monitoring panel — the surveillance side of the business,
 * distinct from the building-elevation composition of Scene A.
 */
export function SecurityScene() {
  const windowXs = [58, 112, 166];

  return (
    <svg viewBox="0 0 480 380" className="h-full w-full" role="presentation">
      {/* Ground */}
      <line x1={20} y1={330} x2={460} y2={330} stroke={INK} strokeWidth={STROKE_MAIN} />

      {/* Facade */}
      <rect x={40} y={110} width={200} height={220} fill="#ffffff" stroke={INK} strokeWidth={STROKE_MAIN} />
      <rect x={35} y={104} width={210} height={6} fill={INK} />

      {windowXs.map((x) => (
        <rect key={`w1-${x}`} x={x} y={140} width={26} height={32} rx={2} fill="none" stroke={MUTED} strokeWidth={1} />
      ))}
      {windowXs.map((x) => (
        <rect key={`w2-${x}`} x={x} y={210} width={26} height={32} rx={2} fill="none" stroke={MUTED} strokeWidth={1} />
      ))}

      {/* Door */}
      <rect x={125} y={270} width={30} height={60} fill="none" stroke={INK} strokeWidth={STROKE_SECONDARY} />
      <line x1={140} y1={270} x2={140} y2={330} stroke={MUTED} strokeWidth={1} />

      {/* Camera 1 — top-left corner */}
      <rect x={44} y={104} width={18} height={9} rx={2} fill={INK} />
      <circle cx={64} cy={108} r={3.5} fill={INK} />
      <path
        d="M64,108 L170,200"
        stroke={ACCENT}
        strokeWidth={1}
        strokeLinecap="round"
        className="illus-flow"
      />
      <path d="M64,108 L95,240" stroke={MUTED} strokeWidth={1} strokeDasharray="3 4" />

      {/* Camera 2 — top-right corner, watching toward the panel */}
      <rect x={222} y={104} width={18} height={9} rx={2} fill={INK} />
      <circle cx={242} cy={108} r={3.5} fill={INK} />
      <path
        d="M242,108 L350,200"
        stroke={ACCENT}
        strokeWidth={1}
        strokeLinecap="round"
        className="illus-flow"
      />
      <path d="M242,108 L270,250" stroke={MUTED} strokeWidth={1} strokeDasharray="3 4" />

      <circle cx={125} cy={300} r={4} fill={ACCENT} className="illus-pulse" />

      {/* Transmission lines to the monitoring panel */}
      <path
        d="M64,108 C150,140 220,158 300,170"
        fill="none"
        stroke={MUTED}
        strokeWidth={STROKE_SECONDARY}
        strokeDasharray="4 4"
      />
      <path
        d="M242,108 C280,92 330,96 372,120"
        fill="none"
        stroke={MUTED}
        strokeWidth={STROKE_SECONDARY}
        strokeDasharray="4 4"
      />

      {/* Monitoring panel */}
      <rect x={300} y={120} width={140} height={100} rx={4} fill="#ffffff" stroke={INK} strokeWidth={STROKE_MAIN} />
      <line x1={370} y1={120} x2={370} y2={220} stroke={MUTED} strokeWidth={STROKE_SECONDARY} />
      <line x1={300} y1={170} x2={440} y2={170} stroke={MUTED} strokeWidth={STROKE_SECONDARY} />
      <circle cx={428} cy={132} r={4} fill={ACCENT} className="illus-pulse" />
      <line x1={370} y1={220} x2={370} y2={240} stroke={INK} strokeWidth={STROKE_ACCENT} />
      <line x1={345} y1={240} x2={395} y2={240} stroke={INK} strokeWidth={STROKE_ACCENT} />
    </svg>
  );
}
