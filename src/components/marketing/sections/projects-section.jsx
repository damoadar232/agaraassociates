import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { project_info } from "@/constants";
import { ProjectsGrid } from "@/components/marketing/projects/ProjectsGrid";

export function ProjectsSection({ variant = "home", limit }) {
  const isPage = variant === "page";
  const items =
    typeof limit === "number" ? project_info.slice(0, limit) : project_info;

  return (
    <section
      id="projects"
      className={
        isPage
          ? "px-6 pb-8 pt-28 lg:px-10 lg:pt-32"
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

        <ProjectsGrid projects={items} />
      </div>
    </section>
  );
}
