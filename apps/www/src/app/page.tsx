"use client"

import Chat from "@/components/Chat";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

export default function Home() {
  const { user } = useUser();

  useEffect(() => {
    const postUser = async () => {
      if(user){
        await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user`,{
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            userId: user.id,
            name: user.fullName,
            pfp: user.imageUrl || "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
          })
        })
      }
    };
    postUser();
  }, [user]);

  if (!user) {
    return (
      <div className="-z-20 absolute inset-0 h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
        <div className="bg-white bg-opacity-80 rounded-xl shadow-xl p-8 flex flex-col items-center">
          <svg className="w-16 h-16 text-purple-400 mb-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 17.25c4.556 0 8.25-2.686 8.25-6V7.5c0-3.314-3.694-6-8.25-6S3.75 4.186 3.75 7.5v3.75c0 3.314 3.694 6 8.25 6z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21a3.75 3.75 0 0 1 7.5 0" />
          </svg>
          <h1 className="text-2xl font-bold text-purple-500 mb-2">Chadt</h1>
          <p className="text-lg font-semibold text-gray-700 mb-2">Please log in to access the chat</p>
          <p className="text-sm text-gray-500 mb-4">Sign in to join the conversation and connect with others.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 h-screen w-full flex items-center justify-center -z-1">
      <Chat />
    </div>
  );
}
