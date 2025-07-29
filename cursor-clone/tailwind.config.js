/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'editor-bg': '#1e1e1e',
        'panel-bg': '#252526',
        'border-color': '#3e3e42',
        'text-primary': '#cccccc',
        'text-secondary': '#969696',
        'accent': '#007acc',
      }
    },
  },
  plugins: [],
}