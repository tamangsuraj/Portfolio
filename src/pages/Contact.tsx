import { BriefForm } from "../components/BriefForm";
import { PageHeader } from "../components/PageHeader";
import { RelatedLinks } from "../components/RelatedLinks";
import { Reveal } from "../components/Reveal";
import { identity, socials } from "../data/content";
import { Seo } from "../seo/Seo";
import { getRoute } from "../seo/routes";
import { localBusinessSchema, webPageSchema } from "../seo/schema";
import { AREAS_SERVED } from "../seo/site";

const PATH = "/contact/";

export function Component() {
  const route = getRoute(PATH)!;

  return (
    <>
      <Seo
        path={PATH}
        schema={[
          localBusinessSchema(),
          webPageSchema({
            path: PATH,
            title: route.title,
            description: route.description,
            type: "ContactPage",
            hasBreadcrumb: true,
          }),
        ]}
      />

      <PageHeader
        path={PATH}
        eyebrow="contact"
        h1={route.h1}
        lede="Tell me what you're trying to measure, sell or fix. I'll come back with what it would take — and I'll say so if I'm not the right person for it."
      />

      <section className="relative py-16 md:py-24" aria-labelledby="contact-form-heading">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
            <Reveal>
              <div>
                <h2
                  id="contact-form-heading"
                  className="font-display text-2xl font-semibold tracking-tight md:text-3xl"
                >
                  Send a project brief
                </h2>
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-dim md:text-base">
                  A couple of sentences is enough to start. What the business does, what you want to
                  happen, and roughly when.
                </p>
                <BriefForm />
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="glass rounded-2xl p-6 md:p-8">
                <h2 className="telemetry mb-6 text-faint">direct</h2>

                <address className="space-y-5 not-italic">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-wider text-faint">
                      email
                    </p>
                    <a
                      href={`mailto:${identity.email}`}
                      className="focus-ring mt-1 block rounded text-ink transition-colors hover:text-pulse"
                    >
                      {identity.email}
                    </a>
                  </div>
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-wider text-faint">
                      phone
                    </p>
                    <a
                      href={`tel:${identity.phone.replace(/\s/g, "")}`}
                      className="focus-ring mt-1 block rounded text-ink transition-colors hover:text-pulse"
                    >
                      {identity.phone}
                    </a>
                  </div>
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-wider text-faint">
                      based in
                    </p>
                    <p className="mt-1 text-ink">{identity.location}</p>
                    <p className="mt-0.5 font-mono text-xs text-live/80">
                      {identity.remote.toLowerCase()}
                    </p>
                  </div>
                </address>

                <div className="mt-7 border-t border-line pt-6">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-faint">
                    elsewhere
                  </p>
                  <ul className="mt-2.5 flex flex-wrap gap-x-5 gap-y-1.5">
                    {socials.map((social) => (
                      <li key={social.label}>
                        <a
                          href={social.href}
                          target="_blank"
                          rel="me noopener noreferrer"
                          className="focus-ring rounded font-mono text-sm text-dim transition-colors hover:text-pulse"
                        >
                          {social.label.toLowerCase()}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-7 border-t border-line pt-6">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-faint">
                    areas served
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-dim">
                    {AREAS_SERVED.join(" · ")} — and remotely anywhere.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <RelatedLinks path={PATH} />
    </>
  );
}

Component.displayName = "ContactPage";
