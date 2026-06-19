"use client";

import { useQuery } from "@tanstack/react-query";
import { getConversations } from "@/app/api/chat.api";
import { useRouter } from "next/navigation";
import { MessageCircle, Loader2 } from "lucide-react";

interface Conversation {
  conversationId: number;
  otherUserId: number;
  otherUserName: string;
  lastMessage: string | null;
  lastMessageAt: string | null;
  unreadCount: number;
}

const formatTime = (dateStr: string | null) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return date.toLocaleDateString();
};

export function MessagesTab() {
  const router = useRouter();

  const { data: conversations = [], isLoading } = useQuery({
    queryKey: ["conversations"],
    queryFn: getConversations,
    refetchInterval: 5000, 
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 text-[#0288D1] animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8 max-w-2xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-[#0288D1]/10 rounded-xl">
          <MessageCircle className="w-5 h-5 text-[#0288D1]" />
        </div>
        <div>
          <h2 className="font-bold text-[#2D2D2D] text-lg">Messages</h2>
          <p className="text-xs text-gray-400">
            {conversations.length} conversation
            {conversations.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* List */}
      {conversations.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <MessageCircle className="w-12 h-12 text-stone-200 mb-4" />
          <p className="text-stone-400 text-sm">No messages yet.</p>
          <p className="text-stone-300 text-xs mt-1">
            Customers will reach out to you here.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {(conversations as Conversation[]).map((conv) => (
            <button
              key={conv.conversationId}
              onClick={() => router.push(`/chat/${conv.conversationId}`)}
              className="w-full bg-white border border-stone-200 rounded-2xl p-4 flex items-center gap-4 hover:border-[#0288D1]/30 hover:shadow-sm transition-all text-left"
            >
              {/* Avatar */}
              <div className="relative shrink-0">
                <div className="w-11 h-11 rounded-full bg-[#0288D1] flex items-center justify-center text-white font-bold text-sm">
                  {conv.otherUserName?.[0]?.toUpperCase() || "?"}
                </div>
                {conv.unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {conv.unreadCount > 9 ? "9+" : conv.unreadCount}
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p
                    className={`text-sm truncate ${
                      conv.unreadCount > 0
                        ? "font-bold text-[#2D2D2D]"
                        : "font-medium text-stone-700"
                    }`}
                  >
                    {conv.otherUserName}
                  </p>
                  <span className="text-[10px] text-stone-400 shrink-0">
                    {formatTime(conv.lastMessageAt)}
                  </span>
                </div>
                <p
                  className={`text-xs truncate mt-0.5 ${
                    conv.unreadCount > 0
                      ? "text-[#2D2D2D] font-medium"
                      : "text-stone-400"
                  }`}
                >
                  {conv.lastMessage || "No messages yet"}
                </p>
              </div>

              {/* Unread dot */}
              {conv.unreadCount > 0 && (
                <div className="w-2 h-2 rounded-full bg-[#0288D1] shrink-0" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}