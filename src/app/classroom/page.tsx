import { CreateClassroom } from "./create";
import { JoinClassroom } from "./join";
import { MainSideNav, SideNavItem } from "@/ui/side-nav";
import { PlusIcon, LogInIcon } from "lucide-react";

export default function classroomPage() {
  return (
    <>
      <MainSideNav>
        <SideNavItem
          active={true}
          text={<CreateClassroom />}
          icon={<PlusIcon />}
        />
        <SideNavItem icon={<LogInIcon />} text={<JoinClassroom />} />
      </MainSideNav>
      Hello, World!
    </>
  );
}
