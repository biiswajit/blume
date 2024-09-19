import { LoginForm } from "./form";
import Link from "next/link";
import { LoginTitle } from "./title";

export const metadata = {
  title: `Login to ${process.env.APP_NAME} | Access Your Online Classroom & Collaboration Tools`,
  description: `Log in to ${process.env.APP_NAME} to continue learning and collaborating with your team. Access video calls, group chat, rich text editing, progress tracking, and more. Sign in quickly with Google or GitHub.`,
};

export default function LoginPage() {
  return (
    <div>
      <LoginTitle />
      <LoginForm />
      <p className="text-center mt-6 font-default text-black-0 text-md">
        {"Don't have an account? "}
        <Link
          className="underline underline-offset-4 font-semibold"
          href="/register"
        >
          Register
        </Link>
      </p>
    </div>
  );
}
