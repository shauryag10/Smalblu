"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/reveal";
import { LogoMark } from "@/components/logo";

const EASE = [0.22, 0.61, 0.36, 1] as const;

/* ---------- flagship visual: cross-layer stack ---------- */

function CrossLayerViz() {
  const reduce = useReducedMotion();
  const layers = ["User", "Application", "Compute", "Network", "Database", "Storage"];
  return (
    <div className="relative mx-auto h-[228px] w-full max-w-[400px]" aria-hidden="true">
      {/* beam */}
      <div className="absolute left-1/2 top-1 h-[calc(100%-8px)] w-px -translate-x-1/2 bg-gradient-to-b from-accent/70 via-accent/30 to-accent/70" />
      {/* traveling pulse */}
      {!reduce && (
        <motion.span
          className="absolute left-1/2 z-10 h-2 w-2 -translate-x-1/2 rounded-full bg-[#5aa2ff] shadow-[0_0_12px_3px_rgba(0,94,255,0.65)]"
          animate={{ top: ["2%", "94%"] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }}
        />
      )}
      {layers.map((name, i) => (
        <motion.div
          key={name}
          className={`absolute inset-x-0 flex h-[30px] items-center justify-between rounded-lg border px-3.5 backdrop-blur-[2px] ${
            i === 2
              ? "border-accent/50 bg-accent/[0.14] shadow-[0_0_28px_-6px_rgba(0,94,255,0.55)]"
              : "border-white/[0.09] bg-white/[0.03]"
          }`}
          style={{ top: `${i * 39}px` }}
          initial={reduce ? false : { opacity: 0, x: i % 2 ? 18 : -18 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 + i * 0.07, ease: EASE }}
        >
          <span className={`font-mono text-[10px] tracking-wider ${i === 2 ? "text-accent-3" : "text-faint"}`}>
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className={`text-[11px] font-medium tracking-wide ${i === 2 ? "text-ink" : "text-fog/80"}`}>
            {name}
          </span>
          <span
            className={`h-1 w-1 rounded-full ${i === 2 ? "bg-[#5aa2ff] shadow-[0_0_8px_rgba(0,94,255,0.9)]" : "bg-white/20"}`}
          />
        </motion.div>
      ))}
    </div>
  );
}

/* ---------- flagship visual: agent orbit ---------- */

