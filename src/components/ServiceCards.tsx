import { Link } from "react-router-dom";
import type { Service } from "../data/content";
import { getRoute } from "../seo/routes";
import { Reveal } from "./Reveal";
import { TiltCard } from "./TiltCard";

const NPR = new Intl.NumberFormat("en-NP", { maximumFractionDigits: 0 });

/**
 * Service cards for the hub pages.
 *
 * A card links through to its dedicated page only once that page is published.
 * Until then it renders the same information inline — the buyer loses nothing,
 * and we avoid shipping links to pages that would 404.
 */
export function ServiceCards({
  services,
  pillarPath,
}: {
  services: Service[];
  pillarPath: "data" | "web";
}) {
  return (
    <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {services.map((service, i) => {
        const path = `/services/${pillarPath}/${service.slug}/`;
        const isLive = getRoute(path)?.published ?? false;

        return (
          <li key={service.slug} className="h-full">
            <Reveal delay={i * 0.06} className="h-full">
              <TiltCard className="glass flex h-full flex-col rounded-2xl p-6 transition-colors hover:border-pulse/30">
                <h3 className="font-display text-lg font-medium text-ink">
                  {isLive ? (
                    <Link to={path} className="focus-ring rounded transition-colors hover:text-pulse">
                      {service.name}
                    </Link>
                  ) : (
                    service.name
                  )}
                </h3>

                <p className="mt-2 text-sm font-medium text-pulse">{service.summary}</p>
                <p className="mt-3 text-sm leading-relaxed text-dim">{service.description}</p>

                <div className="mt-5">
                  <h4 className="telemetry mb-2.5 text-faint">what you get</h4>
                  <ul className="space-y-1.5">
                    {service.deliverables.map((item) => (
                      <li key={item} className="flex gap-2.5 text-sm text-dim">
                        <span aria-hidden className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-pulse" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <dl className="mt-auto grid grid-cols-2 gap-3 pt-6">
                  <div className="rounded-xl border border-line bg-void/40 px-3 py-2.5">
                    <dt className="font-mono text-[10px] uppercase tracking-wider text-faint">
                      timeline
                    </dt>
                    <dd className="mt-1 font-mono text-xs text-pulse">{service.timeline}</dd>
                  </div>
                  <div className="rounded-xl border border-line bg-void/40 px-3 py-2.5">
                    <dt className="font-mono text-[10px] uppercase tracking-wider text-faint">
                      from
                    </dt>
                    <dd className="mt-1 font-mono text-xs text-pulse">
                      {service.startingPriceNPR
                        ? `NPR ${NPR.format(service.startingPriceNPR)}`
                        : "on scope"}
                    </dd>
                  </div>
                </dl>
              </TiltCard>
            </Reveal>
          </li>
        );
      })}
    </ul>
  );
}
