"use server";

import { classroomSchema } from "@/lib/zod/schemas";
import { classroomType } from "@/lib/zod/types";
import { prisma } from "@/db/connectDb";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { generateUniqueCode } from "@/lib/functions";

export async function createClassroom(classroomData: classroomType) {
  const session = await auth();
  if (!session || !session.user) {
    redirect("/login");
  }

  const zodRes = classroomSchema.safeParse(classroomData);
  if (!zodRes.success) {
    console.log(zodRes.error);
    return { success: false, message: "Invalid classroom data provided" };
  }

  try {
    const classroomId = await prisma.$transaction(async (tx) => {
      const newClassroom = await tx.classroom.create({
        data: {
          name: classroomData.name,
          description: classroomData.description,
          themeColor: classroomData.themeColor,
          code: await generateUniqueCode(8),
          createdById: session.user?.id as string,
        },
        select: { id: true },
      });

      await tx.enrollment.create({
        data: {
          classroomId: newClassroom.id,
          userId: session.user?.id as string,
          role: "Teacher",
        },
      });

      return newClassroom.id;
    });

    return {
      success: true,
      message: `Classroom created with id ${classroomId}`,
    };
  } catch (err) {
    console.log(`Error occured while creating a new classroom: ${err}`);
    return { success: false, message: "Error while classroom creation" };
  }
}
