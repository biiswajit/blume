import { prisma } from "@/db/connectDb";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session || !session.user) {
    redirect("/login");
  }

  const searchParams = req.nextUrl.searchParams;
  const classroomId = searchParams.get("id");

  if (!classroomId || typeof classroomId !== "string") {
    return Response.json({ message: "Invalid or missing classroom ID" });
  }

  const classroomDetails = await prisma.classroom.findUnique({
    where: {
      id: classroomId as string,
    },
    select: {
      name: true,
      description: true,
      themeColor: true,
      code: true,
      size: true,
      createdBy: {
        select: {
          name: true,
          email: true,
          image: true,
        },
      },
      createdAt: true,
      enrollments: {
        select: {
          user: {
            select: {
              name: true,
              email: true,
              image: true,
            },
          },
          joinedAt: true,
          role: true,
        },
      },
    },
  });

  return Response.json(classroomDetails);
}
