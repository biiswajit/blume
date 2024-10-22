"use client";
import { useSidebar, SidebarTrigger } from "@/ui/sidebar";

export default function ClassroomPage() {
  const { isMobile } = useSidebar();
  return <>Hello, World{isMobile && <SidebarTrigger />}</>;
}
