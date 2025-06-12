import type { Server, Socket } from "socket.io";

export default function handleChat(socket: Socket, io: Server) {
  socket.on("message", (message) => {
    console.log(`Received message : `, message);
    socket.broadcast.emit("message", message);
  })
}