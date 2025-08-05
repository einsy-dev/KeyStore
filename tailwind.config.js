/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./src/app/**/*.{js,jsx,ts,tsx}", "./src/components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        "v-black": "hsl(0, 0%, 10%)",
        "v-dark": "hsl(0, 0%, 20%)",
        "v-light": "hsl(0, 0%, 100%)",
        "v-red": "hsl(358, 77%, 46%)",
        "v-50": "rgba(0, 0, 0, 0.5)",
      }
    },
  },
  plugins: [],
}