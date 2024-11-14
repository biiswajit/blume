"use client";
import React, { useContext, useState } from "react";
import {
  Menu,
  Plus,
  MessageSquare,
} from "lucide-react";

import { Context } from "./ContextProvider";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setDisplayResult, setInput, prevPrompts, setRecentPrompts, submit } = useContext(Context);
  const loadPrompt = (prompt) => {
    setRecentPrompts(prompt);
    submit(prompt);
  };
  return (
    <div className="min-h-[100vh] inline-flex flex-col justify-between bg-bgSecondaryColor py-6 px-4">
      <div>
        <Menu
          size={20}
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer text-softTextColor"
        />
        <div
          className="mt-2.5 my-5 inline-flex py-2.5 items-center gap-2.5 px-4 bg-bgPrimaryColor rounded-full text-md text-gray-300 cursor-pointer"
          onClick={() => {
            setDisplayResult(false);
            setInput("");
          }}
        >
          <Plus size={20} className="cursor-pointer text-softTextColor" />
          {isOpen ? <p>New chat</p> : null}
        </div>
        {isOpen ? (
          <div className="flex flex-col">
            <p className="mt-8 mb-5">Recent</p>
            {prevPrompts?.map((item, index) => (
              <div
                key={index}
                onClick={() => loadPrompt(item)}
                className="my-2 flex items-center gap-2.5 pr-10 rounded-full text-gray-700 cursor-pointer hover:bg-slate-200 p-2 bg-bgPrimaryColor"
              >
                <MessageSquare
                  size={15}
                  className="cursor-pointer text-softTextColor"
                />
                <p>{item?.slice(0, 15)}...</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Sidebar;
