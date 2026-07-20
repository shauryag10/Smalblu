"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/reveal";

const FAQS = [
  {
    q: "What makes SmalBlu different from other optimization tools?",
    a: "SmalBlu is the first AI platform that performs true cross-layer optimization, reasoning across user behavior, applications, compute, network, database, and storage as one system. Point tools tune a single layer in isolation; SmalBlu's agentic system optimizes the interactions between layers, and it self-learns across every deployment, so its recommendations keep getting sharper.",
  },
  {
    q: "How does SmalBlu reduce cloud costs and emissions?",
    a: "SmalBlu's agents continuously identify idle and misallocated resources, compress and tier data intelligently, and tune compute, database, and storage for efficiency. That delivers up to 40% savings on cloud spend. And because every optimization removes wasted energy, your data carbon footprint drops by up to 35% alongside it.",
  },
  {
    q: "Do I need to change my existing infrastructure?",
    a: "No. SmalBlu is infrastructure-agnostic and API-only. It integrates with AWS, Azure, GCP, and your existing databases, with no host installs and no rip-and-replace. Plug it in, and optimization starts on the infrastructure you already run.",
  },
  {
    q: "Does SmalBlu support multi-cloud or hybrid environments?",
    a: "Yes. SmalBlu is designed for the complexity of modern enterprises. It optimizes seamlessly across multiple clouds and hybrid on-premise environments, unifying all of them under a single optimization layer.",
  },
  {
    q: "How secure is the optimization process?",
    a: "SmalBlu deploys inside your environment and reads only performance metrics and configuration metadata; your workload data never crosses your network perimeter. Every change goes through human-in-the-loop approval, with a full audit trail and one-click rollback, protected by end-to-end encryption and role-based access control.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <section id="faq" className="scroll-mt-24 py-24 sm:py-32" aria-labelledby="faq-heading">
      <div className="container-x">
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <p className="kicker">FAQ</p>
            <h2
              id="faq-heading"
              className="mt-4 text-balance text-4xl font-semibold tracking-[-0.03em] text-ink sm:text-5xl"
            >
              Questions, answered
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-fog">
              Everything CTOs, architects, and FinOps teams ask us first. Anything else, write to{" "}
              <a
                href="mailto:hello@smalblu.ai"
                className="font-medium text-accent-2 underline decoration-accent/40 underline-offset-4 transition-colors hover:text-accent-3"
              >
                hello@smalblu.ai
              </a>
              .
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex flex-col gap-3">
              {FAQS.map((item, i) => {
                const isOpen = open === i;
                return (
                  <div
                    key={item.q}
                    className={`card overflow-hidden transition-colors duration-300 ${
                      isOpen ? "border-accent/35 bg-white/[0.04]" : ""
                    }`}
                  >
                    <h3>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={`faq-panel-${i}`}
                        id={`faq-button-${i}`}
                        onClick={() => setOpen(isOpen ? null : i)}
                        className="flex w-full items-center justify-between gap-4 px-5 py-4.5 text-left sm:px-6 sm:py-5"
                      >
                        <span className="text-[15px] font-semibold leading-snug text-ink sm:text-base">
                          {item.q}
                        </span>
                        <span
                          aria-hidden="true"
                          className={`relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                            isOpen ? "rotate-45 border-accent/50 text-accent-2" : "border-line text-fog"
                          }`}
                        >
                          <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none">
                            <path d="M6 1.5v9M1.5 6h9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                          </svg>
                        </span>
                      </button>
                    </h3>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`faq-panel-${i}`}
                          role="region"
                          aria-labelledby={`faq-button-${i}`}
                          initial={reduce ? { opacity: 1 } : { height: 0, opacity: 0 }}
                          animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                          exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                          transition={{ duration: 0.32, ease: [0.22, 0.61, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="px-5 pb-5 text-[0.9375rem] leading-relaxed text-fog sm:px-6 sm:pb-6">
                            {item.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
