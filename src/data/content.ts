/**
 * Site content.
 *
 * Honesty rules that govern everything in this file:
 *
 * - Concept builds are labelled `clientWork: false`. They are self-initiated
 *   design studies for fictional businesses, and the copy says so plainly.
 *   Passing them off as commissioned work would be the fastest way to lose a
 *   real client's trust — and the demo sites themselves carry "fictional /
 *   demo" footers that a prospect will read.
 * - No invented metrics. Where a number is real (role-based access, a 10 AM
 *   send time) it appears; where it isn't known, nothing is claimed.
 * - The previous `testimonials` array was placeholder copy attributed to
 *   invented people at invented companies. It has been removed rather than
 *   rewritten. Add real, attributable quotes here later, and only then add
 *   Review schema in src/seo/schema.ts.
 */

export const identity = {
  name: "Suraj Tamang",
  firstName: "Suraj",
  roles: [
    "MIS & Business Intelligence",
    "Business Analyst",
    "Dashboard Developer",
    "Website Developer",
  ],
  tagline:
    "I turn messy operational data into dashboards leadership acts on — and build fast, findable websites for the businesses behind that data.",
  location: "Kathmandu, Nepal",
  remote: "Remote available",
  email: "tamangsuraj003@gmail.com",
  phone: "+977 9761667516",
  resume: "/Resume.pdf",
  // FormSubmit delivers straight to the inbox below — no backend, no account.
  // Swap the address for the masked token from the activation email to keep it
  // out of the page source: https://formsubmit.co/ajax/<token>
  formEndpoint: "https://formsubmit.co/ajax/tamangsuraj003@gmail.com",
};

export const socials = [
  { label: "GitHub", handle: "tamangsuraj", href: "https://github.com/tamangsuraj" },
  { label: "LinkedIn", handle: "surajtamang10", href: "https://www.linkedin.com/in/surajtamang10/" },
  { label: "Instagram", handle: "tamangsuraj003", href: "https://www.instagram.com/tamangsuraj003/" },
  {
    label: "Facebook",
    handle: "suraj.tamang",
    href: "https://www.facebook.com/surajtitung.tamang.9/",
  },
];

/* ------------------------------------------------------------------ *
 * About / E-E-A-T
 * ------------------------------------------------------------------ */

export const about = {
  paragraphs: [
    "I'm an MIS and business intelligence analyst in Kathmandu. My day job is turning operational data into something a leadership team can decide from — sales funnels, executive reporting, the numbers that say where a business is actually heading rather than where it hoped to be.",
    "I sit between the business and the engineers. I read the data, write the requirements, and build the reporting myself when that's the fastest route. Doing both sides is the point: a report designed by someone who has never had to answer for the number is usually the wrong report.",
    "The web work grew out of the same instinct. A lot of small businesses in Nepal — restaurants especially — are invisible online, or stuck with a site that loads in eight seconds on mobile data and can't be updated without paying someone. Those are solvable problems, and the same eye for what a business actually needs applies.",
  ],
  domains: [
    { label: "Business Intelligence", detail: "Power BI · Tableau" },
    { label: "Sales Analytics", detail: "Funnels · Market Share" },
    { label: "Data Engineering", detail: "SQL · ETL" },
    { label: "Web Development", detail: "React · Supabase" },
  ],
  education: [
    { degree: "BSc (Hons) Computing", school: "Herald College Kathmandu", period: "2021 – 2025" },
    { degree: "Digital Marketing", school: "Mindrisers Institute", period: "2024" },
    { degree: "Science Stream · GPA 3.25", school: "Herald Secondary School", period: "2022" },
  ],
};

