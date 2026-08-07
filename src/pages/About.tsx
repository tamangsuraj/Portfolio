import { CtaBand } from "../components/CtaBand";
import { PageHeader } from "../components/PageHeader";
import { Picture } from "../components/Picture";
import { RelatedLinks } from "../components/RelatedLinks";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { about, identity, methodology } from "../data/content";
import { Experience } from "../sections/Experience";
import { Seo } from "../seo/Seo";
import { getRoute } from "../seo/routes";
import { personSchema, profilePageSchema, webPageSchema } from "../seo/schema";

const PATH = "/about/";

export function Component() {
  const route = getRoute(PATH)!;

  return (
    <>
      {/*
        ProfilePage + the full Person node. This is the page Google is most
        likely to treat as the canonical description of the "Suraj Tamang"
        entity, so the credentials and alumniOf data live here as well as home.
      */}
      <Seo
        path={PATH}
        ogType="profile"
        schema={[
          personSchema(),
          profilePageSchema(PATH),
          webPageSchema({
            path: PATH,
            title: route.title,
            description: route.description,
            type: "AboutPage",
            hasBreadcrumb: true,
          }),
        ]}
      />

      <PageHeader
        path={PATH}
        eyebrow="about"
        h1={route.h1}
        lede="MIS and business intelligence analyst in Kathmandu. I build the reporting companies decide from, and the websites the businesses behind that data need."
      />

      <section className="relative py-16 md:py-24" aria-labelledby="bio-heading">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
            <div>
              <h2 id="bio-heading" className="sr-only">
                Professional biography
              </h2>
              {about.paragraphs.map((paragraph, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <p className="mb-6 text-base leading-relaxed text-dim md:text-lg">{paragraph}</p>
                </Reveal>
              ))}

              <Reveal delay={0.25}>
                <div className="glass mt-8 rounded-2xl p-6">
                  <h3 className="telemetry mb-5 text-faint">education &amp; credentials</h3>
                  <ul className="space-y-4">
                    {about.education.map((entry) => (
                      <li
                        key={entry.degree}
                        className="flex flex-wrap items-baseline justify-between gap-2"
                      >
                        <div>
                          <p className="font-medium text-ink">{entry.degree}</p>
                          <p className="text-sm text-dim">{entry.school}</p>
                        </div>
                        <span className="font-mono text-xs text-faint">{entry.period}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>

            <div className="lg:pt-2">
              <Reveal delay={0.15}>
                <figure className="glass overflow-hidden rounded-2xl p-6">
                  <Picture
                    name="profile"
                    alt="Suraj Tamang, MIS and business intelligence analyst based in Kathmandu, Nepal"
                    widths={[240, 480, 960]}
                    sizes="(min-width: 1024px) 420px, (min-width: 640px) 50vw, 90vw"
                    width={480}
                    height={480}
                    className="aspect-square w-full rounded-xl object-cover ring-1 ring-line-bright"
                  />
                  <figcaption className="mt-5">
                    <p className="font-display text-lg font-medium text-ink">{identity.name}</p>
                    <p className="mt-1 font-mono text-xs text-faint">
                      {identity.location} · {identity.remote.toLowerCase()}
                    </p>
                    <dl className="mt-5 space-y-2 border-t border-line pt-5 font-mono text-xs">
                      <div className="flex justify-between gap-4">
                        <dt className="text-faint">email</dt>
                        <dd>
                          <a
                            href={`mailto:${identity.email}`}
                            className="focus-ring rounded text-dim transition-colors hover:text-pulse"
                          >
                            {identity.email}
                          </a>
                        </dd>
                      </div>
                      <div className="flex justify-between gap-4">
                        <dt className="text-faint">phone</dt>
                        <dd>
                          <a
                            href={`tel:${identity.phone.replace(/\s/g, "")}`}
                            className="focus-ring rounded text-dim transition-colors hover:text-pulse"
                          >
                            {identity.phone}
                          </a>
                        </dd>
                      </div>
                    </dl>
                  </figcaption>
                </figure>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-16 md:py-24" aria-labelledby="method-heading">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            id="method-heading"
            index="03"
            channel="how i work"
            title="The same five steps, every project."
            lede="Process is the difference between a project that lands and one that gets rebuilt. This is what actually happens, in order."
          />
          <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {methodology.map((step, i) => (
              <li key={step.step}>
                <Reveal delay={i * 0.07}>
                  <div className="glass h-full rounded-2xl p-6 transition-colors hover:border-pulse/30">
                    <p className="mb-5 font-mono text-[11px] text-pulse">{step.step}</p>
                    <h3 className="font-display text-lg font-medium text-ink">{step.title}</h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-dim">{step.detail}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Experience />
      <RelatedLinks path={PATH} />
      <CtaBand
        heading="Want to talk through a project?"
        body="Send a short brief — what you're trying to measure or sell, and roughly when you need it. I'll come back with what it would take."
      />
    </>
  );
}

Component.displayName = "AboutPage";
