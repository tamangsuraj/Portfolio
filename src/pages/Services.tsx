import { Link } from "react-router-dom";
import { CtaBand } from "../components/CtaBand";
import { Faq } from "../components/Faq";
import { PageHeader } from "../components/PageHeader";
import { RelatedLinks } from "../components/RelatedLinks";
import { Reveal } from "../components/Reveal";
import { ServiceCards } from "../components/ServiceCards";
import { SectionHeading } from "../components/SectionHeading";
import { dataServices, webServices } from "../data/content";
import { Seo } from "../seo/Seo";
import { getRoute } from "../seo/routes";
import { collectionPageSchema, faqSchema, localBusinessSchema } from "../seo/schema";

const PATH = "/services/";

const FAQS = [
  {
    question: "Why do you offer both data work and web development?",
    answer:
      "Because the same question sits underneath both: what does this business actually need to know, or to say? A restaurant that gets a website usually also needs to know which dishes and channels make money. A company that gets a dashboard usually has a website nobody can find. Doing both means the two are designed to fit together instead of being stitched up afterwards.",
  },
  {
    question: "Do you work with businesses outside Kathmandu?",
    answer:
      "Yes. I work in person across the Kathmandu valley — Kathmandu, Lalitpur and Bhaktapur — and remotely with businesses in Pokhara, Chitwan, Butwal, Biratnagar, Dharan and beyond Nepal. Almost all of the work is done remotely regardless; the only part that benefits from being in the room is the initial scoping.",
  },
  {
    question: "How do you price projects?",
    answer:
      "Fixed price per project, agreed before work starts, based on a written scope. I don't bill hourly for defined projects because it puts the risk of my own slowness on you. Ongoing work like website maintenance is a monthly retainer.",
  },
  {
    question: "What do you need from me to start?",
    answer:
      "For data work: access to wherever the data currently lives, and thirty minutes to tell me which decisions the reporting is supposed to support. For a website: your content, photos and logo if you have them, and a sense of what you want a visitor to do. If you don't have content ready, that's normal — we'll work out what's needed.",
  },
  {
    question: "How long does a project take?",
    answer:
      "A small business website is usually one to two weeks. A restaurant site is two to three. A Power BI dashboard build runs two to four weeks depending on how clean the source data is — that variable, not the dashboard itself, is what usually drives the timeline.",
  },
  {
    question: "What happens after the project is delivered?",
    answer:
      "You get documentation and a walkthrough, and you own everything. If you want ongoing help there's a maintenance retainer, but it's optional — I build things so you can run them yourself, and I'd rather you didn't need me for routine changes.",
  },
];

export function Component() {
  const route = getRoute(PATH)!;

  return (
    <>
      <Seo
        path={PATH}
        schema={[
          localBusinessSchema(),
          collectionPageSchema({
            path: PATH,
            title: route.title,
            description: route.description,
            hasBreadcrumb: true,
            items: [
              { name: "Data, MIS & business intelligence", path: "/services/data/" },
              { name: "Website development", path: "/services/web/" },
            ],
          }),
          faqSchema(PATH, FAQS),
        ]}
      />

      <PageHeader
        path={PATH}
        eyebrow="services"
        h1={route.h1}
        lede="Two practices. On one side, the reporting that tells you how the business is doing. On the other, the website that brings the business in. Both from Kathmandu, both priced for Nepal."
      />

      <section className="relative py-16 md:py-24" aria-labelledby="data-services-heading">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            id="data-services-heading"
            index="01"
            channel="pillar one"
            title="Data, MIS & business intelligence"
            lede="Dashboards, reporting automation, business analysis and spreadsheet automation — built by someone who does this as a day job, not as a side interest."
          />
          <ServiceCards services={dataServices} pillarPath="data" />
          <Reveal delay={0.2}>
            <div className="mt-8">
              <Link
                to="/services/data/"
                className="focus-ring inline-flex items-center gap-2 rounded-full text-sm font-medium text-pulse transition-colors hover:text-ink"
              >
                More on data &amp; MIS services
                <span aria-hidden>→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        className="relative border-t border-line py-16 md:py-24"
        aria-labelledby="web-services-heading"
      >
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            id="web-services-heading"
            index="02"
            channel="pillar two"
            title="Website development"
            lede="Restaurants, cafes, hotels, shops and showrooms. Fast on mobile data, updatable without a developer, and set up so Google knows where you are."
          />
          <ServiceCards services={webServices} pillarPath="web" />
          <Reveal delay={0.2}>
            <div className="mt-8">
              <Link
                to="/services/web/"
                className="focus-ring inline-flex items-center gap-2 rounded-full text-sm font-medium text-pulse transition-colors hover:text-ink"
              >
                More on website development
                <span aria-hidden>→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Faq items={FAQS} heading="Working together" />
      <RelatedLinks path={PATH} />
      <CtaBand />
    </>
  );
}

Component.displayName = "ServicesPage";
