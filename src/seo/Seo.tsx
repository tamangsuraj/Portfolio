/**
 * Per-page head manager.
 *
 * Wraps vite-react-ssg's <Head>, which serialises into the pre-rendered HTML at
 * build time. That distinction matters: a plain react-helmet setup would only
 * apply these tags after hydration, so crawlers that don't execute JS — and
 * every social/link-preview scraper — would see the fallback tags from
 * index.html instead. Everything here ends up in the raw HTML response.
 */

import { Head } from "vite-react-ssg";
import { PERSON, SITE_URL, TWITTER_HANDLE, canonical } from "./site";
import { breadcrumbsFor, getRoute, ogImageFor, type RouteMeta } from "./routes";
import { breadcrumbSchema, graph, type JsonLd } from "./schema";

export interface SeoProps {
  /** Path of the current page. Must exist in the route table. */
  path: string;
  /** Overrides for dynamic pages (blog posts, case studies) not in the table. */
  title?: string;
  description?: string;
  ogImage?: string;
  noindex?: boolean;
  /** OG type — "article" for blog posts, "website" otherwise. */
  ogType?: "website" | "article" | "profile";
  /** Schema nodes for this page, merged into a single @graph. */
  schema?: (JsonLd | null | undefined | false)[];
  /** Set false on pages that shouldn't emit a breadcrumb (home). */
  breadcrumbs?: boolean;
  /** Article-only OG tags. */
  publishedTime?: string;
  modifiedTime?: string;
}

export function Seo({
  path,
  title,
  description,
  ogImage,
  noindex,
  ogType = "website",
  schema = [],
  breadcrumbs = true,
  publishedTime,
  modifiedTime,
}: SeoProps) {
  const route: RouteMeta | undefined = getRoute(path);

  const resolvedTitle = title ?? route?.title ?? PERSON.name;
  const resolvedDescription = description ?? route?.description ?? PERSON.description;
  const resolvedImage = ogImage ?? (route ? ogImageFor(route) : `${SITE_URL}/og/default.png`);
  const url = canonical(path);
  const isNoindex = noindex ?? route?.noindex ?? false;

  const crumbs = breadcrumbs && path !== "/" ? breadcrumbsFor(path) : null;

  const jsonLd = graph(...schema, crumbs && crumbs.length > 1 ? breadcrumbSchema(crumbs) : null);

  return (
    <Head>
      <html lang="en" />
      <title>{resolvedTitle}</title>
      <meta name="description" content={resolvedDescription} />
      <link rel="canonical" href={url} />

      {/*
        max-image-preview:large is what makes Google eligible to show a large
        thumbnail next to the result — a meaningful CTR lever, and free.
      */}
      <meta
        name="robots"
        content={
          isNoindex
            ? "noindex, nofollow"
            : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        }
      />

      <meta property="og:site_name" content={PERSON.name} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={resolvedTitle} />
      <meta property="og:description" content={resolvedDescription} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={resolvedImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={resolvedTitle} />

      {publishedTime ? <meta property="article:published_time" content={publishedTime} /> : null}
      {modifiedTime ? <meta property="article:modified_time" content={modifiedTime} /> : null}
      {ogType === "article" ? <meta property="article:author" content={PERSON.name} /> : null}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={resolvedTitle} />
      <meta name="twitter:description" content={resolvedDescription} />
      <meta name="twitter:image" content={resolvedImage} />
      <meta name="twitter:image:alt" content={resolvedTitle} />
      {TWITTER_HANDLE ? <meta name="twitter:creator" content={TWITTER_HANDLE} /> : null}

      <meta name="author" content={PERSON.name} />
      <meta name="geo.region" content="NP-BA" />
      <meta name="geo.placename" content="Kathmandu" />

      <script type="application/ld+json">{jsonLd}</script>
    </Head>
  );
}
