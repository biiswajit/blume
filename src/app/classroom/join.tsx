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
import { EnterIcon } from "@radix-ui/react-icons";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { joinClassroom } from "@/lib/actions";
import { classroomJoinType } from "@/lib/zod/types";
import { classroomsAtom, Classroom } from "@/store";
import { useAtom } from "jotai";

export function JoinClassroom() {
  const [code, setCode] = useState<classroomJoinType>("");
  const { toast } = useToast();
  const [classrooms, setClassrooms] = useAtom(classroomsAtom);

  return (
    <Dialog>
      <DialogTrigger>Join Classroom</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Join an existing classroom</DialogTitle>
          <DialogDescription>
            {/* TODO: support for sharable link */}
            <Label htmlFor="code">Classroom code</Label>
            <Input value={code} onChange={(e) => setCode(e.target.value)} />
            <Button
              variant="default"
              onClick={async () => {
                const res = await joinClassroom(code);
                if (res) {
                  const response = await fetch("/api/classroom/all");
                  if (!response.ok) {
                    console.log(response);
                  }
                  const data = await response.json();
                  setClassrooms(data);

                  toast({
                    title: res.success ? "Success!" : "Error!",
                    description: res.message,
                    variant: res.success ? "default" : "destructive",
                  });
                }
              }}
            >
              <EnterIcon className="mr-2 h-4 w-4" />
              Join
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
