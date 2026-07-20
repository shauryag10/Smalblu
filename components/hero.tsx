"use client";

import { motion, useReducedMotion } from "framer-motion";
import { DashboardMock } from "@/components/dashboard-mock";
import { ButterflyWatermark } from "@/components/butterfly";
import { site } from "@/lib/site";

const EASE = [0.22, 0.61, 0.36, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const fadeUp = (delay: number) => ({
    initial: reduce ? false : ({ opacity: 0, y: 28 } as const),
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: EASE },
  });

  return (
    <section className="relative overflow-hidden pb-24 pt-36 sm:pt-44" aria-labelledby="hero-heading">
      {/* ambient background */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="glow-orb left-1/2 top-[-280px] h-[700px] w-[980px] -translate-x-1/2 animate-drift opacity-70" />
        <div className="texture-dots absolute inset-0" />
      </div>
      <ButterflyWatermark
        className="-right-[12%] top-[-60px] w-[720px] rotate-[9deg] text-accent sm:w-[880px]"
        opacityClass="opacity-[0.06]"
      />

      <div className="container-x flex flex-col items-center text-center">
        <motion.p {...fadeUp(0.05)} className="kicker">
          AI for enterprise data infrastructure optimization
        </motion.p>

        <motion.h1
          {...fadeUp(0.15)}
          id="hero-heading"
          className="mt-5 max-w-5xl text-balance text-[clamp(3rem,7.5vw,6.5rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-ink"
        >
          Your AI Infrastructure <span className="accent-word">Optimization Team</span>
        </motion.h1>

        <motion.p {...fadeUp(0.28)} className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-fog sm:text-xl">
          SmalBlu&apos;s AI agents work 24/7 to reduce your costs by 40% and boost performance by
          30%, while you focus on what matters most.
        </motion.p>

        <motion.div {...fadeUp(0.4)} className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
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

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 48, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
          className="mt-20 w-full"
        >
          <DashboardMock />
        </motion.div>
      </div>
    </section>
  );
}
