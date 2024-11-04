"use server";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export type Chat = {
  chatId: string;
  message: string;
  userId: string;
  userName: string;
  upvotes: string;
  sentAt: string;
  discussionId: string;
};

export async function fetchPreviousChats(
  discussionId: string,
): Promise<{ success: boolean; message: Chat[] | null }> {
  const session = await auth();
  if (!session || !session.user) {
    redirect("/login");
  }

  try {
    const res = await fetch(`${process.env.BLUME_CHAT_URL_HTTP}/chats`, {
      method: "POST",
      headers: {
        discussionId,
      },
    });

    if (!res.ok) {
      return { success: false, message: null };
    }

    const data = await res.json();
    return { success: true, message: data.message };
  } catch (err) {
    console.error("there is an error: ", err);
    return {
      success: false,
      message: null,
    };
  }
}
