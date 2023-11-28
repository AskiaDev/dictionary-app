/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#a445ed'
      },
      boxShadow: {
        'shadow-primary': '1px 2px 39px 0px rgba(164,69,237,0.86)'
      }
    },
  },
  plugins: [],
}