"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/ui/navigation-menu";
import React from "react";
import { features } from "@/lib/constants";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/ui/accordion";
import { Separator } from "@/ui/separator";
import { ScrollArea } from "@/ui/scroll-area";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Logo } from "@/ui/logo";

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="px-6 py-2 lg:px-20 hidden lg:flex justify-between border-b">
      <nav className="flex items-center gap-2 text-sm lg:gap-4">
        <Logo />
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/"
                      >
                        <div className="mb-2 mt-4 text-lg font-medium">
                          Blume
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Blume enhances virtual learning with video calls,
                          group chat, progress tracking, rich text editing, and
                          a built-in chatbot for seamless collaboration and
                          support.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <ListItem href="/docs" title="Introduction">
                    A collaborative and engaging online learning environment.
                  </ListItem>
                  <ListItem href="/docs/tech" title="Technologies">
                    Blume is built with a modern technology stack.
                  </ListItem>
                  <ListItem href="/docs/members" title="Team">
                    Meet the dedicated team behind Blume
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Features</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {features.map((feature) => (
                    <ListItem
                      key={feature.title}
                      title={feature.title}
                      href={feature.href}
                    >
                      {feature.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <Link
          href="/docs/pricing"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/docs/components") &&
              !pathname?.startsWith("/docs/component/chart")
              ? "text-foreground"
              : "text-foreground/60",
          )}
        >
          Pricing
        </Link>
        <Link
          href="/docs/opensource"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/blocks")
              ? "text-foreground"
              : "text-foreground/60",
          )}
        >
          Open Source
        </Link>
      </nav>
      <nav className="flex items-center gap-2 text-sm lg:gap-4">
        <Button asChild>
          <Link href="/login">Login</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/register">Register</Link>
        </Button>
        <ThemeToggle />
      </nav>
    </div>
  );
}

export function MobileNav() {
  const pathname = usePathname();

  return (
    <div className="px-8 py-2 lg:hidden flex justify-between border-b">
      <Link href="/" className="mr-2 flex items-center space-x-2">
        <span className="font-display font-bold text-2xl">Blume</span>
      </Link>
      <Sheet>
        <SheetTrigger>
          <HamburgerMenuIcon className="h-5 w-5" />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetDescription className="mt-10 text-start">
              <ScrollArea className="h-[80vh]">
                <div className="flex flex-col gap-4">
                  <Button asChild>
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/register">Register</Link>
                  </Button>
                </div>
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="hover:no-underline text-2xl font-normal">
                      Getting started
                    </AccordionTrigger>
                    <AccordionContent>
                      <Link href="/docs" className="text-xl">
                        Introduction
                      </Link>
                    </AccordionContent>
                    <AccordionContent>
                      <Link href="/docs/tech" className="text-xl">
                        Tech
                      </Link>
                    </AccordionContent>
                    <AccordionContent>
                      <Link href="/docs/team" className="text-xl">
                        Team
                      </Link>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="hover:no-underline text-2xl font-normal">
                      Features
                    </AccordionTrigger>
                    {features.map((feature) => (
                      <AccordionContent key={feature.title}>
                        <Link href={feature.href} className="text-xl">
                          {feature.title}
                        </Link>
                      </AccordionContent>
                    ))}
                  </AccordionItem>
                </Accordion>
                <div className="flex flex-col gap-4 mt-4">
                  <Link href="/docs/pricing" className="text-2xl">
                    Pricing
                  </Link>
                  <Link href="/docs/opensource" className="text-2xl">
                    Open Source
                  </Link>
                  <Separator />
                  <ThemeToggle />
                </div>
              </ScrollArea>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
