"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Counter } from "@/components/counter";
import { Reveal } from "@/components/reveal";

const EASE = [0.22, 0.61, 0.36, 1] as const;
const stroke = { strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" } as const;

/* ---------- shared pieces ---------- */

function IconOrb({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-accent/30 text-accent-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),inset_-6px_-8px_16px_rgba(0,94,255,0.25),0_0_28px_-8px_rgba(0,94,255,0.55)]"
      style={{ background: "radial-gradient(circle at 30% 25%, #1c3054 0%, #0a1424 62%)" }}
      aria-hidden="true"
    >
      {children}
    </span>
  );
}

function MeterBar({ value, delay = 0.3 }: { value: number; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <div className="flex w-full max-w-[260px] items-center gap-3" aria-hidden="true">
      <div className="relative h-[5px] flex-1 rounded-full bg-white/[0.08]">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-accent to-[#5aa2ff]"
          initial={reduce ? { width: `${value}%` } : { width: "2%" }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.3, delay, ease: EASE }}
        >
          <span className="absolute -right-1 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-[#9cc6ff] shadow-[0_0_10px_rgba(90,162,255,0.95)]" />
        </motion.div>
      </div>
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">up to</span>
    </div>
  );
}

function CardShell({
  children,
  anchor,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  anchor?: boolean;
  className?: string;
  delay?: number;
}) {
  return (
    <Reveal delay={delay} className={className}>
      <article
        className={`relative h-full overflow-hidden rounded-[22px] border transition-all duration-400 ${
          anchor
            ? "border-accent/30 shadow-[0_0_60px_-24px_rgba(0,94,255,0.45)] hover:border-accent/45"
            : "border-accent/[0.14] hover:border-accent/30"
        }`}
        style={{ background: "linear-gradient(160deg, #0b1526 0%, #060c18 55%, #050a13 100%)" }}
      >
        {children}
      </article>
    </Reveal>
  );
}

/* ---------- card visuals ---------- */

function DeclineChart() {
  const reduce = useReducedMotion();
  const line = "M12 38 L58 52 L84 47 L122 88 L152 81 L188 126 L214 120 L250 163 L274 158 L308 192";
  return (
    <div className="relative h-full min-h-[220px] w-full" aria-hidden="true">
      <svg viewBox="0 0 320 240" preserveAspectRatio="none" className="h-full w-full">
        <defs>
          <linearGradient id="decline-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(0,94,255,0.28)" />
            <stop offset="100%" stopColor="rgba(0,94,255,0)" />
          </linearGradient>
        </defs>
        {[64, 128, 192, 256].map((x) => (
          <line key={x} x1={x} y1="18" x2={x} y2="228" stroke="rgba(255,255,255,0.07)" strokeWidth="1" strokeDasharray="2 6" />
        ))}
        <motion.path
          d={`${line} L308 240 L12 240 Z`}
          fill="url(#decline-area)"
          initial={reduce ? { opacity: 1 } : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1 }}
        />
        <motion.path
          d={line}
          fill="none"
          stroke="#3b82ff"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ filter: "drop-shadow(0 0 8px rgba(0,94,255,0.65))" }}
          initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, delay: 0.3, ease: "easeInOut" }}
        />
        <motion.g
          initial={reduce ? { opacity: 1 } : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 1.15 }}
        >
          <circle cx="152" cy="81" r="8" fill="none" stroke="rgba(90,162,255,0.55)" strokeWidth="1.5" />
          <circle cx="152" cy="81" r="3.4" fill="#9cc6ff" />
        </motion.g>
      </svg>
      <motion.span
        className="absolute bottom-[14%] left-[38%] inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#0b1628]/90 px-3.5 py-1.5 text-[12px] font-medium text-fog backdrop-blur-sm"
        initial={reduce ? { opacity: 1 } : { opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 1.3, ease: EASE }}
      >
        <svg viewBox="0 0 12 12" className="h-3 w-3 text-accent-2" fill="none">
          <path d="M6 1.2 10.2 3.6v4.8L6 10.8 1.8 8.4V3.6L6 1.2z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
        </svg>
        Waste avoided
      </motion.span>
    </div>
  );
}

