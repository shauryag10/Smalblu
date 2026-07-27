"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { LogoLockup } from "@/components/logo";
import { nav, site } from "@/lib/site";

export function Nav() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();

  // close on Escape, lock body scroll, return focus to the toggle
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    const first = panelRef.current?.querySelector<HTMLElement>("a, button");
    first?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      toggleRef.current?.focus();
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-night/75 backdrop-blur-xl">
      {/* mirrors the page frame's geometry so the logo sits flush at the left rail */}
      <div className="px-3 sm:px-6">
        <nav aria-label="Main" className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between gap-6">
        <Link
          href="/"
          aria-label="SmalBlu home"
          className="shrink-0 text-ink transition-opacity hover:opacity-80"
          onClick={() => setOpen(false)}
        >
          <LogoLockup className="h-7 w-auto" />
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-full px-4 py-2 text-[0.9375rem] font-medium text-fog transition-colors hover:bg-white/5 hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href={site.calendly}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary hidden !min-h-[42px] !px-5 text-sm md:inline-flex"
          >
            Book a Demo
          </a>
          <button
            ref={toggleRef}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="relative flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white/[0.03] md:hidden"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span
              aria-hidden="true"
              className={`absolute h-[1.5px] w-[18px] rounded-full bg-ink transition-transform duration-300 ${
                open ? "rotate-45" : "-translate-y-[5px]"
              }`}
            />
            <span
              aria-hidden="true"
              className={`absolute h-[1.5px] w-[18px] rounded-full bg-ink transition-all duration-300 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              aria-hidden="true"
              className={`absolute h-[1.5px] w-[18px] rounded-full bg-ink transition-transform duration-300 ${
                open ? "-rotate-45" : "translate-y-[5px]"
              }`}
            />
          </button>
        </div>
        </nav>
      </div>

      {/* mobile slide-in. Positioned absolute below the header rather than
          fixed: Safari treats the blurred fixed header as the containing
          block for fixed children, which collapsed the panel to nothing on
          iOS. Solid background, no backdrop blur, explicit dvh height. */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={panelRef}
            initial={reduce ? { opacity: 0 } : { opacity: 0, x: 32 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, x: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, x: 32 }}
            transition={{ duration: 0.28, ease: [0.22, 0.61, 0.36, 1] }}
            className="absolute inset-x-0 top-full z-40 flex h-[calc(100dvh-72px)] flex-col gap-2 overflow-y-auto border-t border-line bg-night px-5 pb-10 pt-6 md:hidden"
          >
            {/* items intentionally have no entrance animation: staggered fades
                froze at opacity 0 on throttled mobile browsers, leaving only
                the first link visible */}
            {nav.map((item) => (
              <div key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-4 py-4 text-lg font-medium text-ink transition-colors hover:bg-white/5"
                >
                  {item.label}
                </Link>
              </div>
            ))}
            <div className="mt-4 px-1">
              <a
                href={site.calendly}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary w-full"
                onClick={() => setOpen(false)}
              >
                Book a Demo
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
