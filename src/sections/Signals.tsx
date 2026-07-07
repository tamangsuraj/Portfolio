import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { testimonials } from "../data/content";

export function Signals() {
  return (
    <section id="signals" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          index="06"
          channel="incoming signals"
          title="What teams report back."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.07}>
              <figure className="relative flex h-full flex-col rounded-3xl glass p-7 transition-colors hover:border-pulse/25 md:p-8">
                <span aria-hidden className="font-display text-5xl leading-none text-pulse/30">
                  “
                </span>
                <blockquote className="mt-2 flex-1 text-[15px] leading-relaxed text-dim md:text-base">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-7 flex items-center gap-4 border-t border-line pt-5">
                  <img
                    src={t.photo}
                    alt=""
                    width={44}
                    height={44}
                    loading="lazy"
                    decoding="async"
                    className="h-11 w-11 rounded-full object-cover ring-1 ring-line-bright"
                  />
                  <div>
                    <p className="font-medium text-ink">{t.name}</p>
                    <p className="font-mono text-xs text-faint">
                      {t.role} · {t.company}
                    </p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
