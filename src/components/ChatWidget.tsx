"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  FiMessageCircle,
  FiSend,
  FiX,
} from "react-icons/fi";

type Message = {
  id?: string;
  sender: string;
  message: string;
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  useEffect(() => {

const openChat = () => {

setOpen(true);

};

window.addEventListener(
"open-chat",
openChat
);

return () =>
window.removeEventListener(
"open-chat",
openChat
);

},[]);

  const [conversationId, setConversationId] =
    useState("");

  const [messages, setMessages] = useState<
    Message[]
  >([]);

  const [input, setInput] = useState("");

  const [loading, setLoading] =
    useState(false);

  const bottomRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => {
    initializeChat();
  }, []);

  async function initializeChat() {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) return;

    const { data: existing } = await supabase
      .from("chat_conversations")
      .select("*")
      .eq("user_id", session.user.id)
      .maybeSingle();

    let conversation =
      existing?.id || "";

    if (!conversation) {
      const { data } = await supabase
        .from("chat_conversations")
        .insert({
          user_id: session.user.id,
        })
        .select()
        .single();

      conversation = data.id;

      await supabase
        .from("chat_messages")
        .insert({
          conversation_id: conversation,
          sender: "system",
          message:
            "👋 Welcome to Vertex Capital Finance. Thank you for contacting us. One of our investment advisors will reply shortly. Kindly tell us how we can help you.",
        });
    }

    setConversationId(conversation);

    loadMessages(conversation);

    subscribe(conversation);
  }

  async function loadMessages(id: string) {
    const { data } = await supabase
      .from("chat_messages")
      .select("*")
      .eq("conversation_id", id)
      .order("created_at", {
        ascending: true,
      });

    setMessages(data || []);
  }

  function subscribe(id: string) {
    supabase
      .channel("chat-" + id)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "chat_messages",
          filter:
            "conversation_id=eq." + id,
        },
        () => loadMessages(id)
      )
      .subscribe();
  }

  async function sendMessage() {
    if (!input.trim()) return;

    setLoading(true);

    await supabase
      .from("chat_messages")
      .insert({
        conversation_id:
          conversationId,
        sender: "user",
        message: input,
      });

    setInput("");

    setLoading(false);
  }

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 h-16 w-16 rounded-full bg-[#D4AF37] text-black shadow-2xl z-[999999]"
        >
          <div className="flex items-center justify-center h-full">
            <FiMessageCircle size={28} />
          </div>
        </button>
      )}

      {open && (
        <div className="fixed bottom-5 right-5 w-[95vw] max-w-md h-[75vh] bg-[#071426] rounded-3xl border border-white/10 shadow-2xl z-[999999] flex flex-col">

          <div className="bg-[#0E223D] px-5 py-4 flex justify-between items-center">

            <div>

              <h3 className="text-white font-bold">
                Live Support
              </h3>

              <p className="text-xs text-green-400">
                Usually replies within a few
                minutes
              </p>

            </div>

            <button
              onClick={() =>
                setOpen(false)
              }
            >
              <FiX
                className="text-white"
                size={22}
              />
            </button>

          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`rounded-2xl px-4 py-3 ${
                  msg.sender === "user"
                    ? "bg-[#D4AF37] text-black ml-12"
                    : "bg-[#0E223D] text-white mr-12"
                }`}
              >
                {msg.message}
              </div>
            ))}

            <div ref={bottomRef} />

          </div>

          <div className="border-t border-white/10 p-4 flex gap-3">

            <input
              value={input}
              onChange={(e) =>
                setInput(
                  e.target.value
                )
              }
              onKeyDown={(e) =>
                e.key === "Enter" &&
                sendMessage()
              }
              placeholder="Type your message..."
              className="flex-1 bg-[#0E223D] rounded-xl p-3 text-white"
            />

            <button
              onClick={sendMessage}
              disabled={loading}
              className="bg-[#D4AF37] rounded-xl px-4 text-black"
            >
              <FiSend />
            </button>

          </div>

        </div>
      )}
    </>
  );
}