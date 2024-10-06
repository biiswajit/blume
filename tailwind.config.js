/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./ui/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-playfair-display)"],
        primary: ["var(--font-lato)"],
        body: ["var(--font-inter)"],
      },
      colors: {
        "blume-blue": {
          100: "#615EFC",
          50: "#7F8FF1",
          0: "#C7D0FF",
        },
        "blume-orange": {
          100: "#FF6500",
          50: "#FF8433",
          0: "#FFA366",
        },
        "blume-white": {
          100: "#F6F9FC",
          0: "#FFFFFF",
        },
        "blume-black": {
          100: "#000000",
          50: "#031228",
          0: "#183C62",
        },
        "blume-gray": {
          100: "#535763",
          75: "#B4B4B8",
          50: "#C7C8CC",
          25: "#E3E1D9",
          0: "#F2EFE5",
        },
      },
    },
  },
  plugins: [],
};

export default config;
