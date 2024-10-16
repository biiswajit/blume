import React, { ReactNode } from "react";

export default function ClassroomLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen w-screen">
      <div className="grid grid-cols-2 h-full">{children}</div>
    </div>
  );
}
