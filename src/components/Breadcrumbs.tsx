import { Fragment } from "react";
import { Link } from "react-router-dom";
import { breadcrumbsFor } from "../seo/routes";

/**
 * Visible breadcrumb trail.
 *
 * Google's docs are explicit that BreadcrumbList markup should describe a trail
 * the user can actually see and click — markup alone, with no visible
 * counterpart, is a rich-result violation. The JSON-LD is emitted by <Seo>
 * from the same breadcrumbsFor() call, so the two can never drift.
 */
export function Breadcrumbs({ path }: { path: string }) {
  const crumbs = breadcrumbsFor(path);
  if (crumbs.length < 2) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs text-faint">
        {crumbs.map((crumb, i) => {
          const isLast = i === crumbs.length - 1;
          return (
            <Fragment key={crumb.path}>
              <li>
                {isLast ? (
                  <span aria-current="page" className="text-dim">
                    {crumb.name}
                  </span>
                ) : (
                  <Link
                    to={crumb.path}
                    className="focus-ring rounded transition-colors hover:text-pulse"
                  >
                    {crumb.name}
                  </Link>
                )}
              </li>
              {!isLast && (
                <li aria-hidden className="text-line-bright">
                  /
                </li>
              )}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
