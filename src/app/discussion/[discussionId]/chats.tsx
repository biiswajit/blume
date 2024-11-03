"use client";
import { useState, useEffect } from "react";
import { fetchPreviousChats, Chat } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";
import { Write } from "./write";
import { useSession } from "next-auth/react";

export function Chats({
  discussionId,
  ws,
}: {
  discussionId: string;
  ws: WebSocket;
}) {
  const { toast } = useToast();
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    ws.onmessage = (message) => {
      if (message.data) {
        setChats((prev) => [...prev, JSON.parse(message.data)]);
      }
    };
  }, []);

  if (!chats) {
    return <div>No previous chats</div>;
  }

  return (
    <div>
      <div className="flex flex-col gap-4">
        {chats.map((chat) => (
          <div key={chat.id}>{JSON.stringify(chat)}</div>
        ))}
      </div>
    </div>
  );
}
