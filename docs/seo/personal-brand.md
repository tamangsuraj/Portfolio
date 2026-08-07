# Personal Brand & Entity SEO

Goal: when someone searches **"Suraj Tamang"**, this site is the first result and
the surrounding results are all yours.

The obstacle is not competition from businesses — it's that you share a name with
other people. Google resolves that by building an *entity*: a single node in its
Knowledge Graph that ties together every mention of a specific Suraj Tamang. Your
job is to make that node unambiguous.

---

## How entity consolidation actually works

Google links profiles into one entity through **corroboration**: the same name,
description, image and links appearing consistently across independent sources
that reference each other. The `sameAs` array in your Person schema declares the
set; the profiles linking back confirm it.

This is already implemented in `src/seo/site.ts`:

```ts
export const SOCIAL_PROFILES = [
  "https://github.com/tamangsuraj",
  "https://www.linkedin.com/in/surajtamang10/",
  "https://www.instagram.com/tamangsuraj003/",
  "https://www.facebook.com/surajtitung.tamang.9/",
];
```

**The half you still have to do:** each of those profiles must link back to
`https://www.suraj-tamang.com.np`. A one-directional declaration is a claim; a
reciprocal one is evidence.

---

## The consistency checklist

Use these strings **byte-identical** everywhere. Variation is what splits an
entity in two.

| Field | Canonical value |
|---|---|
| Name | `Suraj Tamang` |
| Headline | `MIS & Business Intelligence Analyst` |
| Location | `Kathmandu, Nepal` |
| Website | `https://www.suraj-tamang.com.np` |
| Email | `tamangsuraj003@gmail.com` |
| Photo | The same portrait on every profile — the image itself is a matching signal |

**Short bio** (reuse verbatim):

> MIS and business intelligence analyst in Kathmandu, Nepal. I build sales
> dashboards, executive reporting automation and MIS systems, and develop
> websites for restaurants and small businesses across Nepal.

---

## Where to apply it

- [ ] LinkedIn — headline, About, Featured link, custom URL
- [ ] GitHub — bio, website field, profile README
- [ ] Instagram — bio, link
- [ ] Facebook — intro, website field
- [ ] Dev.to / Hashnode / Medium — bio + website
- [ ] Behance / Dribbble — bio + website
- [ ] Google Business Profile — same name, same description
- [ ] Email signature — name, title, site URL
- [ ] Resume.pdf — the site URL on it (it's downloadable from `/`, and PDFs get indexed)

---

## Knowledge Panel

A personal Knowledge Panel is **not guaranteed** and cannot be requested — Google
generates one when it has enough corroborated information about a notable entity.
Realistically, for someone early in their career, this is a 12–24 month
proposition and may not happen at all. What follows genuinely improves the odds;
none of it guarantees the outcome.

1. **Person schema with `sameAs`** ✅ already implemented, emitted on `/` and
   `/about/` with a shared `@id`.
2. **A dedicated `/about/` page** ✅ with `ProfilePage` schema — this is the page
   Google most likely treats as your canonical description.
3. **Consistent mentions across independent sites** — the profiles above, plus
   guest posts and directory listings.
4. **A Wikidata entry** — the strongest single lever, but Wikidata has notability
   requirements. Do not create a self-serving entry; it will be deleted and it
   looks bad. Revisit if you get press coverage or publish something notable.
5. **Press or third-party coverage** — the original-data study in
   `backlink-plan.md` (Phase 4) is your most plausible route to this.

**What to do instead, in the meantime:** aim to own the whole first page for your
name — your site, LinkedIn, GitHub, Dev.to, Behance, Instagram. That achieves most
of the practical benefit of a Knowledge Panel (control of your search results)
without depending on Google's discretion.

---

## Search result real estate

Target state for a `Suraj Tamang` search:

```
1. suraj-tamang.com.np                    ← with sitelinks
2. linkedin.com/in/surajtamang10
3. github.com/tamangsuraj
4. suraj-tamang.com.np/about/
5. dev.to / hashnode profile
6. behance.net profile
```

**Sitelinks** (the indented sub-links under result 1) are generated automatically
when Google is confident about your site structure. The multi-page architecture,
clear navigation, breadcrumbs and HTML sitemap shipped in this pass are exactly
the inputs for that. They typically appear a few months after a site's structure
stabilises.

---

## Author attribution on the blog

When the blog launches, every post needs:

- A visible byline linking to `/about/`
- `author: { "@id": PERSON.id }` in the `BlogPosting` schema ✅ already wired in
  `articleSchema()`
- An author bio block at the end of each post

That connects every article to the same Person entity, so the blog builds your
personal authority rather than a set of disconnected pages.

---

## Reputation management

Search your own name monthly. If something unwanted ranks:

- **You can't remove it**, but you can outrank it — publish and strengthen the
  profiles above.
- Set up a Google Alert for `"Suraj Tamang"`.
- Keep old or abandoned profiles either updated or deleted. A stale profile with
  a wrong job title is an active entity-splitting signal.
