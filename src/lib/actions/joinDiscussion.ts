"use server";
import { prisma } from "@/db/connectDb";
import RedisClient from "@/db/connectCache";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { sendJoinDiscussionMessage } from "@/lib/functions";
import { v4 as uuidv4 } from "uuid";

export async function joinDiscussion(
  discussionCode: string,
  classroomId: string,
): Promise<{
  success: boolean;
  message: { discussionId: string; conn: string | null } | null;
}> {
  const session = await auth();
  if (!session || !session.user) {
    redirect("/login");
  }

  const userId = session?.user?.id;
  const info = await prisma.enrollment.findFirst({
    where: {
      userId: userId,
      classroomId: classroomId,
    },
    select: {
      role: true,
      user: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!info) {
    console.error("can not find entry in db");
    return { success: false, message: null };
  }

  const userRole = info?.role;
  const userEmail = session?.user?.email;
  const userName = info?.user.name;

  // generate a session id
  const sessionId = uuidv4();
  console.log(sessionId);

  // store the sesssion info in redis
  const client = await RedisClient.getInstance();
  if (!client) {
    return { success: false, message: null };
  }
  const cacheRes = await client.hSet(`session:${sessionId}`, {
    discussionCode: discussionCode as string,
    userId: userId as string,
    role: userRole as string,
    email: userEmail as string,
    permission: "Nil",
    classroomId: classroomId,
  });
  if (!cacheRes || cacheRes <= 0) {
    console.error("error adding to redis");
    return { success: false, message: null };
  }

  try {
    const fetchRes = await fetch(`${process.env.BLUME_CHAT_URL_HTTP}/join`, {
      method: "POST",
      headers: {
        authorization: sessionId,
      },
    });

    if (!fetchRes.ok) {
      throw new Error("fetch failed with status" + fetchRes.status);
    }

    const data = await fetchRes.json();
    console.log(data);
    if (!data.success) {
      console.log("no its not a success");
      return {
        success: false,
        message: null,
      };
    }

    const ws = new WebSocket(process.env.BLUME_CHAT_URL_WS as string);
    if (ws.readyState === WebSocket.OPEN) {
      sendJoinDiscussionMessage(
        ws,
        userId as string,
        data.message,
        userName as string,
      );
    }
    console.log(data.message);
    return {
      success: true,
      message: { discussionId: data.message, conn: JSON.stringify(ws) },
    };
  } catch (err) {
    console.error("unable to fetch info from server", err);
    return {
      success: false,
      message: null,
    };
  }
}
