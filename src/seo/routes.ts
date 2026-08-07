/**
 * THE ROUTE TABLE — single source of truth for the whole site.
 *
 * The sitemap generator, RSS feed, <Seo> component, breadcrumb trail, nav,
 * footer link hub and internal-linking blocks all read from this file.
 * Adding a page means adding one record here; nothing else needs touching.
 *
 * `published: false` keeps a route out of the sitemap, nav and footer while its
 * content is still being written. This is deliberate — shipping a sitemap that
 * lists thin or empty pages wastes crawl budget and invites a quality demotion.
 * Flip the flag in the same commit that lands the content.
 *
 * The `keywords` block doubles as the keyword map deliverable: one primary term
 * per URL, no two URLs competing for the same primary (that is keyword
 * cannibalisation, the most common self-inflicted SEO wound).
 */

import { DEFAULT_OG_IMAGE, canonical } from "./site";

export type Intent = "navigational" | "informational" | "commercial" | "transactional";

export type RouteGroup =
  | "primary"
  | "data-service"
  | "web-service"
  | "work"
  | "blog"
  | "location"
  | "legal"
  | "utility";

export interface RouteKeywords {
  /** Exactly one per URL. Must be unique across the whole table. */
  primary: string;
  secondary: string[];
  longTail: string[];
}

export interface RouteMeta {
  path: string;
  /** <title>. Aim 50–60 chars so it survives the SERP truncation point. */
  title: string;
  /** Meta description. Aim 140–158 chars. Written to earn the click, not to rank. */
  description: string;
  /** The single <h1> for the page. */
  h1: string;
  /** Short label for nav, footer and breadcrumbs. */
  navLabel: string;
  group: RouteGroup;
  intent: Intent;
  keywords: RouteKeywords;
  priority: number;
  changefreq: "daily" | "weekly" | "monthly" | "yearly";
  lastmod: string;
  published: boolean;
  noindex?: boolean;
  ogImage?: string;
  /** Curated internal links rendered in the page's "related" block. */
  related?: string[];
}

const TODAY = "2026-08-07";

