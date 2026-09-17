/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],

  colors: {
  noir: "#0B0710",
  "noir-light": "#160F1D",
  accent: "#FF3D7F",
  "accent-dark": "#E62A6B",
  violet: "#8A1F6B",
},
fontFamily: {
  display: ["Sora", "sans-serif"],
  sans: ["Inter", "sans-serif"],
},
}
