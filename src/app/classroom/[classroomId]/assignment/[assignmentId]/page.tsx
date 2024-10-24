"use client";
import { useEffect, useState } from "react";
import { SidebarTrigger } from "@/ui/sidebar";

type Assignment = {
  name: string;
  id: string;
  description?: string;
  dueDate: string;
  createdAt: string;
  file: string;
  classroom: {
    name: string;
  };
};

export default function AssignmentPage({
  params,
}: {
  params: { assignmentId: string; classroomId: string };
}) {
  const [info, setInfo] = useState<Assignment>();
  useEffect(() => {
    async function fetchAssignmentInfo() {
      const res = await fetch(`/api/assignment?id=${params.assignmentId}`);
      if (!res.ok) {
        console.log(res);
      }

      const data = await res.json();
      setInfo(data);
    }

    fetchAssignmentInfo();
  }, [params.assignmentId, info]);

  if (!info) {
    return <span>Loading...</span>;
  }

  return (
    <div className="h-screen flex flex-col">
      <header className="p-4 flex items-center gap-4">
        <SidebarTrigger />
        <span className="text-xl">{info.classroom.name as string}</span>
      </header>
      <div className="h-full p-4">
        {info.name}
        {info.description}
      </div>
    </div>
  );
}
