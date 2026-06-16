import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#1a1a1a",
          soft: "#2d2d2d",
          muted: "#6b6b6b",
        },
        cream: {
          DEFAULT: "#f6f3ee",
          light: "#faf8f4",
          warm: "#ece6dc",
        },
        sand: "#d9cfc2",
        gold: {
          DEFAULT: "#b8945f",
          dark: "#8f7146",
          leaf: "#C5A059", // brighter, richer gold
        },
        border: "#e5e0d8",
        // New Signature Heritage Colors
        "radha-emerald": "#053624", // Kundan/Polki deep green
        "radha-crimson": "#66001a", // Deep ruby red
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', "Georgia", "serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
      },
      fontSize: {
        display: ["clamp(2.5rem, 6vw, 5rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
      },
      maxWidth: {
        "8xl": "88rem",
      },
      transitionTimingFunction: {
        "out-smooth": "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "slow-zoom": {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.08)" },
        },
        "slide-up": {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        gradient: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      animation: {
        "slow-zoom": "slow-zoom 20s ease-in-out infinite alternate",
        "slide-up": "slide-up 1s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "fade-in": "fade-in 1.5s ease forwards",
        gradient: "gradient 8s ease infinite",
      },
    },
  },
  plugins: [],
};

export default config;
