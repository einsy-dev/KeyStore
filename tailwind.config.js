/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        "v-black": "rgb(0 0 0)",
        "v-dark": "rgb(51 51 51)",
        "v-white": "hsl(0 0% 20%)",
        "v-light": "hsl(0 0% 94%)",
        "v-red": "rgb(255 0 0)",
        "v-50": "rgba(0 0 0 0.5)",

        "v-dark-bg": "rgb(0 0 0)",
        "v-dark-fg": "rgb(51 51 51)",
        "v-dark-text": "rgb(255 255 255)",
        "v-dark-50": "rgba(0 0 0 0.5)",
        "v-dark-b": "rgb(255 0 0)",
        "v-dark-button-bg": "rgb(255 0 0)",
        "v-dark-button-b": "rgb(255 0 0)",
        "v-dark-button-text": "rgb(255 255 255)",
        "v-dark-err-text": "rgb(255 0 0)",

        "v-light-bg": "rgb(255 255 255)",
        "v-light-fg": "rgb(225 225 225)",
        "v-light-text": "rgb(0 0 0)",
        "v-light-50": "rgba(0 0 0 0.5)",
        "v-light-b": "rgb(59 130 246)",
        "v-light-button-bg": "rgb(59 130 246)",
        "v-light-button-b": "rgb(59 130 246)",
        "v-light-button-text": "rgb(255 255 255)",
        "v-light-err-text": "rgb(255 0 0)",

      }
    },
  },
  plugins: [],
}