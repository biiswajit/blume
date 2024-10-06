import GoogleProvider from "next-auth/providers/google";
import ResendProvider from "next-auth/providers/resend";
import GithubProvider from "next-auth/providers/github";
import { Provider } from "next-auth/providers";

const providers: Provider[] = [
  GoogleProvider({
    clientId: process.env.AUTH_GOOGLE_ID,
    clientSecret: process.env.AUTH_GOOGLE_SECRET,
    allowDangerousEmailAccountLinking: true,
  }),
  GithubProvider({
    clientId: process.env.AUTH_GITHUB_ID,
    clientSecret: process.env.AUTH_GITHUB_SECRET,
    allowDangerousEmailAccountLinking: true,
  }),
  ResendProvider({
    apiKey: process.env.AUTH_RESEND_KEY,
    from: process.env.EMAIL_FROM,
  }),
  // TODO: add microsoft provider here
  // TODO: add apple provider here
];

export default providers;
