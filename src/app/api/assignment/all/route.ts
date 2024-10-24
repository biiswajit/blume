import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/db/connectDb";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session || !session.user) {
    redirect("/login");
  }

  const searchParams = req.nextUrl.searchParams;
  const classroomId = searchParams.get("classroomId");

  try {
    const assignments = await prisma.classroom.findMany({
      where: {
        id: classroomId as string,
      },
      select: {
        assignments: {
          select: {
            name: true,
            dueDate: true,
            description: true,
            id: true,
            createdAt: true,
          },
        },
      },
    });

    return Response.json(assignments[0].assignments);
  } catch (err) {
    console.log(err);
    return Response.json(null);
  }
}
