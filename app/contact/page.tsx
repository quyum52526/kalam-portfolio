import type { Metadata } from "next";
import { ContactPageBody } from "@/components/contact/ContactPageBody";

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
    <section className="mx-auto max-w-6xl px-6 pt-16 pb-24">
      <p className="text-sm font-medium uppercase tracking-wider text-cyan-400">
        Contact
      </p>
      {/* clamp floor lowered from the site's usual 2.5rem (HeroSection's h1) to 2rem so
          it keeps shrinking through the 360–390px range instead of holding at a fixed
          40px there; ceiling unchanged at 4rem, still reached well before desktop
          widths, so desktop rendering is unaffected. */}
      <h1 className="mt-3 font-display text-[clamp(2rem,8vw,4rem)] font-bold tracking-tight">
        Let&apos;s talk.
      </h1>
      <p className="mt-4 max-w-2xl text-muted">
        Reach out directly or book time on my calendar. Tell me what you are
        building and I will come back with a scope, a timeline, and a price.
      </p>

      <div className="mt-12">
        <ContactPageBody />
      </div>
    </section>
  );
}
