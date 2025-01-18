"use server";
import { prisma } from "@/db/connectDb";

export async function checkSubmission(assignmentId: string, user: string) {
  console.log("called!" + assignmentId);
  try {
    const res = await prisma.assignment.findFirst({
      where: {
        id: assignmentId,
      },
      select: {
        solutions: true,
      },
    });

    const ans = res?.solutions.filter(({ userId }) => userId == user);

    console.log(res);
    if (ans && ans.length > 0) {
      return {
        success: true,
        data: {
          file: ans[0].file,
          feedback: ans[0].feedback,
          mark: ans[0].obtainMark,
        },
      };
    } else {
      return {
        success: false,
        data: null,
      };
    }
  } catch (e) {
    return {
      success: false,
      data: null,
    };
  }
}
