/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: { extend: {
    colors: { navy: "#082b59", blue: "#0d4f9b", sky: "#dceeff", gold: "#f5b83d" },
    fontFamily: { sans: ["Arial", "Helvetica", "sans-serif"] },
    boxShadow: { soft: "0 20px 60px rgba(8,43,89,.12)" }
  }},
  plugins: []
};