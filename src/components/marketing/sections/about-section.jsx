import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Flag, Globe, Users } from "lucide-react";
import { fadeUp } from "@/components/marketing/motion";
import { ABOUT_PILLARS } from "@/components/marketing/data";
import { PhilosophySection } from "@/components/marketing/sections/philosophy-section";

const ICONS = { Globe, Users, Flag };

export function AboutSection({ variant = "home" }) {
  const isPage = variant === "page";

  return (
    <>
      <section
        id="about"
        className={
          isPage
            ? "px-6 pb-0 pt-28 lg:px-10 lg:pt-32"
            : "px-6 pt-8 pb-0 lg:px-10"
        }
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="agara-glass mx-auto max-w-[1440px] overflow-hidden rounded-[32px] shadow-agara-soft"
        >
          <div className="flex flex-col lg:min-h-[260px] lg:flex-row">
            <div className="relative h-52 w-full shrink-0 overflow-hidden lg:h-auto lg:w-[26%] xl:w-[24%]">
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=85"
                alt="AGARA Architects — interior corridor with natural light"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#F7F4EF]/15 to-[#F7F4EF]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#F7F4EF]/50 via-transparent to-transparent lg:hidden" />
            </div>

            <div className="flex flex-1 flex-col justify-center border-b border-agara-charcoal/8 px-4 py-5 lg:border-b-0 lg:px-8 lg:py-6 xl:px-9">
              <h2 className="font-serif text-[clamp(1.75rem,2.5vw,2.125rem)] leading-tight text-agara-charcoal">
                About AGARA
              </h2>
              <span
                className="mt-2 block h-px w-14 bg-agara-charcoal/25"
                aria-hidden
              />
              <p className="mt-4 max-w-[420px] text-[13px] leading-[1.7] text-agara-charcoal/70 lg:text-sm">
                AGARA Architects is a multidisciplinary design practice based in
                Hyderabad, creating architecture, interiors, landscapes and
                construction solutions that are contextually rooted, functionally
                driven and aesthetically timeless.
              </p>
              <Link
                to={isPage ? "/contact" : "/about"}
                className="group mt-4 inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-agara-charcoal/75 transition-colors hover:text-agara-charcoal"
              >
                {isPage ? "Learn More" : "Our Story"}
                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                  strokeWidth={1.5}
                />
              </Link>
            </div>

            <div className="grid shrink-0 sm:grid-cols-3 lg:w-[46%] xl:w-[44%]">
              {ABOUT_PILLARS.map((pillar, index) => {
                const Icon = ICONS[pillar.icon];
                return (
                  <div
                    key={pillar.title}
                    className={`flex flex-col items-center justify-center px-5 py-4 text-center lg:px-4 lg:py-5 xl:px-5 ${
                      index > 0
                        ? "border-t border-agara-charcoal/8 sm:border-l sm:border-t-0"
                        : ""
                    }`}
                  >
                    <Icon
                      className="h-6 w-6 text-agara-charcoal/50"
                      strokeWidth={1}
                      aria-hidden
                    />
                    <h3 className="mt-3 font-serif text-[17px] leading-tight text-agara-charcoal">
                      {pillar.title}
                    </h3>
                    <p className="mt-2 max-w-[180px] text-[11px] leading-relaxed text-agara-charcoal/60">
                      {pillar.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </section>

      {isPage && <PhilosophySection />}
    </>
  );
}
