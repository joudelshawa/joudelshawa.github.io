/** @type {import('tailwindcss').Config} */

// The design tokens live as CSS variables in src/styles/globals.css (see
// docs/taste-contract.md); Tailwind only supplies the reset and utilities.
module.exports = {
  content: ["./src/pages/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
