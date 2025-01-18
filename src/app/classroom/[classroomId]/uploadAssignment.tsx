"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/dialog";
import { Label } from "@/ui/label";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";
import { Textarea } from "@/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState, FormEvent } from "react";
import { format } from "date-fns";
import { Upload, Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";
import { uploadAssignment } from "@/lib/actions";
import { assignmentType } from "@/lib/zod/types";
import { assignmentSchema } from "@/lib/zod/schemas";
import { FileUpload } from "@/ui/file-upload";
import { AssignmentType, AssignmentsAtom } from "@/store";
import { useAtom } from "jotai";

export function UploadAssignment({ classroomId }: { classroomId: string }) {
  const [mark, setMark] = useState<string>();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [date, setDate] = useState<Date>();
  const { toast } = useToast();
  const [assignments, setAssignments] = useAtom(AssignmentsAtom);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!name || !file || !date || !classroomId) {
      toast({
        title: "Error!",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("file", file);
      formData.append("dueDate", date.toISOString().substring(0, 10));
      formData.append("classroomId", classroomId);
      if (mark) formData.append("mark", mark);
      if (description) formData.append("description", description);

      const res = await uploadAssignment(formData);

      if (res.success) {
        const response = await fetch(
          `/api/assignment/all?classroomId=${classroomId}`,
        );
        if (!response.ok) {
          console.log(response);
        }
        const data = await response.json();
        setAssignments(data);
      }

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

  return (
    <Dialog>
      <DialogTrigger>Upload Assignment</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload an assignment</DialogTitle>
          <DialogDescription className="flex flex-col gap-4 pt-4">
            <form onSubmit={handleSubmit}>
              <span>
                <Label htmlFor="name">Assignment name</Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </span>
              <span>
                <Label htmlFor="description">
                  Description about assignment
                </Label>
                <Textarea
                  placeholder="Type your description here."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </span>
              <span className="flex flex-col">
                <Label>Pick a due date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "justify-start text-left font-normal",
                        !date && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      required
                    />
                  </PopoverContent>
                </Popover>
              </span>
              <span>
                <Label htmlFor="mark">Mark</Label>
                <Input
                  type="number"
                  value={mark}
                  onChange={(e) => setMark(e.target.value)}
                />
              </span>
              <span>
                <Label htmlFor="file">Picture</Label>
                <FileUpload
                  accept=".pdf, .doc"
                  onChange={(file: File) => {
                    setFile(file);
                  }}
                />
              </span>
              <Button type="submit">
                <Upload />
                Upload
              </Button>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
