import { useEffect, useRef } from "react";
import { useCapabilities } from "../hooks/useCapabilities";

const SPACING = 56;
const RADIUS = 260;
const PUSH = 20;

/**
 * Fixed full-viewport dot grid that reacts to the pointer: dots near the
 * cursor glow, swell, and get pushed away, then spring back with a gentle
 * shimmer. Desktop fine-pointer only.
 */
export function DotField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { finePointer, reducedMotion } = useCapabilities();
  const active = finePointer && !reducedMotion;

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let cols = 0;
    let rows = 0;
    // per-dot smoothed state: ox, oy (offset), glow
    let state: Float32Array = new Float32Array(0);

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      cols = Math.ceil(width / SPACING) + 1;
      rows = Math.ceil(height / SPACING) + 1;
      state = new Float32Array(cols * rows * 3);
    };

    let mx = -9999;
    let my = -9999;
    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    const onLeave = () => {
      mx = -9999;
      my = -9999;
    };

    let raf = 0;
    let running = true;
    let t = 0;

    const draw = () => {
      raf = requestAnimationFrame(draw);
      if (!running) return;
      t += 0.016;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const i = (r * cols + c) * 3;
          const baseX = c * SPACING;
          const baseY = r * SPACING;

          const dx = baseX - mx;
          const dy = baseY - my;
          const dist = Math.hypot(dx, dy);

          let targetOx = 0;
          let targetOy = 0;
          let targetGlow = 0;
          if (dist < RADIUS) {
            const force = (1 - dist / RADIUS) ** 2;
            const inv = dist > 0.001 ? 1 / dist : 0;
            targetOx = dx * inv * force * PUSH;
            targetOy = dy * inv * force * PUSH;
            targetGlow = force;
          }

          // spring toward target
          state[i] += (targetOx - state[i]) * 0.14;
          state[i + 1] += (targetOy - state[i + 1]) * 0.14;
          state[i + 2] += (targetGlow - state[i + 2]) * 0.12;

          const glow = state[i + 2];
          // idle shimmer keeps the field alive even far from the cursor
          const shimmer = 0.5 + 0.5 * Math.sin(t * 0.8 + baseX * 0.011 + baseY * 0.017);
          const alpha = 0.05 + shimmer * 0.05 + glow * 0.8;
          const size = 1 + glow * 2.2;

          ctx.beginPath();
          ctx.arc(baseX + state[i], baseY + state[i + 1], size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(139, 157, 255, ${alpha})`;
          ctx.fill();
        }
      }
    };

    const onVisibility = () => {
      running = document.visibilityState === "visible";
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [active]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
      style={{ willChange: "transform" }}
    />
  );
}
