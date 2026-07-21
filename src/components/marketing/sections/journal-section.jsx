import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fadeUp } from "@/components/marketing/motion";
import { JOURNAL_ARTICLES } from "@/components/marketing/data";

export function JournalSection({ variant = "home", limit }) {
  const isPage = variant === "page";
  const items =
    typeof limit === "number"
      ? JOURNAL_ARTICLES.slice(0, limit)
      : JOURNAL_ARTICLES;

  return (
    <section
      id="journal"
      className={
        isPage
          ? "px-6 pb-8 pt-28 lg:px-10 lg:pt-32"
          : "px-6 pt-8 pb-8 lg:px-10"
      }
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="flex items-end justify-between gap-4">
          <div>
            {isPage && (
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-agara-charcoal/45">
                Insights
              </p>
            )}
            <h2
              className={
                isPage
                  ? "mt-2 font-serif text-2xl leading-tight text-agara-charcoal lg:text-3xl"
                  : "font-serif text-2xl leading-tight text-agara-charcoal lg:text-3xl"
              }
            >
              {isPage ? "Journal" : "From the Journal"}
            </h2>
          </div>
          {variant === "home" && (
            <Link
              to="/journal"
              className="agara-glass hidden shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-agara-charcoal shadow-agara-soft transition-transform duration-300 hover:scale-[1.02] sm:inline-flex"
            >
              View All Articles
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          )}
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className={
            isPage
              ? "mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
              : "mt-6 grid grid-cols-1 gap-4 md:grid-cols-3"
          }
        >
          {items.map((article) => (
            <article
              key={article.slug}
              className="agara-glass group flex items-center gap-4 rounded-[20px] p-3 shadow-agara-soft transition-transform duration-300 hover:-translate-y-0.5"
            >
              <Link
                to={`/journal/${article.slug}`}
                className="flex min-w-0 flex-1 items-center gap-4"
              >
                <div className="h-20 w-24 shrink-0 overflow-hidden rounded-[14px] sm:h-24 sm:w-28">
                  <img
                    src={article.image}
                    alt={article.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-serif text-sm leading-snug text-agara-charcoal line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="mt-1.5 text-[10px] uppercase tracking-[0.14em] text-agara-charcoal/50">
                    {article.category}
                    <span className="mx-1.5 text-agara-charcoal/30">•</span>
                    {article.readTime}
                  </p>
                </div>
              </Link>
              <Link
                to={`/journal/${article.slug}`}
                aria-label={`Read ${article.title}`}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-agara-charcoal/15 bg-white/40 text-agara-charcoal transition-transform duration-300 group-hover:scale-105"
              >
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
