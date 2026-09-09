/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      fontFamily: {
        // Manrope for display, Inter for text. Both are upright, geometric and
        // open; nothing italic or scripted, which is what makes a small size
        // stay readable.
        display: ['Manrope', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: "#050816",
        secondary: "#aaa6c3",
        tertiary: "#151030",
        "black-100": "#100d25",
        "black-200": "#090325",
        "white-100": "#f3f3f3",
        accent: "#915eff",
        "accent-soft": "#b58bff",
        signal: "#00cea8",
        line: "rgba(145, 94, 255, 0.16)",
        "line-strong": "rgba(145, 94, 255, 0.4)",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
        lift: "0 24px 60px -24px rgba(145, 94, 255, 0.45)",
        glow: "0 0 0 1px rgba(145,94,255,0.35), 0 18px 50px -18px rgba(145,94,255,0.55)",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/herobg.png')",
      },
      transitionTimingFunction: {
        // One easing for the whole site. Slow out, no bounce.
        fluid: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        shimmer: {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(220%)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.8)", opacity: "0.55" },
          "80%, 100%": { transform: "scale(1.9)", opacity: "0" },
        },
        rise: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        shimmer: "shimmer 1.1s ease-in-out",
        "pulse-ring": "pulse-ring 2.4s cubic-bezier(0.22, 1, 0.36, 1) infinite",
        rise: "rise 0.6s cubic-bezier(0.22, 1, 0.36, 1) both",
      },
    },
  },
  plugins: [],
};
