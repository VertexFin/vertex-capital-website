"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminMessages() {

  const [conversations, setConversations] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [reply, setReply] = useState("");
  const [unreadCounts, setUnreadCounts] = useState<Record<string, number>>({});

  useEffect(() => {
  
    loadConversations();
  }, []);

  async function loadConversations() {
  // Load conversations
  const { data: conversationsData, error } = await supabase
    .from("chat_conversations")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error);
    return;
  }

  // Load all profiles
  const { data: profiles } = await supabase
    .from("profile")
    .select("id, full_name, email");

  const merged =
    conversationsData?.map((conversation) => ({
      ...conversation,
      profile: profiles?.find(
        (p) => p.id === conversation.user_id
      ),
    })) || [];

  // 🔴 Get unread count for each conversation
  const counts: Record<string, number> = {};

  for (const conversation of merged) {
    const { count } = await supabase
      .from("chat_messages")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("conversation_id", conversation.id)
      .eq("sender", "user")
      .eq("is_read", false);

    counts[conversation.id] = count || 0;
  }

  setUnreadCounts(counts);
  setConversations(merged);
}

  async function openConversation(conversation: any) {

  // 1. Set active conversation
  setSelected(conversation);

  // 2. Mark messages as read
  const { data, error } = await supabase
  .from("chat_messages")
  .update({ is_read: true })
  .eq("conversation_id", conversation.id)
  .eq("sender", "user")
  .select();

console.log("Read update:", data);
console.log("Read update error:", error);

  // 3. Load messages immediately
  await loadMessages(conversation.id);

  // 4. REMOVE old channel before creating new one
  supabase.removeAllChannels();

  // 5. Create fresh realtime channel
  const channel = supabase
    .channel("admin-" + conversation.id)

    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "chat_messages",
        filter:
          "conversation_id=eq." + conversation.id,
      },
      () => {
        loadMessages(conversation.id);
      }
    );

  channel.subscribe();
  loadConversations();
  window.dispatchEvent(new Event("messages-read"));
}

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

  console.log("Loaded messages:", data);

  setMessages(data || []);
}

  async function sendReply() {

    if (!reply.trim()) return;

    await supabase
      .from("chat_messages")
      .insert({

        conversation_id: selected.id,

        sender: "admin",

        message: reply,

      });

    setReply("");

  }


async function rejectWithdrawal(id: string) {
  await supabase
    .from("withdrawals")
    .update({ status: "Rejected" })
    .eq("id", id);

  loadMessages(selected.id);
}

  return (

    <main className="min-h-screen bg-[#071426] pt-28 px-6">

      <h1 className="text-4xl font-bold text-white mb-10">
        Live Support Messages
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">

        {/* LEFT */}

        <div className="space-y-4">

          {conversations.map((item) => (

            <button

              key={item.id}

              onClick={() =>
                openConversation(item)
              }

              className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-left hover:border-[#D4AF37] transition"

            >

              <div className="flex justify-between items-center">
  <h3 className="text-white font-bold">
    {item.profile?.full_name || "Investor"}
  </h3>

  {unreadCounts[item.id] > 0 && (
    <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full">
      {unreadCounts[item.id]}
    </span>
  )}
</div>

              <p className="text-gray-400 text-sm">
                {item.profile?.email}
              </p>

            </button>

          ))}

        </div>

        {/* RIGHT */}

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

              <div className="border-t border-white/10 p-4 flex gap-3">

                <input

                  value={reply}

                  onChange={(e) =>
                    setReply(e.target.value)
                  }

                  onKeyDown={(e) =>
                    e.key === "Enter" &&
                    sendReply()
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