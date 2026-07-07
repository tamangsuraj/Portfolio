import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { articles } from "../data/content";

export function Writing() {
  return (
    <section id="writing" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          index="05"
          channel="ship logs"
          title="Notes from the field."
          lede="Guides and lessons from running real infrastructure."
        />

        <div className="divide-y divide-line border-y border-line">
          {articles.map((article, i) => (
            <Reveal key={article.title} delay={i * 0.04}>
              <article className="group grid gap-2 py-6 transition-colors hover:bg-panel/40 md:grid-cols-[8rem_1fr_auto] md:items-baseline md:gap-8 md:px-4">
                <span className="font-mono text-[11px] uppercase tracking-wider text-pulse/70">
                  {article.category}
                </span>
                <div>
                  <h3 className="font-display text-lg font-medium text-ink transition-colors group-hover:text-pulse md:text-xl">
                    {article.title}
                  </h3>
                  <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-dim">{article.excerpt}</p>
                </div>
                <span className="font-mono text-xs text-faint">{article.readTime}</span>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
