"use client";

import { Counter } from "@/components/counter";
import { Reveal } from "@/components/reveal";

const stroke = { strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" } as const;

const BENEFITS = [
  {
    value: 40,
    title: "Lower cloud spend",
    desc: "Continuous cross-layer optimization eliminates waste the moment an agent finds it.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" {...stroke} />
        <path d="M14.8 8.8c-.5-.9-1.6-1.4-2.8-1.4-1.7 0-3 .9-3 2.2 0 2.9 6 1.5 6 4.4 0 1.3-1.3 2.2-3 2.2-1.2 0-2.3-.5-2.8-1.4M12 5.8v1.6m0 9.2v1.6" stroke="currentColor" {...stroke} />
      </svg>
    ),
  },
  {
    value: 30,
    title: "Faster systems",
    desc: "Relentless tuning from query plans to cache layers keeps performance climbing.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
        <path d="M13.5 2.5 5 13.5h5.5L10 21.5l8.5-11h-5.5l.5-8z" stroke="currentColor" {...stroke} />
      </svg>
    ),
  },
  {
    value: 70,
    title: "Engineering time saved",
    desc: "Routine tuning goes to the agents. Your engineers go back to building product.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
        <path d="M4.5 7.5A9 9 0 1 1 3 12" stroke="currentColor" {...stroke} />
        <path d="M3 4v3.5h3.5" stroke="currentColor" {...stroke} />
        <path d="M12 7.5V12l3.2 1.9" stroke="currentColor" {...stroke} />
      </svg>
    ),
  },
  {
    value: 35,
    title: "Smaller carbon footprint",
    desc: "Every optimization removes wasted energy, with ESG reporting to prove it.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
        <path d="M19.5 4.5c-7.2 0-11.8 3.3-11.8 8.8 0 1.9.7 3.4 1.8 4.4 1.8 1.8 4 2 5.5 1.3 4.4-2.1 4.5-9.4 4.5-14.5z" stroke="currentColor" {...stroke} />
        <path d="M6.5 20.5c1.8-4.1 4.7-7.4 8.7-9.6" stroke="currentColor" {...stroke} />
      </svg>
    ),
  },
];

export function Benefits() {
  return (
    <section id="benefits" className="scroll-mt-24 py-24 sm:py-32" aria-labelledby="benefits-heading">
      <div className="container-x">
        <div className="grid items-end gap-6 lg:grid-cols-[1fr_auto]">
          <Reveal className="max-w-2xl">
            <p className="kicker">Benefits</p>
            <h2
              id="benefits-heading"
              className="mt-4 text-balance text-4xl font-semibold tracking-[-0.03em] text-ink sm:text-5xl"
            >
              Results you can put a <span className="accent-word">number on</span>
            </h2>
          </Reveal>
          <Reveal delay={0.08} className="max-w-sm lg:pb-2">
            <p className="text-pretty leading-relaxed text-fog">
              Six agents, six layers, one relentless objective: maximum efficiency from the
              infrastructure you already own.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {BENEFITS.map((b, i) => (
            <Reveal key={b.title} delay={0.05 + i * 0.08}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-[20px] border border-white/[0.08] bg-gradient-to-b from-[#0a1120] to-[#050a13] p-7 transition-all duration-400 hover:border-accent/35 hover:shadow-[0_20px_60px_-24px_rgba(0,94,255,0.35)]">
                <div
                  aria-hidden="true"
                  className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent/[0.07] blur-[50px] transition-all duration-500 group-hover:bg-accent/[0.14]"
                />
                <span className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-accent/25 bg-accent/[0.08] text-accent-2 transition-colors duration-300 group-hover:border-accent/45 group-hover:text-accent-3">
                  {b.icon}
                </span>
                <p className="relative mt-8 font-mono text-[3.4rem] font-semibold leading-none tracking-tight text-ink tabular">
                  <Counter to={b.value} duration={1.7} delay={0.15 + i * 0.1} />
                  <span className="text-accent-2">%</span>
                </p>
                <p className="relative mt-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
                  up to
                </p>
                <h3 className="relative mt-5 text-[17px] font-semibold tracking-tight text-ink">{b.title}</h3>
                <p className="relative mt-2 text-sm leading-relaxed text-fog">{b.desc}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
