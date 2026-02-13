/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        marquee: "marquee 90s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(100%)" }, // start off right
          "100%": { transform: "translateX(-100%)" }, // move left
        },
      },
    },
  },
  plugins: [],
};
