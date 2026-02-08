/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        linkedin: "#0077B5",
        github: "#181717",
        twitter: "#1DA1F2",

        // Warm editorial palette
        cream: {
          50: "#FEFDFB",
          100: "#FBF8F3",
          200: "#F5EFE6",
          300: "#EDE4D6",
        },
        ink: {
          DEFAULT: "#1A1A1A",
          light: "#2D2D2D",
          muted: "#4A4A4A",
          subtle: "#6B6B6B",
          faint: "#9A9A9A",
          ghost: "#C8C4BE",
        },
        terracotta: {
          DEFAULT: "#C4654A",
          light: "#D4836C",
          dark: "#A84E35",
          muted: "#D9A494",
          faint: "#F0DDD6",
        },
        sage: {
          DEFAULT: "#7A8B6F",
          light: "#98A88E",
          dark: "#5E6D54",
          muted: "#B8C4B0",
          faint: "#E8ECE4",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      screens: {
        xs: "475px",
        short: { raw: "(max-height: 700px) and (max-width: 600px)" },
      },
    },
  },
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
  daisyui: {
    darkTheme: false,
  },
}
