# SEO Documentation

Strategy and reference for suraj-tamang.com.np. Written to be executed, not filed.

| Document | What it's for |
|---|---|
| [audit.md](./audit.md) | Full audit — every issue found, what was fixed, what's outstanding |
| [keyword-map.md](./keyword-map.md) | One primary keyword per URL, priority order, cannibalisation watch list |
| [content-clusters.md](./content-clusters.md) | Pillar/supporting structure and internal linking rules |
| [blog-topics.md](./blog-topics.md) | 100 topics across six clusters, with target queries |
| [faq-bank.md](./faq-bank.md) | 50 FAQs mapped to pages, for `FAQPage` schema |
| [blog-template.md](./blog-template.md) | Reusable post structure, front matter and checklists |
| [backlink-plan.md](./backlink-plan.md) | 12-month link acquisition, phased by effort-to-value |
| [personal-brand.md](./personal-brand.md) | Entity SEO, Knowledge Panel, profile consistency |
| [content-calendar.md](./content-calendar.md) | 12-month schedule at a sustainable cadence |
| [image-seo.md](./image-seo.md) | Alt text, filenames, responsive strategy |
| [../DEPLOYMENT.md](../DEPLOYMENT.md) | GitHub Pages → Vercel cutover |

---

## Where the implementation lives

| Concern | File |
|---|---|
| Site constants, `sameAs`, areas served | `src/seo/site.ts` |
| **Route table — the single source of truth** | `src/seo/routes.ts` |
| JSON-LD builders (all schema types) | `src/seo/schema.ts` |
| Per-page head + structured data | `src/seo/Seo.tsx` |
| Sitemap generation | `scripts/generate-sitemap.mjs` |
| RSS generation | `scripts/generate-rss.mjs` |
| **Post-build SEO assertions** | `scripts/audit-metadata.mjs` |
| Font vendoring | `scripts/fetch-fonts.mjs` |
| Responsive images | `scripts/optimize-images.mjs` |
| Redirects, headers, caching | `vercel.json` |

---

## The three things that matter most

**1. `src/seo/routes.ts` is the source of truth.** Adding a page means adding one
record. The sitemap, nav, footer, breadcrumbs, related links and metadata all read
from it. Nothing else needs editing.

**2. `published: false` is the safety catch.** A route with that flag is excluded
from the sitemap, the nav and the footer. Flip it in the same commit that lands the
content — never before. Publishing thin pages is a quality signal that is slow and
expensive to undo.

**3. `npm run seo:audit` is the gate.** Run it before every push. It caught a
duplicate-`<title>` bug on every page during the initial build that would have been
invisible in code review.

---

## Do not do

- Add `Review` or `AggregateRating` schema until real, attributable reviews exist.
  Fabricated review markup is an explicit policy violation with manual-action risk.
- Describe the five concept builds as client work. They are self-initiated design
  studies for fictional businesses, several of which say so on their own pages.
- Build eight near-identical city landing pages. Four with genuinely distinct
  content; the rest covered as sections.
- Buy links.
