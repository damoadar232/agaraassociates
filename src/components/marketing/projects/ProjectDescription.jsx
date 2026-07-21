import { memo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

function ProjectDescriptionComponent({ project }) {
  return (
    <section className="agara-glass mt-8 rounded-[32px] px-8 py-5 shadow-agara-soft lg:px-12">
      <div className=" ">
        {/* Description */}
        <div className="flex-1">
          <p
            className="
             
              text-[16px]
              leading-[2]
              text-agara-charcoal/80
              font-serif
              tracking-[0.01em]
            "
          >
            {project.description}
          </p>
        </div>

        {/* CTA */}
        <div className="flex shrink-0 justify-start lg:justify-end">
          <Link
            to="/contact"
            className="group inline-flex items-center gap-3 rounded-full bg-agara-charcoal px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-agara-cream transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            Start a Similar Project

            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              strokeWidth={1.5}
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

export const ProjectDescription = memo(ProjectDescriptionComponent);