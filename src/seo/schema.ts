/**
 * Typed JSON-LD builders.
 *
 * Two conventions worth knowing before editing:
 *
 * 1. Every node that is referenced more than once gets a stable `@id` and is
 *    emitted exactly once (on the home page). Everywhere else we reference it
 *    with `{ "@id": ... }`. This is what lets Google collapse every page into
 *    one Person entity instead of ~40 unrelated ones.
 *
 * 2. No `Review` or `AggregateRating` builders exist here, deliberately. The
 *    testimonials currently on the site are placeholder copy, and marking up
 *    invented reviews violates Google's structured-data policy and risks a
 *    manual action. Add them only when real, attributable reviews exist.
 */

import {
  ADDRESS,
  AREAS_SERVED,
  DEFAULT_OG_IMAGE,
  ORG,
  PERSON,
  SITE_URL,
  SOCIAL_PROFILES,
  canonical,
} from "./site";

export type JsonLd = Record<string, unknown>;

/* ------------------------------------------------------------------ *
 * Core entities — emitted once, referenced everywhere
 * ------------------------------------------------------------------ */

export function personSchema(): JsonLd {
  return {
    "@type": "Person",
    "@id": PERSON.id,
    name: PERSON.name,
    givenName: PERSON.givenName,
    familyName: PERSON.familyName,
    url: `${SITE_URL}/`,
    image: {
      "@type": "ImageObject",
      url: PERSON.image,
      caption: `${PERSON.name} — ${PERSON.jobTitle}`,
    },
    jobTitle: PERSON.jobTitle,
    description: PERSON.description,
    email: `mailto:${PERSON.email}`,
    telephone: PERSON.telephone,
    nationality: { "@type": "Country", name: PERSON.nationality },
    knowsLanguage: PERSON.knowsLanguage,
    address: {
      "@type": "PostalAddress",
      addressLocality: ADDRESS.locality,
      addressRegion: ADDRESS.region,
      addressCountry: ADDRESS.country,
    },
    worksFor: { "@id": ORG.id },
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        name: "Herald College Kathmandu",
        sameAs: "https://www.heraldcollege.edu.np/",
      },
      { "@type": "EducationalOrganization", name: "Mindrisers Institute of Technology" },
    ],
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "degree",
        name: "BSc (Hons) Computing",
        educationalLevel: "Bachelor's Degree",
        recognizedBy: { "@type": "CollegeOrUniversity", name: "Herald College Kathmandu" },
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "certificate",
        name: "Digital Marketing",
        recognizedBy: { "@type": "EducationalOrganization", name: "Mindrisers Institute" },
      },
    ],
    knowsAbout: [
      "Business Intelligence",
      "Management Information Systems",
      "Business Analysis",
      "Power BI",
      "Tableau",
      "SQL",
      "Data Visualization",
      "Excel Automation",
      "Google Sheets Automation",
      "Dashboard Design",
      "Sales Analytics",
      "Web Development",
      "Restaurant Website Development",
      "Technical SEO",
    ],
    sameAs: [...SOCIAL_PROFILES],
  };
}

