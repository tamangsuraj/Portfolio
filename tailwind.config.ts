import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "#06080F",
        panel: "#0B0E1A",
        line: "rgba(148, 163, 216, 0.10)",
        "line-bright": "rgba(148, 163, 216, 0.22)",
        ink: "#E8EAF6",
        // 6.63:1 against `void` — passes WCAG AA for normal text.
        dim: "#8B93B8",
        // Was #565E82, which measured 3.21:1 against `void` and failed WCAG AA
        // (4.5:1) — and it is used at 10–11px for telemetry labels, the footer
        // and nav across every page. #7C86AC measures 5.59:1 and passes.
        faint: "#7C86AC",
        pulse: "#8B9DFF",
        "pulse-deep": "#5B6CFF",
        live: "#34D399",
        ember: "#FBBF24",
      },
      fontFamily: {
        display: ['"Clash Display"', "system-ui", "sans-serif"],
        body: ['"Satoshi"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      letterSpacing: {
        telemetry: "0.18em",
      },
    },
  },
  plugins: [],
} satisfies Config;
