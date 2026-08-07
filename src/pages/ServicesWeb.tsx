import { CtaBand } from "../components/CtaBand";
import { Faq } from "../components/Faq";
import { PageHeader } from "../components/PageHeader";
import { RelatedLinks } from "../components/RelatedLinks";
import { Reveal } from "../components/Reveal";
import { ServiceCards } from "../components/ServiceCards";
import { SectionHeading } from "../components/SectionHeading";
import { webCaseStudies, webServices } from "../data/content";
import { CaseStudyGrid } from "../sections/CaseStudyGrid";
import { Seo } from "../seo/Seo";
import { getRoute } from "../seo/routes";
import { collectionPageSchema, faqSchema, serviceSchema } from "../seo/schema";

const PATH = "/services/web/";

const FAQS = [
  {
    question: "How much does a restaurant website cost in Nepal?",
    answer:
      "A restaurant website with a manageable menu, booking or enquiry flow, gallery and Google Business Profile setup starts around NPR 40,000. A simpler cafe site starts around NPR 30,000, and a hotel or resort site with room listings starts around NPR 55,000. The variables are how many pages you need, whether photography exists already, and whether you want online ordering.",
  },
  {
    question: "Why does website speed matter so much in Nepal?",
    answer:
      "Because most of your customers are on a phone, often on mobile data, and frequently on a connection that isn't fast. A site built the usual way — large unoptimised photos, a heavy page builder, five tracking scripts — can take eight seconds or more to become usable. Most people leave well before that. Speed isn't a technical nicety here; it's the difference between being seen and not.",
  },
  {
    question: "Can I update the menu and photos myself?",
    answer:
      "Yes, and you should be able to. A menu you have to pay someone to change is a menu that goes stale, and a stale menu is worse than none. Every restaurant and cafe build includes a way for you to change prices, items and hours yourself, plus a walkthrough of how.",
  },
  {
    question: "Do I need a website if I already have a Facebook or Instagram page?",
    answer:
      "They do different jobs. Social gets you discovered by people already scrolling; a website gets you found by someone searching \"restaurant near Thamel\" who is deciding where to eat right now. It's also the only one of the three you actually own. Realistically you want both, with the website as the thing Google can show and the social feeds pointing at it.",
  },
  {
    question: "Will my website show up on Google Maps?",
    answer:
      "Google Maps listings come from a Google Business Profile, not from your website, so I set that up and connect the two: consistent name, address and phone across both, correct categories and hours, and LocalBusiness structured data on the site. That combination is what makes the listing and the site reinforce each other in local results.",
  },
  {
    question: "What about online ordering and delivery apps?",
    answer:
      "Delivery platforms take a meaningful cut of every order, so for most restaurants the goal is to keep the platforms for reach while pushing repeat customers toward direct ordering. I can build a direct ordering or WhatsApp-based flow into the site. Whether that's worth it depends on your order volume — for a small place, a clear menu and a phone number often outperforms a checkout nobody uses.",
  },
  {
    question: "Are the restaurant sites in your portfolio real businesses?",
    answer:
      "No. Himalaya & Ember, Solera, Marhaba & Marble, Azure Cove and Sherpa Reserve are self-initiated concept builds for fictional businesses, and each is labelled as such. They exist to show the patterns I build with — menu structures, booking flows, room listings — rather than to imply a client list I don't have yet. The data and reporting work shown elsewhere on this site is real.",
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
            name: "Website design and development for businesses in Nepal",
            description: route.description,
            serviceType: "Web Development",
            deliverables: webServices.map((service) => service.name),
            priceFrom: { amount: 25000, currency: "NPR" },
          }),
          collectionPageSchema({
            path: PATH,
            title: route.title,
            description: route.description,
            hasBreadcrumb: true,
            items: webServices.map((service) => ({
              name: service.name,
              path: `/services/web/${service.slug}/`,
            })),
          }),
          faqSchema(PATH, FAQS),
        ]}
      />

      <PageHeader
        path={PATH}
        eyebrow="pillar two"
        h1={route.h1}
        lede="Websites for restaurants, cafes, hotels and small businesses in Nepal. Built to load fast on mobile data, to be updated by you rather than by me, and to be found by people searching nearby."
      />

      <section className="relative py-16 md:py-24" aria-labelledby="web-problem-heading">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <Reveal>
            <h2
              id="web-problem-heading"
              className="font-display text-2xl font-semibold tracking-tight md:text-4xl"
            >
              Three things break most business websites in Nepal.
            </h2>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-dim md:text-lg">
              <p>
                <strong className="text-ink">They're slow on a phone.</strong> Full-resolution
                photographs straight from a camera, a heavy page builder, and a stack of scripts. On a
                good office connection it feels fine. On mobile data outside your restaurant, the
                person deciding where to eat has already closed the tab.
              </p>
              <p>
                <strong className="text-ink">The menu is a picture.</strong> A photographed or PDF menu
                can't be read by Google, can't be read aloud by a screen reader, and can't be zoomed
                comfortably on a small screen. It also means every price change is someone else's job,
                so it stops being accurate.
              </p>
              <p>
                <strong className="text-ink">Google doesn't know where you are.</strong> No Google
                Business Profile, or one with the wrong hours and a different phone number than the
                site. Local search is the single largest source of walk-in customers, and this is the
                cheapest thing on the list to fix.
              </p>
              <p>
                None of these are exotic problems. They're just rarely anyone's job. Fixing the three
                usually matters more than a redesign.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative py-12 md:py-20" aria-labelledby="web-services-heading">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            id="web-services-heading"
            index="01"
            channel="services"
            title="What I build"
          />
          <ServiceCards services={webServices} pillarPath="web" />
        </div>
      </section>

      <section
        className="relative border-t border-line py-16 md:py-24"
        aria-labelledby="web-work-heading"
      >
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            id="web-work-heading"
            index="02"
            channel="concept builds"
            title="The patterns, demonstrated."
            lede="These are self-initiated design studies for fictional businesses, not client engagements — each is labelled as such. They exist so you can see how a menu, a booking flow or a room listing is actually structured before commissioning one."
          />
          <CaseStudyGrid studies={webCaseStudies} />
        </div>
      </section>

      <Faq items={FAQS} heading="Questions about websites" />
      <RelatedLinks path={PATH} />
      <CtaBand
        heading="Need a website that actually brings people in?"
        body="Tell me about the business and what you want a visitor to do — book a table, call, or find you. I'll come back with a scope and a fixed price."
      />
    </>
  );
}

Component.displayName = "ServicesWebPage";
