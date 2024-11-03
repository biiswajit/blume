"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/table";
import { useState, useEffect } from "react";
import { fetchDiscussions, Discussion } from "@/lib/actions";
import Link from "next/link";

export function Discussions({ classroomId }: { classroomId: string }) {
  const [discussions, setDiscussions] = useState<Discussion[]>();
  useEffect(() => {
    async function helper() {
      const data = await fetchDiscussions(classroomId);
      setDiscussions(data);
    }

    helper();
  }, []);

  if (!discussions) {
    return <div>Loading...</div>;
  }

  return (
    <Table>
      <TableCaption>List of all discussions.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">name</TableHead>
          <TableHead>created at</TableHead>
          <TableHead>{"Creator's name"}</TableHead>
          <TableHead>{"Creator's email"}</TableHead>
          <TableHead>code</TableHead>
          <TableHead>Open</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {discussions.map((discussion: Discussion) => (
          <TableRow key={discussion.discussionId}>
            <TableCell className="font-medium text-left">
              {discussion.discussionName}
            </TableCell>
            <TableCell className="text-left">{discussion.createdAt}</TableCell>
            <TableCell className="text-left">
              {discussion.creator.name}
            </TableCell>
            <TableCell className="text-left">
              {discussion.creator.email}
            </TableCell>
            <TableCell className="text-left">{discussion.code}</TableCell>
            <TableCell className="text-left">
              <Link href={`/discussion/${discussion.discussionId}`}>Open</Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
