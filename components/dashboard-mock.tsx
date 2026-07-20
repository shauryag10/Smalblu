"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Counter } from "@/components/counter";
import { LogoMark } from "@/components/logo";

/* Feed of agent actions cycled into the activity panel. */
const FEED = [
  { layer: "Compute", color: "#005eff", text: "Right-sized 14 over-provisioned instances", meta: "−$3,120/mo", status: "applied" },
  { layer: "Database", color: "#00569b", text: "Rewrote hot query plan on orders_db", meta: "4.2× faster", status: "applied" },
  { layer: "Network", color: "#0064b5", text: "Rerouted cross-region egress path", meta: "−18 ms p95", status: "review" },
  { layer: "Storage", color: "#003967", text: "Compressed 2.3 TB of cold data", meta: "−$840/mo", status: "applied" },
  { layer: "Application", color: "#4096db", text: "Tuned cache TTLs on checkout service", meta: "94% hit rate", status: "applied" },
  { layer: "User", color: "#80b9e7", text: "Forecast: weekend demand dip", meta: "scale-down queued", status: "review" },
  { layer: "Compute", color: "#005eff", text: "Consolidated 3 idle dev clusters", meta: "−$1,860/mo", status: "applied" },
] as const;

const LAYER_STRIP = ["User", "App", "Compute", "Network", "Database", "Storage"] as const;

function StatusChip({ status }: { status: "applied" | "review" }) {
  return status === "applied" ? (
    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-medium text-emerald-300">
      <span className="h-1 w-1 rounded-full bg-emerald-400" aria-hidden="true" />
      Applied
    </span>
  ) : (
    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-amber-400/20 bg-amber-400/10 px-2 py-0.5 text-[10px] font-medium text-amber-300">
      <span className="h-1 w-1 rounded-full bg-amber-400" aria-hidden="true" />
      Awaiting approval
    </span>
  );
}

function SpendChart({ animate }: { animate: boolean }) {
  const reduce = useReducedMotion();
  const draw = animate && !reduce;
  return (
    <svg viewBox="0 0 560 292" className="h-auto w-full" role="img" aria-label="Chart: cloud spend dropping about 40% after SmalBlu deployment">
      <defs>
        <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#005eff" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#005eff" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* grid */}
      <g className="chart-grid">
        {[48, 108, 168, 228].map((y) => (
          <line key={y} x1="0" x2="560" y1={y} y2={y} />
        ))}
      </g>
      {/* baseline: spend without SmalBlu */}
      <motion.path
        d="M0 133 C 60 128, 120 117, 168 108 C 260 94, 420 72, 560 55"
        fill="none"
        stroke="rgba(255,255,255,0.22)"
        strokeWidth="1.5"
        strokeDasharray="5 5"
        initial={draw ? { pathLength: 0 } : false}
        animate={draw ? { pathLength: 1 } : undefined}
        transition={{ duration: 1.4, ease: "easeInOut", delay: 0.2 }}
      />
      {/* optimized area */}
      <motion.path
        d="M0 133 C 60 128, 120 117, 168 108 C 226 133, 288 192, 356 217 C 420 238, 500 245, 560 248 L 560 292 L 0 292 Z"
        fill="url(#areaFill)"
        initial={draw ? { opacity: 0 } : false}
        animate={draw ? { opacity: 1 } : undefined}
        transition={{ duration: 0.8, delay: 1.2 }}
      />
      {/* optimized: spend with SmalBlu */}
      <motion.path
        d="M0 133 C 60 128, 120 117, 168 108 C 226 133, 288 192, 356 217 C 420 238, 500 245, 560 248"
        fill="none"
        stroke="#3b82ff"
        strokeWidth="2.25"
        strokeLinecap="round"
        initial={draw ? { pathLength: 0 } : false}
        animate={draw ? { pathLength: 1 } : undefined}
        transition={{ duration: 1.6, ease: "easeInOut", delay: 0.35 }}
      />
      {/* deployment marker */}
      <motion.g
        initial={draw ? { opacity: 0 } : false}
        animate={draw ? { opacity: 1 } : undefined}
        transition={{ duration: 0.5, delay: 0.9 }}
      >
        <line x1="168" x2="168" y1="26" y2="274" stroke="rgba(64,150,219,0.45)" strokeWidth="1" strokeDasharray="3 4" />
        <rect x="110" y="8" rx="8" width="116" height="21" fill="rgba(0,94,255,0.12)" stroke="rgba(0,94,255,0.35)" strokeWidth="1" />
        <text x="168" y="22" textAnchor="middle" fill="#9cc6ff" fontSize="10.5" fontFamily="var(--font-mono)">
          smalBlu deployed
        </text>
      </motion.g>
      {/* end dot + savings label */}
      <motion.g
        initial={draw ? { opacity: 0 } : false}
        animate={draw ? { opacity: 1 } : undefined}
        transition={{ duration: 0.5, delay: 1.85 }}
      >
        <circle cx="560" cy="248" r="4" fill="#3b82ff" />
        <circle cx="560" cy="248" r="9" fill="#3b82ff" opacity="0.18" />
        <rect x="484" y="204" rx="8" width="58" height="22" fill="rgba(0,94,255,0.15)" stroke="rgba(0,94,255,0.4)" strokeWidth="1" />
        <text x="513" y="219" textAnchor="middle" fill="#9cc6ff" fontSize="11.5" fontWeight="600" fontFamily="var(--font-mono)">
          −40%
        </text>
      </motion.g>
    </svg>
  );
}

