"use client";

import { Input } from "@/ui/input";
import { Button } from "@/ui/button";
import { PlusIcon } from "lucide-react";
import { prisma } from "@/db/connectDb";
import { v4 as uuidv4 } from "uuid";
import RedisClient from "@/db/connectCache";
import { startDiscussion } from "@/lib/actions/startDiscussion";
import { FormEvent } from "react";
import { useToast } from "@/hooks/use-toast";

export function StartDiscussion({ classroomId }: { classroomId: string }) {
  const { toast } = useToast();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();

    const formData = new FormData(e.currentTarget);
    const discussionName = formData.get("discussionName") as string;

    const { success, message } = await startDiscussion(
      discussionName,
      classroomId,
    );
    toast({
      title: success ? "Success!" : "Error!",
      description: message,
      variant: success ? "default" : "destructive",
    });
  }
  return (
    <form onSubmit={handleSubmit}>
      <Input type="text" name="discussionName" required />
      <Button type="submit" variant="default">
        <PlusIcon className="mr-2 h-4 w-4" />
        Create
      </Button>
    </form>
  );
}
