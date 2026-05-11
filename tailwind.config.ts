import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        coffee: {
          dark:   "#0a0604",
          darker: "#130b06",
          deep:   "#1c1008",
          accent: "#f59e0b",
          orange: "#ea580c",
          light:  "#fdf8f0",
          muted:  "rgba(253,248,240,0.55)",
          cream:  "#fdfbf7",
          brown:  "#78350f",
        },
      },
      fontFamily: {
        display: ["'Cormorant Garamond'", "serif"],
        ui:      ["'Syne'", "sans-serif"],
        mono:    ["'DM Mono'", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":  "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        "blob":        "blob 18s ease-in-out infinite",
        "blob2":       "blob2 22s ease-in-out infinite",
        "float":       "float 6s ease-in-out infinite",
        "pulse-slow":  "pulseGlow 6s ease-in-out infinite",
        "marquee":     "marqueeScroll 25s linear infinite",
        "rotate-slow": "rotateSlow 30s linear infinite",
        "scroll-line": "scrollPulse 2s ease-in-out infinite",
        "streak":      "streakMove linear infinite",
        "fade-up":     "fadeUp 1s ease forwards",
        "fade-in":     "fadeIn 1s ease forwards",
      },
      keyframes: {
        blob: {
          "0%,100%": { transform: "translate(0,0) scale(1)" },
          "33%":     { transform: "translate(60px,-80px) scale(1.15)" },
          "66%":     { transform: "translate(-40px,40px) scale(0.9)" },
        },
        blob2: {
          "0%,100%": { transform: "translate(0,0) scale(1)" },
          "33%":     { transform: "translate(-50px,70px) scale(1.1)" },
          "66%":     { transform: "translate(30px,-30px) scale(0.95)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%":     { transform: "translateY(-10px)" },
        },
        pulseGlow: {
          "0%,100%": { opacity: "0.6", transform: "translate(-50%,-50%) scale(1)" },
          "50%":     { opacity: "1",   transform: "translate(-50%,-50%) scale(1.2)" },
        },
        scrollPulse: {
          "0%,100%": { transform: "scaleY(1)", opacity: "0.5" },
          "50%":     { transform: "scaleY(0.6) translateY(10px)", opacity: "1" },
        },
        streakMove: {
          "0%":   { transform: "translateX(-110%)", opacity: "0" },
          "10%":  { opacity: "1" },
          "90%":  { opacity: "1" },
          "100%": { transform: "translateX(210%)", opacity: "0" },
        },
        marqueeScroll: {
          from: { transform: "translateX(0)" },
          to:   { transform: "translateX(-50%)" },
        },
        rotateSlow: {
          from: { transform: "rotate(0deg)" },
          to:   { transform: "rotate(360deg)" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(40px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to:   { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;