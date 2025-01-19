"use client";
import { useState, useEffect, FormEvent } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/dialog";
import { Badge } from "@/ui/badge";
import { Label } from "@/ui/label";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";
import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { uploadSolution } from "@/lib/actions";
import { ScrollArea } from "@/ui/scroll-area";
import { FileUpload } from "@/ui/file-upload";
import { useAtom } from "jotai";
import { AssignmentsAtom, AssignmentType } from "@/store";
import Image from "next/image";
import { hasUserSubmittedSolution } from "@/lib/actions";
import { useSession } from "next-auth/react";
import { fetchUserRole } from "@/lib/actions";
import FeedbackForm from "./feedbackForm";
import { checkSubmission } from "@/lib/actions";
import { ArrowUpRight } from "lucide-react";

type User = {
  name: string;
  email: string;
  image?: string;
};

export type Assignment = {
  name: string;
  description?: string;
  dueDate: string;
  id: string;
  createdAt: string;
  file?: string;
  mark?: number;
  solutions: [
    {
      file: string;
      id: string;
      createdAt: string;
      user: User | null | undefined;
    },
  ];
};

export function Assignments({ classroomId }: { classroomId: string }) {
  const [assignments, setAssignments] = useAtom(AssignmentsAtom);
  const [assignment, setAssignment] = useState<Assignment>();
  const [file, setFile] = useState<File | null>(null);
  const [assignmentId, setAssignmentId] = useState<string>("");
  const { toast } = useToast();
  const [role, setRole] = useState<"Teacher" | "Student" | null>(null);
  const { data: session } = useSession();
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [solutionInfo, setSolutionInfo] = useState<{
    file: string | undefined;
    mark: string | number | null;
    feedback: string | null;
  } | null>();

  useEffect(() => {
    console.log(`here is assignemnt id ${assignmentId} got it`);
    async function fetchRes() {
      const res = await checkSubmission(
        assignmentId,
        session?.user?.id as string,
      );
      if (res.success) {
        setSubmitted(true);
        setSolutionInfo(res.data);
        console.log(solutionInfo);
      } else {
        setSubmitted(false);
      }
    }

    fetchRes();
  }, [assignmentId]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!file) {
      toast({
        title: "Error!",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    try {
      const formData = new FormData();
      formData.append("assignmentId", assignmentId);
      formData.append("file", file);

      const res = await uploadSolution(formData);

      toast({
        title: res.success ? "Success!" : "Error!",
        description: res.message,
        variant: res.success ? "default" : "destructive",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error!",
        description: "Upload failed.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    async function fetchAssignments() {
      const res = await fetch(`/api/assignment/all?classroomId=${classroomId}`);
      if (!res.ok) {
        console.log(res);
      }
      const data = await res.json();
      setAssignments(data);
    }

    async function userRole() {
      const role = await fetchUserRole(
        session?.user?.id as string,
        classroomId,
      );
      setRole(role);
    }

    userRole();
    fetchAssignments();
  }, []);

  useEffect(() => {
    const userId = session?.user?.id || "";
    console.log(userId);
    async function alreadySubmitted() {
      const ans = await hasUserSubmittedSolution(userId, assignmentId);
      setSubmitted(ans);
    }

    alreadySubmitted();
  }, [assignmentId]);

  if (!assignments) {
    return (
      <div className="h-screen grid place-content-center">
        <Image
          src={"/images/loading.svg"}
          alt="goto login"
          width={400}
          height={400}
        />
        <p>You are not logged in, please login to access the application</p>
      </div>
    );
  }

  return (
    <Table>
      <TableCaption>List of assignments</TableCaption>
      <TableHeader className="bg-sidebar font-primary font-bold text-lg border-b-2 border-primary">
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="text-right">Upload date</TableHead>
          <TableHead className="text-right">Due date</TableHead>
          <TableHead className="text-right">Mark</TableHead>
          <TableHead>View</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {assignments.map((file: AssignmentType) => (
          <TableRow key={file.id}>
            <TableCell className="font-primary text-left">
              {file.name}
            </TableCell>
            <TableCell className="text-left font-primary">
              {file.description}
            </TableCell>
            <TableCell className="text-right font-primary">
              {parseDate(file.createdAt)}
            </TableCell>
            <TableCell className="text-right font-primary">
              {parseDate(file.dueDate)}
            </TableCell>
            <TableCell className="text-right font-primary">
              {file.mark}
            </TableCell>
            <TableCell className="text-left">
              <Dialog>
                <DialogTrigger
                  className="underline underline-offset-4 text-blume-blue-100 font-bold font-primary"
                  onClick={async () => {
                    const res = await fetch(`/api/assignment?id=${file.id}`);
                    if (!res.ok) {
                      console.log(res);
                    }

                    const data: Assignment = await res.json();
                    setAssignment(data);
                    setAssignmentId(data.id);
                  }}
                >
                  <div className="flex flex-row">
                    <span>Open</span>
                    <ArrowUpRight />
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{`Assignment - ${assignment?.name}`}</DialogTitle>
                    <DialogDescription className="pb-2">
                      Due date{" "}
                      <Badge>{parseDate(assignment?.dueDate as string)}</Badge>
                    </DialogDescription>
                  </DialogHeader>
                  <ScrollArea className="w-full h-[600px]">
                    <div className="flex flex-col gap-4">
                      <span>
                        <Label>Assignment description</Label>
                        <p>
                          {assignment?.description ??
                            "No assignment description provided"}
                        </p>
                      </span>
                      <span>
                        <Label>Assignment Mark</Label>
                        <p>{assignment?.mark ?? 0}</p>
                      </span>
                      <span>
                        <Label>Assignment file</Label>
                        <iframe
                          src={assignment?.file}
                          title="Assignment file"
                          className="w-full h-[300px] lg:h-[400px]"
                        />
                      </span>
                      <span>
                        <br />
                        <br />
                        <Label>Solutions</Label>
                        <hr />
                        {role === "Teacher" &&
                          assignment?.solutions &&
                          assignment.solutions.length >= 1 && (
                            <div>
                              {" "}
                              {assignment.solutions.map((solution) => (
                                <div
                                  key={solution.id}
                                  className="my-4 border border-primary p-2"
                                >
                                  Sumbitted by: {solution.user?.name}
                                  <iframe
                                    src={solution?.file}
                                    title="Assignment file"
                                    className="w-full h-[300px] lg:h-[400px]"
                                  />
                                  <FeedbackForm
                                    solutionId={solution.id}
                                    assignmentMark={assignment.mark + ""}
                                  />
                                </div>
                              ))}
                            </div>
                          )}
                        {!submitted && (
                          <form onSubmit={handleSubmit}>
                            <FileUpload
                              accept=".pdf"
                              onChange={(f: File) => {
                                setFile(f);
                              }}
                            />
                            <Button type="submit">
                              <Upload />
                              Upload
                            </Button>
                          </form>
                        )}
                        {submitted && role === "Student" && (
                          <div>
                            <iframe
                              src={solutionInfo?.file}
                              title="Assignment file"
                              className="w-full h-[300px] lg:h-[400px]"
                            />
                            {solutionInfo?.mark && solutionInfo.feedback ? (
                              <div>
                                <div>
                                  <Label>Mark obtained: </Label>
                                  <p>{solutionInfo.mark}</p>
                                </div>
                                <div>
                                  <Label>Feedback received: </Label>
                                  <p>{solutionInfo.feedback}</p>
                                </div>
                              </div>
                            ) : (
                              <p>Your solution yet to be checked!</p>
                            )}
                          </div>
                        )}
                      </span>
                    </div>
                  </ScrollArea>
                </DialogContent>
              </Dialog>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
