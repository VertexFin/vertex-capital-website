"use client";

import { useEffect, useRef, useState } from "react";
import { FiMessageCircle, FiSend, FiX } from "react-icons/fi";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "👋 Hello! I'm the Vertex Capital AI Assistant. How can I help you today?",
    },
  ] as any);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: userMessage,
      },
    ]);

    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
        }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.reply,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, something went wrong. Please try again.",
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 h-16 w-16 rounded-full bg-[#D4AF37] text-black shadow-2xl flex items-center justify-center hover:scale-105 transition"
        >
          <FiMessageCircle size={28} />
        </button>
      )}

      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[95vw] overflow-hidden rounded-3xl border border-white/10 bg-[#071426] shadow-2xl">

          <div className="flex items-center justify-between bg-[#0E223D] px-5 py-4">
            <div>
              <h3 className="font-bold text-white">
                Vertex AI Assistant
              </h3>

              <p className="text-xs text-green-400">
                Online 24/7
              </p>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="text-white"
            >
              <FiX />
            </button>
          </div>

          <div className="h-96 overflow-y-auto p-4 space-y-4">

            {messages.map((msg, index) => (
              <div
                key={index}
                className={`rounded-2xl px-4 py-3 text-sm ${
                  msg.role === "user"
                    ? "bg-[#D4AF37] text-black ml-10"
                    : "bg-[#0E223D] text-white mr-10"
                }`}
              >
                {msg.content}
              </div>
            ))}

            {loading && (
              <div className="bg-[#0E223D] rounded-2xl px-4 py-3 mr-10 text-gray-300">
                Typing...
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          <div className="border-t border-white/10 p-4 flex gap-3">

            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && sendMessage()
              }
              placeholder="Ask me anything..."
              className="flex-1 rounded-xl bg-[#0E223D] p-3 text-white outline-none"
            />

            <button
              onClick={sendMessage}
              className="rounded-xl bg-[#D4AF37] px-4 text-black"
            >
              <FiSend />
            </button>

          </div>
        </div>
      )}
    </>
  );
}