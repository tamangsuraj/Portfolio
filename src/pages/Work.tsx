import { CtaBand } from "../components/CtaBand";
import { PageHeader } from "../components/PageHeader";
import { RelatedLinks } from "../components/RelatedLinks";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { caseStudies, dataCaseStudies, webCaseStudies } from "../data/content";
import { CaseStudyGrid } from "../sections/CaseStudyGrid";
import { Seo } from "../seo/Seo";
import { getRoute } from "../seo/routes";
import { collectionPageSchema, creativeWorkSchema } from "../seo/schema";

const PATH = "/work/";

export function Component() {
  const route = getRoute(PATH)!;

  return (
    <>
      <Seo
        path={PATH}
        schema={[
          collectionPageSchema({
            path: PATH,
            title: route.title,
            description: route.description,
            hasBreadcrumb: true,
            items: caseStudies.map((study) => ({ name: study.title, path: PATH })),
          }),
          // Each project as a CreativeWork, keyed by its own id so the eight
          // nodes stay distinct. `genre` distinguishes client work from concept
          // builds so the markup matches the visible labelling.
          ...caseStudies.map((study) =>
            creativeWorkSchema({
              path: PATH,
              id: study.id,
              name: study.title,
              description: `${study.problem} ${study.solution}`,
              url: study.href,
              technologies: study.technology,
              isClientWork: study.clientWork,
            }),
          ),
        ]}
      />

      <PageHeader
        path={PATH}
        eyebrow="work"
        h1={route.h1}
        lede="Reporting systems in daily use at the companies I've worked for, and the design studies behind the website practice. Each project says plainly which it is."
      />

      <section className="relative py-10 md:py-16" aria-labelledby="honesty-heading">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <Reveal>
            <div className="glass rounded-2xl p-6 md:p-8">
              <h2 id="honesty-heading" className="font-display text-lg font-medium text-ink">
                A note on what's what
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-dim md:text-base">
                The data and reporting projects below are real systems built in my roles at{" "}
                <strong className="text-ink">MAW Vriddhi</strong> and{" "}
                <strong className="text-ink">Wimslab</strong>, in use by those businesses.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-dim md:text-base">
                The website projects are{" "}
                <strong className="text-ink">self-initiated concept builds</strong> — complete,
                deployed sites for businesses that don't exist, built to work out and demonstrate the
                patterns I use. They are not client engagements, and I'd rather say so here than have
                you discover it after hiring me. What they show is real: how I structure a menu, a
                booking flow, a room listing or a product page.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative py-12 md:py-20" aria-labelledby="data-work-heading">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            id="data-work-heading"
            index="01"
            channel="client work"
            title="Data, reporting & platforms"
            lede="Systems currently in daily use, built as part of my MIS and business intelligence roles."
          />
          <CaseStudyGrid studies={dataCaseStudies} />
        </div>
      </section>

      <section
        className="relative border-t border-line py-12 md:py-20"
        aria-labelledby="web-work-heading"
      >
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            id="web-work-heading"
            index="02"
            channel="concept builds"
            title="Websites & digital products"
            lede="Fictional businesses, real builds. Restaurants, a resort and a single-product storefront — each one working through a different pattern."
          />
          <CaseStudyGrid studies={webCaseStudies} />
        </div>
      </section>

      <RelatedLinks path={PATH} />
      <CtaBand
        heading="Want something like this for your business?"
        body="The patterns above are the starting point, not the ceiling. Tell me what you're working with and I'll tell you what fits."
      />
    </>
  );
}

Component.displayName = "WorkPage";
