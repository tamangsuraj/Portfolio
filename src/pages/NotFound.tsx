import { Link } from "react-router-dom";
import { Reveal } from "../components/Reveal";
import { Seo } from "../seo/Seo";
import { routesInGroup } from "../seo/routes";
import { webPageSchema } from "../seo/schema";

/**
 * 404 page.
 *
 * The previous public/404.html hard-redirected every unknown URL to "/" with a
 * meta refresh. That turned every stale or mistyped link into a soft 404: Google
 * saw a 200 response with home page content, kept the bad URL in its index, and
 * spent crawl budget re-checking it. This page renders real "not found" content
 * and is wired to a genuine 404 status in vercel.json.
 */
export function Component() {
  const primary = routesInGroup("primary");

  return (
    <>
      <Seo
        path="/404/"
        title="Page not found | Suraj Tamang"
        description="That page doesn't exist. Here's where to go instead."
        noindex
        breadcrumbs={false}
        // Breadcrumbs are off here, so without an explicit node the @graph
        // would serialise empty — valid JSON, but meaningless markup.
        schema={[
          webPageSchema({
            path: "/404/",
            title: "Page not found",
            description: "That page doesn't exist. Here's where to go instead.",
          }),
        ]}
      />

      <section className="relative flex min-h-[70svh] items-center py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(91,108,255,0.10), transparent 65%)",
          }}
        />
        <div className="relative mx-auto w-full max-w-3xl px-5 text-center md:px-8">
          <Reveal>
            <p className="font-mono text-sm text-pulse">404</p>
            <h1 className="mt-4 text-balance font-display text-4xl font-semibold tracking-tight md:text-6xl">
              That page doesn't exist.
            </h1>
            <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-dim md:text-lg">
              The link may be out of date, or the address slightly off. Everything on the site is one
              click away below.
            </p>

            <nav aria-label="Main pages" className="mt-10">
              <ul className="flex flex-wrap justify-center gap-3">
                {primary.map((route) => (
                  <li key={route.path}>
                    <Link
                      to={route.path}
                      className="focus-ring glass inline-flex rounded-full px-5 py-2.5 text-sm text-ink transition-colors hover:border-pulse/40 hover:text-pulse"
                    >
                      {route.navLabel}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <p className="mt-10 font-mono text-xs text-faint">
              Still stuck?{" "}
              <Link
                to="/sitemap/"
                className="focus-ring rounded text-pulse underline underline-offset-4 hover:text-ink"
              >
                Browse the full sitemap
              </Link>
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}

Component.displayName = "NotFoundPage";
