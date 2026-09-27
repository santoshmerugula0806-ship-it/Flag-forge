/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        base: {
          950: "#07070c",
          900: "#0b0c14",
          850: "#101220",
          800: "#151829",
          750: "#1b1f33",
          700: "#22273d",
          600: "#2f3652",
          500: "#454e73",
        },
        brand: {
          400: "#8b8cf7",
          500: "#6d6ef5",
          600: "#5457e8",
          700: "#4142c2",
        },
        on: {
          400: "#34d399",
          500: "#10b981",
        },
        off: {
          400: "#fb7185",
          500: "#f43f5e",
        },
        warn: {
          400: "#fbbf24",
          500: "#f59e0b",
        },
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(109,110,245,0.15), 0 8px 30px -8px rgba(109,110,245,0.35)",
        "glow-emerald": "0 0 0 1px rgba(16,185,129,0.2), 0 8px 24px -8px rgba(16,185,129,0.45)",
        card: "0 1px 0 rgba(255,255,255,0.04) inset, 0 20px 40px -20px rgba(0,0,0,0.6)",
      },
      backgroundImage: {
        "grid-glow":
          "radial-gradient(circle at 20% 0%, rgba(109,110,245,0.18), transparent 40%), radial-gradient(circle at 80% 0%, rgba(16,185,129,0.12), transparent 40%)",
        aurora:
          "linear-gradient(120deg, #4142c2 0%, #6d6ef5 25%, #10b981 50%, #6d6ef5 75%, #4142c2 100%)",
      },
      keyframes: {
        "slide-in": {
          "0%": { opacity: 0, transform: "translateY(10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "fade-up": {
          "0%": { opacity: 0, transform: "translateY(24px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: 0, transform: "scale(0.94)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
        "aurora-move": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pulse-ring": {
          "0%": { boxShadow: "0 0 0 0 rgba(16,185,129,0.5)" },
          "70%": { boxShadow: "0 0 0 8px rgba(16,185,129,0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(16,185,129,0)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        "slide-in": "slide-in 0.4s ease-out both",
        "fade-up": "fade-up 0.6s cubic-bezier(0.16,1,0.3,1) both",
        "scale-in": "scale-in 0.25s cubic-bezier(0.16,1,0.3,1) both",
        aurora: "aurora-move 8s ease infinite",
        shimmer: "shimmer 2.5s linear infinite",
        "pulse-ring": "pulse-ring 2s cubic-bezier(0.4,0,0.6,1) infinite",
        float: "float 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
