# SEO Audit — suraj-tamang.com.np

**Audited:** 7 August 2026 · **Baseline:** single-route Vite SPA on GitHub Pages
**Status key:** ✅ fixed in this pass · 🔜 scheduled · ⚠️ needs your decision

Every finding below was measured against the actual codebase or build output, not
inferred. Where a number appears, it came from the real artefact.

---

## Critical

### C1 — One indexable URL for nineteen keyword clusters ✅
**Was:** the entire site was `/`. `src/App.tsx` rendered eight anchor sections;
navigation was `<button onClick={scrollIntoView}>`.
**Why it mattered:** a URL holds one title, one canonical, one H1, one primary
intent. "Restaurant Website Nepal" and "Power BI Developer Nepal" cannot both be
served by one page. This alone capped the site at ranking for the name query.
**Fix:** react-router + `vite-react-ssg`; nine live URLs today, twenty-two in the
route table. Each owns a unique primary keyword — see `keyword-map.md`.
**Impact:** Foundational. Nothing else in this document matters without it.

### C2 — Content was invisible without JavaScript ✅
**Was:** `dist/index.html` shipped `<div id="root"></div>` and nothing else.
**Why it mattered:** Googlebot renders JS but on a deferred second pass; Bing,
LinkedIn, Facebook, Slack and most AI crawlers do not render reliably at all.
**Fix:** every route pre-renders to static HTML at build time.
**Verify:** `curl https://www.suraj-tamang.com.np/services/web/ | grep "Three things break"`
**Impact:** Very high — moves the site from "eventually indexed" to "indexed on
first crawl", and makes link previews work everywhere.

### C3 — Every unknown URL became a soft 404 ✅
**Was:** `public/404.html` did `<meta http-equiv="refresh" content="0; url=/">`
plus `window.location.replace("/")`.
**Why it mattered:** Google saw HTTP 200 + home page content for every mistyped,
stale or hallucinated URL. Those URLs stayed in the index, competed with real
pages, and burned crawl budget indefinitely.
**Fix:** real `/404.html` with genuine not-found content, served with a true 404
status by Vercel. `scripts/finalize-static.mjs` promotes it to the output root.
**Impact:** High. Recovers crawl budget and removes a persistent quality signal.

### C4 — Navigation passed no link equity ✅
**Was:** `Nav.tsx` and the hero CTA used buttons and `scrollIntoView`.
**Why it mattered:** crawlers discover and weight pages through `<a href>`.
Buttons are invisible to them, so there was no site structure to crawl.
**Fix:** every nav, footer, breadcrumb and CTA link is a real anchor. The footer
reads from the route table, so crawl depth is ≤ 2 for the whole site.
**Impact:** High.

---

## High priority

### H1 — No sitemap reference in robots.txt ✅
**Was:** five redundant per-bot groups each saying `Allow: /`, and **no `Sitemap:`
directive**. Crawlers obey only the most specific matching group, so those blocks
did nothing except disguise the omission.
**Fix:** one open group, explicit AI-crawler policy, `Sitemap:` line. Sitemap is
generated from the route table by `scripts/generate-sitemap.mjs`.

### H2 — Duplicate `<title>` and `<meta description>` on every page ✅
**Found during this build**, not in review: the per-route tags from `<Seo>` were
being *appended* by react-helmet-async alongside the ones still declared in
`index.html`. Every page shipped two of each.
**Fix:** removed the static fallbacks; `scripts/audit-metadata.mjs` now fails the
build if any page has ≠ 1 title, description or canonical.
**Impact:** High — Google resolves duplicates by guessing, which defeats the
entire point of per-page metadata.

### H3 — No structured data at all ✅
**Was:** zero JSON-LD.
**Fix:** a typed builder module (`src/seo/schema.ts`) emitting one `@graph` per
page: Person, Organization/ProfessionalService, WebSite, LocalBusiness,
BreadcrumbList, Service, FAQPage, CollectionPage, ProfilePage, CreativeWork,
WebPage. Shared entities are emitted once and referenced by `@id` everywhere
else — that is what makes Google treat all mentions as one entity.
**Impact:** High for the Knowledge Panel goal and FAQ rich results.

### H4 — 1.31 MB portrait image ✅
**Measured:** `public/profile.png` = 1,275 kB.
**Fix:** `scripts/optimize-images.mjs` (sharp) → AVIF/WebP responsive sets. The
480px AVIF is **16.8 kB**. Source moved to `assets-src/` so the original never
deploys. Rendered through `<Picture>` with explicit width/height (zero CLS).
**Impact:** High on mobile LCP — this was the single heaviest asset on the site.

### H5 — Two render-blocking external font stylesheets ✅
**Was:** Fontshare + Google Fonts, each costing DNS + TLS + a round trip *before*
the font files were even requested, then a second hop to a different CDN host.
**Fix:** `scripts/fetch-fonts.mjs` vendors all 8 faces (196 kB total) to
`/fonts/`, latin subset only, `font-display: swap`, with the two above-the-fold
faces preloaded.
**Impact:** High on FCP/LCP, especially on Nepali mobile connections.

