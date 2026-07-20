"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/reveal";
import { LogoMark } from "@/components/logo";

type Layer = {
  name: string;
  dot: string;
  desc: string;
  icon: React.ReactNode;
};

const stroke = { strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" } as const;

const LAYERS: Layer[] = [
  {
    name: "User",
    dot: "#80b9e7",
    desc: "Learns real usage patterns and demand cycles, so capacity follows actual need.",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" aria-hidden="true">
        <circle cx="10" cy="6.5" r="3" stroke="currentColor" {...stroke} />
        <path d="M4 16.5c.8-3 3.2-4.5 6-4.5s5.2 1.5 6 4.5" stroke="currentColor" {...stroke} />
      </svg>
    ),
  },
  {
    name: "Application",
    dot: "#4096db",
    desc: "Tunes services, caching, and hot code paths for maximum throughput.",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" aria-hidden="true">
        <rect x="2.5" y="3.5" width="15" height="13" rx="2" stroke="currentColor" {...stroke} />
        <path d="M2.5 7h15M7.5 10.5l-2 2 2 2M12.5 10.5l2 2-2 2" stroke="currentColor" {...stroke} />
      </svg>
    ),
  },
  {
    name: "Compute",
    dot: "#3b82ff",
    desc: "Right-sizes instances, autoscaling, and scheduling to eliminate idle spend.",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" aria-hidden="true">
        <rect x="5" y="5" width="10" height="10" rx="2" stroke="currentColor" {...stroke} />
        <path d="M8 1.5v3M12 1.5v3M8 15.5v3M12 15.5v3M1.5 8h3M1.5 12h3M15.5 8h3M15.5 12h3" stroke="currentColor" {...stroke} />
      </svg>
    ),
  },
  {
    name: "Network",
    dot: "#2f8fd8",
    desc: "Cuts egress waste and latency with smarter routing and data placement.",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" aria-hidden="true">
        <circle cx="10" cy="4" r="2" stroke="currentColor" {...stroke} />
        <circle cx="4" cy="15" r="2" stroke="currentColor" {...stroke} />
        <circle cx="16" cy="15" r="2" stroke="currentColor" {...stroke} />
        <path d="M9 5.7 5 13.2M11 5.7l4 7.5M6 15h8" stroke="currentColor" {...stroke} />
      </svg>
    ),
  },
  {
    name: "Database",
    dot: "#2b7fc4",
    desc: "Continuously optimizes queries, indexes, and engine parameters.",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" aria-hidden="true">
        <ellipse cx="10" cy="4.5" rx="6.5" ry="2.5" stroke="currentColor" {...stroke} />
        <path d="M3.5 4.5v11c0 1.4 2.9 2.5 6.5 2.5s6.5-1.1 6.5-2.5v-11M3.5 10c0 1.4 2.9 2.5 6.5 2.5s6.5-1.1 6.5-2.5" stroke="currentColor" {...stroke} />
      </svg>
    ),
  },
  {
    name: "Storage",
    dot: "#2670ab",
    desc: "Tiers and compresses data so every byte earns its keep.",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" aria-hidden="true">
        <rect x="2.5" y="3" width="15" height="6" rx="1.5" stroke="currentColor" {...stroke} />
        <rect x="2.5" y="11" width="15" height="6" rx="1.5" stroke="currentColor" {...stroke} />
        <path d="M5.5 6h.01M5.5 14h.01" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    ),
  },
];

