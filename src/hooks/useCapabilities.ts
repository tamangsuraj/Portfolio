import { useEffect, useState } from "react";

export interface Capabilities {
  reducedMotion: boolean;
  finePointer: boolean;
  /** true when the device can comfortably run the WebGL scene */
  webgl: boolean;
}

function detect(): Capabilities {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;
  const smallScreen = window.matchMedia("(max-width: 767px)").matches;
  const lowEnd =
    (navigator.hardwareConcurrency ?? 8) <= 4 ||
    ((navigator as { deviceMemory?: number }).deviceMemory ?? 8) <= 4;
  let gl = false;
  try {
    const canvas = document.createElement("canvas");
    gl = !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    gl = false;
  }
  return {
    reducedMotion,
    finePointer,
    webgl: gl && !reducedMotion && !(smallScreen && lowEnd),
  };
}

export function useCapabilities(): Capabilities {
  const [caps, setCaps] = useState<Capabilities>(() =>
    typeof window === "undefined"
      ? { reducedMotion: false, finePointer: false, webgl: false }
      : detect(),
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setCaps(detect());
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return caps;
}
