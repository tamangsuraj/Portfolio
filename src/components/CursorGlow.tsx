import { useEffect, useRef } from "react";
import { useCapabilities } from "../hooks/useCapabilities";

/** Ambient light that trails the pointer. Renders nothing on touch / reduced motion. */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const { finePointer, reducedMotion } = useCapabilities();

  useEffect(() => {
    if (!finePointer || reducedMotion) return;
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 3;
    let cx = tx;
    let cy = ty;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    const tick = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      el.style.transform = `translate3d(${cx - 300}px, ${cy - 300}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [finePointer, reducedMotion]);

  if (!finePointer || reducedMotion) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[1] h-[600px] w-[600px] rounded-full"
      style={{
        background:
          "radial-gradient(circle, rgba(139,157,255,0.07) 0%, rgba(139,157,255,0.025) 40%, transparent 70%)",
        willChange: "transform",
      }}
    />
  );
}
