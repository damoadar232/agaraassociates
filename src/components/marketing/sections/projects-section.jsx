import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fadeUp } from "@/components/marketing/motion";
import { PROJECTS } from "@/components/marketing/data";

function ProjectCard({ project }) {
  return (
    <article className="group">
      <Link to={`/projects/${project.slug}`} className="block">
        <div className="relative overflow-hidden rounded-[24px] shadow-agara-soft">
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="h-[300px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0">
            <div className="agara-glass flex min-h-[52px] items-center justify-between px-4 py-3 rounded-t-[8px]">
              <div className="flex min-h-[30px] flex-1 flex-col justify-between">
                <h3 className="line-clamp-2 font-serif text-[18px] leading-[1.2] text-agara-charcoal">
                  {project.title}
                </h3>
                <p className="h-[16px] text-[11px] text-agara-charcoal/65 whitespace-nowrap overflow-hidden text-ellipsis">
                  {project.category}
                  <span className="mx-1.5">•</span>
                  {project.size}
                  <span className="mx-1.5">•</span>
                  {project.location}
                </p>
              </div>
              <span className="ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/35 bg-white/15 backdrop-blur-xl">
                <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}

export function ProjectsSection({ variant = "home", limit }) {
  const isPage = variant === "page";
  const items =
    typeof limit === "number" ? PROJECTS.slice(0, limit) : PROJECTS;

  return (
    <section
      id="projects"
      className={
        isPage
          ? "px-6 pb-0 pt-28 lg:px-10 lg:pt-32"
          : "px-6 pt-8 pb-0 lg:px-10"
      }
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="flex items-end justify-between gap-4">
          <div>
            {isPage && (
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-agara-charcoal/45">
                Portfolio
              </p>
            )}
            <h2
              className={
                isPage
                  ? "mt-2 font-serif text-3xl leading-tight text-agara-charcoal lg:text-4xl"
                  : "font-serif text-3xl leading-tight text-agara-charcoal lg:text-4xl"
              }
            >
              {isPage ? "All Projects" : "Selected Projects"}
            </h2>
          </div>
          {variant === "home" && (
            <Link
              to="/projects"
              className="agara-glass hidden shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-agara-charcoal shadow-agara-soft transition-transform duration-300 hover:scale-[1.02] sm:inline-flex"
            >
              View All Projects
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          )}
        </div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5"
        >
          {items.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
