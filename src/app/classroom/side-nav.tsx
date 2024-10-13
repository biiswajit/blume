import * as React from "react";
import { CreateClassroom } from "./create";
import { JoinClassroom } from "./join";
import { Separator } from "@/ui/separator";
import { ScrollArea } from "@/ui/scroll-area";
import { Button } from "@/ui/button";

export function ScrollAreaDemo() {
  return (
    <ScrollArea className="h-[calc(100vh-57px)] w-56 border-r">
      <div className="p-5 flex flex-col gap-3">
        <CreateClassroom />
        <JoinClassroom />
        <Separator className="my-2" />
      </div>
    </ScrollArea>
  );
}
