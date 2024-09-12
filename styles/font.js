import localFont from "next/font/local";

export const Inter = localFont({
  src: [
    {
      path: "../public/fonts/Inter-Italic-VariableFont_opsz,wght.ttf",
      style: "italic",
    },
    {
      path: "../public/fonts/Inter-VariableFont_opsz,wght.ttf",
      style: "normal",
    },
  ],
  variable: "--font-inter",
  display: "swap",
});

export const IBMPlexMono = localFont({
  src: [
    {
      path: "../public/fonts/IBMPlexMono-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/IBMPlexMono-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-ibmplex",
  display: "swap",
});

export const LibreBaskerville = localFont({
  src: [
    {
      path: "../public/fonts/LibreBaskerville-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/LibreBaskerville-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-libre",
  display: "swap",
});