import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getProjectBySlug } from "@/components/marketing/data";

export default function MarketingProjectDetailPage() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

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
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-agara-charcoal/60 transition-colors hover:text-agara-charcoal"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
          All Projects
        </Link>

        <div className="mt-6 overflow-hidden rounded-[32px] shadow-agara-soft">
          <img
            src={project.image}
            alt={project.title}
            className="h-[420px] w-full object-cover lg:h-[520px]"
          />
        </div>

        <div className="agara-glass mt-6 rounded-[32px] px-6 py-8 shadow-agara-soft sm:px-8 lg:px-10">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-agara-charcoal/45">
            {project.category}
          </p>
          <h1 className="mt-2 font-serif text-3xl leading-tight text-agara-charcoal lg:text-5xl">
            {project.title}
          </h1>
          <p className="mt-3 text-sm text-agara-charcoal/60">
            {project.size}
            <span className="mx-2">•</span>
            {project.location}
          </p>
          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-agara-charcoal/70">
            A carefully composed environment shaped by light, material honesty,
            and contextual clarity. Full case study content will live here —
            drawings, narrative, and process — without changing the site&apos;s
            visual language.
          </p>
          <Link
            to="/contact"
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-agara-charcoal px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-agara-cream transition-transform duration-300 hover:scale-[1.03]"
          >
            Start a Similar Project
            <ArrowRight
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
              strokeWidth={1.5}
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
