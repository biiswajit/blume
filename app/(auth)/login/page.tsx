import { LoginForm } from "./form";

export const metadata = {
  title: `Login to ${process.env.APP_NAME} | Access Your Online Classroom & Collaboration Tools`,
  description: `Log in to ${process.env.APP_NAME} to continue learning and collaborating with your team. Access video calls, group chat, rich text editing, progress tracking, and more. Sign in quickly with Google or GitHub.`,
};

export default function LoginPage() {
  return <LoginForm />;
}
