"use server";

import { classroomJoinType } from "../zod/types";
import { classroomJoinSchema } from "../zod/schemas";
import { prisma } from "@/db/connectDb";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

// TODO: use shared link to join the classroom
export async function joinClassroom(code: classroomJoinType) {
  const session = await auth();
  if (!session || !session.user) redirect("/login");

  const zodRes = classroomJoinSchema.safeParse(code);
  if (!zodRes.success) {
    console.log(zodRes.error);
    return { success: false, message: "Not a valid classroom code" };
  }

  const classroom = await prisma.classroom.findUnique({
    where: {
      code: code,
    },
    select: {
      id: true,
    },
  });

  if (!classroom || !classroom.id) {
    return { success: false, message: "Classroom not found" };
  }

  try {
    //TODO: send class teacher / creator an email requesting let current user to join the classroom
    //TIPS: maybe add a status field in enrollment table make it pending when teacher accept the request make status enrolled
    //      in case of sending email make it a transaction first send the email if email sent then add user to enrollemnt as pending
    const joinedClassroom = await prisma.enrollment.create({
      data: {
        userId: session.user.id as string,
        classroomId: classroom.id,
        role: "Student",
      },
      select: {
        classroomId: true,
      },
    });

    //TODO: redirect the user to the classroom
    return {
      success: true,
      message: "You're successfully joined as a student",
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Error while joining you to the classroom",
    };
  }
}
