import React, { ReactNode } from "react";
import { AppSidebar } from "@/ui/app-sidebar";
import { SidebarProvider } from "@/ui/sidebar";

export default function ClassroomLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar collapsible="icon" />
      {children}
    </SidebarProvider>
  );
}
