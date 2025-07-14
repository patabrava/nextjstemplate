"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useChat } from "@ai-sdk/react";
import Markdown from "react-markdown";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    api: "/api/chat",
    onError: (error) => {
      console.error("Chat error:", error);
    },
    onResponse: (response) => {
      console.log("Chat response:", response.status, response.statusText);
    },
    onFinish: (message) => {
      console.log("Chat finished:", message);
    }
  });

  // Debug logging
  console.log("Current messages:", messages);
  console.log("Is loading:", isLoading);
  console.log("Error:", error);

  return (
    <div className="flex flex-col w-full py-24 justify-center items-center">
      {error && (
        <div className="w-full max-w-xl mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          Error: {error.message}
        </div>
      )}
      <div className="w-full max-w-xl space-y-4 mb-20">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex",
              message.role === "user" ? "justify-end" : "justify-start",
            )}
          >
            <div
              className={cn(
                "max-w-[65%] px-3 py-1.5 text-sm shadow-sm",
                message.role === "user"
                  ? "bg-[#0B93F6] text-white rounded-2xl rounded-br-sm"
                  : "bg-[#E9E9EB] text-black rounded-2xl rounded-bl-sm",
              )}
            >
              <div className="prose-sm prose-p:my-0.5 prose-li:my-0.5 prose-ul:my-1 prose-ol:my-1">
                <Markdown>{message.content}</Markdown>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[65%] px-3 py-1.5 text-sm shadow-sm bg-[#E9E9EB] text-black rounded-2xl rounded-bl-sm">
              <div className="animate-pulse">Thinking...</div>
            </div>
          </div>
        )}
      </div>

      <form
        className="flex gap-2 justify-center w-full items-center fixed bottom-0"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-2 justify-center items-start mb-8 max-w-xl w-full border p-2 rounded-lg bg-white ">
          <Input
            className="w-full border-0 shadow-none !ring-transparent "
            value={input}
            placeholder="Say something..."
            onChange={handleInputChange}
            disabled={isLoading}
          />
          <div className="flex justify-end gap-3 items-center w-full">
            <Button size="sm" className="text-xs" type="submit" disabled={isLoading}>
              {isLoading ? "Sending..." : "Send"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
