import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { AgaraLogo } from "@/components/marketing/agara-logo";
import { MARKETING_NAV_LINKS } from "@/components/marketing/data";

export function MarketingNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[60] px-6 border-b border-agara-charcoal/10 bg-[#F7F4EF]/85 py-2 shadow-[0_4px_24px_-12px_rgba(34,34,34,0.25)] backdrop-blur-xl transition-all duration-300 lg:px-10 lg:py-2"
      )}
    >
      <nav className="mx-auto flex h-12 max-w-[1440px] items-center">
        <AgaraLogo />

        <ul className="hidden lg:flex flex-1 items-center justify-center gap-8 xl:gap-10">
          {MARKETING_NAV_LINKS.map((link) => (
            <li key={link.href}>
              <NavLink
                to={link.href}
                end={link.href === "/"}
                className={({ isActive }) =>
                  cn(
                    "relative text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors duration-300 after:absolute after:-bottom-1.5 after:left-0 after:h-px after:bg-agara-charcoal after:transition-all after:duration-300",
                    isActive
                      ? "text-agara-charcoal after:w-full"
                      : "text-agara-charcoal/80 hover:text-agara-charcoal after:w-0 hover:after:w-full"
                  )
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-3">
          <Link
            to="/login"
            className="hidden sm:inline-flex text-[11px] font-semibold uppercase tracking-[0.14em] text-agara-charcoal/75 transition-colors hover:text-agara-charcoal px-3 py-2"
          >
            Login
          </Link>
          <Link
            to="/login?redirect=/dashboard"
            className="hidden md:inline-flex items-center gap-2 rounded-full border border-agara-charcoal/25 bg-white/30 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-agara-charcoal backdrop-blur-md transition-all duration-300 hover:bg-white/50"
          >
            Start Your Project
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
          <button
            type="button"
            className="lg:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border border-agara-charcoal/20 bg-white/40 text-agara-charcoal"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="agara-glass mx-auto mt-2 max-w-[1440px] rounded-[24px] p-5 lg:hidden"
        >
          <ul className="space-y-1">
            {MARKETING_NAV_LINKS.map((link) => (
              <li key={link.href}>
                <NavLink
                  to={link.href}
                  end={link.href === "/"}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "block rounded-xl px-3 py-2 text-sm font-semibold transition-colors",
                      isActive
                        ? "bg-white/45 text-agara-charcoal"
                        : "text-agara-charcoal/80 hover:bg-white/30 hover:text-agara-charcoal"
                    )
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
            <li>
              <Link
                to="/login"
                className="block rounded-xl px-3 py-2 text-sm font-semibold text-agara-charcoal/80 transition-colors hover:bg-white/30 hover:text-agara-charcoal"
                onClick={() => setOpen(false)}
              >
                Login
              </Link>
            </li>
          </ul>
        </motion.div>
      )}
    </header>
  );
}
