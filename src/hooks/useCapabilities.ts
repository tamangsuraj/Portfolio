import { useEffect, useState } from "react";

export interface Capabilities {
  reducedMotion: boolean;
  finePointer: boolean;
  /** true when the device can comfortably run the WebGL scene */
  webgl: boolean;
}

/**
 * What the server renders, and therefore what the client MUST render on its
 * first pass too. Detecting real capabilities in the useState initialiser would
 * make the client's first render disagree with the pre-rendered HTML and break
 * hydration. Everything capability-gated stays off for one frame, then enables
 * in the effect below.
 */
const SSR_DEFAULTS: Capabilities = {
  reducedMotion: false,
  finePointer: false,
  webgl: false,
};

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
  const [caps, setCaps] = useState<Capabilities>(SSR_DEFAULTS);

  useEffect(() => {
    setCaps(detect());

    const queries = [
      window.matchMedia("(prefers-reduced-motion: reduce)"),
      window.matchMedia("(pointer: fine)"),
      window.matchMedia("(max-width: 767px)"),
    ];
    const onChange = () => setCaps(detect());
    queries.forEach((q) => q.addEventListener("change", onChange));
    return () => queries.forEach((q) => q.removeEventListener("change", onChange));
  }, []);

  return caps;
}
