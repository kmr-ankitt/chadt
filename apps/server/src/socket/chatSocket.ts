import type { Server, Socket } from "socket.io";

export default function handleChat(socket: Socket, io: Server) {
  socket.on("message", (message) => {
    const fullMessage = {
      sender: socket.id,
      message,
      timestamp: new Date().toISOString(),
    }
    console.log(`Received message : `, fullMessage);
    io.emit("message", message);
  })
}