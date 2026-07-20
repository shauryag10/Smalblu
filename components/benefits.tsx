"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Counter } from "@/components/counter";
import { Reveal } from "@/components/reveal";

const EASE = [0.22, 0.61, 0.36, 1] as const;

const BENEFITS = [
  {
    value: 40,
    title: "Lower cloud spend",
    desc: "Waste is eliminated the moment an agent finds it.",
  },
  {
    value: 30,
    title: "Faster systems",
    desc: "Continuous tuning from query plans to cache layers.",
  },
  {
    value: 70,
    title: "Engineering time saved",
    desc: "Routine tuning goes to agents, engineers go build.",
  },
  {
    value: 35,
    title: "Smaller carbon footprint",
    desc: "Wasted energy removed, ESG reporting included.",
  },
];

const R = 64;
const C = 2 * Math.PI * R;

function RingGauge({ value, title, desc, index }: (typeof BENEFITS)[number] & { index: number }) {
  const reduce = useReducedMotion();
  const target = C * (1 - value / 100);
  return (
    <Reveal delay={0.06 + index * 0.09} className="flex flex-col items-center text-center">
      <div className="relative h-[168px] w-[168px]">
        <svg viewBox="0 0 160 160" className="h-full w-full -rotate-90">
          <defs>
            <linearGradient id={`ring-${index}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#005eff" />
              <stop offset="100%" stopColor="#5aa2ff" />
            </linearGradient>
          </defs>
          {/* track */}
          <circle cx="80" cy="80" r={R} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
          {/* arc */}
          <motion.circle
            cx="80"
            cy="80"
            r={R}
            fill="none"
            stroke={`url(#ring-${index})`}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={C}
            style={{ filter: "drop-shadow(0 0 10px rgba(0,94,255,0.55))" }}
            initial={reduce ? { strokeDashoffset: target } : { strokeDashoffset: C }}
            whileInView={{ strokeDashoffset: target }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, delay: 0.25 + index * 0.12, ease: EASE }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="font-mono text-[2.1rem] font-semibold leading-none tracking-tight text-ink tabular">
            <Counter to={value} duration={1.6} delay={0.25 + index * 0.12} />
            <span className="text-accent-2">%</span>
          </p>
          <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.18em] text-faint">up to</span>
        </div>
      </div>
      <h3 className="mt-6 text-lg font-semibold tracking-tight text-ink">{title}</h3>
      <p className="mt-1.5 max-w-[240px] text-sm leading-relaxed text-fog">{desc}</p>
    </Reveal>
  );
}

export function Benefits() {
  return (
    <section id="benefits" className="relative scroll-mt-24 py-24 sm:py-32" aria-labelledby="benefits-heading">
      <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
        <div className="glow-orb left-1/2 top-1/2 h-[480px] w-[900px] -translate-x-1/2 -translate-y-1/2 opacity-30" />
      </div>
      <div className="container-x">
        <Reveal className="mx-auto max-w-3xl text-center">
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

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {BENEFITS.map((b, i) => (
            <RingGauge key={b.title} {...b} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
