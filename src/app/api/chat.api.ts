import api from "@/lib/service";

export async function startConversation(receiverId: number) {
  const { data } = await api.post('/api/Chat/conversations/start', receiverId, {
    headers: { 'Content-Type': 'application/json' },
  });
  return data; // { conversationId }
}

export async function getConversations() {
  const { data } = await api.get('/api/Chat/conversations');
  return data;
}

export async function getMessages(conversationId: number) {
  const { data } = await api.get(`/api/Chat/conversations/${conversationId}/messages`);
  return data;
}

export async function sendMessage(receiverId: number, messageText: string) {
  const { data } = await api.post('/api/Chat/send', { receiverId, messageText });
  return data;
}