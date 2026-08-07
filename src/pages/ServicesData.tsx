import { CtaBand } from "../components/CtaBand";
import { Faq } from "../components/Faq";
import { PageHeader } from "../components/PageHeader";
import { RelatedLinks } from "../components/RelatedLinks";
import { Reveal } from "../components/Reveal";
import { ServiceCards } from "../components/ServiceCards";
import { SectionHeading } from "../components/SectionHeading";
import { dataCaseStudies, dataServices } from "../data/content";
import { CaseStudyGrid } from "../sections/CaseStudyGrid";
import { Seo } from "../seo/Seo";
import { getRoute } from "../seo/routes";
import { collectionPageSchema, faqSchema, serviceSchema } from "../seo/schema";

const PATH = "/services/data/";

const FAQS = [
  {
    question: "What is the difference between MIS, business intelligence and business analysis?",
    answer:
      "MIS is the plumbing — how information gets collected, stored and reported on a schedule. Business intelligence is what you build on top: dashboards and analysis that turn that information into a view of the business. Business analysis is the human work of deciding what should be measured and why. Most companies ask for one and actually need a bit of all three, which is why I don't sell them as separate silos.",
  },
  {
    question: "Do I need Power BI, or will Excel or Google Sheets do?",
    answer:
      "Genuinely depends on scale. If your data fits comfortably in a spreadsheet and two or three people read the report, Google Sheets with proper automation is cheaper, faster and easier for your team to maintain. Power BI earns its cost when you have multiple data sources, more than a handful of readers, or a need for role-based access. I'd rather tell you to spend less than sell you a licence you don't need.",
  },
  {
    question: "My data is a mess. Is it too early to build a dashboard?",
    answer:
      "It's never too early to look, but sometimes it's too early to build. Messy source data is the normal starting point — the question is whether the mess is fixable at source or has to be cleaned on every refresh forever. That assessment is usually the first week of any project, and occasionally the honest answer is that fixing data entry comes before any dashboard.",
  },
  {
    question: "Can you take over an existing dashboard someone else built?",
    answer:
      "Yes, and it's common. Usually the issues are a broken or manual refresh, metric definitions nobody agreed on, or a design that buries the important number. Taking over an existing build is normally cheaper than starting again — I'll tell you if it isn't.",
  },
  {
    question: "Will my team be able to maintain it after you're done?",
    answer:
      "That's the goal. Every build comes with documentation, a walkthrough session, and structure chosen so routine changes don't need me. If a reporting system only works while its author is available, it isn't finished.",
  },
  {
    question: "Do you sign NDAs and handle confidential business data?",
    answer:
      "Yes to NDAs, and handling sensitive commercial data is routine — sales figures, margins and pipeline detail are the substance of this work. Access is limited to what a project actually requires, and returned or removed at the end.",
  },
];

export function Component() {
  const route = getRoute(PATH)!;

  return (
    <>
      <Seo
        path={PATH}
        schema={[
          serviceSchema({
            path: PATH,
            name: "Business intelligence, MIS and data analytics services",
            description: route.description,
            serviceType: "Business Intelligence Consulting",
            deliverables: dataServices.map((service) => service.name),
          }),
          collectionPageSchema({
            path: PATH,
            title: route.title,
            description: route.description,
            hasBreadcrumb: true,
            items: dataServices.map((service) => ({
              name: service.name,
              path: `/services/data/${service.slug}/`,
            })),
          }),
          faqSchema(PATH, FAQS),
        ]}
      />

      <PageHeader
        path={PATH}
        eyebrow="pillar one"
        h1={route.h1}
        lede="Reporting that answers the question before the meeting starts. Dashboards, MIS systems, business analysis and spreadsheet automation for companies in Kathmandu and across Nepal."
      />

      <section className="relative py-16 md:py-24" aria-labelledby="data-problem-heading">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <Reveal>
            <h2
              id="data-problem-heading"
              className="font-display text-2xl font-semibold tracking-tight md:text-4xl"
            >
              The problem is almost never a lack of data.
            </h2>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-dim md:text-lg">
              <p>
                Most businesses I meet are already sitting on plenty of it. Sales entries, stock
                movements, ad spend, service records. What's missing is a version of it that someone
                can look at on a Tuesday morning and know what to do.
              </p>
              <p>
                Usually there are three failures underneath that. Nobody agreed what the metrics mean,
                so two reports disagree and both get ignored. The numbers arrive too late to change
                anything. And the report has forty things on it, so the important one is invisible.
              </p>
              <p>
                None of those are solved by buying a tool. They're solved by deciding what matters,
                defining it precisely, automating its delivery, and showing less. That's the work.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative py-12 md:py-20" aria-labelledby="data-services-heading">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            id="data-services-heading"
            index="01"
            channel="services"
            title="What I build"
          />
          <ServiceCards services={dataServices} pillarPath="data" />
        </div>
      </section>

      <section
        className="relative border-t border-line py-16 md:py-24"
        aria-labelledby="data-work-heading"
      >
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            id="data-work-heading"
            index="02"
            channel="proof"
            title="Reporting currently in daily use."
            lede="These are real systems from my roles at MAW Vriddhi and Wimslab — not demonstrations."
          />
          <CaseStudyGrid studies={dataCaseStudies} />
        </div>
      </section>

      <Faq items={FAQS} heading="Questions about data work" />
      <RelatedLinks path={PATH} />
      <CtaBand
        heading="Sitting on data that isn't answering your questions?"
        body="Tell me what you're trying to see and where the data currently lives. I'll tell you what it would take — and whether you need a dashboard or something simpler."
      />
    </>
  );
}

Component.displayName = "ServicesDataPage";
