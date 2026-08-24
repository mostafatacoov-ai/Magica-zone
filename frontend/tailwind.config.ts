// tailwind.config.ts
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
        magica: {
          dark: "#0B0F19",
          surface: "#111827",
          card: "rgba(17, 24, 39, 0.8)",
          border: "rgba(255, 255, 255, 0.08)",

          // Sector Color Tokens
          courses: {
            DEFAULT: "#2563EB", // Royal Blue
            light: "#60A5FA",
            dark: "#1D4ED8",
            accent: "#7C3AED",  // Violet
            glow: "rgba(37, 99, 235, 0.25)",
          },
          camp: {
            DEFAULT: "#059669", // Emerald Forest
            light: "#34D399",
            dark: "#047857",
            accent: "#F59E0B",  // Sunburst Amber
            glow: "rgba(5, 150, 105, 0.25)",
          },
          supplies: {
            DEFAULT: "#E11D48", // Crimson Rose
            light: "#FB7185",
            dark: "#BE123C",
            accent: "#FDA4AF",
            glow: "rgba(225, 29, 72, 0.25)",
          },
          games: {
            DEFAULT: "#9333EA", // Electric Purple
            accent: "#10B981",  // Neon Mint
          },
          bazar: {
            DEFAULT: "#EA580C", // Sunset Orange
            accent: "#FACC15",  // Gold
          },
          food: {
            DEFAULT: "#16A34A", // Apple Green
            accent: "#EAB308",  // Sunshine Yellow
          },
          podcast: {
            DEFAULT: "#4F46E5", // Deep Indigo
            accent: "#EC4899",  // Magenta
          },
          uniform: {
            DEFAULT: "#1E3A8A", // Deep Navy
            accent: "#D97706",  // Ochre Gold
          },
          songs: {
            DEFAULT: "#D946EF", // Fuchsia
            accent: "#06B6D4",  // Cyan
          },
        },
      },
      backgroundImage: {
        "gradient-courses": "linear-gradient(135deg, #1E40AF 0%, #6D28D9 100%)",
        "gradient-camp": "linear-gradient(135deg, #065F46 0%, #D97706 100%)",
        "gradient-supplies": "linear-gradient(135deg, #9F1239 0%, #E11D48 100%)",
        "gradient-radial-glow": "radial-gradient(circle at center, var(--tw-gradient-stops))",
      },
      boxShadow: {
        "glow-courses": "0 0 25px rgba(37, 99, 235, 0.35)",
        "glow-camp": "0 0 25px rgba(5, 150, 105, 0.35)",
        "glow-supplies": "0 0 25px rgba(225, 29, 72, 0.35)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        cairo: ["Cairo", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;