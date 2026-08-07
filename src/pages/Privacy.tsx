import { PageHeader } from "../components/PageHeader";
import { Reveal } from "../components/Reveal";
import { identity } from "../data/content";
import { Seo } from "../seo/Seo";
import { getRoute } from "../seo/routes";
import { webPageSchema } from "../seo/schema";

const PATH = "/privacy/";
const LAST_UPDATED = "7 August 2026";

export function Component() {
  const route = getRoute(PATH)!;

  return (
    <>
      <Seo
        path={PATH}
        schema={[
          webPageSchema({
            path: PATH,
            title: route.title,
            description: route.description,
            hasBreadcrumb: true,
            dateModified: "2026-08-07",
          }),
        ]}
      />

      <PageHeader path={PATH} eyebrow="legal" h1={route.h1} />

      <section className="relative py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <Reveal>
            <p className="font-mono text-xs text-faint">Last updated: {LAST_UPDATED}</p>

            <div className="prose-invert mt-8 space-y-8 text-base leading-relaxed text-dim">
              <div>
                <h2 className="font-display text-xl font-semibold text-ink md:text-2xl">
                  The short version
                </h2>
                <p className="mt-3">
                  This is a personal portfolio site. It does not run advertising, does not sell data,
                  and does not set tracking cookies. The only personal information it handles is what
                  you choose to send through the contact form.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-semibold text-ink md:text-2xl">
                  What the contact form collects
                </h2>
                <p className="mt-3">
                  Your name, email address and whatever you write in the message field. These are
                  delivered to my inbox by FormSubmit, a third-party form-delivery service, and are
                  used only to reply to your enquiry and to carry out any work that follows from it.
                </p>
                <p className="mt-3">
                  Submissions are not added to a mailing list, and they are not shared with anyone
                  else except where a project genuinely requires it and you have agreed to it.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-semibold text-ink md:text-2xl">
                  Cookies and analytics
                </h2>
                <p className="mt-3">
                  This site sets no cookies of its own and does not use Google Analytics or any
                  behavioural tracking. Aggregate, anonymous traffic counts may be visible to me
                  through the hosting provider — page views and referrers, with no way to identify an
                  individual visitor.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-semibold text-ink md:text-2xl">
                  Third parties
                </h2>
                <p className="mt-3">
                  The site is hosted on Vercel, which processes standard server request data. Fonts
                  and other assets are served from this domain. Contact form delivery is handled by
                  FormSubmit. Each of these has its own privacy policy governing the data it
                  processes.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-semibold text-ink md:text-2xl">
                  How long anything is kept
                </h2>
                <p className="mt-3">
                  Enquiry emails stay in my inbox until they are no longer relevant. Project-related
                  correspondence and files are kept for the duration of the work and a reasonable
                  period after, then deleted.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-semibold text-ink md:text-2xl">
                  Your choices
                </h2>
                <p className="mt-3">
                  You can ask me at any time to tell you what I hold about you, to correct it, or to
                  delete it. Email{" "}
                  <a
                    href={`mailto:${identity.email}`}
                    className="focus-ring rounded text-pulse underline underline-offset-4 hover:text-ink"
                  >
                    {identity.email}
                  </a>{" "}
                  and I'll action it.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-semibold text-ink md:text-2xl">Contact</h2>
                <p className="mt-3">
                  {identity.name} · {identity.location}
                  <br />
                  <a
                    href={`mailto:${identity.email}`}
                    className="focus-ring rounded text-pulse underline underline-offset-4 hover:text-ink"
                  >
                    {identity.email}
                  </a>
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

Component.displayName = "PrivacyPage";
