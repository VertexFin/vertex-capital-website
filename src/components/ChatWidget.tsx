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

    const [unread, setUnread] = useState(0);

    const [userProfile, setUserProfile] = useState<any>(null);

  const bottomRef =
    useRef<HTMLDivElement>(null);

    const channelRef = useRef<any>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => {
    initializeChat();
  }, []);

  useEffect(() => {
  return () => {
    if (channelRef.current) {
      supabase.removeChannel(channelRef.current);
    }
  };
}, []);

  async function initializeChat() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
  const { data: profile } = await supabase
    .from("profile")
    .select("full_name, email")
    .eq("id", session.user.id)
    .single();

  setUserProfile(profile);
}

  // If user is not logged in, just show a local welcome message
  if (!session) {
    setMessages([
      {
        id: "welcome",
        sender: "system",
        message:
          "👋 Welcome to Vertex Capital Finance.\n\nHow can we help you today?\n\nOne of our investment advisors will reply shortly after you send your message.",
      },
    ]);
    return;
  }

  const { data: existing } = await supabase
    .from("chat_conversations")
    .select("*")
    .eq("user_id", session.user.id)
    .maybeSingle();

  let conversationId = existing?.id;

  if (!conversationId) {
    const { data: conversation } = await supabase
      .from("chat_conversations")
      .insert({
        user_id: session.user.id,
      })
      .select()
      .single();

    conversationId = conversation.id;
  }

  setConversationId(conversationId);

await loadMessages(conversationId);

await loadUnread(conversationId);

await markAdminMessagesAsRead(conversationId);

subscribe(conversationId);

  // Load previous messages
  const { data } = await supabase
    .from("chat_messages")
    .select("*")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true });

  // If there are no messages yet, show the welcome message immediately
  if (!data || data.length === 0) {
    const welcome = {
      sender: "system",
      message:
        "👋 Welcome to Vertex Capital Finance.\n\nHow can we help you today?\n\nOne of our investment advisors will reply shortly after you send your message.",
    };

    // Show it immediately
    setMessages([welcome]);

    // Save it to the database
    await supabase.from("chat_messages").insert({
      conversation_id: conversationId,
      sender: "system",
      message: welcome.message,
    });
  } else {
    setMessages(data);
  }

  subscribe(conversationId);
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

  async function loadUnread(id: string) {
  const { count } = await supabase
    .from("chat_messages")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("conversation_id", id)
    .eq("sender", "admin")
    .eq("is_read", false);

  setUnread(count || 0);
  console.log("Unread admin replies:", count);
}

 

function subscribe(id: string) {
  if (channelRef.current) {
    supabase.removeChannel(channelRef.current);
  }

  channelRef.current = supabase
    .channel("chat-" + id)
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "chat_messages",
        filter: `conversation_id=eq.${id}`,
      },
      () => {
        loadMessages(id);
        loadUnread(id);
      }
    )
    .subscribe();
}

  async function sendMessage() {
  if (!input.trim()) return;

  setLoading(true);

  const message = input;

  const { error } = await supabase
    .from("chat_messages")
    .insert({
      conversation_id: conversationId,
      sender: "user",
      message,
    });

  if (!error) {
    try {
      await fetch("/api/send-chat-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: userProfile?.full_name || "Customer",
          email: userProfile?.email || "No email",
          message,
        }),
      });
    } catch (err) {
      console.log("Email notification failed:", err);
    }
  }

  setInput("");
  setLoading(false);
}

 async function markAdminMessagesAsRead(id: string) {
  await supabase
    .from("chat_messages")
    .update({ is_read: true })
    .eq("conversation_id", id)
    .eq("sender", "admin")
    .eq("is_read", false);

  loadUnread(id);
} 

  return (
    <>
      {!open && (
  <div className="fixed bottom-6 right-6 z-[999999]">

    <button
     onClick={async () => {
  setOpen(true);

  if (conversationId) {
    await markAdminMessagesAsRead(conversationId);
  }
}}
      className="relative h-16 w-16 rounded-full bg-[#D4AF37] text-black shadow-2xl"
    >
      <div className="flex items-center justify-center h-full">
        <FiMessageCircle size={28} />
      </div>

      {unread > 0 && (
        <span className="absolute -top-1 -right-1 h-6 w-6 rounded-full bg-red-600 text-white text-xs font-bold flex items-center justify-center">
          {unread}
        </span>
      )}

    </button>

  </div>
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

            {messages.map((msg, index) => (
  <div
    key={msg.id ?? index}
                className={`rounded-2xl px-4 py-3 ${
  msg.sender === "user"
    ? "bg-[#D4AF37] text-black ml-12"
    : msg.sender === "system"
    ? "bg-green-700 text-white mr-12"
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