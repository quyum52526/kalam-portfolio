import Image from "next/image";
import Link from "next/link";
import SocialIcons from "./SocialIcons";
import {
  footerPortfolioLinks,
  footerHireMeLinks,
  footerContactLinks,
  type FooterLink,
} from "@/data/footer";

const LINK_CLASS =
  "inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-text-body hover:underline hover:underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950";
const HEADING_CLASS =
  "mb-4 text-sm font-medium uppercase tracking-wider text-muted";

function ExternalLinkList({ links }: { links: FooterLink[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {links.map((link) => {
        const isMailto = link.href.startsWith("mailto:");
        const Icon = link.icon;
        return (
          <li key={link.href}>
            <a
              href={link.href}
              target={isMailto ? undefined : "_blank"}
              rel={isMailto ? undefined : "noopener noreferrer"}
              className={LINK_CLASS}
            >
              {Icon && <Icon size={16} aria-hidden />}
              {link.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-border bg-navy-950 py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="inline-block">
              <Image
                src="/Brand Identity/kalam52526-logo-stacked-dark.svg"
                alt="kalam52526"
                width={178}
                height={120}
                className="h-20 w-auto object-contain"
              />
            </Link>
            <p className="mt-4 text-sm text-muted">GAP: confirm tagline</p>
            <SocialIcons className="mt-5" />
          </div>

          <nav aria-label="Portfolio">
            <h3 className={HEADING_CLASS}>Portfolio</h3>
            <ul className="flex flex-col gap-3">
              {footerPortfolioLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={LINK_CLASS}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Hire me">
            <h3 className={HEADING_CLASS}>Hire Me</h3>
            <ExternalLinkList links={footerHireMeLinks} />
          </nav>

          <nav aria-label="Contact">
            <h3 className={HEADING_CLASS}>Contact</h3>
            <ExternalLinkList links={footerContactLinks} />
          </nav>
        </div>

        <div className="mt-12 border-t border-border pt-6 text-sm text-muted">
          <p>
            &copy; {new Date().getFullYear()} Abu Kalam Khandaker. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
