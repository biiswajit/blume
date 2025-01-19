"use client";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";
import { SendIcon } from "lucide-react";
import { sendChat } from "@/lib/actions";
import { FormEvent } from "react";
import { useToast } from "@/hooks/use-toast";
import { sendTextMessage } from "@/lib/functions";
import { Dispatch } from "react";
import { Chat } from "@/lib/actions";
import { SetStateAction } from "jotai";

export function Write({
  discussionId,
  ws,
  userId,
}: {
  discussionId: string;
  ws: WebSocket;
  userId: string | undefined;
}) {
  const { toast } = useToast();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const msg = formData.get("message") as string;

    if (!userId) {
      return;
    }

    sendTextMessage(ws, userId, discussionId, msg);
  }

  if (!userId) {
    return <div>you are not authorized</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 lg:w-[500px] lg:m-auto">
      <Input
        type="text"
        name="message"
        required
        className="bg-sidebar-accent"
      />
      <Button type="submit">
        <SendIcon className="mr-2 h-4 w-4" />
        Send
      </Button>
    </form>
  );
}
