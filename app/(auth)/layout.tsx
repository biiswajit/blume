import React from "react";
import { FormContainer } from "@/ui";

export default function AuthLayout({ children }) {
  return (
    <div className="w-screen h-screen">
      <div className="grid place-content-center">
        <FormContainer terms={true}>{children}</FormContainer>
      </div>
    </div>
  );
}