export const ROUTES: RouteMeta[] = [
  /* ---------------------------------------------------------------- *
   * Primary
   * ---------------------------------------------------------------- */
  {
    path: "/",
    title: "Suraj Tamang — Business Intelligence & Web Developer, Nepal",
    description:
      "MIS and business intelligence analyst in Kathmandu. Power BI dashboards, reporting automation, and fast websites for restaurants and small businesses in Nepal.",
    h1: "Suraj Tamang — dashboards, MIS systems and websites built in Kathmandu",
    navLabel: "Home",
    group: "primary",
    intent: "navigational",
    keywords: {
      primary: "Suraj Tamang",
      secondary: ["Suraj Tamang Nepal", "Suraj Tamang portfolio", "Suraj Tamang MIS"],
      longTail: [
        "Suraj Tamang business analyst Kathmandu",
        "Suraj Tamang data analyst Nepal",
        "Suraj Tamang website developer",
      ],
    },
    priority: 1.0,
    changefreq: "weekly",
    lastmod: TODAY,
    published: true,
    related: ["/services/", "/work/", "/about/", "/contact/"],
  },
  {
    path: "/about/",
    title: "About Suraj Tamang — MIS & BI Analyst in Kathmandu, Nepal",
    description:
      "Who I am, how I work, and what I've shipped: BSc (Hons) Computing, MIS at MAW Vriddhi, Power BI and Tableau reporting, and websites for Nepali small businesses.",
    h1: "About Suraj Tamang",
    navLabel: "About",
    group: "primary",
    intent: "navigational",
    keywords: {
      primary: "Suraj Tamang business analyst",
      secondary: ["Suraj Tamang MIS executive", "MIS analyst Kathmandu"],
      longTail: [
        "who is Suraj Tamang Nepal",
        "Suraj Tamang Herald College Kathmandu",
        "MIS officer experience Nepal",
      ],
    },
    priority: 0.9,
    changefreq: "monthly",
    lastmod: TODAY,
    published: true,
    related: ["/work/", "/services/", "/contact/"],
  },
  {
    path: "/services/",
    title: "Services — BI Dashboards, MIS Consulting & Web Development",
    description:
      "Two practices, one operator: data work (Power BI, MIS, Excel and Sheets automation) and web work (restaurant, cafe, hotel and small business websites) across Nepal.",
    h1: "Services",
    navLabel: "Services",
    group: "primary",
    intent: "commercial",
    keywords: {
      primary: "business analyst services Nepal",
      secondary: ["MIS consulting Nepal", "freelance developer Nepal"],
      longTail: [
        "hire business analyst and web developer Nepal",
        "freelance data and web services Kathmandu",
      ],
    },
    priority: 0.9,
    changefreq: "monthly",
    lastmod: TODAY,
    published: true,
    related: ["/services/data/", "/services/web/", "/work/", "/contact/"],
  },
  {
    path: "/services/data/",
    title: "Data & MIS Services in Nepal — Power BI, Dashboards",
    description:
      "Dashboard development, MIS consulting, business analysis and spreadsheet automation for companies across Nepal. Built by a working MIS analyst.",
    h1: "Data, MIS & business intelligence services",
    navLabel: "Data & MIS",
    group: "primary",
    intent: "commercial",
    keywords: {
      primary: "MIS consulting Nepal",
      secondary: ["business intelligence services Nepal", "data analytics services Kathmandu"],
      longTail: [
        "MIS consultant for Nepali companies",
        "business intelligence consultant Kathmandu",
      ],
    },
    priority: 0.9,
    changefreq: "monthly",
    lastmod: TODAY,
    published: true,
    // Individual service pages are appended here as they publish; the helper
    // filters unpublished targets so this list can be written ahead of time.
    related: [
      "/services/data/power-bi-dashboard-development/",
      "/services/data/business-analyst-services/",
      "/services/data/excel-automation/",
      "/services/web/",
      "/work/",
      "/contact/",
    ],
  },
  {
    path: "/services/web/",
    title: "Web Development Services — Restaurant & Business Sites, Nepal",
    description:
      "Fast, SEO-ready websites for restaurants, cafes, hotels and small businesses in Nepal. Built to load quickly on mobile data and be found on Google.",
    h1: "Website development services",
    navLabel: "Web Development",
    group: "primary",
    intent: "commercial",
    keywords: {
      primary: "freelance website developer Nepal",
      secondary: ["website developer Kathmandu", "small business website Nepal"],
      longTail: [
        "affordable website developer Nepal",
        "hire freelance web developer Kathmandu",
      ],
    },
    priority: 0.9,
    changefreq: "monthly",
    lastmod: TODAY,
    published: true,
    related: [
      "/services/web/restaurant-website-development/",
      "/services/web/cafe-website-development/",
      "/services/web/hotel-website-development/",
      "/services/data/",
      "/work/",
      "/contact/",
    ],
  },
  {
    path: "/work/",
    title: "Work & Case Studies — Dashboards, ERP and Restaurant Websites",
    description:
      "Selected projects: a sales intelligence platform for MAW Vriddhi, automated executive reporting, Power BI dashboards, and five website concept builds.",
    h1: "Work and case studies",
    navLabel: "Work",
    group: "primary",
    intent: "commercial",
    keywords: {
      primary: "Suraj Tamang portfolio",
      secondary: ["Suraj Tamang restaurant website", "dashboard developer portfolio Nepal"],
      longTail: [
        "restaurant website examples Nepal",
        "Power BI dashboard portfolio Nepal",
      ],
    },
    priority: 0.9,
    changefreq: "monthly",
    lastmod: TODAY,
    published: true,
    related: ["/services/", "/about/", "/contact/"],
  },
  {
    path: "/blog/",
    title: "Blog — Dashboards, MIS, Excel and Restaurant Web Design",
    description:
      "Practical writing on Power BI, MIS reporting, Excel and Google Sheets automation, and building websites that actually win customers for Nepali restaurants and shops.",
    h1: "Blog",
    navLabel: "Blog",
    group: "primary",
    intent: "informational",
    keywords: {
      primary: "business intelligence blog Nepal",
      secondary: ["Power BI tutorial Nepal", "restaurant website tips Nepal"],
      longTail: ["how to build a sales dashboard Nepal", "restaurant marketing ideas Nepal"],
    },
    priority: 0.8,
    changefreq: "weekly",
    // Stays out of the sitemap and nav until real articles land. An empty blog
    // index is thin content — it spends crawl budget and signals low quality
    // for the exact queries the blog is meant to win.
    published: false,
    lastmod: TODAY,
    related: ["/services/", "/work/", "/contact/"],
  },
  {
    path: "/contact/",
    title: "Contact Suraj Tamang — Kathmandu, Nepal",
    description:
      "Tell me what you're trying to measure or sell, and I'll tell you what it takes. Email, phone and a short project brief form. Based in Kathmandu, available remotely.",
    h1: "Contact",
    navLabel: "Contact",
    group: "primary",
    intent: "transactional",
    keywords: {
      primary: "contact Suraj Tamang",
      secondary: ["hire business analyst Nepal", "hire website developer Kathmandu"],
      longTail: ["get a website quote Nepal", "book a dashboard consultation Kathmandu"],
    },
    priority: 0.8,
    changefreq: "yearly",
    lastmod: TODAY,
    published: true,
    related: ["/services/", "/work/"],
  },

  /* ---------------------------------------------------------------- *
   * Pillar A — Data & MIS service pages
   * ---------------------------------------------------------------- */
  {
    path: "/services/data/power-bi-dashboard-development/",
    title: "Power BI Dashboard Development in Nepal | Suraj Tamang",
    description:
      "Power BI dashboards that leadership actually opens: clean data models, the handful of metrics that matter, and automatic refresh. Built in Kathmandu for Nepali businesses.",
    h1: "Power BI dashboard development",
    navLabel: "Power BI Dashboards",
    group: "data-service",
    intent: "commercial",
    keywords: {
      primary: "Power BI developer Nepal",
      secondary: ["Power BI consultant Kathmandu", "Power BI dashboard Nepal"],
      longTail: [
        "hire Power BI developer in Nepal",
        "Power BI dashboard cost Nepal",
        "sales dashboard Power BI Nepal",
      ],
    },
    priority: 0.8,
    changefreq: "monthly",
    lastmod: TODAY,
    published: false,
  },
  {
    path: "/services/data/dashboard-development/",
    title: "Dashboard Development Services in Nepal | Suraj Tamang",
    description:
      "Custom dashboards in Power BI, Tableau, Google Sheets or a full web app — whichever fits your data and budget. Designed so the answer is obvious in five seconds.",
    h1: "Dashboard development",
    navLabel: "Dashboard Development",
    group: "data-service",
    intent: "commercial",
    keywords: {
      primary: "dashboard developer Nepal",
      secondary: ["custom dashboard development Kathmandu", "KPI dashboard Nepal"],
      longTail: ["build a KPI dashboard for my business Nepal", "real time dashboard Nepal"],
    },
    priority: 0.8,
    changefreq: "monthly",
    lastmod: TODAY,
    published: false,
  },
  {
    path: "/services/data/business-analyst-services/",
    title: "Business Analyst Services in Nepal | Suraj Tamang",
    description:
      "Requirements that engineers can build from, funnels measured honestly, and decisions backed by numbers. Freelance business analysis for Nepali companies.",
    h1: "Business analyst services",
    navLabel: "Business Analysis",
    group: "data-service",
    intent: "commercial",
    keywords: {
      primary: "business analyst Nepal",
      secondary: ["freelance business analyst Kathmandu", "business analysis services Nepal"],
      longTail: [
        "hire a business analyst in Nepal",
        "business requirements document Nepal",
      ],
    },
    priority: 0.8,
    changefreq: "monthly",
    lastmod: TODAY,
    published: false,
  },
  {
    path: "/services/data/mis-consulting/",
    title: "MIS Consulting & MIS Officer Services in Nepal | Suraj Tamang",
    description:
      "Set up the reporting backbone: data collection standards, single-source-of-truth definitions, and the daily and monthly reports management can trust.",
    h1: "MIS consulting",
    navLabel: "MIS Consulting",
    group: "data-service",
    intent: "commercial",
    keywords: {
      primary: "MIS executive Nepal",
      secondary: ["MIS officer Nepal", "MIS consultant Kathmandu"],
      longTail: [
        "what does an MIS officer do Nepal",
        "outsourced MIS reporting Nepal",
      ],
    },
    priority: 0.8,
    changefreq: "monthly",
    lastmod: TODAY,
    published: false,
  },
  {
    path: "/services/data/excel-automation/",
    title: "Excel Automation & Dashboard Services in Nepal | Suraj Tamang",
    description:
      "Kill the manual spreadsheet. Power Query pipelines, automated Excel dashboards, and templates your team can't accidentally break. Built for Nepali businesses.",
    h1: "Excel automation and dashboards",
    navLabel: "Excel Automation",
    group: "data-service",
    intent: "commercial",
    keywords: {
      primary: "Excel dashboard Nepal",
      secondary: ["Excel automation Nepal", "Power Query consultant Kathmandu"],
      longTail: [
        "automate Excel reports Nepal",
        "Excel dashboard template for Nepali business",
      ],
    },
    priority: 0.8,
    changefreq: "monthly",
    lastmod: TODAY,
    published: false,
  },
  {
    path: "/services/data/google-sheets-automation/",
    title: "Google Sheets Automation & Dashboards in Nepal | Suraj Tamang",
    description:
      "Live Google Sheets dashboards, Apps Script automation, and reports that email themselves. The lowest-cost way for a small Nepali business to get real reporting.",
    h1: "Google Sheets automation and dashboards",
    navLabel: "Google Sheets Automation",
    group: "data-service",
    intent: "commercial",
    keywords: {
      primary: "Google Sheets dashboard Nepal",
      secondary: ["Google Sheets automation Nepal", "Apps Script developer Nepal"],
      longTail: [
        "automate Google Sheets reports Nepal",
        "free dashboard for small business Nepal",
      ],
    },
    priority: 0.8,
    changefreq: "monthly",
    lastmod: TODAY,
    published: false,
  },

  /* ---------------------------------------------------------------- *
   * Pillar B — Web development service pages
   * ---------------------------------------------------------------- */
  {
    path: "/services/web/restaurant-website-development/",
    title: "Restaurant Website Development in Nepal | Suraj Tamang",
    description:
      "Restaurant websites built for Nepal: fast on mobile data, menu that updates without a developer, table booking, and set up to show on Google Maps and Search.",
    h1: "Restaurant website development in Nepal",
    navLabel: "Restaurant Websites",
    group: "web-service",
    intent: "commercial",
    keywords: {
      primary: "restaurant website Nepal",
      secondary: [
        "restaurant website developer Nepal",
        "restaurant website design Kathmandu",
      ],
      longTail: [
        "how much does a restaurant website cost in Nepal",
        "restaurant website with online menu Nepal",
        "best restaurant websites Kathmandu",
      ],
    },
    priority: 0.9,
    changefreq: "monthly",
    lastmod: TODAY,
    published: false,
  },
  {
    path: "/services/web/cafe-website-development/",
    title: "Cafe Website Development in Nepal | Suraj Tamang",
    description:
      "Cafe websites that look as good as the room: photo-led design, menu and hours that stay current, and local SEO so people nearby actually find you.",
    h1: "Cafe website development",
    navLabel: "Cafe Websites",
    group: "web-service",
    intent: "commercial",
    keywords: {
      primary: "cafe website Nepal",
      secondary: ["cafe website design Kathmandu", "coffee shop website Nepal"],
      longTail: ["website for a cafe in Kathmandu", "cafe website cost Nepal"],
    },
    priority: 0.8,
    changefreq: "monthly",
    lastmod: TODAY,
    published: false,
  },
  {
    path: "/services/web/hotel-website-development/",
    title: "Hotel & Resort Website Development in Nepal | Suraj Tamang",
    description:
      "Hotel websites with room listings, enquiry and booking flows, and the structured data that gets your property surfaced properly in Google's travel results.",
    h1: "Hotel and resort website development",
    navLabel: "Hotel Websites",
    group: "web-service",
    intent: "commercial",
    keywords: {
      primary: "hotel website Nepal",
      secondary: ["hotel website design Nepal", "resort website developer Pokhara"],
      longTail: [
        "hotel booking website development Nepal",
        "homestay website Nepal",
      ],
    },
    priority: 0.8,
    changefreq: "monthly",
    lastmod: TODAY,
    published: false,
  },
  {
    path: "/services/web/small-business-website-development/",
    title: "Small Business Website Development in Nepal | Suraj Tamang",
    description:
      "A professional website for your shop, clinic, school or service business — built in days, not months, and priced for a Nepali small business.",
    h1: "Small business website development",
    navLabel: "Small Business Websites",
    group: "web-service",
    intent: "commercial",
    keywords: {
      primary: "small business website Nepal",
      secondary: ["business website design Kathmandu", "company website Nepal"],
      longTail: [
        "cheap website for small business Nepal",
        "website for shop in Kathmandu",
      ],
    },
    priority: 0.8,
    changefreq: "monthly",
    lastmod: TODAY,
    published: false,
  },
  {
    path: "/services/web/automotive-website-development/",
    title: "Automotive & Dealership Website Development in Nepal",
    description:
      "Showroom and dealership websites with model listings, test-drive enquiry capture, and a lead pipeline that feeds straight into your sales reporting.",
    h1: "Automotive and dealership website development",
    navLabel: "Automotive Websites",
    group: "web-service",
    intent: "commercial",
    keywords: {
      primary: "automotive website Nepal",
      secondary: ["car dealership website Nepal", "showroom website Kathmandu"],
      longTail: [
        "vehicle dealership website development Nepal",
        "automobile showroom website design Nepal",
      ],
    },
    priority: 0.7,
    changefreq: "monthly",
    lastmod: TODAY,
    published: false,
  },
  {
    path: "/services/web/website-maintenance/",
    title: "Website Maintenance & Support in Nepal | Suraj Tamang",
    description:
      "Monthly care for the site you already have: updates, backups, uptime monitoring, speed and security checks, and content edits without the panic.",
    h1: "Website maintenance and support",
    navLabel: "Website Maintenance",
    group: "web-service",
    intent: "commercial",
    keywords: {
      primary: "website maintenance Nepal",
      secondary: ["website support services Kathmandu", "website management Nepal"],
      longTail: [
        "monthly website maintenance cost Nepal",
        "who can update my website Nepal",
      ],
    },
    priority: 0.7,
    changefreq: "monthly",
    lastmod: TODAY,
    published: false,
  },

  /* ---------------------------------------------------------------- *
   * Legal / utility
   * ---------------------------------------------------------------- */
  {
    path: "/privacy/",
    title: "Privacy Policy | Suraj Tamang",
    description:
      "What data this site collects, what happens to anything you send through the contact form, and how to ask for it to be deleted.",
    h1: "Privacy policy",
    navLabel: "Privacy",
    group: "legal",
    intent: "navigational",
    keywords: { primary: "privacy policy", secondary: [], longTail: [] },
    priority: 0.2,
    changefreq: "yearly",
    lastmod: TODAY,
    published: true,
  },
  {
    path: "/sitemap/",
    title: "Sitemap | Suraj Tamang",
    description:
      "Every page on suraj-tamang.com.np in one list — services, work, writing and contact details.",
    h1: "Sitemap",
    navLabel: "Sitemap",
    group: "utility",
    intent: "navigational",
    keywords: { primary: "sitemap", secondary: [], longTail: [] },
    priority: 0.3,
    changefreq: "weekly",
    lastmod: TODAY,
    published: true,
  },
  {
    path: "/404/",
    title: "Page not found | Suraj Tamang",
    description: "That page doesn't exist. Here's where to go instead.",
    h1: "Page not found",
    navLabel: "404",
    group: "utility",
    intent: "navigational",
    keywords: { primary: "404", secondary: [], longTail: [] },
    priority: 0.0,
    changefreq: "yearly",
    lastmod: TODAY,
    published: false,
    noindex: true,
  },
];

