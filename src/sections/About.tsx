import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { TiltCard } from "../components/TiltCard";
import { about, identity } from "../data/content";

export function About() {
  return (
    <section id="about" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          index="01"
          channel="system overview"
          title="Infrastructure that gets out of the way."
        />

        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div>
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <p className="mb-6 text-lg leading-relaxed text-dim md:text-xl">{p}</p>
              </Reveal>
            ))}

            <Reveal delay={0.2}>
              <div className="mt-10 rounded-2xl glass p-6">
                <p className="telemetry mb-4">education</p>
                <ul className="space-y-4">
                  {about.education.map((e) => (
                    <li key={e.degree} className="flex flex-wrap items-baseline justify-between gap-2">
                      <div>
                        <p className="font-medium text-ink">{e.degree}</p>
                        <p className="text-sm text-dim">{e.school}</p>
                      </div>
                      <span className="font-mono text-xs text-faint">{e.period}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <div className="grid content-start gap-4 sm:grid-cols-2">
            {about.domains.map((d, i) => (
              <Reveal key={d.label} delay={0.1 + i * 0.08}>
                <TiltCard className="group relative rounded-2xl glass p-6 transition-colors hover:border-pulse/30">
                  <p className="mb-8 font-mono text-[11px] text-faint">0{i + 1}</p>
                  <h3 className="font-display text-lg font-medium text-ink">{d.label}</h3>
                  <p className="mt-2 font-mono text-xs text-dim">{d.detail}</p>
                </TiltCard>
              </Reveal>
            ))}
            <Reveal delay={0.45} className="sm:col-span-2">
              <div className="flex items-center gap-4 rounded-2xl glass p-5">
                <img
                  src="/profile.png"
                  alt={identity.name}
                  width={56}
                  height={56}
                  loading="lazy"
                  decoding="async"
                  className="h-14 w-14 rounded-full object-cover ring-1 ring-line-bright"
                />
                <div className="min-w-0">
                  <p className="font-medium text-ink">{identity.name}</p>
                  <p className="truncate font-mono text-xs text-faint">
                    {identity.location} · {identity.remote.toLowerCase()}
                  </p>
                </div>
                <span className="status-dot ml-auto shrink-0" aria-label="Available" />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
