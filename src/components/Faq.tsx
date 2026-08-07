import { useId, useState } from "react";
import type { FaqItem } from "../seo/schema";
import { Reveal } from "./Reveal";

/**
 * Accessible FAQ accordion.
 *
 * Answers stay in the DOM (hidden with the `hidden` attribute rather than being
 * unmounted) so crawlers and assistive tech can read every answer without
 * running click handlers. This is also what keeps the visible text consistent
 * with the FAQPage JSON-LD — Google requires the marked-up answer to be present
 * on the page.
 */
export function Faq({ items, heading = "Frequently asked questions" }: { items: FaqItem[]; heading?: string }) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <section className="relative py-20 md:py-32" aria-labelledby={`${baseId}-heading`}>
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <Reveal>
          <h2
            id={`${baseId}-heading`}
            className="font-display text-3xl font-semibold tracking-tight md:text-5xl"
          >
            {heading}
          </h2>
        </Reveal>

        <dl className="mt-10 divide-y divide-line border-y border-line">
          {items.map((item, i) => {
            const expanded = open === i;
            const panelId = `${baseId}-panel-${i}`;
            const buttonId = `${baseId}-button-${i}`;
            return (
              <div key={item.question} className="py-1">
                <dt>
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={expanded}
                    aria-controls={panelId}
                    onClick={() => setOpen(expanded ? null : i)}
                    className="focus-ring flex w-full items-start justify-between gap-6 rounded-md py-5 text-left"
                  >
                    <span className="text-base font-medium text-ink md:text-lg">
                      {item.question}
                    </span>
                    <span
                      aria-hidden
                      className={`mt-1 shrink-0 text-pulse transition-transform duration-300 ${
                        expanded ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                </dt>
                <dd id={panelId} aria-labelledby={buttonId} hidden={!expanded} className="pb-6 pr-10">
                  <p className="text-sm leading-relaxed text-dim md:text-base">{item.answer}</p>
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
