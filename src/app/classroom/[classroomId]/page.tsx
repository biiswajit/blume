"use client";
import { SidebarTrigger } from "@/ui/sidebar";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs";
import { Members } from "./members";
import { UploadAssignment } from "./uploadAssignment";
import { Assignments } from "./assignments";
import { Upload } from "lucide-react";
import { Button } from "@/ui/button";
import { StartDiscussion } from "./startDiscussion";
import { JoinDiscussion } from "./joinDiscussion";
import { JoinClassroom } from "../join";
import { Discussions } from "./discussions";
import { GeminiBody } from "./GeminiBody";
import Image from "next/image";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/ui/hover-card";

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

export default function ClassroomPage({
  params,
}: {
  params: { classroomId: string };
}) {
  const [classroom, setClassroom] = useState<ClassroomType>();

  useEffect(() => {
    async function fetchClassroomInfo() {
      const res = await fetch(`/api/classroom?id=${params.classroomId}`);
      if (!res.ok) {
        console.log(res);
      }

      const data = await res.json();
      setClassroom(data);
    }

    fetchClassroomInfo();
  }, []);

  if (!classroom) {
    return (
      <div className="h-screen grid place-content-center">
        <Image
          src={"/images/loading.svg"}
          alt="goto login"
          width={400}
          height={400}
        />
        <p>Loding, please wait...</p>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <header className="p-4 flex items-center gap-4">
        <SidebarTrigger />
        <span className="text-xl">{classroom.name}</span>
        <span className="fixed right-10">
          <HoverCard>
            <HoverCardTrigger className="font-primary font-bold">
              Classroom code
            </HoverCardTrigger>
            <HoverCardContent>
              <p className="font-primary text-sm">
                Here is the classroom code that you can send to anyone to join
              </p>
              <br />
              <p className="font-primary text-lg font-bold text-primary">
                {classroom.code}
              </p>
            </HoverCardContent>
          </HoverCard>
        </span>
      </header>
      <div className="h-full p-4">
        <Tabs defaultValue="account" className="w-full text-center">
          <TabsList>
            <TabsTrigger value="announcements">Announcements</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
            <TabsTrigger value="friends">Members</TabsTrigger>
            <TabsTrigger value="discussions">Discussions</TabsTrigger>
            <TabsTrigger value="chatbot">Chatbot</TabsTrigger>
          </TabsList>
          <TabsContent value="announcements">Announcements</TabsContent>
          <TabsContent value="assignments" className="flex flex-col gap-8 pt-2">
            <Button className="w-fit m-auto">
              <Upload />
              <UploadAssignment classroomId={params.classroomId} />
            </Button>
            <Assignments classroomId={params.classroomId} />
          </TabsContent>
          <TabsContent value="friends">
            <Members members={classroom.enrollments} />
          </TabsContent>
          <TabsContent value="discussions">
            <div className="flex flex-col lg:flex-row justify-center gap-2 lg:gap-36 my-4">
              <StartDiscussion classroomId={params.classroomId} />
              <JoinDiscussion classroomId={params.classroomId} />
            </div>
            <Discussions classroomId={params.classroomId} />
          </TabsContent>
          <TabsContent value="chatbot">
            <GeminiBody />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
