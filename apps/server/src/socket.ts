import { Server } from "socket.io";
import { Server as HttpServer } from "http";
import handleChat from "./socket/chatSocket";
import { authMiddleware } from "./middleware/auth";

export function setupSocket(server: HttpServer) {
  const io = new Server(server, {
    cors: {
      origin: "*",
    }
  });

  authMiddleware(io);

  io.on("connection", (socket) => {
    console.log("An user connected");
    handleChat(socket, io)
    io.on("disconnect", () => {
      console.log("An user disconnected");
    });
  });
}