export function Layers() {
  const [active, setActive] = useState(2);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { margin: "-20% 0px -20% 0px" });

  useEffect(() => {
    if (reduce || paused || !inView) return;
    const id = setInterval(() => setActive((v) => (v + 1) % LAYERS.length), 3200);
    return () => clearInterval(id);
  }, [reduce, paused, inView]);

  return (
    <section id="how-it-works" className="relative scroll-mt-24 py-24 sm:py-32" aria-labelledby="layers-heading">
      <div className="container-x">
        <Reveal className="max-w-3xl">
          <p className="kicker">How it works</p>
          <h2
            id="layers-heading"
            className="mt-4 text-balance text-4xl font-semibold tracking-[-0.03em] text-ink sm:text-5xl"
          >
            Cross-Layer Data <span className="accent-word">Optimization</span>
          </h2>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-fog">
            One platform unifies all six infrastructure layers. No siloed tools. No specialists.
            SmalBlu monitors and optimizes your data infrastructure 24/7, because the biggest
            wins live between the layers, not inside them.
          </p>
        </Reveal>

        <div
          ref={sectionRef}
          className="mt-12 grid items-center gap-12 lg:mt-14 lg:grid-cols-[1.05fr_1fr] lg:gap-10"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          {/* isometric stack */}
          <div className="relative mx-auto flex h-[500px] w-full max-w-[460px] flex-col sm:h-[580px]" aria-hidden="true">
            {/* vertical beam with the mark at its head */}
            <div className="absolute left-1/2 top-[3%] h-[91%] w-px -translate-x-1/2 bg-gradient-to-b from-accent/80 via-accent/25 to-transparent" />
            <LogoMark className="absolute left-1/2 top-[1%] h-6 w-auto -translate-x-1/2 text-accent drop-shadow-[0_0_14px_rgba(0,94,255,0.9)]" />

            {LAYERS.map((layer, i) => {
              const isActive = i === active;
              return (
                <button
                  key={layer.name}
                  type="button"
                  tabIndex={-1}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className="absolute left-1/2 w-[264px] transition-transform duration-500 sm:w-[300px]"
                  style={{
                    top: `${10.5 + i * 13.6}%`,
                    transform: `translateX(-50%) translateY(${isActive && !reduce ? -8 : 0}px)`,
                    zIndex: isActive ? 20 : 10 - i,
                  }}
                >
                  <div
                    className={`flex h-[96px] items-center justify-center rounded-[18px] border backdrop-blur-sm transition-all duration-500 sm:h-[106px] ${
                      isActive
                        ? "border-accent/60 bg-accent/[0.13] shadow-[0_0_50px_-8px_rgba(0,94,255,0.55)]"
                        : "border-white/10 bg-white/[0.025]"
                    }`}
                    style={{ transform: "rotateX(56deg) rotateZ(-42deg)" }}
                  >
                    <span
                      className={`flex items-center gap-2.5 transition-colors duration-500 ${
                        isActive ? "text-ink" : "text-fog/70"
                      }`}
                    >
                      <span style={{ color: isActive ? layer.dot : undefined }}>{layer.icon}</span>
                      <span className="text-sm font-semibold tracking-wide">{layer.name}</span>
                    </span>
                  </div>
                </button>
              );
            })}

            <p className="absolute inset-x-0 bottom-0 text-center font-mono text-[11px] tracking-wide text-faint">
              Six agents. One coordinated optimization and compression engine.
            </p>
          </div>

          {/* editorial layer list */}
          <div className="flex flex-col" role="tablist" aria-label="Infrastructure layers">
            {LAYERS.map((layer, i) => {
              const isActive = i === active;
              return (
                <button
                  key={layer.name}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className={`group relative flex w-full items-baseline gap-5 border-t px-2 py-5 text-left transition-colors duration-300 sm:gap-6 sm:px-4 ${
                    i === 0 ? "border-transparent" : "border-line"
                  } ${isActive ? "" : "hover:bg-white/[0.02]"}`}
                >
                  <span
                    aria-hidden="true"
                    className={`absolute left-0 top-1/2 h-9 w-[3px] -translate-y-1/2 rounded-full transition-all duration-300 ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                    style={{ backgroundColor: layer.dot, boxShadow: `0 0 12px ${layer.dot}` }}
                  />
                  <span
                    className={`font-mono text-lg font-semibold tabular transition-colors duration-300 sm:text-xl ${
                      isActive ? "text-accent-2" : "text-faint/70"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1">
                    <span
                      className={`block text-lg font-semibold tracking-tight transition-colors duration-300 ${
                        isActive ? "text-ink" : "text-fog"
                      }`}
                    >
                      {layer.name}
                    </span>
                    <span
                      className={`mt-1 block text-[0.9375rem] leading-relaxed transition-colors duration-300 ${
                        isActive ? "text-fog" : "text-faint"
                      }`}
                    >
                      {layer.desc}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