function AgentOrbitViz() {
  const reduce = useReducedMotion();
  const spin = reduce ? {} : undefined;
  return (
    <div className="relative mx-auto flex h-[228px] w-[228px] items-center justify-center" aria-hidden="true">
      {/* rings */}
      <div className="absolute inset-0 rounded-full border border-white/[0.07]" />
      <div className="absolute inset-[38px] rounded-full border border-white/[0.09]" />
      <div className="absolute inset-[76px] rounded-full border border-accent/20" />

      {/* orbiting agent nodes */}
      <motion.div
        className="absolute inset-0"
        animate={reduce ? spin : { rotate: 360 }}
        transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
      >
        <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#80b9e7] shadow-[0_0_10px_rgba(128,185,231,0.8)]" />
        <span className="absolute bottom-[13%] left-[13%] h-2 w-2 rounded-full bg-[#4096db] shadow-[0_0_10px_rgba(64,150,219,0.8)]" />
      </motion.div>
      <motion.div
        className="absolute inset-[38px]"
        animate={reduce ? spin : { rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        <span className="absolute right-[6%] top-[20%] h-2.5 w-2.5 rounded-full bg-[#5aa2ff] shadow-[0_0_10px_rgba(90,162,255,0.85)]" />
        <span className="absolute bottom-[6%] left-[26%] h-2 w-2 rounded-full bg-[#80b9e7] shadow-[0_0_10px_rgba(128,185,231,0.8)]" />
      </motion.div>

      {/* pulse */}
      {!reduce && (
        <motion.div
          className="absolute inset-[76px] rounded-full border border-accent/40"
          animate={{ scale: [1, 1.55], opacity: [0.7, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeOut" }}
        />
      )}

      {/* core */}
      <div className="relative flex h-[76px] w-[76px] items-center justify-center rounded-full border border-accent/40 bg-gradient-to-b from-accent/25 to-accent/5 shadow-[0_0_40px_-6px_rgba(0,94,255,0.7)]">
        <LogoMark className="h-7 w-auto text-[#9cc6ff]" />
      </div>
    </div>
  );
}

/* ---------- small visuals ---------- */

function NlpViz() {
  const reduce = useReducedMotion();
  return (
    <div className="flex w-full flex-col gap-3" aria-hidden="true">
      <div className="flex items-center justify-between gap-3 rounded-full border border-white/10 bg-white/[0.04] py-2.5 pl-4 pr-2">
        <span className="truncate text-[13px] text-fog">Why did storage spend jump last week?</span>
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-white shadow-[0_0_16px_-2px_rgba(0,94,255,0.8)]">
          <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5">
            <path d="M8 12V4m0 0L4.5 7.5M8 4l3.5 3.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
      <div className="flex items-center gap-2 pl-4">
        <span className="font-mono text-[10px] uppercase tracking-widest text-faint">storage agent</span>
        <span className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="h-1 w-1 rounded-full bg-accent-2"
              animate={reduce ? undefined : { opacity: [0.25, 1, 0.25] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.18 }}
            />
          ))}
        </span>
      </div>
    </div>
  );
}

function AnomalyViz() {
  const reduce = useReducedMotion();
  return (
    <div className="relative w-full" aria-hidden="true">
      <svg viewBox="0 0 240 84" className="h-auto w-full">
        <line x1="0" y1="26" x2="240" y2="26" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="3 4" />
        <motion.path
          d="M0 62 C 24 58, 40 60, 58 57 C 76 54, 92 58, 108 55 C 118 53, 126 40, 132 22 C 138 40, 148 56, 164 58 C 186 61, 212 56, 240 58"
          fill="none"
          stroke="#4096db"
          strokeWidth="1.8"
          strokeLinecap="round"
          initial={reduce ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeInOut", delay: 0.15 }}
        />
        <circle cx="132" cy="22" r="3.5" fill="#5aa2ff" />
      </svg>
      {!reduce && (
        <motion.span
          className="absolute rounded-full border border-accent/60"
          style={{ left: "52.4%", top: "19%", width: 22, height: 22, transform: "translate(-50%, -50%)" }}
          animate={{ scale: [0.6, 1.6], opacity: [0.8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
        />
      )}
      <span className="absolute right-0 top-0 rounded-md border border-accent/30 bg-accent/10 px-2 py-0.5 font-mono text-[10px] text-accent-3">
        flagged
      </span>
    </div>
  );
}

function EcosystemViz() {
  const reduce = useReducedMotion();
  const teams = ["DevOps", "FinOps", "CTOs & VPs", "Sustainability"];
  return (
    <div className="grid w-full grid-cols-2 gap-1.5" aria-hidden="true">
      {teams.map((team, i) => (
        <motion.span
          key={team}
          className={`flex items-center justify-between gap-2 rounded-lg border px-2.5 py-2 ${
            i === 1
              ? "border-accent/45 bg-accent/[0.1] shadow-[0_0_16px_-4px_rgba(0,94,255,0.5)]"
              : "border-white/10 bg-white/[0.04]"
          }`}
          initial={reduce ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.12 + i * 0.08, ease: EASE }}
        >
          <span className={`truncate text-[11px] font-medium ${i === 1 ? "text-ink" : "text-fog"}`}>{team}</span>
          <svg viewBox="0 0 14 14" fill="none" className={`h-3 w-3 shrink-0 ${i === 1 ? "text-accent-3" : "text-faint"}`}>
            <path d="m2 9.5 3.2-3.4 2.4 2 4.4-4.6m0 0v3.2m0-3.2H8.8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.span>
      ))}
    </div>
  );
}

function EsgViz() {
  const reduce = useReducedMotion();
  const rows = ["CO₂ avoided", "Energy per query", "Audit-ready export"];
  return (
    <div className="w-full" aria-hidden="true">
      {rows.map((label, i) => (
        <motion.div
          key={label}
          className="flex items-center gap-2.5 border-t border-white/[0.07] py-2.5 first:border-t-0"
          initial={reduce ? false : { opacity: 0, x: -14 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 + i * 0.1, ease: EASE }}
        >
          <span className="flex h-4.5 w-4.5 items-center justify-center rounded-full border border-accent/40 bg-accent/10">
            <svg viewBox="0 0 10 10" className="h-2.5 w-2.5 text-accent-2" fill="none">
              <path d="m2 5.2 2 2 4-4.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="text-[13px] text-fog">{label}</span>
          <span className="ml-auto whitespace-nowrap font-mono text-[10px] text-faint">{["−12.8 t", "−31%", "ISO"][i]}</span>
        </motion.div>
      ))}
    </div>
  );
}

/* ---------- cards ---------- */

function FeatureCard({
  title,
  desc,
  visual,
  className,
  delay = 0,
  glow,
}: {
  title: string;
  desc: string;
  visual: React.ReactNode;
  className?: string;
  delay?: number;
  glow?: "left" | "right";
}) {
  return (
    <Reveal delay={delay} className={className}>
      <article className="group relative flex h-full flex-col overflow-hidden rounded-[20px] border border-white/[0.08] bg-gradient-to-b from-[#0a1120] to-[#050a13] transition-all duration-400 hover:border-accent/35 hover:shadow-[0_20px_60px_-24px_rgba(0,94,255,0.35)]">
        {glow && (
          <div
            aria-hidden="true"
            className={`absolute -top-28 h-64 w-64 rounded-full bg-accent/[0.12] blur-[70px] transition-opacity duration-500 group-hover:bg-accent/[0.18] ${
              glow === "right" ? "-right-20" : "-left-20"
            }`}
          />
        )}
        <div className="relative flex flex-1 items-center px-7 pt-8 sm:px-8">{visual}</div>
        <div className="relative px-7 pb-7 pt-6 sm:px-8 sm:pb-8">
          <h3 className="text-[17px] font-semibold tracking-tight text-ink">{title}</h3>
          <p className="mt-2 max-w-md text-[0.9375rem] leading-relaxed text-fog">{desc}</p>
        </div>
      </article>
    </Reveal>
  );
}

export function Features() {
  return (
    <section id="features" className="scroll-mt-24 py-24 sm:py-32" aria-labelledby="features-heading">
      <div className="container-x">
        <Reveal className="max-w-3xl">
          <p className="kicker">Features</p>
          <h2
            id="features-heading"
            className="mt-4 text-balance text-4xl font-semibold tracking-[-0.03em] text-ink sm:text-5xl"
          >
            One platform, <span className="accent-word">every capability</span>
          </h2>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-fog">
            Cloud-agnostic by design. SmalBlu plugs into any cloud, multi-cloud, or hybrid setup
            through APIs alone, with no host installs.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:mt-14 lg:grid-cols-12">
          <FeatureCard
            className="lg:col-span-6"
            glow="right"
            title="Cross-Layer Optimization"
            desc="One system optimizes user, application, compute, network, database, and storage together, never in silos."
            visual={<CrossLayerViz />}
          />
          <FeatureCard
            className="lg:col-span-6"
            glow="left"
            delay={0.08}
            title="LLM-Powered Agents"
            desc="Agents reason about your infrastructure in real time and recommend optimizations that keep getting sharper."
            visual={<AgentOrbitViz />}
          />
          <FeatureCard
            className="lg:col-span-3"
            delay={0.05}
            title="Natural-Language Interface"
            desc="Ask your infrastructure anything, in plain English."
            visual={<NlpViz />}
          />
          <FeatureCard
            className="lg:col-span-3"
            delay={0.1}
            title="Anomaly Detection"
            desc="Spend spikes and drift caught before production feels them."
            visual={<AnomalyViz />}
          />
          <FeatureCard
            className="lg:col-span-3"
            delay={0.15}
            title="Data Ecosystem Intelligence"
            desc="Actionable insights across data lakes, databases, and infrastructure. Each team sees what they own."
            visual={<EcosystemViz />}
          />
          <FeatureCard
            className="lg:col-span-3"
            delay={0.2}
            title="ESG Reporting"
            desc="Audit-ready carbon reporting from every optimization decision."
            visual={<EsgViz />}
          />
        </div>
      </div>
    </section>
  );
}
