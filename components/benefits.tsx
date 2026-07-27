"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Counter } from "@/components/counter";
import { Reveal } from "@/components/reveal";

const EASE = [0.22, 0.61, 0.36, 1] as const;

/* ---------------- data ---------------- */

type Benefit = {
  key: "cost" | "perf" | "prod" | "sust";
  category: string;
  value: number;
  label: string;
  desc: string;
};

const BENEFITS: Benefit[] = [
  {
    key: "cost",
    category: "Cost efficiency",
    value: 40,
    label: "Lower cloud spend",
    desc: "Continuous cross-layer optimization eliminates waste the moment an agent finds it.",
  },
  {
    key: "perf",
    category: "Performance",
    value: 30,
    label: "Faster systems",
    desc: "Relentless tuning from query plans to cache layers keeps performance climbing.",
  },
  {
    key: "prod",
    category: "Productivity",
    value: 70,
    label: "Engineering time saved",
    desc: "Routine tuning goes to the agents. Your engineers go back to building product.",
  },
  {
    key: "sust",
    category: "Sustainability",
    value: 35,
    label: "Smaller carbon footprint",
    desc: "Every optimization removes wasted energy, with ESG reporting to prove it.",
  },
];

/* ---------------- primitives ---------------- */

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
function BenefitContent({
  benefit,
  index,
  big,
  delay,
}: {
  benefit: Benefit;
  index: number;
  big?: boolean;
  delay: number;
}) {
  return (
    <>
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-sm font-semibold text-accent-2 tabular">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span aria-hidden="true" className="h-3.5 w-px self-center bg-white/20" />
        <p className="text-[15px] font-semibold tracking-tight text-fog">{benefit.category}</p>
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
  // stepped-terrace descent: near-flat shelves alternating with smooth drops,
  // strictly monotonic, entering at the left edge and exiting mid-right.
  // Drawn in a fixed 4:5 box (320x400).
  const line =
    "M0 36 C 16 40, 30 40, 44 44 C 58 48, 66 68, 78 86 C 88 96, 100 93, 112 94 " +
    "C 126 96, 134 116, 146 140 C 158 148, 162 146, 172 148 C 184 150, 192 168, 204 196 " +
    "C 214 202, 222 202, 232 204 C 244 206, 252 226, 262 244 C 272 250, 280 252, 288 256 " +
    "C 298 260, 310 274, 320 290";
  return (
    <div className="relative w-full lg:aspect-[4/5] lg:max-h-[450px]" aria-hidden="true">
      <svg viewBox="0 0 320 400" preserveAspectRatio="none" className="h-full min-h-[280px] w-full lg:min-h-0">
        <defs>
          <linearGradient id="cost-chart-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(0,94,255,0.16)" />
            <stop offset="55%" stopColor="rgba(0,94,255,0)" />
          </linearGradient>
        </defs>
        {/* dotted gridline columns */}
        {[40, 80, 120, 160, 200, 240, 280].map((x) => (
          <line
            key={x}
            x1={x}
            y1="30"
            x2={x}
            y2="372"
            stroke="rgba(120,170,255,0.12)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="1.5 7"
          />
        ))}
        <motion.path
          d={`${line} L320 400 L0 400 Z`}
          fill="url(#cost-chart-area)"
          initial={reduce ? { opacity: 1 } : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 1.1 }}
        />
        {/* halo under-stroke */}
        <motion.path
          d={line}
          fill="none"
          stroke="rgba(90,162,255,0.22)"
          strokeWidth="9"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.7, delay: 0.3, ease: "easeInOut" }}
        />
        <motion.path
          d={line}
          fill="none"
          stroke="#5aa2ff"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          style={{ filter: "drop-shadow(0 0 10px rgba(0,94,255,0.7))" }}
          initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.7, delay: 0.3, ease: "easeInOut" }}
        />
      </svg>
      {/* glowing point mid-way down the third drop (188,162) */}
      <motion.span
        className="absolute"
        style={{ left: "58.75%", top: "40.6%" }}
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

/**
 * Dotted Earth bleeding off the panel's right edge: orthographic projection
 * centered on the Atlantic, faint ocean dots forming the sphere and brighter
 * dots where samples fall inside rough continent outlines.
 */
