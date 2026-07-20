import { Reveal } from "@/components/reveal";

/*
 * Simplified, hand-drawn partner glyphs (grayscale at rest, brand color on
 * hover). TODO: replace with official brand SVGs once licensing/press kits
 * are pulled in (see README).
 */
const GLYPHS: Record<string, React.ReactNode> = {
  aws: (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
      <rect x="4" y="5" width="7" height="7" rx="1.5" stroke="#ff9900" strokeWidth="1.6" />
      <rect x="13.5" y="5" width="7" height="7" rx="1.5" stroke="#ff9900" strokeWidth="1.6" strokeOpacity="0.55" />
      <path d="M3 16.5c4.6 3 12.4 3.4 17.6.8" stroke="#ff9900" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M18.8 15.7l2.5 1.4-.6 2.8" stroke="#ff9900" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  azure: (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
      <path d="M13.7 3h-4L4 16.9h4L13.7 3z" fill="#2a90e0" />
      <path d="M14.8 6.8 10.5 21h9.6L14.8 6.8z" fill="#0064b5" />
    </svg>
  ),
  gcp: (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
      <defs>
        <linearGradient id="gcpg" x1="0" y1="0" x2="24" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ea4335" />
          <stop offset="0.35" stopColor="#fbbc05" />
          <stop offset="0.7" stopColor="#34a853" />
          <stop offset="1" stopColor="#4285f4" />
        </linearGradient>
      </defs>
      <path
        d="M6.6 18.5a4.1 4.1 0 0 1-.6-8.15 6.2 6.2 0 0 1 11.9-1.1 4.9 4.9 0 0 1-.6 9.25H6.6z"
        stroke="url(#gcpg)"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  ),
  postgres: (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
      <ellipse cx="12" cy="6" rx="8" ry="3" stroke="#336791" strokeWidth="1.7" />
      <path d="M4 6v12c0 1.66 3.58 3 8 3s8-1.34 8-3V6" stroke="#336791" strokeWidth="1.7" />
      <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" stroke="#336791" strokeWidth="1.7" />
    </svg>
  ),
  mysql: (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
      <ellipse cx="12" cy="6" rx="8" ry="3" fill="#f29111" fillOpacity="0.9" />
      <path d="M4 6v12c0 1.66 3.58 3 8 3s8-1.34 8-3V6" stroke="#00758f" strokeWidth="1.7" />
      <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" stroke="#00758f" strokeWidth="1.7" />
    </svg>
  ),
  mongo: (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
      <path
        d="M12 2.5c3.2 3.4 5 6.4 5 9.9 0 4.1-2.6 7-5 8.6-2.4-1.6-5-4.5-5-8.6 0-3.5 1.8-6.5 5-9.9z"
        fill="#10aa50"
        fillOpacity="0.9"
      />
      <path d="M12 6v15.5" stroke="#0b7a3a" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  snowflake: (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
      <g stroke="#29b5e8" strokeWidth="1.6" strokeLinecap="round">
        <path d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9" />
        <path d="M12 3l-2.2 2.2M12 3l2.2 2.2M12 21l-2.2-2.2M12 21l2.2-2.2" />
      </g>
    </svg>
  ),
  redis: (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
      <g fill="#dc382d">
        <path d="M12 3 3.5 6.8 12 10.6l8.5-3.8L12 3z" fillOpacity="0.95" />
        <path d="M3.5 11.3 12 15.1l8.5-3.8-2.4-1.1L12 12.9 5.9 10.2l-2.4 1.1z" fillOpacity="0.75" />
        <path d="M3.5 15.8 12 19.6l8.5-3.8-2.4-1.1-6.1 2.7-6.1-2.7-2.4 1.1z" fillOpacity="0.55" />
      </g>
    </svg>
  ),
};

const PARTNERS = [
  { key: "aws", label: "AWS" },
  { key: "azure", label: "Microsoft Azure" },
  { key: "gcp", label: "Google Cloud" },
  { key: "postgres", label: "PostgreSQL" },
  { key: "mysql", label: "MySQL" },
  { key: "mongo", label: "MongoDB" },
  { key: "snowflake", label: "Snowflake" },
  { key: "redis", label: "Redis" },
];

function Track({ hidden }: { hidden?: boolean }) {
  return (
    <ul
      aria-hidden={hidden || undefined}
      className="marquee-track flex w-max shrink-0 items-center"
    >
      {PARTNERS.map((p) => (
        <li key={p.key} className="logo-cell mx-7 flex items-center gap-2.5 sm:mx-10">
          {GLYPHS[p.key]}
          <span className="whitespace-nowrap text-[15px] font-semibold tracking-tight text-ink/90">
            {p.label}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function Marquee() {
  return (
    <section aria-label="Supported clouds and databases" className="border-y border-line bg-white/[0.014] py-12">
      <div className="container-x">
        <Reveal className="mb-8 flex flex-col items-center gap-1.5 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-faint">Cloud-agnostic by design</p>
          <p className="text-sm text-fog">
            API-only integration across the clouds and databases you already run. No host installs.
          </p>
        </Reveal>
      </div>
      <div className="marquee-mask flex overflow-hidden">
        <Track />
        <Track hidden />
      </div>
    </section>
  );
}
