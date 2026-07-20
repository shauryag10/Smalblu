"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Counter } from "@/components/counter";
import { Reveal } from "@/components/reveal";
import { LogoMark } from "@/components/logo";

const EASE = [0.22, 0.61, 0.36, 1] as const;

/* ---------- mini-visualizations ---------- */

function CostBars() {
  const reduce = useReducedMotion();
  const heights = [86, 80, 74, 66, 57, 49, 43, 38, 34, 31];
  return (
    <svg viewBox="0 0 300 100" className="h-auto w-full max-w-[440px]" aria-hidden="true">
      {heights.map((h, i) => (
        <motion.rect
          key={i}
          x={i * 30 + 4}
          width={20}
          rx={4}
          y={100 - h}
          height={h}
          fill={i >= 6 ? "url(#costAccent)" : "rgba(255,255,255,0.10)"}
          initial={reduce ? false : { scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.15 + i * 0.05, ease: EASE }}
          style={{ transformOrigin: "bottom" }}
        />
      ))}
      <defs>
        <linearGradient id="costAccent" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b82ff" />
          <stop offset="100%" stopColor="#005eff" stopOpacity="0.55" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function PerfBars() {
  const reduce = useReducedMotion();
  return (
    <div className="flex w-full flex-col gap-3" aria-hidden="true">
      <div>
        <div className="mb-1.5 flex justify-between font-mono text-[10px] text-faint">
          <span>before</span>
          <span>412 ms</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]">
          <motion.div
            className="h-full rounded-full bg-white/20"
            initial={reduce ? false : { width: 0 }}
            whileInView={{ width: "96%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
          />
        </div>
      </div>
      <div>
        <div className="mb-1.5 flex justify-between font-mono text-[10px] text-faint">
          <span className="text-accent-2">with smalBlu</span>
          <span className="text-accent-2">288 ms</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-accent to-[#3b82ff] shadow-[0_0_12px_rgba(0,94,255,0.6)]"
            initial={reduce ? false : { width: 0 }}
            whileInView={{ width: "64%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.45, ease: EASE }}
          />
        </div>
      </div>
    </div>
  );
}

function ProductivityRing() {
  const reduce = useReducedMotion();
  const C = 2 * Math.PI * 30;
  return (
    <div className="relative h-[92px] w-[92px]" aria-hidden="true">
      <svg viewBox="0 0 72 72" className="h-full w-full -rotate-90">
        <circle cx="36" cy="36" r="30" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="7" />
        <motion.circle
          cx="36"
          cy="36"
          r="30"
          fill="none"
          stroke="url(#ringGrad)"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={C}
          initial={reduce ? { strokeDashoffset: C * 0.3 } : { strokeDashoffset: C }}
          whileInView={{ strokeDashoffset: C * 0.3 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.25, ease: EASE }}
        />
        <defs>
          <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#80b9e7" />
            <stop offset="100%" stopColor="#005eff" />
          </linearGradient>
        </defs>
      </svg>
      <span className="absolute inset-0 flex items-center justify-center font-mono text-lg font-semibold text-ink">
        <Counter to={70} suffix="%" duration={1.4} />
      </span>
    </div>
  );
}

function ReasoningGraph() {
  const reduce = useReducedMotion();
  const nodes = [
    [30, 22], [88, 14], [140, 30], [26, 74], [96, 86], [146, 70],
  ];
  return (
    <svg viewBox="0 0 172 100" className="h-auto w-full max-w-[220px]" aria-hidden="true">
      {nodes.map(([x, y], i) => (
        <line key={i} x1="86" y1="50" x2={x} y2={y} stroke="rgba(64,150,219,0.35)" strokeWidth="1" />
      ))}
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3" fill="#4096db" opacity="0.8" />
      ))}
      <motion.circle
        cx="86"
        cy="50"
        r="8"
        fill="#005eff"
        animate={reduce ? undefined : { opacity: [1, 0.55, 1], r: [8, 9.5, 8] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
      />
      <circle cx="86" cy="50" r="14" fill="none" stroke="rgba(0,94,255,0.4)" strokeWidth="1" />
      <motion.circle
        cx="86"
        cy="50"
        r="20"
        fill="none"
        stroke="rgba(0,94,255,0.18)"
        strokeWidth="1"
        animate={reduce ? undefined : { r: [20, 26], opacity: [0.5, 0] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut" }}
      />
    </svg>
  );
}

function OneStopViz() {
  const initials = ["U", "A", "C", "N", "D", "S"];
  return (
    <div className="flex items-center gap-3" aria-hidden="true">
      <div className="grid grid-cols-3 gap-1.5">
        {initials.map((c) => (
          <span
            key={c}
            className="flex h-6 w-6 items-center justify-center rounded-md border border-line bg-white/[0.03] font-mono text-[9px] text-faint"
          >
            {c}
          </span>
        ))}
      </div>
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-faint" aria-hidden="true">
        <path d="M4 12h16m0 0-6-6m6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="flex h-[52px] w-[52px] items-center justify-center rounded-xl border border-accent/50 bg-accent/10 shadow-[0_0_24px_-4px_rgba(0,94,255,0.5)]">
        <LogoMark className="h-5 w-auto text-accent" />
      </span>
    </div>
  );
}

function CarbonViz() {
  const reduce = useReducedMotion();
  return (
    <div className="flex items-center gap-4 text-white" aria-hidden="true">
      <svg viewBox="0 0 28 28" fill="none" className="h-10 w-10">
        <path
          d="M23 5c-9.5 0-16 4.5-16 12 0 2.5 1 4.6 2.4 6C11 24.5 14 25 16 24c6-3 7-12.5 7-19z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <motion.path
          d="M7.5 22.5C10 17 14 12.5 19.5 9.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          initial={reduce ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay: 0.3, ease: EASE }}
        />
      </svg>
      <p className="font-mono text-3xl font-semibold">
        <Counter to={35} prefix="−" suffix="%" duration={1.4} />
      </p>
    </div>
  );
}

/* ---------- cells ---------- */

function Cell({
  title,
  desc,
  children,
  className,
  delay = 0,
  headingId,
  tone = "dark",
}: {
  title: string;
  desc: string;
  children?: React.ReactNode;
  className?: string;
  delay?: number;
  headingId: string;
  tone?: "dark" | "blue";
}) {
  const blue = tone === "blue";
  return (
    <Reveal delay={delay} className={className}>
      <article
        aria-labelledby={headingId}
        className={
          blue
            ? "panel-blue relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-[20px] p-6 sm:p-7"
            : "card card-hover flex h-full flex-col justify-between gap-6 p-6 sm:p-7"
        }
      >
        <div className="flex min-h-[96px] items-center">{children}</div>
        <div className="relative">
          <h3
            id={headingId}
            className={`text-[17px] font-semibold tracking-tight ${blue ? "text-white" : "text-ink"}`}
          >
            {title}
          </h3>
          <p className={`mt-2 text-[0.9375rem] leading-relaxed ${blue ? "text-white/85" : "text-fog"}`}>
            {desc}
          </p>
        </div>
      </article>
    </Reveal>
  );
}

export function Bento() {
  return (
    <section id="features" className="scroll-mt-24 py-24 sm:py-32" aria-labelledby="benefits-heading">
      <div className="container-x">
        <Reveal className="max-w-3xl">
          <p className="kicker">What you get</p>
          <h2
            id="benefits-heading"
            className="mt-4 text-balance text-4xl font-semibold tracking-[-0.03em] text-ink sm:text-5xl"
          >
            The impact of an <span className="accent-word">always&#8209;on</span> optimization team
          </h2>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-fog">
            Six agents, six layers, one relentless objective: maximum efficiency from the
            infrastructure you already own.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:grid-rows-[auto_auto_auto]">
          {/* anchor cell */}
          <Reveal className="sm:col-span-2 lg:row-span-2">
            <article
              aria-labelledby="cell-cost"
              className="card card-hover relative flex h-full flex-col justify-between gap-8 overflow-hidden p-7 sm:p-9"
            >
              <div
                aria-hidden="true"
                className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/15 blur-[70px]"
              />
              <div className="relative">
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent-2">
                  Cloud bill, continuously reduced
                </p>
                <p className="mt-4 font-mono text-[clamp(4.5rem,9vw,7rem)] font-semibold leading-none tracking-tight text-[#4d9aff]">
                  <Counter to={40} suffix="%" duration={2.2} />
                </p>
                <p className="mt-2 font-mono text-sm text-faint">maximum infrastructure savings</p>
              </div>
              <CostBars />
              <div className="relative">
                <h3 id="cell-cost" className="text-xl font-semibold tracking-tight text-ink">
                  Infrastructure Cost Savings
                </h3>
                <p className="mt-2 max-w-md text-[0.9375rem] leading-relaxed text-fog">
                  Save up to 40% on your cloud bill through continuous cross-layer optimization.
                  Waste is eliminated the moment an agent finds it.
                </p>
              </div>
            </article>
          </Reveal>

          <Cell
            headingId="cell-perf"
            title="Better System Performance"
            desc="30% faster systems through continuous tuning of every layer, from queries to caches."
            delay={0.08}
          >
            <PerfBars />
          </Cell>

          <Cell
            headingId="cell-prod"
            title="Increased Engineering Productivity"
            desc="Hand routine tuning to agents and give your engineers up to 70% of their time back."
            delay={0.14}
          >
            <ProductivityRing />
          </Cell>

          <Cell
            headingId="cell-llm"
            title="LLM-Powered Reasoning"
            desc="An AI agent that reasons across your full infrastructure and recommends optimizations in real time."
            delay={0.1}
          >
            <ReasoningGraph />
          </Cell>

          <Cell
            headingId="cell-onestop"
            title="One-Stop Solution"
            desc="One platform across all six layers, replacing a shelf of point tools and consoles."
            delay={0.16}
          >
            <OneStopViz />
          </Cell>

          <Cell
            headingId="cell-carbon"
            title="Lower Carbon Footprint"
            desc="Cut data carbon footprint by up to 35%, with ESG compliance and reporting built in."
            delay={0.22}
            tone="blue"
          >
            <CarbonViz />
          </Cell>
        </div>
      </div>
    </section>
  );
}
