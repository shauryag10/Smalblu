"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/reveal";
import { LogoMark } from "@/components/logo";

const EASE = [0.22, 0.61, 0.36, 1] as const;

/* ---------------------------------------------------------------------------
 * Light product-UI primitives (the console window inverts the site theme).
 * TODO(product): swap the coded mock panels for real product screenshots
 * when available; the window chrome and tabs stay as they are.
 * ------------------------------------------------------------------------ */

const LAYER_DOTS = [
  ["User", "#80b9e7"],
  ["Application", "#4096db"],
  ["Compute", "#3b82ff"],
  ["Network", "#2f8fd8"],
  ["Database", "#2b7fc4"],
  ["Storage", "#2670ab"],
] as const;

function MiniArea({ down }: { down?: boolean }) {
  const d = down
    ? "M0 14 C 14 12, 22 18, 34 22 C 46 26, 54 30, 68 34 C 82 38, 92 40, 104 42"
    : "M0 40 C 14 38, 24 30, 36 28 C 48 26, 58 20, 72 16 C 86 12, 94 10, 104 8";
  return (
    <svg viewBox="0 0 104 48" className="h-12 w-full" aria-hidden="true">
      <path d={`${d} L104 48 L0 48 Z`} fill="rgba(0,94,255,0.1)" />
      <path d={d} fill="none" stroke="#005eff" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function ObservePanel() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h4 className="text-[15px] font-semibold text-[#0c1a2e]">Infrastructure Overview</h4>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-600">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Live
        </span>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-[#e3eaf3] bg-white p-4">
          <p className="text-[11px] font-medium text-[#5c6f88]">Cloud spend, month to date</p>
          <p className="mt-1 font-mono text-xl font-semibold text-[#0c1a2e] tabular">$84,210</p>
          <MiniArea down />
          <p className="mt-1 font-mono text-[10px] text-emerald-600">−18% vs last month</p>
        </div>
        <div className="rounded-xl border border-[#e3eaf3] bg-white p-4">
          <p className="text-[11px] font-medium text-[#5c6f88]">p95 latency</p>
          <p className="mt-1 font-mono text-xl font-semibold text-[#0c1a2e] tabular">212 ms</p>
          <MiniArea down />
          <p className="mt-1 font-mono text-[10px] text-emerald-600">−31% since deploy</p>
        </div>
        <div className="rounded-xl border border-[#e3eaf3] bg-white p-4">
          <p className="text-[11px] font-medium text-[#5c6f88]">Layer health</p>
          <ul className="mt-2 flex flex-col gap-1.5">
            {LAYER_DOTS.map(([name, color]) => (
              <li key={name} className="flex items-center gap-2 text-[11px] text-[#41536b]">
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
                {name}
                <span className="ml-auto font-mono text-[9px] uppercase tracking-wider text-emerald-600">ok</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

const RECOMMENDATIONS = [
  { layer: "Database", text: "Rewrite hot query plan on orders_db", impact: "−$3,120/mo" },
  { layer: "Storage", text: "Tier 2.3 TB of cold data to archive", impact: "−$840/mo" },
  { layer: "Compute", text: "Right-size 14 over-provisioned instances", impact: "−$5,660/mo" },
];

function OptimizePanel() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h4 className="text-[15px] font-semibold text-[#0c1a2e]">Agent recommendations</h4>
        <span className="font-mono text-[10px] uppercase tracking-wider text-[#5c6f88]">refreshed 42s ago</span>
      </div>
      <ul className="mt-4 flex flex-col gap-2.5">
        {RECOMMENDATIONS.map((r) => (
          <li key={r.text} className="flex flex-wrap items-center gap-3 rounded-xl border border-[#e3eaf3] bg-white p-4">
            <span className="rounded-md bg-accent/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#0050d6]">
              {r.layer}
            </span>
            <span className="min-w-0 flex-1 text-[13px] font-medium text-[#22334c]">{r.text}</span>
            <span className="font-mono text-[12px] font-semibold text-emerald-600 tabular">{r.impact}</span>
            <button
              type="button"
              tabIndex={-1}
              className="rounded-lg bg-[#0c1a2e] px-3.5 py-1.5 text-[12px] font-semibold text-white"
            >
              Review
            </button>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-[11px] text-[#5c6f88]">
        Estimated total impact: <span className="font-mono font-semibold text-[#0c1a2e]">$9,620/mo</span> across three layers
      </p>
    </div>
  );
}

function ApprovePanel() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h4 className="text-[15px] font-semibold text-[#0c1a2e]">Pending changes</h4>
        <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-amber-600">
          2 awaiting approval
        </span>
      </div>
      <ul className="mt-4 flex flex-col gap-2.5">
        {[
          { text: "Apply new indexing strategy on orders_db", detail: "Database agent · est. 4.2× faster reads" },
          { text: "Consolidate 3 idle dev clusters", detail: "Compute agent · est. −$1,860/mo" },
        ].map((c) => (
          <li key={c.text} className="flex flex-wrap items-center gap-3 rounded-xl border border-[#e3eaf3] bg-white p-4">
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-medium text-[#22334c]">{c.text}</p>
              <p className="mt-0.5 text-[11px] text-[#5c6f88]">{c.detail}</p>
            </div>
            <button type="button" tabIndex={-1} className="rounded-lg bg-accent px-3.5 py-1.5 text-[12px] font-semibold text-white">
              Approve
            </button>
            <button type="button" tabIndex={-1} className="rounded-lg border border-[#d5deea] px-3.5 py-1.5 text-[12px] font-semibold text-[#41536b]">
              Reject
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-[11px] text-[#5c6f88]">
        <span className="inline-flex items-center gap-1.5">
          <svg viewBox="0 0 12 12" className="h-3 w-3 text-accent" fill="none" aria-hidden="true">
            <path d="M2 6a4 4 0 1 1 1.2 2.8M2 6V3.5M2 6h2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          One-click rollback on every change
        </span>
        <span>Full audit trail, always on</span>
      </div>
    </div>
  );
}

function ReportPanel() {
  const bars = [34, 42, 38, 52, 61, 74];
  return (
    <div>
      <div className="flex items-center justify-between">
        <h4 className="text-[15px] font-semibold text-[#0c1a2e]">Quarterly impact</h4>
        <span className="rounded-md bg-accent/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#0050d6]">
          ISO 14067 aligned
        </span>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_1fr_1.2fr]">
        <div className="rounded-xl border border-[#e3eaf3] bg-white p-4">
          <p className="text-[11px] font-medium text-[#5c6f88]">Savings this quarter</p>
          <p className="mt-1 font-mono text-2xl font-semibold text-[#0c1a2e] tabular">$248k</p>
          <p className="mt-1 font-mono text-[10px] text-emerald-600">on track for 40%</p>
        </div>
        <div className="rounded-xl border border-[#e3eaf3] bg-white p-4">
          <p className="text-[11px] font-medium text-[#5c6f88]">CO₂ avoided</p>
          <p className="mt-1 font-mono text-2xl font-semibold text-[#0c1a2e] tabular">38 t</p>
          <p className="mt-1 font-mono text-[10px] text-emerald-600">−35% footprint</p>
        </div>
        <div className="flex flex-col rounded-xl border border-[#e3eaf3] bg-white p-4">
          <p className="text-[11px] font-medium text-[#5c6f88]">Efficiency gain by month</p>
          <div className="mt-2 flex flex-1 items-end gap-1.5" aria-hidden="true">
            {bars.map((h, i) => (
              <span
                key={i}
                className={`w-full rounded-t ${i >= 4 ? "bg-accent" : "bg-[#c9d9f2]"}`}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      </div>
      <button
        type="button"
        tabIndex={-1}
        className="mt-4 rounded-lg bg-[#0c1a2e] px-4 py-2 text-[12px] font-semibold text-white"
      >
        Export ESG report
      </button>
    </div>
  );
}

/* ---------------- satellites ---------------- */

function SatelliteCard({ title, children, side }: { title: string; children: React.ReactNode; side: "left" | "right" }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={`absolute z-30 hidden w-[210px] rounded-2xl border border-[#e6edf5] bg-white p-4 shadow-[0_24px_60px_-18px_rgba(0,0,0,0.55)] lg:block ${
        side === "left" ? "-left-16 bottom-10" : "-right-14 top-16"
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

function ObserveSatellite() {
  return (
    <SatelliteCard title="Connect your stack" side="left">
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

function OptimizeSatellite() {
  return (
    <SatelliteCard title="Agents active" side="right">
      <ul className="flex flex-col gap-1.5">
        {LAYER_DOTS.map(([name, color]) => (
          <li key={name} className="flex items-center gap-2 text-[12px] font-medium text-[#22334c]">
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
            {name} agent
          </li>
        ))}
      </ul>
    </SatelliteCard>
  );
}

function ApproveSatellite() {
  return (
    <SatelliteCard title="Audit trail" side="left">
      <ul className="flex flex-col gap-2">
        {[
          ["09:41", "Query plan applied"],
          ["09:12", "Cache TTLs tuned"],
          ["08:56", "2 instances resized"],
        ].map(([t, text]) => (
          <li key={t} className="flex items-baseline gap-2 text-[12px] text-[#41536b]">
            <span className="font-mono text-[10px] text-[#8194ab] tabular">{t}</span>
            {text}
          </li>
        ))}
      </ul>
    </SatelliteCard>
  );
}

function ReportSatellite() {
  return (
    <SatelliteCard title="Export formats" side="right">
      <ul className="flex flex-col gap-1.5">
        {["PDF board report", "CSV raw metrics", "API endpoint"].map((f) => (
          <li key={f} className="flex items-center gap-2 text-[12px] font-medium text-[#22334c]">
            <svg viewBox="0 0 12 12" className="h-3 w-3 text-accent" fill="none" aria-hidden="true">
              <path d="m2.5 6.2 2.4 2.4 4.6-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {f}
          </li>
        ))}
      </ul>
    </SatelliteCard>
  );
}

/* ---------------- tabs + section ---------------- */

const TABS = [
  { key: "observe", label: "Observe", crumb: "Overview", panel: <ObservePanel />, satellite: <ObserveSatellite key="observe" /> },
  { key: "optimize", label: "Optimize", crumb: "Recommendations", panel: <OptimizePanel />, satellite: <OptimizeSatellite key="optimize" /> },
  { key: "approve", label: "Approve", crumb: "Pending changes", panel: <ApprovePanel />, satellite: <ApproveSatellite key="approve" /> },
  { key: "report", label: "Report", crumb: "ESG & savings", panel: <ReportPanel />, satellite: <ReportSatellite key="report" /> },
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
    <section id="product" className="relative scroll-mt-24 overflow-hidden py-24 sm:py-32" aria-labelledby="product-heading">
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
                  className={`rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors duration-300 sm:px-7 ${
                    i === active ? "bg-accent text-white shadow-[0_8px_24px_-8px_rgba(0,94,255,0.7)]" : "text-fog hover:text-ink"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </Reveal>

          {/* console window + satellites */}
          <Reveal delay={0.18} className="relative mx-auto mt-12 max-w-4xl">
            <AnimatePresence mode="popLayout">{tab.satellite}</AnimatePresence>

            <div className="overflow-hidden rounded-[18px] border border-white/10 bg-[#f5f8fc] shadow-[0_50px_140px_-40px_rgba(0,0,0,0.85),0_0_80px_-30px_rgba(0,94,255,0.4)]">
              {/* chrome */}
              <div className="flex h-12 items-center gap-3 border-b border-[#e2e9f2] bg-white px-4 sm:px-5">
                <LogoMark className="h-4 w-auto text-accent" />
                <span className="text-[13px] font-semibold text-[#0c1a2e]">SmalBlu Console</span>
                <span className="hidden text-[#a5b3c7] sm:inline" aria-hidden="true">
                  ›
                </span>
                <span className="hidden text-[12px] font-medium text-[#5c6f88] sm:inline">{tab.crumb}</span>
                <span className="ml-auto hidden items-center gap-4 text-[11px] font-medium text-[#8194ab] sm:flex">
                  Docs
                  <span>Support</span>
                  <span className="h-6 w-6 rounded-full border border-[#dbe4f0] bg-accent/10" aria-hidden="true" />
                </span>
              </div>
              {/* panel */}
              <div className="relative min-h-[400px] p-5 sm:p-7">
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
          </Reveal>
        </div>
      </div>
    </section>
  );
}
