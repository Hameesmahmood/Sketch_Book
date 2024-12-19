/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "friendly-blue": "#4DABF7",
        "friendly-green": "#2ECC71",
        "friendly-yellow": "#FFD700",
        "friendly-pink": "#FF69B4",
      },
      fontSize: {
        "large-button": "1.5rem",
      },
      borderRadius: {
        friendly: "1rem",
      },
    },
  },
  plugins: [],
};
