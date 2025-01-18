"use server";
import { prisma } from "@/db/connectDb";

export async function sendFeedback(
  solutionId: string,
  mark: string,
  feedback: string,
  assignmentMark: string,
) {
  if (!solutionId) {
    return { success: false, message: "Provide solution id" };
  }

  let obtainMark: number = 0;
  let totalMark: number = 0;
  try {
    obtainMark = parseInt(mark);
    totalMark = parseInt(assignmentMark);
  } catch (e) {
    return { success: false, message: "Invalid mark given" };
  }

  if (totalMark < obtainMark) {
    return {
      success: false,
      message: "Obtain mark has to be less or equal than total mark",
    };
  }

  try {
    await prisma.solution.update({
      where: {
        id: solutionId,
      },
      data: {
        obtainMark: obtainMark,
        feedback: feedback,
      },
    });
  } catch (e) {
    console.log(e);
    return { success: false, message: "Facing some internal problem" };
  }

  return { success: true, message: "Feedback is given successfully" };
}
