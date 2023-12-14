/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "pink-text": "#eb8fcc",
        green: "#c0eb8f",
        purple: "#6B4A60",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [
    // ...
    require("@tailwindcss/forms"),
  ],
};
