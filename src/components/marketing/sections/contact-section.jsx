import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import ContactSectionImage from "../../../../public/ContactSectionImage.png";
import { fadeUp } from "@/components/marketing/motion";
import { CONTACT_DETAILS } from "@/components/marketing/data";

const ICONS = { Phone, Mail, MapPin };

export function ContactSection({ variant = "home" }) {
  const isPage = variant === "page";

  return (
    <section
      id="contact"
      className={
        isPage
          ? "mb-12 px-6 pb-0 pt-28 lg:px-10 lg:pt-32"
          : "px-6 pt-8 pb-0 lg:px-10 mb-12"
      }
    >
      <div className="mx-auto max-w-[1440px]">
        {isPage && (
          <div className="mb-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-agara-charcoal/45">
              Start a Conversation
            </p>
            <h1 className="mt-2 font-serif text-3xl leading-tight text-agara-charcoal lg:text-4xl">
              Contact
            </h1>
          </div>
        )}

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="agara-glass overflow-hidden rounded-[32px] shadow-agara-soft"
        >
          <div className="flex flex-col lg:flex-row">
            <div className="flex flex-col justify-center border-b border-agara-charcoal/8 px-6 py-2 lg:w-[36%] lg:border-b-0 lg:border-r lg:px-8 lg:py-3">
              <h2 className="font-serif text-[clamp(1.25rem,1.8vw,1.55rem)] leading-tight text-agara-charcoal">
                Let&apos;s create something timeless together.
              </h2>
              <Link
                to={isPage ? "/login?redirect=/dashboard" : "/contact"}
                className="group mt-1 inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-agara-charcoal/75 transition-colors hover:text-agara-charcoal"
              >
                Get In Touch
                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                  strokeWidth={1.5}
                />
              </Link>
            </div>

            <div className="flex flex-col justify-center gap-1.5 border-b border-agara-charcoal/8 px-6 py-2 lg:w-[30%] lg:border-b-0 lg:border-r lg:px-7 lg:py-3">
              {CONTACT_DETAILS.map((item) => {
                const Icon = ICONS[item.icon];
                const content = (
                  <>
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center text-agara-charcoal/55">
                      <Icon
                        className="h-4 w-4"
                        strokeWidth={1.5}
                        aria-hidden
                      />
                    </span>
                    <span className="text-[11px] text-agara-charcoal/75">
                      {item.label}
                    </span>
                  </>
                );
                return item.href ? (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-3 transition-colors hover:text-agara-charcoal"
                  >
                    {content}
                  </a>
                ) : (
                  <div key={item.label} className="flex items-center gap-3">
                    {content}
                  </div>
                );
              })}
            </div>

            <div className="relative h-40 overflow-hidden lg:h-[180px] lg:w-[34%]">
              <img
                src={ContactSectionImage}
                alt="Architectural blueprint"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </motion.div>

        {isPage && (
          <motion.form
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="agara-glass mt-6 grid gap-4 rounded-[28px] p-6 shadow-agara-soft sm:grid-cols-2 sm:p-8"
            onSubmit={(e) => e.preventDefault()}
          >
            <label className="block sm:col-span-1">
              <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-agara-charcoal/50">
                Name
              </span>
              <input
                type="text"
                name="name"
                className="mt-2 w-full rounded-2xl border border-agara-charcoal/10 bg-white/40 px-4 py-3 text-sm text-agara-charcoal outline-none backdrop-blur-md transition-colors focus:border-agara-charcoal/25"
              />
            </label>
            <label className="block sm:col-span-1">
              <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-agara-charcoal/50">
                Email
              </span>
              <input
                type="email"
                name="email"
                className="mt-2 w-full rounded-2xl border border-agara-charcoal/10 bg-white/40 px-4 py-3 text-sm text-agara-charcoal outline-none backdrop-blur-md transition-colors focus:border-agara-charcoal/25"
              />
            </label>
            <label className="block sm:col-span-2">
              <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-agara-charcoal/50">
                Message
              </span>
              <textarea
                name="message"
                rows={4}
                className="mt-2 w-full resize-none rounded-2xl border border-agara-charcoal/10 bg-white/40 px-4 py-3 text-sm text-agara-charcoal outline-none backdrop-blur-md transition-colors focus:border-agara-charcoal/25"
              />
            </label>
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-agara-charcoal px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-agara-cream transition-transform duration-300 hover:scale-[1.03]"
              >
                Send Message
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </button>
            </div>
          </motion.form>
        )}
      </div>
    </section>
  );
}