export function organizationSchema(): JsonLd {
  return {
    "@type": ["Organization", "ProfessionalService"],
    "@id": ORG.id,
    name: ORG.name,
    legalName: ORG.legalName,
    url: `${SITE_URL}/`,
    description: ORG.description,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/favicon.svg`,
      caption: ORG.name,
    },
    image: DEFAULT_OG_IMAGE,
    founder: { "@id": PERSON.id },
    foundingDate: ORG.foundingDate,
    email: `mailto:${PERSON.email}`,
    telephone: PERSON.telephone,
    priceRange: ORG.priceRange,
    address: {
      "@type": "PostalAddress",
      addressLocality: ADDRESS.locality,
      addressRegion: ADDRESS.region,
      addressCountry: ADDRESS.country,
    },
    areaServed: AREAS_SERVED.map((name) => ({ "@type": "City", name })),
    knowsLanguage: PERSON.knowsLanguage,
    sameAs: [...SOCIAL_PROFILES],
  };
}

export function websiteSchema(): JsonLd {
  return {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: `${SITE_URL}/`,
    name: `${PERSON.name} — Business Intelligence & Web Development, Nepal`,
    description: PERSON.description,
    inLanguage: "en",
    publisher: { "@id": ORG.id },
    author: { "@id": PERSON.id },
    copyrightHolder: { "@id": PERSON.id },
  };
}

/**
 * Service-area business. Intentionally has no `streetAddress` — this is a
 * home-based independent studio, and publishing a fake storefront address is
 * both a GBP violation and a trust risk.
 */
export function localBusinessSchema(): JsonLd {
  return {
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#localbusiness`,
    name: ORG.name,
    url: `${SITE_URL}/`,
    description: ORG.description,
    image: DEFAULT_OG_IMAGE,
    email: `mailto:${PERSON.email}`,
    telephone: PERSON.telephone,
    priceRange: ORG.priceRange,
    currenciesAccepted: "NPR, USD",
    paymentAccepted: "Bank Transfer, eSewa, Khalti, Wise",
    founder: { "@id": PERSON.id },
    address: {
      "@type": "PostalAddress",
      addressLocality: ADDRESS.locality,
      addressRegion: ADDRESS.region,
      addressCountry: ADDRESS.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: ADDRESS.latitude,
      longitude: ADDRESS.longitude,
    },
    areaServed: AREAS_SERVED.map((name) => ({ "@type": "City", name })),
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    sameAs: [...SOCIAL_PROFILES],
  };
}

/* ------------------------------------------------------------------ *
 * Per-page nodes
 * ------------------------------------------------------------------ */

export interface Crumb {
  name: string;
  path: string;
}

export function breadcrumbSchema(crumbs: Crumb[]): JsonLd {
  return {
    "@type": "BreadcrumbList",
    "@id": `${canonical(crumbs[crumbs.length - 1]?.path ?? "/")}#breadcrumb`,
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: canonical(crumb.path),
    })),
  };
}

export function webPageSchema(opts: {
  path: string;
  title: string;
  description: string;
  type?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage" | "ProfilePage" | "FAQPage";
  hasBreadcrumb?: boolean;
  image?: string;
  datePublished?: string;
  dateModified?: string;
}): JsonLd {
  const url = canonical(opts.path);
  return {
    "@type": opts.type ?? "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: opts.title,
    description: opts.description,
    inLanguage: "en",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": PERSON.id },
    primaryImageOfPage: opts.image ?? DEFAULT_OG_IMAGE,
    ...(opts.datePublished ? { datePublished: opts.datePublished } : {}),
    ...(opts.dateModified ? { dateModified: opts.dateModified } : {}),
    ...(opts.hasBreadcrumb ? { breadcrumb: { "@id": `${url}#breadcrumb` } } : {}),
  };
}

export interface ServiceSchemaInput {
  path: string;
  name: string;
  description: string;
  serviceType: string;
  /** Bullet list of what the buyer actually receives. */
  deliverables: string[];
  /** Optional — omit entirely rather than inventing a price. */
  priceFrom?: { amount: number; currency: string };
  areaServed?: readonly string[];
}

export function serviceSchema(input: ServiceSchemaInput): JsonLd {
  const url = canonical(input.path);
  return {
    "@type": "Service",
    "@id": `${url}#service`,
    name: input.name,
    description: input.description,
    serviceType: input.serviceType,
    url,
    provider: { "@id": ORG.id },
    areaServed: (input.areaServed ?? AREAS_SERVED).map((name) => ({ "@type": "City", name })),
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: canonical("contact"),
      availableLanguage: ["en", "ne"],
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${input.name} — deliverables`,
      itemListElement: input.deliverables.map((d, i) => ({
        "@type": "Offer",
        position: i + 1,
        itemOffered: { "@type": "Service", name: d },
      })),
    },
    ...(input.priceFrom
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: input.priceFrom.currency,
            price: input.priceFrom.amount,
            priceSpecification: {
              "@type": "PriceSpecification",
              minPrice: input.priceFrom.amount,
              priceCurrency: input.priceFrom.currency,
              valueAddedTaxIncluded: false,
            },
            availability: "https://schema.org/InStock",
            url: canonical("contact"),
          },
        }
      : {}),
  };
}

export interface ArticleSchemaInput {
  path: string;
  headline: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  /** Reading time in minutes — surfaces in some rich results. */
  wordCount?: number;
  keywords?: string[];
  articleSection?: string;
}

export function articleSchema(input: ArticleSchemaInput): JsonLd {
  const url = canonical(input.path);
  return {
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: input.headline,
    description: input.description,
    url,
    mainEntityOfPage: { "@id": `${url}#webpage` },
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    author: { "@id": PERSON.id },
    publisher: { "@id": ORG.id },
    image: input.image ?? DEFAULT_OG_IMAGE,
    inLanguage: "en",
    ...(input.wordCount ? { wordCount: input.wordCount } : {}),
    ...(input.keywords?.length ? { keywords: input.keywords.join(", ") } : {}),
    ...(input.articleSection ? { articleSection: input.articleSection } : {}),
  };
}

