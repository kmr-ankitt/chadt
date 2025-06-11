"use client";

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@clerk/nextjs";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";
let socket: Socket | null = null;

export default function ChatArea() {
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState<
    {
      sender: string;
      message: string;
      timestamp: string
    }[]
  >([]);
  const { getToken } = useAuth();

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
      socket?.emit("message", msg);
      setMsg("");
    }
  };

  return (
    <>
      <div className="mb-4 space-y-2 max-h-64 overflow-y-auto border rounded p-3">
        {messages.map((m, i) => (
          <div key={i} className="text-sm border-b pb-1">
            <b>{m.sender}</b>: {m.message}
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
