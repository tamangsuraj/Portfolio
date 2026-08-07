# Keyword Map

One primary keyword per URL. No two URLs share a primary — that rule is what
prevents keyword cannibalisation, the most common self-inflicted SEO wound, where
two of your own pages split the signals for one term and neither ranks.

The machine-readable version of this table lives in `src/seo/routes.ts` under each
route's `keywords` block. Treat that file as the source of truth; this document
explains the reasoning.

**Difficulty** is a judgement for the Nepali market: Low = thin competition, mostly
directory spam. Medium = a handful of real agencies competing. High = established
agencies with backlink profiles.

---

## Tier 1 — Brand (own these completely)

| URL | Primary | Intent | Difficulty |
|---|---|---|---|
| `/` | Suraj Tamang | Navigational | Low |
| `/about/` | Suraj Tamang business analyst | Navigational | Low |
| `/work/` | Suraj Tamang portfolio | Commercial | Low |
| `/contact/` | contact Suraj Tamang | Transactional | Low |

Supporting terms across these four: *Suraj Tamang Nepal · Suraj Tamang MIS ·
Suraj Tamang data analyst · Suraj Tamang website developer · Suraj Tamang
Kathmandu · Suraj Tamang Herald College*.

**Strategy.** These should be winnable within weeks, not months. The blockers are
entity consolidation and profile consistency, not content — see
`personal-brand.md`. The one real competitor for your name is other people called
Suraj Tamang, which is why the `sameAs` graph and consistent bio across GitHub,
LinkedIn, Instagram and Facebook matter more here than any on-page tweak.

---

## Tier 2 — Pillar hubs (commercial, medium difficulty)

| URL | Primary | Secondary | Difficulty |
|---|---|---|---|
| `/services/` | business analyst services Nepal | MIS consulting Nepal, freelance developer Nepal | Medium |
| `/services/data/` | MIS consulting Nepal | business intelligence services Nepal, data analytics Kathmandu | Medium |
| `/services/web/` | freelance website developer Nepal | website developer Kathmandu, small business website Nepal | High |

---

## Tier 3 — Data & MIS service pages

| URL | Primary | Long-tail targets |
|---|---|---|
| `…/power-bi-dashboard-development/` | Power BI developer Nepal | hire Power BI developer in Nepal · Power BI dashboard cost Nepal · sales dashboard Power BI Nepal |
| `…/dashboard-development/` | dashboard developer Nepal | build a KPI dashboard for my business Nepal · real time dashboard Nepal |
| `…/business-analyst-services/` | business analyst Nepal | hire a business analyst in Nepal · business requirements document Nepal |
| `…/mis-consulting/` | MIS executive Nepal | what does an MIS officer do Nepal · outsourced MIS reporting Nepal |
| `…/excel-automation/` | Excel dashboard Nepal | automate Excel reports Nepal · Excel dashboard template Nepali business |
| `…/google-sheets-automation/` | Google Sheets dashboard Nepal | automate Google Sheets reports Nepal · free dashboard for small business Nepal |

**Note on "MIS Executive Nepal" and "MIS Officer Nepal".** These are largely *job
seeker* queries, not client queries — people looking for MIS roles, not hiring
consultants. Ranking for them still helps the personal brand and can attract
employers, but do not expect freelance leads from them. The MIS consulting page
targets the term while the content serves both readers.

---

## Tier 4 — Web development service pages

| URL | Primary | Long-tail targets |
|---|---|---|
| `…/restaurant-website-development/` | restaurant website Nepal | how much does a restaurant website cost in Nepal · restaurant website with online menu Nepal · best restaurant websites Kathmandu |
| `…/cafe-website-development/` | cafe website Nepal | website for a cafe in Kathmandu · cafe website cost Nepal |
| `…/hotel-website-development/` | hotel website Nepal | hotel booking website development Nepal · homestay website Nepal |
| `…/small-business-website-development/` | small business website Nepal | cheap website for small business Nepal · website for shop in Kathmandu |
| `…/automotive-website-development/` | automotive website Nepal | vehicle dealership website development Nepal · showroom website design Nepal |
| `…/website-maintenance/` | website maintenance Nepal | monthly website maintenance cost Nepal · who can update my website Nepal |

**Highest commercial value on the whole site:** `restaurant website Nepal` and its
cost variant. Transactional intent, a buyer with a budget, and weak incumbents.
This page should be written first and best.

---

## Priority order for writing

Ranked by (commercial value × winnability) ÷ effort:

1. `/services/web/restaurant-website-development/` — the flagship
2. `/services/data/power-bi-dashboard-development/` — your strongest genuine expertise
3. `/services/web/small-business-website-development/` — broadest web demand
4. `/services/data/excel-automation/` — low competition, fast to rank
5. `/services/web/cafe-website-development/` — near-duplicate audience to #1
6. `/services/data/google-sheets-automation/` — very low competition
7. `/services/data/mis-consulting/` — brand support
8. `/services/web/hotel-website-development/` — high value, more competition
9. `/services/data/business-analyst-services/`
10. `/services/web/website-maintenance/` — recurring revenue, low search volume
11. `/services/data/dashboard-development/` — risk of overlap with #2, differentiate on tool choice
12. `/services/web/automotive-website-development/` — niche, but you have real domain credibility here

---

## Cannibalisation watch list

These pairs are close enough to compete with each other. Keep the distinction
sharp in the H1, title and opening paragraph:

- `dashboard-development` vs `power-bi-dashboard-development` — the generic page
  must be about **choosing the right tool**; the Power BI page about **Power BI
  specifically**. If the generic page starts talking mostly about Power BI, merge
  them.
- `excel-automation` vs `google-sheets-automation` — split on platform, and be
  explicit about when each is the right answer.
- `restaurant-website-development` vs `cafe-website-development` — genuinely
  different buyers (table booking and menu depth vs hours, photos and footfall).
  If you cannot fill 1,500 distinct words on the cafe page, fold it into the
  restaurant page as a section and 301 the URL.
- `/services/` vs the two pillar hubs — the top hub must stay a *router*, short
  and link-heavy. It should not try to rank for the pillar terms.

---

## What not to chase

- **"Business Analyst"** unqualified — global, dominated by course sellers and job
  boards. Always qualify with Nepal or a city.
- **Eight separate city landing pages.** Near-identical location pages are the
  textbook doorway-page pattern under Google's spam policies. Build four with
  genuinely distinct content (Kathmandu, Lalitpur, Pokhara, Chitwan) and cover the
  rest inside them.
- **"Free website Nepal"** — attracts enquiries that never convert.
