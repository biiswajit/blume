"use server";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { sendTextMessage } from "@/lib/functions";

export async function sendChat(
  message: string,
  discussionId: string,
  ws: WebSocket,
): Promise<{ success: boolean; message: string }> {
  const session = await auth();
  if (!session || !session.user) {
    redirect("/login");
  }

  const userId = session.user.id;
  if (!userId) {
    return { success: false, message: "unable to find your session" };
  }

  console.log("current status of connection is", ws.readyState);
  if (ws.readyState === WebSocket.OPEN) {
    sendTextMessage(ws, userId, discussionId, message);
  }

  return { success: true, message: "sent message" };
}
