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

export const Lato = localFont({
  src: [
    {
      path: "../public/fonts/Lato-Black.ttf",
      style: "normal",
      weight: "900",
    },
    {
      path: "../public/fonts/Lato-BlackItalic.ttf",
      style: "italic",
      weight: "900",
    },
    {
      path: "../public/fonts/Lato-Bold.ttf",
      style: "normal",
      weight: "700",
    },
    {
      path: "../public/fonts/Lato-BoldItalic.ttf",
      style: "italic",
      weight: "700",
    },
    {
      path: "../public/fonts/Lato-Regular.ttf",
      style: "normal",
      weight: "400",
    },
    {
      path: "../public/fonts/Lato-Italic.ttf",
      style: "italic",
      weight: "400",
    },
    {
      path: "../public/fonts/Lato-Light.ttf",
      style: "normal",
      weight: "300",
    },
    {
      path: "../public/fonts/Lato-LightItalic.ttf",
      style: "italic",
      weight: "300",
    },
  ],
  variable: "--font-lato",
  display: "swap",
});

export const PlayfairDisplay = localFont({
  src: [
    {
      path: "../public/fonts/PlayfairDisplay-VariableFont_wght.ttf",
      style: "normal",
    },
    {
      path: "../public/fonts/PlayfairDisplay-Italic-VariableFont_wght.ttf",
      style: "italic",
    },
  ],
  variable: "--font-playfair-display",
  display: "swap",
});
