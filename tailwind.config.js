const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  content: [
    "./core/pages/**/*.{js,ts,jsx,tsx}",
    "./core/components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./features/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        base_yellow: "#F6C950",
        base_orange: "#E7542F",
        base_gray: "#7C8289",
        base_green: "#8DC53E",
        dim_gray: "#C4C4C4",
        dark_orange: "#C4502F",
        dark_gray: "#2F3336",
        dim_yellow: "#FBE9B4",
        dim_brown:"#CCB6A8",
        base_blue:"#1C447D"
      },
    },
  },
  plugins: [],
};
