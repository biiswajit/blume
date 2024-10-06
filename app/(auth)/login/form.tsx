"use client";

import { signin } from "@/lib/actions";
import { Button, Google, Github, Email } from "@/ui";
import { useState } from "react";

export function LoginForm() {
  const [authMethod, setAuthMethod] = useState<string | undefined>(undefined);
  const [email, setEmail] = useState<string | undefined>(undefined);

  return (
    <div className="flex flex-col gap-4 bg-white-50 px-5 sm:px-14 py-14 ring-1 ring-white-100 rounded-b-xl">
      <div className="flex flex-col gap-4">
        {
          // TODO: add a tooltip that pops up when user enter an invalid email
        }
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          disabled={authMethod === "resend"}
          className="w-full outline-none ring-2 ring-white-100 px-3 py-2 rounded-md focus:ring-black-100"
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
          icon={<Email className="w[-24px] h-[24px]" />}
          text="Continue with Email"
        />
      </div>

      <div className="my-2 flex flex-shrink items-center justify-center gap-2">
        <div className="grow basis-0 border-b" />
        <span className="text-xs font-normal uppercase leading-none">or</span>
        <div className="grow basis-0 border-b" />
      </div>

      <Button
        onClick={() => {
          setAuthMethod("google");
          signin("google");
        }}
        text="Continue with Google"
        icon={<Google className="w-[20px] h-[20px]" />}
        loading={authMethod === "google"}
      />
      <Button
        onClick={() => {
          setAuthMethod("github");
          signin("github");
        }}
        text="Continue with GitHub"
        icon={<Github className="w-[20px] h-[20px]" />}
        loading={authMethod === "github"}
      />
    </div>
  );
}
