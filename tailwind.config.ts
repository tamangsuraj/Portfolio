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
        dim: "#8B93B8",
        faint: "#565E82",
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
