import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  /** Anchor target for the section's aria-labelledby. */
  id?: string;
  index: string;
  channel: string;
  title: string;
  lede?: string;
}

/**
 * Section-level heading. Always renders an <h2>.
 *
 * Every page has exactly one <h1> (from <PageHeader> or the hero), and section
 * headings sit one level below it. Keeping that invariant in a single component
 * is what stops heading order drifting as pages get added.
 */
export function SectionHeading({ id, index, channel, title, lede }: SectionHeadingProps) {
  return (
    <Reveal className="mb-10 max-w-2xl md:mb-20">
      <p className="telemetry mb-4 flex items-center gap-3">
        <span className="text-pulse">{index}</span>
        <span className="inline-block h-px w-8 bg-line-bright" aria-hidden />
        <span>{channel}</span>
      </p>
      <h2
        id={id}
        className="text-balance font-display text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl"
      >
        {title}
      </h2>
      {lede && <p className="mt-5 text-base leading-relaxed text-dim md:text-lg">{lede}</p>}
    </Reveal>
  );
}
