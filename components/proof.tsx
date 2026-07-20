import { Reveal } from "@/components/reveal";
import { ButterflyWatermark } from "@/components/butterfly";

const STATS = [
  { value: "$500K", label: "saved on cloud spend" },
  { value: "−40%", label: "infrastructure cost" },
  { value: "15 t", label: "CO₂ emissions avoided" },
];

export function Proof() {
  return (
    <section className="py-6" aria-labelledby="proof-heading">
      <div className="container-x">
        <Reveal>
          <div className="panel-light relative overflow-hidden rounded-[28px]">
            <ButterflyWatermark
              className="-right-[10%] -top-[30%] w-[560px] rotate-[8deg] text-accent lg:w-[640px]"
              opacityClass="opacity-[0.06]"
            />
            <div className="relative grid gap-10 px-6 py-12 sm:px-12 sm:py-14 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16 lg:px-16">
              <div>
                <p className="kicker !text-[#0050d6]">Proven in deployment</p>
                <h2
                  id="proof-heading"
                  className="mt-3 text-balance text-3xl font-semibold tracking-[-0.025em] text-navy sm:text-4xl"
                >
                  Real numbers from a real enterprise pilot
                </h2>
                <p className="mt-4 max-w-xl text-pretty leading-relaxed text-[#37516b]">
                  A successful pilot with Vigyanlabs, the team whose platform powers SBI and
                  Aadhaar (Protean). Every figure verified via an ISO 14067-compliant
                  methodology.
                </p>
              </div>
              <dl className="grid grid-cols-3 divide-x divide-[#001d34]/10">
                {STATS.map((s) => (
                  <div key={s.label} className="px-4 first:pl-0 last:pr-0 sm:px-6">
                    <dt className="sr-only">{s.label}</dt>
                    <dd className="font-mono text-3xl font-semibold tracking-tight text-[#0050d6] tabular sm:text-4xl">
                      {s.value}
                    </dd>
                    <dd className="mt-2 text-[13px] leading-snug text-[#37516b]">{s.label}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
