import type { Server, Socket } from "socket.io";

export default function handleChat(socket: Socket, io: Server) {
  socket.on("message", (message) => {
    const fullMessage = {
      sender: socket.user?.userId,
      message,
      timestamp: new Date().toISOString(),
    }
    console.log(`Received message : `, fullMessage);
    socket.broadcast.emit("message", fullMessage);
  })
}