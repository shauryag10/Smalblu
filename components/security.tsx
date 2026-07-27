"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/reveal";
import { LogoMark } from "@/components/logo";

const EASE = [0.22, 0.61, 0.36, 1] as const;

/**
 * Concentric arc diagram: three guarantees as gradient bands fanning out
 * from the smalBlu mark. Callouts connect to the bands with leader lines.
 * Geometry lives in a 1000x620 viewBox, center (500,560).
 */
const ARCS = [
  {
    num: "01",
    title: "Security Guardrails",
    desc: "Human approval on every change, a full audit trail, and one-click rollback.",
    r: 150,
    end: 0, // degrees
    length: 471.3,
    from: "#005eff",
    to: "#9cc6ff",
    delay: 0.1,
  },
  {
    num: "02",
    title: "Zero Data Movement",
    desc: "Deployed inside your environment. Workload data never leaves your perimeter.",
    r: 220,
    end: 25,
    length: 595.2,
    from: "#0050d6",
    to: "#5aa2ff",
    delay: 0.25,
  },
  {
    num: "03",
    title: "Metadata-Only Access",
    desc: "Agents read metrics and configuration metadata, never your workload data.",
    r: 290,
    end: 50,
    length: 658.1,
    from: "#003967",
    to: "#4096db",
    delay: 0.4,
  },
];

const CX = 500;
const CY = 560;
const rad = (deg: number) => (deg * Math.PI) / 180;
const pt = (r: number, deg: number) => ({
  x: CX + r * Math.cos(rad(deg)),
  y: CY - r * Math.sin(rad(deg)),
});

function arcPath(r: number, endDeg: number) {
  const start = pt(r, 180);
  const end = pt(r, endDeg);
  return `M ${start.x.toFixed(1)} ${start.y.toFixed(1)} A ${r} ${r} 0 0 1 ${end.x.toFixed(1)} ${end.y.toFixed(1)}`;
}

// leader lines: [x1, y1, x2, y2]
const LEADERS = [
  { line: [677, 560, 818, 560], dot: [818, 560] }, // 01: horizontal, from inner arc end
  { line: [708, 462, 748, 345], dot: [708, 462] }, // 02: diagonal, from middle arc end cap into the clear pocket
  { line: [377, 288, 377, 148], dot: [377, 288] }, // 03: vertical, from outer arc upper-left
];

const PILLS = ["End-to-End Encrypted", "Role-Based Access", "Human Approval"];

