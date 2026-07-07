import Lenis from "lenis";
import { useEffect } from "react";
import { Cursor } from "./components/Cursor";
import { CursorGlow } from "./components/CursorGlow";
import { DotField } from "./components/DotField";
import { Footer } from "./components/Footer";
import { Nav } from "./components/Nav";
import { useCapabilities } from "./hooks/useCapabilities";
import { About } from "./sections/About";
import { Contact } from "./sections/Contact";
import { Experience } from "./sections/Experience";
import { Hero } from "./sections/Hero";
import { Projects } from "./sections/Projects";
import { Signals } from "./sections/Signals";
import { Skills } from "./sections/Skills";
import { Writing } from "./sections/Writing";

export default function App() {
  const { reducedMotion, finePointer } = useCapabilities();

  useEffect(() => {
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

  return (
    <div className="grain relative">
      <DotField />
      <CursorGlow />
      <div className="relative z-10">
        <Nav />
        <main>
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Writing />
          <Signals />
          <Contact />
        </main>
        <Footer />
      </div>
      <Cursor />
    </div>
  );
}
