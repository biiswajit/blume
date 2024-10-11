"use client";

import { signin } from "@/lib/actions";
import { Button, Google, Github, Email, Form } from "@/ui";
import { useState } from "react";

export function LoginForm() {
  const [authMethod, setAuthMethod] = useState<string | undefined>(undefined);
  const [email, setEmail] = useState<string | undefined>(undefined);

  return (
    <Form
      logo={true}
      title="Login to your account"
      linkURL="/register"
      linkText="Register"
    >
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        disabled={authMethod === "resend"}
        className="text-sm sm:text-base w-full outline-none ring-1 ring-blume-blue-0 px-3 py-2 rounded-md focus:ring-black-100"
        name="email"
        type="text"
        placeholder="yours@example.com"
      />
      <Button
        onClick={async () => {
          setAuthMethod("resend");
          // TODO: check whether the email is valid or not
          signin("resend", email);
        }}
        type="submit"
        loading={authMethod === "resend"}
        icon={<Email />}
        text="Continue with Email"
        className="text-sm sm:text-base"
      />

      <div className="my-2 flex flex-shrink items-center justify-center gap-2">
        <div className="grow basis-0 border-b border-blume-blue-0" />
        <span className="text-xs font-normal uppercase leading-none text-blume-blue-0">
          or
        </span>
        <div className="grow basis-0 border-b border-blume-blue-0" />
      </div>

      <Button
        onClick={() => {
          setAuthMethod("google");
          signin("google");
        }}
        text="Continue with Google"
        icon={<Google className="w-[20px] h-[20px]" />}
        loading={authMethod === "google"}
        className="text-sm sm:text-base"
      />
      <Button
        onClick={() => {
          setAuthMethod("github");
          signin("github");
        }}
        text="Continue with GitHub"
        icon={<Github className="w-[20px] h-[20px]" />}
        loading={authMethod === "github"}
        className="text-sm sm:text-base"
      />
    </Form>
  );
}