export interface FaqItem {
  question: string;
  answer: string;
}

export function faqSchema(path: string, items: FaqItem[]): JsonLd {
  return {
    "@type": "FAQPage",
    "@id": `${canonical(path)}#faq`,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export interface CreativeWorkInput {
  path: string;
  /**
   * Stable per-project slug. Required: several projects are listed on the same
   * page, and without this every one of them would collapse onto the same
   * `<page>#project` @id — which is invalid, and leaves Google merging eight
   * distinct projects into one unpredictable node.
   */
  id: string;
  name: string;
  description: string;
  /** Live demo / deployed URL. */
  url?: string;
  technologies: string[];
  datePublished?: string;
  image?: string;
  /**
   * True only for real client engagements. Concept builds must stay false so
   * we never imply a commercial relationship that did not exist.
   */
  isClientWork: boolean;
}

export function creativeWorkSchema(input: CreativeWorkInput): JsonLd {
  const pageUrl = canonical(input.path);
  return {
    "@type": "CreativeWork",
    "@id": `${pageUrl}#project-${input.id}`,
    name: input.name,
    description: input.description,
    url: pageUrl,
    ...(input.url ? { sameAs: input.url } : {}),
    creator: { "@id": PERSON.id },
    author: { "@id": PERSON.id },
    inLanguage: "en",
    keywords: input.technologies.join(", "),
    ...(input.datePublished ? { datePublished: input.datePublished } : {}),
    ...(input.image ? { image: input.image } : {}),
    /**
     * Honest signal: concept builds are self-initiated demonstrations, not
     * commissioned work. `sponsor`/`funder` are deliberately absent.
     */
    creativeWorkStatus: "Published",
    genre: input.isClientWork ? "Client project" : "Concept build",
  };
}

/**
 * Collection pages (service hubs, /work/, the HTML sitemap).
 *
 * This IS the page node — it uses the `#webpage` @id rather than a separate
 * `#collection` one. Emitting both a WebPage and a CollectionPage for the same
 * URL gives Google two competing descriptions of one page; a CollectionPage is
 * already a subtype of WebPage, so one node says everything.
 */
export function collectionPageSchema(opts: {
  path: string;
  title: string;
  description: string;
  items: { name: string; path: string }[];
  hasBreadcrumb?: boolean;
  image?: string;
}): JsonLd {
  const url = canonical(opts.path);
  return {
    "@type": "CollectionPage",
    "@id": `${url}#webpage`,
    url,
    name: opts.title,
    description: opts.description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": PERSON.id },
    primaryImageOfPage: opts.image ?? DEFAULT_OG_IMAGE,
    inLanguage: "en",
    ...(opts.hasBreadcrumb ? { breadcrumb: { "@id": `${url}#breadcrumb` } } : {}),
    mainEntity: {
      "@type": "ItemList",
      itemListElement: opts.items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.name,
        url: canonical(item.path),
      })),
    },
  };
}

export function profilePageSchema(path: string): JsonLd {
  const url = canonical(path);
  return {
    "@type": "ProfilePage",
    "@id": `${url}#profilepage`,
    url,
    inLanguage: "en",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    mainEntity: { "@id": PERSON.id },
    about: { "@id": PERSON.id },
  };
}

/**
 * Wraps nodes into one `@graph` document. A single graph per page beats
 * multiple sibling <script> blocks: it lets nodes cross-reference by `@id`
 * and is what Google's own docs recommend for connected entities.
 */
export function graph(...nodes: (JsonLd | null | undefined | false)[]): string {
  const filtered = nodes.filter(Boolean) as JsonLd[];
  return JSON.stringify({ "@context": "https://schema.org", "@graph": filtered });
}
