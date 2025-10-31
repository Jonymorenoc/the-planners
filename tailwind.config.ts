import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
        xl: "2.5rem",
      },
    },
    extend: {
      colors: {
        background: "hsl(326 53% 97%)",
        foreground: "hsl(330 22% 15%)",
        primary: {
          DEFAULT: "hsl(329 84% 54%)",
          foreground: "hsl(0 0% 100%)",
          glow: "hsl(329 88% 70%)",
        },
        secondary: {
          DEFAULT: "hsl(272 46% 74%)",
          foreground: "hsl(273 32% 20%)",
        },
        accent: {
          DEFAULT: "hsl(24 84% 64%)",
          foreground: "hsl(18 45% 20%)",
        },
        muted: {
          DEFAULT: "hsl(152 35% 88%)",
          foreground: "hsl(152 28% 26%)",
        },
        card: {
          DEFAULT: "hsla(0, 0%, 100%, 0.92)",
          foreground: "hsl(330 24% 18%)",
        },
        border: "hsla(329, 70%, 72%, 0.5)",
        input: "hsla(329, 70%, 86%, 0.65)",
        ring: "hsl(329 84% 55%)",
      },
      borderRadius: {
        lg: "1.25rem",
        md: "1rem",
        sm: "0.75rem",
      },
      fontFamily: {
        display: ["'Playfair Display'", "serif"],
        sans: ["'Work Sans'", "sans-serif"],
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(circle at top left, hsla(329, 80%, 90%, 0.7), transparent 55%), radial-gradient(circle at bottom right, hsla(152, 45%, 88%, 0.6), transparent 55%)",
        "card-gradient":
          "linear-gradient(135deg, hsla(329, 85%, 96%, 0.95), hsla(272, 45%, 94%, 0.88))",
        "accent-gradient":
          "linear-gradient(120deg, hsla(24, 86%, 82%, 0.95), hsla(152, 38%, 90%, 0.88))",
      },
      boxShadow: {
        glow: "0 18px 48px -20px hsla(329, 85%, 48%, 0.45)",
        glass: "0 10px 36px -18px hsla(332, 40%, 35%, 0.25)",
        inset: "inset 0 1px 0 0 hsla(0,0%,100%,0.3)",
      },
      backdropBlur: {
        glass: "22px",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 0 0 hsla(340, 70%, 70%, 0.35)" },
          "50%": { boxShadow: "0 0 0 12px hsla(340, 70%, 70%, 0)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
