# Content Clusters & Internal Linking

Topical authority comes from covering a subject completely and wiring the pieces
together, not from publishing more pages. The pattern is the same every time:
one **pillar** page that owns the broad commercial term, and supporting posts that
each own one narrow query and link up to the pillar.

Links flow **up** from supporting posts to the pillar (concentrating authority on
the page that converts) and **across** between siblings (helping Google understand
they're one topic). The pillar links **down** to every supporting post.

---

## Cluster A — Restaurant websites

```
        /services/web/restaurant-website-development/   ← PILLAR
                              ▲
   ┌──────────────┬───────────┼───────────┬──────────────┐
   │              │           │           │              │
 cost         menu design  online     restaurant     booking
 (#1)           (#8,#18)   ordering      SEO          systems
                             (#5)      (#14,#3)        (#7)
   │              │           │           │              │
   └──────────────┴───────────┼───────────┴──────────────┘
                              ▼
              /work/ (Himalaya & Ember, Solera, Marhaba)
                       /contact/
```

Also linking into this cluster: cafe websites, hotel websites, Google Business
Profile (#81), website speed (#9), photography (#6).

## Cluster B — Power BI & dashboards

```
        /services/data/power-bi-dashboard-development/   ← PILLAR
                              ▲
   ┌──────────────┬───────────┼───────────┬──────────────┐
 dashboard      tool        data        funnel        cost &
  design      choice      modelling    reporting     licensing
 (#21,#22)   (#23,#40)   (#25,#26,#27) (#28,#69)    (#24,#37)
   │              │           │           │              │
   └──────────────┴───────────┼───────────┴──────────────┘
                              ▼
        /work/ (MAW Vriddhi platform, Wimslab dashboards)
                       /contact/
```

## Cluster C — MIS & business analysis

```
          /services/data/mis-consulting/   ← PILLAR
                       ▲
   ┌──────────┬────────┼────────┬──────────┐
 what MIS   metric   reporting  require-   automation
   is     definitions cadence    ments      first
 (#61,#62)  (#64,#67) (#65,#71) (#63,#74)   (#66,#76)
   │          │        │          │           │
   └──────────┴────────┼──────────┴───────────┘
                       ▼
      /services/data/ · /about/ (methodology) · /contact/
```

## Cluster D — Spreadsheet automation

Pillar: `/services/data/excel-automation/`, with
`/services/data/google-sheets-automation/` as a paired sibling pillar.
Supporting: #41–#60. The two pillars **must** cross-link with an explicit
"which one is right for you" framing, or they will cannibalise each other.

## Cluster E — Small business tech & local SEO

Pillar: `/services/web/small-business-website-development/`
Supporting: #81–#95. This cluster feeds both web-service pillars and is the main
entry point for people who don't yet know what they need.

---

## Internal linking rules

**1. Every post links to exactly one pillar, high in the body.**
Not in a footer block — inside the first third of the article, in a sentence where
it reads naturally.

**2. Anchor text is descriptive, never generic.**
"Restaurant website development" tells Google what the destination is about;
"click here" and "read more" tell it nothing. Vary the phrasing across posts so it
doesn't look automated.

**3. Every post links to 2–4 siblings in the same cluster.**
Contextually, where the reader would actually want them.

**4. Every commercial page ends with one clear CTA to `/contact/`.**
Handled site-wide by `<CtaBand>`.

**5. Nothing is orphaned.**
The footer renders every published route from the route table, and `/sitemap/`
lists all of them. Crawl depth stays ≤ 2 from the home page.

**6. Three to eight internal links per 1,000 words.**
Fewer and the cluster doesn't bind; more and it reads like SEO exhaust.

---

## Where the code enforces this

| Mechanism | File | What it does |
|---|---|---|
| `related` array | `src/seo/routes.ts` | Curated per-route links, rendered by `<RelatedLinks>` |
| Footer hub | `src/components/Footer.tsx` | Auto-links every published route |
| Breadcrumbs | `src/components/Breadcrumbs.tsx` | Visible trail + matching `BreadcrumbList` JSON-LD |
| HTML sitemap | `src/pages/SitemapPage.tsx` | Every indexable URL, one click away |
| `published` flag | `src/seo/routes.ts` | Prevents linking to pages that would 404 |

Adding a link between two pages is a one-line change to `related` in the route
table. Nothing else needs touching.

---

## The one thing that matters most

If you only follow one rule: **when you publish a post, go back and add a link to
it from the pillar and from one sibling.** New posts with no inbound internal
links take far longer to get crawled and rank, and this is the step everyone
skips. Ten minutes per post.
