/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./components/**/*.tsx", "./ui/**/*.tsx", "./screens/**/*.tsx", "./pages/**/*.tsx"],
  theme: {
    extend: {}
  },
  plugins: [require("daisyui")]
};