function ArcDiagram() {
  const reduce = useReducedMotion();
  // Observe the HTML wrapper, not the SVG paths: IntersectionObserver on SVG
  // child elements is unreliable on mobile WebKit, which left the arcs stuck
  // in their hidden pre-animation state on phones.
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });
  const show = reduce || inView;
  return (
    <div ref={ref} className="relative mx-auto w-full max-w-[980px]">
      <svg
        viewBox="0 0 1000 620"
        className="h-auto w-full"
        role="img"
        aria-label="Three security guarantees fanning out from the SmalBlu mark: security guardrails, zero data movement, and metadata-only access"
      >
        <defs>
          {ARCS.map((a) => {
            const s = pt(a.r, 180);
            const e = pt(a.r, a.end);
            return (
              <linearGradient
                key={a.num}
                id={`arc-${a.num}`}
                gradientUnits="userSpaceOnUse"
                x1={s.x}
                y1={s.y}
                x2={e.x}
                y2={e.y}
              >
                <stop offset="0%" stopColor={a.from} />
                <stop offset="100%" stopColor={a.to} />
              </linearGradient>
            );
          })}
        </defs>

        {/* baseline horizon */}
        <line x1="130" y1="560" x2="870" y2="560" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

        {/* gradient bands */}
        {ARCS.map((a) => (
          <motion.path
            key={a.num}
            d={arcPath(a.r, a.end)}
            fill="none"
            stroke={`url(#arc-${a.num})`}
            strokeWidth="54"
            style={{ filter: "drop-shadow(0 0 22px rgba(0,94,255,0.3))" }}
            strokeDasharray={a.length}
            initial={false}
            animate={{ strokeDashoffset: show ? 0 : a.length }}
            transition={{ duration: 1.3, delay: a.delay, ease: EASE }}
          />
        ))}

        {/* leader lines + dots */}
        {LEADERS.map((l, i) => (
          <motion.g
            key={i}
            initial={false}
            animate={{ opacity: show ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 1 + i * 0.15 }}
          >
            <line
              x1={l.line[0]}
              y1={l.line[1]}
              x2={l.line[2]}
              y2={l.line[3]}
              stroke="rgba(255,255,255,0.35)"
              strokeWidth="1"
            />
            <circle cx={l.dot[0]} cy={l.dot[1]} r="3.2" fill="#04080f" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" />
          </motion.g>
        ))}
      </svg>

      {/* center mark */}
      <div
        className="absolute flex h-[72px] w-[72px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-accent/45 bg-[#070d18] shadow-[0_0_36px_-6px_rgba(0,94,255,0.7)]"
        style={{ left: "50%", top: `${(CY / 620) * 100}%` }}
        aria-hidden="true"
      >
        <LogoMark className="h-6 w-auto text-accent" />
      </div>

      {/* desktop callouts */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden="true">
        {/* 01: right of the horizontal leader */}
        <div className="absolute w-[168px] -translate-y-1/2" style={{ left: "83.5%", top: "90.3%" }}>
          <p className="font-mono text-lg font-semibold text-accent-3">01</p>
          <h3 className="mt-1 text-[15px] font-semibold leading-snug text-ink">{ARCS[0].title}</h3>
          <p className="mt-1 text-[13px] leading-relaxed text-fog">{ARCS[0].desc}</p>
        </div>
        {/* 02: right of the outer arc's end, above its diagonal leader */}
        <div className="absolute w-[220px] -translate-y-full pb-2" style={{ left: "74%", top: "53%" }}>
          <p className="font-mono text-lg font-semibold text-accent-3">02</p>
          <h3 className="mt-1 text-[15px] font-semibold leading-snug text-ink">{ARCS[1].title}</h3>
          <p className="mt-1 text-[13px] leading-relaxed text-fog">{ARCS[1].desc}</p>
        </div>
        {/* 03: above its vertical leader */}
        <div className="absolute w-[230px] -translate-x-1/2 -translate-y-full pb-2" style={{ left: "37.7%", top: "23.9%" }}>
          <p className="font-mono text-lg font-semibold text-accent-3">03</p>
          <h3 className="mt-1 text-[15px] font-semibold leading-snug text-ink">{ARCS[2].title}</h3>
          <p className="mt-1 text-[13px] leading-relaxed text-fog">{ARCS[2].desc}</p>
        </div>
      </div>
    </div>
  );
}

export function Security() {
  return (
    <section
      id="security"
      className="relative scroll-mt-24 border-y border-line bg-abyss/60 py-16 sm:py-24 lg:py-32"
      aria-labelledby="security-heading"
    >
      <div className="container-x">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="kicker">Security</p>
          <h2
            id="security-heading"
            className="mt-4 text-balance text-4xl font-semibold tracking-[-0.03em] text-ink sm:text-5xl"
          >
            Enterprise-Grade <span className="accent-word">Security</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-fog">
            Three guarantees built into every deployment.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-14 lg:mt-16">
          <ArcDiagram />
        </Reveal>

        {/* mobile callouts */}
        <div className="mx-auto mt-10 grid max-w-xl gap-6 lg:hidden">
          {ARCS.map((a) => (
            <Reveal key={a.num}>
              <div className="flex gap-4">
                <p className="font-mono text-lg font-semibold text-accent-3">{a.num}</p>
                <div>
                  <h3 className="text-base font-semibold tracking-tight text-ink">{a.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-fog">{a.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* trust strip */}
        <Reveal delay={0.2} className="mt-14">
          <div className="overflow-hidden rounded-2xl border border-line">
            <div className="grid gap-px bg-white/[0.07] sm:grid-cols-3">
              {PILLS.map((pill) => (
                <div key={pill} className="flex items-center justify-center gap-3 bg-abyss px-6 py-4">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full border border-accent/40 bg-accent/10">
                    <svg viewBox="0 0 12 12" className="h-3 w-3 text-accent-2" fill="none" aria-hidden="true">
                      <path d="m2.5 6.2 2.4 2.4 4.6-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="text-sm font-medium text-fog">{pill}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
