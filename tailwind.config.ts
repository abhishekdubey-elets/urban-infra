import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palette extracted from the summit logo / gradient:
        // green -> teal/cyan -> blue -> indigo/purple
        ink: {
          DEFAULT: "#070b14",
          50: "#0b1120",
          100: "#0e1626",
          200: "#131d31",
        },
        brand: {
          green: "#6FBE4E",
          lime: "#8FD14F",
          teal: "#1FC2C9",
          cyan: "#27B6D9",
          blue: "#3E7AC4",
          indigo: "#4F5BB0",
          purple: "#6A57A6",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "brand-gradient":
          "linear-gradient(100deg, #6FBE4E 0%, #1FC2C9 38%, #3E7AC4 68%, #6A57A6 100%)",
        "brand-radial":
          "radial-gradient(120% 120% at 50% 0%, rgba(31,194,201,0.18) 0%, rgba(7,11,20,0) 55%)",
        "noise":
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        glass: "0 8px 40px -12px rgba(31,194,201,0.25)",
        glow: "0 0 40px -8px rgba(39,182,217,0.55)",
        "glow-purple": "0 0 40px -8px rgba(106,87,166,0.6)",
      },
      keyframes: {
        "gradient-pan": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-18px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0) translateX(0)" },
          "50%": { transform: "translateY(-30px) translateX(14px)" },
        },
        shine: {
          "0%": { transform: "translateX(-120%)" },
          "60%, 100%": { transform: "translateX(220%)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.9)", opacity: "0.7" },
          "100%": { transform: "scale(1.6)", opacity: "0" },
        },
      },
      animation: {
        "gradient-pan": "gradient-pan 8s ease infinite",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 11s ease-in-out infinite",
        shine: "shine 5s ease-in-out infinite",
        marquee: "marquee 38s linear infinite",
        "spin-slow": "spin-slow 38s linear infinite",
        "pulse-ring": "pulse-ring 3s ease-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
