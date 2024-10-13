"use client";

import { useState } from "react";
import { Icons } from "@/ui/icons";
import { Button } from "@/ui/button";
import { signin } from "@/lib/actions";
import Link from "next/link";

export default function Register() {
  const [method, setMethod] = useState<"google" | "github" | undefined>();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Join us today</h1>
        <p className="text-sm text-muted-foreground">
          It only takes a few moments to get started.
        </p>
      </div>
      <Button
        variant="outline"
        type="button"
        disabled={method === "github"}
        onClick={() => {
          setMethod("github");
          signin("github");
        }}
      >
        {method === "github" ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{" "}
        Continue with Github
      </Button>
      <Button
        variant="outline"
        type="button"
        disabled={method === "google"}
        onClick={() => {
          setMethod("google");
          signin("google");
        }}
      >
        {method === "google" ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{" "}
        Continue with Google
      </Button>
      <p className="px-8 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          className="underline underline-offset-4 hover:text-primary"
          href="/login"
        >
          Login
        </Link>
        .
      </p>
    </div>
  );
}
