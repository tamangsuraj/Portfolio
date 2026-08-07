# Blog Post Template

Copy this for every post. The structure is not decoration — each element maps to
something Google reads or a reader decides on.

---

## Front matter

```json
{
  "slug": "how-much-does-a-restaurant-website-cost-in-nepal",
  "title": "How Much Does a Restaurant Website Cost in Nepal? (2026)",
  "seoTitle": "Restaurant Website Cost in Nepal — 2026 Price Guide",
  "excerpt": "What a restaurant website actually costs in Nepal, what drives the price up or down, and how to tell whether a quote is fair.",
  "date": "2026-09-01",
  "updated": "2026-09-01",
  "category": "Restaurant Websites",
  "cluster": "restaurant-websites",
  "pillar": "/services/web/restaurant-website-development/",
  "keywords": ["restaurant website cost nepal", "restaurant website price"],
  "readTime": "8 min",
  "published": true
}
```

**Slug** — lowercase, hyphenated, keyword-bearing, no dates or stop words. Never
change it after publishing; if you must, add a 301 in `vercel.json`.

**title vs seoTitle** — `title` is the H1 a human reads. `seoTitle` is the
`<title>` tag, kept ≤ 60 characters so it survives SERP truncation. They're allowed
to differ, and usually should.

**excerpt** — this becomes the meta description. 140–158 characters. Write it to
earn a click, not to repeat the keyword.

---

## Structure

```markdown
# H1 — matches `title`, contains the primary keyword naturally

Opening paragraph: answer the question in the first two sentences.
Do not warm up. Someone searching "how much does X cost" wants a number,
and Google lifts these sentences for featured snippets.

> **Short answer:** NPR 40,000–120,000 depending on scope. [callout box]

## H2 — the first real section

Body. Link to the pillar page early and naturally.

### H3 — subsection where genuinely needed

Don't use H3 for visual variety. Use it when a section has real sub-parts.

## H2 — What drives the price

Tables and lists — these get lifted into featured snippets more often
than prose.

## H2 — How to tell if a quote is fair

## H2 — Frequently asked questions

3–5 questions specific to this post, not repeated from any other page.

## H2 — Related reading

2–4 sibling posts in the same cluster.
```

**Heading rules:** exactly one H1. Never skip a level. Headings describe content,
not keywords — "What drives the price" beats "Restaurant Website Cost Factors
Nepal".

---

## Required elements

| Element | Why |
|---|---|
| Answer in the first 2 sentences | Featured snippet eligibility |
| 1 link to the pillar, high in the body | Cluster authority flows up |
| 2–4 sibling links | Binds the cluster |
| 1 link to `/work/` or a case study | Proof |
| 1 CTA to `/contact/` at the end | Conversion |
| 3–5 unique FAQs | `FAQPage` schema |
| Author byline linking `/about/` | Ties the post to the Person entity |
| At least one image with real alt text | Accessibility + image search |
| `BlogPosting` schema | Handled by `articleSchema()` |

---

## Schema

Already implemented — pass the front matter through:

```tsx
<Seo
  path={`/blog/${post.slug}/`}
  title={post.seoTitle}
  description={post.excerpt}
  ogType="article"
  publishedTime={post.date}
  modifiedTime={post.updated}
  schema={[
    articleSchema({
      path: `/blog/${post.slug}/`,
      headline: post.title,
      description: post.excerpt,
      datePublished: post.date,
      dateModified: post.updated,
      keywords: post.keywords,
      articleSection: post.category,
      wordCount: post.wordCount,
    }),
    faqSchema(`/blog/${post.slug}/`, post.faqs),
  ]}
/>
```

---

## Before publishing

- [ ] Query answered in the first two sentences
- [ ] One H1; heading levels not skipped
- [ ] `seoTitle` ≤ 60 chars, `excerpt` 140–158
- [ ] Slug is final
- [ ] Pillar link present, high in the body, with descriptive anchor text
- [ ] 3–8 internal links per 1,000 words
- [ ] FAQs unique to this post
- [ ] Every image has alt text and explicit width/height
- [ ] No invented statistics, and every number sourced
- [ ] `npm run build && npm run seo:audit` passes

## After publishing

- [ ] Add an inbound link **from the pillar** and **from one sibling** — the step
      everyone skips, and the one that most affects how fast it ranks
- [ ] Add the record to `src/data/posts.json` so it enters the RSS feed
- [ ] Flip `published: true` in the route table
- [ ] Request indexing in Search Console
- [ ] Syndicate to Dev.to / Hashnode **with `canonical_url` back to your post**,
      and only after your version is indexed

---

## Tone

Write the way the site already reads: direct, specific, willing to say the
unhelpful-but-true thing. The most persuasive line in a commercial post is usually
the one where you tell the reader they might not need to buy anything.

Avoid: "In today's digital landscape", "Let's dive in", "game-changer", padded
introductions, and restating the question before answering it.
