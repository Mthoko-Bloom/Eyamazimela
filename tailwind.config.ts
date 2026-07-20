import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        forest: {
          50: "#EEF4F0",
          100: "#D6E6DD",
          200: "#AECEBD",
          300: "#7FB199",
          400: "#4E8E71",
          500: "#2C7256",
          600: "#155C44",
          700: "#0E4B37",
          800: "#0A3A2B",
          900: "#082B20",
          950: "#041C15",
        },
        gold: {
          200: "#F0E2BC",
          300: "#E7D199",
          400: "#D9BB6E",
          500: "#C9A24B",
          600: "#AB8636",
          700: "#856628",
        },
        cream: "#F7F5EF",
        sand: "#EFEADD",
        ink: "#14211C",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-manrope)", "system-ui", "-apple-system", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.28em",
      },
      boxShadow: {
        luxe: "0 24px 60px -20px rgba(8, 43, 32, 0.35)",
        card: "0 18px 40px -24px rgba(8, 43, 32, 0.45)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
