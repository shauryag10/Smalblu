/**
 * Cloud/database compatibility strip. Official brand marks served from
 * /public/logos (sourced from the gilbarbara/logos collection), rendered
 * monochrome via CSS and brightened on hover. Trademarks belong to their
 * respective owners; shown here in a "works with" capacity.
 */
const LOGOS: { name: string; src: string; h: string; label?: boolean }[] = [
  { name: "AWS", src: "/logos/aws.svg", h: "h-9", label: false },
  { name: "Microsoft Azure", src: "/logos/azure.svg", h: "h-7" },
  { name: "Google Cloud", src: "/logos/google-cloud.svg", h: "h-7" },
  { name: "PostgreSQL", src: "/logos/postgresql.svg", h: "h-7" },
  { name: "MySQL", src: "/logos/mysql-icon.svg", h: "h-7" },
  { name: "MongoDB", src: "/logos/mongodb-icon.svg", h: "h-8" },
  { name: "Snowflake", src: "/logos/snowflake-icon.svg", h: "h-7" },
  { name: "Redis", src: "/logos/redis.svg", h: "h-7" },
];

function Track({ hidden }: { hidden?: boolean }) {
  return (
    <ul
      className="marquee-track flex w-max shrink-0 items-center"
      aria-hidden={hidden || undefined}
    >
      {LOGOS.map((logo) => (
        <li key={logo.name} className="logo-cell mx-9 flex items-center gap-3 sm:mx-11">
          <img
            src={logo.src}
            alt={hidden ? "" : logo.name}
            draggable={false}
            className={`${logo.h} w-auto`}
          />
          {logo.label !== false && (
            <span className="whitespace-nowrap text-sm font-medium text-fog">{logo.name}</span>
          )}
        </li>
      ))}
    </ul>
  );
}

export function Marquee() {
  return (
    <section className="border-y border-line bg-abyss/40 py-10" aria-label="Supported clouds and databases">
      <div className="container-x mb-7 flex flex-col items-center gap-1.5 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-faint">Cloud-agnostic by design</p>
        <p className="text-sm text-fog">
          API-only integration across the clouds and databases you already run. No host installs.
        </p>
      </div>
      <div className="marquee-mask flex overflow-hidden">
        <Track />
        <Track hidden />
      </div>
    </section>
  );
}
