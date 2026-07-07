import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { useRef, type ReactNode, type PointerEvent } from "react";
import { useCapabilities } from "../hooks/useCapabilities";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
}

/** Perspective-tilt glass card with a pointer-tracked sheen. */
export function TiltCard({ children, className, maxTilt = 7 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { finePointer, reducedMotion } = useCapabilities();
  const active = finePointer && !reducedMotion;

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const srx = useSpring(rx, { stiffness: 180, damping: 20 });
  const sry = useSpring(ry, { stiffness: 180, damping: 20 });

  const sheen = useMotionTemplate`radial-gradient(420px circle at ${gx}% ${gy}%, rgba(139,157,255,0.10), transparent 65%)`;

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!active || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    ry.set((px - 0.5) * maxTilt * 2);
    rx.set((0.5 - py) * maxTilt * 2);
    gx.set(px * 100);
    gy.set(py * 100);
  };

  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={
        active
          ? { rotateX: srx, rotateY: sry, transformStyle: "preserve-3d", perspective: 900 }
          : undefined
      }
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {active && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: sheen }}
        />
      )}
      {children}
    </motion.div>
  );
}
