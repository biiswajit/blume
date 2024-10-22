import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("mr-2", className)}>
      <span className="font-display font-bold text-2xl">Blume</span>
    </Link>
  );
}
