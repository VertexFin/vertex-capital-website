"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminMessages() {
  const [conversations, setConversations] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [reply, setReply] = useState("");

  const channelRef = useRef<any>(null);

  useEffect(() => {
    loadConversations();

    return () => {
      supabase.removeAllChannels();
    };
  }, []);

  // -----------------------------
  // LOAD CONVERSATIONS
  // -----------------------------
  async function loadConversations() {
    const { data, error } = await supabase
      .from("chat_conversations")
      .select(
        `
        *,
        profile:user_id (
          full_name,
          email
        )
      `
      )
      .order("created_at", { ascending: false });

    if (error) {
      console.log("Conversations error:", error.message);
      return;
    }

    setConversations(data || []);
  }

  // -----------------------------
  // OPEN CONVERSATION
  // -----------------------------
  async function openConversation(conversation: any) {
    setSelected(conversation);

    // mark messages as read
    await supabase
      .from("chat_messages")
      .update({ is_read: true })
      .eq("conversation_id", conversation.id)
      .eq("sender", "user");

    await loadMessages(conversation.id);

    // cleanup old realtime channel
    supabase.removeAllChannels();

    // new realtime channel
    channelRef.current = supabase
      .channel("admin-" + conversation.id)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "chat_messages",
          filter: "conversation_id=eq." + conversation.id,
        },
        () => {
          loadMessages(conversation.id);
        }
      )
      .subscribe();
  }

  // -----------------------------
  // LOAD MESSAGES
  // -----------------------------
  async function loadMessages(id: string) {
    const { data, error } = await supabase
      .from("chat_messages")
      .select("*")
      .eq("conversation_id", id)
      .order("created_at", { ascending: true });

    if (error) {
      console.log("Message load error:", error.message);
      return;
    }

    setMessages(data || []);
  }

  // -----------------------------
  // SEND REPLY
  // -----------------------------
  async function sendReply() {
    if (!reply.trim() || !selected) return;

    await supabase.from("chat_messages").insert({
      conversation_id: selected.id,
      sender: "admin",
      message: reply,
    });

    setReply("");
  }

  return (
    <main className="min-h-screen bg-[#071426] pt-28 px-6">
      <h1 className="text-4xl font-bold text-white mb-10">
        Live Support Messages
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* LEFT SIDE */}
        <div className="space-y-4">
          {conversations.map((item) => (
            <button
              key={item.id}
              onClick={() => openConversation(item)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-left hover:border-[#D4AF37] transition"
            >
              <h3 className="text-white font-bold">
                {item.profile?.full_name || "Investor"}
              </h3>
              <p className="text-gray-400 text-sm">
                {item.profile?.email}
              </p>
            </button>
          ))}
        </div>

        {/* RIGHT SIDE */}
        <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-3xl flex flex-col h-[700px]">
          {selected ? (
            <>
              <div className="p-6 border-b border-white/10">
                <h2 className="text-2xl font-bold text-white">
                  {selected.profile?.full_name}
                </h2>
                <p className="text-gray-400">
                  {selected.profile?.email}
                </p>
              </div>

              {/* MESSAGES */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`rounded-2xl p-4 max-w-md ${
                      msg.sender === "admin"
                        ? "bg-[#D4AF37] text-black ml-auto"
                        : "bg-[#0E223D] text-white"
                    }`}
                  >
                    {msg.message}
                  </div>
                ))}
              </div>

              {/* INPUT */}
              <div className="border-t border-white/10 p-4 flex gap-3">
                <input
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && sendReply()
                  }
                  placeholder="Type your reply..."
                  className="flex-1 bg-[#0E223D] rounded-xl p-3 text-white"
                />

                <button
                  onClick={sendReply}
                  className="bg-[#D4AF37] text-black px-6 rounded-xl font-bold"
                >
                  Send
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center flex-1 text-gray-400">
              Select a conversation
            </div>
          )}
        </div>
      </div>
    </main>
  );
}