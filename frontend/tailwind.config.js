/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        raleway: "var(--font-raleway)",
      },
    },
  },
  plugins: [require("tailwindcss-twglow"), require("tailwind-scrollbar")],
};
