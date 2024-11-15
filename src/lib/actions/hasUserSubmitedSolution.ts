"use server";
import {prisma} from "@/db/connectDb";

export async function hasUserSubmittedSolution(userId: string, assignmentId: string): Promise<boolean> {
    const alreadySubmitted = await prisma.solution.findFirst({
        where: {
            assignmentId: assignmentId,
            userId: userId,
        },
    });

    return alreadySubmitted ? true : false;
}