/** How a project actually runs. Concrete process is a strong E-E-A-T signal. */
export const methodology = [
  {
    step: "01",
    title: "Understand the decision",
    detail:
      "Before touching data or design, I want to know what decision this is supposed to change. A dashboard nobody acts on and a website nobody calls are the same failure.",
  },
  {
    step: "02",
    title: "Audit what exists",
    detail:
      "Where the data actually lives, who maintains it, where the definitions disagree. For websites: what's currently ranking, what's slow, what's broken on a phone.",
  },
  {
    step: "03",
    title: "Write it down",
    detail:
      "A short spec — metrics with agreed definitions, or sitemap and page intent. This is the step people skip, and it's why projects get rebuilt twice.",
  },
  {
    step: "04",
    title: "Build in the open",
    detail:
      "You see it as it comes together, not at the end. Early feedback is cheap; a finished thing pointed at the wrong problem is expensive.",
  },
  {
    step: "05",
    title: "Hand over properly",
    detail:
      "Documentation, a walkthrough, and the ability to change things yourself. If you need me every time the menu changes, I've built it badly.",
  },
];

export interface Experience {
  role: string;
  company: string;
  period: string;
  status: "running" | "complete";
  points: string[];
}

export const experience: Experience[] = [
  {
    role: "Management Information System (MIS)",
    company: "MAW Vriddhi",
    period: "2026 – Present",
    status: "running",
    points: [
      "Act as the company's de facto BI developer — designed and built the full-stack sales intelligence platform with role-based access for the CEO, Sales Head, and HODs.",
      "Automated the 10 AM executive email report, replacing manual daily compilation with metrics and flagged priority areas.",
      "Own end-to-end MIS for the Nammi Box, Nammi Vigo, and SERES EV lines, tracking the journey from enquiry through booking to retail.",
      "Diagnose funnel drop-off and translate it into growth plans that moved lead-to-booking and booking-to-retail ratios.",
    ],
  },
  {
    role: "MIS Officer",
    company: "Wimslab",
    period: "2024 – 2026",
    status: "complete",
    points: [
      "Built interactive Power BI and Tableau dashboards giving management real-time visibility into operational KPIs.",
      "Tracked campaign performance across Google Ads, Meta Ads, and SEO with daily, weekly, and monthly reporting.",
      "Built data pipelines consolidating internal systems, improving accuracy and cutting manual reporting effort.",
      "Standardized data collection processes and reporting templates across the business.",
    ],
  },
  {
    role: "SEO Specialist & Digital Marketer",
    company: "Mindrisers · Internship",
    period: "2024",
    status: "complete",
    points: [
      "Achieved top Google ranking for the 'Flutter Course' keyword within 5 days of blog publication.",
      "Developed interactive themes and content strategy that lifted engagement and organic traffic.",
      "Secured the internship before completing the course, and mentored junior peers throughout.",
    ],
  },
  {
    role: "Lead Customer Service Representative",
    company: "Foodmandu",
    period: "2023 – 2024",
    status: "complete",
    points: [
      "Handled 200+ customer interactions daily across calls, chats, and email, consistently beating resolution targets.",
      "Used data analysis and Excel to find process inefficiencies, lifting customer satisfaction scores.",
      "Transformed the QA evaluation strategy with data-backed performance metrics.",
      "Mentored and guided a team, fostering a collaborative, high-performing environment.",
    ],
  },
  {
    role: "Customer Service Representative",
    company: "Bhojdeals",
    period: "2021 – 2022",
    status: "complete",
    points: [
      "Resolved complex customer inquiries and complaints with timely, positive resolutions.",
      "Supported the team lead in managing and motivating a group of representatives.",
      "De-escalated challenging situations with empathy and professionalism.",
    ],
  },
];

/* ------------------------------------------------------------------ *
 * Services
 * ------------------------------------------------------------------ */

export type Pillar = "data" | "web";

export interface Service {
  slug: string;
  pillar: Pillar;
  /** Card + nav label. */
  name: string;
  /** One-line positioning used on hub pages. */
  summary: string;
  /** Longer paragraph for the service card. */
  description: string;
  deliverables: string[];
  /** Typical turnaround, honestly stated as a range. */
  timeline: string;
  startingPriceNPR?: number;
  published: boolean;
}

