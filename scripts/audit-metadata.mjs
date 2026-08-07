/**
 * Post-build SEO assertions against the real emitted HTML.
 *
 * This exists because the metadata bugs that matter are invisible in source.
 * The first build of this site shipped two <title> tags on every page — the
 * per-route one from <Seo> plus a leftover in index.html — and nothing in the
 * component tree would ever have shown that. Only the output does.
 *
 * Run: npm run seo:audit   (after a build)
 * Exits non-zero on any error, so it can gate a deploy.
 */

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { SITE_URL, indexable } from "./_routes.mjs";

const DIST = join(process.cwd(), "dist");

const errors = [];
const warnings = [];
const fail = (page, msg) => errors.push(`${page}: ${msg}`);
const warn = (page, msg) => warnings.push(`${page}: ${msg}`);

/** Strip HTML comments and <script> bodies so prose inside them can't match. */
function scrubbed(html) {
  return html.replace(/<!--[\s\S]*?-->/g, "").replace(/<script[\s\S]*?<\/script>/gi, "");
}

function findPages(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...findPages(full));
    else if (entry === "index.html") out.push(full);
  }
  return out;
}

function attr(html, re) {
  return html.match(re)?.[1];
}

function main() {
  if (!existsSync(DIST)) {
    console.error("dist/ not found — run the build first.");
    process.exit(1);
  }

  const pages = findPages(DIST);
  const titles = new Map();
  const descriptions = new Map();
  const canonicals = new Map();

  for (const file of pages) {
    const page = "/" + relative(DIST, file).replace(/\\/g, "/").replace(/index\.html$/, "");
    const raw = readFileSync(file, "utf8");
    const html = scrubbed(raw);

    /* ---- exactly one title, one description, one canonical ---- */
    const titleTags = html.match(/<title[^>]*>[\s\S]*?<\/title>/g) ?? [];
    if (titleTags.length === 0) fail(page, "no <title>");
    if (titleTags.length > 1) fail(page, `${titleTags.length} <title> tags (must be exactly 1)`);

    const descTags = html.match(/<meta[^>]+name="description"[^>]*>/g) ?? [];
    if (descTags.length === 0) fail(page, "no meta description");
    if (descTags.length > 1) fail(page, `${descTags.length} meta descriptions (must be exactly 1)`);

    const canonicalTags = html.match(/<link[^>]+rel="canonical"[^>]*>/g) ?? [];
    if (canonicalTags.length !== 1) fail(page, `${canonicalTags.length} canonical tags (must be 1)`);

    /* ---- content checks ---- */
    const title = titleTags[0]?.replace(/<[^>]*>/g, "").trim();
    const description = attr(descTags[0] ?? "", /content="([^"]*)"/);
    const canonical = attr(canonicalTags[0] ?? "", /href="([^"]*)"/);

    if (title) {
      if (title.length > 65) warn(page, `title is ${title.length} chars (SERP truncates ~60)`);
      if (title.length < 15) fail(page, `title is only ${title.length} chars`);
      if (titles.has(title)) fail(page, `duplicate title, shared with ${titles.get(title)}`);
      else titles.set(title, page);
    }

    if (description) {
      if (description.length > 165) {
        warn(page, `description is ${description.length} chars (truncates ~158)`);
      }
      if (description.length < 70) warn(page, `description is only ${description.length} chars`);
      if (descriptions.has(description)) {
        fail(page, `duplicate description, shared with ${descriptions.get(description)}`);
      } else descriptions.set(description, page);
    }

    if (canonical) {
      if (!canonical.startsWith(SITE_URL)) fail(page, `canonical not on ${SITE_URL}: ${canonical}`);
      if (!canonical.endsWith("/")) fail(page, `canonical missing trailing slash: ${canonical}`);
      if (canonicals.has(canonical)) {
        fail(page, `duplicate canonical, shared with ${canonicals.get(canonical)}`);
      } else canonicals.set(canonical, page);
    }

    /* ---- headings ---- */
    const h1s = html.match(/<h1[^>]*>[\s\S]*?<\/h1>/g) ?? [];
    if (h1s.length === 0) fail(page, "no <h1>");
    if (h1s.length > 1) fail(page, `${h1s.length} <h1> tags (must be exactly 1)`);

    /* ---- structured data ---- */
    // Attribute-order agnostic: react-helmet-async emits
    // <script data-rh="true" type="application/ld+json">, so a regex that
    // assumes `type` comes first silently finds nothing.
    const ldBlocks =
      raw.match(/<script[^>]+type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/g) ?? [];
    if (ldBlocks.length === 0) {
      fail(page, "no JSON-LD");
    } else {
      for (const block of ldBlocks) {
        const json = block.replace(/^<script[^>]*>/, "").replace(/<\/script>$/, "");
        try {
          const parsed = JSON.parse(json);
          if (!parsed["@context"]) fail(page, "JSON-LD missing @context");
          if (!parsed["@graph"]?.length) fail(page, "JSON-LD @graph is empty");
        } catch (err) {
          fail(page, `invalid JSON-LD: ${err.message}`);
        }
      }
    }

    /* ---- crawlable body content (the whole point of the SSG migration) ---- */
    const bodyText = html
      .replace(/<style[\s\S]*?<\/style>/gi, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    if (bodyText.length < 800) {
      fail(page, `only ${bodyText.length} chars of text in raw HTML — is it rendering client-side?`);
    }

    /* ---- images need alt text ---- */
    for (const img of html.match(/<img[^>]*>/g) ?? []) {
      if (!/\balt=/.test(img)) fail(page, `<img> without alt: ${img.slice(0, 90)}`);
    }

    /* ---- robots ---- */
    const robots = attr(html, /<meta[^>]+name="robots"[^>]+content="([^"]*)"/);
    if (!robots) warn(page, "no robots meta");
    else if (page !== "/404/" && robots.includes("noindex")) {
      warn(page, `noindex on a published page: ${robots}`);
    }
  }

  /* ---- every indexable route actually emitted a page ---- */
  const emitted = new Set(
    pages.map((f) => "/" + relative(DIST, f).replace(/\\/g, "/").replace(/index\.html$/, "")),
  );
  for (const route of indexable()) {
    if (!emitted.has(route.path)) {
      fail(route.path, "in sitemap/route table but no HTML was emitted");
    }
  }

  /* ---- sitemap sanity ---- */
  const sitemapPath = join(DIST, "sitemap.xml");
  if (!existsSync(sitemapPath)) {
    fail("/sitemap.xml", "missing");
  } else {
    const sitemap = readFileSync(sitemapPath, "utf8");
    for (const route of indexable()) {
      const loc = route.path === "/" ? `${SITE_URL}/` : `${SITE_URL}${route.path}`;
      if (!sitemap.includes(`<loc>${loc}</loc>`)) fail("/sitemap.xml", `missing ${loc}`);
    }
    for (const loc of sitemap.match(/<loc>([^<]+)<\/loc>/g) ?? []) {
      const url = loc.replace(/<\/?loc>/g, "");
      const path = url.replace(SITE_URL, "") || "/";
      if (!emitted.has(path)) fail("/sitemap.xml", `lists ${url} but no page was emitted`);
    }
  }

  /* ---- report ---- */
  console.log(`\nAudited ${pages.length} pages\n`);
  if (warnings.length) {
    console.log(`⚠  ${warnings.length} warning(s):`);
    for (const w of warnings) console.log(`   ${w}`);
    console.log("");
  }
  if (errors.length) {
    console.log(`✗  ${errors.length} error(s):`);
    for (const e of errors) console.log(`   ${e}`);
    process.exit(1);
  }
  console.log("✓ All metadata, heading, schema and crawlability checks passed.");
}

main();
