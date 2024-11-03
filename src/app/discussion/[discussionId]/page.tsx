"use client";
import { SidebarTrigger } from "@/ui/sidebar";
import { useEffect, useState } from "react";
import { Chats } from "./chats";
import { Write } from "./write";
import { useSession } from "next-auth/react";
import { sendJoinDiscussionMessage } from "@/lib/functions";

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

  return (
    <div className="h-screen flex flex-col">
      <header className="p-4 flex items-center gap-4">
        <SidebarTrigger />
        <span className="text-xl">Discussion:{params.discussionId}</span>
      </header>
      <div className="h-full flex flex-col md:flex-row md:flex-wrap content-start gap-4 p-4 overflow-y-auto">
        {ws ? (
          <>
            <Chats discussionId={params.discussionId} ws={ws} />
            <Write
              discussionId={params.discussionId}
              ws={ws}
              userId={session?.user?.id}
            />
          </>
        ) : (
          <>Connecting to websocket server..</>
        )}
      </div>
    </div>
  );
}
