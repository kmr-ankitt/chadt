import type { Server, Socket } from "socket.io";
import type { ChatMessage } from "../types/messageType";

export default function handleChat(socket: Socket, io: Server) {
  socket.on("message", (message: ChatMessage) => {
    console.log(`Received message : `, message);
    socket.broadcast.emit("message", message);
  });
}