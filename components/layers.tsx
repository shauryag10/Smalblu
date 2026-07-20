"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/reveal";
import { ButterflyWatermark } from "@/components/butterfly";

const LAYERS = [
  {
    name: "User",
    desc: "Learns real usage patterns and demand cycles, so capacity always follows actual need.",
  },
  {
    name: "Application",
    desc: "Tunes services, caching, and hot code paths for maximum throughput.",
  },
  {
    name: "Compute",
    desc: "Right-sizes instances, autoscaling, and scheduling to eliminate idle spend.",
  },
  {
    name: "Network",
    desc: "Cuts egress waste and latency with smarter routing and data placement.",
  },
  {
    name: "Database",
    desc: "Continuously optimizes queries, indexes, and engine parameters.",
  },
  {
    name: "Storage",
    desc: "Tiers and compresses data so every byte earns its keep.",
  },
];

const PILLARS = [
  {
    title: "Full-stack observability",
    desc: "Complete visibility from user behavior down to storage, with a natural-language interface on top.",
  },
  {
    title: "Proprietary compression engine",
    desc: "Industry-first technology that intelligently compresses and caches data, cutting storage and load by 35 to 50%.",
  },
  {
    title: "LLM-powered agents",
    desc: "A continuously learning agentic system that reasons about your infrastructure and tunes it automatically.",
  },
];

export function Layers() {
  const [active, setActive] = useState(2);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { margin: "-25% 0px -25% 0px" });

  useEffect(() => {
    if (reduce || paused || !inView) return;
    const id = setInterval(() => setActive((v) => (v + 1) % LAYERS.length), 3200);
    return () => clearInterval(id);
  }, [reduce, paused, inView]);

  return (
    <section id="how-it-works" className="scroll-mt-24 py-24 sm:py-32" aria-labelledby="layers-heading">
      <div className="container-x">
        <Reveal>
          <div
            ref={sectionRef}
            className="panel-blue relative overflow-hidden rounded-[28px]"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
          >
            <ButterflyWatermark
              className="-bottom-[24%] -right-[16%] w-[720px] rotate-[7deg] text-white lg:w-[860px]"
              opacityClass="opacity-[0.1]"
            />

            <div className="relative grid gap-12 px-6 py-14 sm:px-12 sm:py-16 lg:grid-cols-[1fr_1.15fr] lg:gap-16 lg:px-16 lg:py-20">
              {/* statement + pillars */}
              <div>
                <p className="kicker kicker-on-blue">How it works</p>
                <h2
                  id="layers-heading"
                  className="mt-4 text-balance text-4xl font-semibold leading-[1.06] tracking-[-0.03em] text-white sm:text-5xl"
                >
                  Cross-Layer Data Optimization
                </h2>
                <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-white/85">
                  One platform unifies all six infrastructure layers. No siloed tools. No
                  specialists. SmalBlu monitors and optimizes your data infrastructure 24/7,
                  because the biggest wins live between the layers, not inside them.
                </p>

                <ul className="mt-10 hidden max-w-xl flex-col lg:flex">
                  {PILLARS.map((p) => (
                    <li key={p.title} className="border-t border-white/20 py-5 first:border-t-0">
                      <p className="text-[15px] font-semibold text-white">{p.title}</p>
                      <p className="mt-1.5 text-sm leading-relaxed text-white/75">{p.desc}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* six numbered layers */}
              <div className="flex flex-col" role="tablist" aria-label="The six infrastructure layers">
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
                      className={`group relative flex w-full items-baseline gap-5 rounded-2xl border-t px-4 py-4 text-left transition-all duration-300 sm:gap-7 sm:px-6 sm:py-[1.15rem] ${
                        isActive
                          ? "border-transparent bg-white shadow-[0_18px_50px_-20px_rgba(0,15,26,0.5)]"
                          : "hover:bg-white/10"
                      } ${i > 0 && !isActive ? "border-white/20" : "border-transparent"}`}
                    >
                      <span
                        aria-hidden="true"
                        className={`font-mono text-xl font-semibold tabular sm:text-2xl ${
                          isActive ? "text-accent" : "text-[#9cc6ff]/80"
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1">
                        <span
                          className={`block text-lg font-semibold tracking-tight sm:text-xl ${
                            isActive ? "text-navy" : "text-white"
                          }`}
                        >
                          {layer.name}
                        </span>
                        <span
                          className={`mt-1 block overflow-hidden text-sm leading-relaxed transition-all duration-300 ${
                            isActive ? "max-h-20 text-[#37516b] opacity-100" : "max-h-0 opacity-0"
                          }`}
                        >
                          {layer.desc}
                        </span>
                      </span>
                      <svg
                        viewBox="0 0 16 16"
                        fill="none"
                        aria-hidden="true"
                        className={`h-4 w-4 shrink-0 self-center transition-all duration-300 ${
                          isActive ? "text-accent opacity-100" : "text-white/0 group-hover:text-white/60"
                        }`}
                      >
                        <path d="M3 8h10m0 0-4-4m4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
