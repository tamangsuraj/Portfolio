import { Link } from "react-router-dom";
import { getRoute, relatedRoutes } from "../seo/routes";
import { Reveal } from "./Reveal";

/**
 * Contextual internal links, driven by the `related` array in the route table.
 *
 * Descriptive anchor text matters here — "Restaurant website development" tells
 * Google what the destination is about, "read more" tells it nothing. Each link
 * carries the destination's own navLabel plus its meta description as context.
 */
export function RelatedLinks({
  path,
  heading = "Related",
}: {
  path: string;
  heading?: string;
}) {
  const route = getRoute(path);
  if (!route) return null;

  const related = relatedRoutes(route);
  if (related.length === 0) return null;

  return (
    <section className="relative border-t border-line py-16 md:py-24" aria-labelledby="related-heading">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <h2 id="related-heading" className="telemetry mb-8 text-faint">
            {heading}
          </h2>
        </Reveal>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((target, i) => (
            <li key={target.path}>
              <Reveal delay={i * 0.06}>
                <Link
                  to={target.path}
                  className="focus-ring glass group flex h-full flex-col rounded-2xl p-5 transition-colors hover:border-pulse/30"
                >
                  <span className="font-display text-base font-medium text-ink transition-colors group-hover:text-pulse">
                    {target.navLabel}
                  </span>
                  <span className="mt-2 line-clamp-3 text-sm leading-relaxed text-dim">
                    {target.description}
                  </span>
                  <span aria-hidden className="mt-4 font-mono text-xs text-faint">
                    →
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
