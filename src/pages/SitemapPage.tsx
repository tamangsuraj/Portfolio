import { Link } from "react-router-dom";
import { PageHeader } from "../components/PageHeader";
import { Reveal } from "../components/Reveal";
import { Seo } from "../seo/Seo";
import { getRoute, indexableRoutes, type RouteGroup } from "../seo/routes";
import { collectionPageSchema } from "../seo/schema";

const PATH = "/sitemap/";

/**
 * Human-readable sitemap.
 *
 * Distinct from /sitemap.xml, which is for crawlers. This one exists for people
 * and as a belt-and-braces internal linking surface: every indexable URL is one
 * click from here, so nothing can end up orphaned.
 */
const GROUPS: { key: RouteGroup; label: string }[] = [
  { key: "primary", label: "Main pages" },
  { key: "data-service", label: "Data & MIS services" },
  { key: "web-service", label: "Website development services" },
  { key: "blog", label: "Writing" },
  { key: "location", label: "Locations" },
  { key: "legal", label: "Legal" },
  { key: "utility", label: "Utility" },
];

export function Component() {
  const route = getRoute(PATH)!;
  const routes = indexableRoutes();

  return (
    <>
      <Seo
        path={PATH}
        schema={[
          collectionPageSchema({
            path: PATH,
            title: route.title,
            description: route.description,
            hasBreadcrumb: true,
            items: routes.map((r) => ({ name: r.navLabel, path: r.path })),
          }),
        ]}
      />

      <PageHeader
        path={PATH}
        eyebrow="sitemap"
        h1={route.h1}
        lede="Every page on this site. The machine-readable version lives at /sitemap.xml."
      />

      <section className="relative py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <div className="space-y-12">
            {GROUPS.map((group) => {
              const items = routes.filter((r) => r.group === group.key);
              if (items.length === 0) return null;
              return (
                <Reveal key={group.key}>
                  <div>
                    <h2 className="telemetry mb-5 text-faint">{group.label}</h2>
                    <ul className="divide-y divide-line border-y border-line">
                      {items.map((item) => (
                        <li key={item.path}>
                          <Link
                            to={item.path}
                            className="focus-ring group flex flex-col gap-1 rounded py-4 transition-colors sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                          >
                            <span className="font-medium text-ink transition-colors group-hover:text-pulse">
                              {item.navLabel}
                            </span>
                            <span className="max-w-md text-sm leading-snug text-dim sm:text-right">
                              {item.description}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.15}>
            <p className="mt-14 font-mono text-xs text-faint">
              Machine-readable:{" "}
              <a
                href="/sitemap.xml"
                className="focus-ring rounded text-pulse underline underline-offset-4 hover:text-ink"
              >
                /sitemap.xml
              </a>{" "}
              ·{" "}
              <a
                href="/robots.txt"
                className="focus-ring rounded text-pulse underline underline-offset-4 hover:text-ink"
              >
                /robots.txt
              </a>
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}

Component.displayName = "SitemapPage";
