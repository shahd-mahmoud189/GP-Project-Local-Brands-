'use client';

import { MessageCircle, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { startConversation } from '@/app/api/chat.api';

interface ContactSellerButtonProps {
  ownerId: number;
}

export function ContactSellerButton({ ownerId }: ContactSellerButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const { conversationId } = await startConversation(ownerId);
      router.push(`/chat/${conversationId}`);
    } catch (err) {
      console.error('Failed to start conversation:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="w-full flex items-center justify-center gap-2 border border-[#03A9F4] text-[#03A9F4] hover:bg-[#03A9F4] hover:text-white py-3 rounded-2xl font-semibold transition-all disabled:opacity-60"
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <MessageCircle className="w-4 h-4" />
      )}
      {loading ? 'Connecting...' : 'Chat with Seller'}
    </button>
  );
}