export const services: Service[] = [
  /* ---- Pillar A: data ---- */
  {
    slug: "power-bi-dashboard-development",
    pillar: "data",
    name: "Power BI Dashboards",
    summary: "Dashboards leadership opens every morning, not once at launch.",
    description:
      "A clean data model, the handful of metrics that actually drive a decision, and scheduled refresh so the numbers are current when someone looks. Most dashboards fail from having too much on them — the work is deciding what to leave out.",
    deliverables: [
      "Data model and relationships",
      "Executive summary page",
      "Drill-through detail pages",
      "Scheduled refresh setup",
      "Handover documentation and walkthrough",
    ],
    timeline: "2–4 weeks",
    startingPriceNPR: 35000,
    published: false,
  },
  {
    slug: "dashboard-development",
    pillar: "data",
    name: "Dashboard Development",
    summary: "The right tool for your data and budget — not whichever one I prefer.",
    description:
      "Power BI, Tableau, Google Sheets, or a purpose-built web app. A five-person business does not need an enterprise BI licence, and a company running three product lines will outgrow a spreadsheet. I'll tell you which side of that line you're on.",
    deliverables: [
      "Tooling recommendation with reasoning",
      "Metric definitions agreed in writing",
      "Built and tested dashboard",
      "Role-based access where needed",
      "Training session for your team",
    ],
    timeline: "2–6 weeks",
    startingPriceNPR: 30000,
    published: false,
  },
  {
    slug: "business-analyst-services",
    pillar: "data",
    name: "Business Analysis",
    summary: "Requirements engineers can build from, and funnels measured honestly.",
    description:
      "The translation layer between what the business wants and what the team can build. Process mapping, requirement documents, funnel analysis, and the uncomfortable work of agreeing what a metric actually means before anyone reports on it.",
    deliverables: [
      "Stakeholder interviews",
      "Process maps (current and proposed)",
      "Business requirements document",
      "Funnel and drop-off analysis",
      "Prioritised recommendations",
    ],
    timeline: "1–4 weeks",
    startingPriceNPR: 25000,
    published: false,
  },
  {
    slug: "mis-consulting",
    pillar: "data",
    name: "MIS Consulting",
    summary: "The reporting backbone: definitions, collection standards, cadence.",
    description:
      "Set up how information moves through the business. Which system is the source of truth, who enters what and when, and which reports go to whom on what schedule. Unglamorous, and the reason some companies can answer a question in a minute while others take a week.",
    deliverables: [
      "Data source audit",
      "Single-source-of-truth definitions",
      "Collection and entry standards",
      "Daily / weekly / monthly reporting pack",
      "Automation of recurring reports",
    ],
    timeline: "3–8 weeks",
    published: false,
  },
  {
    slug: "excel-automation",
    pillar: "data",
    name: "Excel Automation",
    summary: "Kill the file that takes someone four hours every Monday.",
    description:
      "Power Query pipelines, automated refresh, and templates built so a colleague can't accidentally break the formulas. Excel is not the problem; the manual copy-paste around it is.",
    deliverables: [
      "Power Query data pipeline",
      "Automated calculation layer",
      "Protected, structured template",
      "Dashboard sheet with charts",
      "Written instructions for your team",
    ],
    timeline: "1–2 weeks",
    startingPriceNPR: 15000,
    published: false,
  },
  {
    slug: "google-sheets-automation",
    pillar: "data",
    name: "Google Sheets Automation",
    summary: "Live reporting for businesses that shouldn't be buying BI licences yet.",
    description:
      "Apps Script automation, live dashboards, and reports that email themselves on a schedule. For a small Nepali business this is usually the highest return per rupee in the whole reporting stack.",
    deliverables: [
      "Connected data sheets",
      "Apps Script automation",
      "Live dashboard tab",
      "Scheduled email reports",
      "Access and sharing setup",
    ],
    timeline: "1–2 weeks",
    startingPriceNPR: 12000,
    published: false,
  },

  /* ---- Pillar B: web ---- */
  {
    slug: "restaurant-website-development",
    pillar: "web",
    name: "Restaurant Websites",
    summary: "Fast on mobile data, menu you can edit yourself, findable on Maps.",
    description:
      "Most restaurant websites in Nepal fail on three things: they're slow on a phone, the menu is a photo of a PDF, and Google doesn't know where the restaurant is. Fixing those three is worth more than any redesign.",
    deliverables: [
      "Mobile-first responsive build",
      "Menu you can update without a developer",
      "Table booking or enquiry flow",
      "Google Business Profile setup",
      "Restaurant + Menu structured data",
      "Photo optimisation and gallery",
    ],
    timeline: "2–3 weeks",
    startingPriceNPR: 40000,
    published: false,
  },
  {
    slug: "cafe-website-development",
    pillar: "web",
    name: "Cafe Websites",
    summary: "Photo-led, quick to load, and current on hours and menu.",
    description:
      "A cafe site lives or dies on photography and on whether today's hours are right. Built light so it opens fast on 4G, and simple enough that you'll actually keep it updated.",
    deliverables: [
      "Photo-led responsive design",
      "Menu and hours management",
      "Google Business Profile setup",
      "Local SEO foundations",
      "Instagram feed integration",
    ],
    timeline: "1–2 weeks",
    startingPriceNPR: 30000,
    published: false,
  },
  {
    slug: "hotel-website-development",
    pillar: "web",
    name: "Hotel & Resort Websites",
    summary: "Room listings, enquiry capture, and proper travel structured data.",
    description:
      "Rooms with real detail, an enquiry flow that captures dates and party size, and the Hotel schema that lets Google present the property properly. Built for lodges, homestays and resorts as well as city hotels.",
    deliverables: [
      "Room and rate listings",
      "Availability enquiry form",
      "Gallery and facilities pages",
      "Hotel structured data",
      "Multi-language ready",
    ],
    timeline: "3–4 weeks",
    startingPriceNPR: 55000,
    published: false,
  },
  {
    slug: "small-business-website-development",
    pillar: "web",
    name: "Small Business Websites",
    summary: "A credible site in days, priced for a Nepali small business.",
    description:
      "For the shop, clinic, school or service business that currently has a Facebook page and nothing else. Enough site to be taken seriously, not so much that it becomes a burden to maintain.",
    deliverables: [
      "Up to five core pages",
      "Contact and enquiry form",
      "Google Business Profile setup",
      "Basic on-page SEO",
      "One year of minor edits",
    ],
    timeline: "1–2 weeks",
    startingPriceNPR: 25000,
    published: false,
  },
  {
    slug: "automotive-website-development",
    pillar: "web",
    name: "Automotive & Dealership Websites",
    summary: "Model listings and test-drive leads that feed your sales reporting.",
    description:
      "Showroom sites where the enquiry doesn't die in an inbox. Model and variant listings, test-drive booking, and lead capture wired into whatever you use to track the funnel — which, as it happens, I also build.",
    deliverables: [
      "Model and variant listings",
      "Test-drive booking flow",
      "Lead capture with source tracking",
      "Showroom locator",
      "Handover into your CRM or sheet",
    ],
    timeline: "3–5 weeks",
    published: false,
  },
  {
    slug: "website-maintenance",
    pillar: "web",
    name: "Website Maintenance",
    summary: "Monthly care for the site you already have.",
    description:
      "Updates, backups, uptime monitoring, speed and security checks, and content edits without a week of chasing. For businesses whose site works but whose developer has vanished.",
    deliverables: [
      "Monthly updates and backups",
      "Uptime monitoring",
      "Speed and Core Web Vitals check",
      "Security patching",
      "A set allowance of content edits",
    ],
    timeline: "Ongoing",
    startingPriceNPR: 5000,
    published: false,
  },
];

