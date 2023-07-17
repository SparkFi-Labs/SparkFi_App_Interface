/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./components/**/*.tsx", "./ui/**/*.tsx", "./screens/**/*.tsx", "./pages/**/*.tsx"],
  theme: {
    extend: {
      keyframes: {
        spinAxis: {
          from: {
            transform: "rotate3d(0)"
          },
          to: {
            transform: "rotate3d(1, 1, 1, 360deg)"
          }
        }
      },
      animation: {
        spinAxis: "spinAxis 4s linear infinite"
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"]
      }
    }
  },
  daisyui: {
    themes: ["synthwave"]
  },
  plugins: [require("daisyui"), require("@tailwindcss/typography")]
};
