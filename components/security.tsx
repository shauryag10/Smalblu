"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/reveal";
import { LogoMark } from "@/components/logo";

const stroke = { strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" } as const;

const GUARANTEES = [
  {
    title: "Security Guardrails",
    desc: "Human-in-the-loop approval on every change, a full audit trail of every action, and one-click rollback if you ever want it undone.",
    icon: (
      <svg viewBox="0 0 28 28" fill="none" className="h-6 w-6" aria-hidden="true">
        <path d="M14 3 5 6.5v6.2c0 5.7 3.8 9.9 9 11.8 5.2-1.9 9-6.1 9-11.8V6.5L14 3z" stroke="currentColor" {...stroke} />
        <path d="m10.2 13.9 2.7 2.7 5-5.3" stroke="currentColor" {...stroke} />
      </svg>
    ),
  },
  {
    title: "Zero Data Movement",
    desc: "SmalBlu deploys inside your environment on open-source models. Your workload data never crosses your network perimeter. Nothing leaves, ever.",
    icon: (
      <svg viewBox="0 0 28 28" fill="none" className="h-6 w-6" aria-hidden="true">
        <circle cx="14" cy="14" r="10.5" stroke="currentColor" strokeDasharray="3.2 3.6" {...stroke} />
        <rect x="10.5" y="12" width="7" height="6" rx="1.5" stroke="currentColor" {...stroke} />
        <path d="M11.8 12v-1.8a2.2 2.2 0 0 1 4.4 0V12" stroke="currentColor" {...stroke} />
      </svg>
    ),
  },
  {
    title: "Metadata-Only Access",
    desc: "Agents read performance metrics and configuration metadata, never your actual workload data. Aligned with CISO security frameworks and vendor compliance matrices.",
    icon: (
      <svg viewBox="0 0 28 28" fill="none" className="h-6 w-6" aria-hidden="true">
        <path d="M16.5 3.5H8a2 2 0 0 0-2 2v17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-5.5-5.5z" stroke="currentColor" {...stroke} />
        <path d="M16.5 3.5V9H22" stroke="currentColor" {...stroke} />
        <path d="M9.5 14h4M9.5 17.5h6.5M9.5 21h5" stroke="currentColor" {...stroke} />
        <circle cx="17.8" cy="14.2" r="0.9" fill="currentColor" />
      </svg>
    ),
  },
];

const PILLS = ["End-to-End Encrypted", "Role-Based Access", "Human Approval"];

/**
 * Perimeter diagram: workload data locked inside the network perimeter,
 * agents outside receiving only metadata across the boundary.
 */
function PerimeterViz() {
  const reduce = useReducedMotion();
  // agent chip centers in the 440x440 coordinate space
  const agents = [
    { x: 415, y: 45, boundary: { x: 364, y: 90.7 } },
    { x: 28, y: 368, boundary: { x: 66.6, y: 338.1 } },
  ];
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[440px]" aria-hidden="true">
      {/* perimeter rings */}
      <div className="absolute inset-[6%] rounded-full border border-dashed border-white/20" />
      <div className="absolute inset-[24%] rounded-full border border-white/[0.07]" />
      <div className="absolute inset-[40%] rounded-full border border-white/[0.07]" />

      {/* perimeter label */}
      <span className="absolute left-1/2 top-[6%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-abyss px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
        network perimeter
      </span>

      {/* metadata flow lines */}
      <svg viewBox="0 0 440 440" className="absolute inset-0 h-full w-full">
        {agents.map((a, i) => (
          <motion.line
            key={i}
            x1={a.boundary.x}
            y1={a.boundary.y}
            x2={a.x}
            y2={a.y}
            stroke="rgba(64,150,219,0.55)"
            strokeWidth="1.4"
            strokeDasharray="4 6"
            initial={false}
            animate={reduce ? {} : { strokeDashoffset: [0, -40] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
          />
        ))}
        {/* boundary crossing markers */}
        {agents.map((a, i) => (
          <circle key={`m${i}`} cx={a.boundary.x} cy={a.boundary.y} r="3.4" fill="#04080f" stroke="#4096db" strokeWidth="1.4" />
        ))}
      </svg>

      {/* agent chips outside the perimeter */}
      {agents.map((a, i) => (
        <span
          key={i}
          className="absolute flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl border border-accent/40 bg-[#070d18] text-accent shadow-[0_0_20px_-4px_rgba(0,94,255,0.55)]"
          style={{ left: `${(a.x / 440) * 100}%`, top: `${(a.y / 440) * 100}%` }}
        >
          <LogoMark className="h-4 w-auto" />
        </span>
      ))}

      {/* metadata tag on the upper flow */}
      <span className="absolute left-[84%] top-[20%] -translate-x-1/2 rounded-md border border-accent/30 bg-accent/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-accent-3">
        metadata only
      </span>

      {/* center: locked workload data */}
      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
        {!reduce && (
          <motion.span
            className="absolute top-[42px] h-[84px] w-[84px] -translate-y-1/2 rounded-2xl border border-accent/30"
            animate={{ scale: [1, 1.35], opacity: [0.55, 0] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut" }}
          />
        )}
        <span className="flex h-[84px] w-[84px] items-center justify-center rounded-2xl border border-white/15 bg-gradient-to-b from-[#0b1424] to-[#060b14] shadow-[0_20px_50px_-16px_rgba(0,0,0,0.8)]">
          <svg viewBox="0 0 28 28" fill="none" className="h-8 w-8 text-ink" aria-hidden="true">
            <rect x="7" y="12.5" width="14" height="10.5" rx="2.5" stroke="currentColor" {...stroke} />
            <path d="M9.8 12.5V9.3a4.2 4.2 0 0 1 8.4 0v3.2" stroke="currentColor" {...stroke} />
            <circle cx="14" cy="17.8" r="1.6" fill="currentColor" />
          </svg>
        </span>
        <p className="mt-3 text-[13px] font-semibold text-ink">Your workload data</p>
        <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-faint">never leaves</p>
      </div>
    </div>
  );
}

export function Security() {
  return (
    <section
      id="security"
      className="relative scroll-mt-24 border-y border-line bg-abyss/60 py-24 sm:py-32"
      aria-labelledby="security-heading"
    >
      <div className="container-x">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          {/* left: header + guarantees */}
          <div>
            <Reveal>
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

            <div className="mt-10">
              {GUARANTEES.map((g, i) => (
                <Reveal key={g.title} delay={0.08 + i * 0.08}>
                  <article className={`flex gap-5 py-6 ${i > 0 ? "border-t border-line" : ""}`}>
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-[#0050d6] shadow-[0_10px_30px_-10px_rgba(240,247,252,0.4)]">
                      {g.icon}
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold tracking-tight text-ink">{g.title}</h3>
                      <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-fog">{g.desc}</p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>

          {/* right: perimeter diagram */}
          <Reveal delay={0.15}>
            <PerimeterViz />
          </Reveal>
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
