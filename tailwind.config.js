const { Colors } = require('./constants/colors'); // Importa as tuas cores

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: Colors // O Tailwind passa a usar as constantes diretamente!
    },
  },
  plugins: [],
}