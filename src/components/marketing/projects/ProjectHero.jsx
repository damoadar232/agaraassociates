import { memo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function ProjectHeroComponent({ project }) {
  const category = project.subTittle || project.subTitle || "";

  return (
    <div>
      <Link
        to="/projects"
        className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-agara-charcoal/60 transition-colors hover:text-agara-charcoal"
      >
        <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
        All Projects
      </Link>


      <div className="mt-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-agara-charcoal/45">
          {category}
        </p>
        <h1 className="mt-2 font-serif text-3xl leading-tight text-agara-charcoal lg:text-5xl">
          {project.title}
        </h1>
      </div>

      <div className="mt-6 overflow-hidden rounded-[32px] shadow-agara-soft">
        <img
          src={project.img}
          alt={project.title}
          className="h-[420px] w-full object-cover lg:h-[520px]"
        />
      </div>


    </div>
  );
}

export const ProjectHero = memo(ProjectHeroComponent);
