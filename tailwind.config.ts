import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Real brand colors, pulled from the client's logo files.
        ink: "#2C3B23",
        "ink-soft": "#374A2C",
        paper: "#F8F6EF",
        "paper-dim": "#EEEADC",
        gold: "#A4752C",
        "gold-dark": "#835C21",
        coral: "#A4752C",
        "coral-dark": "#835C21",
        marigold: "#C89B4A",
        inkmute: "#5B6653",
        line: "rgba(44, 59, 35, 0.14)",
        "line-light": "rgba(248, 246, 239, 0.16)",
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-ibm-plex-mono)", "monospace"],
      },
      letterSpacing: {
        widest2: "0.28em",
      },
      fontWeight: {
        500: "500",
        600: "600",
        700: "700",
      },
    },
  },
  plugins: [],
};

export default config;
