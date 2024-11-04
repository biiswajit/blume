"use server";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/db/connectDb";

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

  const chats = await prisma.message.findMany({
    where: {
      discussionId,
    },
    select: {
      id: true,
      content: true,
      createdAt: true,
      userId: true,
      discussionId: true,
      user: {
        select: {
          name: true,
        },
      },
    },
  });

  const temp: Chat[] = [];
  chats.forEach((chat) => {
    temp.push({
      chatId: chat.id,
      message: chat.content as string,
      userId: chat.userId,
      userName: chat.user.name as string,
      upvotes: "0",
      sentAt: chat.createdAt.toString(),
      discussionId,
    });
  });

  return { success: true, message: temp };
}
