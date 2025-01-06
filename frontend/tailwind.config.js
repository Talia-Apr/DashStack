/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#4338ca",
          prm2: "#7B74DA",
          secondary: "#ECEAFF",
          accent: "#37cdbe",
          neutral: "#3d4451",
          accentcont :"#000000",
          "base-100": "#ffffff",
        },
      },  
      {
        dark: {
          primary: "#4338ca",
          prm2: "#E9E7FF",
          secondary: "#4338ca",
          accent: "#1fb2a6",
          neutral: "#2a2e37",
          accentcont :"#5A607F",
          "base-100": "#191d24",
        },
      },
    ],
  },

}