export function DashboardMock() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });
  const reduce = useReducedMotion();
  const [feedStart, setFeedStart] = useState(0);

  useEffect(() => {
    if (reduce || !inView) return;
    const id = setInterval(() => setFeedStart((v) => (v + 1) % FEED.length), 4000);
    return () => clearInterval(id);
  }, [reduce, inView]);

  // newest first: entries slide in at the top, oldest fades out at the bottom
  const visible = Array.from({ length: 4 }, (_, i) => FEED[(feedStart - i + FEED.length * 2) % FEED.length]);

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-[1020px]">
      {/* glow platform beneath the console */}
      <div
        aria-hidden="true"
        className="absolute -inset-x-8 -bottom-16 top-1/3 rounded-[50%] bg-accent/20 blur-[90px]"
      />

      {/* floating result chips */}
      <motion.div
        aria-hidden="true"
        className="absolute -top-5 right-4 z-10 hidden rounded-full border border-accent/40 bg-night/80 px-4 py-2 font-mono text-xs text-accent-3 shadow-[0_8px_30px_-8px_rgba(0,94,255,0.5)] backdrop-blur md:block"
        animate={reduce ? undefined : { y: [0, -7, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      >
        −40% cloud spend
      </motion.div>
      <motion.div
        aria-hidden="true"
        className="absolute -bottom-5 left-4 z-10 hidden rounded-full border border-line bg-night/80 px-4 py-2 font-mono text-xs text-accent-3 shadow-lg backdrop-blur md:block"
        animate={reduce ? undefined : { y: [0, 7, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
      >
        +30% performance
      </motion.div>

      <div className="relative overflow-hidden rounded-[20px] border border-white/10 bg-gradient-to-b from-[#0a1220] to-[#050a14] shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.08)]">
        {/* console chrome */}
        <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
          <div className="flex items-center gap-2.5">
            <LogoMark className="h-4 w-auto text-accent" />
            <span className="text-[13px] font-medium text-ink/90">SmalBlu Console</span>
            <span className="hidden rounded-full border border-line px-2 py-0.5 font-mono text-[10px] text-faint sm:inline">
              production
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-widest text-faint">24/7 autonomous</span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-300">
              <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-emerald-400" aria-hidden="true" />
              Live
            </span>
          </div>
        </div>

        {/* KPI row */}
        <div className="grid grid-cols-3 divide-x divide-line border-b border-line">
          <div className="px-5 py-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">Cloud spend saved</p>
            <p className="mt-1.5 font-mono text-xl font-semibold text-ink sm:text-[26px]">
              <Counter to={1.24} decimals={2} prefix="$" suffix="M" duration={2} />
            </p>
            <p className="mt-1 text-[11px] text-fog">last 12 months</p>
          </div>
          <div className="px-5 py-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">Queries accelerated</p>
            <p className="mt-1.5 font-mono text-xl font-semibold text-ink sm:text-[26px]">
              <Counter to={38412} separator duration={2.2} />
            </p>
            <p className="mt-1 text-[11px] text-fog">p95 latency −31%</p>
          </div>
          <div className="px-5 py-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
              CO<sub className="text-[8px]">2</sub> avoided
            </p>
            <p className="mt-1.5 font-mono text-xl font-semibold text-ink sm:text-[26px]">
              <Counter to={128.4} decimals={1} suffix=" t" duration={2.4} />
            </p>
            <p className="mt-1 text-[11px] text-fog">vs. unoptimized baseline</p>
          </div>
        </div>

        {/* chart + agent feed */}
        <div className="grid gap-0 lg:grid-cols-[1.6fr_1fr]">
          <div className="border-b border-line px-5 py-4 lg:border-b-0 lg:border-r">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-[13px] font-medium text-ink/90">Monthly cloud spend</p>
              <div className="flex items-center gap-4 font-mono text-[10px] text-faint">
                <span className="inline-flex items-center gap-1.5">
                  <span className="inline-block h-0.5 w-4 border-t border-dashed border-white/40" aria-hidden="true" />
                  baseline
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="inline-block h-0.5 w-4 rounded bg-[#3b82ff]" aria-hidden="true" />
                  optimized
                </span>
              </div>
            </div>
            <SpendChart animate={inView} />
          </div>

          <div className="flex flex-col px-5 py-4">
            <p className="mb-3 text-[13px] font-medium text-ink/90">Agent activity</p>
            <ul className="flex flex-col gap-2" aria-live="off">
              <AnimatePresence mode="popLayout" initial={false}>
                {visible.map((item) => (
                  <motion.li
                    key={`${item.text}`}
                    layout={!reduce}
                    initial={reduce ? false : { opacity: 0, y: -14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, transition: { duration: 0.16 } }}
                    transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
                    className="rounded-xl border border-line bg-white/[0.02] px-3 py-2.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex min-w-0 items-center gap-2">
                        <span
                          className="h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ backgroundColor: item.color, boxShadow: `0 0 8px ${item.color}` }}
                          aria-hidden="true"
                        />
                        <span className="truncate font-mono text-[10px] uppercase tracking-wider text-fog">
                          {item.layer} agent
                        </span>
                      </span>
                      <StatusChip status={item.status} />
                    </div>
                    <p className="mt-1.5 truncate text-xs text-ink/85">{item.text}</p>
                    <p className="mt-0.5 font-mono text-[11px] text-accent-3">{item.meta}</p>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </div>
        </div>

        {/* six-layer health strip */}
        <div className="hidden grid-cols-6 divide-x divide-line border-t border-line sm:grid">
          {LAYER_STRIP.map((l) => (
            <div key={l} className="flex items-center justify-center gap-1.5 px-2 py-2.5">
              <span className="h-1 w-1 rounded-full bg-emerald-400/80" aria-hidden="true" />
              <span className="font-mono text-[10px] text-faint">{l}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
