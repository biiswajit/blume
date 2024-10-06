import React, { ReactNode } from "react";
import { LoadingCircle } from "../icons";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  loading?: boolean;
  text?: ReactNode | string;
}

export function Button({
  icon,
  loading,
  text,
  ...props
}: ButtonProps): JSX.Element {
  return (
    <button
      disabled={loading ? true : false}
      {...props}
      className={`flex gap-2 justify-center ${loading ? "bg-blume-blue-0 text-blume-white-100 hover:cursor-not-allowed" : "bg-blume-blue-100 text-blume-white-0 hover:bg-blume-blue-100"} ring-2 ring-blume-blue-0 px-14 py-2 w-full font-body rounded-md`}
    >
      {loading ? <LoadingCircle fill="#000000" /> : icon}
      {text}
    </button>
  );
}
