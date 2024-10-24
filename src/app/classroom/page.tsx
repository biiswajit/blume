"use client";
import { SidebarTrigger } from "@/ui/sidebar";
import { ClassroomCard } from "./card";
import { useEffect, useState } from "react";
import Link from "next/link";

export type Classroom = {
  classroom: {
    id: string;
    name: string;
    description?: string;
    themeColor: string;
    createdBy: {
      name: string;
      image: string;
    };
    createdAt: string;
  };
  joinedAt: string;
  role: string;
};

export default function AllClassroomsPage() {
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchClassrooms() {
      setLoading(true);
      const res = await fetch("/api/classroom/all");
      if (!res.ok) {
        console.log(res);
      }
      const data = await res.json();
      setLoading(false);
      setClassrooms(data);
    }

    fetchClassrooms();
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <header className="p-4 flex items-center gap-4">
        <SidebarTrigger />
        <span className="text-xl">Classrooms</span>
      </header>
      <div className="h-full flex flex-col md:flex-row md:flex-wrap content-start gap-4 p-4 overflow-y-auto">
        {loading && <span>Loading...</span>}
        {classrooms.map((room: Classroom) => (
          <Link
            key={room.classroom.id}
            href={`/classroom/${room.classroom.id}`}
          >
            <ClassroomCard
              name={room.classroom.name}
              description={room.classroom.description}
              owner={room.classroom.createdBy.name}
              ownerImg={room.classroom.createdBy.image}
              themeColor={room.classroom.themeColor}
              role={room.role}
              joinedAt={room.joinedAt}
              createdAt={room.classroom.createdAt}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
