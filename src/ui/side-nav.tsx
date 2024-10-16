"use client";
import { useSession } from "next-auth/react";
import React, { ReactNode } from "react";
import { ScrollArea } from "@/ui/scroll-area";
import { Button } from "@/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";
import Link from "next/link";
import { PanelRight, UserIcon, LogInIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, createContext, useContext } from "react";
import { ThemeToggle } from "@/ui/theme-toggle";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import { Logout } from "@/app/(auth)/logout";

const SidebarContext = createContext(false);

export function MainSideNav({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  const [expanded, setExpanded] = useState<boolean>(true);

  return (
    <aside className="hidden lg:block w-fit max-w-64 border-r">
      <nav
        className={`${expanded ? "px-4 py-4" : "px-1 py-4"} flex flex-col justify-between h-full gap-3`}
      >
        <div className="flex justify-around items-center">
          <span
            className={`text-2xl font-display font-bold overflow-hidden transition-all ${expanded ? "block" : "hidden"}`}
          >
            Blume
          </span>
          <PanelRight onClick={() => setExpanded((curr) => !curr)} />
        </div>
        <ScrollArea className="w-full h-[70vh]">
          <SidebarContext.Provider value={expanded}>
            <ul className="flex flex-col gap-4">{children}</ul>
          </SidebarContext.Provider>
        </ScrollArea>
        <div className="border-t pt-4 flex flex-col gap-4">
          <ThemeToggle />
          {session?.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="flex justify-start gap-1 items-center">
                  <Avatar>
                    <AvatarImage src={`${session.user.image}`} />
                    <AvatarFallback>
                      <UserIcon />
                    </AvatarFallback>
                  </Avatar>
                  <span
                    className={`text-sm hidden lg:block overflow-x-hidden transition-all ${expanded ? "max-w-20" : "w-0"}`}
                  >
                    {session.user.name}
                  </span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
                <DropdownMenuItem>Enrolled</DropdownMenuItem>
                <DropdownMenuItem>Teaching</DropdownMenuItem>
                <DropdownMenuLabel>
                  <Logout />
                </DropdownMenuLabel>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild>
              <Link href="/login">
                <LogInIcon />
                <span className={`px-1 ${expanded ? "block" : "hidden"}`}>
                  Login
                </span>
              </Link>
            </Button>
          )}
        </div>
      </nav>
    </aside>
  );
}

interface SideNavItemProps extends React.LiHTMLAttributes<HTMLLinkElement> {
  icon?: ReactNode;
  text?: ReactNode | string;
  className?: string;
  active?: boolean;
}

export function SideNavItem({
  icon,
  text,
  className,
  active = false,
  ...props
}: SideNavItemProps) {
  const expanded = useContext(SidebarContext);
  return (
    <li
      className={cn(
        `relative py-2 justify-center flex gap-1 items-center rounded-md cursor-pointer ${active ? "bg-primary text-primary-foreground" : "border border-primary"}`,
        className,
      )}
    >
      {icon}
      <span className={`px-1 ${expanded ? "block" : "hidden"}`}>{text}</span>
    </li>
  );
}
