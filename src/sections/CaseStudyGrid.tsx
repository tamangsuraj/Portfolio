import { Reveal } from "../components/Reveal";
import { TiltCard } from "../components/TiltCard";
import type { CaseStudy } from "../data/content";

function Diagram({ kind }: { kind: CaseStudy["diagram"] }) {
  const stroke = "rgba(139,157,255,0.55)";
  const dim = "rgba(139,157,255,0.22)";
  const live = "rgba(52,211,153,0.9)";

  if (kind === "platform") {
    return (
      <svg viewBox="0 0 280 120" className="h-full w-full" aria-hidden focusable="false">
        <rect x="110" y="8" width="60" height="24" rx="6" fill="none" stroke={stroke} />
        <text x="140" y="24" textAnchor="middle" fill={stroke} fontSize="9" fontFamily="monospace">
          source
        </text>
        {[
          { x: 30, label: "enquiry" },
          { x: 110, label: "booking" },
          { x: 190, label: "retail" },
        ].map((n) => (
          <g key={n.label}>
            <path d={`M140 32 L${n.x + 30} 66`} stroke={dim} fill="none" />
            <rect x={n.x} y="66" width="60" height="24" rx="6" fill="none" stroke={dim} />
            <text
              x={n.x + 30}
              y="82"
              textAnchor="middle"
              fill={stroke}
              fontSize="9"
              fontFamily="monospace"
            >
              {n.label}
            </text>
          </g>
        ))}
      </svg>
    );
  }

  if (kind === "flow") {
    const stages = ["extract", "clean", "model", "send"];
    return (
      <svg viewBox="0 0 280 120" className="h-full w-full" aria-hidden focusable="false">
        {stages.map((s, i) => {
          const x = 10 + i * 68;
          return (
            <g key={s}>
              <rect x={x} y="44" width="54" height="30" rx="8" fill="none" stroke={stroke} />
              <circle cx={x + 10} cy="59" r="3" fill={live} />
              <text
                x={x + 32}
                y="63"
                textAnchor="middle"
                fill={stroke}
                fontSize="9"
                fontFamily="monospace"
              >
                {s}
              </text>
              {i < stages.length - 1 && (
                <path d={`M${x + 54} 59 h14`} stroke={dim} strokeDasharray="3 3" />
              )}
            </g>
          );
        })}
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 280 120" className="h-full w-full" aria-hidden focusable="false">
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
    </svg>
  );
}

/**
 * Case study card.
 *
 * Concept builds carry a visible "Concept build" chip and an explanatory note.
 * That label is not a disclaimer bolted on for legal comfort — several of the
 * linked demos state on their own pages that they are fictional, so any
 * ambiguity here would be discovered in one click and cost more trust than it
 * could ever buy.
 */
function Card({ study, headingLevel = 3 }: { study: CaseStudy; headingLevel?: 2 | 3 }) {
  const Heading = (headingLevel === 2 ? "h2" : "h3") as "h2" | "h3";

  return (
    <TiltCard className="beam-border glass group flex h-full flex-col overflow-hidden rounded-3xl">
      <div className="border-b border-line bg-panel/40 px-4 pt-4">
        <div className="mb-3 flex items-center gap-2">
          <span aria-hidden className="h-2 w-2 rounded-full bg-faint/50" />
          <span aria-hidden className="h-2 w-2 rounded-full bg-faint/50" />
          <span className="ml-auto font-mono text-[10px] text-faint">
            {study.category.toLowerCase()}
          </span>
        </div>
        <div className="h-32">
          <Diagram kind={study.diagram} />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span
            className={`rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider ${
              study.clientWork
                ? "border border-live/30 bg-live/10 text-live"
                : "border border-line-bright bg-void/40 text-faint"
            }`}
          >
            {study.clientWork ? "Client work" : "Concept build"}
          </span>
        </div>

        <Heading className="font-display text-xl font-medium text-ink">
          {study.href ? (
            <a
              href={study.href}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring rounded transition-colors hover:text-pulse"
            >
              {study.title}{" "}
              <span aria-hidden>↗</span>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          ) : (
            study.title
          )}
        </Heading>

        {study.conceptNote && (
          <p className="mt-2 font-mono text-[11px] leading-relaxed text-faint">
            {study.conceptNote}
          </p>
        )}

        <dl className="mt-5 space-y-3 text-sm leading-relaxed">
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-wider text-faint">Problem</dt>
            <dd className="mt-1 text-dim">{study.problem}</dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-wider text-faint">Solution</dt>
            <dd className="mt-1 text-dim">{study.solution}</dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-wider text-faint">
              {study.clientWork ? "Outcome" : "What it demonstrates"}
            </dt>
            <dd className="mt-1 text-dim">{study.outcome}</dd>
          </div>
        </dl>

        <ul className="mt-auto flex flex-wrap gap-2 pt-6">
          {study.technology.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-dim"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </TiltCard>
  );
}

export function CaseStudyGrid({
  studies,
  headingLevel = 3,
}: {
  studies: CaseStudy[];
  headingLevel?: 2 | 3;
}) {
  return (
    <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {studies.map((study, i) => (
        <li key={study.id} className="h-full">
          <Reveal delay={i * 0.07} className="h-full">
            <Card study={study} headingLevel={headingLevel} />
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
