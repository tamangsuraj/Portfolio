import { useEffect, useRef } from "react";
import { useCapabilities } from "../hooks/useCapabilities";

/**
 * Custom cursor: a solid dot that sticks to the pointer and a soft ring that
 * trails it with inertia. The ring blooms over interactive elements and
 * contracts on press. Desktop fine-pointer only; native cursor elsewhere.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const { finePointer, reducedMotion } = useCapabilities();
  const active = finePointer && !reducedMotion;

  useEffect(() => {
    if (!active) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.documentElement.classList.add("native-cursor-off");

    let tx = -100;
    let ty = -100;
    let rx = -100;
    let ry = -100;
    let scale = 1;
    let targetScale = 1;
    let pressed = false;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      const interactive = (e.target as Element | null)?.closest?.(
        "a, button, [role='button'], input, textarea, [data-cursor='grow']",
      );
      targetScale = interactive ? 2.1 : 1;
    };
    const onDown = () => {
      pressed = true;
    };
    const onUp = () => {
      pressed = false;
    };
    const onLeave = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };
    const onEnter = () => {
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    };

    const tick = () => {
      rx += (tx - rx) * 0.16;
      ry += (ty - ry) * 0.16;
      const goal = pressed ? targetScale * 0.75 : targetScale;
      scale += (goal - scale) * 0.18;
      dot.style.transform = `translate3d(${tx - 3}px, ${ty - 3}px, 0)`;
      ring.style.transform = `translate3d(${rx - 18}px, ${ry - 18}px, 0) scale(${scale})`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);
    raf = requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove("native-cursor-off");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(raf);
    };
  }, [active]);

  if (!active) return null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 rounded-full bg-pulse"
        style={{ willChange: "transform", boxShadow: "0 0 10px rgba(139,157,255,0.9)" }}
      />
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] h-9 w-9 rounded-full border border-pulse/50"
        style={{
          willChange: "transform",
          background: "rgba(139,157,255,0.05)",
          transition: "opacity 0.3s ease",
        }}
      />
    </>
  );
}
