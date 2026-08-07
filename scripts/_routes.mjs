/**
 * Reads the route table out of src/seo/routes.ts for the Node build scripts.
 *
 * routes.ts is TypeScript, and these scripts run in bare Node after the Vite
 * build, so we parse the emitted route records rather than importing the module
 * (which would need a TS loader). Extracting only the fields the generators
 * need keeps the parsing surface small and the failure mode loud.
 */

import { readFileSync } from "node:fs";
import { join } from "node:path";

const SOURCE = join(process.cwd(), "src", "seo", "routes.ts");

export function readRoutes() {
  const src = readFileSync(SOURCE, "utf8");

  // Isolate the ROUTES array literal.
  const start = src.indexOf("export const ROUTES");
  if (start === -1) throw new Error("Could not find ROUTES in src/seo/routes.ts");
  const arrayStart = src.indexOf("[", start);
  const arrayEnd = src.indexOf("\n];", arrayStart);
  if (arrayEnd === -1) throw new Error("Could not find the end of the ROUTES array");
  const body = src.slice(arrayStart, arrayEnd);

  const routes = [];
  // Each record starts at a `path:` key; slice between consecutive matches.
  const pathRe = /path:\s*"([^"]+)"/g;
  const starts = [];
  let m;
  while ((m = pathRe.exec(body))) starts.push({ index: m.index, path: m[1] });

  for (let i = 0; i < starts.length; i++) {
    const chunk = body.slice(starts[i].index, starts[i + 1]?.index ?? body.length);
    const pick = (key, re) => chunk.match(re)?.[1];

    routes.push({
      path: starts[i].path,
      title: pick("title", /title:\s*\n?\s*"((?:[^"\\]|\\.)*)"/),
      description: pick("description", /description:\s*\n?\s*"((?:[^"\\]|\\.)*)"/),
      navLabel: pick("navLabel", /navLabel:\s*"([^"]+)"/),
      group: pick("group", /group:\s*"([^"]+)"/),
      changefreq: pick("changefreq", /changefreq:\s*"([^"]+)"/),
      lastmod: chunk.match(/lastmod:\s*(TODAY|"[^"]+")/)?.[1],
      priority: Number(chunk.match(/priority:\s*([\d.]+)/)?.[1] ?? 0.5),
      published: /published:\s*true/.test(chunk),
      noindex: /noindex:\s*true/.test(chunk),
    });
  }

  // Resolve the shared TODAY constant.
  const today = src.match(/const TODAY = "([^"]+)"/)?.[1];
  for (const route of routes) {
    route.lastmod = route.lastmod === "TODAY" ? today : route.lastmod?.replace(/"/g, "");
  }

  if (routes.length === 0) throw new Error("Parsed zero routes — the format of routes.ts changed");
  return routes;
}

export const indexable = () => readRoutes().filter((r) => r.published && !r.noindex);

export const SITE_URL = (() => {
  const src = readFileSync(join(process.cwd(), "src", "seo", "site.ts"), "utf8");
  const url = src.match(/export const SITE_URL = "([^"]+)"/)?.[1];
  if (!url) throw new Error("Could not read SITE_URL from src/seo/site.ts");
  return url;
})();

/** XML-escape text destined for a sitemap or feed. */
export function xmlEscape(value = "") {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
