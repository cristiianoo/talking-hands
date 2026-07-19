/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")], // <--- Esta linha é a novidade!
  theme: {
    extend: {
      colors: {
        primary: '#4CAF50', 
        background: '#F9FAFB',
      }
    },
  },
  plugins: [],
}