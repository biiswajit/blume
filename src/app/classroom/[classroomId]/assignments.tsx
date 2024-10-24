"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardDescription } from "@/ui/card";
import { Badge } from "@/ui/badge";
import { parseDate } from "@/lib/functions";

export type Assignment = {
  name: string;
  description?: string;
  dueDate: string;
  id: string;
  createdAt: string;
};

export function Assignments({ classroomId }: { classroomId: string }) {
  const [assignments, setAssignments] = useState<Assignment[]>();

  useEffect(() => {
    async function fetchAssignments() {
      const res = await fetch(`/api/assignment/all?classroomId=${classroomId}`);
      if (!res.ok) {
        console.log(res);
      }
      const data = await res.json();
      setAssignments(data);
    }

    fetchAssignments();
  }, []);

  if (!assignments) {
    return <span>Loading...</span>;
  }

  return (
    <div className="m-auto w-fit flex flex-col gap-2">
      {assignments.map((file: Assignment) => (
        <Link
          key={file.id}
          href={`/classroom/${classroomId}/assignment/${file.id}`}
        >
          <Card className="px-4 py-2">
            <span className="flex flex-col gap-2  items-stretch">
              <span className="flex gap-4 justify-between">
                {file.name}
                <Badge variant="outline" className="self-end">
                  {parseDate(file.createdAt)}
                </Badge>
              </span>
              <CardDescription className="">
                Assignment submit by &nbsp; &nbsp;
                <Badge>{parseDate(file.dueDate)}</Badge>
              </CardDescription>
            </span>
          </Card>
        </Link>
      ))}
    </div>
  );
}
