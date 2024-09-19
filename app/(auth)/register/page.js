import { RegisterForm } from "./form";
import { RegisterTitle } from "./title";
import Link from "next/link";

export const metadata = {
  title: `Join ${process.env.APP_NAME} | Effortless Registration for Online Learning & Collaboration`,
  description: `Register with ${process.env.APP_NAME} today! Create your free account to access our online classroom platform with video calls, group chat, rich text editing, progress tracking, and more. Sign up easily with Google or GitHub.`,
};

export default function LoginPage() {
  return (
    <div>
      <RegisterTitle />
      <RegisterForm />
      <p className="text-center mt-6 font-default text-black-0 text-md">
        {"Already have an account? "}
        <Link
          className="underline underline-offset-4 font-semibold"
          href="/login"
        >
          Login
        </Link>
      </p>
    </div>
  );
}
