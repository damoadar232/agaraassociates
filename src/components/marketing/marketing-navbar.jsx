import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { useState } from "react";
import { AgaraLogo } from "@/components/marketing/agara-logo";
import { MARKETING_NAV_LINKS } from "@/components/marketing/data";
import "@/assets/styles/components/MarketingNavbar.scss";

export function MarketingNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="marketing-navbar">
      <nav className="marketing-navbar__nav">
        <AgaraLogo />

        <ul className="marketing-navbar__links">
          {MARKETING_NAV_LINKS.map((link) => (
            <li key={link.href}>
              <NavLink
                to={link.href}
                end={link.href === "/"}
                className={({ isActive }) =>
                  `marketing-navbar__link${
                    isActive ? " marketing-navbar__link--active" : ""
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="marketing-navbar__actions">
          <Link to="/login" className="marketing-navbar__login">
            Login
          </Link>
          <Link
            to="/login?redirect=/dashboard"
            className="marketing-navbar__cta"
          >
            Start Your Project
            <ArrowRight className="marketing-navbar__cta-icon" strokeWidth={1.5} />
          </Link>
          <button
            type="button"
            className="marketing-navbar__menu-btn"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? (
              <X className="marketing-navbar__menu-icon" />
            ) : (
              <Menu className="marketing-navbar__menu-icon" />
            )}
          </button>
        </div>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="marketing-navbar__mobile-menu"
        >
          <ul className="marketing-navbar__mobile-list">
            {MARKETING_NAV_LINKS.map((link) => (
              <li key={link.href}>
                <NavLink
                  to={link.href}
                  end={link.href === "/"}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `marketing-navbar__mobile-link${
                      isActive ? " marketing-navbar__mobile-link--active" : ""
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
            <li>
              <Link
                to="/login"
                className="marketing-navbar__mobile-link"
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
