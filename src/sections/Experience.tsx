import { useRef, type PointerEvent } from "react";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { experience } from "../data/content";

function ExperienceCard({
  role,
  company,
  period,
  status,
  points,
}: (typeof experience)[number]) {
  const ref = useRef<HTMLElement>(null);

  const onMove = (e: PointerEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <article
      ref={ref}
      onPointerMove={onMove}
      className="group relative overflow-hidden rounded-3xl glass p-7 transition-all duration-300 hover:-translate-y-1 hover:border-pulse/30 md:p-9"
    >
      {/* cursor-tracked light */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(480px circle at var(--mx, 50%) var(--my, 50%), rgba(139,157,255,0.09), transparent 65%)",
        }}
      />
      {/* accent edge that grows on hover */}
      <span
        aria-hidden
        className="absolute left-0 top-7 h-0 w-[3px] rounded-full bg-gradient-to-b from-pulse to-pulse-deep transition-all duration-500 group-hover:h-[calc(100%-3.5rem)] md:top-9 md:group-hover:h-[calc(100%-4.5rem)]"
      />

      <div className="relative grid gap-5 md:grid-cols-[190px_1fr] md:gap-10">
        <div>
          <p className="font-display text-xl font-medium text-faint transition-colors duration-300 group-hover:text-dim">
            {period}
          </p>
          {status === "running" && (
            <span className="mt-3 inline-flex items-center gap-2 rounded-full border border-live/30 bg-live/10 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-live">
              <span className="status-dot scale-75" aria-hidden />
              current
            </span>
          )}
        </div>

        <div>
          <h3 className="font-display text-2xl font-medium text-ink transition-colors duration-300 group-hover:text-pulse md:text-3xl">
            {role}
          </h3>
          {company && <p className="mt-1.5 text-sm text-dim">{company}</p>}
          {points.length > 0 && (
            <ul className="mt-5 space-y-2.5">
              {points.map((point) => (
                <li key={point} className="flex gap-3 text-[15px] leading-relaxed text-dim">
                  <span
                    aria-hidden
                    className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-pulse/60 transition-transform duration-300 group-hover:scale-150"
                  />
                  {point}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </article>
  );
}

export function Experience() {
  return (
    <section id="experience" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          index="02"
          channel="career"
          title="Every role, shipped to production."
          lede="Where I've worked, and what each chapter changed."
        />

        <div className="space-y-5">
          {experience.map((job, i) => (
            <Reveal key={job.role + job.company} delay={i * 0.05}>
              <ExperienceCard {...job} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
