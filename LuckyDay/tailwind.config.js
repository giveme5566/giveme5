/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef7f0',
          100: '#fceddf',
          200: '#f9dbbf',
          300: '#f5c49f',
          400: '#f0a97a',
          500: '#ea8e59',
          600: '#e67340',
          700: '#df5a2d',
          800: '#bc4927',
          900: '#9a3e25',
        },
      },
    },
  },
  plugins: [],
}
