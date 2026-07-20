"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

const inputClasses =
  "w-full rounded-xl border border-line bg-white/[0.03] px-4 py-3 text-[0.9375rem] text-ink placeholder:text-faint transition-colors focus:border-accent/60 focus:bg-white/[0.05] focus:outline-none";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("submitting");

    const data = Object.fromEntries(new FormData(form).entries());

    // TODO(backend): wire this up to a real handler, e.g. POST to a Vercel
    // serverless function, Formspree, or a CRM webhook. Payload shape:
    // { name, email, company, message }. Until then we simulate success so
    // the UX is complete.
    await new Promise((r) => setTimeout(r, 900));
    console.info("contact form submission (stub):", data);

    setStatus("success");
    form.reset();
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex h-full min-h-[320px] flex-col items-center justify-center gap-4 text-center"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-accent/40 bg-accent/10">
          <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-accent-2" aria-hidden="true">
            <path d="m5 12.5 4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <div>
          <p className="text-lg font-semibold text-ink">Message sent</p>
          <p className="mt-1.5 text-[0.9375rem] text-fog">
            Thanks for reaching out. We&apos;ll get back to you shortly.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="text-sm font-medium text-accent-2 underline decoration-accent/40 underline-offset-4 hover:text-accent-3"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate={false}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="mb-2 block text-sm font-medium text-ink">
            Name
          </label>
          <input
            id="cf-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Ada Lovelace"
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="cf-email" className="mb-2 block text-sm font-medium text-ink">
            Work email
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="ada@company.com"
            className={inputClasses}
          />
        </div>
      </div>
      <div>
        <label htmlFor="cf-company" className="mb-2 block text-sm font-medium text-ink">
          Company
        </label>
        <input
          id="cf-company"
          name="company"
          type="text"
          required
          autoComplete="organization"
          placeholder="Acme Corp"
          className={inputClasses}
        />
      </div>
      <div>
        <label htmlFor="cf-message" className="mb-2 block text-sm font-medium text-ink">
          Message
        </label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={5}
          placeholder="Tell us about your infrastructure: clouds, scale, what you'd like to optimize."
          className={`${inputClasses} resize-y`}
        />
      </div>
      <button type="submit" disabled={status === "submitting"} className="btn btn-primary mt-1 disabled:opacity-70">
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
