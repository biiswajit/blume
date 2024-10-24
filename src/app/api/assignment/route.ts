import { prisma } from "@/db/connectDb";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session || !session.user) {
    redirect("/login");
  }

  const searchParams = req.nextUrl.searchParams;
  const assignmentId = searchParams.get("id");

  if (!assignmentId || typeof assignmentId !== "string") {
    return Response.json({ message: "Invalid or missing classroom ID" });
  }

  const assignmentDetails = await prisma.assignment.findUnique({
    where: {
      id: assignmentId,
    },
    select: {
      id: true,
      name: true,
      description: true,
      dueDate: true,
      createdAt: true,
      file: true,
      classroom: {
        select: {
          name: true,
        },
      },
    },
  });

  return Response.json(assignmentDetails);
}
