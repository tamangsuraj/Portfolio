import { Magnetic } from "../components/Magnetic";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { identity, socials } from "../data/content";

export function Contact() {
  return (
    <section id="contact" className="relative py-28 md:py-40">
      {/* ambient glow behind the closing panel */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[60vmin] w-[80vmin] -translate-x-1/2 -translate-y-1/2"
        style={{
          background: "radial-gradient(ellipse, rgba(91,108,255,0.10), transparent 65%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          index="07"
          channel="open a connection"
          title="Let's build something reliable."
        />

        <Reveal>
          <div className="overflow-hidden rounded-3xl glass-bright">
            {/* terminal chrome */}
            <div className="flex items-center gap-2 border-b border-line px-5 py-3.5" aria-hidden>
              <span className="h-2.5 w-2.5 rounded-full bg-faint/40" />
              <span className="h-2.5 w-2.5 rounded-full bg-faint/40" />
              <span className="h-2.5 w-2.5 rounded-full bg-faint/40" />
              <span className="ml-3 font-mono text-[11px] text-faint">ssh suraj@new-project</span>
            </div>

            <div className="grid gap-10 p-7 md:grid-cols-[1.2fr_0.8fr] md:p-12">
              <div>
                <p className="font-mono text-xs leading-6 text-faint" aria-hidden>
                  $ whoami --availability
                  <br />
                  <span className="text-live/80">→ open to DevOps & cloud infrastructure work</span>
                </p>
                <h3 className="mt-6 font-display text-2xl font-medium leading-snug text-ink md:text-3xl">
                  Have infrastructure that needs taming, or a pipeline that should be faster?
                </h3>
                <div className="mt-9 flex flex-wrap items-center gap-4">
                  <Magnetic>
                    <a
                      href={`mailto:${identity.email}`}
                      className="inline-flex items-center gap-3 rounded-full bg-pulse px-7 py-3.5 font-medium text-void transition-colors hover:bg-ink"
                    >
                      {identity.email}
                    </a>
                  </Magnetic>
                  <Magnetic>
                    <a
                      href={identity.contactForm}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full glass px-7 py-3.5 font-medium text-ink transition-colors hover:border-pulse/40"
                    >
                      Send a brief <span aria-hidden>↗</span>
                    </a>
                  </Magnetic>
                </div>
              </div>

              <dl className="space-y-5 border-t border-line pt-8 font-mono text-sm md:border-l md:border-t-0 md:pl-10 md:pt-0">
                <div>
                  <dt className="text-[11px] uppercase tracking-wider text-faint">location</dt>
                  <dd className="mt-1 text-dim">
                    {identity.location}
                    <br />
                    <span className="text-live/80">{identity.remote.toLowerCase()}</span>
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-wider text-faint">phone</dt>
                  <dd className="mt-1 text-dim">{identity.phone}</dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-wider text-faint">elsewhere</dt>
                  <dd className="mt-2 flex flex-wrap gap-x-5 gap-y-1">
                    {socials.map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-dim transition-colors hover:text-pulse"
                      >
                        {s.label.toLowerCase()}
                      </a>
                    ))}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
