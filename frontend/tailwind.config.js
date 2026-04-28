/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#02b36f",
        secondary: "#1F2937",
        success: "#10B981",
        danger: "#EF4444",
        warning: "#F59E0B",
      },
    },
  },
  plugins: [],
};
