import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { getRoute } from "../seo/routes";

/**
 * Primary navigation.
 *
 * Previously this navigated with <button onClick={scrollIntoView}>. Buttons are
 * invisible to crawlers and pass no link equity, so the entire site was a single
 * URL with no discoverable structure. Every item is now a real <a href>
 * rendered into the static HTML.
 */

interface NavItem {
  label: string;
  to: string;
  children?: { label: string; to: string; blurb: string }[];
}

const ALL_NAV_ITEMS: NavItem[] = [
  { label: "About", to: "/about/" },
  {
    label: "Services",
    to: "/services/",
    children: [
      {
        label: "Data & MIS",
        to: "/services/data/",
        blurb: "Power BI, dashboards, MIS reporting, Excel and Sheets automation",
      },
      {
        label: "Web Development",
        to: "/services/web/",
        blurb: "Restaurant, cafe, hotel and small business websites",
      },
    ],
  },
  { label: "Work", to: "/work/" },
  { label: "Blog", to: "/blog/" },
  { label: "Contact", to: "/contact/" },
];

/**
 * Never link to an unpublished route. Nav links that 404 are a crawl-budget
 * leak and a bad first impression, so the publish flag in the route table is
 * the single switch that controls both the sitemap and the navigation.
 */
const isLive = (to: string) => getRoute(to)?.published ?? false;

const NAV_ITEMS: NavItem[] = ALL_NAV_ITEMS.filter((item) => isLive(item.to)).map((item) => ({
  ...item,
  children: item.children?.filter((child) => isLive(child.to)),
}));

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const location = useLocation();
  const closeTimer = useRef<number>();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile sheet whenever the route changes.
  useEffect(() => {
    setOpen(false);
    setMenuOpen(null);
  }, [location.pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  // Escape closes whichever surface is open.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      setMenuOpen(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openMenu = (label: string) => {
    window.clearTimeout(closeTimer.current);
    setMenuOpen(label);
  };
  const scheduleClose = () => {
    closeTimer.current = window.setTimeout(() => setMenuOpen(null), 120);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "glass-bright" : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-5 md:px-8">
          <Link
            to="/"
            className="rounded-md font-mono text-sm text-ink transition-colors hover:text-pulse focus-ring"
            aria-label="Suraj Tamang — home"
          >
            <span className="text-pulse">suraj</span>
            <span className="text-faint">@</span>
            <span className="text-dim">ktm</span>
            <span className="text-faint">:~$</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.to}
                className="relative"
                onMouseEnter={() => item.children && openMenu(item.label)}
                onMouseLeave={() => item.children && scheduleClose()}
              >
                <NavLink
                  to={item.to}
                  onFocus={() => item.children && openMenu(item.label)}
                  aria-haspopup={item.children ? "true" : undefined}
                  aria-expanded={item.children ? menuOpen === item.label : undefined}
                  className={({ isActive }) =>
                    `focus-ring relative block rounded-md px-3 py-1.5 font-mono text-xs tracking-wide transition-colors ${
                      isActive ? "text-ink" : "text-dim hover:text-ink"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 rounded-md border border-pulse/25 bg-pulse/10"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      )}
                      <span className="relative">{item.label.toLowerCase()}</span>
                    </>
                  )}
                </NavLink>

                {item.children && (
                  <AnimatePresence>
                    {menuOpen === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.16 }}
                        className="absolute left-0 top-full w-72 pt-2"
                        onMouseEnter={() => openMenu(item.label)}
                        onMouseLeave={scheduleClose}
                      >
                        <div className="glass-bright overflow-hidden rounded-xl p-1.5">
                          {item.children.map((child) => (
                            <Link
                              key={child.to}
                              to={child.to}
                              className="focus-ring block rounded-lg px-3 py-2.5 transition-colors hover:bg-pulse/10"
                            >
                              <span className="block text-sm font-medium text-ink">
                                {child.label}
                              </span>
                              <span className="mt-0.5 block text-xs leading-snug text-dim">
                                {child.blurb}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          <button
            type="button"
            className="focus-ring flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-md md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            <span
              className={`h-px w-5 bg-ink transition-transform duration-300 ${open ? "translate-y-[3px] rotate-45" : ""}`}
            />
            <span
              className={`h-px w-5 bg-ink transition-transform duration-300 ${open ? "-translate-y-[3px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="glass-bright fixed inset-0 z-40 md:hidden"
          >
            <nav
              className="flex h-full flex-col justify-center gap-1 overflow-y-auto px-8 py-20"
              aria-label="Mobile"
            >
              {NAV_ITEMS.map((item, i) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    to={item.to}
                    className="focus-ring flex items-baseline gap-4 rounded-md py-2.5 text-left"
                  >
                    <span className="font-mono text-xs text-faint">0{i + 1}</span>
                    <span className="font-display text-3xl font-medium text-ink">
                      {item.label}
                    </span>
                  </Link>
                  {item.children && (
                    <div className="ml-10 flex flex-col gap-1 pb-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.to}
                          to={child.to}
                          className="focus-ring rounded-md py-1.5 font-mono text-sm text-dim"
                        >
                          → {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