function GaugeArc() {
  const reduce = useReducedMotion();
  const LEN = 305.4; // r=70, 250° sweep
  return (
    <svg viewBox="0 0 180 180" className="h-[150px] w-[150px]" aria-hidden="true">
      <path
        d="M 32.7 130.2 A 70 70 0 1 1 147.3 130.2"
        fill="none"
        stroke="rgba(255,255,255,0.07)"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <motion.path
        d="M 32.7 130.2 A 70 70 0 1 1 147.3 130.2"
        fill="none"
        stroke="url(#gauge-grad)"
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={LEN}
        style={{ filter: "drop-shadow(0 0 10px rgba(0,94,255,0.5))" }}
        initial={reduce ? { strokeDashoffset: 46 } : { strokeDashoffset: LEN }}
        whileInView={{ strokeDashoffset: 46 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 0.35, ease: EASE }}
      />
      <defs>
        <linearGradient id="gauge-grad" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#0050d6" />
          <stop offset="100%" stopColor="#5aa2ff" />
        </linearGradient>
      </defs>
      <motion.circle
        cx="159.9"
        cy="86.9"
        r="4.5"
        fill="#9cc6ff"
        style={{ filter: "drop-shadow(0 0 8px rgba(90,162,255,0.95))" }}
        initial={reduce ? { opacity: 1 } : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 1.55 }}
      />
      <path d="M40 152 Q 60 144, 82 152 T 124 152" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="34" y1="164" x2="146" y2="164" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="2 6" />
    </svg>
  );
}

function DotGlobe() {
  const dots: { x: number; y: number; o: number }[] = [];
  for (let lat = -75; lat <= 75; lat += 15) {
    for (let lon = 15; lon <= 165; lon += 22) {
      const p = (lat * Math.PI) / 180;
      const l = (lon * Math.PI) / 180;
      const x = 208 - 88 * Math.cos(p) * Math.sin(l);
      const y = 100 - 88 * Math.sin(p);
      if (x < 196) dots.push({ x, y, o: 0.12 + 0.3 * Math.sin(l) });
    }
  }
  return (
    <svg viewBox="0 0 200 200" className="absolute inset-y-0 right-0 h-full w-auto opacity-60" aria-hidden="true">
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r="1.7" fill="#4096db" opacity={d.o} />
      ))}
    </svg>
  );
}

/* ---------- icons ---------- */

const ICONS = {
  cost: (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <circle cx="12" cy="12" r="9" stroke="currentColor" {...stroke} />
      <path d="M14.8 8.8c-.5-.9-1.6-1.4-2.8-1.4-1.7 0-3 .9-3 2.2 0 2.9 6 1.5 6 4.4 0 1.3-1.3 2.2-3 2.2-1.2 0-2.3-.5-2.8-1.4M12 5.8v1.6m0 9.2v1.6" stroke="currentColor" {...stroke} />
    </svg>
  ),
  perf: (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <path d="M13.5 2.5 5 13.5h5.5L10 21.5l8.5-11h-5.5l.5-8z" stroke="currentColor" {...stroke} />
    </svg>
  ),
  prod: (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <path d="M4.5 7.5A9 9 0 1 1 3 12" stroke="currentColor" {...stroke} />
      <path d="M3 4v3.5h3.5" stroke="currentColor" {...stroke} />
      <path d="M12 7.5V12l3.2 1.9" stroke="currentColor" {...stroke} />
    </svg>
  ),
  sust: (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <path d="M19.5 4.5c-7.2 0-11.8 3.3-11.8 8.8 0 1.9.7 3.4 1.8 4.4 1.8 1.8 4 2 5.5 1.3 4.4-2.1 4.5-9.4 4.5-14.5z" stroke="currentColor" {...stroke} />
      <path d="M6.5 20.5c1.8-4.1 4.7-7.4 8.7-9.6" stroke="currentColor" {...stroke} />
    </svg>
  ),
};

/* ---------- stat block (label row + number + meter + copy) ---------- */

