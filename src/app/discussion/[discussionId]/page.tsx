"use client";
import { SidebarTrigger } from "@/ui/sidebar";
import { useEffect, useState } from "react";
import { Chats } from "./chats";
import { Write } from "./write";
import { useSession } from "next-auth/react";
import { sendJoinDiscussionMessage } from "@/lib/functions";
import { fetchPreviousChats, Chat } from "@/lib/actions";

export default function DiscussionPage({
  params,
}: {
  params: { discussionId: string };
}) {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");
    socket.onopen = () => {
      console.log("Client is connected!");
      if (!session?.user?.id) {
        return;
      }
      sendJoinDiscussionMessage(
        socket,
        session?.user?.id,
        params.discussionId,
        "Biswajit Malakar",
      );
      setWs(socket);
    };
  }, []);

  if (!ws) {
    return <div>Connecting to websocket server</div>;
  }

  return (
    <div className="h-screen flex flex-col">
      <header className="p-4 flex items-center gap-4">
        <SidebarTrigger />
        <span className="text-xl">Discussion:{params.discussionId}</span>
      </header>
      <div className="h-[90%] flex flex-col gap-5 py-4 px-5">
        <div className="w-full h-full overflow-y-hidden">
          <Chats
            discussionId={params.discussionId}
            ws={ws}
            userId={session?.user?.id as string}
          />
        </div>
        <div className="h-fit">
          <Write
            discussionId={params.discussionId}
            ws={ws}
            userId={session?.user?.id}
          />
        </div>
      </div>
    </div>
  );
}
