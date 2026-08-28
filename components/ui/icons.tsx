// Minimal line icons for service cards that have no photo. Single stroke,
// currentColor, no fill — matches the site's restrained visual language.

const common = {
  width: 40,
  height: 40,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function FingerprintIcon() {
  return (
    <svg {...common} aria-hidden="true">
      <path d="M12 3a9 9 0 0 0-9 9v3" />
      <path d="M12 3a9 9 0 0 1 9 9v3" />
      <path d="M7 21v-4a5 5 0 0 1 10 0v1" />
      <path d="M12 21v-6a2.5 2.5 0 0 0-5 0" />
      <path d="M17 21v-7" />
      <path d="M4.5 15v1a7.5 7.5 0 0 0 3 6" />
    </svg>
  );
}

export function BatteryIcon() {
  return (
    <svg {...common} aria-hidden="true">
      <rect x="2" y="7" width="17" height="10" rx="2" />
      <path d="M22 10v4" />
      <path d="M6 10.5v3" />
      <path d="M10 10.5v3" />
      <path d="M14 10.5v3" />
    </svg>
  );
}

export function GaugeIcon() {
  return (
    <svg {...common} aria-hidden="true">
      <path d="M4 15a8 8 0 1 1 16 0" />
      <path d="M12 15l4-5" />
      <path d="M12 15a1.5 1.5 0 1 1 0-0.01" />
    </svg>
  );
}
