import React, { ReactNode } from "react";
import { MainNav } from "@/ui/main-navbar";

export default function ClassroomLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen w-screen">
      <MainNav />
      <div className="lg:grid grid-cols-2">{children}</div>
    </div>
  );
}