### H6 — Colour contrast below WCAG AA ✅
**Measured:** `faint: #565E82` on `void: #06080F` = **3.21:1**, against a 4.5:1
requirement — and used at 10–11px for telemetry labels, boot lines, footer and
nav on every page.
**Fix:** `#7C86AC` = **5.59:1**. `dim` was already fine at 6.63:1.
**Impact:** Legal/ethical baseline, and a Lighthouse a11y blocker.

### H7 — Placeholder testimonials presented as real ✅ ⚠️
**Was:** four testimonials attributed to named people at "Tech Innovators",
"Everest Retail", "DataPrime", "InnovateTech".
**Fix:** removed entirely, along with 1.6 MB of associated PNGs. **No `Review` or
`AggregateRating` schema has been added** and none should be until you have real,
attributable reviews — fabricated review markup is an explicit structured-data
policy violation and a manual-action risk.
**Your action:** collect two or three real quotes (even from colleagues at MAW
Vriddhi or Wimslab, clearly attributed). Then testimonials and Review schema can
go back in, honestly, in about ten minutes of work.

---

## Medium priority

### M1 — Hydration mismatch in capability detection ✅
`useCapabilities` seeded state from `detect()` on the client's first render while
the server rendered all-false. Under SSR that is a hydration mismatch that can
blank out interactive regions. Now returns SSR defaults on first paint and
upgrades in an effect.

### M2 — No canonical URL discipline ✅
Trailing-slash form is now canonical everywhere, enforced by `trailingSlash: true`
in `vercel.json`, `dirStyle: "nested"` in the build, and asserted by the audit
script.

### M3 — three.js on the critical path ✅
**Measured:** 815 kB raw / 213 kB gzipped. Now a lazily-imported chunk referenced
by **no page's preload list** — it downloads only when the WebGL hero actually
mounts on a capable device. Service pages ship 137 kB gz of JS total.

### M4 — No skip link, focus management or landmarks ✅
Added skip link, `:focus-visible` ring system, `<main>` landmark with route-change
focus (WCAG 2.4.3), `aria-current` on nav, `aria-labelledby` on sections,
`prefers-reduced-motion` honoured globally.

### M5 — Global `cursor: none` ✅
`.native-cursor-off * { cursor: none !important }` applied unconditionally.
Now scoped to `(pointer: fine) and (prefers-reduced-motion: no-preference)`.

### M6 — No security or cache headers ✅
GitHub Pages could not set them. `vercel.json` adds HSTS, CSP, `X-Content-Type-
Options`, `Referrer-Policy`, `Permissions-Policy`, plus immutable caching on
`/assets/` and `/fonts/`.

### M7 — Blog and service pages listed but unwritten ✅ (by design)
Thirteen routes carry `published: false`. They are excluded from the sitemap, the
nav and the footer until their content lands. Publishing a sitemap full of thin
pages is a quality signal you cannot easily undo.

---

## Low priority

- **L1 — No RSS feed** ✅ `/rss.xml` generated; autodiscovery link in `<head>`.
- **L2 — No `llms.txt`** ✅ Added, including an explicit accuracy note telling AI
  summarisers not to describe the concept builds as client work.
- **L3 — No web manifest** ✅ Added.
- **L4 — No HTML sitemap** ✅ `/sitemap/` added, generated from the route table.
- **L5 — No privacy policy** ✅ Added; accurate to what the site actually does
  (no analytics, no cookies, FormSubmit for the contact form).
- **L6 — Meta `keywords` tag** ✅ Removed. Ignored by every major engine since
  2009 and a mild spam signal.
- **L7 — `og:image` assets don't exist yet** 🔜 `DEFAULT_OG_IMAGE` points at
  `/og/default.png`, which is not yet created. See "Outstanding" below.

---

## Outstanding — needs you

| # | Item | Why it matters |
|---|---|---|
| 1 | **Create `/og/default.png`** (1200×630) | Every share preview currently points at a missing image. Highest-value 30 minutes on this list. |
| 2 | **Solera's own page credits Claude as designer** | It states it is "a fictional design piece by Claude". A prospect who clicks through from your portfolio reads that. Edit the footer on that project before linking it prominently. |
| 3 | **Real testimonials** | Unblocks Review schema and the strongest trust element on the site. |
| 4 | **Google Business Profile** | LocalBusiness schema is in place, but the Maps listing comes from GBP. This is the main lever for "near me" queries. |
| 5 | **Search Console + Bing Webmaster** | Submit the sitemap, request indexing on the nine live URLs. |
| 6 | **Nepal-based restaurant demo** | Four of five concept builds are for foreign fictional businesses (Jerez, Doha, Maldives). Only Himalaya & Ember is Nepali — which weakens the "Restaurant Website Nepal" claim. |

---

## Verification commands

```bash
npm run build        # typecheck, SSG build, sitemap, RSS, 404 promotion
npm run seo:audit    # fails on duplicate/missing metadata, bad schema, thin HTML
npm run images       # regenerate responsive image variants
npm run seo:generate # sitemap + RSS only, against an existing dist/
```

`npm run seo:audit` is the gate. It checks, per page: exactly one title,
description, canonical and H1; title and description length; cross-page
uniqueness; canonical host and trailing slash; valid non-empty JSON-LD `@graph`;
at least 800 characters of text in the raw pre-JS HTML; `alt` on every image; and
that the sitemap and the emitted pages agree in both directions.
