import { Reveal } from "@/components/reveal";

const stroke = { strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" } as const;

const FEATURES = [
  {
    title: "Cross-Layer Optimization",
    desc: "One system optimizes user, application, compute, network, database, and storage together, never in silos.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <path d="M12 3 4 7.5l8 4.5 8-4.5L12 3z" stroke="currentColor" {...stroke} />
        <path d="m4 12.5 8 4.5 8-4.5M4 17.5 12 22l8-4.5" stroke="currentColor" {...stroke} opacity="0.55" />
      </svg>
    ),
  },
  {
    title: "LLM-Powered Agents",
    desc: "Agents reason about your infrastructure in real time and recommend optimizations that keep getting sharper.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <path d="M12 2.5c1 3.4 2.1 4.5 5.5 5.5-3.4 1-4.5 2.1-5.5 5.5-1-3.4-2.1-4.5-5.5-5.5 3.4-1 4.5-2.1 5.5-5.5z" stroke="currentColor" {...stroke} />
        <path d="M18.5 13.5c.6 2 1.3 2.7 3.3 3.3-2 .6-2.7 1.3-3.3 3.3-.6-2-1.3-2.7-3.3-3.3 2-.6 2.7-1.3 3.3-3.3z" stroke="currentColor" {...stroke} opacity="0.55" />
        <path d="M7 14.5c.5 1.7 1.1 2.3 2.8 2.8-1.7.5-2.3 1.1-2.8 2.8-.5-1.7-1.1-2.3-2.8-2.8 1.7-.5 2.3-1.1 2.8-2.8z" stroke="currentColor" {...stroke} opacity="0.55" />
      </svg>
    ),
  },
  {
    title: "Natural-Language Interface",
    desc: "Ask your infrastructure anything. Query state, spend, and changes in plain English, no dashboards required.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5c-1.2 0-2.4-.25-3.4-.7L4 21l1.7-5.1A8.5 8.5 0 1 1 21 11.5z" stroke="currentColor" {...stroke} />
        <path d="M8.5 10h7M8.5 13.5h4.5" stroke="currentColor" {...stroke} />
      </svg>
    ),
  },
  {
    title: "Anomaly Detection",
    desc: "Around-the-clock monitoring catches spend spikes and performance drift before they reach production.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <path d="M3 15.5 8 9l3.5 4.5 3-3.5 6.5 7" stroke="currentColor" {...stroke} />
        <circle cx="14.5" cy="10" r="0.5" fill="currentColor" />
        <path d="M14.5 4.5v2M14.5 13v2M18 8.5h2M9 8.5h2" stroke="currentColor" {...stroke} opacity="0.55" />
      </svg>
    ),
  },
  {
    title: "Smart Compression",
    desc: "A proprietary engine compresses and caches data intelligently, cutting storage and load by 35 to 50%.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <path d="M12 3v5m0 0 2.5-2.5M12 8 9.5 5.5M12 21v-5m0 0 2.5 2.5M12 16l-2.5 2.5" stroke="currentColor" {...stroke} />
        <rect x="4" y="10.5" width="16" height="3" rx="1.5" stroke="currentColor" {...stroke} />
      </svg>
    ),
  },
  {
    title: "ESG Reporting",
    desc: "Audit-ready carbon and energy reporting, generated from every optimization decision automatically.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <path d="M19 4c-7 0-11.5 3.2-11.5 8.6 0 1.8.7 3.3 1.7 4.3C11 18.7 13 19 14.5 18.3 18.8 16.2 19 9 19 4z" stroke="currentColor" {...stroke} />
        <path d="M6.5 20c1.8-4 4.6-7.2 8.5-9.3" stroke="currentColor" {...stroke} />
      </svg>
    ),
  },
];

export function Features() {
  return (
    <section id="features" className="scroll-mt-24 py-24 sm:py-32" aria-labelledby="features-heading">
      <div className="container-x">
        <Reveal className="max-w-3xl">
          <p className="kicker">Features</p>
          <h2
            id="features-heading"
            className="mt-4 text-balance text-4xl font-semibold tracking-[-0.03em] text-ink sm:text-5xl"
          >
            One platform, <span className="accent-word">every capability</span>
          </h2>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-fog">
            Cloud-agnostic by design. SmalBlu plugs into any cloud, multi-cloud, or hybrid setup
            through APIs alone, with no host installs.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-12 lg:mt-14">
          <div className="overflow-hidden rounded-[20px] border border-line">
            <div className="grid gap-px bg-white/[0.07] sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((f) => (
                <article key={f.title} className="group bg-night p-7 transition-colors duration-300 hover:bg-[#070d18] sm:p-8">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-accent/25 bg-accent/[0.08] text-accent-2 transition-colors duration-300 group-hover:border-accent/45 group-hover:text-accent-3">
                    {f.icon}
                  </span>
                  <h3 className="mt-5 text-base font-semibold tracking-tight text-ink">{f.title}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-fog">{f.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
