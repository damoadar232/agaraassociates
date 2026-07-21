import { Link } from "react-router-dom";
import { Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { AgaraLogo } from "@/components/marketing/agara-logo";
import { PinterestIcon } from "@/components/marketing/icons";
import {
  FOOTER_SERVICES,
  MARKETING_NAV_LINKS,
} from "@/components/marketing/data";

export function MarketingFooter() {
  return (
    <footer className="relative z-10 mt-10">
      <div className="agara-glass mx-auto max-w-[1440px] overflow-hidden rounded-[10px] shadow-agara-soft">
        <div className="grid gap-10 sm:px-8 lg:grid-cols-[1.2fr_1fr_1fr_1.1fr] lg:gap-8 lg:px-10 lg:py-8">
          <div>
            <AgaraLogo />
            <p className="mt-5 max-w-xs text-[13px] leading-relaxed text-agara-charcoal/65">
              A multidisciplinary design practice crafting architecture,
              interiors, landscapes, and construction with contextual clarity
              and timeless restraint.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-agara-charcoal/15 bg-white/35 text-agara-charcoal/70 transition-colors hover:text-agara-charcoal"
              >
                <Instagram className="h-3.5 w-3.5" strokeWidth={1.5} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-agara-charcoal/15 bg-white/35 text-agara-charcoal/70 transition-colors hover:text-agara-charcoal"
              >
                <Linkedin className="h-3.5 w-3.5" strokeWidth={1.5} />
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Pinterest"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-agara-charcoal/15 bg-white/35 text-agara-charcoal/70 transition-colors hover:text-agara-charcoal"
              >
                <PinterestIcon className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-agara-charcoal/45">
              Quick Links
            </p>
            <ul className="mt-4 space-y-2.5">
              {MARKETING_NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-[13px] text-agara-charcoal/70 transition-colors hover:text-agara-charcoal"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-agara-charcoal/45">
              Services
            </p>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_SERVICES.map((service) => (
                <li key={service}>
                  <Link
                    to="/services"
                    className="text-[13px] text-agara-charcoal/70 transition-colors hover:text-agara-charcoal"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-agara-charcoal/45">
              Contact
            </p>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="tel:+919000000000"
                  className="inline-flex items-center gap-2.5 text-[13px] text-agara-charcoal/70 transition-colors hover:text-agara-charcoal"
                >
                  <Phone className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} />
                  +91 9XXXXXXXX
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@agara.in"
                  className="inline-flex items-center gap-2.5 text-[13px] text-agara-charcoal/70 transition-colors hover:text-agara-charcoal"
                >
                  <Mail className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} />
                  hello@agara.in
                </a>
              </li>
              <li className="inline-flex items-center gap-2.5 text-[13px] text-agara-charcoal/70">
                <MapPin className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} />
                Hyderabad, India
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-agara-charcoal/8 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
          <p className="text-[11px] text-agara-charcoal/50">
            © {new Date().getFullYear()} AGARA Architects. All rights reserved.
          </p>
          <p className="text-[11px] text-agara-charcoal/50">
            Designed &amp; Developed by AGARA Architects
          </p>
        </div>
      </div>
    </footer>
  );
}
