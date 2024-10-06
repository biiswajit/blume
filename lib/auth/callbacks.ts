import { prisma } from "@/db/connectDb";
import { JWT } from "next-auth/jwt";
import { Account, Profile, User } from "next-auth";

export async function signin(
  user: User,
  account: Account | null,
  profile: Profile | undefined,
) {
  if (!user.email) {
    return false;
  }

  // TODO: check is the user blocklisted

  if (account?.provider === "google" || account?.provider === "github") {
    const existingUser = await prisma.user.findUnique({
      where: { email: user.email },
      select: { id: true, name: true, image: true },
    });

    if (!existingUser) {
      return true;
    }

    if (existingUser && !existingUser.image) {
      // TODO: upload the image into S3 and get the url
      const imgUrl = user.image; // TODO: update this with the url of S3
      await prisma.user.update({
        where: { id: existingUser.id },
        data: { image: imgUrl, name: user.name },
      });
    }
  }

  return true;
}

export async function jwt(
  token: JWT,
  user: User,
  trigger: "update" | "signIn" | "signUp" | undefined,
) {
  if (user) {
    token.user = user;
  }

  if (trigger === "update") {
    const updatedUser = await prisma.user.findUnique({
      where: { id: token.sub },
      select: {
        id: true,
        image: true,
        name: true,
        email: true,
        updatedAt: true,
        createdAt: true,
      },
    });
    if (updatedUser) {
      token.user = updatedUser;
    } else {
      return {};
    }
  }

  return token;
}
