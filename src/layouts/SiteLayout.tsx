import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Lenis from "lenis";
import { Cursor } from "../components/Cursor";
import { CursorGlow } from "../components/CursorGlow";
import { DotField } from "../components/DotField";
import { Footer } from "../components/Footer";
import { Nav } from "../components/Nav";
import { useCapabilities } from "../hooks/useCapabilities";

/**
 * Moves keyboard focus to the main landmark on every navigation.
 *
 * In a client-routed site the browser does not reset focus the way it does on a
 * full page load, so screen-reader and keyboard users otherwise stay parked in
 * the old page's DOM position. This is a WCAG 2.4.3 (Focus Order) requirement,
 * not a nicety.
 */
function useRouteFocus(mainRef: React.RefObject<HTMLElement>) {
  const location = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    mainRef.current?.focus();
  }, [location.pathname, mainRef]);
}

function useSmoothScroll() {
  const { reducedMotion, finePointer } = useCapabilities();

  useEffect(() => {
    // Respect prefers-reduced-motion, and skip the cost entirely on touch
    // devices where native momentum scrolling is already better.
    if (reducedMotion || !finePointer) return;

    const lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 1 });
    let raf = 0;
    const tick = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, [reducedMotion, finePointer]);
}

export function SiteLayout() {
  const mainRef = useRef<HTMLElement>(null);
  useSmoothScroll();
  useRouteFocus(mainRef);

  return (
    <div className="grain relative">
      {/*
        Skip link — first tabbable element on the page. Visually hidden until
        focused. WCAG 2.4.1 (Bypass Blocks).
      */}
      <a href="#main" className="skip-link">
        Skip to main content
      </a>

      <DotField />
      <CursorGlow />

      <div className="relative z-10 flex min-h-svh flex-col">
        <Nav />
        <main id="main" ref={mainRef} tabIndex={-1} className="flex-1 outline-none">
          <Outlet />
        </main>
        <Footer />
      </div>

      <Cursor />
    </div>
  );
}
