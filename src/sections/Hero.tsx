import { motion, useReducedMotion } from "framer-motion";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Magnetic } from "../components/Magnetic";
import { useCapabilities } from "../hooks/useCapabilities";
import { identity, socials, orbitTools } from "../data/content";

const ClusterScene = lazy(() => import("../three/ClusterScene"));

const BOOT_LINES = [
  "$ init suraj-tamang --control-plane",
  "  cluster ............. online",
  "  region .............. ktm / npl · utc+5:45",
  "  pipelines ........... green",
  "ok — rendering interface",
];

function useTypedRoles(roles: string[], enabled: boolean) {
  const [text, setText] = useState(enabled ? "" : roles[0]);
  useEffect(() => {
    if (!enabled) return;
    let role = 0;
    let char = 0;
    let deleting = false;
    let timer: number;

    const tick = () => {
      const current = roles[role];
      if (!deleting) {
        char++;
        setText(current.slice(0, char));
        if (char === current.length) {
          deleting = true;
          timer = window.setTimeout(tick, 2200);
          return;
        }
        timer = window.setTimeout(tick, 55);
      } else {
        char--;
        setText(current.slice(0, char));
        if (char === 0) {
          deleting = false;
          role = (role + 1) % roles.length;
        }
        timer = window.setTimeout(tick, 28);
      }
    };
    timer = window.setTimeout(tick, 1400);
    return () => clearTimeout(timer);
  }, [roles, enabled]);
  return text;
}

/** Only mount the WebGL canvas while the hero is on screen, on wide viewports. */
function SceneMount() {
  const holder = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [wide, setWide] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches,
  );
  const { webgl } = useCapabilities();

  useEffect(() => {
    const el = holder.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), {
      rootMargin: "120px",
    });
    obs.observe(el);
    const mq = window.matchMedia("(min-width: 768px)");
    const onMq = () => setWide(mq.matches);
    mq.addEventListener("change", onMq);
    return () => {
      obs.disconnect();
      mq.removeEventListener("change", onMq);
    };
  }, []);

  const showCanvas = webgl && wide;

  return (
    <div ref={holder} aria-hidden className="absolute inset-0">
      {showCanvas && visible && (
        <Suspense fallback={null}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.6, delay: 0.8 }}
            className="h-full w-full"
          >
            <ClusterScene />
          </motion.div>
        </Suspense>
      )}
      {!showCanvas && (
        <div
          className="absolute right-[-10%] top-1/2 h-[70vmin] w-[70vmin] -translate-y-1/2 rounded-full opacity-60"
          style={{
            background:
              "radial-gradient(circle, rgba(91,108,255,0.16) 0%, rgba(91,108,255,0.05) 45%, transparent 70%)",
          }}
        />
      )}
    </div>
  );
}

export function Hero() {
  const reduced = useReducedMotion();
  const role = useTypedRoles(identity.roles, !reduced);

  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section id="hero" className="relative flex min-h-svh flex-col overflow-hidden">
      {/* ambient field */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 55% at 70% 40%, rgba(91,108,255,0.10), transparent 60%), radial-gradient(ellipse 55% 45% at 15% 85%, rgba(139,157,255,0.05), transparent 60%)",
        }}
      />
      <SceneMount />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 pt-24 md:px-8">
        {/* boot log */}
        <div className="mb-10 font-mono text-[11px] leading-6 text-faint sm:text-xs" aria-hidden>
          {BOOT_LINES.map((line, i) => (
            <motion.p
              key={line}
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 + i * 0.14, duration: 0.05 }}
              className={i === BOOT_LINES.length - 1 ? "text-live/80" : undefined}
            >
              {line}
            </motion.p>
          ))}
        </div>

        <motion.h1
          initial={reduced ? false : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.85, ease }}
          className="font-display text-[13vw] font-semibold leading-[0.95] tracking-tight sm:text-7xl md:text-8xl lg:text-[7.5rem]"
        >
          Suraj
          <br />
          Tamang<span className="text-pulse">.</span>
        </motion.h1>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.05, ease }}
          className="mt-6 h-7 font-mono text-sm text-pulse sm:text-base"
        >
          <span className="text-faint">·/</span> <span className={reduced ? "" : "caret"}>{role}</span>
        </motion.p>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease }}
          className="mt-4 max-w-xl text-base leading-relaxed text-dim md:text-lg"
        >
          {identity.tagline}
        </motion.p>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.35, ease }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Magnetic>
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group inline-flex items-center gap-3 rounded-full bg-pulse px-7 py-3.5 font-medium text-void transition-colors hover:bg-ink"
            >
              View workloads
              <span aria-hidden className="transition-transform group-hover:translate-y-0.5">↓</span>
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href={identity.resume}
              download="Suraj_Tamang_Resume.pdf"
              className="inline-flex items-center gap-3 rounded-full glass px-7 py-3.5 font-medium text-ink transition-colors hover:border-pulse/40"
            >
              Download CV
            </a>
          </Magnetic>
        </motion.div>

        <motion.div
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.55 }}
          className="mt-12 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-faint"
        >
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-pulse"
            >
              {s.label.toLowerCase()}
              <span className="text-line-bright"> ↗</span>
            </a>
          ))}
        </motion.div>
      </div>

      {/* tool marquee */}
      <motion.div
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
        className="relative z-10 border-t border-line py-5 overflow-hidden"
        aria-hidden
      >
        <div className="marquee-track flex w-max gap-12 whitespace-nowrap font-mono text-xs text-faint">
          {[...orbitTools, ...orbitTools, ...orbitTools, ...orbitTools].map((tool, i) => (
            <span key={i} className="flex items-center gap-12">
              {tool}
              <span className="text-pulse/40">◆</span>
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