/* ------------------------------------------------------------------ *
 * Lookups
 * ------------------------------------------------------------------ */

const normalise = (p: string) => (p === "/" ? "/" : `/${p.replace(/^\/+|\/+$/g, "")}/`);

const BY_PATH = new Map(ROUTES.map((r) => [normalise(r.path), r]));

export function getRoute(path: string): RouteMeta | undefined {
  return BY_PATH.get(normalise(path));
}

/** Routes that belong in the XML sitemap: published and indexable. */
export function indexableRoutes(): RouteMeta[] {
  return ROUTES.filter((r) => r.published && !r.noindex);
}

export function routesInGroup(group: RouteGroup): RouteMeta[] {
  return ROUTES.filter((r) => r.group === group && r.published && !r.noindex);
}

/** All routes in a group regardless of publish state — for build-time checks. */
export function allInGroup(group: RouteGroup): RouteMeta[] {
  return ROUTES.filter((r) => r.group === group);
}

/**
 * Derives the breadcrumb trail from the URL segments, resolving each ancestor
 * against the route table so labels stay consistent with the nav.
 */
export function breadcrumbsFor(path: string): { name: string; path: string }[] {
  const trail: { name: string; path: string }[] = [{ name: "Home", path: "/" }];
  const norm = normalise(path);
  if (norm === "/") return trail;

  const segments = norm.split("/").filter(Boolean);
  let acc = "";
  for (const segment of segments) {
    acc += `/${segment}`;
    const route = getRoute(acc);
    trail.push({
      name: route?.navLabel ?? toTitleCase(segment),
      path: `${acc}/`,
    });
  }
  return trail;
}

function toTitleCase(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function ogImageFor(route: RouteMeta): string {
  return route.ogImage ?? DEFAULT_OG_IMAGE;
}

export function canonicalFor(route: RouteMeta): string {
  return canonical(route.path);
}

/** Resolves a list of related paths into full route records, skipping unpublished. */
export function relatedRoutes(route: RouteMeta): RouteMeta[] {
  return (route.related ?? [])
    .map((p) => getRoute(p))
    .filter((r): r is RouteMeta => Boolean(r) && r!.published);
}
