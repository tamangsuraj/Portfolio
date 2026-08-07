import { Link } from "react-router-dom";
import { identity } from "../data/content";
import { Magnetic } from "./Magnetic";
import { Reveal } from "./Reveal";

/**
 * Closing conversion block. Appears at the foot of every interior page.
 *
 * Two actions, deliberately unequal: one primary (start a project) and one
 * low-commitment fallback (email directly). Giving both equal visual weight is
 * the most common way portfolio pages leak conversions.
 */
export function CtaBand({
  heading = "Have a project in mind?",
  body = "Tell me what you're trying to measure, sell, or fix. I'll tell you what it would take — and whether I'm the right person for it.",
  primaryLabel = "Start a project",
  primaryTo = "/contact/",
}: {
  heading?: string;
  body?: string;
  primaryLabel?: string;
  primaryTo?: string;
}) {
  return (
    <section className="relative py-20 md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[50vmin] w-[80vmin] -translate-x-1/2 -translate-y-1/2"
        style={{ background: "radial-gradient(ellipse, rgba(91,108,255,0.12), transparent 65%)" }}
      />
      <div className="relative mx-auto max-w-4xl px-5 text-center md:px-8">
        <Reveal>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-balance md:text-5xl">
            {heading}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-dim md:text-lg">
            {body}
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3 md:gap-4">
            <Magnetic>
              <Link
                to={primaryTo}
                className="focus-ring inline-flex items-center gap-3 rounded-full bg-pulse px-7 py-3.5 text-sm font-medium text-void transition-colors hover:bg-ink md:text-base"
              >
                {primaryLabel}
                <span aria-hidden>→</span>
              </Link>
            </Magnetic>
            <a
              href={`mailto:${identity.email}`}
              className="focus-ring glass inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-sm font-medium text-ink transition-colors hover:border-pulse/40 md:text-base"
            >
              Email directly
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
