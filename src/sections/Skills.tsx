import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { orbitTools, skills } from "../data/content";

const RINGS = [
  // radius as a fraction of the orbit container's width
  { tools: orbitTools.slice(0, 3), radius: 0.3, speed: 0.16 },
  { tools: orbitTools.slice(3), radius: 0.46, speed: -0.1 },
];

function Orbit({ frozen }: { frozen: boolean }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const chips = Array.from(el.querySelectorAll<HTMLElement>("[data-orbit]"));

    const place = (t: number) => {
      const size = el.clientWidth;
      chips.forEach((chip) => {
        const ring = RINGS[Number(chip.dataset.ring)];
        const offset = Number(chip.dataset.offset);
        const angle = offset + t * ring.speed;
        const x = Math.cos(angle) * ring.radius * size;
        const y = Math.sin(angle) * ring.radius * size;
        chip.style.transform = `translate(-50%, -50%) translate3d(${x}px, ${y}px, 0)`;
      });
    };

    if (frozen) {
      place(0);
      return;
    }

    let raf = 0;
    let running = true;
    const start = performance.now();
    const tick = (now: number) => {
      if (running) place((now - start) / 1000);
      raf = requestAnimationFrame(tick);
    };
    // pause the loop while the orbit is off screen
    const obs = new IntersectionObserver(([e]) => {
      running = e.isIntersecting;
    });
    obs.observe(el);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      obs.disconnect();
    };
  }, [frozen]);

  return (
    <div
      ref={root}
      className="relative mx-auto aspect-square w-full max-w-[320px] sm:max-w-[420px]"
      aria-hidden
    >
      {/* rings */}
      <div className="absolute inset-[18%] rounded-full border border-line" />
      <div className="absolute inset-[2%] rounded-full border border-line" />
      {/* core */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex h-20 w-20 flex-col items-center justify-center rounded-full glass-bright text-center shadow-[0_0_60px_rgba(91,108,255,0.25)] sm:h-24 sm:w-24">
          <span className="font-mono text-[10px] uppercase tracking-wider text-faint">core</span>
          <span className="font-display text-sm font-medium text-ink">DevOps</span>
        </div>
      </div>
      {RINGS.map((ring, r) =>
        ring.tools.map((tool, i) => (
          <span
            key={tool}
            data-orbit
            data-ring={r}
            data-offset={(i / ring.tools.length) * Math.PI * 2}
            className="absolute left-1/2 top-1/2 whitespace-nowrap rounded-full glass px-2.5 py-1 font-mono text-[10px] text-ink shadow-[0_0_24px_rgba(139,157,255,0.12)] sm:px-3.5 sm:py-1.5 sm:text-[11px]"
            style={{ willChange: "transform" }}
          >
            {tool}
          </span>
        )),
      )}
    </div>
  );
}

export function Skills() {
  const reduced = useReducedMotion();

  return (
    <section id="skills" className="relative overflow-hidden py-20 md:py-40">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          index="04"
          channel="stack telemetry"
          title="The tools in constant orbit."
          lede="Proficiency measured the way I measure everything else — honestly, with numbers."
        />

        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Orbit frozen={!!reduced} />
          </Reveal>

          <div className="space-y-5">
            {skills.map((skill, i) => (
              <Reveal key={skill.name} delay={i * 0.05}>
                <div>
                  <div className="mb-2 flex items-baseline justify-between gap-4">
                    <span className="font-medium text-ink">{skill.name}</span>
                    <span className="font-mono text-xs text-faint">
                      {skill.category.toLowerCase()} · <span className="text-pulse">{skill.level}%</span>
                    </span>
                  </div>
                  <div className="h-1 overflow-hidden rounded-full bg-panel">
                    <motion.div
                      initial={reduced ? { width: `${skill.level}%` } : { width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 1.1, delay: 0.15 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                      className="h-full rounded-full"
                      style={{
                        background: "linear-gradient(90deg, #5B6CFF, #8B9DFF)",
                        boxShadow: "0 0 12px rgba(139,157,255,0.5)",
                      }}
                    />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
