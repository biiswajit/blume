"use server";
import { prisma } from "@/db/connectDb";

export async function clearExpiredTokens() {
  try {
    await prisma.verificationToken.deleteMany({
      where: { expires: { lt: new Date(Date.now()) } },
    });
  } catch (err) {
    console.log(err);
  }
}
