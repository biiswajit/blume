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
        default: ["var(--font-inter)"]
      },
      colors: {
        white: {
          100: "#ffffff",
          50: "#fefefd",
          0: "#f5f5f4",
        },
        gray: {
          100: "#4a4a4a",
          50: "#9b9b9a",
          0: "#b4b4b3",
        },
        black: {
          100: "#000000",
          50: "#0d0d0d",
          0: "#1a1919",
        },
      },
    },
  },
  plugins: [],
};

export default config;