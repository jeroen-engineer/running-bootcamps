const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./public/**/*.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Open Sans", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        "brand-orange-1": "#ff8811",
        "brand-orange-2": "#FF9012",
        "brand-yellow-1": "#f4d06f",
        "brand-yellow-2": "#F5C16E",
        "brand-white-1": "#fff8f0",
        "brand-white-2": "#fff9f3",
        "brand-white-3": "#fffbf7",
        "brand-white-4": "#fffcfa",
        "brand-turqoise-1": "#9dd9d2",
        "brand-turqoise-2": "#2EC4B6",
        "brand-purple-1": "#392f5a",
        "brand-purple-2": "#2E4759",
        "brand-blue-1": "#7161EF",
      },
      boxShadow: {
        blue: "0 0 3px 3px #4285f4",
        gray: "0 1px 3px 0 rgba(60, 64, 67, .3)",
      },
    },
  },
  variants: {
    extend: {
      margin: ["first"],
    },
  },
  plugins: [],
};
