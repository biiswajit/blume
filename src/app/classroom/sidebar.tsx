"use client";
import { CreateClassroom } from "./create";
import { JoinClassroom } from "./join";
import { MainSideNav, SideNavItem } from "@/ui/side-nav";
import { PlusIcon, LogInIcon } from "lucide-react";

export function SideBar() {
  return (
    <MainSideNav>
      <SideNavItem text={<CreateClassroom />} icon={<PlusIcon />} />
      <SideNavItem icon={<LogInIcon />} text={<JoinClassroom />} />
    </MainSideNav>
  );
}
