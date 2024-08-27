import NextAuth from "next-auth";
import getPrisma from "@/db/connectDb";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import Resend from "next-auth/providers/resend";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  adapter: PrismaAdapter(getPrisma()),
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    Google,
    Github,
    Resend({
      from: process.env.EMAIL_FROM
    })
  ]
})