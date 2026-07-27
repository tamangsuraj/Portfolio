export const identity = {
  name: "Suraj Tamang",
  firstName: "Suraj",
  roles: ["MIS & Business Intelligence", "Business Analyst", "Dashboard Developer"],
  tagline:
    "Turning raw sales and operational data into dashboards, forecasts, and decisions leadership can act on.",
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
  { label: "Facebook", handle: "suraj.tamang", href: "https://www.facebook.com/surajtitung.tamang.9/" },
];

export const about = {
  paragraphs: [
    "I'm an MIS and business intelligence professional who turns messy operational data into something leadership can actually decide from. Dashboards, funnel analysis, executive reporting — the numbers that tell you where the business is really going.",
    "I sit between the business and the engineers: I read the data, write the requirements, and build the reporting myself when that's the fastest path. The result is insight that arrives before the meeting, not after it.",
  ],
  domains: [
    { label: "Business Intelligence", detail: "Power BI · Tableau" },
    { label: "Sales Analytics", detail: "Funnels · Market Share" },
    { label: "Data Engineering", detail: "SQL · ETL" },
    { label: "Full-Stack Dashboards", detail: "React · Supabase" },
  ],
  education: [
    { degree: "BSc (Hons) Computing", school: "Herald College Kathmandu", period: "2021 – 2025" },
    { degree: "Digital Marketing", school: "Mindrisers Institute", period: "2024" },
    { degree: "Science Stream · GPA 3.25", school: "Herald Secondary School", period: "2022" },
  ],
};

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

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  stack: string[];
  metrics: { label: string; value: string }[];
  diagram: "platform" | "flow" | "trend";
  href?: string;
}

export const projects: Project[] = [
  {
    id: "sales-intelligence",
    title: "Sales Intelligence Platform",
    category: "Platform",
    description:
      "MAW Vriddhi's full-stack sales intelligence platform, built end to end — role-based logins for the CEO, Sales Head, and HODs to review live enquiry, booking, and retail performance.",
    stack: ["React", "Vite", "Supabase", "Vercel"],
    metrics: [
      { label: "access", value: "role-based" },
      { label: "coverage", value: "enquiry → retail" },
    ],
    diagram: "platform",
    href: "https://maw-vriddhi-sales.vercel.app",
  },
  {
    id: "daily-reporting",
    title: "Automated Executive Reporting",
    category: "Automation",
    description:
      "A daily digest that lands in leadership inboxes at 10 AM — key metrics summarised and priority focus areas flagged, removing manual report compilation entirely.",
    stack: ["SQL", "Supabase", "Automation"],
    metrics: [
      { label: "delivery", value: "daily · 10:00" },
      { label: "manual work", value: "eliminated" },
    ],
    diagram: "flow",
  },
  {
    id: "ops-dashboards",
    title: "Marketing & Ops Dashboard Suite",
    category: "Analytics",
    description:
      "Power BI and Tableau dashboards tracking campaign performance across Google Ads, Meta Ads, and SEO alongside internal operational KPIs — one place for management to read the business.",
    stack: ["Power BI", "Tableau", "SQL"],
    metrics: [
      { label: "cadence", value: "daily · monthly" },
      { label: "sources", value: "ads · seo · internal" },
    ],
    diagram: "trend",
  },
];

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
  { name: "Python", level: 78, category: "Programming" },
  { name: "Full-Stack Development", level: 75, category: "Software" },
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

export interface Article {
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
}

export const articles: Article[] = [
  {
    title: "Designing a Sales Dashboard Executives Will Actually Open",
    excerpt:
      "Most dashboards die from too many charts. How to pick the handful of numbers leadership needs and lay them out so the answer is obvious.",
    category: "Power BI",
    readTime: "10 min",
  },
  {
    title: "Reading the Funnel: From Enquiry to Booking to Retail",
    excerpt:
      "Where deals really leak, how to measure each stage honestly, and how to turn a conversion ratio into a plan someone can act on.",
    category: "Sales Analytics",
    readTime: "12 min",
  },
  {
    title: "Data Modeling for Messy Source Systems",
    excerpt:
      "Star schemas, date tables, and the modeling decisions that stop your reports from disagreeing with each other six months in.",
    category: "Data Modeling",
    readTime: "14 min",
  },
  {
    title: "Automating the Daily Report Nobody Wants to Write",
    excerpt:
      "Replacing manual morning compilation with a scheduled digest that summarises the metrics and flags what needs attention.",
    category: "Automation",
    readTime: "8 min",
  },
  {
    title: "Market Share vs. Regional Market Share",
    excerpt:
      "The national number hides the story. Why regional breakdowns change strategy, and how to build the view that surfaces it.",
    category: "Strategy",
    readTime: "9 min",
  },
  {
    title: "Writing Requirements Engineers Can Actually Build From",
    excerpt:
      "The translation layer between business questions and technical specs — what to write down, and what to leave to the team.",
    category: "BI Practice",
    readTime: "11 min",
  },
];

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  photo: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Ayush Neupane",
    role: "Software Developer",
    company: "Tech Innovators",
    quote:
      "Suraj gave us visibility we simply didn't have. What used to be a week of manual spreadsheet work is now a dashboard the whole team reads every morning.",
    photo: "/testimonial-ayush.png",
  },
  {
    name: "Pramod Gurung",
    role: "Sales Head",
    company: "Everest Retail",
    quote:
      "He found the exact points where our funnel was leaking and put numbers behind them. The recommendations that followed moved our booking-to-retail ratio.",
    photo: "/testimonial-pramod.png",
  },
  {
    name: "Mingma Sherpa",
    role: "Operations Lead",
    company: "DataPrime",
    quote:
      "Suraj's automated reporting saved our leadership team hours every week. The daily digest is the first thing everyone opens.",
    photo: "/testimonial-mingma.png",
  },
  {
    name: "Bipin Yogi",
    role: "Head of Marketing",
    company: "InnovateTech",
    quote:
      "He translates between business and engineering better than anyone I've worked with. We finally got requirements the developers could build from directly.",
    photo: "/testimonial-bipin.png",
  },
];

export const sections = [
  { id: "hero", label: "boot" },
  { id: "about", label: "system" },
  { id: "experience", label: "career" },
  { id: "projects", label: "projects" },
  { id: "skills", label: "stack" },
  { id: "writing", label: "logs" },
  { id: "signals", label: "signals" },
  { id: "contact", label: "connect" },
] as const;
