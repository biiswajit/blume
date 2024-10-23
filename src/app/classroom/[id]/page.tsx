"use client";
import { SidebarTrigger } from "@/ui/sidebar";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs";
import { Members } from "./members";

export type ClassroomType = {
  name: string;
  description?: string;
  themeColor: string;
  code: string;
  size: number;
  createdBy: {
    name: string;
    email: string;
    image?: string;
  };
  createdAt: string;
  enrollments: {
    user: {
      name: string;
      email: string;
      image?: string;
    };
    joinedAt: string;
    role: string;
  }[];
};

export default function ClassroomPage({ params }: { params: { id: string } }) {
  const [classroom, setClassroom] = useState<ClassroomType>();

  useEffect(() => {
    async function fetchClassroomInfo() {
      const res = await fetch(`/api/classroom?id=${params.id}`);
      if (!res.ok) {
        console.log(res);
      }

      const data = await res.json();
      setClassroom(data);
    }

    fetchClassroomInfo();
  }, []);

  if (!classroom) {
    return "Loading...";
  }

  return (
    <div className="h-screen flex flex-col">
      <header className="p-4 flex items-center gap-4">
        <SidebarTrigger />
        <span className="text-xl">{classroom.name}</span>
      </header>
      <div className="h-full border p-4">
        <Tabs defaultValue="account" className="w-full text-center">
          <TabsList>
            <TabsTrigger value="announcements">Announcements</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
            <TabsTrigger value="friends">Members</TabsTrigger>
          </TabsList>
          <TabsContent value="announcements">Announcements</TabsContent>
          <TabsContent value="notes">Notes</TabsContent>
          <TabsContent value="assignments">Assignments</TabsContent>
          <TabsContent value="friends">
            <Members members={classroom.enrollments} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
