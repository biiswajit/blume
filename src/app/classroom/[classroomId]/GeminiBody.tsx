"use client";
import React, { useContext } from "react";
import { SendHorizontal } from "lucide-react";
import { Context } from "./ContextProvider";
import Image from "next/image";
import { Button } from "@/ui/button";
import { SendIcon } from "lucide-react";
import { ScrollArea } from "@/ui/scroll-area";

const GeminiBody = () => {
  const {
    submit,
    recentPrompts,
    displayResult,
    loading,
    result,
    input,
    setInput,
  } = useContext(Context);

  console.log(loading, "loading");
  console.log(result);
  return (
    <div className="h-[750px] flex flex-col gap-5 py-4 px-5 lg:mx-40">
      <div className="w-full h-full overflow-y-hidden">
        <ScrollArea className="h-[620px] w-full rounded-md border py-4 px-6 bg-sidebar">
          {!displayResult ? (
            <>
              <div className="my-12 text-2xl font-medium p-6">
                <p>
                  <span className=" bg-clip-text">Hello,</span>
                </p>
                <p>
                  This is Akari, Your personal virtual assistant. How can I help
                  you ?
                </p>
              </div>
            </>
          ) : (
            <div className="result">
              <div className="my-10 flex items-center gap-5">
                <p>{recentPrompts}</p>
              </div>
              <div className="flex items-start gap-5">
                <Image
                  src="/images/image.png"
                  alt=""
                  width={45}
                  height={100}
                  className="rounded-full"
                />
                <p
                  className="text-md font-normal loading-6 text-gray-400"
                  dangerouslySetInnerHTML={{ __html: result }}
                ></p>
              </div>
            </div>
          )}
        </ScrollArea>
        <div className="my-8">
          <form action={submit} className="flex gap-4 lg:w-[500px] lg:m-auto">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              className="bg-sidebar-accent w-96 p-2 rounded-sm"
              placeholder="Ask Your Query..."
              required
            />
            <Button type="submit">
              <SendIcon className="mr-2 h-4 w-4" />
              Send
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export { GeminiBody };
