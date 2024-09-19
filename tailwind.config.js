/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["var(--font-ibmplex)"],
        display: ["var(--font-libre)"],
        default: ["var(--font-inter)"],
      },
      colors: {
        black: {
          0: "#1a1919",
          50: "#0d0d0d",
          100: "#000000",
        },
        white: {
          0: "#ffffff",
          25: "#f9fafb",
          50: "#f5f5f4",
          100: "#e7e6ee",
        },
      },
    },
  },
  plugins: [],
};

export default config;
