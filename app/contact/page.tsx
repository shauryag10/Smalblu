import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a SmalBlu demo or get in touch. See how AI agents can cut your cloud costs by up to 40%.",
  alternates: { canonical: "/contact" },
};

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  );
}

export default function ContactPage() {
  return (
    <div className="relative overflow-hidden pb-24 pt-36 sm:pt-44">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="glow-orb left-1/2 top-[-300px] h-[640px] w-[900px] -translate-x-1/2 animate-drift opacity-70" />
        <div className="texture-dots absolute inset-0" />
      </div>

      <div className="container-x">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="kicker">Contact</p>
          <h1 className="mt-5 text-balance text-[clamp(2.75rem,6vw,4.5rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-ink">
            Talk to <span className="accent-word">SmalBlu</span>
          </h1>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-fog sm:text-xl">
            Book a demo to see the agents at work on infrastructure like yours, or send us a note
            and we&apos;ll take it from there.
          </p>
        </Reveal>

        <div className="mx-auto mt-16 grid max-w-5xl items-start gap-4 lg:grid-cols-[1fr_1.1fr]">
          <Reveal delay={0.1}>
            <div className="card flex flex-col gap-6 p-6 sm:p-8">
              <div>
                <h2 className="text-xl font-semibold tracking-tight text-ink">Send us a message</h2>
                <p className="mt-1.5 text-sm text-fog">We read everything that lands in our inbox.</p>
              </div>
              <ContactForm />
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-6">
                <a
                  href={`mailto:${site.email}`}
                  className="text-sm font-medium text-accent-2 underline decoration-accent/40 underline-offset-4 transition-colors hover:text-accent-3"
                >
                  {site.email}
                </a>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-fog transition-colors hover:text-ink"
                >
                  <LinkedInIcon className="h-4 w-4" />
                  SmalBlu on LinkedIn
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="card overflow-hidden">
              <div className="flex items-center justify-between border-b border-line px-6 py-5 sm:px-8">
                <div>
                  <h2 className="text-xl font-semibold tracking-tight text-ink">Book a demo</h2>
                  <p className="mt-1.5 text-sm text-fog">Pick a slot that works. 30 minutes, straight to the product.</p>
                </div>
              </div>
              {/* Calendly inline embed (plain iframe keeps the page dependency-free) */}
              <iframe
                src={`${site.calendly}?embed_type=Inline&embed_domain=smalblu.ai&hide_gdpr_banner=1&hide_landing_page_details=1&background_color=060b14&text_color=eef3fa&primary_color=005eff`}
                title="Book a SmalBlu demo on Calendly"
                loading="lazy"
                className="h-[640px] w-full border-0 bg-[#060b14]"
              />
              <div className="border-t border-line px-6 py-4 text-sm text-faint sm:px-8">
                Calendar not loading?{" "}
                <a
                  href={site.calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-accent-2 underline decoration-accent/40 underline-offset-4 hover:text-accent-3"
                >
                  Open Calendly in a new tab
                </a>
                .
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