const CONTINENTS: [number, number][][] = [
  // North America
  [[70, -165], [72, -120], [68, -90], [60, -65], [48, -52], [25, -80], [15, -95], [20, -105], [30, -115], [40, -125], [55, -165]],
  // Greenland
  [[83, -60], [76, -20], [68, -30], [70, -55]],
  // South America
  [[10, -75], [5, -50], [-5, -35], [-25, -40], [-40, -62], [-55, -70], [-20, -70], [0, -80]],
  // Europe
  [[70, -10], [70, 40], [55, 45], [45, 30], [36, -5], [43, -10], [58, -5]],
  // Africa
  [[35, -8], [32, 32], [12, 44], [-5, 40], [-35, 20], [-33, 17], [-5, 10], [5, -10], [15, -17]],
  // Asia
  [[75, 60], [70, 120], [65, 150], [60, 160], [50, 135], [35, 120], [20, 105], [8, 100], [15, 75], [25, 60], [45, 45], [55, 45], [65, 45]],
  // Australia
  [[-12, 130], [-15, 145], [-30, 153], [-37, 145], [-33, 132], [-25, 115], [-18, 122]],
];

function inPolygon(lat: number, lon: number, poly: [number, number][]) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [yi, xi] = poly[i];
    const [yj, xj] = poly[j];
    if (yi > lat !== yj > lat && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

function EarthDotPattern() {
  const D = Math.PI / 180;
  const lat0 = 10 * D;
  const lon0 = -25 * D;
  const R = 150;
  const CX = 172;
  const CY = 152;
  const dots: { x: number; y: number; land: boolean; fade: number }[] = [];
  for (let lat = -88; lat <= 88; lat += 4) {
    for (let lon = -180; lon < 180; lon += 4) {
      const p = lat * D;
      const l = lon * D;
      const cosc = Math.sin(lat0) * Math.sin(p) + Math.cos(lat0) * Math.cos(p) * Math.cos(l - lon0);
      if (cosc < 0.03) continue; // back hemisphere
      const x = CX + R * Math.cos(p) * Math.sin(l - lon0);
      const y = CY - R * (Math.cos(lat0) * Math.sin(p) - Math.sin(lat0) * Math.cos(p) * Math.cos(l - lon0));
      if (x > 186 || y < -6 || y > 326) continue; // outside visible window
      // round everything we render: server and client trig can differ by an
      // ulp, and full-precision floats would fail hydration
      dots.push({
        x: +x.toFixed(1),
        y: +y.toFixed(1),
        land: CONTINENTS.some((c) => inPolygon(lat, lon, c)),
        fade: +cosc.toFixed(2),
      });
    }
  }
  return (
    <div className="pointer-events-none absolute inset-y-0 right-0 w-[56%] overflow-hidden" aria-hidden="true">
      <svg viewBox="0 0 180 320" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
        {dots.map((d, i) =>
          d.land ? (
            <circle key={i} cx={d.x} cy={d.y} r="1.7" fill="#6db0ff" opacity={+(0.22 + 0.5 * d.fade).toFixed(2)} />
          ) : (
            <circle key={i} cx={d.x} cy={d.y} r="1.1" fill="#4d9aff" opacity={+(0.04 + 0.07 * d.fade).toFixed(2)} />
          ),
        )}
      </svg>
    </div>
  );
}

/* ---------------- panels ---------------- */

function FeaturedBenefitCard({ benefit, index }: { benefit: Benefit; index: number }) {
  return (
    <Reveal className="h-full">
      <CardFrame featured>
        <div className="grid h-full gap-8 p-8 sm:p-10 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <BenefitContent benefit={benefit} index={index} big delay={0.2} />
          </div>
          <div className="hidden lg:flex lg:items-center">
            <CostReductionChart />
          </div>
        </div>
      </CardFrame>
    </Reveal>
  );
}

function BenefitCard({
  benefit,
  index,
  visual,
  decoration,
  delay = 0,
}: {
  benefit: Benefit;
  index: number;
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
            <BenefitContent benefit={benefit} index={index} delay={delay + 0.3} />
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
    <section id="benefits" className="relative scroll-mt-24 py-16 sm:py-24 lg:py-32" aria-labelledby="benefits-heading">
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
          <FeaturedBenefitCard benefit={cost} index={0} />
          <div className="grid content-stretch gap-4">
            <BenefitCard benefit={perf} index={1} visual={<PerformanceGauge />} delay={0.08} />
            <div className="grid gap-4 sm:grid-cols-2">
              <BenefitCard benefit={prod} index={2} decoration={<DotGridPattern />} delay={0.14} />
              <BenefitCard benefit={sust} index={3} decoration={<EarthDotPattern />} delay={0.2} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
