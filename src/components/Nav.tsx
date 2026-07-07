import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { sections } from "../data/content";

const NAV_ITEMS = sections.filter((s) => s.id !== "hero");

function useActiveSection() {
  const [active, setActive] = useState<string>("hero");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return active;
}

export function Nav() {
  const active = useActiveSection();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "glass-bright" : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-5 md:px-8">
          <button
            onClick={() => go("hero")}
            className="font-mono text-sm text-ink hover:text-pulse transition-colors"
            aria-label="Back to top"
          >
            <span className="text-pulse">suraj</span>
            <span className="text-faint">@</span>
            <span className="text-dim">ktm</span>
            <span className="text-faint">:~$</span>
          </button>

          <nav className="hidden md:flex items-center gap-1" aria-label="Sections">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className={`relative rounded-md px-3 py-1.5 font-mono text-xs tracking-wide transition-colors ${
                  active === item.id ? "text-ink" : "text-dim hover:text-ink"
                }`}
              >
                {active === item.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-md bg-pulse/10 border border-pulse/25"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              className="md:hidden flex h-9 w-9 flex-col items-center justify-center gap-[5px]"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              <span
                className={`h-px w-5 bg-ink transition-transform duration-300 ${open ? "translate-y-[3px] rotate-45" : ""}`}
              />
              <span
                className={`h-px w-5 bg-ink transition-transform duration-300 ${open ? "-translate-y-[3px] -rotate-45" : ""}`}
              />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 glass-bright md:hidden"
          >
            <nav
              className="flex h-full flex-col justify-center gap-2 px-8 pt-14"
              aria-label="Mobile sections"
            >
              {NAV_ITEMS.map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => go(item.id)}
                  className="flex items-baseline gap-4 py-3 text-left"
                >
                  <span className="font-mono text-xs text-faint">
                    0{i + 1}
                  </span>
                  <span className="font-display text-3xl font-medium text-ink">
                    {item.label}
                  </span>
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
