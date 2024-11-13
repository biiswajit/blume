"use client";
import { SidebarTrigger } from "@/ui/sidebar";
import { ClassroomCard } from "./card";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { classroomsAtom, Classroom } from "@/store";
import { useAtom } from "jotai";

export default function AllClassroomsPage() {
  const { data: session } = useSession()
  const [classrooms, setClassrooms] = useAtom(classroomsAtom);
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

  if (!session || !session?.user) {
    return <div className="h-screen grid place-content-center">
      <Image src={"/images/gotologin.svg"} alt="goto login" width={400} height={400}/>
      <p>You are not logged in, please login to access the application</p>
    </div>
  }

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
