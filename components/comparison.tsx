import { Reveal } from "@/components/reveal";
import { LogoMark } from "@/components/logo";
import { ButterflyWatermark } from "@/components/butterfly";

const ROWS = [
  {
    label: "Scope",
    others: "Point tools tuned to a single layer. Savings in one silo create waste in another.",
    smalblu: "Cross-layer platform. One system optimizes all six layers together.",
  },
  {
    label: "Energy",
    others: "Energy use isn't part of the conversation.",
    smalblu: "Energy efficiency built into every optimization decision, with reporting to prove it.",
  },
  {
    label: "Intelligence",
    others: "Static rules or manual consulting engagements that go stale in weeks.",
    smalblu: "AI-first, multi-agent system that learns continuously from every deployment.",
  },
  {
    label: "Outcomes",
    others: "FinOps-only cost scope: dashboards to read, reports to file.",
    smalblu: "Maximum system efficiency, with cost, energy, performance, and productivity gains as byproducts.",
  },
];

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="mt-0.5 h-5 w-5 shrink-0 text-white" aria-hidden="true">
      <circle cx="10" cy="10" r="8.25" stroke="currentColor" strokeWidth="1.5" />
      <path d="m6.6 10.2 2.3 2.3 4.5-4.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DashIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="mt-0.5 h-5 w-5 shrink-0 text-faint/70" aria-hidden="true">
      <circle cx="10" cy="10" r="8.25" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6.5 10h7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function Comparison() {
  return (
    <section className="py-16 sm:py-24 lg:py-32" aria-labelledby="comparison-heading">
      <div className="container-x">
        <Reveal className="max-w-3xl">
          <p className="kicker">Why smalBlu</p>
          <h2
            id="comparison-heading"
            className="mt-4 text-balance text-4xl font-semibold tracking-[-0.03em] text-ink sm:text-5xl"
          >
            The only agentic platform for{" "}
            <span className="accent-word">cross-layer data optimization</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid items-stretch gap-4 md:grid-cols-2 lg:mt-14">
          {/* others */}
          <Reveal className="order-2 md:order-1">
            <div className="card h-full p-6 opacity-80 sm:p-8">
              <p className="text-[15px] font-semibold text-fog">Point tools &amp; manual services</p>
              <p className="mt-1 text-sm text-faint">The status quo</p>
              <ul className="mt-7 flex flex-col gap-5">
                {ROWS.map((row) => (
                  <li key={row.label} className="flex gap-3.5">
                    <DashIcon />
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">{row.label}</p>
                      <p className="mt-1 text-[0.9375rem] leading-relaxed text-fog/85">{row.others}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* smalBlu, on the brand blue */}
          <Reveal delay={0.1} className="order-1 md:order-2">
            <div className="panel-blue relative h-full overflow-hidden rounded-[20px] p-6 shadow-[0_30px_80px_-30px_rgba(0,94,255,0.5)] sm:p-8">
              <ButterflyWatermark
                className="-right-[30%] -top-[10%] w-[420px] text-white"
                opacityClass="opacity-[0.09]"
              />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="flex items-center gap-2 text-[15px] font-semibold text-white">
                      <LogoMark className="h-4 w-auto text-white" />
                      smalBlu
                    </p>
                    <p className="mt-1 text-sm text-white/80">The agentic platform</p>
                  </div>
                  <span className="rounded-full bg-white/15 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white">
                    All six layers
                  </span>
                </div>
                <ul className="mt-7 flex flex-col gap-5">
                  {ROWS.map((row) => (
                    <li key={row.label} className="flex gap-3.5">
                      <CheckIcon />
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/70">{row.label}</p>
                        <p className="mt-1 text-[0.9375rem] leading-relaxed text-white/95">{row.smalblu}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
