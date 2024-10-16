"use server";

import { signIn } from "@/lib/auth";

export async function signin(
  method: "google" | "github" | "resend",
  email?: string,
) {
  try {
    if (method === "resend") {
      await signIn(method, { email: email, callbackUrl: "/classroom" }); // TODO: redirect the user to home
    } else {
      await signIn(method, { redirectTo: "/classroom" }); // TODO: redirect the user to home
    }
  } catch (err) {
    throw err;
  }
}
