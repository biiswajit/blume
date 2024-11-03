"use client";
import { SidebarTrigger } from "@/ui/sidebar";
import { useEffect, useState } from "react";

export default function DiscussionPage({
  params,
}: {
  params: { discussionId: string };
}) {
  return (
    <div className="h-screen flex flex-col">
      <header className="p-4 flex items-center gap-4">
        <SidebarTrigger />
        <span className="text-xl">Discussion</span>
      </header>
      <div className="h-full flex flex-col md:flex-row md:flex-wrap content-start gap-4 p-4 overflow-y-auto">
        Hello, there
        {params.discussionId}
      </div>
    </div>
  );
}
