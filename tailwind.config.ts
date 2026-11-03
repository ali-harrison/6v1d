import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: "#222222",
        smoke: "#3e3e3e",
        bone: "#ede8da",
        lilac: "#eddfee",
        orchid: "#cd8dbd",
        forest: "#1f2d1d",
        khaki: "#b7b39c",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        display: ["clamp(3rem, 2.3rem + 3vw, 5rem)", { lineHeight: "1" }],
        h1: ["clamp(2.2rem, 1.66rem + 2.25vw, 3.7rem)", { lineHeight: "1.1" }],
        h2: ["clamp(1.625rem, 1.23rem + 1.69vw, 2.75rem)", { lineHeight: "1.2" }],
        h3: ["clamp(1.25rem, 0.94rem + 1.31vw, 2.125rem)", { lineHeight: "1.2" }],
        h4: ["clamp(1.06rem, 0.82rem + 1.03vw, 1.69rem)", { lineHeight: "1.2" }],
        h5: ["clamp(0.81rem, 0.61rem + 0.85vw, 1.375rem)", { lineHeight: "1.3" }],
        body: ["clamp(0.88rem, 0.85rem + 0.12vw, 0.99rem)", { lineHeight: "1.5" }],
        eyebrow: ["10px", { lineHeight: "1.3", letterSpacing: "0.02em" }],
      },
      borderRadius: {
        sheet: "1.25rem",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.76, 0, 0.24, 1)",
        out: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
