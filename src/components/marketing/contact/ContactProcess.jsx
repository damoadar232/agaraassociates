import { motion } from "framer-motion";
import { Compass, Eye, Hammer, Lightbulb, PencilRuler } from "lucide-react";
import { fadeUp } from "@/components/marketing/motion";
import { DESIGN_PROCESS_STEPS } from "@/components/marketing/contact/contact-content";
import "@/assets/styles/components/ContactProcess.scss";

const ICONS = [Compass, Eye, Lightbulb, PencilRuler, Hammer];

const stepVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export function ContactProcess() {
  return (
    <section className="contact-process">
      <div className="contact-process__container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="contact-process__header"
        >
          <p className="contact-process__eyebrow">Our Design Process</p>
          <h2 className="contact-process__title">How We Work</h2>
        </motion.div>

        <div className="contact-process__desktop">
          <div className="contact-process__desktop-track">
            <div className="contact-process__desktop-line" aria-hidden />
            {DESIGN_PROCESS_STEPS.map((step, index) => {
              const Icon = ICONS[index];
              return (
                <motion.div
                  key={step.id}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  variants={stepVariant}
                  className="contact-process__step contact-process__step--desktop"
                >
                  <div className="contact-process__icon-wrap">
                    <Icon
                      className="contact-process__icon"
                      strokeWidth={1.25}
                    />
                  </div>
                  <p className="contact-process__step-id">{step.id}</p>
                  <h3 className="contact-process__step-title">{step.title}</h3>
                  <p className="contact-process__step-desc">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="contact-process__mobile">
          <div className="contact-process__mobile-line" aria-hidden />
          {DESIGN_PROCESS_STEPS.map((step, index) => {
            const Icon = ICONS[index];
            return (
              <motion.div
                key={step.id}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={stepVariant}
                className="contact-process__step contact-process__step--mobile"
              >
                <div className="contact-process__icon-wrap">
                  <Icon className="contact-process__icon" strokeWidth={1.25} />
                </div>
                <div className="contact-process__mobile-content">
                  <p className="contact-process__step-id">{step.id}</p>
                  <h3 className="contact-process__step-title">{step.title}</h3>
                  <p className="contact-process__step-desc">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
