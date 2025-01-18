"use server";
import { prisma } from "@/db/connectDb";

export async function fetchFeedback(solutionId: string) {
  let res: any;
  try {
    res = await prisma.solution.findFirst({
      where: {
        id: solutionId,
      },
      select: {
        obtainMark: true,
        feedback: true,
      },
    });
  } catch (e) {
    return null;
  }

  return {
    mark: res.obtainMark,
    feedback: res.feedback,
  };
}
