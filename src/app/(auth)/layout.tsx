import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: `Authenticate - ${process.env.APP_NAME}`,
  description:
    "Access your account or sign up to get started with our platform.",
  keywords: "login, register, sign in, sign up, authentication, account access",
};

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-2xl font-display font-bold">
            Blume
          </div>
          <div className="hidden lg:block z-20 m-auto">
            <Image
              src="/images/authentication-light.png"
              width={1280}
              height={843}
              alt="Authentication"
              className="block dark:hidden rounded-md outline outline-8 outline-blume-blue-100"
            />
            <Image
              src="/images/authentication-dark.png"
              width={1280}
              height={843}
              alt="Authentication"
              className="hidden dark:block rounded-lg outline outline-8 outline-blume-blue-100"
            />
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex flex-col justify-center gap-10 space-y-6 w-[340px] sm:w-[380px]">
            {children}
            <p className="px-8 text-center text-sm text-muted-foreground justify-self-end">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
