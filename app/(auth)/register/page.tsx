import Link from "next/link";
import { RegisterForm } from "./form";
export const metadata = {
  title: `Join ${process.env.APP_NAME} | Effortless Registration for Online Learning & Collaboration`,
  description: `Register with ${process.env.APP_NAME} today! Create your free account to access our online classroom platform with video calls, group chat, rich text editing, progress tracking, and more. Sign up easily with Google or GitHub.`,
};

export default function LoginPage() {
  return <RegisterForm />;
}
