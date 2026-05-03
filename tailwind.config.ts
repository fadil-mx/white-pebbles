import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#f4ead5",
          deep: "#e8d9b8",
          light: "#faf6ef",
        },
        caramel: {
          DEFAULT: "#c8893d",
          deep: "#a86a26",
          light: "#d4a256",
        },
        cocoa: {
          DEFAULT: "#3d2817",
          deep: "#1f1408",
          light: "#6b4423",
        },
        espresso: "#0d0805",
        gold: "#d4a256",
        rose: "#d97757",
        ink: "#1a1612",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-up": "fadeUp 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards",
        "marquee": "marquee 30s linear infinite",
        "scroll-cue": "scrollCue 2s infinite",
        "pulse-ring": "pulseRing 2s infinite",
        "float-slow": "floatSlow 20s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(40px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        scrollCue: {
          "0%": { transform: "scaleY(0)", transformOrigin: "top" },
          "50%": { transform: "scaleY(1)", transformOrigin: "top" },
          "51%": { transform: "scaleY(1)", transformOrigin: "bottom" },
          "100%": { transform: "scaleY(0)", transformOrigin: "bottom" },
        },
        pulseRing: {
          "0%": { transform: "scale(1)", opacity: "1" },
          "100%": { transform: "scale(1.5)", opacity: "0" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(40px, -40px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
