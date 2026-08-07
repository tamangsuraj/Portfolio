import { Link } from "react-router-dom";
import { identity, socials } from "../data/content";
import { routesInGroup } from "../seo/routes";

/**
 * Footer link hub.
 *
 * Reads straight from the route table, so every published page is reachable
 * from every other page in one hop. That is the cheapest possible internal
 * linking win: it flattens crawl depth to <= 2 for the whole site and spreads
 * link equity from the home page across the service pages.
 *
 * Columns whose routes are all still unpublished render nothing rather than
 * linking to pages that would 404.
 */

function LinkColumn({
  heading,
  routes,
}: {
  heading: string;
  routes: { path: string; navLabel: string }[];
}) {
  if (routes.length === 0) return null;
  return (
    <div>
      <h2 className="telemetry mb-4 text-faint">{heading}</h2>
      <ul className="space-y-2.5">
        {routes.map((route) => (
          <li key={route.path}>
            <Link
              to={route.path}
              className="focus-ring rounded text-sm text-dim transition-colors hover:text-pulse"
            >
              {route.navLabel}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const primary = routesInGroup("primary");
  const dataServices = routesInGroup("data-service");
  const webServices = routesInGroup("web-service");
  const legal = [...routesInGroup("legal"), ...routesInGroup("utility")];

  return (
    <footer className="relative border-t border-line">
      <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          {/* identity block */}
          <div className="lg:col-span-2">
            <p className="font-display text-lg font-medium text-ink">{identity.name}</p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-dim">
              MIS and business intelligence analyst in Kathmandu. Dashboards, reporting
              automation, and websites for Nepali businesses.
            </p>

            <address className="mt-6 space-y-1.5 not-italic">
              <a
                href={`mailto:${identity.email}`}
                className="focus-ring block rounded font-mono text-sm text-dim transition-colors hover:text-pulse"
              >
                {identity.email}
              </a>
              <a
                href={`tel:${identity.phone.replace(/\s/g, "")}`}
                className="focus-ring block rounded font-mono text-sm text-dim transition-colors hover:text-pulse"
              >
                {identity.phone}
              </a>
              <p className="font-mono text-sm text-faint">{identity.location}</p>
            </address>

            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="me noopener noreferrer"
                    className="focus-ring rounded font-mono text-xs text-faint transition-colors hover:text-pulse"
                  >
                    {s.label.toLowerCase()}
                    <span aria-hidden className="text-line-bright">
                      {" "}
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <LinkColumn heading="navigate" routes={primary} />
          <LinkColumn heading="data & mis" routes={dataServices} />
          <LinkColumn heading="web development" routes={webServices} />
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[11px] text-faint">
            © {new Date().getFullYear()} {identity.name} · Kathmandu, Nepal
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-1">
            {legal.map((route) => (
              <li key={route.path}>
                <Link
                  to={route.path}
                  className="focus-ring rounded font-mono text-[11px] text-faint transition-colors hover:text-pulse"
                >
                  {route.navLabel}
                </Link>
              </li>
            ))}
            <li>
              <a
                href="/rss.xml"
                className="focus-ring rounded font-mono text-[11px] text-faint transition-colors hover:text-pulse"
              >
                RSS
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
