import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { useState } from "react";
import { project_info } from "@/constants";
import { fadeUp } from "@/components/marketing/motion";
import { SocialScrollBar } from "@/components/marketing/social-scroll-bar";
import { VideoModal } from "@/components/marketing/video-modal";
import "@/assets/styles/components/FeaturedProjectCard.scss";
import "@/assets/styles/components/HeroSection.scss";

const featuredProject = project_info?.[0] ?? null;

function FeaturedProjectCard({ onPlayClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="featured-project-card"
    >
      <div className="featured-project-card__inner">
        <button
          type="button"
          className="featured-project-card__play-btn"
          aria-label="Play project film"
          onClick={onPlayClick}
        >
          <Play className="featured-project-card__play-icon" />
        </button>
        <div className="featured-project-card__content">
          <p className="featured-project-card__label">Featured Project</p>
          <p className="featured-project-card__title">
            {featuredProject?.title || "Featured Project"}
          </p>
          <p className="featured-project-card__location">
            {featuredProject?.subTittle || "Hyderabad, India"}
          </p>
        </div>
      </div>
      <Link
        to={featuredProject ? `/projects/${featuredProject.id}` : "/projects"}
        className="featured-project-card__link"
      >
        View Project
        <ArrowRight className="featured-project-card__link-icon" strokeWidth={1.5} />
      </Link>
    </motion.div>
  );
}

export function HeroSection() {
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  return (
    <section className="hero-section">
      <div className="hero-section__bg">
        <img
          src="/HeroImage.png"
          loading="eager"
          alt="Casa Aranya — luxury residence by AGARA Architects"
          className="hero-section__bg-image"
        />
      </div>

      <SocialScrollBar />

      <div className="hero-section__featured-wrap">
        <FeaturedProjectCard onPlayClick={() => setVideoModalOpen(true)} />
      </div>

      <div className="hero-section__content-wrap">
        <motion.div
          className="hero-section__content"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <p className="hero-section__eyebrow">
            Every Project Starts With A Story
          </p>
          <h1 className="hero-section__title">
            Designing Spaces
            <br />
            That Endure
          </h1>
          <p className="hero-section__description">
            We craft architectural and interior environments defined by
            proportion, material honesty, and timeless design language.
          </p>
          <div className="hero-section__actions">
            <Link to="/projects" className="hero-section__cta">
              Begin Your Journey
              <ArrowRight
                className="hero-section__cta-icon"
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
        title={featuredProject?.title || "Featured Project"}
        location={featuredProject?.subTittle || "Hyderabad, India"}
      />
    </section>
  );
}
