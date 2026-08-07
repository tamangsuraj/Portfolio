import type { ReactNode } from "react";
import { Breadcrumbs } from "./Breadcrumbs";
import { Reveal } from "./Reveal";

/**
 * Standard interior-page header: breadcrumb trail, the page's single <h1>,
 * and an optional lede.
 *
 * Every interior route uses this so heading order stays H1 -> H2 -> H3 across
 * the site. Section headings below use <SectionHeading>, which emits H2s.
 */
export function PageHeader({
  path,
  eyebrow,
  h1,
  lede,
  children,
}: {
  path: string;
  eyebrow?: string;
  h1: string;
  lede?: string;
  children?: ReactNode;
}) {
  return (
    <header className="relative border-b border-line pb-12 pt-28 md:pb-20 md:pt-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 60% 0%, rgba(91,108,255,0.10), transparent 65%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <Breadcrumbs path={path} />
        <Reveal>
          {eyebrow && <p className="telemetry mb-4 text-pulse">{eyebrow}</p>}
          <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-balance md:text-6xl lg:text-7xl">
            {h1}
          </h1>
          {lede && (
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-dim md:text-xl">{lede}</p>
          )}
          {children}
        </Reveal>
      </div>
    </header>
  );
}
