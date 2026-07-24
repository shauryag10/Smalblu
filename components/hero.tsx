"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Counter } from "@/components/counter";
import { ButterflyWatermark } from "@/components/butterfly";
import { site } from "@/lib/site";

const EASE = [0.22, 0.61, 0.36, 1] as const;

const STATS = [
  { value: 40, suffix: "%", label: "lower cloud spend" },
  { value: 30, suffix: "%", label: "faster systems" },
  { value: 70, suffix: "%", label: "engineering time saved" },
  { value: 35, suffix: "%", label: "smaller carbon footprint" },
];

export function Hero() {
  const reduce = useReducedMotion();
  const fadeUp = (delay: number) => ({
    initial: reduce ? false : ({ opacity: 0, y: 28 } as const),
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: EASE },
  });

  return (
    <section className="relative overflow-hidden pb-20 pt-40 sm:pb-24 sm:pt-52" aria-labelledby="hero-heading">
      {/* ambient background */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="glow-orb left-1/2 top-[-320px] h-[720px] w-[1100px] -translate-x-1/2 animate-drift opacity-60" />
        <div className="texture-dots absolute inset-0" />
      </div>
      <ButterflyWatermark
        className="-right-[14%] top-[-40px] w-[700px] rotate-[9deg] text-accent sm:w-[860px]"
        opacityClass="opacity-[0.05]"
      />

      <div className="container-x flex flex-col items-center text-center">
        <motion.h1
          {...fadeUp(0.05)}
          id="hero-heading"
          className="max-w-5xl text-balance text-[clamp(3rem,7.5vw,6.25rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-ink"
        >
          Your AI Infrastructure <span className="accent-word">Optimization Team</span>
        </motion.h1>

        <motion.p {...fadeUp(0.2)} className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-fog sm:text-xl">
          SmalBlu&apos;s AI agents work 24/7 to reduce your costs by 40% and boost performance by
          30%, while you focus on what matters most.
        </motion.p>

        <motion.div {...fadeUp(0.34)} className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
          <a
            href={site.calendly}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary w-full sm:w-auto"
          >
            Book a Demo
            <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4" aria-hidden="true">
              <path d="M3 8h10m0 0-4-4m4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a href="#how-it-works" className="btn btn-ghost w-full sm:w-auto">
            See how it works
          </a>
        </motion.div>

        {/* outcome strip */}
        <motion.dl
          {...fadeUp(0.55)}
          className="mt-24 grid w-full max-w-4xl grid-cols-2 gap-y-10 border-t border-line pt-10 sm:grid-cols-4"
        >
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col items-center gap-1.5 ${i > 0 ? "sm:border-l sm:border-line" : ""}`}
            >
              <dd className="font-mono text-4xl font-semibold tracking-tight text-ink tabular sm:text-[2.75rem]">
                <Counter to={s.value} suffix={s.suffix} duration={1.6 + i * 0.2} />
              </dd>
              <dt className="text-[13px] text-faint">{s.label}</dt>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
