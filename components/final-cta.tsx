import { Reveal } from "@/components/reveal";
import { ButterflyWatermark } from "@/components/butterfly";
import { site } from "@/lib/site";

export function FinalCta() {
  return (
    <section className="py-16 sm:py-24 lg:py-32" aria-labelledby="cta-heading">
      <div className="container-x">
        <Reveal>
          <div className="panel-blue relative overflow-hidden rounded-[28px] shadow-[0_40px_120px_-40px_rgba(0,94,255,0.55)]">
            <ButterflyWatermark
              className="-right-[8%] -top-[42%] w-[680px] text-white lg:w-[820px]"
              opacityClass="opacity-[0.1]"
            />
            <ButterflyWatermark
              className="-bottom-[55%] -left-[14%] w-[560px] text-white"
              opacityClass="opacity-[0.07]"
            />
            <div className="relative flex flex-col items-center px-6 py-20 text-center sm:py-24 lg:py-28">
              <p className="kicker kicker-on-blue">
                Building the world&apos;s most efficient data infrastructure
              </p>
              <h2
                id="cta-heading"
                className="mt-5 max-w-3xl text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-white sm:text-6xl"
              >
                Start Optimizing with SmalBlu
              </h2>
              <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-white/90 sm:text-xl">
                Unlock autonomous infrastructure optimization that cuts your cloud costs and the
                energy they burn, with AI.
              </p>
              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
                <a
                  href={site.calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-white !min-h-[54px] !px-9 !text-base"
                >
                  Book a Demo
                  <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4" aria-hidden="true">
                    <path d="M3 8h10m0 0-4-4m4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <a href={`mailto:${site.email}`} className="btn btn-ghost-white !min-h-[54px] !px-8 !text-base">
                  {site.email}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
