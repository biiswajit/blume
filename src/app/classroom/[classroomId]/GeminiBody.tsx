"use client";
import React, { useContext } from "react";
import {
  SendHorizontal,
} from "lucide-react";
import { Context } from "./ContextProvider";
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
  console.log(result)
  return (
    <div className="flex-1 min-h-[100vh] pb-[15vh] relative">
      <div className="flex items-center justify-between p-5 text-xl text-gray-400">
        <p className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-700">AKARI</p>
        
      </div>
      <div className="max-w-[900px] m-auto">
        {!displayResult ? (
          <>
            <div className="my-12 text-2xl font-medium p-6">
              <p>
                <span className=" bg-clip-text">
                  Hello,
                </span>
              </p>
              <p>This is Akari, Your personal virtual assistant. How can I help you ?</p>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="my-10 flex items-center gap-5">
              <p>{recentPrompts}</p>
            </div>
            <div className="flex items-start gap-5">
              <img src="/images/image.png" alt=""  width="45px;" height="100px" className="rounded-full"/>
              <p
                className="text-md font-normal loading-6 text-gray-400"
                dangerouslySetInnerHTML={{ __html: result }}
                >
                  
              </p >
            </div>
          </div>
        )}
        <div className="absolute bottom-10 w-full max-w-[900px] px-5 m-auto">
          <form action={submit}>
            <div className="flex items-center justify-between gap-5 bg-slate-200 py-2.5 px-5 rounded-full">
              <input
                onChange={(e) => setInput(e.target.value)}
                value={input}
                type="text"
                className="flex-1 bg-transparent border-none outline-none p-1 text-md text-gray-400"
                placeholder="Ask Your Query..."
              />
              <div className="button flex cursor-pointer">
                <SendHorizontal type="submit" onClick={submit} size={20} />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export {GeminiBody};
