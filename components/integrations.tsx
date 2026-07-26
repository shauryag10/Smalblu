"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/reveal";

const EASE = [0.22, 0.61, 0.36, 1] as const;

type Pillar = {
  name: string;
  src: string;
  left: string; // % across the field
  height: string; // % of field height
  front?: boolean; // front rank: larger tile, above back rank
  hideOnMobile?: boolean;
};

const PILLARS: Pillar[] = [
  { name: "Microsoft Azure", src: "/logos/azure.svg", left: "2%", height: "56%" },
  { name: "PostgreSQL", src: "/logos/postgresql.svg", left: "9%", height: "32%", front: true },
  { name: "AWS", src: "/logos/aws.svg", left: "17%", height: "72%" },
  { name: "MySQL", src: "/logos/mysql-icon.svg", left: "25%", height: "40%", front: true, hideOnMobile: true },
  { name: "Google Cloud", src: "/logos/google-cloud.svg", left: "33%", height: "84%" },
  { name: "MongoDB", src: "/logos/mongodb-icon.svg", left: "41%", height: "28%", front: true },
  { name: "Grafana", src: "/logos/grafana.svg", left: "49%", height: "76%", hideOnMobile: true },
  { name: "Docker", src: "/logos/docker-icon.svg", left: "57%", height: "38%", front: true },
  { name: "Kubernetes", src: "/logos/kubernetes.svg", left: "65%", height: "82%" },
  { name: "Redis", src: "/logos/redis.svg", left: "73%", height: "30%", front: true, hideOnMobile: true },
  { name: "Snowflake", src: "/logos/snowflake-icon.svg", left: "81%", height: "66%" },
  { name: "Terraform", src: "/logos/terraform-icon.svg", left: "89%", height: "36%", front: true },
  { name: "Prometheus", src: "/logos/prometheus.svg", left: "95%", height: "58%", hideOnMobile: true },
];

function PillarColumn({ pillar, index }: { pillar: Pillar; index: number }) {
  const reduce = useReducedMotion();
  const tile = pillar.front ? 62 : 54;
  return (
    <motion.div
      className={`absolute bottom-0 ${pillar.hideOnMobile ? "hidden sm:block" : ""} ${
        pillar.front ? "z-20" : "z-10"
      }`}
      style={{ left: pillar.left, height: pillar.height, width: 1 }}
      initial={reduce ? false : { opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.6, delay: 0.06 * index, ease: EASE }}
    >
      {/* shaft */}
      <div
        className="absolute bottom-0 top-0 -translate-x-1/2 border-x border-white/[0.08]"
        style={{
          width: tile * 0.82,
          background: "linear-gradient(to bottom, rgba(255,255,255,0.055), rgba(255,255,255,0.012) 55%, transparent)",
        }}
        aria-hidden="true"
      />
      {/* diamond tile */}
      <div
        className="absolute left-0 top-0 -translate-x-1/2 -translate-y-[55%] rotate-45 rounded-[13px] border border-white/70 bg-white shadow-[0_14px_36px_-10px_rgba(0,0,0,0.65),0_0_28px_-10px_rgba(0,94,255,0.35)]"
        style={{ width: tile, height: tile }}
      >
        <span className="flex h-full w-full -rotate-45 items-center justify-center">
          <img src={pillar.src} alt={pillar.name} draggable={false} className="h-6 w-auto max-w-[60%]" />
        </span>
      </div>
    </motion.div>
  );
}

export function Integrations() {
  return (
    <section id="integrations" className="scroll-mt-24 overflow-hidden border-t border-line py-24 sm:py-32" aria-labelledby="integrations-heading">
      <div className="container-x">
        <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
          <Reveal>
            <p className="kicker">Integrations</p>
            <h2
              id="integrations-heading"
              className="mt-4 text-balance text-4xl font-semibold tracking-[-0.03em] text-ink sm:text-5xl"
            >
              Built to fit seamlessly into your <span className="accent-word">stack</span>
            </h2>
            <p className="mt-5 max-w-md text-pretty text-lg leading-relaxed text-fog">
              From clouds to databases to Kubernetes, SmalBlu is engineered to integrate natively
              with the infrastructure and ecosystem you already run. API-only, no host installs.
            </p>
          </Reveal>

          <div className="relative h-[380px] sm:h-[460px] lg:h-[520px]" role="img" aria-label="SmalBlu integration ecosystem: AWS, Microsoft Azure, Google Cloud, PostgreSQL, MySQL, MongoDB, Kubernetes, Docker, Grafana, Prometheus, Redis, Snowflake, and Terraform">
            {/* soft glow behind the field */}
            <div aria-hidden="true" className="glow-orb left-1/2 top-1/2 h-[420px] w-[560px] -translate-x-1/2 -translate-y-1/2 opacity-30" />
            {PILLARS.map((p, i) => (
              <PillarColumn key={p.name} pillar={p} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
