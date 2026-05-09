import { ChatWindow } from "@/app/_components/Chat/ChatWindow/ChatWindow";

export default async function ChatPage({
  params,
}: {
  params: Promise<{ conversationId: string }>;
}) {
  const { conversationId } = await params;

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      <ChatWindow conversationId={Number(conversationId)} />
    </div>
  );
}