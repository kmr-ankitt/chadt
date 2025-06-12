"use client";

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";
import { useAuth, useUser } from "@clerk/nextjs";
import ChatArea from "./ChatArea";
import Image from "next/image";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";
let socket: Socket | null = null;

export default function Chat() {
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState<
    {
      sender: string;
      senderName: string;
      senderProfilePicture: string;
      message: string;
      timestamp: string
    }[]
  >([]);

  const { getToken } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    const setupSocket = async () => {
      const token = await getToken();
      socket = io(BACKEND_URL, {
        auth: {
          token,
        },
      });

      socket.on("connect", () => {
        console.log("Connected to server");
      });

      socket.on("message", (data) => {
        console.log("New message received:", data);
        setMessages((prev) => [...prev, data]);
      });

      socket.on("disconnect", () => {
        console.log("Disconnected from server");
      });
    };

    setupSocket();

    return () => {
      socket?.off("message");
      socket?.disconnect();
    };
  }, [getToken]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (msg.trim()) {
      socket?.emit("message", {
        sender: user?.id || "Anonymous",
        senderName: user?.firstName || "Anonymous",
        senderProfilePicture: user?.imageUrl || "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg",
        message: msg,
        timestamp: new Date().toISOString()
      });
      setMsg("");
    }
  };
  console.log(messages)

  return (
    <>
      <ChatArea />
      <div className="mb-4 space-y-2 max-h-64 overflow-y-auto border rounded p-3">
        {messages.map((m, i) => (
          <div key={i} className="flex items-center justify-between text-sm border-b pb-1">
            <img src={m.senderProfilePicture} alt={m.sender} className="w-6 h-6 rounded-full mr-2" />
            <b>{m.senderName}</b>: {m.message}
          </div>
        ))}
      </div>

      <form onSubmit={onSubmit} className="flex gap-3">
        <Input
          type="text"
          placeholder="Type your message"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <Button type="submit">Send</Button>
      </form>
    </>
  );
}
