import { Link } from "react-router-dom";
import { CtaBand } from "../components/CtaBand";
import { Faq } from "../components/Faq";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { caseStudies, homeFaqs } from "../data/content";
import { About } from "../sections/About";
import { CaseStudyGrid } from "../sections/CaseStudyGrid";
import { Experience } from "../sections/Experience";
import { Hero } from "../sections/Hero";
import { Pillars } from "../sections/Pillars";
import { Skills } from "../sections/Skills";
import { Seo } from "../seo/Seo";
import {
  faqSchema,
  localBusinessSchema,
  organizationSchema,
  personSchema,
  webPageSchema,
  websiteSchema,
} from "../seo/schema";

const PATH = "/";

/** Three most representative projects — the rest live on /work/. */
const FEATURED = caseStudies.filter((c) =>
  ["maw-vriddhi-sales-intelligence", "himalaya-ember", "azure-cove"].includes(c.id),
);

export function Component() {
  return (
    <>
      {/*
        The home page is the only page that emits the Person, Organization,
        WebSite and LocalBusiness nodes in full. Every other page references
        them by @id, which is what tells Google these are all one entity rather
        than forty unrelated mentions of the same name.
      */}
      <Seo
        path={PATH}
        breadcrumbs={false}
        schema={[
          personSchema(),
          organizationSchema(),
          websiteSchema(),
          localBusinessSchema(),
          webPageSchema({
            path: PATH,
            title: "Suraj Tamang — Business Intelligence & Web Developer, Nepal",
            description:
              "MIS and business intelligence analyst in Kathmandu. Power BI dashboards, reporting automation, and websites for restaurants and small businesses across Nepal.",
          }),
          faqSchema(PATH, homeFaqs),
        ]}
      />

      <Hero />
      <Pillars />
      <About />

      <section className="relative py-20 md:py-32" aria-labelledby="featured-work">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            id="featured-work"
            index="03"
            channel="selected work"
            title="Built, shipped, in daily use."
            lede="A sales platform leadership logs into every morning, and the design studies behind the website work. Each one says plainly whether it was a client engagement or a concept build."
          />
          <CaseStudyGrid studies={FEATURED} />
          <Reveal delay={0.2}>
            <div className="mt-10 flex justify-center">
              <Link
                to="/work/"
                className="focus-ring glass inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-sm font-medium text-ink transition-colors hover:border-pulse/40"
              >
                See all work
                <span aria-hidden>→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Experience />
      <Skills />
      <Faq items={homeFaqs} />
      <CtaBand />
    </>
  );
}

Component.displayName = "HomePage";
