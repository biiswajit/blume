"use server";
import { v4 as uuidv4 } from "uuid";
import { s3, PutObjectCommand } from "@/db/connectS3";
import { prisma } from "@/db/connectDb";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { solutionSchema } from "../zod/schemas";
import { solutionType } from "../zod/types";

export async function uploadSolution(formData: FormData) {
  const session = await auth();
  if (!session || !session.user) {
    redirect("/login");
  }

  const userId = session.user.id;
  const assignmentId = formData.get("assignmentId") as string;
  const file = formData.get("file") as File;

  const zodRes = solutionSchema.safeParse({
    userId,
    assignmentId,
    file,
  });
  if (!zodRes.success) {
    console.log(zodRes.error);
    return { success: false, message: "Invalid assignment data provided" };
  }

  const fileKey = uuidv4();
  const buffer = Buffer.from(await file.arrayBuffer());

  try {
    const command = new PutObjectCommand({
      Bucket: process.env.S3_SOLUTIONS_BUCKET,
      Key: fileKey,
      Body: buffer,
      ContentType: file.type,
    });
    await s3.send(command);

    const fileUrl: string =
      process.env.NODE_ENV === "development"
        ? `http://s3.localhost.localstack.cloud:4566/${process.env.S3_SOLUTIONS_BUCKET}/${fileKey}`
        : `https://${process.env.S3_SOLUTIONS_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;

    await prisma.solution.create({
      data: {
        file: fileUrl,
        userId: userId as string,
        assignmentId: assignmentId as string,
      },
    });

    return { success: true, message: "Solution uploaded successfull" };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Error while uploading solution" };
  }
}
