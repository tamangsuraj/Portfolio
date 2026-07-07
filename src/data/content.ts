export const identity = {
  name: "Suraj Tamang",
  firstName: "Suraj",
  roles: ["Business Analyst", "DevOps Engineer", "Cloud Automation Specialist"],
  tagline:
    "Building scalable infrastructure and automating the future of cloud computing. Kubernetes, CI/CD, and everything in between.",
  location: "Kathmandu, Nepal",
  remote: "Remote available",
  email: "tamangsuraj003@gmail.com",
  phone: "+977 9761667516",
  resume: "/Resume.pdf",
  contactForm:
    "https://docs.google.com/forms/d/e/1FAIpQLSdWskCw9VqcXpJD4uP-yhnuRgdSF9uqqxbJ1IGjZexph6WyIw/viewform?usp=header",
};

export const socials = [
  { label: "GitHub", handle: "tamangsuraj", href: "https://github.com/tamangsuraj" },
  { label: "LinkedIn", handle: "surajtamang10", href: "https://www.linkedin.com/in/surajtamang10/" },
  { label: "Instagram", handle: "tamangsuraj003", href: "https://www.instagram.com/tamangsuraj003/" },
  { label: "Facebook", handle: "suraj.tamang", href: "https://www.facebook.com/surajtitung.tamang.9/" },
];

