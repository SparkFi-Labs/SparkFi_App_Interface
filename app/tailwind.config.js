/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./components/**/*.tsx", "./ui/**/*.tsx", "./screens/**/*.tsx", "./pages/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"]
      }
    }
  },
  daisyui: {
    themes: ["night"]
  },
  plugins: [require("daisyui")]
};
