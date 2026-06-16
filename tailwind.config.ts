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
        },
        border: "#e5e0d8",
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
    },
  },
  plugins: [],
};

export default config;
