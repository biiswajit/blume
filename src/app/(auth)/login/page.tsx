"use client";

import { useState } from "react";
import { Icons } from "@/ui/icons";
import { Button } from "@/ui/button";
import { Label } from "@/ui/label";
import { Input } from "@/ui/input";
import { signin } from "@/lib/actions";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [method, setMethod] = useState<
    "google" | "github" | "resend" | undefined
  >();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back!</h1>
        <p className="text-sm text-muted-foreground">
          Glad to see you again. Log in to continue.
        </p>
      </div>
      <Label htmlFor="email">Email</Label>
      <Input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        id="email"
        placeholder="name@example.com"
        type="email"
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect="off"
        disabled={method === "resend"}
      />
      <Button
        disabled={method === "resend"}
        onClick={() => {
          setMethod("resend");
          signin("resend", email);
        }}
      >
        {method === "resend" ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.email className="mr-2 h-4 w-4" />
        )}{" "}
        Continue with Email
      </Button>
      <div className="my-2 flex flex-shrink items-center justify-center gap-2">
        <div className="grow basis-0 border-b" />
        <span className="text-xs font-normal uppercase leading-none">or</span>
        <div className="grow basis-0 border-b" />
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
        Do not have an account?{" "}
        <Link
          className="underline underline-offset-4 hover:text-primary"
          href="/register"
        >
          Register
        </Link>
        .
      </p>
    </div>
  );
}
