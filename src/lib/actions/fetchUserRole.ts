"use server";
import {prisma} from "@/db/connectDb";

export async function fetchUserRole(userId: string, classroomId: string): Promise<"Teacher" | "Student" | null>  {
    const userInfo = await prisma.enrollment.findFirst({
        where: {
            userId: userId,
            classroomId: classroomId,
        },
        select: {
            role: true,
        }
    });

    if (userInfo && userInfo.role) return userInfo.role;
    return null;
}
