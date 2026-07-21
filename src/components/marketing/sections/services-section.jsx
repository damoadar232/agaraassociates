import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Armchair, ArrowRight, Box, Grid3x3, Trees } from "lucide-react";
import { fadeUp } from "@/components/marketing/motion";
import { SERVICE_ITEMS } from "@/components/marketing/data";

const ICONS = { Box, Armchair, Trees, Grid3x3 };

export function ServicesSection({ variant = "home" }) {
  const isPage = variant === "page";

  return (
    <section
      id="services"
      className={
        isPage
          ? "relative z-20 px-6 pb-0 pt-28 lg:px-10 lg:pt-32"
          : "relative z-20 -mt-24 px-6 pb-0 lg:-mt-28 lg:px-10"
      }
    >
      <div className="mx-auto max-w-[1400px]">
        {isPage && (
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-agara-charcoal/45">
                What We Do
              </p>
              <h1 className="mt-2 font-serif text-3xl leading-tight text-agara-charcoal lg:text-4xl">
                Services
              </h1>
            </div>
            <Link
              to="/contact"
              className="agara-glass inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-agara-charcoal shadow-agara-soft transition-transform duration-300 hover:scale-[1.02]"
            >
              Get In Touch
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        )}

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="agara-glass rounded-[32px] border border-white/50 bg-[#F7F4EF]/55 shadow-agara-soft backdrop-blur-[28px]"
        >
          <div className="grid divide-y divide-agara-charcoal/10 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
            {SERVICE_ITEMS.map((item) => {
              const Icon = ICONS[item.icon];
              return (
                <div
                  key={item.title}
                  className="flex flex-col items-center px-6 py-6 text-center transition-colors duration-300 hover:bg-white/25 lg:px-8 lg:py-6"
                >
                  <Icon
                    className="h-8 w-8 text-agara-charcoal/50"
                    strokeWidth={1}
                    aria-hidden
                  />
                  <h3 className="mt-2 font-serif text-lg text-agara-charcoal lg:text-xl">
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-[200px] text-[12px] leading-relaxed text-agara-charcoal/60 lg:text-[13px]">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
