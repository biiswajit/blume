"use client";

import { Button, Google, Github, Form } from "@/ui";
import { signin } from "@/lib/actions";
import { useState } from "react";

export function RegisterForm() {
  const [authMethod, setAuthMethod] = useState<string | undefined>();

  return (
    <Form
      logo={true}
      title="Create your account for free"
      linkURL="/login"
      linkText="Login"
    >
      <Button
        className="text-sm sm:text-base"
        onClick={() => {
          setAuthMethod("google");
          signin("google");
        }}
        text="Continue with Google"
        icon={<Google className="w-[20px] h-[20px]" />}
        loading={authMethod === "google"}
      />
      <Button
        className="text-sm sm:text-base"
        onClick={() => {
          setAuthMethod("github");
          signin("github");
        }}
        text="Continue with GitHub"
        icon={<Github className="w-[20px] h-[20px]" />}
        loading={authMethod === "github"}
      />
    </Form>
  );
}
