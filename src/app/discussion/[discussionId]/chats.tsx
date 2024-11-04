"use client";
import { useEffect, useState, useRef } from "react";
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
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    async function init() {
      const data = await fetchPreviousChats(discussionId);
      if (data.message) setChats(data.message);
    }

    init();

    ws.onmessage = (message) => {
      if (message.data) {
        console.log(message.data);
        const temp = JSON.parse(message.data);
        setChats((prev: Chat[]) => [...prev, temp.payload]);
      }
    };
  }, []);

  useEffect(() => {
    // Scroll to the bottom whenever `chats` updates
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  if (!chats) {
    return <div>No previous chats</div>;
  }

  return (
    <ScrollArea className="h-full w-full rounded-md border py-4 px-6">
      {chats.map((chat) => (
        <div
          key={chat.chatId}
          className={`max-w-[500px] w-fit border flex flex-col gap-1 py-1 px-4 mt-2 rounded-md ${chat.userId === userId ? "justify-self-end" : "justify-self-start"}`}
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
      {/* Empty div to mark the end of chat */}
      <div ref={chatEndRef} />
    </ScrollArea>
  );
}
