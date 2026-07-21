"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Counter } from "@/components/counter";
import { Reveal } from "@/components/reveal";

const EASE = [0.22, 0.61, 0.36, 1] as const;
const stroke = { strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" } as const;

/* ---------- shared pieces ---------- */

function IconOrb({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-flex" aria-hidden="true">
      <span className="absolute -inset-1.5 rounded-full border border-accent/15" />
      <span
        className="flex h-14 w-14 items-center justify-center rounded-full border border-accent/30 text-accent-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),inset_-6px_-8px_16px_rgba(0,94,255,0.22),0_0_28px_-8px_rgba(0,94,255,0.5)]"
        style={{ background: "radial-gradient(circle at 30% 25%, #1c3054 0%, #0a1424 62%)" }}
      >
        {children}
      </span>
    </span>
  );
}

function MeterBar({ value, delay = 0.3, className }: { value: number; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <div className={`flex items-center gap-3 ${className ?? ""}`} aria-hidden="true">
      <div className="relative h-[5px] w-full max-w-[210px] rounded-full bg-white/[0.1]">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-accent to-[#5aa2ff]"
          initial={reduce ? { width: `${value}%` } : { width: "3%" }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.3, delay, ease: EASE }}
        >
          <span className="absolute -right-1.5 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-[#9cc6ff] shadow-[0_0_12px_rgba(90,162,255,0.95)]" />
        </motion.div>
      </div>
      <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-faint">up to</span>
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
            ? "border-accent/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_0_60px_-24px_rgba(0,94,255,0.4)] hover:border-accent/45"
            : "border-accent/[0.14] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] hover:border-accent/30"
        }`}
        style={{ background: "linear-gradient(160deg, #0b1526 0%, #060c18 55%, #050a13 100%)" }}
      >
        {children}
      </article>
    </Reveal>
  );
}

/* ---------- card visuals ---------- */

/**
 * Declining spend line for the anchor card. Drawn in a tall 340x520 space
 * that matches its rendered region, so nothing distorts: gentle sawtooth
 * descent, dotted gridlines, soft area fill, one marked point, floating chip.
 */
function DeclineChart() {
  const reduce = useReducedMotion();
  const line =
    "M24 56 L104 148 L96 134 L180 248 L172 234 L252 352 L244 338 L312 452";
  return (
    <div className="relative h-full w-full" aria-hidden="true">
      <svg viewBox="0 0 340 520" preserveAspectRatio="none" className="h-full w-full">
        <defs>
          <linearGradient id="decline-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(0,94,255,0.22)" />
            <stop offset="85%" stopColor="rgba(0,94,255,0)" />
          </linearGradient>
        </defs>
        {[100, 186, 272].map((x) => (
          <line key={x} x1={x} y1="30" x2={x} y2="500" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="2 7" />
        ))}
        <motion.path
          d={`${line} L312 520 L24 520 Z`}
          fill="url(#decline-area)"
          initial={reduce ? { opacity: 1 } : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 1.1 }}
        />
        <motion.path
          d={line}
          fill="none"
          stroke="#3b82ff"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          style={{ filter: "drop-shadow(0 0 8px rgba(0,94,255,0.6))" }}
          initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.7, delay: 0.3, ease: "easeInOut" }}
        />
      </svg>
      {/* marked point at the P4 vertex (172,234 in a 340x520 space) */}
      <motion.span
        className="absolute"
        style={{ left: "50.6%", top: "45%" }}
        initial={reduce ? { opacity: 1 } : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 1.2 }}
      >
        <span className="absolute -translate-x-1/2 -translate-y-1/2">
          <span className="block h-4 w-4 rounded-full border border-[#5aa2ff]/60" />
        </span>
        <span className="absolute -translate-x-1/2 -translate-y-1/2">
          <span className="block h-[7px] w-[7px] rounded-full bg-[#9cc6ff] shadow-[0_0_10px_rgba(90,162,255,0.95)]" />
        </span>
      </motion.span>
      <motion.span
        className="absolute bottom-[9%] left-1/2 inline-flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-[#0b1628]/90 px-3.5 py-1.5 text-[12px] font-medium text-fog backdrop-blur-sm"
        initial={reduce ? { opacity: 1 } : { opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 1.35, ease: EASE }}
      >
        <svg viewBox="0 0 12 12" className="h-3 w-3 text-accent-2" fill="none">
          <path d="M6 1.2 10.2 3.6v4.8L6 10.8 1.8 8.4V3.6L6 1.2z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
        </svg>
        Waste avoided
      </motion.span>
    </div>
  );
}

/** 250° gauge arc, filled ~82% with a glowing dot at the fill tip. */
function GaugeArc() {
  const reduce = useReducedMotion();
  const LEN = 305.4; // r=70, 250° sweep
  const REST = 55; // ~82% filled
  return (
    <svg viewBox="0 0 180 180" className="h-[168px] w-[168px]" aria-hidden="true">
      <defs>
        <linearGradient id="gauge-grad" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#0050d6" />
          <stop offset="100%" stopColor="#5aa2ff" />
        </linearGradient>
      </defs>
      <path
        d="M 32.7 130.2 A 70 70 0 1 1 147.3 130.2"
        fill="none"
        stroke="rgba(255,255,255,0.1)"
        strokeWidth="11"
        strokeLinecap="round"
      />
      <motion.path
        d="M 32.7 130.2 A 70 70 0 1 1 147.3 130.2"
        fill="none"
        stroke="url(#gauge-grad)"
        strokeWidth="11"
        strokeLinecap="round"
        strokeDasharray={LEN}
        style={{ filter: "drop-shadow(0 0 10px rgba(0,94,255,0.5))" }}
        initial={reduce ? { strokeDashoffset: REST } : { strokeDashoffset: LEN }}
        whileInView={{ strokeDashoffset: REST }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 0.35, ease: EASE }}
      />
      <motion.circle
        cx="158.9"
        cy="77.8"
        r="4.5"
        fill="#9cc6ff"
        style={{ filter: "drop-shadow(0 0 8px rgba(90,162,255,0.95))" }}
        initial={reduce ? { opacity: 1 } : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 1.55 }}
      />
      <line x1="40" y1="158" x2="140" y2="158" stroke="rgba(255,255,255,0.09)" strokeWidth="1" strokeDasharray="2 6" />
    </svg>
  );
}

/** Dotted quarter-arcs hugging the card's right edge (sustainability). */
function DottedArcs() {
  const dots: { x: number; y: number; o: number; r: number }[] = [];
  const CX = 252;
  const CY = 210;
  [72, 108, 144, 180].forEach((radius, ring) => {
    for (let a = 118; a <= 242; a += 8) {
      const rad = (a * Math.PI) / 180;
      const x = CX + radius * Math.cos(rad);
      const y = CY + radius * Math.sin(rad);
      if (x > 4 && y > 8 && y < 412) {
        dots.push({ x, y, o: 0.34 - ring * 0.055, r: 1.8 });
      }
    }
  });
  return (
    <div className="pointer-events-none absolute inset-y-0 right-0 w-[42%] overflow-hidden" aria-hidden="true">
      <svg
        viewBox="0 0 220 420"
        className="absolute right-0 top-1/2 h-[105%] w-auto -translate-y-1/2"
        preserveAspectRatio="xMaxYMid meet"
      >
        {dots.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r={d.r} fill="#4d9aff" opacity={d.o} />
        ))}
      </svg>
    </div>
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

/* ---------- stat block ---------- */

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
      <div className="flex items-center gap-5">
        <IconOrb>{icon}</IconOrb>
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent-2">{label}</p>
      </div>
      <p
        className={`mt-7 font-semibold leading-none tracking-[-0.03em] text-ink tabular ${
          big ? "text-[4.75rem] sm:text-[5.75rem]" : "text-[3.4rem]"
        }`}
      >
        <Counter to={value} duration={1.6} delay={delay} />
        <span className="text-accent-2">%</span>
      </p>
      <MeterBar value={value} delay={delay + 0.15} className="mt-6" />
      <h3 className={`mt-7 font-semibold tracking-tight text-ink ${big ? "text-2xl" : "text-xl"}`}>{title}</h3>
      <p className="mt-2.5 max-w-sm text-[0.9375rem] leading-relaxed text-fog">{desc}</p>
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
            <div className="relative h-full p-7 sm:p-9">
              <div className="lg:max-w-[50%]">
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
              <div className="absolute bottom-9 right-8 top-24 hidden w-[42%] lg:block">
                <DeclineChart />
              </div>
            </div>
          </CardShell>

          {/* performance */}
          <CardShell delay={0.08} className="lg:col-span-6">
            <div className="flex items-center gap-8 p-7 sm:p-9">
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
              <div className="hidden shrink-0 self-center md:block">
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
            <DottedArcs />
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
