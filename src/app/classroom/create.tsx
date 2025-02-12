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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import { Textarea } from "@/ui/textarea";
import { Button } from "@/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { colors } from "@/lib/constants";
import { useState } from "react";
import { createClassroom } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";
import { useAtom } from "jotai";
import { Classroom, classroomsAtom } from "@/store";

export function CreateClassroom() {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string | undefined>(undefined);
  const [color, setColor] = useState<string | undefined>(undefined);
  const [classrooms, setClassrooms] = useAtom(classroomsAtom);

  const { toast } = useToast();

  return (
    <Dialog>
      <DialogTrigger>Create Classroom</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-primary font-bold mb-4">
            Create a classroom
          </DialogTitle>
          <DialogDescription className="flex flex-col gap-4">
            <span>
              <Label htmlFor="name">Classroom name</Label>
              <Input
                className="bg-sidebar"
                onChange={(e) => setName(e.target.value)}
              />
            </span>
            <span>
              <Label htmlFor="description">Classroom description</Label>
              <Textarea
                className="bg-sidebar"
                placeholder="Type your message here."
                id="message-2"
                onChange={(e) => setDescription(e.target.value)}
              />
            </span>
            <span>
              <Label htmlFor="color">Classroom theme</Label>
              <Select onValueChange={(value) => setColor(value)}>
                <SelectTrigger className="bg-sidebar">
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent onChange={(e) => e.target}>
                  {colors.map((color, idx) => (
                    <SelectItem key={idx} value={color.value}>
                      {color.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </span>
            <Button
              variant="default"
              onClick={async () => {
                const res = await createClassroom({
                  name,
                  description,
                  themeColor: color,
                });
                if (res) {
                  const response = await fetch("/api/classroom/all");
                  if (!response.ok) {
                    console.log(res);
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
              <PlusIcon className="mr-2 h-4 w-4" />
              Create
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
