import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Clock,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { fadeUp } from "@/components/marketing/motion";
import { PinterestIcon } from "@/components/marketing/icons";
import {
  BUDGET_OPTIONS,
  PROJECT_TYPE_OPTIONS,
  STUDIO_ADDRESS,
  TIMELINE_OPTIONS,
} from "@/components/marketing/contact/contact-content";
import "@/assets/styles/components/ContactMain.scss";

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

const itemFade = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

export function ContactMain() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="inquiry" className="contact-main">
      <div className="contact-main__grid">
        <motion.aside
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          className="contact-main__aside agara-glass"
        >
          <p className="contact-main__section-label">Contact Information</p>
          <h2 className="contact-main__heading">Reach the studio</h2>

          <ul className="contact-main__info-list">
            <li className="contact-main__info-item">
              <MapPin
                className="contact-main__info-icon"
                strokeWidth={1.5}
              />
              <div>
                <p className="contact-main__label">Visit</p>
                <p className="contact-main__info-text contact-main__info-text--relaxed">
                  {STUDIO_ADDRESS.lines.map((line) => (
                    <span key={line} className="contact-main__info-line">
                      {line}
                    </span>
                  ))}
                </p>
              </div>
            </li>
            <li className="contact-main__info-item">
              <Mail className="contact-main__info-icon" strokeWidth={1.5} />
              <div>
                <p className="contact-main__label">Email</p>
                <a
                  href={`mailto:${STUDIO_ADDRESS.email}`}
                  className="contact-main__info-link"
                >
                  {STUDIO_ADDRESS.email}
                </a>
              </div>
            </li>
            <li className="contact-main__info-item">
              <Phone className="contact-main__info-icon" strokeWidth={1.5} />
              <div>
                <p className="contact-main__label">Phone</p>
                <a
                  href={`tel:${STUDIO_ADDRESS.phone.replace(/\s/g, "")}`}
                  className="contact-main__info-link"
                >
                  {STUDIO_ADDRESS.phone}
                </a>
              </div>
            </li>
            <li className="contact-main__info-item">
              <Clock className="contact-main__info-icon" strokeWidth={1.5} />
              <div>
                <p className="contact-main__label">Office Hours</p>
                <p className="contact-main__info-text">
                  {STUDIO_ADDRESS.hours}
                </p>
              </div>
            </li>
          </ul>

          <div className="contact-main__socials">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="contact-main__social-link"
            >
              <Instagram className="contact-main__social-icon" strokeWidth={1.5} />
            </a>
            <a
              href="https://pinterest.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Pinterest"
              className="contact-main__social-link"
            >
              <PinterestIcon className="contact-main__social-icon" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="contact-main__social-link"
            >
              <Linkedin className="contact-main__social-icon" strokeWidth={1.5} />
            </a>
          </div>
        </motion.aside>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="contact-main__form-panel agara-glass"
        >
          <motion.p variants={itemFade} className="contact-main__section-label">
            Inquiry
          </motion.p>
          <motion.h2 variants={itemFade} className="contact-main__heading">
            Tell us about your project
          </motion.h2>

          {submitted ? (
            <motion.p variants={itemFade} className="contact-main__success">
              Thank you. We&apos;ve received your inquiry and will respond
              shortly.
            </motion.p>
          ) : (
            <form onSubmit={handleSubmit} className="contact-main__form">
              <motion.label
                variants={itemFade}
                className="contact-main__field contact-main__field--half"
              >
                <span className="contact-main__label">Full Name</span>
                <input
                  required
                  name="fullName"
                  className="contact-main__input"
                  placeholder="Your name"
                />
              </motion.label>
              <motion.label
                variants={itemFade}
                className="contact-main__field contact-main__field--half"
              >
                <span className="contact-main__label">Email</span>
                <input
                  required
                  type="email"
                  name="email"
                  className="contact-main__input"
                  placeholder="you@example.com"
                />
              </motion.label>
              <motion.label
                variants={itemFade}
                className="contact-main__field contact-main__field--half"
              >
                <span className="contact-main__label">Phone</span>
                <input
                  name="phone"
                  className="contact-main__input"
                  placeholder="+91 …"
                />
              </motion.label>
              <motion.label
                variants={itemFade}
                className="contact-main__field contact-main__field--half"
              >
                <span className="contact-main__label">Project Type</span>
                <select
                  name="projectType"
                  className="contact-main__input"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select type
                  </option>
                  {PROJECT_TYPE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </motion.label>
              <motion.label
                variants={itemFade}
                className="contact-main__field contact-main__field--half"
              >
                <span className="contact-main__label">Budget</span>
                <select name="budget" className="contact-main__input" defaultValue="">
                  <option value="" disabled>
                    Select range
                  </option>
                  {BUDGET_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </motion.label>
              <motion.label
                variants={itemFade}
                className="contact-main__field contact-main__field--half"
              >
                <span className="contact-main__label">Timeline</span>
                <select name="timeline" className="contact-main__input" defaultValue="">
                  <option value="" disabled>
                    Select timeline
                  </option>
                  {TIMELINE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </motion.label>
              <motion.label
                variants={itemFade}
                className="contact-main__field contact-main__field--full"
              >
                <span className="contact-main__label">Project Details</span>
                <textarea
                  name="details"
                  rows={5}
                  className="contact-main__input contact-main__input--textarea"
                  placeholder="Share site context, program, and what success looks like…"
                />
              </motion.label>
              <motion.div
                variants={itemFade}
                className="contact-main__submit-wrap"
              >
                <button type="submit" className="contact-main__submit">
                  Send Inquiry
                  <ArrowRight
                    className="contact-main__submit-icon"
                    strokeWidth={1.5}
                  />
                </button>
              </motion.div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
