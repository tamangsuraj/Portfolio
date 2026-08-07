# Deployment — migrating from GitHub Pages to Vercel

The GitHub Pages workflow (`.github/workflows/deploy.yml`) and `public/CNAME` have
been removed. This document is the cutover.

**Do the steps in order.** Step 4 is the point of no return for DNS, and doing it
before the Vercel deployment is verified means downtime.

---

## 1. Push the code

```bash
git add -A
git commit -m "Rebuild as pre-rendered multi-page site with full SEO foundation"
git push origin main
```

Nothing deploys yet — the Pages workflow is gone and Vercel isn't connected.

## 2. Create the Vercel project

1. vercel.com → **Add New → Project** → import `tamangsuraj/Portfolio`
2. Vercel reads `vercel.json`, so the settings should auto-fill:
   - Framework preset: **Other**
   - Build command: `npm run build`
   - Output directory: `dist`
   - Install command: `npm ci`
3. Node version: **22** (Settings → General → Node.js Version)
4. Deploy.

## 3. Verify on the Vercel preview URL

Before touching DNS, confirm everything works on `*.vercel.app`:

```bash
# Content present without JavaScript — the critical check
curl -s https://<project>.vercel.app/services/web/ | grep -c "Three things break"

# Trailing-slash redirect (expect 308)
curl -sI https://<project>.vercel.app/services/web | grep -i "location\|HTTP/"

# A genuine 404 status, not a redirect to home
curl -sI https://<project>.vercel.app/does-not-exist | head -1

# Crawl files
curl -s https://<project>.vercel.app/robots.txt
curl -s https://<project>.vercel.app/sitemap.xml | head -20

# Security + cache headers
curl -sI https://<project>.vercel.app/ | grep -i "strict-transport\|content-security"
curl -sI https://<project>.vercel.app/assets/*.js | grep -i cache-control
```

Also run Lighthouse against the preview URL. Fix anything here — it's free until
DNS points at it.

## 4. Point the domain

In **Vercel → Settings → Domains**, add both:
- `www.suraj-tamang.com.np` ← primary
- `suraj-tamang.com.np` → set to redirect to the www version

Then at your registrar (wherever `.com.np` is managed):

| Type | Name | Value |
|---|---|---|
| CNAME | `www` | `cname.vercel-dns.com` |
| A | `@` | `76.76.21.21` |

Remove the old GitHub Pages records (the four `185.199.10x.153` A records, and any
`www` CNAME pointing at `tamangsuraj.github.io`).

DNS propagation is usually minutes but can take up to 48 hours. Vercel issues the
TLS certificate automatically once the records resolve.

> **`.com.np` note:** these are administered by Mercantile Communications and DNS
> changes sometimes need a support request rather than a self-service panel. Budget
> a couple of days for this step.

## 5. Turn off GitHub Pages

GitHub → repo → Settings → Pages → Source: **None**. Leaving it on means two live
copies of the site on different hosts, which is a genuine duplicate-content
problem.

## 6. Post-launch

```bash
# Confirm the canonical host resolves and redirects correctly
curl -sI https://suraj-tamang.com.np/ | grep -i "location\|HTTP/"
curl -sI https://www.suraj-tamang.com.np/ | head -1
```

Then:

- **Search Console** — add `https://www.suraj-tamang.com.np` as a domain property,
  submit `/sitemap.xml`, and use URL Inspection → Request Indexing on all nine live
  URLs. Do this manually; it's much faster than waiting for discovery.
- **Bing Webmaster Tools** — same, and it can import from Search Console.
- Watch Search Console **Coverage** for the first fortnight. The old soft-404s from
  the previous `404.html` redirect will take a few weeks to clear.

---

## Ongoing

Every push to `main` triggers a production deploy. Pull requests get preview URLs
automatically.

**Before pushing anything that touches content or routes:**

```bash
npm run build && npm run seo:audit
```

The audit fails on duplicate or missing metadata, invalid schema, missing H1s,
images without alt text, and any page whose raw HTML is suspiciously thin. Treat a
failure as a blocker, not a warning — it is checking exactly the class of bug that
is invisible in review and expensive in production.

Consider adding it as a Vercel "Ignored Build Step" or a GitHub Action so a broken
build can't reach production.

---

## Rollback

Vercel keeps every deployment. **Deployments → ⋯ → Promote to Production** on any
previous build rolls back instantly. No DNS changes needed.

---

## Environment variables

None required. The contact form posts directly to FormSubmit from the browser.

If you later want the FormSubmit address out of the page source, activate a masked
token and change `identity.formEndpoint` in `src/data/content.ts` to
`https://formsubmit.co/ajax/<token>`. It's a mild anti-scraping measure, not
security — the endpoint is public either way.
