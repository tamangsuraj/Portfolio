import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, type ReactNode, type PointerEvent } from "react";
import { useCapabilities } from "../hooks/useCapabilities";

interface MagneticProps {
  children: ReactNode;
  strength?: number;
  className?: string;
}

/** Wraps children in a pointer-following magnetic field (desktop only). */
export function Magnetic({ children, strength = 0.32, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { finePointer, reducedMotion } = useCapabilities();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 });

  const active = finePointer && !reducedMotion;

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!active || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * strength);
    y.set((e.clientY - rect.top - rect.height / 2) * strength);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={active ? { x: sx, y: sy } : undefined}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {children}
    </motion.div>
  );
}
