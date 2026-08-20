"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/reveal";
import { LogoMark } from "@/components/logo";

const EASE = [0.22, 0.61, 0.36, 1] as const;

/**
 * The console is laid out at a fixed desktop width and scaled down to fit
 * narrow viewports (like Simplismart's mobile treatment), instead of
 * reflowing into a cramped single column. Internal layouts can therefore
 * use unconditional grid classes: the canvas is always DESIGN_W wide.
 */
const DESIGN_W = 896;

function ScaledFrame({ children }: { children: React.ReactNode }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;
    const update = () => {
      const s = Math.min(1, outer.clientWidth / DESIGN_W);
      setScale(s);
      setHeight(s < 1 ? inner.offsetHeight * s : undefined);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(outer);
    ro.observe(inner);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={outerRef} style={{ height }}>
      <div
        ref={innerRef}
        style={{ width: DESIGN_W, transform: `scale(${scale})`, transformOrigin: "top left" }}
      >
        {children}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
 * Light product-UI mock of the real SmalBlu console (v0.3), restyled to the
 * site's showcase format: white window, side satellite cards, four tabs
 * mirroring the product's actual screens.
 * ------------------------------------------------------------------------ */

function Kpi({ label, value, note, accent }: { label: string; value: string; note?: string; accent?: boolean }) {
  return (
    <div className={`rounded-xl border p-3.5 ${accent ? "border-emerald-200 bg-emerald-50/60" : "border-[#e3eaf3] bg-white"}`}>
      <p className="text-[10px] font-semibold uppercase tracking-wider text-[#5c6f88]">{label}</p>
      <p className={`mt-1 font-mono text-lg font-semibold tabular ${accent ? "text-emerald-600" : "text-[#0c1a2e]"}`}>{value}</p>
      {note && <p className="mt-0.5 text-[10px] text-[#8194ab]">{note}</p>}
    </div>
  );
}

/* ---------------- tab 1: dashboard ---------------- */

function DashboardPanel() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-[15px] font-semibold text-[#0c1a2e]">Infrastructure Overview</h4>
          <p className="text-[11px] text-[#8194ab]">Real-time cost, energy, and performance metrics</p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-600">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Auto-refresh 30s
        </span>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-2.5">
        <Kpi label="Annual cloud spend" value="$1.24M" note="across 3 providers" />
        <Kpi label="Potential savings" value="$498k" note="annualized" accent />
        <Kpi label="Active recommendations" value="12" note="4 high impact" />
        <Kpi label="Annual forecast" value="$786k" note="with SmalBlu applied" />
      </div>

      <div className="mt-3 rounded-xl border border-[#e3eaf3] bg-white p-4">
        <div className="flex items-center justify-between">
          <p className="text-[12px] font-semibold text-[#22334c]">Savings &amp; automation, this month</p>
          <p className="rounded-md bg-emerald-50 px-2 py-1 font-mono text-[11px] font-semibold text-emerald-600 tabular">
            $19,668 returned
          </p>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2.5">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wider text-[#8194ab]">Verified savings</p>
            <p className="mt-0.5 font-mono text-[15px] font-semibold text-[#0c1a2e] tabular">$19,243</p>
            <p className="text-[10px] text-[#8194ab]">10 applies · 1 rolled back</p>
          </div>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wider text-[#8194ab]">Human hours saved</p>
            <p className="mt-0.5 font-mono text-[15px] font-semibold text-[#0c1a2e] tabular">5 h</p>
            <p className="text-[10px] text-[#8194ab]">≈ $425 of FinOps labor</p>
          </div>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wider text-[#8194ab]">Recos applied</p>
            <p className="mt-0.5 font-mono text-[15px] font-semibold text-[#0c1a2e] tabular">10</p>
            <p className="text-[10px] text-[#8194ab]">none pending</p>
          </div>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5 rounded-xl border border-[#e3eaf3] bg-white px-4 py-3">
        <p className="text-[12px] font-semibold text-[#22334c]">Alert summary</p>
        <span className="flex items-center gap-1.5 text-[11px] font-medium text-[#41536b]">
          <span className="h-1.5 w-1.5 rounded-full bg-red-500" /> 3 Critical
        </span>
        <span className="flex items-center gap-1.5 text-[11px] font-medium text-[#41536b]">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" /> 5 Warning
        </span>
        <span className="flex items-center gap-1.5 text-[11px] font-medium text-[#41536b]">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" /> 2 Info
        </span>
      </div>
    </div>
  );
}

/* ---------------- tab 2: recommendations ---------------- */

const RECOS = [
  {
    title: "Downshift llama-3-8B to distilled variant",
    tag: "MODEL_SWAP",
    impact: "$393/mo",
    confidence: 55,
  },
  {
    title: "Autostop idle g5.xlarge, 19:00 to 07:00",
    tag: "AUTOSTOP_IDLE_GPU",
    impact: "$332/mo",
    confidence: 85,
  },
  {
    title: "Move nightly training to Spot capacity",
    tag: "SPOT_SWAP_TRAINING",
    impact: "$664/mo",
    confidence: 75,
  },
];

function RecommendationsPanel() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h4 className="text-[15px] font-semibold text-[#0c1a2e]">How to cut the bill</h4>
        <span className="rounded-md bg-accent/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#0050d6]">
          12 opportunities
        </span>
      </div>
      <ul className="mt-4 flex flex-col gap-2.5">
        {RECOS.map((r) => (
          <li key={r.title} className="rounded-xl border border-[#e3eaf3] bg-white p-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="min-w-0 flex-1 text-[13px] font-medium text-[#22334c]">{r.title}</span>
              <span className="font-mono text-[13px] font-semibold text-emerald-600 tabular">{r.impact}</span>
              <button
                type="button"
                tabIndex={-1}
                className="rounded-lg bg-[#0c1a2e] px-3.5 py-1.5 text-[12px] font-semibold text-white"
              >
                Create loop
              </button>
            </div>
            <div className="mt-2.5 flex flex-wrap items-center gap-3">
              <span className="rounded bg-accent/10 px-1.5 py-0.5 font-mono text-[9px] font-semibold tracking-wide text-[#0050d6]">
                {r.tag}
              </span>
              <span className="flex items-center gap-2 text-[10px] text-[#8194ab]">
                Confidence
                <span className="h-1 w-20 overflow-hidden rounded-full bg-[#e3eaf3]">
                  <span className="block h-full rounded-full bg-accent" style={{ width: `${r.confidence}%` }} />
                </span>
                <span className="font-mono tabular">{r.confidence}%</span>
              </span>
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-[11px] text-[#5c6f88]">
        Total identified: <span className="font-mono font-semibold text-[#0c1a2e]">$1,389/mo</span> across GPU workloads alone
      </p>
    </div>
  );
}

/* ---------------- tab 3: database optimization ---------------- */

function DbPanel() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-[15px] font-semibold text-[#0c1a2e]">Database Optimization</h4>
          <p className="text-[11px] text-[#8194ab]">PostgreSQL health, slow queries, and suggestions</p>
        </div>
        <span className="rounded-md bg-accent/10 px-2 py-1 font-mono text-[10px] font-semibold text-[#0050d6]">
          customerA · Postgres
        </span>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-2.5">
        <Kpi label="Connection pool" value="2/100" />
        <Kpi label="Avg query latency" value="0.7ms" />
        <Kpi label="Cache hit ratio" value="100.0%" accent />
        <Kpi label="Slow queries" value="2" />
      </div>

      <div className="mt-3 rounded-xl border border-[#e3eaf3] bg-white p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-[12px] font-semibold text-[#22334c]">Postgres Optimization Agent</p>
          <p className="text-[10px] text-[#8194ab]">
            <span className="font-mono font-semibold text-emerald-600 tabular">$1,150/mo</span> est. savings · 13 findings · 0
            critical · 1 warning
          </p>
        </div>
        <div className="mt-3 rounded-lg border-l-[3px] border-amber-400 bg-[#fbf9f2] p-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-amber-700">
              Warning
            </span>
            <span className="text-[12px] font-semibold text-[#22334c]">shared_buffers is low (163848kB)</span>
            <span className="ml-auto font-mono text-[11px] font-semibold text-emerald-600 tabular">$400/mo</span>
            <button
              type="button"
              tabIndex={-1}
              className="rounded-md border border-[#d5deea] bg-white px-2.5 py-1 text-[11px] font-semibold text-[#0050d6]"
            >
              AI plan
            </button>
          </div>
          <p className="mt-1.5 text-[11px] text-[#5c6f88]">
            Best-practice floor is 25% of RAM. Low shared_buffers forces more disk reads and hurts cache hit ratio.
          </p>
          <code className="mt-2 block rounded bg-[#0c1a2e] px-3 py-2 font-mono text-[10px] text-[#9cc6ff]">
            ALTER SYSTEM SET shared_buffers = &apos;2GB&apos;; -- then restart
          </code>
        </div>
      </div>
    </div>
  );
}

/* ---------------- tab 4: cost reports ---------------- */

function CostPanel() {
  const bars = [42, 30, 58, 38, 66, 47, 74];
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-[15px] font-semibold text-[#0c1a2e]">Cost Reports &amp; Analytics</h4>
          <p className="text-[11px] text-[#8194ab]">Unified view of spend across all 7 cost dimensions</p>
        </div>
        <span className="rounded-md border border-[#dbe4f0] px-2 py-1 text-[10px] font-medium text-[#5c6f88]">
          All teams · All envs
        </span>
      </div>

      <div className="mt-4 rounded-xl border border-[#e3eaf3] bg-white p-4">
        <div className="flex items-center justify-between">
          <p className="text-[12px] font-semibold text-[#22334c]">Human-hour savings, FinOps + SRE labor displaced</p>
          <p className="rounded-md bg-accent/10 px-2 py-1 font-mono text-[11px] font-semibold text-[#0050d6] tabular">
            $425 labor cut
          </p>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2.5">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wider text-[#8194ab]">Autonomy applies</p>
            <p className="mt-0.5 font-mono text-[15px] font-semibold text-[#0c1a2e] tabular">10 × 30 min</p>
            <p className="text-[10px] text-[#8194ab]">5.0 h · $425 saved</p>
          </div>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wider text-[#8194ab]">Budget alerts triaged</p>
            <p className="mt-0.5 font-mono text-[15px] font-semibold text-[#0c1a2e] tabular">4 × 15 min</p>
            <p className="text-[10px] text-[#8194ab]">1.0 h this month</p>
          </div>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wider text-[#8194ab]">Rate basis</p>
            <p className="mt-0.5 font-mono text-[15px] font-semibold text-[#0c1a2e] tabular">$85/h</p>
            <p className="text-[10px] text-[#8194ab]">US FinOps median</p>
          </div>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-[1fr_1fr_1.3fr] gap-2.5">
        <Kpi label="AWS month-to-date" value="$84.2k" note="Cost Explorer, live" />
        <Kpi label="Forecasted total" value="$102.4k" note="end of month" />
        <div className="rounded-xl border border-[#e3eaf3] bg-white p-3.5">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#5c6f88]">Daily cost trend</p>
          <div className="mt-2 flex h-12 items-end gap-1" aria-hidden="true">
            {bars.map((h, i) => (
              <span key={i} className={`w-full rounded-t ${i === bars.length - 1 ? "bg-accent" : "bg-[#c9d9f2]"}`} style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- satellites ---------------- */

function SatelliteCard({ title, children, side }: { title: string; children: React.ReactNode; side: "left" | "right" }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={`absolute z-30 w-[210px] rounded-2xl border border-[#e6edf5] bg-white p-4 shadow-[0_24px_60px_-18px_rgba(0,0,0,0.55)] ${
        side === "left" ? "-left-8 bottom-8" : "-right-6 top-16"
      }`}
      initial={reduce ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduce ? undefined : { opacity: 0, y: 10 }}
      transition={{ duration: 0.45, delay: 0.15, ease: EASE }}
    >
      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#41536b]">{title}</p>
      <div className="mt-2.5">{children}</div>
    </motion.div>
  );
}

const SOURCE_LOGOS = [
  ["AWS", "/logos/aws.svg"],
  ["Microsoft Azure", "/logos/azure.svg"],
  ["Google Cloud", "/logos/google-cloud.svg"],
  ["PostgreSQL", "/logos/postgresql.svg"],
] as const;

function DashboardSatellite() {
  return (
    <SatelliteCard title="Connected sources" side="left">
      <ul className="flex flex-col gap-2">
        {SOURCE_LOGOS.map(([name, src]) => (
          <li key={name} className="flex items-center gap-2.5 text-[12px] font-medium text-[#22334c]">
            <img src={src} alt="" className="h-4 w-5 object-contain" draggable={false} />
            {name}
          </li>
        ))}
      </ul>
    </SatelliteCard>
  );
}

function RecommendationsSatellite() {
  return (
    <SatelliteCard title="Autonomy loop" side="right">
      <ul className="flex flex-col gap-2">
        {[
          ["10", "applied automatically", "bg-emerald-500"],
          ["1", "rolled back safely", "bg-amber-500"],
          ["0", "awaiting review", "bg-[#c1cede]"],
        ].map(([n, text, dot]) => (
          <li key={text} className="flex items-center gap-2.5 text-[12px] text-[#41536b]">
            <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
            <span className="font-mono font-semibold text-[#0c1a2e] tabular">{n}</span>
            {text}
          </li>
        ))}
      </ul>
    </SatelliteCard>
  );
}

function DbSatellite() {
  return (
    <SatelliteCard title="Findings by type" side="left">
      <ul className="flex flex-col gap-2">
        {[
          ["Unused indexes", "10"],
          ["Memory tuning", "1"],
          ["Configuration", "1"],
          ["Autovacuum", "1"],
        ].map(([label, n]) => (
          <li key={label} className="flex items-center justify-between text-[12px] text-[#41536b]">
            {label}
            <span className="font-mono font-semibold text-[#0c1a2e] tabular">{n}</span>
          </li>
        ))}
      </ul>
    </SatelliteCard>
  );
}

function CostSatellite() {
  return (
    <SatelliteCard title="Labor cost cut" side="right">
      <p className="font-mono text-2xl font-semibold text-[#0c1a2e] tabular">$425</p>
      <p className="mt-1 text-[11px] text-[#5c6f88]">5 h · ≈ 0.1 FTE-weeks this month</p>
      <p className="mt-2 text-[10px] text-[#8194ab]">FinOps + SRE work displaced by automation</p>
    </SatelliteCard>
  );
}

/* ---------------- tabs + section ---------------- */

const TABS = [
  { key: "dashboard", label: "Dashboard", crumb: "Infrastructure Overview", panel: <DashboardPanel />, satellite: <DashboardSatellite key="dashboard" /> },
  { key: "recommendations", label: "Recommendations", crumb: "How to cut the bill", panel: <RecommendationsPanel />, satellite: <RecommendationsSatellite key="recommendations" /> },
  { key: "database", label: "DB Optimization", crumb: "Postgres health", panel: <DbPanel />, satellite: <DbSatellite key="database" /> },
  { key: "costs", label: "Cost Reports", crumb: "Analytics", panel: <CostPanel />, satellite: <CostSatellite key="costs" /> },
] as const;

export function Showcase() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const zoneRef = useRef<HTMLDivElement>(null);
  const inView = useInView(zoneRef, { margin: "-25% 0px -25% 0px" });

  useEffect(() => {
    if (reduce || paused || !inView) return;
    const id = setInterval(() => setActive((v) => (v + 1) % TABS.length), 6000);
    return () => clearInterval(id);
  }, [reduce, paused, inView]);

  const tab = TABS[active];

  return (
    <section id="product" className="relative scroll-mt-24 overflow-hidden py-16 sm:py-24 lg:py-32" aria-labelledby="product-heading">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="glow-orb left-1/2 top-[55%] h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 opacity-40" />
        <div className="texture-dots absolute inset-0" />
      </div>

      <div className="container-x">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="kicker">Product</p>
          <h2
            id="product-heading"
            className="mt-4 text-balance text-4xl font-semibold tracking-[-0.03em] text-ink sm:text-5xl"
          >
            Your infrastructure, <span className="accent-word">fully in control</span>
          </h2>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-fog">
            See how SmalBlu observes, optimizes, and reports across every layer of your stack,
            with your team approving every change.
          </p>
        </Reveal>

        <div
          ref={zoneRef}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          {/* tab bar */}
          <Reveal delay={0.1} className="mt-10 flex justify-center">
            <div role="tablist" aria-label="Product areas" className="inline-flex flex-wrap justify-center gap-1 rounded-xl border border-white/10 bg-white/[0.03] p-1">
              {TABS.map((t, i) => (
                <button
                  key={t.key}
                  role="tab"
                  aria-selected={i === active}
                  aria-controls={`panel-${t.key}`}
                  id={`tab-${t.key}`}
                  onClick={() => setActive(i)}
                  className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors duration-300 sm:px-6 ${
                    i === active ? "bg-accent text-white shadow-[0_8px_24px_-8px_rgba(0,94,255,0.7)]" : "text-fog hover:text-ink"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </Reveal>

          {/* console window + satellites, scaled to fit narrow viewports */}
          <Reveal delay={0.18} className="mx-auto mt-12 max-w-4xl">
            <ScaledFrame>
              <div className="relative">
                <AnimatePresence mode="popLayout">{tab.satellite}</AnimatePresence>

                <div className="overflow-hidden rounded-[18px] border border-white/10 bg-[#f5f8fc] shadow-[0_50px_140px_-40px_rgba(0,0,0,0.85),0_0_80px_-30px_rgba(0,94,255,0.4)]">
                  {/* chrome */}
                  <div className="flex h-12 items-center gap-3 border-b border-[#e2e9f2] bg-white px-5">
                    <LogoMark className="h-4 w-auto text-accent" />
                    <span className="text-[13px] font-semibold text-[#0c1a2e]">SmalBlu Console</span>
                    <span className="text-[#a5b3c7]" aria-hidden="true">
                      ›
                    </span>
                    <span className="text-[12px] font-medium text-[#5c6f88]">{tab.crumb}</span>
                    <span className="ml-auto flex items-center gap-4 text-[11px] font-medium text-[#8194ab]">
                      Docs
                      <span>Support</span>
                      <span className="h-6 w-6 rounded-full border border-[#dbe4f0] bg-accent/10" aria-hidden="true" />
                    </span>
                  </div>
                  {/* panel */}
                  <div className="relative min-h-[420px] p-7">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={tab.key}
                        role="tabpanel"
                        id={`panel-${tab.key}`}
                        aria-labelledby={`tab-${tab.key}`}
                        initial={reduce ? false : { opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reduce ? undefined : { opacity: 0, y: -10 }}
                        transition={{ duration: 0.35, ease: EASE }}
                      >
                        {tab.panel}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </ScaledFrame>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
