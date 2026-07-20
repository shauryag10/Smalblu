"use client";

import { Counter } from "@/components/counter";
import { Reveal } from "@/components/reveal";

const BENEFITS = [
  {
    value: 40,
    title: "Lower cloud spend",
    desc: "Continuous cross-layer optimization eliminates waste the moment an agent finds it.",
  },
  {
    value: 30,
    title: "Faster systems",
    desc: "Relentless tuning, from query plans to cache layers, keeps performance climbing.",
  },
  {
    value: 70,
    title: "Engineering time saved",
    desc: "Routine tuning goes to the agents. Your engineers go back to building product.",
  },
  {
    value: 35,
    title: "Smaller carbon footprint",
    desc: "Every optimization removes wasted energy, with ESG reporting to prove it.",
  },
];

export function Benefits() {
  return (
    <section id="benefits" className="scroll-mt-24 border-t border-line py-24 sm:py-32" aria-labelledby="benefits-heading">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.4fr] lg:gap-20">
          <Reveal>
            <p className="kicker">Benefits</p>
            <h2
              id="benefits-heading"
              className="mt-4 text-balance text-4xl font-semibold tracking-[-0.03em] text-ink sm:text-5xl"
            >
              Results you can put a <span className="accent-word">number on</span>
            </h2>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-fog">
              Six agents, six layers, one relentless objective: maximum efficiency from the
              infrastructure you already own.
            </p>
          </Reveal>

          <dl className="grid gap-x-10 gap-y-12 sm:grid-cols-2">
            {BENEFITS.map((b, i) => (
              <Reveal key={b.title} delay={0.08 + i * 0.07}>
                <div className="border-t-2 border-accent/60 pt-6">
                  <dd className="font-mono text-6xl font-semibold leading-none tracking-tight text-ink tabular">
                    <Counter to={b.value} duration={1.8} />
                    <span className="text-accent-2">%</span>
                  </dd>
                  <dt className="mt-4 text-lg font-semibold tracking-tight text-ink">{b.title}</dt>
                  <dd className="mt-1.5 text-[0.9375rem] leading-relaxed text-fog">{b.desc}</dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
