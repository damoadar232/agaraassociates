import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getArticleBySlug } from "@/components/marketing/data";

export default function MarketingJournalDetailPage() {
  const { slug } = useParams();
  const article = getArticleBySlug(slug);

  if (!article) {
    return (
      <section className="px-6 pb-16 pt-28 lg:px-10 lg:pt-32">
        <div className="agara-glass mx-auto max-w-[800px] rounded-[32px] px-8 py-12 text-center shadow-agara-soft">
          <h1 className="font-serif text-3xl text-agara-charcoal">
            Article not found
          </h1>
          <Link
            to="/journal"
            className="mt-6 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-agara-charcoal/70"
          >
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
            Back to Journal
          </Link>
        </div>
      </section>
    );
  }

  return (
    <article className="px-6 pb-16 pt-28 lg:px-10 lg:pt-32">
      <div className="mx-auto max-w-[900px]">
        <Link
          to="/journal"
          className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-agara-charcoal/60 transition-colors hover:text-agara-charcoal"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
          Journal
        </Link>

        <div className="mt-6 overflow-hidden rounded-[28px] shadow-agara-soft">
          <img
            src={article.image}
            alt={article.title}
            className="h-[280px] w-full object-cover sm:h-[360px]"
          />
        </div>

        <div className="agara-glass mt-6 rounded-[28px] px-6 py-8 shadow-agara-soft sm:px-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-agara-charcoal/50">
            {article.category}
            <span className="mx-1.5 text-agara-charcoal/30">•</span>
            {article.readTime}
          </p>
          <h1 className="mt-3 font-serif text-3xl leading-tight text-agara-charcoal lg:text-4xl">
            {article.title}
          </h1>
          <p className="mt-5 text-[15px] leading-relaxed text-agara-charcoal/70">
            {article.excerpt}
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-agara-charcoal/70">
            Full article content will expand here — research notes, material
            studies, and project reflections — while preserving AGARA&apos;s
            existing typography and glass aesthetic.
          </p>
          <Link
            to="/contact"
            className="group mt-8 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-agara-charcoal"
          >
            Discuss this idea
            <ArrowRight
              className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
              strokeWidth={1.5}
            />
          </Link>
        </div>
      </div>
    </article>
  );
}
