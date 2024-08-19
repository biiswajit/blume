import { PrismaClient } from "@prisma/client";

let prisma;

export default function getPrisma() {
  try {
    if (!prisma) {
      prisma = new PrismaClient();
    }
  }
  catch(err) {
    console.log(err);
  }

  return prisma;
}