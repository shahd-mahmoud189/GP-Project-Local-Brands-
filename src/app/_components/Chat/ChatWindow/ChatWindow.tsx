"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMessages, sendMessage, getConversations } from "@/app/api/chat.api";
import { Send, ArrowLeft, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface Message {
  messageId: number;
  conversationId: number;
  senderId: number;
  senderName: string;
  messageText: string;
  sentAt: string;
  isRead: boolean;
}

interface Conversation {
  conversationId: number;
  otherUserId: number;
  otherUserName: string;
}

interface ChatWindowProps {
  conversationId: number;
}

const formatTime = (dateStr: string) => {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return date.toLocaleDateString();
};

export function ChatWindow({ conversationId }: ChatWindowProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
//   const bottomRef = useRef<HTMLDivElement>(null);
  const [text, setText] = useState("");

  const { data: conversations = [] } = useQuery({
    queryKey: ["conversations"],
    queryFn: getConversations,
  });

  const currentConv = (conversations as Conversation[]).find(
    (c) => c.conversationId === conversationId
  );

  const { data: messages = [], isLoading } = useQuery({
    queryKey: ["messages", conversationId],
    queryFn: () => getMessages(conversationId),
    refetchInterval: 3000,
  });

  const currentUserId = currentConv
    ? (messages as Message[]).find(
        (m) => m.senderId !== currentConv.otherUserId
      )?.senderId
    : undefined;

  const { mutate: send, isPending: sending } = useMutation({
    mutationFn: () =>
      sendMessage(currentConv!.otherUserId, text.trim()),
    onSuccess: (newMsg) => {
      queryClient.setQueryData(
        ["messages", conversationId],
        (old: Message[] = []) => [...old, newMsg]
      );
      setText("");
    },
  });

//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

  const handleSend = () => {
    if (!text.trim() || !currentConv || sending) return;
    send();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const isMyMessage = (msg: Message) => msg.senderId === currentUserId;

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto w-full">
      {/* Header */}
      <div className="bg-white border-b border-stone-200 px-4 py-4 flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-full hover:bg-stone-100 text-stone-500 transition"
        >
          <ArrowLeft size={18} />
        </button>
        <div className="w-9 h-9 rounded-full bg-[#864227] flex items-center justify-center text-white font-bold text-sm">
          {currentConv?.otherUserName?.[0]?.toUpperCase() || "?"}
        </div>
        <div>
          <p className="font-semibold text-stone-900 text-sm">
            {currentConv?.otherUserName || "..."}
          </p>
          <p className="text-xs text-stone-400">Online</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-3 bg-stone-50">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="w-6 h-6 text-[#864227] animate-spin" />
          </div>
        ) : (messages as Message[]).length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-stone-400 text-sm">No messages yet. Say hello!</p>
          </div>
        ) : (
          (messages as Message[]).map((msg) => (
            <div
              key={msg.messageId}
              className={`flex ${isMyMessage(msg) ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] px-4 py-2.5 rounded-2xl text-sm ${
                  isMyMessage(msg)
                    ? "bg-[#864227] text-white rounded-br-sm"
                    : "bg-white border border-stone-200 text-stone-800 rounded-bl-sm shadow-sm"
                }`}
              >
                <p className="leading-relaxed">{msg.messageText}</p>
                <p
                  className={`text-[10px] mt-1 ${
                    isMyMessage(msg) ? "text-white/60" : "text-stone-400"
                  }`}
                >
                  {formatTime(msg.sentAt)}
                </p>
              </div>
            </div>
          ))
        )}
        {/* <div ref={bottomRef} /> */}
      </div>

      {/* Input */}
      <div className="bg-white border-t border-stone-200 px-4 py-4">
        <div className="flex items-end gap-3">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            placeholder="Type a message..."
            className="flex-1 resize-none bg-stone-50 border border-stone-200 rounded-2xl px-4 py-3 text-sm outline-none focus:border-[#864227] transition max-h-32"
          />
          <button
            onClick={handleSend}
            disabled={!text.trim() || sending || !currentConv}
            className="p-3 bg-[#864227] hover:bg-[#6d3520] text-white rounded-2xl transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {sending ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Send size={18} />
            )}
          </button>
        </div>
        <p className="text-[10px] text-stone-400 mt-2 text-center">
          Press Enter to send
        </p>
      </div>
    </div>
  );
}