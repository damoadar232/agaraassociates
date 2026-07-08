"use client";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Armchair,
  ArrowRight,
  Box,
  Flag,
  Globe,
  Grid3x3,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Phone,
  Play,
  Trees,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";

const NAV_LINKS = [
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Journal", href: "#journal" },
  { label: "Contact", href: "#contact" },
];

const FEATURED_PROJECTS = [
  {
    title: "Casa Palo Alto",
    category: "Residential",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "The Meridian",
    category: "Commercial",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Atrium House",
    category: "Residential",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Courtyard",
    category: "Hospitality",
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=600&q=80",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function PinterestIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
    </svg>
  );
}

function AgaraLogo() {
  return (
    <Link to="/" className="flex items-center gap-3 shrink-0">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-agara-charcoal/15 bg-white/30">
        <span className="font-serif text-sm font-semibold tracking-tight text-agara-charcoal">AR</span>
      </div>
      <span className="hidden sm:block text-[11px] font-medium uppercase tracking-[0.22em] text-agara-charcoal">
        Agara Architects
      </span>
    </Link>
  );
}

function LandingNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-50 shrink-0 px-6 lg:px-10 pt-5 lg:pt-6">
      <nav className="mx-auto flex h-14 max-w-[1440px] items-center">
        <AgaraLogo />

        <ul className="hidden lg:flex flex-1 items-center justify-center gap-8 xl:gap-10">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-[11px] font-medium uppercase tracking-[0.18em] text-agara-charcoal/70 transition-colors duration-300 hover:text-agara-charcoal"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-3">
          <Link
            to="/login"
            className="hidden sm:inline-flex text-[11px] font-medium uppercase tracking-[0.14em] text-agara-charcoal/60 transition-colors hover:text-agara-charcoal px-3 py-2"
          >
            Login
          </Link>
          <Link
            to="/login?redirect=/dashboard"
            className="hidden md:inline-flex items-center gap-2 rounded-full border border-agara-charcoal/20 bg-white/25 px-5 py-2 text-[11px] font-medium uppercase tracking-[0.12em] text-agara-charcoal backdrop-blur-md transition-all duration-300 hover:bg-white/45"
          >
            Start Your Project
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
          <button
            type="button"
            className="lg:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border border-agara-charcoal/15 bg-white/30"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
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
          <ul className="space-y-3">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-sm font-medium text-agara-charcoal" onClick={() => setOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <Link to="/login" className="text-sm font-medium text-agara-charcoal" onClick={() => setOpen(false)}>
                Login
              </Link>
            </li>
          </ul>
        </motion.div>
      )}
    </header>
  );
}

function SocialScrollBar() {
  return (
    <aside className="absolute right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-5 lg:flex xl:right-8">
      <div className="agara-glass flex flex-col items-center gap-3.5 rounded-full px-2.5 py-4">
        <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="text-agara-charcoal/65 transition-colors hover:text-agara-charcoal">
          <Instagram className="h-3.5 w-3.5" strokeWidth={1.5} />
        </a>
        <a href="https://pinterest.com" target="_blank" rel="noreferrer" aria-label="Pinterest" className="text-agara-charcoal/65 transition-colors hover:text-agara-charcoal">
          <PinterestIcon className="h-3.5 w-3.5" />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-agara-charcoal/65 transition-colors hover:text-agara-charcoal">
          <Linkedin className="h-3.5 w-3.5" strokeWidth={1.5} />
        </a>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="h-8 w-px bg-agara-charcoal/20" />
        <p className="text-[9px] uppercase tracking-[0.35em] text-agara-charcoal/45 [writing-mode:vertical-rl] rotate-180">
          Scroll
        </p>
      </div>
    </aside>
  );
}

function FeaturedProjectCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="agara-glass w-full max-w-[380px] rounded-[32px] p-6 lg:p-7"
    >
      <div className="flex items-start gap-4">
        <button
          type="button"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/50 bg-white/20 backdrop-blur-md transition-transform duration-300 hover:scale-105"
          aria-label="Play project film"
        >
          <Play className="ml-0.5 h-4 w-4 fill-agara-charcoal text-agara-charcoal" />
        </button>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] uppercase tracking-[0.2em] text-agara-charcoal/50">Featured Project</p>
          <p className="mt-1 font-serif text-2xl leading-tight text-agara-charcoal">Casa Aranya</p>
          <p className="mt-1 text-xs text-agara-charcoal/55">Hyderabad, India</p>
        </div>
      </div>
      <Link
        to="#projects"
        className="mt-5 inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.16em] text-agara-charcoal/65 transition-colors hover:text-agara-charcoal"
      >
        View Project
        <ArrowRight className="h-3 w-3" strokeWidth={1.5} />
      </Link>
    </motion.div>
  );
}

function FeaturedProjectsBar() {
  return (
    <motion.div
      id="projects"
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      transition={{ delay: 0.35 }}
      className="agara-glass relative z-20 mx-6 mb-4 shrink-0 rounded-[28px] px-5 py-3.5 lg:mx-10 lg:mb-5 lg:px-8 lg:py-4"
    >
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-8">
        <div className="shrink-0 lg:w-[220px] xl:w-[260px]">
          <h2 className="font-serif text-xl leading-tight text-agara-charcoal lg:text-2xl">Featured Projects</h2>
          <p className="mt-2 text-[11px] leading-relaxed text-agara-charcoal/60 lg:text-xs">
            A curated selection of our most recent architectural and interior design work.
          </p>
          <Link
            to="#projects"
            className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.14em] text-agara-charcoal/65 transition-colors hover:text-agara-charcoal"
          >
            View All Projects
            <ArrowRight className="h-3 w-3" strokeWidth={1.5} />
          </Link>
        </div>

        <div className="grid flex-1 grid-cols-2 gap-3 sm:grid-cols-4 lg:gap-4">
          {FEATURED_PROJECTS.map((project) => (
            <article key={project.title} className="group cursor-pointer">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/25 bg-white/10">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="mt-2 flex items-start justify-between gap-1">
                <div className="min-w-0">
                  <h3 className="truncate font-serif text-sm text-agara-charcoal">{project.title}</h3>
                  <p className="text-[10px] text-agara-charcoal/50">{project.category}</p>
                </div>
                <ArrowRight className="mt-0.5 h-3 w-3 shrink-0 text-agara-charcoal/35 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-agara-charcoal/60" strokeWidth={1.5} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function HeroViewport() {
  return (
    <section className="relative flex min-h-[100dvh] flex-col overflow-hidden lg:h-screen lg:max-h-[100dvh] lg:min-h-[640px]">
      {/* Warm cream base + architectural image */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-agara-cream agara-texture" />
        <div className="absolute inset-y-0 right-0 w-full lg:w-[58%] xl:w-[55%]">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85"
            alt="Casa Aranya — luxury residence by AGARA Architects"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#F7F4EF] via-[#F7F4EF]/40 to-transparent lg:from-[#F7F4EF]/90 lg:via-transparent lg:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#F7F4EF]/30 via-transparent to-transparent" />
        </div>
      </div>

      <LandingNav />
      <SocialScrollBar />

      {/* Hero middle — fills space between nav and bottom bar */}
      <div className="relative z-10 flex min-h-0 flex-1 flex-col justify-center px-6 py-10 lg:px-10 lg:py-0">
        <div className="mx-auto grid w-full max-w-[1440px] items-center gap-8 lg:grid-cols-12 lg:gap-6">
          <motion.div
            className="lg:col-span-5 xl:col-span-4"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            <h1 className="font-serif text-[clamp(2.25rem,4.2vw,3.75rem)] leading-[1.05] tracking-[-0.02em] text-agara-charcoal">
              Designing Spaces That Endure
            </h1>
            <p className="mt-5 max-w-sm text-[13px] leading-relaxed text-agara-charcoal/65 lg:text-sm">
              We craft architectural and interior environments defined by proportion, material honesty, and timeless
              design language.
            </p>
            <Link
              to="#projects"
              className="group mt-6 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-agara-charcoal/75 transition-colors hover:text-agara-charcoal"
            >
              Explore Our Work
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={1.5} />
            </Link>
          </motion.div>

          <div className="flex justify-start lg:col-span-7 lg:col-start-6 xl:col-span-5 xl:col-start-7 lg:justify-center xl:justify-end xl:pr-16">
            <FeaturedProjectCard />
          </div>
        </div>
      </div>

      <FeaturedProjectsBar />
    </section>
  );
}

const ABOUT_PILLARS = [
  {
    icon: Globe,
    title: "Context",
    description: "We design with sensitivity to place, climate and culture.",
  },
  {
    icon: Users,
    title: "Purpose",
    description: "Every space is intentional, functional and future-ready.",
  },
  {
    icon: Flag,
    title: "Commitment",
    description: "We are committed to quality, integrity and lasting relationships.",
  },
] as const;

function AboutSection() {
  return (
    <section id="about" className="px-6 pt-8 pb-0 lg:px-10">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
        className="agara-glass mx-auto max-w-[1440px] overflow-hidden rounded-[32px] shadow-agara-soft"
      >
        <div className="flex flex-col lg:min-h-[300px] lg:flex-row">
          {/* Architectural image with right-edge fade */}
          <div className="relative h-56 w-full shrink-0 overflow-hidden lg:h-auto lg:w-[26%] xl:w-[24%]">
            <img
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=85"
              alt="AGARA Architects — interior corridor with natural light"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#F7F4EF]/15 to-[#F7F4EF]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#F7F4EF]/50 via-transparent to-transparent lg:hidden" />
          </div>

          {/* Intro copy */}
          <div className="flex flex-1 flex-col justify-center border-b border-agara-charcoal/8 px-7 py-8 lg:border-b-0 lg:px-8 lg:py-10 xl:px-10">
            <h2 className="font-serif text-[clamp(1.75rem,2.5vw,2.125rem)] leading-tight text-agara-charcoal">
              About AGARA
            </h2>
            <span className="mt-3 block h-px w-14 bg-agara-charcoal/25" aria-hidden />
            <p className="mt-5 max-w-[420px] text-[13px] leading-[1.75] text-agara-charcoal/70 lg:text-sm">
              AGARA Architects is a multidisciplinary design practice based in Hyderabad, creating architecture,
              interiors, landscapes and construction solutions that are contextually rooted, functionally driven and
              aesthetically timeless.
            </p>
            <a
              href="#about"
              className="group mt-6 inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-agara-charcoal/75 transition-colors hover:text-agara-charcoal"
            >
              Our Story
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                strokeWidth={1.5}
              />
            </a>
          </div>

          {/* Three pillars */}
          <div className="grid shrink-0 sm:grid-cols-3 lg:w-[46%] xl:w-[44%]">
            {ABOUT_PILLARS.map((pillar, index) => (
              <div
                key={pillar.title}
                className={`flex flex-col items-center justify-center px-5 py-9 text-center lg:px-4 lg:py-8 xl:px-6 ${index > 0 ? "border-t border-agara-charcoal/8 sm:border-l sm:border-t-0" : ""
                  }`}
              >
                <pillar.icon className="h-7 w-7 text-agara-charcoal/50" strokeWidth={1} aria-hidden />
                <h3 className="mt-5 font-serif text-lg text-agara-charcoal">{pillar.title}</h3>
                <p className="mt-3 max-w-[190px] text-[11px] leading-relaxed text-agara-charcoal/60">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

const CONTACT_DETAILS = [
  { icon: Phone, label: "+91 9XXXXXXXX", href: "tel:+919000000000" },
  { icon: Mail, label: "hello@agara.in", href: "mailto:hello@agara.in" },
  { icon: MapPin, label: "Hyderabad, India", href: null },
] as const;

function ContactSection() {
  return (
    <section id="contact" className="px-6 pt-8 pb-0 lg:px-10">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
        className="agara-glass relative mx-auto max-w-[1440px] overflow-hidden rounded-[32px] shadow-agara-soft"
      >
        {/* Architectural line-art on the right, faded into the card */}
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[42%] md:block lg:w-[38%]">
          <img
            src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80"
            alt=""
            aria-hidden
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover object-center opacity-25 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#F7F4EF] via-[#F7F4EF]/60 to-transparent" />
        </div>

        <div className="relative z-10 flex flex-col gap-8 px-7 py-8 md:flex-row md:items-center md:gap-10 lg:px-12 lg:py-10">
          {/* Left — heading + CTA */}
          <div className="shrink-0 md:w-[42%] lg:w-[38%]">
            <h2 className="font-serif text-[clamp(1.6rem,2.6vw,2.125rem)] leading-tight text-agara-charcoal">
              Let&rsquo;s create something timeless together.
            </h2>
            <Link
              to="/login?redirect=/dashboard"
              className="group mt-6 inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-agara-charcoal/75 transition-colors hover:text-agara-charcoal"
            >
              Get In Touch
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                strokeWidth={1.5}
              />
            </Link>
          </div>

          {/* Middle — contact details */}
          <div className="flex flex-col gap-4 md:gap-5">
            {CONTACT_DETAILS.map((item) => {
              const content = (
                <>
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center text-agara-charcoal/55">
                    <item.icon className="h-4 w-4" strokeWidth={1.5} aria-hidden />
                  </span>
                  <span className="text-[13px] tracking-wide text-agara-charcoal/75">{item.label}</span>
                </>
              );

              return item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-3 transition-colors hover:text-agara-charcoal [&_span]:hover:text-agara-charcoal"
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
        </div>
      </motion.div>
    </section>
  );
}

function ServicesSection() {
  const items = [
    { icon: Box, title: "Architecture", desc: "Contextual architecture crafted with clarity, function and detail." },
    { icon: Armchair, title: "Interiors", desc: "Interiors that reflect identity and elevate everyday living." },
    { icon: Trees, title: "Landscape", desc: "Outdoor environments that connect nature and architecture." },
    { icon: Grid3x3, title: "Construction", desc: "Precision execution with quality and transparency." },
  ];

  return (
    <section id="services" className="px-6 pt-8 pb-0 lg:px-10">
      <div className="mx-auto grid max-w-[1440px] gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, i) => (
          <motion.div
            key={item.title}
            variants={fadeUp}
            transition={{ delay: i * 0.08 }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col rounded-[28px] border border-white/40 bg-white/25 p-7 shadow-[0_8px_32px_-14px_rgba(34,34,34,0.12)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/35"
          >
            <item.icon className="h-9 w-9 text-agara-charcoal/55" strokeWidth={1} aria-hidden />
            <h3 className="mt-6 font-serif text-xl text-agara-charcoal">{item.title}</h3>
            <p className="mt-3 text-[13px] leading-relaxed text-agara-charcoal/60">{item.desc}</p>
            <a
              href="#contact"
              aria-label={`Learn more about ${item.title}`}
              className="mt-8 inline-flex h-10 w-10 items-center justify-center rounded-full border border-agara-charcoal/15 bg-white/25 text-agara-charcoal/70 transition-all duration-300 hover:bg-white/45 hover:text-agara-charcoal"
            >
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <footer className="px-6 pt-8 pb-0 lg:px-10">
      <div className="agara-glass mx-auto flex max-w-[1440px] flex-col gap-5 rounded-[28px] px-7 py-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="font-serif text-xl text-agara-charcoal">AGARA Architects</p>
          <p className="mt-1 text-sm text-agara-charcoal/60">Hyderabad · Bengaluru · Pan-India commissions</p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <a href="mailto:hello@agaraassociates.com" className="text-sm text-agara-charcoal/65 hover:text-agara-charcoal">
            hello@agaraassociates.com
          </a>
          <Link to="/login" className="rounded-full border border-agara-charcoal/15 bg-white/30 px-5 py-2 text-sm font-medium text-agara-charcoal hover:bg-white/50">
            Client Login
          </Link>
        </div>
      </div>
    </footer>
  );
}

export function AgaraLandingPage() {
  return (
    <div className="agara-page font-inter text-agara-charcoal">
      <HeroViewport />
      <ServicesSection />
      <AboutSection />
      <ContactSection />

      <section id="journal" className="sr-only">Journal</section>
      <FooterSection />
    </div>
  );
}
