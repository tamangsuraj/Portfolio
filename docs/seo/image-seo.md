# Image SEO

Images are the largest thing most sites ship and the most commonly wasted ranking
surface. The baseline here was a **1.31 MB portrait** — heavier than the entire
JavaScript bundle.

---

## The pipeline

Sources live in `assets-src/` (outside `public/`, so full-resolution originals are
never deployed). `npm run images` generates responsive variants into `public/img/`.

```bash
npm run images
```

Current output for `profile.png`:

| Variant | AVIF | WebP |
|---|---|---|
| 240px | 6.2 kB | 6.2 kB |
| 480px | 16.8 kB | 16.2 kB |
| 960px | 39.0 kB | 37.1 kB |

**1,275 kB → 16.8 kB** at the size actually displayed. Plus one PNG fallback.

To add an image: drop it in `assets-src/`, add an entry to `TARGETS` in
`scripts/optimize-images.mjs`, run `npm run images`.

---

## Rendering

Always use `<Picture>` (`src/components/Picture.tsx`) — never a bare `<img>`:

```tsx
<Picture
  name="profile"
  alt="Suraj Tamang, MIS and business intelligence analyst based in Kathmandu, Nepal"
  widths={[240, 480, 960]}
  sizes="(min-width: 1024px) 420px, (min-width: 640px) 50vw, 90vw"
  width={480}
  height={480}
/>
```

It emits AVIF → WebP → PNG, lazy-loads by default, and requires `alt` at the type
level. `width` and `height` are mandatory: they let the browser reserve the box
before the bytes arrive, which is what keeps Cumulative Layout Shift at zero.

**`priority`** — set it on an above-the-fold LCP image only. It switches to eager
loading and `fetchpriority="high"`. Setting it on more than one image per page
defeats the purpose.

**`sizes`** — describe the *rendered* width at each breakpoint, not the file width.
Getting this wrong makes the browser download a variant far larger than needed, and
it is the most common mistake in responsive images.

---

## Filenames

The filename is a ranking signal in Google Images and appears in the URL.

- ✅ `restaurant-website-nepal-menu-page.avif`
- ✅ `power-bi-sales-dashboard-kathmandu.avif`
- ❌ `IMG_2847.jpg`, `screenshot-final-v2-FINAL.png`

Lowercase, hyphens, describe the subject. No keyword stuffing —
`restaurant-website-nepal-kathmandu-cheap-best-developer.jpg` is spam.

---

## Alt text

Alt text describes the image **for someone who cannot see it**. That is the whole
rule; SEO benefit follows from doing it properly.

| Context | Good alt |
|---|---|
| Portrait | `Suraj Tamang, MIS and business intelligence analyst based in Kathmandu, Nepal` |
| Dashboard screenshot | `Power BI sales dashboard showing enquiry to retail conversion by month` |
| Restaurant site screenshot | `Himalaya & Ember homepage showing the menu organised by elevation` |
| Decorative | `alt=""` — explicitly empty, never omitted |

Avoid: `image`, `photo`, `profile picture`, repeating the caption verbatim, or
starting with "Image of" (screen readers already announce it's an image).

**Decorative images must have `alt=""`.** Omitting the attribute makes screen
readers read the filename aloud. All decorative SVGs in this codebase already carry
`aria-hidden` and `focusable="false"`.

`npm run seo:audit` fails the build on any `<img>` without an `alt` attribute.

---

## Captions

Use `<figure>` / `<figcaption>` when the caption adds information the image doesn't
carry — a client name, a metric, a date. Captions are read more often than body
copy, so don't waste them restating the obvious.

---

## Screenshots for case studies

When you write up the concept builds:

1. Capture at 2× (retina) and let the pipeline downscale.
2. Screenshot the *interesting* part — the menu structure, the booking flow — not
   the whole page at 10% zoom where nothing is legible.
3. Name by what it shows: `himalaya-ember-menu-by-elevation.png`.
4. Alt text describing the *design decision*, not just the object.
5. Caption the pattern being demonstrated.

---

## Still to do

- **`/og/default.png`** (1200×630) — every social share currently points at a
  missing file. `DEFAULT_OG_IMAGE` in `src/seo/site.ts` already references it.
  Highest-value image task on this list.
- **Per-page OG images** — set `ogImage` on individual routes once the service
  pages exist. A share card that names the specific service converts far better
  than a generic one.
- **Case study screenshots** — none exist yet.
- **Image sitemap entries** — worth adding once there are real project screenshots
  worth surfacing in Google Images.
