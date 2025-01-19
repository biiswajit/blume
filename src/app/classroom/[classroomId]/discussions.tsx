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
import { DiscussionAtom } from "@/store";
import { useAtom } from "jotai";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export function Discussions({ classroomId }: { classroomId: string }) {
  const [discussions, setDiscussions] = useAtom(DiscussionAtom);
  useEffect(() => {
    async function helper() {
      const data = await fetchDiscussions(classroomId);
      setDiscussions(data);
    }

    helper();
  }, []);

  if (!discussions) {
    return (
      <div className="h-screen grid place-content-center">
        <Image
          src={"/images/loading.svg"}
          alt="goto login"
          width={400}
          height={400}
        />
        <p>Loafing, please wait...</p>
      </div>
    );
  }

  return (
    <Table className="mt-5">
      <TableCaption>List of all discussions.</TableCaption>
      <TableHeader className="bg-sidebar font-primary font-bold text-lg border-b-2 border-primary">
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead className="text-right">Created At</TableHead>
          <TableHead>{"Creator's name"}</TableHead>
          <TableHead>{"Creator's email"}</TableHead>
          <TableHead>Code</TableHead>
          <TableHead className="text-left">Open Discussion</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {discussions.map((discussion: Discussion) => (
          <TableRow key={discussion.discussionId}>
            <TableCell className="font-medium text-left font-primary">
              {discussion.discussionName}
            </TableCell>
            <TableCell className="text-right font-primary">
              {discussion.createdAt}
            </TableCell>
            <TableCell className="text-left font-primary">
              {discussion.creator.name}
            </TableCell>
            <TableCell className="text-left font-primary">
              {discussion.creator.email}
            </TableCell>
            <TableCell className="text-left font-primary">
              {discussion.code}
            </TableCell>
            <TableCell className="right-0 font-primary text-blume-blue-100 font-bold underline underline-offset-4">
              <Link href={`/discussion/${discussion.discussionId}`}>
                <div className="flex flex-row">
                  <span>Open</span>
                  <ArrowUpRight />
                </div>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
