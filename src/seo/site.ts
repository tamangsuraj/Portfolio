/**
 * Site-wide constants. Single source of truth for anything that appears in
 * metadata, structured data, or the sitemap.
 *
 * Rule: never hard-code the domain, name, or a social URL anywhere else. Entity
 * SEO depends on these strings being byte-identical everywhere Google sees them.
 */

export const SITE_URL = "https://www.suraj-tamang.com.np";

/** Canonical form is trailing-slash. `/about` and `/about/` must never both resolve. */
export function canonical(path: string): string {
  if (path === "/") return `${SITE_URL}/`;
  const clean = `/${path.replace(/^\/+|\/+$/g, "")}/`;
  return `${SITE_URL}${clean}`;
}

export const PERSON = {
  name: "Suraj Tamang",
  givenName: "Suraj",
  familyName: "Tamang",
  /** Used as the Person @id across every page — one entity, many mentions. */
  id: `${SITE_URL}/#person`,
  jobTitle: "MIS & Business Intelligence Analyst",
  /** Short, plain-language descriptor. Reused in Person schema and OG fallbacks. */
  description:
    "MIS and business intelligence analyst in Kathmandu, Nepal. Builds sales dashboards, executive reporting automation, and websites for restaurants and small businesses.",
  email: "tamangsuraj003@gmail.com",
  telephone: "+977-9761667516",
  // Points at a generated variant — the 1.27 MB source PNG is no longer deployed.
  image: `${SITE_URL}/img/profile-960.webp`,
  knowsLanguage: ["en", "ne"],
  nationality: "Nepali",
} as const;

export const ORG = {
  name: "Suraj Tamang — Data & Web Studio",
  id: `${SITE_URL}/#organization`,
  legalName: "Suraj Tamang",
  description:
    "Independent studio in Kathmandu delivering business intelligence dashboards, MIS consulting, Excel and Google Sheets automation, and websites for restaurants, cafes, hotels, and small businesses across Nepal.",
  priceRange: "$$",
  foundingDate: "2024",
} as const;

export const ADDRESS = {
  locality: "Kathmandu",
  region: "Bagmati Province",
  country: "NP",
  countryName: "Nepal",
  /** Bagmati / Kathmandu valley centroid — used for geo + areaServed only. */
  latitude: 27.7172,
  longitude: 85.324,
} as const;

/**
 * `sameAs` targets. These are the strongest signal Google has for consolidating
 * "Suraj Tamang" into a single entity, so the list must stay identical on every
 * profile that links back here.
 */
export const SOCIAL_PROFILES = [
  "https://github.com/tamangsuraj",
  "https://www.linkedin.com/in/surajtamang10/",
  "https://www.instagram.com/tamangsuraj003/",
  "https://www.facebook.com/surajtitung.tamang.9/",
] as const;

/** Cities the studio actively serves — feeds `areaServed` in Service/LocalBusiness. */
export const AREAS_SERVED = [
  "Kathmandu",
  "Lalitpur",
  "Bhaktapur",
  "Pokhara",
  "Biratnagar",
  "Butwal",
  "Chitwan",
  "Dharan",
] as const;

export const DEFAULT_OG_IMAGE = `${SITE_URL}/og/default.png`;

export const TWITTER_HANDLE: string | null = null;
