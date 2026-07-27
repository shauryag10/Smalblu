import Link from "next/link";
import { LogoLockup } from "@/components/logo";
import { nav, site } from "@/lib/site";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line bg-abyss">
      <div className="container-x flex flex-col gap-10 py-14">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-center">
          <Link href="/" aria-label="SmalBlu home" className="text-ink transition-opacity hover:opacity-80">
            <LogoLockup className="h-7 w-auto" />
          </Link>
          <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-7 gap-y-3">
            {nav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-[0.9375rem] font-medium text-fog transition-colors hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col-reverse items-start justify-between gap-6 border-t border-line pt-8 md:flex-row md:items-center">
          <p className="text-sm text-faint">© 2023 SmalBlu Technologies Pvt Ltd. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <a
              href={`mailto:${site.email}`}
              className="text-sm font-medium text-fog transition-colors hover:text-ink"
            >
              {site.email}
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="SmalBlu on LinkedIn"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white/[0.03] text-fog transition-colors hover:border-accent/50 hover:text-ink"
            >
              <LinkedInIcon className="h-[18px] w-[18px]" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