export const dataServices = services.filter((s) => s.pillar === "data");
export const webServices = services.filter((s) => s.pillar === "web");

/* ------------------------------------------------------------------ *
 * Work / case studies
 * ------------------------------------------------------------------ */

export interface CaseStudy {
  id: string;
  title: string;
  /** Business type shown as the card's category chip. */
  category: string;
  pillar: Pillar;
  /**
   * True only for work done for a real organisation. Everything else renders
   * with a visible "Concept build" label — see the honesty note at the top.
   */
  clientWork: boolean;
  /** Fictional-business design studies get this short qualifier in the UI. */
  conceptNote?: string;
  problem: string;
  solution: string;
  technology: string[];
  /** What the build demonstrates. For concept work this replaces "results". */
  outcome: string;
  metrics: { label: string; value: string }[];
  diagram: "platform" | "flow" | "trend";
  href?: string;
}

export const caseStudies: CaseStudy[] = [
  {
    id: "maw-vriddhi-sales-intelligence",
    title: "Sales Intelligence Platform — MAW Vriddhi",
    category: "ERP · Platform",
    pillar: "data",
    clientWork: true,
    problem:
      "Enquiry, booking and retail data for three vehicle lines lived in separate places. Leadership could not see where deals were leaking between stages without someone manually assembling it.",
    solution:
      "A full-stack sales intelligence platform built end to end, with role-based logins so the CEO, Sales Head and department heads each land on the view relevant to them, reading live enquiry-to-retail performance.",
    technology: ["React", "Vite", "Supabase", "Vercel", "SQL"],
    outcome:
      "Became the system leadership opens each morning, and the basis for diagnosing funnel drop-off across the Nammi Box, Nammi Vigo and SERES EV lines.",
    metrics: [
      { label: "access", value: "role-based" },
      { label: "coverage", value: "enquiry → retail" },
    ],
    diagram: "platform",
    href: "https://maw-vriddhi-sales.vercel.app",
  },
  {
    id: "automated-executive-reporting",
    title: "Automated Executive Reporting",
    category: "Automation",
    pillar: "data",
    clientWork: true,
    problem:
      "The daily leadership report was compiled by hand every morning — slow to produce, easy to get wrong, and late by the time it mattered.",
    solution:
      "A scheduled digest that lands in leadership inboxes at 10 AM with the day's key metrics summarised and priority areas flagged, removing the manual compilation step entirely.",
    technology: ["SQL", "Supabase", "Scheduled automation"],
    outcome:
      "Manual daily report compilation eliminated; the digest is the first thing leadership reads each morning.",
    metrics: [
      { label: "delivery", value: "daily · 10:00" },
      { label: "manual work", value: "eliminated" },
    ],
    diagram: "flow",
  },
  {
    id: "marketing-ops-dashboards",
    title: "Marketing & Ops Dashboard Suite",
    category: "Analytics",
    pillar: "data",
    clientWork: true,
    problem:
      "Campaign performance sat in Google Ads, Meta Ads and search consoles while operational KPIs sat elsewhere. No single place showed how spend related to outcomes.",
    solution:
      "Power BI and Tableau dashboards consolidating paid, organic and internal operational data into one management view, on a daily and monthly reporting cadence.",
    technology: ["Power BI", "Tableau", "SQL"],
    outcome:
      "One place for management to read the business, with standardised reporting templates adopted across the company.",
    metrics: [
      { label: "cadence", value: "daily · monthly" },
      { label: "sources", value: "ads · seo · internal" },
    ],
    diagram: "trend",
  },
  {
    id: "himalaya-ember",
    title: "Himalaya & Ember",
    category: "Restaurant",
    pillar: "web",
    clientWork: false,
    conceptNote: "Concept build — fictional restaurant, self-initiated design study.",
    problem:
      "Fine-dining restaurants in Kathmandu are usually represented online by a Facebook page and a photographed menu. The design question: what would a site look like that matched the room?",
    solution:
      "A dark, timber-toned single-property site for a fictional Himalayan fine-dining restaurant in Lazimpat. The menu is organised by elevation rather than by course, with a reservation flow built around a single seating per evening.",
    technology: ["React", "Responsive layout", "Structured data"],
    outcome:
      "Demonstrates the restaurant pattern I build for real clients: menu structure that survives updates, a booking flow suited to the venue's actual service model, and photography-first layout that still loads quickly.",
    metrics: [
      { label: "type", value: "concept build" },
      { label: "pattern", value: "menu · booking" },
    ],
    diagram: "platform",
    href: "https://himalaya-ember.vercel.app",
  },
  {
    id: "solera",
    title: "Solera",
    category: "Restaurant",
    pillar: "web",
    clientWork: false,
    conceptNote: "Concept build — fictional bodega in Jerez, self-initiated design study.",
    problem:
      "How do you build a restaurant site around an idea rather than a photo gallery — when the concept itself (solera-method sherry ageing) is the thing worth explaining?",
    solution:
      "A narrative-led site for a fictional Jerez bodega, with the menu organised by ageing duration and an interactive element that demonstrates how fractional blending works across decades.",
    technology: ["React", "Interactive JS", "Editorial layout"],
    outcome:
      "An exercise in content-led restaurant design: where the story carries the page and the booking form is the quietest thing on it.",
    metrics: [
      { label: "type", value: "concept build" },
      { label: "focus", value: "narrative design" },
    ],
    diagram: "flow",
    href: "https://solera-zeta.vercel.app",
  },
  {
    id: "marhaba-marble",
    title: "Marhaba & Marble",
    category: "Restaurant",
    pillar: "web",
    clientWork: false,
    conceptNote: "Concept build — fictional restaurant in Doha, self-initiated design study.",
    problem:
      "A modern Arabic dining concept needed a visual language that read as contemporary without discarding the traditional references the cuisine sits on.",
    solution:
      "A single-property restaurant site for a fictional West Bay, Doha venue, balancing a modern editorial grid against warmer traditional motifs.",
    technology: ["React", "Responsive layout"],
    outcome:
      "Shows the same restaurant template adapting to a very different cuisine and market from the Kathmandu build.",
    metrics: [
      { label: "type", value: "concept build" },
      { label: "focus", value: "brand adaptation" },
    ],
    diagram: "platform",
    href: "https://marhaba-marblesss.vercel.app",
  },
  {
    id: "azure-cove",
    title: "Azure Cove Resort & Spa",
    category: "Hotel & Resort",
    pillar: "web",
    clientWork: false,
    conceptNote: "Concept build — fictional resort, self-initiated design study.",
    problem:
      "Resort sites have to sell rooms that differ in meaningful ways, and most reduce them to a price list. How do you make four villa types feel genuinely distinct?",
    solution:
      "An overwater resort site for a fictional Maldives property: four villa types with real spatial detail, separate dining venues, spa and activities sections, and an enquiry-led reservation flow.",
    technology: ["React", "Responsive layout", "Gallery optimisation"],
    outcome:
      "The pattern behind the hotel and resort service — room listings with substance, and an enquiry flow that captures dates and party size rather than dumping the visitor into an email client.",
    metrics: [
      { label: "type", value: "concept build" },
      { label: "pattern", value: "rooms · enquiry" },
    ],
    diagram: "platform",
    href: "https://azure-cove-one.vercel.app",
  },
  {
    id: "sherpa-reserve",
    title: "Sherpa Reserve",
    category: "E-commerce",
    pillar: "web",
    clientWork: false,
    conceptNote: "Concept build — demo storefront, no real orders are processed.",
    problem:
      "A single-product Nepali export needs to explain an unfamiliar item to an overseas buyer and take payment, without the overhead of a full store.",
    solution:
      "A minimal storefront for Himalayan churpi with a three-tier product lineup priced in NPR, full ingredient disclosure, and a story-first structure that does the explaining before the buying.",
    technology: ["React", "Product catalogue", "Responsive layout"],
    outcome:
      "Demonstrates the small-catalogue commerce pattern: heavy on story, light on infrastructure, suited to Nepali producers selling one thing well.",
    metrics: [
      { label: "type", value: "concept build" },
      { label: "focus", value: "single-product commerce" },
    ],
    diagram: "trend",
    href: "https://sherpareserve.vercel.app",
  },
];

