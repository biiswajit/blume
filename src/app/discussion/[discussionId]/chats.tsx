"use client";
import { useEffect, useState } from "react";
import { fetchPreviousChats, Chat } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";
import { Write } from "./write";
import { useSession } from "next-auth/react";
import { ScrollArea } from "@/ui/scroll-area";
import { ThumbsUp } from "lucide-react";
import { SetStateAction } from "jotai";

export function Chats({
  discussionId,
  ws,
  userId,
}: {
  discussionId: string;
  ws: WebSocket;
  userId: string;
}) {
  const { toast } = useToast();
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    ws.onmessage = (message) => {
      if (message.data) {
        console.log(message.data);
        const temp = JSON.parse(message.data);
        setChats((prev: Chat[]) => [...prev, temp.payload]);
      }
    };
  }, []);

  if (!chats) {
    return <div>No previous chats</div>;
  }

  return (
    <ScrollArea className="h-full w-full rounded-md border p-4">
      {chats.map((chat) => (
        <div
          key={chat.chatId}
          className={`max-w-[500px] w-fit border flex flex-col gap-1 py-1 px-4 mt-2 rounded-md ${userId === chat.userId && "justify-self-end"}`}
        >
          <div className="w-full font-semibold">{chat.message}</div>
          <div className="flex justify-between w-full font-light text-sm opacity-70 gap-5">
            <span>{chat.userName}</span>
            <div className="flex gap-2 items-center">
              <ThumbsUp className="w-4" />
              <span>{chat.upvotes}</span>
            </div>
          </div>
        </div>
      ))}
    </ScrollArea>
  );
}
