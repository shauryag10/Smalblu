"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Counter } from "@/components/counter";
import { Reveal } from "@/components/reveal";

const EASE = [0.22, 0.61, 0.36, 1] as const;
const stroke = { strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" } as const;

/* ---------------- data ---------------- */

type Benefit = {
  key: "cost" | "perf" | "prod" | "sust";
  category: string;
  value: number;
  label: string;
  desc: string;
  icon: React.ReactNode;
};

const BENEFITS: Benefit[] = [
  {
    key: "cost",
    category: "Cost efficiency",
    value: 40,
    label: "Lower cloud spend",
    desc: "Continuous cross-layer optimization eliminates waste the moment an agent finds it.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
        <circle cx="12" cy="12" r="9" stroke="currentColor" {...stroke} />
        <path d="M14.8 8.8c-.5-.9-1.6-1.4-2.8-1.4-1.7 0-3 .9-3 2.2 0 2.9 6 1.5 6 4.4 0 1.3-1.3 2.2-3 2.2-1.2 0-2.3-.5-2.8-1.4M12 5.8v1.6m0 9.2v1.6" stroke="currentColor" {...stroke} />
      </svg>
    ),
  },
  {
    key: "perf",
    category: "Performance",
    value: 30,
    label: "Faster systems",
    desc: "Relentless tuning from query plans to cache layers keeps performance climbing.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
        <path d="M13.5 2.5 5 13.5h5.5L10 21.5l8.5-11h-5.5l.5-8z" stroke="currentColor" {...stroke} />
      </svg>
    ),
  },
  {
    key: "prod",
    category: "Productivity",
    value: 70,
    label: "Engineering time saved",
    desc: "Routine tuning goes to the agents. Your engineers go back to building product.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
        <path d="M4.5 7.5A9 9 0 1 1 3 12" stroke="currentColor" {...stroke} />
        <path d="M3 4v3.5h3.5" stroke="currentColor" {...stroke} />
        <path d="M12 7.5V12l3.2 1.9" stroke="currentColor" {...stroke} />
      </svg>
    ),
  },
  {
    key: "sust",
    category: "Sustainability",
    value: 35,
    label: "Smaller carbon footprint",
    desc: "Every optimization removes wasted energy, with ESG reporting to prove it.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
        <path d="M19.5 4.5c-7.2 0-11.8 3.3-11.8 8.8 0 1.9.7 3.4 1.8 4.4 1.8 1.8 4 2 5.5 1.3 4.4-2.1 4.5-9.4 4.5-14.5z" stroke="currentColor" {...stroke} />
        <path d="M6.5 20.5c1.8-4.1 4.7-7.4 8.7-9.6" stroke="currentColor" {...stroke} />
      </svg>
    ),
  },
];

/* ---------------- primitives ---------------- */

function IconOrb({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-flex" aria-hidden="true">
      <span className="absolute -inset-2 rounded-full border border-accent/20" />
      <span
        className="flex h-16 w-16 items-center justify-center rounded-full border border-accent/40 text-[#8fc0ff] shadow-[inset_0_1px_0_rgba(255,255,255,0.16),inset_-7px_-9px_18px_rgba(0,94,255,0.32),0_0_36px_-8px_rgba(0,94,255,0.7)] [&>svg]:h-7 [&>svg]:w-7"
        style={{ background: "radial-gradient(circle at 30% 25%, #234170 0%, #0b1628 62%)" }}
      >
        {children}
      </span>
    </span>
  );
}