export const dataCaseStudies = caseStudies.filter((c) => c.pillar === "data");
export const webCaseStudies = caseStudies.filter((c) => c.pillar === "web");

/* ------------------------------------------------------------------ *
 * Skills
 * ------------------------------------------------------------------ */

export interface Skill {
  name: string;
  level: number;
  category: string;
}

export const skills: Skill[] = [
  { name: "Power BI", level: 92, category: "BI & Dashboards" },
  { name: "Excel (Advanced)", level: 90, category: "Analysis" },
  { name: "SQL", level: 88, category: "Data & Analytics" },
  { name: "Dashboard Design", level: 86, category: "Data Visualization" },
  { name: "Tableau", level: 84, category: "BI & Dashboards" },
  { name: "Funnel Analysis", level: 84, category: "Sales Analytics" },
  { name: "React & Web Development", level: 80, category: "Software" },
  { name: "Technical SEO", level: 78, category: "Web" },
  { name: "Python", level: 78, category: "Programming" },
];

export const orbitTools = [
  "Power BI",
  "Tableau",
  "SQL",
  "Excel",
  "Python",
  "React",
  "Supabase",
  "JavaScript",
];

/* ------------------------------------------------------------------ *
 * FAQs — feed both the visible accordion and FAQPage schema
 * ------------------------------------------------------------------ */

