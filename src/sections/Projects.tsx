import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { TiltCard } from "../components/TiltCard";
import { projects, type Project } from "../data/content";

function Diagram({ kind }: { kind: Project["diagram"] }) {
  const stroke = "rgba(139,157,255,0.55)";
  const dim = "rgba(139,157,255,0.22)";
  const live = "rgba(52,211,153,0.9)";

  if (kind === "platform") {
    return (
      <svg viewBox="0 0 280 120" className="h-full w-full" aria-hidden>
        <rect x="110" y="8" width="60" height="24" rx="6" fill="none" stroke={stroke} />
        <text x="140" y="24" textAnchor="middle" fill={stroke} fontSize="9" fontFamily="monospace">supabase</text>
        {[
          { x: 30, label: "enquiry" },
          { x: 110, label: "booking" },
          { x: 190, label: "retail" },
        ].map((n) => (
          <g key={n.label}>
            <path d={`M140 32 L${n.x + 30} 66`} stroke={dim} fill="none" />
            <rect x={n.x} y="66" width="60" height="24" rx="6" fill="none" stroke={dim} />
            <text x={n.x + 30} y="82" textAnchor="middle" fill={stroke} fontSize="9" fontFamily="monospace">
              {n.label}
            </text>
          </g>
        ))}
        <text x="140" y="112" textAnchor="middle" fill={dim} fontSize="8" fontFamily="monospace">
          role-based access · live
        </text>
      </svg>
    );
  }

  if (kind === "flow") {
    const stages = ["extract", "clean", "model", "send"];
    return (
      <svg viewBox="0 0 280 120" className="h-full w-full" aria-hidden>
        {stages.map((s, i) => {
          const x = 10 + i * 68;
          return (
            <g key={s}>
              <rect x={x} y="44" width="54" height="30" rx="8" fill="none" stroke={stroke} />
              <circle cx={x + 10} cy="59" r="3" fill={live} />
              <text x={x + 32} y="63" textAnchor="middle" fill={stroke} fontSize="9" fontFamily="monospace">
                {s}
              </text>
              {i < stages.length - 1 && (
                <path d={`M${x + 54} 59 h14`} stroke={dim} strokeDasharray="3 3" />
              )}
            </g>
          );
        })}
        <text x="140" y="102" textAnchor="middle" fill={dim} fontSize="8" fontFamily="monospace">
          daily digest · 10:00 am
        </text>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 280 120" className="h-full w-full" aria-hidden>
      <polyline
        points="10,84 40,70 70,78 100,52 130,60 160,38 190,48 220,30 250,40 270,26"
        fill="none"
        stroke={stroke}
        strokeWidth="1.5"
      />
      <polyline
        points="10,96 40,92 70,95 100,88 130,91 160,84 190,88 220,80 250,84 270,78"
        fill="none"
        stroke={dim}
        strokeWidth="1.5"
      />
      <circle cx="220" cy="30" r="3.5" fill={live} />
      <text x="232" y="26" fill={live} fontSize="8" fontFamily="monospace">target hit</text>
      <text x="140" y="114" textAnchor="middle" fill={dim} fontSize="8" fontFamily="monospace">
        12-month conversion trend
      </text>
    </svg>
  );
}

export function Projects() {
  return (
    <section id="projects" className="relative py-20 md:py-40">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          index="03"
          channel="projects"
          title="Built, shipped, in daily use."
          lede="Dashboards, reporting automation, and the platform leadership logs into every morning."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal key={project.id} delay={i * 0.09}>
              <TiltCard className="group beam-border relative flex h-full flex-col overflow-hidden rounded-3xl glass">
                <div className="border-b border-line bg-panel/40 px-4 pt-4">
                  <div className="mb-3 flex items-center gap-2" aria-hidden>
                    <span className="h-2 w-2 rounded-full bg-faint/50" />
                    <span className="h-2 w-2 rounded-full bg-faint/50" />
                    <span className="ml-auto font-mono text-[10px] text-faint">{project.category.toLowerCase()}</span>
                  </div>
                  <div className="h-32">
                    <Diagram kind={project.diagram} />
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-xl font-medium text-ink">
                    {project.href ? (
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noreferrer"
                        className="transition-colors hover:text-pulse"
                      >
                        {project.title} <span aria-hidden>↗</span>
                      </a>
                    ) : (
                      project.title
                    )}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-dim">{project.description}</p>

                  <dl className="mt-6 grid grid-cols-2 gap-3">
                    {project.metrics.map((m) => (
                      <div key={m.label} className="rounded-xl border border-line bg-void/40 px-3 py-2.5">
                        <dt className="font-mono text-[10px] uppercase tracking-wider text-faint">{m.label}</dt>
                        <dd className="mt-1 font-mono text-xs text-pulse">{m.value}</dd>
                      </div>
                    ))}
                  </dl>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.stack.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-dim"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
