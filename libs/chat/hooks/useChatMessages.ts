import { useEffect, useState } from "react";
import { IMessage } from "../types";
import { onMessageReceived, sendMessageToDB } from "../../services/chatService";

export function useChat(conversationId: string) {
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    const unsubscribe = onMessageReceived(conversationId, (newMessages) => {
      setMessages(newMessages); // Gán toàn bộ danh sách mới
    });
  
    return unsubscribe;
  }, [conversationId]);
  
  // Đảm bảo rằng kiểu IMessage yêu cầu _id
  const sendMessage = async (msg: Omit<IMessage, 'id' | 'timestamp'>) => {
    const messageWithId: IMessage = {
      _id: `message-${Date.now()}`, // Tạo _id duy nhất
      text: msg.text,
      createdAt: msg.createdAt,
      user: msg.user,
    };
  
    // Gọi hàm để gửi tin nhắn vào DB
    await sendMessageToDB(conversationId, messageWithId);
  };
  return { messages, sendMessage };
}