function StatBlock({
  label,
  icon,
  value,
  title,
  desc,
  big,
  delay,
}: {
  label: string;
  icon: React.ReactNode;
  value: number;
  title: string;
  desc: string;
  big?: boolean;
  delay: number;
}) {
  return (
    <>
      <div className="flex items-center gap-4">
        <IconOrb>{icon}</IconOrb>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent-2">{label}</p>
      </div>
      <p
        className={`mt-6 font-semibold leading-none tracking-[-0.03em] text-ink tabular ${
          big ? "text-[4.5rem] sm:text-[5.25rem]" : "text-5xl"
        }`}
      >
        <Counter to={value} duration={1.6} delay={delay} />
        <span className="text-accent-2">%</span>
      </p>
      <div className="mt-5">
        <MeterBar value={value} delay={delay + 0.15} />
      </div>
      <h3 className={`mt-6 font-semibold tracking-tight text-ink ${big ? "text-2xl" : "text-lg"}`}>{title}</h3>
      <p className="mt-2 max-w-sm text-[0.9375rem] leading-relaxed text-fog">{desc}</p>
    </>
  );
}

/* ---------- section ---------- */

export function Benefits() {
  return (
    <section id="benefits" className="scroll-mt-24 py-24 sm:py-32" aria-labelledby="benefits-heading">
      <div className="container-x">
        <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <Reveal>
            <p className="kicker">Benefits</p>
            <h2
              id="benefits-heading"
              className="mt-4 text-balance text-4xl font-semibold tracking-[-0.03em] text-ink sm:text-5xl"
            >
              Results you can put a <span className="accent-word">number on</span>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="max-w-md border-l-2 border-accent/60 pl-6 text-pretty text-lg leading-relaxed text-fog">
              Six agents, six layers, one relentless objective: maximum efficiency from the
              infrastructure you already own.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 lg:mt-14 lg:grid-cols-12">
          {/* anchor: cost efficiency */}
          <CardShell anchor className="lg:col-span-6 lg:row-span-2">
            <div className="flex h-full flex-col p-7 sm:p-9 lg:pr-8">
              <div className="lg:max-w-[52%]">
                <StatBlock
                  label="Cost efficiency"
                  icon={ICONS.cost}
                  value={40}
                  title="Lower cloud spend"
                  desc="Continuous cross-layer optimization eliminates waste the moment an agent finds it."
                  big
                  delay={0.2}
                />
              </div>
              <div className="mt-8 flex-1 lg:absolute lg:bottom-8 lg:right-7 lg:top-24 lg:mt-0 lg:w-[40%]">
                <DeclineChart />
              </div>
            </div>
          </CardShell>

          {/* performance */}
          <CardShell delay={0.08} className="lg:col-span-6">
            <div className="flex items-center gap-6 p-7 sm:p-9">
              <div className="min-w-0 flex-1">
                <StatBlock
                  label="Performance"
                  icon={ICONS.perf}
                  value={30}
                  title="Faster systems"
                  desc="Relentless tuning from query plans to cache layers keeps performance climbing."
                  delay={0.35}
                />
              </div>
              <div className="hidden shrink-0 md:block">
                <GaugeArc />
              </div>
            </div>
          </CardShell>

          {/* productivity */}
          <CardShell delay={0.14} className="lg:col-span-3">
            <div className="p-7 sm:p-8">
              <StatBlock
                label="Productivity"
                icon={ICONS.prod}
                value={70}
                title="Engineering time saved"
                desc="Routine tuning goes to the agents. Your engineers go back to building product."
                delay={0.5}
              />
            </div>
          </CardShell>

          {/* sustainability */}
          <CardShell delay={0.2} className="lg:col-span-3">
            <DotGlobe />
            <div className="relative p-7 sm:p-8">
              <StatBlock
                label="Sustainability"
                icon={ICONS.sust}
                value={35}
                title="Smaller carbon footprint"
                desc="Every optimization removes wasted energy, with ESG reporting to prove it."
                delay={0.65}
              />
            </div>
          </CardShell>
        </div>
      </div>
    </section>
  );
}
