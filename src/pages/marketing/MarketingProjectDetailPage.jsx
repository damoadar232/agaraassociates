import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { project_info } from "@/constants";
import { ProjectHero } from "@/components/marketing/projects/ProjectHero";
import { ProjectDescription } from "@/components/marketing/projects/ProjectDescription";
import { ProjectGallery } from "@/components/marketing/projects/ProjectGallery";

export default function MarketingProjectDetailPage() {
  const { id } = useParams();
  const project =
    project_info.find((item) => String(item.id) === String(id)) ?? null;

  if (!project) {
    return (
      <section className="px-6 pb-16 pt-28 lg:px-10 lg:pt-32">
        <div className="agara-glass mx-auto max-w-[800px] rounded-[32px] px-8 py-12 text-center shadow-agara-soft">
          <h1 className="font-serif text-3xl text-agara-charcoal">
            Project not found
          </h1>
          <Link
            to="/projects"
            className="mt-6 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-agara-charcoal/70"
          >
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
            Back to Projects
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="px-6 pb-16 pt-28 lg:px-10 lg:pt-32">
      <div className="mx-auto max-w-[1440px]">
        <ProjectHero project={project} />
        <ProjectDescription project={project} />
        <ProjectGallery images={project.images} />
      </div>
    </section>
  );
}
