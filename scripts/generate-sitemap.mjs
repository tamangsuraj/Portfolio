/**
 * Generates dist/sitemap.xml from the route table.
 *
 * Only published, indexable routes are listed. A sitemap is a set of
 * recommendations to a crawler, and listing URLs that are noindexed, redirected
 * or thin actively wastes crawl budget and erodes trust in the file — so the
 * `published` flag in src/seo/routes.ts is the single gate.
 */

import { existsSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { SITE_URL, indexable, readRoutes, xmlEscape } from "./_routes.mjs";

const DIST = join(process.cwd(), "dist");

function canonical(path) {
  if (path === "/") return `${SITE_URL}/`;
  return `${SITE_URL}/${path.replace(/^\/+|\/+$/g, "")}/`;
}

function main() {
  if (!existsSync(DIST)) {
    console.error("dist/ not found — run the build first.");
    process.exit(1);
  }

  const routes = indexable().sort(
    (a, b) => b.priority - a.priority || a.path.localeCompare(b.path),
  );

  const urls = routes
    .map((route) =>
      [
        "  <url>",
        `    <loc>${xmlEscape(canonical(route.path))}</loc>`,
        `    <lastmod>${route.lastmod}</lastmod>`,
        `    <changefreq>${route.changefreq}</changefreq>`,
        `    <priority>${route.priority.toFixed(1)}</priority>`,
        "  </url>",
      ].join("\n"),
    )
    .join("\n");

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls,
    "</urlset>",
    "",
  ].join("\n");

  writeFileSync(join(DIST, "sitemap.xml"), xml, "utf8");

  const held = readRoutes().filter((r) => !r.published && !r.noindex);

  console.log(`✓ sitemap.xml — ${routes.length} URLs`);
  for (const route of routes) {
    console.log(`    ${route.priority.toFixed(1)}  ${canonical(route.path)}`);
  }
  if (held.length) {
    console.log(`\n  ${held.length} route(s) held back (published: false):`);
    for (const route of held) console.log(`    ·  ${route.path}`);
  }
}

main();
