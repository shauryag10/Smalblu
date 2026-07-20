"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";

const EASE = [0.22, 0.61, 0.36, 1] as const;

/** Fade-up scroll reveal: 0.5s, once, respects prefers-reduced-motion. */
export function Reveal({
  children,
  delay = 0,
  className,
  ...rest
}: { delay?: number } & HTMLMotionProps<"div">) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 26 }}
      whileInView={reduce ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.5, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
