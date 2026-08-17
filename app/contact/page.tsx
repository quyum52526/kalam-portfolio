import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch or book a call.",
  openGraph: {
    title: "Contact Abu Kalam",
    description: "Get in touch or book a call.",
    images: ["/og-default.jpg"],
  },
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16 text-center">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        Let&apos;s talk
      </h1>
      <p className="mt-3 text-muted">
        Reach out directly or book time on my calendar.
      </p>

      <a
        href="mailto:hello@example.com"
        className="mt-6 inline-block text-lg font-medium underline underline-offset-4"
      >
        hello@example.com
      </a>

      {/* TODO: replace with real Calendly embed URL */}
      <div className="mt-12 flex h-[600px] w-full items-center justify-center rounded-2xl border border-dashed border-border text-sm text-muted">
        Calendly embed placeholder
      </div>
    </section>
  );
}