/** Thin progress indicator with a glowing endpoint dot. Decorative echo of the metric. */
function MetricProgress({ value, delay = 0.3, className }: { value: number; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <div className={`flex items-center gap-3 ${className ?? ""}`} aria-hidden="true">
      <div className="relative h-[6px] w-full max-w-[240px] rounded-full bg-white/[0.12]">
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

/** Category row + metric + progress + label + description, shared by all panels. */
function BenefitContent({ benefit, big, delay }: { benefit: Benefit; big?: boolean; delay: number }) {
  return (
    <>
      <div className="flex items-center gap-5">
        <IconOrb>{benefit.icon}</IconOrb>
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent-2">{benefit.category}</p>
      </div>
      <p
        className={`mt-7 font-semibold leading-none tracking-[-0.03em] text-ink tabular [text-shadow:0_0_38px_rgba(0,94,255,0.4)] ${
          big ? "text-[4.75rem] sm:text-[6.25rem]" : "text-[4rem]"
        }`}
      >
        <Counter to={benefit.value} duration={1.6} delay={delay} />
        <span className="text-[#4d9aff]">%</span>
      </p>
      <MetricProgress value={benefit.value} delay={delay + 0.15} className="mt-6" />
      <h3 className={`mt-7 font-semibold tracking-tight text-ink ${big ? "text-2xl" : "text-xl"}`}>
        {benefit.label}
      </h3>
      <p className="mt-2.5 max-w-sm text-[0.9375rem] leading-relaxed text-fog">{benefit.desc}</p>
    </>
  );
}

/** Shared card chrome: navy gradient, thin border, hover lift + glow. */
function CardFrame({
  children,
  featured,
  className,
}: {
  children: React.ReactNode;
  featured?: boolean;
  className?: string;
}) {
  return (
    <article
      className={`group relative h-full overflow-hidden rounded-[24px] border transition-all duration-400 motion-safe:hover:-translate-y-1 ${
        featured
          ? "border-accent/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.09),0_0_90px_-24px_rgba(0,94,255,0.6)] hover:border-accent/60 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.09),0_24px_100px_-24px_rgba(0,94,255,0.7)]"
          : "border-accent/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_0_55px_-24px_rgba(0,94,255,0.4)] hover:border-accent/45 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_20px_70px_-24px_rgba(0,94,255,0.55)]"
      } ${className ?? ""}`}
      style={{ background: "linear-gradient(160deg, #0d1a30 0%, #071021 55%, #050b16 100%)" }}
    >
      {/* luminous corner wash */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -left-28 -top-28 h-80 w-80 rounded-full blur-[90px] transition-opacity duration-500 ${
          featured ? "bg-accent/[0.2]" : "bg-accent/[0.13]"
        } opacity-90 group-hover:opacity-100`}
      />
      {children}
    </article>
  );
}

/* ---------------- decorative graphics ---------------- */

/** Descending cloud-waste line in a tall 340x520 space (matches its region, no distortion). */
function CostReductionChart() {
  const reduce = useReducedMotion();
  const line = "M24 56 L104 148 L96 134 L180 248 L172 234 L252 352 L244 338 L312 452";
  return (
    <div className="relative h-full min-h-[300px] w-full" aria-hidden="true">
      <svg viewBox="0 0 340 520" preserveAspectRatio="none" className="h-full w-full">
        <defs>
          <linearGradient id="cost-chart-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(0,94,255,0.32)" />
            <stop offset="85%" stopColor="rgba(0,94,255,0)" />
          </linearGradient>
        </defs>
        {[100, 186, 272].map((x) => (
          <line key={x} x1={x} y1="30" x2={x} y2="500" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="2 7" />
        ))}
        <motion.path
          d={`${line} L312 520 L24 520 Z`}
          fill="url(#cost-chart-area)"
          initial={reduce ? { opacity: 1 } : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 1.1 }}
        />
        <motion.path
          d={line}
          fill="none"
          stroke="#4d9aff"
          strokeWidth="3"
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
      {/* glowing point on the P4 vertex (172,234 of 340x520) */}
      <motion.span
        className="absolute"
        style={{ left: "50.6%", top: "45%" }}
        initial={reduce ? { opacity: 1 } : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 1.2 }}
      >
        {!reduce && (
          <motion.span
            className="absolute h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#5aa2ff]/70"
            animate={{ scale: [1, 1.9], opacity: [0.8, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
          />
        )}
        <span className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#5aa2ff]/60 p-2" />
        <span className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#9cc6ff] shadow-[0_0_12px_rgba(90,162,255,1)]" />
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

/**
 * Atmospheric speedometer: gradient sweep arc (dim start, bright tip dot at
 * ~92%), inner dial ring with radial ticks, faint needle, rolling wave
 * baseline, and a dot-grid backdrop. Geometry: center (130,120), r=78,
 * sweep 195° to -55° (250°), arc length 340.3.
 */
function PerformanceGauge() {
  const reduce = useReducedMotion();
  const LEN = 340.3;
  const REST = LEN * 0.08; // 92% filled
  const ARC = "M 54.7 140.2 A 78 78 0 1 1 174.7 183.9";
  const polar = (r: number, deg: number) => ({
    x: 130 + r * Math.cos((deg * Math.PI) / 180),
    y: 120 - r * Math.sin((deg * Math.PI) / 180),
  });
  const ticks = Array.from({ length: 14 }, (_, i) => 195 - i * 19.2).map((deg) => ({
    a: polar(58, deg),
    b: polar(66, deg),
  }));
  return (
    <svg viewBox="0 0 260 200" className="h-auto w-[250px] lg:w-[285px]" aria-hidden="true">
      <defs>
        <linearGradient id="perf-gauge-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#16418f" />
          <stop offset="55%" stopColor="#2f7fe0" />
          <stop offset="100%" stopColor="#5aa2ff" />
        </linearGradient>
        <radialGradient id="perf-gauge-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="rgba(0,94,255,0.16)" />
          <stop offset="100%" stopColor="rgba(0,94,255,0)" />
        </radialGradient>
      </defs>

      {/* ambient glow + dot-grid backdrop */}
      <circle cx="130" cy="118" r="105" fill="url(#perf-gauge-glow)" />
      {Array.from({ length: 5 }).flatMap((_, gx) =>
        Array.from({ length: 7 }).map((_, gy) => (
          <circle key={`${gx}-${gy}`} cx={196 + gx * 14} cy={52 + gy * 14} r="1.3" fill="#4d9aff" opacity="0.09" />
        )),
      )}

      {/* rolling wave baseline */}
      <path d="M0 176 C 42 164, 74 156, 112 170 S 192 188, 260 168" fill="none" stroke="rgba(255,255,255,0.09)" strokeWidth="1.2" />
      <path d="M28 188 C 70 180, 120 176, 168 182 S 232 188, 260 184" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />

      {/* inner dial ring + ticks */}
      <path d="M 88.4 149.6 A 52 52 0 1 1 158.8 162.6" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
      {ticks.map((t, i) => (
        <line key={i} x1={t.a.x} y1={t.a.y} x2={t.b.x} y2={t.b.y} stroke="rgba(255,255,255,0.11)" strokeWidth="1.4" />
      ))}

      {/* needle */}
      <g opacity="0.55">
        <line x1="130" y1="120" x2={polar(42, 150).x} y2={polar(42, 150).y} stroke="#35619f" strokeWidth="3" strokeLinecap="round" />
        <circle cx="130" cy="120" r="4.5" fill="#101f38" stroke="rgba(255,255,255,0.14)" strokeWidth="1" />
      </g>

      {/* faint unfilled tail */}
      <path d={ARC} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" strokeLinecap="round" />

      {/* main sweep */}
      <motion.path
        d={ARC}
        fill="none"
        stroke="url(#perf-gauge-grad)"
        strokeWidth="9"
        strokeLinecap="round"
        strokeDasharray={LEN}
        style={{ filter: "drop-shadow(0 0 12px rgba(0,94,255,0.55))" }}
        initial={reduce ? { strokeDashoffset: REST } : { strokeDashoffset: LEN }}
        whileInView={{ strokeDashoffset: REST }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, delay: 0.35, ease: EASE }}
      />

      {/* glowing tip dot at the 92% point (-35°) */}
      <motion.g
        initial={reduce ? { opacity: 1 } : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 1.7 }}
      >
        <circle cx="193.9" cy="164.7" r="9" fill="rgba(90,162,255,0.25)" />
        <circle cx="193.9" cy="164.7" r="5" fill="#9cc6ff" style={{ filter: "drop-shadow(0 0 10px rgba(90,162,255,1))" }} />
      </motion.g>
    </svg>
  );
}

/** Faint dot grid in the productivity panel's corner. */
function DotGridPattern() {
  return (
    <svg viewBox="0 0 120 96" className="pointer-events-none absolute right-6 top-6 h-24 w-[120px]" aria-hidden="true">
      {Array.from({ length: 5 }).flatMap((_, row) =>
        Array.from({ length: 6 }).map((_, col) => (
          <circle
            key={`${row}-${col}`}
            cx={10 + col * 20}
            cy={8 + row * 20}
            r="1.6"
            fill="#4d9aff"
            opacity={0.08 + 0.04 * ((row + col) % 3)}
          />
        )),
      )}
    </svg>
  );
}

/** Concentric dotted quarter-arcs clipped to the sustainability panel's right edge. */
function EcoArcPattern() {
  const dots: { x: number; y: number; o: number }[] = [];
  const CX = 252;
  const CY = 210;
  [72, 108, 144, 180].forEach((radius, ring) => {
    for (let a = 118; a <= 242; a += 8) {
      const rad = (a * Math.PI) / 180;
      const x = CX + radius * Math.cos(rad);
      const y = CY + radius * Math.sin(rad);
      if (x > 4 && y > 8 && y < 412) dots.push({ x, y, o: 0.34 - ring * 0.055 });
    }
  });
  return (
    <div className="pointer-events-none absolute inset-y-0 right-0 w-[42%] overflow-hidden" aria-hidden="true">
      <svg viewBox="0 0 220 420" className="absolute right-0 top-1/2 h-[105%] w-auto -translate-y-1/2" preserveAspectRatio="xMaxYMid meet">
        {dots.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r="1.8" fill="#4d9aff" opacity={d.o} />
        ))}
      </svg>
    </div>
  );
}

/* ---------------- panels ---------------- */

function FeaturedBenefitCard({ benefit }: { benefit: Benefit }) {
  return (
    <Reveal className="h-full">
      <CardFrame featured>
        <div className="grid h-full gap-8 p-8 sm:p-10 lg:grid-cols-[1fr_0.82fr]">
          <div>
            <BenefitContent benefit={benefit} big delay={0.2} />
          </div>
          <div className="hidden lg:block">
            <CostReductionChart />
          </div>
        </div>
      </CardFrame>
    </Reveal>
  );
}

function BenefitCard({
  benefit,
  visual,
  decoration,
  delay = 0,
}: {
  benefit: Benefit;
  visual?: React.ReactNode;
  decoration?: React.ReactNode;
  delay?: number;
}) {
  return (
    <Reveal delay={delay} className="h-full">
      <CardFrame>
        {decoration}
        <div className="relative flex items-center gap-8 p-8">
          <div className="min-w-0 flex-1">
            <BenefitContent benefit={benefit} delay={delay + 0.3} />
          </div>
          {visual && <div className="hidden shrink-0 self-center md:block">{visual}</div>}
        </div>
      </CardFrame>
    </Reveal>
  );
}

/* ---------------- section ---------------- */

export function Benefits() {
  const [cost, perf, prod, sust] = BENEFITS;
  return (
    <section id="benefits" className="relative scroll-mt-24 py-24 sm:py-32" aria-labelledby="benefits-heading">
      {/* ambient glow behind the featured area */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
        <div className="glow-orb left-[8%] top-[30%] h-[560px] w-[720px] opacity-30" />
      </div>

      <div className="container-x">
        <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <Reveal>
            <p className="kicker">Benefits</p>
            <h2
              id="benefits-heading"
              className="mt-4 text-balance text-4xl font-semibold tracking-[-0.03em] text-ink sm:text-5xl"
            >
              Results you can put a <span className="accent-word">number</span> on
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="max-w-md border-l-2 border-accent/60 pl-6 text-pretty text-lg leading-relaxed text-fog">
              Six agents, six layers, one relentless objective: maximum efficiency from the
              infrastructure you already own.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 lg:mt-14 lg:grid-cols-2">
          <FeaturedBenefitCard benefit={cost} />
          <div className="grid content-stretch gap-4">
            <BenefitCard benefit={perf} visual={<PerformanceGauge />} delay={0.08} />
            <div className="grid gap-4 sm:grid-cols-2">
              <BenefitCard benefit={prod} decoration={<DotGridPattern />} delay={0.14} />
              <BenefitCard benefit={sust} decoration={<EcoArcPattern />} delay={0.2} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
