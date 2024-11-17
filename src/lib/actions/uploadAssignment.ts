"use server";
import { v4 as uuidv4 } from "uuid";
import { s3, PutObjectCommand } from "@/db/connectS3";
import { prisma } from "@/db/connectDb";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { assignmentSchema } from "../zod/schemas";
import { assignmentType } from "../zod/types";

export async function uploadAssignment(formData: FormData) {
  const session = await auth();
  if (!session || !session.user) {
    redirect("/login");
  }

  const name = formData.get("name") as string;
  const description = formData.get("description") as string | undefined | null;
  const file = formData.get("file") as File;
  const dueDate = formData.get("dueDate") as string;
  const classroomId = formData.get("classroomId") as string;

  const assignmentData: Record<string, any> = {
    name,
    file,
    dueDate,
    classroomId,
  };
  if (description) {
    assignmentData.description = description;
  }

  const zodRes = assignmentSchema.safeParse(assignmentData);
  if (!zodRes.success) {
    console.log(zodRes.error);
    return { success: false, message: "Invalid assignment data provided" };
  }

  const userInfo = await prisma.enrollment.findFirst({
    where: {
      userId: session.user.id,
      classroomId: classroomId,
    },
    select: {
      role: true,
    }
  });

  if (!userInfo || userInfo.role === "Student") {
    return {success: false, message: "Students are not allowed to uplaod assignemnts"}
  }

  const fileKey = uuidv4();
  const buffer = Buffer.from(await file.arrayBuffer());

  try {
    const command = new PutObjectCommand({
      Bucket: process.env.S3_ASSIGNMENTS_BUCKET,
      Key: fileKey,
      Body: buffer,
      ContentType: file.type,
    });
    await s3.send(command);

    const fileUrl =
      process.env.NODE_ENV === "development"
        ? `http://s3.localhost.localstack.cloud:4566/${process.env.S3_ASSIGNMENTS_BUCKET}/${fileKey}`
        : `https://${process.env.S3_ASSIGNMENTS_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;

    await prisma.assignment.create({
      data: {
        name: name,
        description: description,
        dueDate: new Date(dueDate),
        classroomId: classroomId,
        file: fileUrl,
      },
    });

    return { success: true, message: "Assignment upload successfull" };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Error while uploading assignment" };
  }
}
