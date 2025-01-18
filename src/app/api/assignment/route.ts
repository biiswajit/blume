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
  const userId = session.user.id;

  if (!assignmentId || typeof assignmentId !== "string") {
    return Response.json({ message: "Invalid or missing classroom ID" });
  }

  const assignmentMetadata = await prisma.assignment.findUnique({
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
      classroomId: true,
      mark: true,
    },
  });

  const userRole = await prisma.enrollment.findFirst({
    where: {
      classroomId: assignmentMetadata?.classroomId as string,
      userId: userId as string,
    },
    select: {
      role: true,
    },
  });

  let solutions;
  let solution;
  if (userRole?.role === "Teacher") {
    solutions = await prisma.assignment.findUnique({
      where: {
        id: assignmentId,
      },
      select: {
        solutions: {
          select: {
            id: true,
            file: true,
            createdAt: true,
            user: {
              select: {
                name: true,
                email: true,
                image: true,
              },
            },
          },
        },
      },
    });
  } else {
    solution = await prisma.solution.findFirst({
      where: {
        assignmentId: assignmentId,
      },
      select: {
        file: true,
        createdAt: true,
        id: true,
      },
    });
  }

  const responseObject = {
    id: assignmentMetadata?.id,
    name: assignmentMetadata?.name,
    description: assignmentMetadata?.description,
    dueDate: assignmentMetadata?.dueDate,
    createdAt: assignmentMetadata?.createdAt,
    file: assignmentMetadata?.file,
    mark: assignmentMetadata?.mark,
    solutions:
      solutions && solutions.solutions
        ? [...solutions.solutions]
        : [{ ...solution }],
  };
  return Response.json(responseObject);
}
