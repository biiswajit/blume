"use server";
import { prisma } from "@/db/connectDb";
import { parseDate } from "../functions";

export type Discussion = {
  discussionId: string;
  discussionName: string;
  createdAt: string;
  creator: {
    name: string | null;
    email: string;
  };
  code: string;
};

export async function fetchDiscussions(
  classroomId: string,
): Promise<Discussion[]> {
  const res = await prisma.classroom.findMany({
    where: {
      id: classroomId,
    },
    select: {
      discussions: {
        select: {
          id: true,
          name: true,
          createdAt: true,
          createdBy: {
            select: {
              name: true,
              email: true,
            },
          },
          code: true,
        },
      },
    },
  });

  if (!res) {
    return [];
  }

  const finalRes: Discussion[] = [];
  res[0].discussions.forEach((data) => {
    finalRes.push({
      discussionId: data.id,
      discussionName: data.name,
      createdAt: parseDate(data.createdAt.toString()),
      code: data.code,
      creator: {
        name: data.createdBy.name,
        email: data.createdBy.email,
      },
    });
  });

  return finalRes;
}
