import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { useState } from "react";
import HeroImage from "../../../../public/HeroImage.png";
import { fadeUp } from "@/components/marketing/motion";
import { SocialScrollBar } from "@/components/marketing/social-scroll-bar";
import { VideoModal } from "@/components/marketing/video-modal";

function FeaturedProjectCard({ onPlayClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="agara-glass w-[300px] rounded-[28px] p-5 shadow-agara-soft sm:w-[340px] lg:w-[380px] lg:p-5"
    >
      <div className="flex items-start gap-4">
        <button
          type="button"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/50 bg-white/20 backdrop-blur-md transition-transform duration-300 hover:scale-105 cursor-pointer"
          aria-label="Play project film"
          onClick={onPlayClick}
        >
          <Play className="ml-0.5 h-4 w-4 fill-agara-charcoal text-agara-charcoal" />
        </button>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] uppercase tracking-[0.2em] text-agara-charcoal/50">
            Featured Project
          </p>
          <p className="mt-1 font-serif text-2xl leading-tight text-agara-charcoal">
            Casa Aranya
          </p>
          <p className="mt-1 text-xs text-agara-charcoal/55">Hyderabad, India</p>
        </div>
      </div>
      <Link
        to="/projects/casa-aranya"
        className="mt-5 inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.16em] text-agara-charcoal/65 transition-colors hover:text-agara-charcoal"
      >
        View Project
        <ArrowRight className="h-3 w-3" strokeWidth={1.5} />
      </Link>
    </motion.div>
  );
}

export function HeroSection() {
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  return (
    <section className="relative h-[100dvh] min-h-[640px] w-full overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <img
          src={HeroImage}
          loading="eager"
          alt="Casa Aranya — luxury residence by AGARA Architects"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
      </div>

      <SocialScrollBar />

      <div className="absolute top-[15.5rem] right-6 z-10 hidden sm:block lg:right-[6rem] xl:right-[6rem]">
        <FeaturedProjectCard onPlayClick={() => setVideoModalOpen(true)} />
      </div>

      <div className="pointer-events-none relative z-10 flex h-full flex-col justify-center px-6 pb-32 pt-24 lg:px-10 lg:pb-28 xl:px-16">
        <motion.div
          className="pointer-events-auto max-w-[420px] lg:max-w-[480px]"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-agara-charcoal/55">
            Every Project Starts With A Story
          </p>
          <h1 className="mt-4 font-serif text-[clamp(2.5rem,5vw,4.25rem)] leading-[1.05] tracking-[-0.02em] text-agara-charcoal">
            Designing Spaces
            <br />
            That Endure
          </h1>
          <p className="mt-5 max-w-sm text-[13px] leading-relaxed text-agara-charcoal/65 lg:text-sm">
            We craft architectural and interior environments defined by
            proportion, material honesty, and timeless design language.
          </p>
          <div className="mt-8 flex items-center gap-5">
            <Link
              to="/projects"
              className="group inline-flex items-center gap-2 rounded-full bg-agara-charcoal px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-agara-cream transition-transform duration-300 hover:scale-[1.03]"
            >
              Begin Your Journey
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                strokeWidth={1.5}
              />
            </Link>
          </div>
        </motion.div>
      </div>

      <VideoModal
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
        videoSrc="/videos/casa-aranya.mp4"
        title="Casa Aranya"
        location="Hyderabad, India"
      />
    </section>
  );
}
