import { Link } from "react-router-dom";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { TiltCard } from "../components/TiltCard";
import { dataServices, webServices } from "../data/content";

/**
 * The dual-pillar split.
 *
 * This is the most important block on the home page for SEO. Two very different
 * buyers land here — a company looking for reporting, and a restaurant owner
 * looking for a website — and this section routes each to the right hub in one
 * click. It also gives Google an unambiguous statement of the two topic areas
 * the site claims authority over, with descriptive internal links into both.
 */

const PILLARS = [
  {
    id: "data",
    eyebrow: "pillar 01",
    title: "Data, MIS & business intelligence",
    lede: "Dashboards, reporting automation and business analysis — from the working MIS analyst who builds them daily.",
    to: "/services/data/",
    cta: "Explore data services",
    services: dataServices,
  },
  {
    id: "web",
    eyebrow: "pillar 02",
    title: "Websites for businesses in Nepal",
    lede: "Restaurants, cafes, hotels and small businesses. Fast on mobile data, easy to update, built to be found.",
    to: "/services/web/",
    cta: "Explore web services",
    services: webServices,
  },
] as const;

export function Pillars() {
  return (
    <section className="relative py-20 md:py-32" aria-labelledby="pillars-heading">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          id="pillars-heading"
          index="01"
          channel="what i do"
          title="Two practices, one operator."
          lede="Most people do one or the other. Doing both means the website I build for you and the reporting that measures it are designed by the same person — so the numbers actually connect."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {PILLARS.map((pillar, i) => (
            <Reveal key={pillar.id} delay={i * 0.1}>
              <TiltCard className="beam-border glass group flex h-full flex-col rounded-3xl p-7 transition-colors hover:border-pulse/30 md:p-9">
                <p className="telemetry mb-5 text-pulse">{pillar.eyebrow}</p>

                <h3 className="font-display text-2xl font-semibold leading-tight text-ink md:text-3xl">
                  <Link to={pillar.to} className="focus-ring rounded transition-colors hover:text-pulse">
                    {pillar.title}
                  </Link>
                </h3>

                <p className="mt-4 text-sm leading-relaxed text-dim md:text-base">{pillar.lede}</p>

                <ul className="mt-7 flex flex-1 flex-wrap content-start gap-2">
                  {pillar.services.map((service) => (
                    <li key={service.slug}>
                      <span className="inline-block rounded-full border border-line px-3 py-1.5 font-mono text-[11px] text-dim">
                        {service.name}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  to={pillar.to}
                  className="focus-ring mt-8 inline-flex items-center gap-2 self-start rounded-full text-sm font-medium text-pulse transition-colors hover:text-ink"
                >
                  {pillar.cta}
                  <span aria-hidden className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
