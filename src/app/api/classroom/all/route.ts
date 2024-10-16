import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db/connectDb";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

// TODO: The entire route is not that protected!
// Increase the protection by adding extra checks like rate limiting, and other edge checking
// Also use Redis to not hit the database all the time
export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session || !session.user) {
    redirect("/login");
  }

  const classrooms = await prisma.enrollment.findMany({
    where: {
      userId: session.user.id,
    },
    select: {
      classroom: {
        select: {
          id: true,
          name: true,
          description: true,
          themeColor: true,
          createdBy: {
            select: {
              name: true,
              image: true,
            },
          },
          createdAt: true,
        },
      },
      joinedAt: true,
      role: true,
    },
  });

  return Response.json(classrooms);
}
