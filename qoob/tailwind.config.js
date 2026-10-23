/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  // preflight stays off so the existing look (browser defaults + index.css) is unchanged
  corePlugins: {preflight: false},
  theme: {extend: {}},
  plugins: [],
};
