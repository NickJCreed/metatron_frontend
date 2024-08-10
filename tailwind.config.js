/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        darkBg: '#0e0e10',
        lightBg: '#1c1c24',
      },
    },
  },
  plugins: [],
};
