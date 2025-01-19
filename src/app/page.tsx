import { MainNav, MobileNav } from "@/ui/navbar";
import LandingPage from "./landing";

export default function HomePage() {
  return (
    <div>
      <MainNav />
      <MobileNav />
      <LandingPage />
    </div>
  );
}