export const about = {
  paragraphs: [
    "I'm a DevOps engineer who builds and automates scalable cloud infrastructure. Kubernetes clusters, CI/CD pipelines, cloud platforms — the systems that let teams ship faster and sleep better.",
    "My approach pairs technical depth with a real understanding of development workflows, so infrastructure accelerates innovation instead of standing in its way.",
  ],
  domains: [
    { label: "Cloud Architecture", detail: "AWS · GCP · Azure" },
    { label: "Containerization", detail: "Docker · Kubernetes" },
    { label: "CI/CD Pipelines", detail: "Jenkins · GitHub Actions" },
    { label: "Infrastructure as Code", detail: "Terraform · Ansible" },
  ],
  education: [
    { degree: "BSc (Hons) Computing", school: "Herald College Kathmandu", period: "2021 – 2025" },
    { degree: "Digital Marketing", school: "Mindrisers Institute", period: "2024" },
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
    role: "Business Analyst",
    company: "",
    period: "Present",
    status: "running",
    points: [],
  },
  {
    role: "DevOps Engineer",
    company: "Wimslab",
    period: "Present",
    status: "running",
    points: [
      "Designed and maintained CI/CD pipelines using Jenkins and GitHub Actions for seamless deployments.",
      "Automated build, test, and deployment workflows with Docker and Kubernetes.",
      "Monitored and optimized cloud performance using Grafana and Prometheus to ensure high system availability.",
      "Implemented Infrastructure as Code with Terraform to streamline and scale server provisioning.",
    ],
  },
  {
    role: "SEO Specialist & Digital Marketer",
    company: "Mindrisers · Internship",
    period: "2024",
    status: "complete",
    points: [
      "Achieved a top ranking record in SEO, advertising the Flutter course within 5 days of blog publication.",
      "Developed interactive themes and content strategy for the organization.",
      "Demonstrated leadership qualities while still a student.",
    ],
  },
  {
    role: "Lead Customer Service Representative",
    company: "Foodmandu",
    period: "2023 – 2024",
    status: "complete",
    points: [
      "Leveraged analytical skills to optimize processes and ensure data-backed solutions.",
      "Transformed QA judging strategy, boosting customer satisfaction through data analysis.",
      "Motivated and guided a team, fostering a collaborative, high-performing environment.",
    ],
  },
  {
    role: "Customer Service Representative",
    company: "Bhojdeals",
    period: "2021 – 2022",
    status: "complete",
    points: [
      "Resolved complex customer inquiries and complaints with timely, positive resolutions.",
      "Managed and motivated a team of customer service representatives.",
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
  diagram: "infra" | "pipeline" | "observability";
}

export const projects: Project[] = [
  {
    id: "aws-infra",
    title: "AWS Infrastructure Automation",
    category: "Cloud",
    description:
      "Complete AWS infrastructure built with Terraform — reusable modules for VPC, EKS, RDS, and a full monitoring stack, provisioned from a single plan.",
    stack: ["Terraform", "AWS", "EKS", "RDS"],
    metrics: [
      { label: "provisioning", value: "one command" },
      { label: "modules", value: "VPC · EKS · RDS" },
    ],
    diagram: "infra",
  },
  {
    id: "cicd-pipeline",
    title: "CI/CD Pipeline Optimization",
    category: "Automation",
    description:
      "Deployment pipelines rebuilt around parallel testing and aggressive caching — cutting release time by 70% while keeping every gate green.",
    stack: ["GitHub Actions", "Docker", "CI/CD"],
    metrics: [
      { label: "deploy time", value: "−70%" },
      { label: "strategy", value: "parallel + cache" },
    ],
    diagram: "pipeline",
  },
  {
    id: "observability",
    title: "Monitoring & Observability Stack",
    category: "DevOps",
    description:
      "Comprehensive monitoring with Prometheus and Grafana — custom dashboards and alerting that surface production issues before customers notice.",
    stack: ["Prometheus", "Grafana", "AlertManager"],
    metrics: [
      { label: "detection", value: "before impact" },
      { label: "dashboards", value: "custom-built" },
    ],
    diagram: "observability",
  },
];

export interface Skill {
  name: string;
  level: number;
  category: string;
}

export const skills: Skill[] = [
  { name: "Docker", level: 90, category: "Containerization" },
  { name: "Jenkins", level: 88, category: "CI/CD" },
  { name: "Kubernetes", level: 85, category: "Orchestration" },
  { name: "GitHub Actions", level: 85, category: "CI/CD" },
  { name: "Terraform", level: 82, category: "Infrastructure as Code" },
  { name: "AWS", level: 80, category: "Cloud Platform" },
  { name: "Python", level: 78, category: "Programming" },
  { name: "SQL", level: 75, category: "Data & Analytics" },
];

export const orbitTools = [
  "Docker",
  "Kubernetes",
  "Jenkins",
  "GitHub Actions",
  "Grafana",
  "Prometheus",
  "Python",
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
    title: "Building a Production-Ready Kubernetes Cluster from Scratch",
    excerpt:
      "A comprehensive guide to setting up Kubernetes with best practices for security, networking, and observability.",
    category: "Kubernetes",
    readTime: "12 min",
  },
  {
    title: "GitOps: The Future of Infrastructure Management",
    excerpt:
      "How GitOps principles can transform your deployment workflow and improve team collaboration.",
    category: "GitOps",
    readTime: "9 min",
  },
  {
    title: "Mastering Terraform: Advanced Patterns & Best Practices",
    excerpt:
      "Deep dive into Terraform modules, state management, and strategies for managing complex infrastructure.",
    category: "IaC",
    readTime: "15 min",
  },
  {
    title: "Zero-Downtime Deployments with Kubernetes",
    excerpt:
      "Strategies and techniques for achieving zero-downtime deployments in Kubernetes environments.",
    category: "Kubernetes",
    readTime: "10 min",
  },
  {
    title: "Securing Your CI/CD Pipeline: A Complete Guide",
    excerpt:
      "Essential security practices for protecting your CI/CD pipelines from common vulnerabilities.",
    category: "Security",
    readTime: "11 min",
  },
  {
    title: "Cost Optimization Strategies for AWS Infrastructure",
    excerpt:
      "Practical tips and tools for reducing your AWS bill without compromising performance.",
    category: "AWS",
    readTime: "8 min",
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
      "Suraj transformed our deployment process completely. What used to take hours now happens in minutes with zero downtime. His expertise in Kubernetes is unmatched.",
    photo: "/testimonial-ayush.png",
  },
  {
    name: "Pramod Gurung",
    role: "Engineering Manager",
    company: "CloudScale Nepal",
    quote:
      "Working with Suraj on our cloud infrastructure was a game-changer. He helped us reduce costs significantly while improving performance. Highly recommended!",
    photo: "/testimonial-pramod.png",
  },
  {
    name: "Mingma Sherpa",
    role: "DevOps Lead",
    company: "DataPrime",
    quote:
      "Suraj's approach to CI/CD automation saved our team countless hours. His documentation and knowledge transfer made adoption seamless.",
    photo: "/testimonial-mingma.png",
  },
  {
    name: "Bipin Yogi",
    role: "VP of Engineering",
    company: "InnovateTech",
    quote:
      "The monitoring and observability stack Suraj implemented gave us visibility we never had before. Production issues are now caught before customers notice.",
    photo: "/testimonial-bipin.png",
  },
];

export const sections = [
  { id: "hero", label: "boot" },
  { id: "about", label: "system" },
  { id: "experience", label: "deploys" },
  { id: "projects", label: "workloads" },
  { id: "skills", label: "stack" },
  { id: "writing", label: "logs" },
  { id: "signals", label: "signals" },
  { id: "contact", label: "connect" },
] as const;
