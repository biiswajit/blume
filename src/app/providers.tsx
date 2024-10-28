"use client";

import { ReactNode } from "react";
import { Provider } from "jotai";
import { ThemeProvider } from "@/ui/theme-provider";
import { SessionProvider } from "next-auth/react";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <SessionProvider>{children}</SessionProvider>
      </ThemeProvider>
    </Provider>
  );
}
