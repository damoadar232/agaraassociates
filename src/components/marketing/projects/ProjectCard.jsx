import { memo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

function ProjectCardComponent({ project }) {
  const category = project.subTittle || project.subTitle || "";

  return (
    <article className="group">
      <Link to={`/projects/${project.id}`} className="block cursor-pointer">
        <div className="relative overflow-hidden rounded-[24px] shadow-agara-soft">
          <img
            src={project.img}
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
                  {category}
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

export const ProjectCard = memo(ProjectCardComponent);