export const homeFaqs = [
  {
    question: "What exactly do you do?",
    answer:
      "Two related things. On the data side: business intelligence dashboards, MIS reporting, business analysis, and Excel or Google Sheets automation. On the web side: websites for restaurants, cafes, hotels and small businesses. Both come down to the same skill — working out what a business actually needs to see or say, and building the smallest thing that does it.",
  },
  {
    question: "Where are you based, and do you work remotely?",
    answer:
      "I'm based in Kathmandu, Nepal. I work with businesses across the Kathmandu valley in person, and remotely with clients in Pokhara, Chitwan, Biratnagar, Butwal, Dharan and outside Nepal.",
  },
  {
    question: "Are you available for freelance work alongside your job?",
    answer:
      "Yes, for a limited number of projects at a time. I'm straightforward about capacity — if a timeline isn't realistic alongside my existing commitments, I'll say so before you commit rather than after.",
  },
  {
    question: "What does a project cost?",
    answer:
      "It depends on scope, and I'd rather scope it properly than quote a number that changes later. As a rough guide, a small business website starts around NPR 25,000, a restaurant website around NPR 40,000, and a Power BI dashboard build around NPR 35,000. Send a short brief and you'll get a specific figure.",
  },
  {
    question: "Are the restaurant sites in your portfolio real clients?",
    answer:
      "No — Himalaya & Ember, Solera, Marhaba & Marble, Azure Cove and Sherpa Reserve are self-initiated concept builds for fictional businesses. They exist to demonstrate the patterns I build with: menu structures, booking flows, room listings and product catalogues. The dashboard and reporting work is real, from my roles at MAW Vriddhi and Wimslab.",
  },
  {
    question: "Can you help with an existing website or dashboard?",
    answer:
      "Often that's the better option. If what you have mostly works, fixing speed, mobile layout, search visibility or a broken data refresh is usually cheaper and faster than a rebuild. I'll tell you honestly which situation you're in.",
  },
];

export const sections = [
  { id: "hero", label: "boot" },
  { id: "about", label: "system" },
  { id: "experience", label: "career" },
  { id: "projects", label: "projects" },
  { id: "skills", label: "stack" },
  { id: "contact", label: "connect" },
] as const;
