import { ReactNode } from "react";
import Link from "next/link";

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  logo?: boolean;
  title?: string;
  children: ReactNode;
  linkText?: string;
  linkURL?: string;
}

export function Form({
  logo,
  title,
  children,
  linkURL,
  linkText,
  ...props
}: FormProps) {
  return (
    <div className="px-4 py-8 sm:p-14 flex flex-col gap-14 rounded-xl shadow-lg border-4 border-blume-blue-0 bg-blume-white-0">
      {/* heading section of the form */}
      <div className="flex flex-col gap-3">
        {logo && (
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-blume-blue-100">
            Blume
          </h1>
        )}
        <p className="font-body leading-tight font-semibold text-lg sm:text-xl text-blume-black-0">
          {title}
        </p>
      </div>

      {/* main section of the form */}
      <div className="flex flex-col gap-4 mt-6">{children}</div>

      {/* footer section of the form */}
      <p className="text-center font-body text-blume-black-100 text-sm sm:text-base">
        {"Already have an account? "}
        <Link
          className="underline underline-offset-4 text-blume-blue-100 font-bold"
          href={linkURL}
        >
          {linkText}
        </Link>
      </p>
    </div>
  );
}
