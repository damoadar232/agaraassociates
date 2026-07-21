import { Instagram, Linkedin } from "lucide-react";
import { PinterestIcon } from "@/components/marketing/icons";

export function SocialScrollBar() {
  return (
    <aside className="absolute right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-5 lg:flex xl:right-8">
      <div className="agara-glass flex flex-col items-center gap-3.5 rounded-full px-2.5 py-3">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
          aria-label="Instagram"
          className="text-agara-charcoal/65 transition-colors hover:text-agara-charcoal"
        >
          <Instagram className="h-3.5 w-3.5" strokeWidth={1.5} />
        </a>
        <a
          href="https://pinterest.com"
          target="_blank"
          rel="noreferrer"
          aria-label="Pinterest"
          className="text-agara-charcoal/65 transition-colors hover:text-agara-charcoal"
        >
          <PinterestIcon className="h-3.5 w-3.5" />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
          className="text-agara-charcoal/65 transition-colors hover:text-agara-charcoal"
        >
          <Linkedin className="h-3.5 w-3.5" strokeWidth={1.5} />
        </a>
        <div className="flex flex-col items-center gap-2">
          <span className="h-8 w-px bg-agara-charcoal/20" />
        </div>
      </div>
    </aside>
  );
}
