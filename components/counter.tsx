"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

type CounterProps = {
  to: number;
  from?: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  separator?: boolean;
  className?: string;
  delay?: number;
};

/** Animated count-up that starts when scrolled into view (once). */
export function Counter({
  to,
  from = 0,
  duration = 1.8,
  decimals = 0,
  prefix = "",
  suffix = "",
  separator = false,
  className,
  delay = 0,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });
  const reduce = useReducedMotion();

  const format = (v: number) => {
    const fixed = v.toFixed(decimals);
    const text = separator
      ? Number(fixed).toLocaleString("en-US", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })
      : fixed;
    return `${prefix}${text}${suffix}`;
  };

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView) return;
    if (reduce) {
      el.textContent = format(to);
      return;
    }
    const controls = animate(from, to, {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        el.textContent = format(v);
      },
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce, to]);

  return (
    <span ref={ref} className={`tabular ${className ?? ""}`} aria-label={format(to)}>
      {format(reduce ? to : from)}
    </span>
  );
}
