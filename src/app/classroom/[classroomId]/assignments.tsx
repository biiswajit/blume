"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { parseDate } from "@/lib/functions";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/table";

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
    <Table>
      <TableCaption>List of assignments</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Upload date</TableHead>
          <TableHead>Due date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {assignments.map((file: Assignment) => (
          <TableRow key={file.id}>
            <TableCell className="font-medium text-left">{file.name}</TableCell>
            <TableCell className="text-left">{file.description}</TableCell>
            <TableCell className="text-left">
              {parseDate(file.createdAt)}
            </TableCell>
            <TableCell className="text-left">
              {parseDate(file.dueDate)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
