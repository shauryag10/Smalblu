import { Reveal } from "@/components/reveal";

const stroke = { strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" } as const;

const GUARANTEES = [
  {
    title: "Security Guardrails",
    desc: "Human-in-the-loop approval on every change, a full audit trail of every action, and one-click rollback if you ever want it undone.",
    icon: (
      <svg viewBox="0 0 28 28" fill="none" className="h-6 w-6" aria-hidden="true">
        <path d="M14 3 5 6.5v6.2c0 5.7 3.8 9.9 9 11.8 5.2-1.9 9-6.1 9-11.8V6.5L14 3z" stroke="currentColor" {...stroke} />
        <path d="m10.2 13.9 2.7 2.7 5-5.3" stroke="currentColor" {...stroke} />
      </svg>
    ),
  },
  {
    title: "Zero Data Movement",
    desc: "SmalBlu deploys inside your environment on open-source models. Your workload data never crosses your network perimeter. Nothing leaves, ever.",
    icon: (
      <svg viewBox="0 0 28 28" fill="none" className="h-6 w-6" aria-hidden="true">
        <circle cx="14" cy="14" r="10.5" stroke="currentColor" strokeDasharray="3.2 3.6" {...stroke} />
        <rect x="10.5" y="12" width="7" height="6" rx="1.5" stroke="currentColor" {...stroke} />
        <path d="M11.8 12v-1.8a2.2 2.2 0 0 1 4.4 0V12" stroke="currentColor" {...stroke} />
      </svg>
    ),
  },
  {
    title: "Metadata-Only Access",
    desc: "Agents read performance metrics and configuration metadata, never your actual workload data. Aligned with CISO security frameworks and vendor compliance matrices.",
    icon: (
      <svg viewBox="0 0 28 28" fill="none" className="h-6 w-6" aria-hidden="true">
        <path d="M16.5 3.5H8a2 2 0 0 0-2 2v17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-5.5-5.5z" stroke="currentColor" {...stroke} />
        <path d="M16.5 3.5V9H22" stroke="currentColor" {...stroke} />
        <path d="M9.5 14h4M9.5 17.5h6.5M9.5 21h5" stroke="currentColor" {...stroke} />
        <circle cx="17.8" cy="14.2" r="0.9" fill="currentColor" />
      </svg>
    ),
  },
];

const PILLS = ["End-to-End Encrypted", "Role-Based Access", "Human Approval"];

export function Security() {
  return (
    <section
      id="security"
      className="relative scroll-mt-24 border-y border-line bg-abyss/60 py-24 sm:py-32"
      aria-labelledby="security-heading"
    >
      <div className="container-x">
        <Reveal className="flex max-w-3xl flex-col items-start">
          <p className="kicker">Security</p>
          <h2
            id="security-heading"
            className="mt-4 text-balance text-4xl font-semibold tracking-[-0.03em] text-ink sm:text-5xl"
          >
            Enterprise-Grade Security
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-fog">
            Three guarantees built into every deployment.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-12 lg:mt-14">
          <div className="overflow-hidden rounded-[20px] border border-line">
            <div className="grid gap-px bg-white/[0.07] md:grid-cols-3">
              {GUARANTEES.map((g) => (
                <article key={g.title} className="group bg-abyss p-7 transition-colors duration-300 hover:bg-[#060b14] sm:p-8">
                  <span className="flex h-13 w-13 items-center justify-center rounded-full bg-white text-[#0050d6] shadow-[0_10px_30px_-10px_rgba(240,247,252,0.4)]">
                    {g.icon}
                  </span>
                  <h3 className="mt-6 text-lg font-semibold tracking-tight text-ink">{g.title}</h3>
                  <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-fog">{g.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2} className="mt-10 flex flex-wrap items-center gap-3">
          {PILLS.map((pill) => (
            <span
              key={pill}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-4 py-2 text-sm font-medium text-fog"
            >
              <svg viewBox="0 0 12 12" className="h-3 w-3 text-accent-2" fill="none" aria-hidden="true">
                <path d="m2.5 6.2 2.4 2.4 4.6-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {pill}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
