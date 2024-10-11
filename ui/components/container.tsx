import { ReactNode } from "react";

export function FormContainer({
  children,
  terms,
}: {
  children: ReactNode;
  terms?: boolean;
}) {
  return (
    <div className="py-20 mx-3 md:mx-0 flex flex-col gap-14 justify-between h-screen overflow-y-scroll scrollbar-hide bg-blume-white-100 outline-dashed outline-1 outline-blume-gray-25">
      {/* main registration form */}
      {children}

      {/* terms and conditions */}
      {terms && (
        <p className="text-sm text-blume-gray-100 text-center font-body">
          On continue, you agree to our <br />
          <a
            href=""
            className="font-semibold underline underline-offset-4 text-blume-blue-100"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href=""
            className="font-semibold underline underline-offset-4 text-blume-blue-100"
          >
            Privacy Policy
          </a>
        </p>
      )}
    </div>
  );
}
