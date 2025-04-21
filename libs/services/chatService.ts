// libs/services/chatService.ts

import { db } from "../firebase/firebaseConfig"; // Firebase config
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import { IMessage} from "@/libs/chat/types"; // Kiểu dữ liệu tin nhắn

// Gửi tin nhắn vào Firestore
export const sendMessageToDB = async (chatId: string, message: IMessage) => {
  try {
    const messagesRef = collection(db, "chats", chatId, "messages");
    await addDoc(messagesRef, {
      ...message,
      createdAt: new Date(),
    });
  } catch (error) {
    console.error("Error sending message:", error);
  }
};

// Lắng nghe tin nhắn realtime
export const onMessageReceived = (
  chatId: string,
  callback: (messages: IMessage[]) => void
) => {
  const messagesRef = collection(db, "chats", chatId, "messages");
  const q = query(messagesRef, orderBy("createdAt", "asc"));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map((doc) => {
      const data = doc.data();
      
      // Kiểm tra dữ liệu trước khi ép kiểu
      if (data && data.text && data.createdAt && data.user) {
        const message: IMessage = {
          _id: doc.id, // Gán _id từ doc.id
          text: data.text, // Gán text từ dữ liệu Firestore
          createdAt: data.createdAt.toDate ? data.createdAt.toDate() : new Date(), // Chuyển timestamp thành Date nếu cần
          user: data.user, // Gán user từ dữ liệu Firestore
        };
  
        return message;
      } else {
        console.warn(`Invalid message data for doc ID: ${doc.id}`);
        return null;
      }
    }).filter((message) => message !== null); // Loại bỏ các giá trị null
  
    // Gọi callback với danh sách message đã được kiểm tra
    callback(messages);
  });
  

  return unsubscribe; // để dùng cho cleanup trong useEffect
};
