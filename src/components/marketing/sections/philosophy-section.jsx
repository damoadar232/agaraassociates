import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Building2, Compass, Infinity, Users2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { fadeUp } from "@/components/marketing/motion";
import { PHILOSOPHY_PILLARS } from "@/components/marketing/data";

const ICONS = { Building2, Compass, Infinity, Users2 };

export function PhilosophySection() {
  return (
    <section className="px-6 pt-8 pb-0 lg:px-10">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="mx-auto grid max-w-[1440px] gap-6 lg:grid-cols-[380px_1fr]"
      >
        <div className="agara-glass rounded-[28px] border border-white/40 px-9 py-8 shadow-agara-soft">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-agara-charcoal/45">
            OUR PHILOSOPHY
          </p>
          <h2 className="mt-2 font-serif text-[2rem] leading-[1.08] text-agara-charcoal">
            No two projects.
            <br />
            No repeated ideas.
          </h2>
          <p className="mt-2 max-w-[285px] text-[12px] leading-[1.8] text-agara-charcoal/65">
            Every site is unique. Every client is unique.
            <br />
            So every design we create is unique.
          </p>
          <Link
            to="/about"
            className="group mt-3 inline-flex items-center gap-3 text-[11px] font-semibold text-agara-charcoal"
          >
            Discover Our Philosophy
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              strokeWidth={1.5}
            />
          </Link>
        </div>

        <div className="agara-glass rounded-[28px] border border-white/40 shadow-agara-soft">
          <div className="grid h-full grid-cols-2 lg:grid-cols-4">
            {PHILOSOPHY_PILLARS.map((pillar, index) => {
              const Icon = ICONS[pillar.icon];
              return (
                <div
                  key={pillar.title}
                  className={cn(
                    "flex flex-col items-center justify-center px-6 py-8 text-center",
                    index !== 0 && "border-l border-agara-charcoal/[0.06]",
                    index >= 2 &&
                      "border-t border-agara-charcoal/[0.06] lg:border-t-0"
                  )}
                >
                  <Icon
                    className="h-6 w-6 text-agara-charcoal/45"
                    strokeWidth={1}
                  />
                  <h3 className="mt-4 font-serif text-[16px] leading-tight text-agara-charcoal">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 max-w-[150px] text-[11px] leading-[1.75] text-agara-charcoal/60">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
