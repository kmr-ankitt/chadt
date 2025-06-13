import prisma from "../config/prisma";
import type { ChatMessage } from "../types/messageType";

export default function storeMessages(message: ChatMessage) {
  const userid = prisma.user.findFirst({
    where: {
      userId: message.sender
    }
  })

  if (!userid) {
    console.error("User not found, creating new user");
    return;
  }

  const newMessage = prisma.message.create({
    data: {
      userId: message.sender,
      message: message.message,
      timestamp: message.timestamp,
    }
  })

  console.log(`Message stored: ${message.message} from ${message.sender}`);
}