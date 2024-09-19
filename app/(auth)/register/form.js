"use client";

import { Button, Google, Github } from "@/ui";
import { signin } from "@/lib/actions";
import { useState } from "react";

export function RegisterForm() {
  const [authMethod, setAuthMethod] = useState();

  return (
    <div className="flex flex-col gap-4 bg-white-50 px-5 sm:px-14 py-14 ring-1 ring-white-100 rounded-b-xl">
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
      {
        // TODO: update the T&C links
      }
      <p className="text-sm text-black-0 text-center mt-4 font-default">
        On register, you agree to our <br />
        <a href="" className="font-semibold underline underline-offset-4">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="" className="font-semibold underline underline-offset-4">
          Privacy Policy
        </a>
      </p>
    </div>
  );
}
