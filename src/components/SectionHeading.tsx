import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  index: string;
  channel: string;
  title: string;
  lede?: string;
}

export function SectionHeading({ index, channel, title, lede }: SectionHeadingProps) {
  return (
    <Reveal className="mb-14 md:mb-20 max-w-2xl">
      <p className="telemetry mb-4 flex items-center gap-3">
        <span className="text-pulse">{index}</span>
        <span className="inline-block h-px w-8 bg-line-bright" aria-hidden />
        <span>{channel}</span>
      </p>
      <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-balance">
        {title}
      </h2>
      {lede && <p className="mt-5 text-dim text-base md:text-lg leading-relaxed">{lede}</p>}
    </Reveal>
  );
}
