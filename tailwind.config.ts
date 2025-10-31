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
        background: "hsl(330 40% 98%)",
        foreground: "hsl(330 15% 20%)",
        primary: {
          DEFAULT: "hsl(340 65% 75%)",
          foreground: "hsl(340 30% 20%)",
          glow: "hsl(340 70% 85%)",
        },
        secondary: {
          DEFAULT: "hsl(270 40% 85%)",
          foreground: "hsl(270 30% 25%)",
        },
        accent: {
          DEFAULT: "hsl(25 75% 85%)",
          foreground: "hsl(20 40% 20%)",
        },
        muted: {
          DEFAULT: "hsl(150 30% 92%)",
          foreground: "hsl(150 25% 30%)",
        },
        card: {
          DEFAULT: "hsla(330, 65%, 98%, 0.8)",
          foreground: "hsl(330 20% 25%)",
        },
        border: "hsla(330, 30%, 80%, 0.5)",
        input: "hsla(330, 30%, 85%, 0.6)",
        ring: "hsl(340 65% 65%)",
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
          "radial-gradient(circle at top left, hsla(340, 70%, 85%, 0.75), transparent 55%), radial-gradient(circle at bottom right, hsla(150, 40%, 85%, 0.7), transparent 55%)",
        "card-gradient":
          "linear-gradient(135deg, hsla(340, 70%, 92%, 0.95), hsla(270, 45%, 92%, 0.8))",
        "accent-gradient":
          "linear-gradient(120deg, hsla(25, 80%, 90%, 0.95), hsla(150, 35%, 92%, 0.85))",
      },
      boxShadow: {
        glow: "0 15px 45px -20px hsla(340, 65%, 50%, 0.4)",
        glass: "0 8px 30px -12px hsla(330, 60%, 40%, 0.25)",
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
